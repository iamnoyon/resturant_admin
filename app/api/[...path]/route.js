import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://resturant-backend-3khk.onrender.com"
    : "http://localhost:5000");

export async function GET(request, { params }) {
  return proxy(request, params);
}

export async function POST(request, { params }) {
  return proxy(request, params);
}

export async function PUT(request, { params }) {
  return proxy(request, params);
}

export async function PATCH(request, { params }) {
  return proxy(request, params);
}

export async function DELETE(request, { params }) {
  return proxy(request, params);
}

async function proxy(request, params) {
  const { path } = await params;
  const fullPath = path.join("/");
  const url = `${BACKEND_URL}/api/${fullPath}${request.nextUrl.search}`;

  const headers = new Headers();

  request.headers.forEach((value, key) => {
    if (key.toLowerCase() !== "host") {
      headers.set(key, value);
    }
  });

  const cookie = request.headers.get("cookie");
  if (cookie) {
    headers.set("Cookie", cookie);
  }

  const body =
    request.method !== "GET" && request.method !== "HEAD" && request.body
      ? await request.arrayBuffer()
      : undefined;

  const backendRes = await fetch(url, {
    method: request.method,
    headers,
    body,
  });

  const responseHeaders = new Headers();

  backendRes.headers.forEach((value, key) => {
    responseHeaders.set(key, value);
  });

  const contentType = backendRes.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const data = await backendRes.json();
    return NextResponse.json(data, {
      status: backendRes.status,
      headers: responseHeaders,
    });
  }

  const text = await backendRes.text();
  return new NextResponse(text, {
    status: backendRes.status,
    headers: responseHeaders,
  });
}

export const runtime = "nodejs";
