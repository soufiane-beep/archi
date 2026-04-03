import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export interface SessionData {
  isAdmin?: boolean;
}

const sessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: "premier-art-admin",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies();
  return getIronSession<SessionData>(cookieStore, sessionOptions);
}

export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await getSession();
  if (!session.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

export { sessionOptions };
