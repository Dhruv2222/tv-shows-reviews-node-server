import showModel from "./model.js";
import mongoose from "mongoose";

export const findShowByShowId = (showId) => showModel.findOne({ id: showId });
export const createShow = (show) => {
    show._id = new mongoose.Types.ObjectId();
    showModel.create(show);
    return show;
};