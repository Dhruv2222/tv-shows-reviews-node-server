import mongoose from  "mongoose";
import  ShowSchema  from "./schema.js";
const showModel = mongoose.model("Shows", ShowSchema);
export default showModel;