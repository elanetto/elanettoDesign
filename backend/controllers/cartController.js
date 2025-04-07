import Cart from "../models/Cart.js";

// Add or update cart item
export const addToCart = async (req, res) => {
    const { user_id, product_type, product_id, quantity } = req.body;

    try {
        const existing = await Cart.findOne({
            where: { user_id, product_type, product_id },
        });

        if (existing) {
            existing.quantity += quantity;
            await existing.save();
            return res.json({ message: "Cart item updated", cart: existing });
        }

        const newItem = await Cart.create({ user_id, product_type, product_id, quantity });
        res.status(201).json({ message: "Item added to cart", cart: newItem });

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ error: "Failed to add item to cart" });
    }
};

// Get all cart items for a user
export const getCartByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const items = await Cart.findAll({ where: { user_id: userId } });
        res.json(items);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ error: "Failed to fetch cart" });
    }
};

// Remove a single item from cart
export const removeFromCart = async (req, res) => {
    const { user_id, product_type, product_id } = req.body;

    try {
        const deleted = await Cart.destroy({
            where: { user_id, product_type, product_id }
        });

        if (!deleted) {
            return res.status(404).json({ error: "Cart item not found" });
        }

        res.json({ message: "Item removed from cart" });
    } catch (error) {
        console.error("Error removing cart item:", error);
        res.status(500).json({ error: "Failed to remove item" });
    }
};

// Clear entire cart for user
export const clearCart = async (req, res) => {
    const { userId } = req.params;

    try {
        await Cart.destroy({ where: { user_id: userId } });
        res.json({ message: "Cart cleared" });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ error: "Failed to clear cart" });
    }
};
