import { NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/user-management",
  "/product-management",
  "/content-management",
  "/profile",
  "/businesses",
  "/expenses",
  "/order",
  "/package-management",
  "/tables",
];

export function proxy(request) {
  const accessToken = request.cookies.get("access_token")?.value;
  const path = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  if (!accessToken && isProtected) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/user-management/:path*",
    "/product-management/:path*",
    "/content-management/:path*",
    "/profile/:path*",
    "/businesses/:path*",
    "/expenses/:path*",
    "/order/:path*",
    "/package-management/:path*",
    "/tables/:path*",
  ],
};
