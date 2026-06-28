import { NextResponse } from "next/server";
import { decodeJwt } from "jose";

export function proxy(request) {
  const accessToken = request.cookies.get("access_token")?.value;
  const path = request.nextUrl.pathname;

  const isAccountRoute = path.startsWith("/account");
  const isDashboardRoute = path.startsWith("/dashboard");

  if (!accessToken) {
    if (isAccountRoute || isDashboardRoute) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.next();
  }

  const payload = decodeJwt(accessToken);
  console.log("JWT payload:", payload);

  if (isAccountRoute && payload.role === "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isDashboardRoute && payload.role !== "admin") {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    "/dashboard/:path*",
  ],
};
