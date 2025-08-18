import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectToDB from "@/lib/connectDB";
import User from "@/models/User";
import { cookies } from "next/headers";

export async function GET() {
  try {
    await connectToDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ loggedIn: false });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) return NextResponse.json({ loggedIn: false });

    return NextResponse.json({
      loggedIn: true,
      user: {id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ loggedIn: false });
  }
}
