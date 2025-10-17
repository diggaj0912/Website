import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname

    // Public paths that don't require authentication
    if (
      path === '/' || 
      path.startsWith('/auth/') || 
      path.startsWith('/_next/') || 
      path.startsWith('/api/auth/') ||
      path.includes('.') // Skip files
    ) {
      return NextResponse.next()
    }

    const token = await getToken({ 
      req: request,
      secret: process.env.AUTH_SECRET
    })

    // Redirect to login for protected routes
    if (!token && !path.startsWith('/auth/')) {
      const signInUrl = new URL('/auth/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', request.url)
      return NextResponse.redirect(signInUrl)
    }

    // Admin route protection
    if (path.startsWith('/admin')) {
      if (!token) {
        const signInUrl = new URL('/auth/signin', request.url)
        signInUrl.searchParams.set('callbackUrl', request.url)
        return NextResponse.redirect(signInUrl)
      }
      
      if (token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
}
