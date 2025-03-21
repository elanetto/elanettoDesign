import express from "express";
import {
    getAllBookmarks,
    getBookmarkById,
    createBookmark,
    updateBookmark,
    deleteBookmark,
} from "../controllers/bookmarkController.js";

const router = express.Router();

router.get("/", getAllBookmarks);
router.get("/:id", getBookmarkById);
router.post("/", createBookmark);
router.put("/:id", updateBookmark);
router.delete("/:id", deleteBookmark);

export default router;
