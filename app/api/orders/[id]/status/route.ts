import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { 
  sendMedicalReviewEmail, 
  sendShippingNotificationEmail, 
  sendDeliveryConfirmationEmail, 
  sendStatusUpdateEmail,
  StatusUpdateEmailData 
} from '@/lib/email-service';

const prisma = new PrismaClient();

// Update order status with detailed tracking
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { 
      status, 
      medicalReviewStatus, 
      notes, 
      updatedBy, 
      trackingNumber, 
      estimatedDelivery,
      medicalNotes 
    } = body;

    // Validate order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id }
    });

    if (!existingOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Build update data
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (status) {
      updateData.status = status;
      
      // Auto-set delivery date if status is DELIVERED
      if (status === 'DELIVERED') {
        updateData.deliveredAt = new Date();
      }
    }

    if (medicalReviewStatus) {
      updateData.medicalReviewStatus = medicalReviewStatus;
      updateData.reviewedAt = new Date();
      if (updatedBy) {
        updateData.reviewedBy = updatedBy;
      }
    }

    if (medicalNotes) {
      updateData.medicalNotes = medicalNotes;
    }

    if (trackingNumber) {
      updateData.trackingNumber = trackingNumber;
    }

    if (estimatedDelivery) {
      updateData.estimatedDelivery = new Date(estimatedDelivery);
    }

    // Perform the update in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Update the order
      const updatedOrder = await tx.order.update({
        where: { id },
        data: updateData,
      });

      // Create status history entry if status changed
      if (status) {
        await tx.orderStatusHistory.create({
          data: {
            orderId: id,
            status: status,
            notes: notes || getDefaultStatusMessage(status),
            updatedBy: updatedBy,
          }
        });
      }

      // Fetch the complete updated order
      const completeOrder = await tx.order.findUnique({
        where: { id },
        include: {
          orderItems: true,
          orderStatusHistory: {
            orderBy: { createdAt: 'desc' }
          }
        }
      });

      return completeOrder;
    });

    // Send appropriate email notification
    if (result) {
      try {
        const emailData: StatusUpdateEmailData = {
          orderNumber: result.orderNumber,
          customerName: result.customerName,
          customerEmail: result.customerEmail,
          totalAmount: result.totalAmount,
          orderItems: result.orderItems.map((item: any) => ({
            productName: item.productName,
            variant: item.variant || undefined,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
            isPrescription: item.isPrescription,
          })),
          prescriptionRequired: result.prescriptionRequired,
          shippingAddress: {
            street: result.shippingStreet,
            city: result.shippingCity,
            postalCode: result.shippingPostalCode,
            country: result.shippingCountry,
          },
          trackingNumber: result.trackingNumber || undefined,
          estimatedDelivery: result.estimatedDelivery?.toISOString(),
          createdAt: result.createdAt.toISOString(),
          previousStatus: existingOrder.status,
          newStatus: status || existingOrder.status,
          statusNotes: notes || undefined,
          medicalReviewStatus: result.medicalReviewStatus,
          medicalNotes: result.medicalNotes || undefined,
        };

        // Send appropriate email based on status change
        if (medicalReviewStatus === 'APPROVED' || medicalReviewStatus === 'REJECTED') {
          await sendMedicalReviewEmail(emailData);
          console.log(`Medical review email sent for order ${result.orderNumber}`);
        } else if (status === 'SHIPPED') {
          await sendShippingNotificationEmail(emailData);
          console.log(`Shipping notification email sent for order ${result.orderNumber}`);
        } else if (status === 'DELIVERED') {
          await sendDeliveryConfirmationEmail(emailData);
          console.log(`Delivery confirmation email sent for order ${result.orderNumber}`);
        } else if (status && status !== existingOrder.status) {
          await sendStatusUpdateEmail(emailData);
          console.log(`Status update email sent for order ${result.orderNumber}`);
        }
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError);
        // Don't fail the status update if email fails
      }
    }

    // Return success response
    return NextResponse.json({
      success: true,
      order: result,
      message: `Order status updated successfully`
    });

  } catch (error) {
    console.error('Order status update error:', error);
    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}

// Get order status history
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const statusHistory = await prisma.orderStatusHistory.findMany({
      where: { orderId: id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      statusHistory
    });

  } catch (error) {
    console.error('Status history fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch status history' },
      { status: 500 }
    );
  }
}

// Helper function to get default status messages
function getDefaultStatusMessage(status: string): string {
  const messages = {
    'PENDING': 'Order placed and awaiting medical review',
    'MEDICAL_REVIEW': 'Order under medical review',
    'APPROVED': 'Order medically approved and ready for processing',
    'REJECTED': 'Order medically rejected',
    'PROCESSING': 'Order being prepared for shipment',
    'SHIPPED': 'Order dispatched for delivery',
    'DELIVERED': 'Order successfully delivered',
    'CANCELLED': 'Order cancelled',
    'REFUNDED': 'Order refunded',
  };

  return messages[status as keyof typeof messages] || `Status updated to ${status}`;
}