import mongoose from "mongoose";

export default mongoose.Schema(
    {
        _id: String,
        username: String,
        showId: Number,
        review_title: String,
        review_description: String,
        review_timestamp: { type: Date} ,
        rating: Number

        
    },
    { collection: "reviews-table" });