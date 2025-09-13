import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

const locales = ["en", "en-GB", "de", "ru"] as const;

// next-intl locale detection & routing (cookie NEXT_LOCALE supported)
const intl = createIntlMiddleware({
  locales: Array.from(locales) as unknown as string[],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export function middleware(request: NextRequest) {
  // First let next-intl resolve locale and possibly rewrite response
  const response = intl(request);
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
  // Apply to all non-static paths and optional locale prefixes
  matcher: [
    '/',
    '/(en|en-GB|de|ru)/:path*',
    '/((?!api|_next|.*\\..*).*)'
  ],
};
