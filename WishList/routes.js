import * as dao from "./dao.js";

export default function WishlistRoutes(app) {
    app.post("/api/wishlist", async (req, res) => {
        try {
          console.log('1reqbody-', req.body);
            const wishlistItemData = req.body;
            // console.log('2reqbody-', wishlistItemData);
            const newWishlistItem = await dao.addToWishlist(wishlistItemData);
            res.json(newWishlistItem);
        } catch (error) {
            console.error('Error adding item to wishlist:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    app.delete("/api/wishlist/:wishlistItemId", async (req, res) => {
        console.log("hiii")
        const wishlistItemId = req.params.wishlistItemId;
        console.log(wishlistItemId)
        try {
            const result = await dao.removeFromWishlist(wishlistItemId);
            if (!result || result.deletedCount === 0) {
                return res.status(404).json({ message: "Wishlist item not found" });
            }
            res.json({ message: `Wishlist item with ID ${wishlistItemId} deleted successfully.` });
        } catch (error) {
            console.error(`Failed to delete wishlist item with ID ${wishlistItemId}:`, error);
            res.status(500).json({ message: "An error occurred while trying to delete the wishlist item." });
        }
    });

    app.get("/api/wishlist/:username", async (req, res) => {
        const username = req.params.username;
        console.log(username);
        try {
            const wishlist = await dao.getWishlistByUsername(username);
            res.json(wishlist);
        } catch (error) {
            console.error(`Failed to get wishlist for user ${username}:`, error);
            res.status(500).json({ message: "An error occurred while trying to get the wishlist." });
        }
    });
    
}


