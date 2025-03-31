import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Address from "../models/Address.js";

// Create new order
export const createOrder = async (req, res) => {
    try {
      const userId = req.user.id;
      const { address_id, items, total_amount } = req.body;
  
      if (!items || items.length === 0) {
        return res.status(400).json({ error: "Order must contain at least one item." });
      }
  
      // 🔒 Validate address ownership
      if (address_id) {
        const address = await Address.findByPk(address_id);
        if (!address || address.user_id !== userId) {
          return res.status(403).json({ error: "You are not allowed to use this address." });
        }
      }
  
      const order = await Order.create({ user_id: userId, address_id, total_amount });
  
      const orderItems = items.map((item) => ({
        order_id: order.id,
        sticker_id: item.sticker_id,
        quantity: item.quantity,
        price: item.price,
      }));
  
      await OrderItem.bulkCreate(orderItems);
  
      res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order." });
    }
};

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: OrderItem, as: "items" },
                { model: Address, as: "address" }
            ]
        });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders." });
    }
};

// Get a single order by ID
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [
                { model: OrderItem, as: "items" },
                { model: Address, as: "address" }
            ]
        });

        if (!order) return res.status(404).json({ error: "Order not found." });

        res.json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ error: "Failed to fetch order." });
    }
};
