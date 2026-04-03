import { NextRequest, NextResponse } from "next/server";
import { unsealData } from "iron-session";
import type { SessionData } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  if (pathname.startsWith("/admin")) {
    const cookieValue = req.cookies.get("premier-art-admin")?.value;
    if (!cookieValue) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    try {
      const session = await unsealData<SessionData>(cookieValue, {
        password: process.env.SESSION_SECRET as string,
      });
      if (!session.isAdmin) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
