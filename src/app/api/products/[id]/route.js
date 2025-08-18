import connectToDB from "@/lib/connectDB";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function PUT(request, context) {
  await connectToDB();
  const { id } = await context.params;
  const data = await request.json();
  const updateProduct = await Product.findByIdAndUpdate(id, data);
  return NextResponse.json({ msg: "Updated Succesfully " });
}

export async function GET(request, context) {
  try {
    await connectToDB();
    const { id } = await context.params;
    const product = await Product.findOne({ slug : id});
    if (!product) {
      return NextResponse.json({ success: false, message :"Product Not Found" }, { status: 404 });
    }
    const varients = await Product.find({ title: product.title });
    let colorSizeSlug = {};
    for (let item of varients) {
      if (Object.keys(colorSizeSlug).includes(item.color)) {
        colorSizeSlug[item.color][item.size] = { slug: item.slug };
      } else {
        colorSizeSlug[item.color] = {};
        colorSizeSlug[item.color][item.size] = { slug: item.slug };
      }
    }

    return NextResponse.json({success : true,product,varients: JSON.parse(JSON.stringify(colorSizeSlug))});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
