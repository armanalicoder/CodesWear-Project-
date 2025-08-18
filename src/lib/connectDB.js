import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

let isConnected = false;

export default async function connectToDB(){
    if(isConnected) return

    try{
        await mongoose.connect(MONGO_URI);
        isConnected = true;
        // console.log("DB Connected Succefully")
    }catch(err){
        console.error("DB Connection Failed",err)
    }
}