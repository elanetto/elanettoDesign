import express from "express";
import { createStickerAlternative, deleteStickerAlternative } from "../controllers/stickerAlternativeController.js";

const router = express.Router();

router.post("/", createStickerAlternative);
router.delete("/:id", deleteStickerAlternative);

export default router;
