import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/auth/signin",
    "/auth/signup",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/api/auth",
  ]

  // Admin routes
  const adminRoutes = ["/admin"]

  // Check if route is public
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url))
  }

  // Check admin routes
  if (adminRoutes.some(route => pathname.startsWith(route))) {
    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api (API routes)
     * - _next (Next.js internals)
     * - static (static files)
     * - public (public files)
     * - favicon.ico, robots.txt, site.webmanifest
     */
    "/((?!api|_next|static|public|favicon.ico|robots.txt|site.webmanifest).*)"
  ]
}
