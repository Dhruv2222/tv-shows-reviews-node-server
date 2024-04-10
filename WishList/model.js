import mongoose from "mongoose";
import WishlistSchema from "./schema.js";
const wishlistModel = mongoose.model("Wishlist", WishlistSchema);
export default wishlistModel;


