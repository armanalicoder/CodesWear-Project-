import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required :true
    },
    email : {
        type :String,
        requried : true,
        unique : true
    },
    address : {
      type : Object,
      required : true,
      default : {
        name : "",
        email : "",
        number : "",
        address : "",
        city  : "",
        state : "",
        pincode : ""
      }
    },
    password :{
        type : String,
        required : true
    }
},
{
        timestamps : true
    }
);
// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});


export default mongoose.models.User ||  mongoose.model("User",userSchema);
