import { NextResponse } from "next/server";
import { decodeJwt } from "jose";

export function proxy(request) {
  const accessToken = request.cookies.get("access_token")?.value;
  const path = request.nextUrl.pathname;

  const isDashboardRoute = path.startsWith("/dashboard");

  if (!accessToken) {
    if (isDashboardRoute) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.next();
  }

  const payload = decodeJwt(accessToken);

  if (isDashboardRoute && payload.role !== "admin") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
};
