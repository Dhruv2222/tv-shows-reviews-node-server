import reviewModel from "./model.js";

export const deleteReview = (reviewId) => reviewModel.deleteOne({ _id: reviewId });
export const updateReview = (reivewId, review) => reviewModel.updateOne({ _id: reivewId }, { $set: review });