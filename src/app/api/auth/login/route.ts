import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, SessionData } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
  }

  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  session.isAdmin = true;
  await session.save();

  return NextResponse.json({ ok: true });
}
