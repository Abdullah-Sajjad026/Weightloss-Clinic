import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    console.log('Stripe configured:', !!stripe)
    console.log('Environment check:', {
      hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
      hasPublicKey: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      hasAppUrl: !!process.env.NEXT_PUBLIC_APP_URL
    })

    if (!stripe) {
      console.error('Stripe not configured - missing STRIPE_SECRET_KEY')
      return NextResponse.json(
        { error: 'Stripe not configured - missing STRIPE_SECRET_KEY' },
        { status: 500 }
      )
    }

    const { orderId } = await request.json()

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    // Get order details from database
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: true
      }
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Create line items for Stripe
    const lineItems = order.orderItems.map((item) => {
      // Only include valid image URLs
      let images = undefined;
      if (item.productImage && item.productImage.startsWith('http')) {
        images = [item.productImage];
      }
      
      return {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.productName,
            description: item.productDescription || undefined,
            images: images,
          },
          unit_amount: Math.round(item.unitPrice * 100), // Convert to pence
        },
        quantity: item.quantity,
      };
    })

    // Add shipping charge if applicable
    if (order.shippingAmount > 0) {
      lineItems.push({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Shipping',
            description: 'Shipping charge',
            images: undefined,
          },
          unit_amount: Math.round(order.shippingAmount * 100),
        },
        quantity: 1,
      })
    }

    // Get the base URL for redirects
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const successUrl = `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`
    const cancelUrl = `${baseUrl}/checkout?cancelled=true`
    
    console.log('Creating Stripe session with URLs:', {
      baseUrl,
      successUrl,
      cancelUrl,
      orderId
    })
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        orderId: orderId,
      },
      customer_email: order.customerEmail,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['GB'],
      },
    })

    // Update order with Stripe session ID
    await prisma.order.update({
      where: { id: orderId },
      data: {
        stripeSessionId: session.id,
        status: 'PAYMENT_PENDING',
      },
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })

  } catch (error) {
    console.error('Error creating checkout session:', error)
    // Enhanced error logging for debugging
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      })
    }
    return NextResponse.json(
      { error: `Failed to create checkout session: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}