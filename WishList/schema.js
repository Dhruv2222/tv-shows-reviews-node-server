import mongoose from "mongoose";

export default mongoose.Schema(
    {
    _id: String,
    username: String, 
    showId: Number
}, 
{ collection: "wishlist-table" });

