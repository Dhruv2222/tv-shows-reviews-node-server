import mongoose from "mongoose";
import ReviewSchema from "./schema.js";
const reviewModel = mongoose.model("Reviews", ReviewSchema);
export default reviewModel;