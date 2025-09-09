import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from './lib/auth'

// Define which routes require user authentication
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/account(.*)',
  '/assessment(.*)',
  '/book-appointment(.*)',
  '/checkout(.*)',
  '/orders(.*)',
])

// Define admin routes (separate from user auth)
const isAdminRoute = createRouteMatcher([
  '/admin(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  // Handle admin routes with existing auth system
  if (isAdminRoute(req)) {
    return await handleAdminAuth(req)
  }
  
  // Protect user routes with Clerk
  if (isProtectedRoute(req)) {
    const authResult = await auth()
    if (!authResult.userId) {
      // User not authenticated, redirect to sign-in
      const signInUrl = new URL('/sign-in', req.url)
      return Response.redirect(signInUrl)
    }
  }
})

// Keep existing admin auth logic
async function handleAdminAuth(request: NextRequest) {
  // Check if this is an admin route (but not the login page)
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    const isAuthenticated = await isAdminAuthenticated()
    
    if (!isAuthenticated) {
      // Redirect to login page
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // If accessing login page while authenticated, redirect to admin dashboard
  if (request.nextUrl.pathname === '/admin/login') {
    const isAuthenticated = await isAdminAuthenticated()
    
    if (isAuthenticated) {
      const adminUrl = new URL('/admin', request.url)
      return NextResponse.redirect(adminUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}