import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title :{
        type : String,
        required :true
    },
    slug : {
        type :String,
        requried : true,
        unique : true
    },
    description :{
        type : String,
        required : true
    },
    img :{
        type : String,
        required : true
    },
    category :{
        type : String,
        required : true
    },
    size :{
        type : String,
    },
    color :{
        type : String,
    },
    price :{
        type : String,
        required : true
    },
    avlQty :{
        type : Number,
        required : true
    }
},
{
        timestamps : true
    }
);

export default mongoose.models.Product || mongoose.model("Product",productSchema);
