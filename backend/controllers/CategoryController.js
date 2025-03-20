import Category from "../models/Category.js";

/**
 * Get all categories
 */
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({ order: [["name", "ASC"]] });
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * Get category by ID
 */
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        res.json(category);
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * Create a new category
 */
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: "Category name is required" });

        const category = await Category.create({ name });
        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * Update a category
 */
export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        const { name } = req.body;
        category.name = name || category.name;
        await category.save();

        res.json({ message: "Category updated successfully", category });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * Delete a category
 */
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: "Category not found" });

        await category.destroy();
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
