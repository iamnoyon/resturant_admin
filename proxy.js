import { NextResponse } from "next/server";

export function proxy(request) {
  const accessToken = request.cookies.get("accessToken");

  const isAuthenticated = accessToken;

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/");

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*"
],
};