import Bundle from "../models/Bundle.js";
import BundleItem from "../models/BundleItem.js";
import ProductImage from "../models/ProductImage.js";

export const getAllBundles = async (req, res) => {
    try {
        const bundles = await Bundle.findAll({
            include: [
                {
                    model: ProductImage,
                    as: "images",
                    attributes: ["id", "image_url", "image_alt", "is_primary"],
                },
                {
                    model: BundleItem,
                    as: "items",
                    attributes: ["item_type", "item_id"],
                },
            ],
        });
        res.json(bundles);
    } catch (error) {
        console.error("Error fetching bundles:", error);
        res.status(500).json({ error: "Failed to fetch bundles." });
    }
};

export const getBundleById = async (req, res) => {
    try {
        const bundle = await Bundle.findByPk(req.params.id, {
            include: [
                {
                    model: ProductImage,
                    as: "images",
                    attributes: ["id", "image_url", "image_alt", "is_primary"],
                },
                {
                    model: BundleItem,
                    as: "items",
                    attributes: ["item_type", "item_id"],
                },
            ],
        });
        if (!bundle) return res.status(404).json({ error: "Bundle not found" });

        res.json(bundle);
    } catch (error) {
        console.error("Error fetching bundle:", error);
        res.status(500).json({ error: "Failed to fetch bundle." });
    }
};

export const createBundle = async (req, res) => {
    try {
        const { title, description, total_individual_price, bundle_price, status, items, images } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "Bundle must include at least one item." });
        }

        if (!images || images.length === 0) {
            return res.status(400).json({ error: "Bundle must include at least one image." });
        }

        const bundle = await Bundle.create({ title, description, total_individual_price, bundle_price, status });

        const bundleItems = items.map((item) => ({
            bundle_id: bundle.id,
            item_type: item.item_type,
            item_id: item.item_id,
        }));

        const bundleImages = images.map((img, index) => ({
            product_id: bundle.id,
            product_type: "bundle",
            image_url: img.image_url,
            image_alt: img.image_alt,
            is_primary: index === 0,
        }));

        await BundleItem.bulkCreate(bundleItems);
        await ProductImage.bulkCreate(bundleImages);

        res.status(201).json({ message: "Bundle created successfully", bundle });
    } catch (error) {
        console.error("Error creating bundle:", error);
        res.status(400).json({ error: error.message || "Failed to create bundle." });
    }
};

export const deleteBundle = async (req, res) => {
    try {
        const bundle = await Bundle.findByPk(req.params.id);
        if (!bundle) return res.status(404).json({ error: "Bundle not found" });

        await bundle.destroy();
        res.json({ message: "Bundle deleted successfully" });
    } catch (error) {
        console.error("Error deleting bundle:", error);
        res.status(500).json({ error: "Failed to delete bundle." });
    }
};
