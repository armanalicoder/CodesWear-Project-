import { NextResponse } from "next/server";
import connectToDB from "@/lib/connectDB";
import Product from "@/models/Product";


export async function GET(request){
    await connectToDB();
    const data = await Product.find({});
    return NextResponse.json(data)
}

export async function POST(request) {
    await connectToDB();
    const data = await request.json();
    try{
        const data1 = await Product.insertMany(data)
        return NextResponse.json({msg :"Done"})
    }catch(err){
        console.log(err);
        return NextResponse.json({msg : "failed"})
    }
}