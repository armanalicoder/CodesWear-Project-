import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    email :{
        type : String,
        required :true
    },
    orderId : {
        type : String,
        required : true
    },
    products : {
        type : Object,
        required : true
    },
    address :{
        type : Object,
        required : true
    },
    amount :{
        type : Number,
        required : true
    },
    status :{
        type : String,
        required : true,
        default : "pending"
    },
    paymentId : {
        type : String,
        required : true
    }
},
{
        timestamps : true
    }
);

export default mongoose.models.Order || mongoose.model("Order",orderSchema);
