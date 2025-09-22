import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
// i18n removed

// Create a wrapper function that combines both middlewares
export default withAuth(
  function middleware(request: NextRequest) {
    // Check if user is accessing admin routes
    if (request.nextUrl.pathname.startsWith("/admin")) {
      const token = (request as any).nextauth.token;
      const ownerUid = process.env.OWNER_DISCORD_UID;
      
      // Check if user is the owner/admin
      if (!token?.sub || token.sub !== ownerUid) {
        // Redirect to home page if not authorized
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // Apply security headers to all responses
    const response = NextResponse.next();
    // Note: CSP headers were removed per request. If you want to re-enable CSP,
    // reintroduce the policy and header here, and ensure report collection is configured.
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    // XSS protection header is deprecated in modern browsers; set to 0 to avoid conflicts
    response.headers.set('X-XSS-Protection', '0');

    return response;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow all authenticated users to pass through to the middleware function for admin routes
        // The actual authorization check happens in the middleware function above
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  // Apply to all non-static, non-api paths for headers, and specifically protect admin routes
  matcher: [
    '/((?!api|_next|.*\\..*).*)',
    '/admin/:path*'
  ],
};
