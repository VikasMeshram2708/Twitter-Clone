import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const path = request.nextUrl.pathname;
  const publicPath = new Set(["/user/login", "/user/signup"]);
  const isPublicPath = publicPath.has(path);

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/user/login", request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/user/login", "/user/signup"],
};