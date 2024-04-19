import mongoose from "mongoose";

export default mongoose.Schema(
    {
        _id: String,
        avgRuntime: String,
        id: { type: Number, unique: true, required: true },
        image: String,
        language: String,
        premiered: String,
        rating: Number,
        status: String,
        summary: String,
        title: String
    },
    { collection: "shows-table" });