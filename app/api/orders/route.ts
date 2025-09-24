import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, MedicalReviewStatus } from '@prisma/client';
import { CheckoutFormData } from '@/types/cart';
import { CartItem } from '@/types/cart';
import { sendOrderConfirmationEmail, OrderEmailData } from '@/lib/email-service';
import { productRequiresAssessment } from '@/lib/assessment-config';

const prisma = new PrismaClient();

// Create a new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerData, cartItems }: {
      customerData: CheckoutFormData;
      cartItems: CartItem[];
    } = body;

    // Validate required data
    if (!customerData || !cartItems || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Missing required order data' },
        { status: 400 }
      );
    }

    // Check if order contains assessment-required products
    const assessmentRequiredItems = cartItems.filter(item => 
      productRequiresAssessment(item.name, item.productId, item.category)
    );

    let hasValidAssessment = false;
    let assessmentData = null;

    if (assessmentRequiredItems.length > 0) {
      try {
        // Verify assessment for restricted products
        const assessmentResponse = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/assessment/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: customerData.email }),
        });

        assessmentData = await assessmentResponse.json();

        if (!assessmentData.eligible) {
          const productNames = assessmentRequiredItems.map(item => item.name).join(', ');
          return NextResponse.json(
            { 
              error: `Assessment required for: ${productNames}`,
              reason: assessmentData.reason,
              message: assessmentData.message,
              restrictedItems: productNames
            },
            { status: 403 }
          );
        }

        hasValidAssessment = true;
      } catch (error) {
        console.error('Assessment verification failed during checkout:', error);
        return NextResponse.json(
          { error: 'Unable to verify assessment. Please try again.' },
          { status: 500 }
        );
      }
    }

    // Generate unique order number
    const orderNumber = `NWLC-${Date.now().toString().slice(-6)}`;

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxAmount = 0; // Currently no tax
    const shippingAmount = 0; // Free shipping
    const totalAmount = subtotal + taxAmount + shippingAmount;

    // Check if any items require prescription
    const prescriptionRequired = cartItems.some(item => item.isprescription);

    // Determine medical review status based on assessment
    let medicalReviewStatus: MedicalReviewStatus = MedicalReviewStatus.APPROVED; // Default to approved
    
    if (prescriptionRequired) {
      if (hasValidAssessment) {
        // User has valid assessment - automatically approve
        medicalReviewStatus = MedicalReviewStatus.APPROVED;
        console.log(`Order ${orderNumber}: Auto-approved due to valid assessment for ${customerData.email}`);
      } else {
        // User doesn't have assessment - requires review
        medicalReviewStatus = MedicalReviewStatus.PENDING;
        console.log(`Order ${orderNumber}: Pending review - no assessment found for ${customerData.email}`);
      }
    }

    // Create order with items
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerEmail: customerData.email,
        customerName: `${customerData.firstName} ${customerData.lastName}`,
        customerPhone: customerData.phone,
        subtotal,
        taxAmount,
        shippingAmount,
        totalAmount,
        prescriptionRequired,
        medicalReviewStatus,
        shippingStreet: customerData.shippingStreet,
        shippingCity: customerData.shippingCity,
        shippingPostalCode: customerData.shippingPostalCode,
        shippingCountry: customerData.shippingCountry,
        billingStreet: customerData.billingIsSameAsShipping ? customerData.shippingStreet : customerData.billingStreet,
        billingCity: customerData.billingIsSameAsShipping ? customerData.shippingCity : customerData.billingCity,
        billingPostalCode: customerData.billingIsSameAsShipping ? customerData.shippingPostalCode : customerData.billingPostalCode,
        billingCountry: customerData.billingIsSameAsShipping ? customerData.shippingCountry : customerData.billingCountry,
        specialInstructions: customerData.specialInstructions,
        marketingOptIn: customerData.marketingOptIn,
        orderItems: {
          create: cartItems.map(item => ({
            productId: item.productId,
            productName: item.name,
            productSlug: item.slug,
            category: mapCartCategoryToEnum(item.category),
            variant: item.variant,
            unitPrice: item.price,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity,
            productImage: item.image,
            productDescription: item.description,
            isPrescription: item.isprescription,
          }))
        },
        orderStatusHistory: {
          create: {
            status: 'PENDING',
            notes: hasValidAssessment && prescriptionRequired 
              ? 'Order placed successfully. Medical review auto-approved due to valid assessment.'
              : 'Order placed successfully',
          }
        }
      },
      include: {
        orderItems: true,
        orderStatusHistory: true,
      }
    });

    // Send order confirmation email
    try {
      const emailData: OrderEmailData = {
        orderNumber: order.orderNumber,
        customerName: `${customerData.firstName} ${customerData.lastName}`,
        customerEmail: customerData.email,
        totalAmount: order.totalAmount,
        orderItems: order.orderItems.map(item => ({
          productName: item.productName,
          variant: item.variant || undefined,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
          isPrescription: item.isPrescription,
        })),
        prescriptionRequired: order.prescriptionRequired,
        shippingAddress: {
          street: customerData.shippingStreet,
          city: customerData.shippingCity,
          postalCode: customerData.shippingPostalCode,
          country: customerData.shippingCountry,
        },
        createdAt: order.createdAt.toISOString(),
      };

      await sendOrderConfirmationEmail(emailData);
      console.log(`Order confirmation email sent for order ${order.orderNumber}`);
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Don't fail the order creation if email fails
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
        totalAmount: order.totalAmount,
        prescriptionRequired: order.prescriptionRequired,
      }
    });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

// Get orders (for admin or customer)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const orderNumber = searchParams.get('orderNumber');
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '20');
    const page = parseInt(searchParams.get('page') || '1');
    
    const where: any = {};
    
    if (email) {
      where.customerEmail = email;
    }
    
    if (orderNumber) {
      where.orderNumber = orderNumber;
    }
    
    if (status) {
      where.status = status;
    }

    const orders = await prisma.order.findMany({
      where,
      include: {
        orderItems: true,
        orderStatusHistory: {
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
    });

    const total = await prisma.order.count({ where });

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      }
    });

  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// Helper function to map cart categories to Prisma enum
function mapCartCategoryToEnum(category: string) {
  switch (category) {
    case 'injections':
      return 'INJECTIONS';
    case 'pills-tablets':
      return 'PILLS_TABLETS';
    case 'bariatric-surgery':
      return 'BARIATRIC_SURGERY';
    default:
      return 'INJECTIONS';
  }
}