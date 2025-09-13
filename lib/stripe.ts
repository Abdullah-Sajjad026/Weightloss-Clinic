import { loadStripe, Stripe } from '@stripe/stripe-js'

// Singleton pattern for Stripe instance
let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    
    if (!publishableKey) {
      throw new Error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set')
    }
    
    stripePromise = loadStripe(publishableKey)
  }
  
  return stripePromise
}

// Server-side Stripe instance
import StripeServer from 'stripe'

const secretKey = process.env.STRIPE_SECRET_KEY

if (!secretKey && process.env.NODE_ENV !== 'production') {
  console.warn('⚠️  STRIPE_SECRET_KEY not found. Stripe features will not work.')
}

// Check if webhook is configured
if (!process.env.STRIPE_WEBHOOK_SECRET && process.env.NODE_ENV !== 'production') {
  console.warn('⚠️  STRIPE_WEBHOOK_SECRET not found. Order status updates will be manual.')
}

export const stripe = secretKey ? new StripeServer(secretKey, {
  apiVersion: '2025-08-27.basil',
  typescript: true,
}) : null