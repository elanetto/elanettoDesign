import Sticker from "../models/Sticker.js";

export const getAllStickers = async (req, res) => {
    try {
        const stickers = await Sticker.findAll();
        res.json(stickers);
    } catch (error) {
        console.error("Error fetching stickers:", error);
        res.status(500).json({ error: "Failed to fetch stickers." });
    }
};

export const getStickerById = async (req, res) => {
    try {
        const sticker = await Sticker.findByPk(req.params.id);
        if (!sticker) return res.status(404).json({ error: "Sticker not found" });

        res.json(sticker);
    } catch (error) {
        console.error("Error fetching sticker by ID:", error);
        res.status(500).json({ error: "Failed to fetch sticker." });
    }
};

//Sequelize handles validation
export const createSticker = async (req, res) => {
    try {
        const sticker = await Sticker.create(req.body);
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

