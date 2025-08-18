import connectToDB from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request) {
  await connectToDB();
  const userData = await request.json();
  try {
    const existUser = await User.findOne({ email: userData.email });
    if (!existUser) {
      return NextResponse.json({ isExist: false });
    } else {
      const isValid = await bcrypt.compare(
        userData.password,
        existUser.password
      );
      if (isValid) {
        const token = jwt.sign({ id: existUser._id, name : existUser.name, email : existUser.email, }, process.env.SECRET_KEY, {
          expiresIn: 3 * 24 * 60 * 60, //3 days
        });
        const response = NextResponse.json({ isValid: true });
        const cookieStore = await cookies();
        cookieStore.set("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 3 * 24 * 60 * 60,
        });
        return response;
      } else {
        return NextResponse.json({ isValid: false });
      }
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err });
  }
}
