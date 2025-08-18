import connectToDB from "@/lib/connectDB";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  await connectToDB();
  const {id} = await context.params;
  const order = await Order.findOne({ orderId: id });
  if (!order) {
    return NextResponse.json({orderFound : false})
  }

  return NextResponse.json({orderFound : true ,order})
}
