import db from "../Database/index.js";
import * as dao from "./dao.js";
export default function ReviewRoutes(app) {

    app.post("/api/reviews", async (req, res) => {
        try {
            // console.log('1reqbody-', req.body);
          const reviewData = req.body;
          // console.log('2reqbody-', reviewData);
          const newReview = await dao.addReview(reviewData);
          res.json(newReview);
        } catch (error) {
          console.error('Error adding review:', error);
          
          res.status(500).json({ error: 'Internal server error' });
        }
      });
      

    app.get("/api/reviews/:showId", async (req, res) => {    
        const showId = req.params.showId;
        try {
            const result = await dao.getReviewsByShowId(showId);
            res.json(result);
        } catch (error) {
            console.error(`Failed to get review with Show ID ${showId}:`, error);
            res.status(500).json({ message: "An error occurred while trying to getting the review." });
        }
    });

    app.delete("/api/reviews/:reviewId", async (req, res) => {
        const reviewId = req.params.reviewId
        try {
            const result = await dao.deleteReview(reviewId);
            if (!result || result.deletedCount === 0) {
                return res.status(404).json({ message: "Review not found" });
            }
            res.json({ message: `Review with ID ${reviewId} deleted successfully.` });
        } catch (error) {
            console.error(`Failed to delete review with ID ${reviewId}:`, error);
            res.status(500).json({ message: "An error occurred while trying to delete the review." });
        }
    });

    


    app.put("/api/reviews/:reviewId", async (req, res) => {
        const { reviewId } = req.params;
        const updateReview = req.body;
        const op = await dao.updateReview(reviewId, updateReview);
        res.sendStatus(204);
    });

    app.get('/api/averageRating/:showId', async (req, res) => {
        try {
          const showId = req.params.showId;
          const averageRating = await dao.getAverageRatingForShowId(showId);
          res.json({ averageRating });
        } catch (error) {
          console.error('Error getting average rating:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      });
}