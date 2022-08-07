import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";


const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);


const User = mongoose.model("User",userSchema);

export default User;