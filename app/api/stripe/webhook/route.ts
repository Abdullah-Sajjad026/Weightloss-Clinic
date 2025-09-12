import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 500 }
    )
  }

  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')!

  let event: any

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object)
        break
      
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object)
        break
      
      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object)
        break
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutSessionCompleted(session: any) {
  const orderId = session.metadata?.orderId

  if (!orderId) {
    console.error('No order ID found in session metadata')
    return
  }

  try {
    // Update order status to paid
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'PAID',
        paymentStatus: 'COMPLETED',
        stripePaymentIntentId: session.payment_intent,
        paidAt: new Date(),
      },
    })

    console.log(`Order ${orderId} marked as paid`)
    
    // TODO: Send confirmation email to customer
    // TODO: Notify admin of new paid order
    
  } catch (error) {
    console.error('Error updating order after successful payment:', error)
  }
}

async function handlePaymentIntentSucceeded(paymentIntent: any) {
  console.log('Payment succeeded:', paymentIntent.id)
  
  // Additional payment success logic can be added here
}

async function handlePaymentIntentFailed(paymentIntent: any) {
  console.log('Payment failed:', paymentIntent.id)
  
  try {
    // Find order by payment intent ID and mark as failed
    const order = await prisma.order.findFirst({
      where: { stripePaymentIntentId: paymentIntent.id }
    })

    if (order) {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'PAYMENT_FAILED',
          paymentStatus: 'FAILED',
        },
      })
      
      console.log(`Order ${order.id} marked as payment failed`)
    }
  } catch (error) {
    console.error('Error handling failed payment:', error)
  }
}