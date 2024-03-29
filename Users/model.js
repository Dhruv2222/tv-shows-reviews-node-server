import mongoose from  "mongoose";
import  UserSchema  from "./schema.js";
const userModel = mongoose.model("Users", UserSchema);
export default userModel;