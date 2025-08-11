import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "vi"] as const;

function getPreferredLocale(req: NextRequest) {
  const header = req.headers.get("accept-language") || "en";
  const code = header.split(",")[0].slice(0,2).toLowerCase();
  return locales.includes(code as any) ? code : "en";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return;
  }
  const hasLocale = locales.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`) );
  if (!hasLocale) {
    const locale = getPreferredLocale(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/:path*"]
};