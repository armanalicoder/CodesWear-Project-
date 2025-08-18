import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function GET(request) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
  return NextResponse.json({ logout: true, message: "Logged out" });
}
