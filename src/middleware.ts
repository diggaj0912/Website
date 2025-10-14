import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/auth"

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

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
  if (publicRoutes.some(route => nextUrl.pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/signin", nextUrl))
  }

  // Check admin routes
  if (adminRoutes.some(route => nextUrl.pathname.startsWith(route))) {
    if (req.auth?.user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", nextUrl))
    }
  }

  return NextResponse.next()
})

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
