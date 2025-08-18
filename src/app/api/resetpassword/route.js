import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/lib/connectDB";

export async function POST(req) {
  await connectDB();
  const { token, newPassword } = await req.json();

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded)
    const user = await User.findById(decoded.id);

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    user.password = newPassword;
    await user.save();

    return NextResponse.json({ message: "Password reset successful!" });
  } catch (err) {
    return NextResponse.json({ error: "Token expired or invalid" }, { status: 400 });
  }
}
