import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/pages/auth?mode=login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/student-dashboard/:path*",],
};
