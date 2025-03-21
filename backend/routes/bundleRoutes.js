import express from "express";
import {
    getAllBundles,
    getBundleById,
    createBundle,
    deleteBundle,
} from "../controllers/bundleController.js";

const router = express.Router();

router.get("/", getAllBundles);
router.get("/:id", getBundleById);
router.post("/", createBundle);
router.delete("/:id", deleteBundle);

export default router;
