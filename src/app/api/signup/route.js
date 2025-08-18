import connectToDB from "@/lib/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectToDB();
  const userData = await request.json();
  try {
    const existUser = await User.findOne({ email: userData.email });
    if (!existUser) {
      const user = new User(userData);
      await user.save();
      return NextResponse.json({ Save: true });
    } else {
      return NextResponse.json({ exist: true });
    }
  } catch (err) {
    console.log(err)
    return NextResponse.json({ Save: false });
  }
}
