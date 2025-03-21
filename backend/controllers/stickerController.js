import Sticker from "../models/Sticker.js";
import ProductImage from "../models/ProductImage.js";
import StickerAlternative from "../models/StickerAlternative.js";

export const getAllStickers = async (req, res) => {
    try {
        const stickers = await Sticker.findAll({
            include: [
                {
                    model: ProductImage,
                    as: "images",
                    attributes: ["id", "image_url", "image_alt", "is_primary"],
                },
                {
                    model: StickerAlternative,
                    as: "alternatives",
                    include: [
                        {
                            model: ProductImage,
                            as: "images",
                            attributes: ["id", "image_url", "image_alt", "is_primary"],
                        },
                    ],
                },
            ],
        });
        res.json(stickers);
    } catch (error) {
        console.error("Error fetching stickers:", error);
        res.status(500).json({ error: "Failed to fetch stickers." });
    }
};

export const getStickerById = async (req, res) => {
    try {
        const sticker = await Sticker.findByPk(req.params.id, {
            include: [
                {
                    model: ProductImage,
                    as: "images",
                    attributes: ["id", "image_url", "image_alt", "is_primary"],
                },
                {
                    model: StickerAlternative,
                    as: "alternatives",
                    include: [
                        {
                            model: ProductImage,
                            as: "images",
                            attributes: ["id", "image_url", "image_alt", "is_primary"],
                        },
                    ],
                },
            ],
        });
        if (!sticker) return res.status(404).json({ error: "Sticker not found" });

        res.json(sticker);
    } catch (error) {
        console.error("Error fetching sticker by ID:", error);
        res.status(500).json({ error: "Failed to fetch sticker." });
    }
};
