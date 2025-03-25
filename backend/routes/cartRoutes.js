import express from "express";
import {
    addToCart,
    getCartByUser,
    removeFromCart,
    clearCart
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/", addToCart);
router.get("/:userId", getCartByUser);
router.delete("/", removeFromCart);
router.delete("/clear/:userId", clearCart);

export default router;
