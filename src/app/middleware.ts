import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Authentication & Authorization checks for protected paths
  const sessionToken = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  const protectedPaths = ["/book-online", "/my-booking", "/finance", "/exchange", "/admin", "/customer"];

  if (protectedPaths.some(path => pathname.startsWith(path))) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    
    // Admin path role protection
    if (pathname.startsWith("/admin")) {
      const isUserAdmin = sessionToken === "SUPER_ADMIN" || sessionToken === "BRANCH_MANAGER" || sessionToken === "SALES_MANAGER" || sessionToken === "FINANCE_MANAGER";
      if (!isUserAdmin) {
        return NextResponse.redirect(new URL("/login?unauthorized=true", request.url));
      }
    }

    // Customer path role protection
    if (pathname.startsWith("/customer") && sessionToken !== "CUSTOMER") {
      return NextResponse.redirect(new URL("/login?unauthorized=true", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/book-online/:path*", "/my-booking/:path*", "/finance/:path*", "/exchange/:path*", "/admin/:path*", "/customer/:path*"],
};

