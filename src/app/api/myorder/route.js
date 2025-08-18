import { NextResponse } from "next/server";
import connectToDB from "@/lib/connectDB";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function GET(request) {
  try {
    await connectToDB();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ loggedIn: false });
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const order = await Order.find({email :decoded.email});
    if (!order) {
        return NextResponse.json({orderFound : false , msg: "No Order Found" });
    }else{
        return NextResponse.json({orderFound : true , order})
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err });
  }
}
