import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(params, context) {
  const { id } = await context.params;
  if (id) {
    const data = await User.findById(id);
    if(!data){
      return NextResponse.json({
        success: false,
        message: "User Data Not Found",
      });
    }
    if ( 
      data.address.name != "" &&
      data.address.email != "" &&
      data.address.number != "" &&
      data.address.address != "" &&
      data.address.city != "" &&
      data.address.state != "" &&
      data.address.pincode != ""
    ) {
      return NextResponse.json({ success: true, address: data.address });
    }
  } else {
    return NextResponse.json({ success: false, message: "User not logged in" });
  }
}
