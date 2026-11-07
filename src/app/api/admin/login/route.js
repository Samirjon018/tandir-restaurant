import { NextResponse } from "next/server";
import { checkPassword, createToken, COOKIE, MAX_AGE } from "@/lib/auth";

export async function POST(request) {
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SECRET) {
    return NextResponse.json(
      { error: ".env.local da ADMIN_PASSWORD va ADMIN_SECRET yo'q" },
      { status: 500 }
    );
  }

  const { password } = await request.json().catch(() => ({}));

  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Parol noto'g'ri" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, createToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
  return res;
}