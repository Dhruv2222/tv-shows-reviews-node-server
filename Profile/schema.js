import mongoose from "mongoose";

export default mongoose.Schema(
    {
        _id: String,
        user_id: String,
        review_tvshow: String,
        review_heading: String,
        review_description: String,
        review_date: String,
        review_time: String
    },
    { collection: "reviews-table" });