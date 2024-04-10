import wishlistModel from "./model.js";
import mongoose from "mongoose";


export const addToWishlist = (wishlistData) => {
    wishlistData._id = new mongoose.Types.ObjectId();
    const newWishlistItem = new wishlistModel(wishlistData);
    console.log(wishlistData);
    return newWishlistItem.save();
};

export const removeFromWishlist = (wishlistItemId) => {
    console.log("dao");
    console.log(wishlistItemId);
    return wishlistModel.deleteOne({ showId: wishlistItemId });
};

export const getWishlistByUsername = (username) => wishlistModel.find({ username: username });


