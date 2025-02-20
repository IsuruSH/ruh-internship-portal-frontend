import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  const adminToken = req.cookies.get("adminToken")?.value;

  if (pathname.startsWith("/admin-dashboard") && !adminToken) {
    return NextResponse.redirect(new URL("/pages/auth/admin", req.url));
  }

  // Check if accessing student pages
  if (pathname.startsWith("/student-dashboard") && !token) {
    return NextResponse.redirect(new URL("/pages/auth?mode=login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/student-dashboard/:path*", "/admin-dashboard/:path*"],
};
