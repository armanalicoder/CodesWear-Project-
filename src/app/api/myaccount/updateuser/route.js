import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request) {
  const reqData = await request.json();
  //Logic for Password Update
  if(reqData.password && reqData.email){
    const email = reqData.email;
    const oldPassword = reqData.password.oldpassword;
    const newPassword = reqData.password.newpassword;
    const user = await User.findOne({email : email})
    if(user){
        const isValid = await bcrypt.compare(oldPassword,user.password)
        if(isValid){
            const salt = await bcrypt.genSalt(10);
            const hashedpassword = await bcrypt.hash(newPassword,salt)
            await User.findByIdAndUpdate(user._id,{$set : {password : hashedpassword }}).then((res)=>{})
            const cookieStore = await cookies();
              cookieStore.set({
                name: "token",
                value: "",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                expires: new Date(0),
              });
            return NextResponse.json({success : true , message : "Password Changed Successfully"})
        }
        else{
            return NextResponse.json({success : false , message : "Incorrect Old Password!"})
        }
    }
    else{
        return NextResponse.json({success : false , message : "user not found"})
    }
    
  }

  //Logic for Information update
  if (reqData.email && reqData.data) {
    const user = await User.findOne({ email: reqData.email });
    if (user) {
      await User.findByIdAndUpdate(user._id, {
        $set: { address: reqData.data },
      });
      return NextResponse.json({success : true, message : "Detailed Updated Successfully"})
    } else {
      return NextResponse.json({ success: false, message: "User not Found" });
    }
  } else {
    return NextResponse.json({
      success: false,
      message: "Kindly Fill Correct Details",
    });
  }

  
}
