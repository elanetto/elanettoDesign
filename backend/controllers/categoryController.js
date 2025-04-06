import { Op } from "sequelize";
import Category from "../models/Category.js";
import ProductCategory from "../models/ProductCategory.js";
import Sticker from "../models/Sticker.js";
import ProductImage from "../models/ProductImage.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { is_active: true },
    });
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

    await ProductCategory.destroy({
      where: { product_id, product_type },
    });

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
    const { categoryId, product_type } = req.params;
    const { fullData } = req.query;

    if (!['sticker', 'bookmark', 'bundle'].includes(product_type)) {
      return res.status(400).json({ error: `Invalid product type '${product_type}'` });
    }

    const category = await Category.findByPk(categoryId);
    if (!category || !category.is_active) {
      return res.status(404).json({ error: `Category ID '${categoryId}' not found` });
    }

    const assignments = await ProductCategory.findAll({
      where: {
        category_id: categoryId,
        product_type,
      },
    });

    const productIds = assignments.map((a) => a.product_id);

    if (fullData === "true" && product_type === "sticker") {
      const products = await Sticker.findAll({
        where: {
          id: { [Op.in]: productIds },
        },
        include: [
          { model: ProductImage, as: "images" },
          { model: ProductCategory, as: "category_link", include: ["category"] },
        ],
        order: [["created_at", "DESC"]],
      });

      return res.json({
        product_type,
        category: category.name,
        products,
      });
    }

    res.json({
      product_type,
      category: category.name,
      product_ids: productIds,
    });
  } catch (error) {
    console.error("Error in getProductsByCategory:", error);
    res.status(500).json({ error: "Failed to fetch products by category." });
  }
};