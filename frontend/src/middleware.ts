import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define route permissions
const authRoutes = ['/login', '/register', '/forgot-password']
const customerRoutes = ['/dashboard', '/orders', '/profile', '/addresses', '/wishlist', '/settings']
const adminRoutes = ['/admin']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get auth token from cookies (adjust based on your auth implementation)
  const token = request.cookies.get('auth-token')?.value
  const userRole = request.cookies.get('user-role')?.value // 'USER' or 'ADMIN'

  // Check if route is auth page
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // Check if route is customer dashboard
  const isCustomerRoute = customerRoutes.some(route => pathname.startsWith(route))

  // Check if route is admin dashboard
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && token) {
    if (userRole === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Protect customer routes
  if (isCustomerRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Protect admin routes
  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
