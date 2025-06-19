import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  const justLoggedIn = request.nextUrl.searchParams.get("justLoggedIn");
  console.log(justLoggedIn, "justlogged in");
  if (!token?.value && process.env.NODE_ENV === "production") {
    if (justLoggedIn === "true") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
