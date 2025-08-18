import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isVerified = expectedSignature === razorpay_signature;

    if (!isVerified) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    // TODO: mark order as paid in DB here (optional)
    return NextResponse.json({ success: true, payment_id : razorpay_payment_id });
  } catch (err) {
    console.error("Verify error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
