import Favorite from "../models/Favorite.js";

// Add to favorites
export const addFavorite = async (req, res) => {
    try {
        const { user_id, product_id, product_type } = req.body;

        const exists = await Favorite.findOne({ where: { user_id, product_id, product_type } });
        if (exists) return res.status(400).json({ error: "Already favorited" });

        const favorite = await Favorite.create({ user_id, product_id, product_type });
        res.status(201).json({ message: "Favorite added", favorite });
    } catch (error) {
        console.error("Error adding favorite:", error);
        res.status(500).json({ error: "Failed to add favorite" });
    }
};

// Get favorites for a user
export const getFavoritesByUser = async (req, res) => {
    try {
        const user_id = req.params.userId;
        const favorites = await Favorite.findAll({ where: { user_id } });
        res.json(favorites);
    } catch (error) {
        console.error("Error fetching favorites:", error);
        res.status(500).json({ error: "Failed to fetch favorites" });
    }
};

// Remove from favorites
export const removeFavorite = async (req, res) => {
    try {
        const { user_id, product_id, product_type } = req.body;

        const deleted = await Favorite.destroy({
            where: { user_id, product_id, product_type }
        });

        if (deleted === 0) {
            return res.status(404).json({ error: "Favorite not found" });
        }

        res.json({ message: "Favorite removed" });
    } catch (error) {
        console.error("Error removing favorite:", error);
        res.status(500).json({ error: "Failed to remove favorite" });
    }
};
