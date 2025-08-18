import connectToDB from "@/lib/connectDB";
import Product from "@/models/Product";
import { connect } from "mongoose";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export const runtime = "nodejs"; // required (Razorpay uses Node APIs)

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const cart = body; 

    let totalAmount = 0;
    let orderProducts = {};
    //console.log(Object.keys(cart)) //[ 'stylish-dev-tshirt', 'ceramic-mug-coder' ]
    for (let slug of Object.keys(cart)) {
      let item = cart[slug];
      // console.log(item) { }, { }...
      let product = await Product.findOne({slug : slug});
      console.log(product)
      if (!product) {
        return new Response(
          JSON.stringify({ success: false, message: `Product not found: ${slug}` }),
          { status: 400 }
        );
      }
      if(product.avlQty==0){
        return NextResponse.json({success : false , message : "Out of Stock"})
      }
      if(product.price!=item.price){
        return NextResponse.json({success : false, message : "Some of the item price has been changed"})
      }
      let finalPrice = product.price; //1
      let totalItem = finalPrice * item.qty; //1*1=1
      totalAmount = totalAmount + totalItem //1

      orderProducts[slug] = {
        name: item.name,
        description : product.description,
        price: finalPrice,
        qty: item.qty,
        size: item.size,
        color: item.color,
        img: product.img,
      };
    }

    // Razorpay expects paise
    const options = {
      amount: Math.round(Number(totalAmount) * 100), // ₹ → paise
      currency : "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {},
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({success: true, order,orderProducts });
  } 
  catch (err) {
    console.error(err);
    return NextResponse.json({success : false, error : err.message})
  }
}

