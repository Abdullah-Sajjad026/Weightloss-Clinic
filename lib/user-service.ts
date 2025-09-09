import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

/**
 * Get the current authenticated user from database
 * Returns null if not authenticated or user not found in DB
 */
export async function getCurrentUser() {
  try {
    const clerkUser = await currentUser()
    
    if (!clerkUser) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id }
    })

    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Get or create user in database from Clerk user
 * Useful for form submissions when webhook might not have fired yet
 */
export async function getOrCreateUser() {
  try {
    const clerkUser = await currentUser()
    
    if (!clerkUser) {
      return null
    }

    // Try to find existing user
    let user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id }
    })

    // If user doesn't exist, create them
    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'Unknown User',
          phone: clerkUser.phoneNumbers[0]?.phoneNumber || null,
        }
      })
    }

    return user
  } catch (error) {
    console.error('Error getting or creating user:', error)
    return null
  }
}

/**
 * Auto-populate form data from authenticated user
 */
export async function getUserFormData() {
  const user = await getCurrentUser()
  
  if (!user) {
    return {
      name: '',
      email: '',
      phone: '',
    }
  }

  return {
    name: user.name,
    email: user.email,
    phone: user.phone || '',
  }
}