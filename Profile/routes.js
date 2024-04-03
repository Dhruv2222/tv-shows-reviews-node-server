import db from "../Database/index.js";
import * as dao from "./dao.js";
export default function ReviewRoutes(app) {
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
}