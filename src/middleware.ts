import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, SESSION_VALUE } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const session = req.cookies.get(SESSION_COOKIE)?.value;
  if (session === SESSION_VALUE) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("from", req.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/students/:path*",
    "/tutors/:path*",
    "/sessions/:path*",
    "/topics/:path*",
    "/practice/:path*",
    "/research-scores/:path*",
    "/analytics/:path*",
    "/exports/:path*",
  ],
};
