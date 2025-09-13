import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// i18n removed

export function middleware(request: NextRequest) {
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
}

export const config = {
  // Apply to all non-static, non-api paths for headers only
  matcher: [
    '/((?!api|_next|.*\\..*).*)'
  ],
};
