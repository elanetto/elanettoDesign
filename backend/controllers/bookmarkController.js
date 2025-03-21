import Bookmark from "../models/Bookmark.js";
import ProductImage from "../models/ProductImage.js";

export const getAllBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.findAll({
            include: [
                {
                    model: ProductImage,
                    as: "images",
                    attributes: ["id", "image_url", "image_alt", "is_primary"],
                },
            ],
        });
        res.json(bookmarks);
    } catch (error) {
        console.error("Error fetching bookmarks:", error);
        res.status(500).json({ error: "Failed to fetch bookmarks." });
    }
};

export const getBookmarkById = async (req, res) => {
    try {
        const bookmark = await Bookmark.findByPk(req.params.id, {
            include: [
                {
                    model: ProductImage,
                    as: "images",
                    attributes: ["id", "image_url", "image_alt", "is_primary"],
                },
            ],
        });
        if (!bookmark) return res.status(404).json({ error: "Bookmark not found" });

        res.json(bookmark);
    } catch (error) {
        console.error("Error fetching bookmark:", error);
        res.status(500).json({ error: "Failed to fetch bookmark." });
    }
};

export const createBookmark = async (req, res) => {
    try {
        const { title, description, category, stock_quantity, price, discount, height, width, images } = req.body;

        if (!images || images.length === 0) {
            return res.status(400).json({ error: "At least one image is required" });
        }

        const bookmark = await Bookmark.create({ title, description, category, stock_quantity, price, discount, height, width });

        const bookmarkImages = images.map((img, index) => ({
            product_id: bookmark.id,
            product_type: "bookmark",
            image_url: img.image_url,
            image_alt: img.image_alt,
            is_primary: index === 0,
        }));

        await ProductImage.bulkCreate(bookmarkImages);

        res.status(201).json({ message: "Bookmark created successfully", bookmark });
    } catch (error) {
        console.error("Error creating bookmark:", error);
        res.status(400).json({ error: error.errors?.map((e) => e.message) || "Failed to create bookmark." });
    }
};

export const updateBookmark = async (req, res) => {
    try {
        const bookmark = await Bookmark.findByPk(req.params.id);
        if (!bookmark) return res.status(404).json({ error: "Bookmark not found" });

        await bookmark.update(req.body);

        if (req.body.images) {
            await ProductImage.destroy({ where: { product_id: bookmark.id, product_type: "bookmark" } });

            const updatedImages = req.body.images.map((img, index) => ({
                product_id: bookmark.id,
                product_type: "bookmark",
                image_url: img.image_url,
                image_alt: img.image_alt,
                is_primary: index === 0,
            }));

            await ProductImage.bulkCreate(updatedImages);
        }

        res.json({ message: "Bookmark updated successfully", bookmark });
    } catch (error) {
        console.error("Error updating bookmark:", error);
        res.status(500).json({ error: "Failed to update bookmark." });
    }
};

export const deleteBookmark = async (req, res) => {
    try {
        const bookmark = await Bookmark.findByPk(req.params.id);
        if (!bookmark) return res.status(404).json({ error: "Bookmark not found" });

        await bookmark.destroy();
        res.json({ message: "Bookmark deleted successfully" });
    } catch (error) {
        console.error("Error deleting bookmark:", error);
        res.status(500).json({ error: "Failed to delete bookmark." });
    }
};
