import connectDB from "@/lib/connectDB";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import User from "@/models/User";

export async function POST(request) {
  await connectDB();
  const data = await request.json();

  // Save the order
  try {
    const newOrder = new Order(data);
    await newOrder.save();
    // return NextResponse.json({success : true,message : "Order Saved"})
  } catch (err) {
    return NextResponse.json({ success: false, message: err });
  }
  try {
    //Save User Address to thier Profile
    const user = await User.findOneAndUpdate(
      { email: data.address.email },
      { $set: { address: data.address } }
    );
    await user.save();
  } catch (err) {
    return NextResponse.json({ success: false, message: err });
  }

  try {
    // Decrease the quantity for each product
    const products = data.products; // already an object { slug: {qty, ...} }

    for (let slug of Object.keys(products)) {
      let item = products[slug]; // now correctly gets { qty, price, ... }

      // find the product
      let product = await Product.findOne({ slug: slug });

      if (product) {
        await Product.findOneAndUpdate(
          { slug: slug },
          { $set: { avlQty: product.avlQty - item.qty } }
        );
      }
    }
  } catch (err) {
    return NextResponse.json({ success: false, message: err });
  }
  return NextResponse.json({ success: true, message: "Order saved" });
}
