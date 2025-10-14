import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Public paths
  if (path === '/' || path.startsWith('/auth/') || path.startsWith('/_next/') || path.startsWith('/api/')) {
    return NextResponse.next()
  }

  const token = await getToken({ req: request })
  if (!token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  if (path.startsWith('/admin') && token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/((?!api|_next|static|.*\\.\\w+$).*)"
}
