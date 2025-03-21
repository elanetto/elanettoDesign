import express from "express";
import {
    getAllStickers,
    getStickerById,
    createSticker,
    updateSticker,
    deleteSticker,
} from "../controllers/stickerController.js";

const router = express.Router();

router.get("/", getAllStickers);
router.get("/:id", getStickerById);
router.post("/", createSticker);
router.put("/:id", updateSticker);
router.delete("/:id", deleteSticker);

export default router;

