import express from "express";
import {
    getAllCategories,
    createCategory,
    assignCategoryToProduct,
    getProductsByCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", createCategory);
router.post("/assign", assignCategoryToProduct);
// router.get("/:categoryName/:product_type", getProductsByCategory);
router.get("/:categoryId/:product_type", getProductsByCategory);

export default router;
