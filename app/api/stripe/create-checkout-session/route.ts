import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe not configured' },
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
    const lineItems = order.orderItems.map((item) => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.productName,
          description: item.productDescription || undefined,
          images: item.productImage ? [item.productImage] : undefined,
        },
        unit_amount: Math.round(item.unitPrice * 100), // Convert to pence
      },
      quantity: item.quantity,
    }))

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

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout?cancelled=true`,
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
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}