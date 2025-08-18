import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { transporter } from "@/lib/nodemailer";
import User from "@/models/User";
import connectDB from "@/lib/connectDB";

export async function POST(req) {
  await connectDB();
  const { email } = await req.json();

  const user = await User.findOne({ email : email });
  if (!user) {
    return NextResponse.json({success : false , error: "User not found" }, { status: 404 });
  }

  // Generate reset token (valid 15 mins)
  const resetToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "15m",
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

  // Send email
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Password Reset Request",
    text: `Click on this link to reset your password ${resetUrl}`
  });

  return NextResponse.json({success : true, message: "Password reset link sent to your email" });
}
