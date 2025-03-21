import StickerAlternative from "../models/StickerAlternative.js";
import ProductImage from "../models/ProductImage.js";

export const createStickerAlternative = async (req, res) => {
    try {
        const { sticker_id, title, description, price, stock_quantity, images } = req.body;

        if (!images || images.length === 0) {
            return res.status(400).json({ error: "At least one image is required" });
        }

        const alternative = await StickerAlternative.create({ sticker_id, title, description, price, stock_quantity });

        const alternativeImages = images.map((img, index) => ({
            product_id: alternative.id,
            product_type: "sticker_alternative",
            image_url: img.image_url,
            image_alt: img.image_alt,
            is_primary: index === 0, // First image is primary
        }));

        await ProductImage.bulkCreate(alternativeImages);

        res.status(201).json({ message: "Sticker alternative created successfully", alternative });
    } catch (error) {
        console.error("Error creating sticker alternative:", error);
        res.status(400).json({ error: "Failed to create sticker alternative." });
    }
};

export const deleteStickerAlternative = async (req, res) => {
    try {
        const alternative = await StickerAlternative.findByPk(req.params.id);
        if (!alternative) return res.status(404).json({ error: "Sticker alternative not found" });

        await alternative.destroy();
        res.json({ message: "Sticker alternative deleted successfully" });

    } catch (error) {
        console.error("Error deleting sticker alternative:", error);
        res.status(500).json({ error: "Failed to delete sticker alternative." });
    }
};
