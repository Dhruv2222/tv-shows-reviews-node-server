import mongoose from "mongoose";

export default mongoose.Schema(
    {
        _id: String,
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        email: String,
        phone_number: String,
        role: String,
        favorite_TVshow: String
    },
    { collection: "users-table" });