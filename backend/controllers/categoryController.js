import Category from "../models/Category.js";
import ProductCategory from "../models/ProductCategory.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Failed to fetch categories." });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category.create({ name });
        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(400).json({ error: error.message });
    }
};

export const assignCategoryToProduct = async (req, res) => {
    try {
        const { product_id, product_type, category_id } = req.body;

        const existing = await ProductCategory.findOne({
            where: { product_id, product_type, category_id }
        });

        if (existing) {
            return res.status(400).json({ error: "Category already assigned to product." });
        }

        const assignment = await ProductCategory.create({
            product_id,
            product_type,
            category_id,
        });

        res.status(201).json({ message: "Category assigned to product", assignment });
    } catch (error) {
        console.error("Error assigning category:", error);
        res.status(500).json({ error: "Failed to assign category." });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const { categoryName, product_type } = req.params;

        const category = await Category.findOne({ where: { name: categoryName } });
        if (!category) return res.status(404).json({ error: "Category not found" });

        const assignments = await ProductCategory.findAll({
            where: { category_id: category.id, product_type }
        });

        const productIds = assignments.map((a) => a.product_id);

        res.json({ product_type, category: categoryName, product_ids: productIds });
    } catch (error) {
        console.error("Error fetching category products:", error);
        res.status(500).json({ error: "Failed to fetch products by category." });
    }
};
