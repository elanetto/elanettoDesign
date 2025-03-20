import Sticker from "../models/Sticker.js";
import ProductImage from "../models/ProductImage.js";

export const getAllStickers = async (req, res) => {
    try {
        const stickers = await Sticker.findAll({
            include: [
                {
                    model: ProductImage,
                    as: "images",
                    attributes: ["id", "image_url", "image_alt", "is_primary"],
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
            ],
        });
        if (!sticker) return res.status(404).json({ error: "Sticker not found" });

        res.json(sticker);
    } catch (error) {
        console.error("Error fetching sticker by ID:", error);
        res.status(500).json({ error: "Failed to fetch sticker." });
    }
};

export const createSticker = async (req, res) => {
    try {
        const { title, description, category, sticker_type, stock_quantity, price, discount, height, width, images } = req.body;

        if (!images || images.length === 0) {
            return res.status(400).json({ error: "At least one image is required" });
        }

        const sticker = await Sticker.create({ title, description, category, sticker_type, stock_quantity, price, discount, height, width });

        const stickerImages = images.map((img, index) => ({
            product_id: sticker.id,
            image_url: img.image_url,
            image_alt: img.image_alt,
            is_primary: index === 0, // First image is the primary image
        }));

        await ProductImage.bulkCreate(stickerImages);

        res.status(201).json({ message: "Sticker created successfully", sticker });
    } catch (error) {
        console.error("Error creating sticker:", error);
        res.status(400).json({ error: error.errors?.map(e => e.message) || "Failed to create sticker." });
    }
};

export const updateSticker = async (req, res) => {
    try {
        const sticker = await Sticker.findByPk(req.params.id);
        if (!sticker) return res.status(404).json({ error: "Sticker not found" });

        await sticker.update(req.body);

        if (req.body.images) {
            await ProductImage.destroy({ where: { product_id: sticker.id } });

            const updatedImages = req.body.images.map((img, index) => ({
                product_id: sticker.id,
                image_url: img.image_url,
                image_alt: img.image_alt,
                is_primary: index === 0, // First image remains primary
            }));

            await ProductImage.bulkCreate(updatedImages);
        }

        res.json({ message: "Sticker updated successfully", sticker });
    } catch (error) {
        console.error("Error updating sticker:", error);
        res.status(500).json({ error: "Failed to update sticker." });
    }
};

export const deleteSticker = async (req, res) => {
    try {
        const sticker = await Sticker.findByPk(req.params.id);
        if (!sticker) return res.status(404).json({ error: "Sticker not found" });

        await sticker.destroy();
        res.json({ message: "Sticker deleted successfully" });

    } catch (error) {
        console.error("Error deleting sticker:", error);
        res.status(500).json({ error: "Failed to delete sticker." });
    }
};
