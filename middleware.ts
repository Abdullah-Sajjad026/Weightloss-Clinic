import { NextRequest, NextResponse } from 'next/server'
import { isAdminAuthenticated } from './lib/auth'

export async function middleware(request: NextRequest) {
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
  matcher: '/admin/:path*'
}