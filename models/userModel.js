import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import encrypt from "mongoose-encryption";

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
const secret = process.env.SECRET;
userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });


const User = mongoose.model("User",userSchema);

export default User;