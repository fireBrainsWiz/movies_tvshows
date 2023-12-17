import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname//the curent path
  const publicPaths = ['/signup', '/login', ]//public paths

  const isPublicPath = publicPaths.some(p => path.startsWith(p))
  // console.log(path)


  const sessionToken = req.cookies.get('next-auth.session-token')?.value || ''

  if (isPublicPath && sessionToken) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
  
  if (!isPublicPath && !sessionToken) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
}

// if nothing is set, all is matched 
export const config = {
  matcher: [
    // '/',
    '/profile/:path*',//profile and subdomain
    '/signup/:path*',
    '/login/:path*',
    // '/verifyemail',
  ],
}