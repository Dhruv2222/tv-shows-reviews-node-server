import reviewModel from "./model.js";
import mongoose from "mongoose";

export const deleteReview = (reviewId) => { console.log(reviewId); return reviewModel.deleteOne({ _id: reviewId }); };
export const updateReview = (reivewId, review) => reviewModel.updateOne({ _id: reivewId }, { $set: review });
export const getReviewsByShowId = (showId) => reviewModel.find({ showId: showId }).sort({ review_timestamp: -1 });
export const deleteReviewsByUsername = (username) => reviewModel.deleteMany({ username: username });
export const addReview = (reviewData) => {
  reviewData._id = new mongoose.Types.ObjectId();
  const newReview = new reviewModel(reviewData);
  console.log(reviewData);
  return newReview.save();
};

export const getAverageRatingForShowId = async (showId) => {
  try {
    // Find all reviews for the given showId
    const reviews = await reviewModel.find({ showId: showId });
    if (reviews.length === 0) {
      return 0; // Return 0 if there are no reviews for the show
    }

    // Calculate the sum of ratings
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);

    // Calculate the average rating
    const averageRating = (totalRating / reviews.length).toFixed(2);

    return averageRating;
  } catch (error) {
    console.error("Error calculating average rating:", error);
    throw error;
  }
};