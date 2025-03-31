import Address from "../models/Address.js";
import User from "../models/User.js";

// Get all addresses
export const getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.findAll({
      include: [{ model: User, as: "user", attributes: ["id", "username", "email"] }],
    });
    res.json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({ error: "Failed to fetch addresses." });
  }
};

// Get addresses by user ID
export const getAddressesByUserId = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const addresses = await Address.findAll({
        where: { user_id: userId },
        order: [["is_default", "DESC"]],
      });
  
      res.json(addresses);
    } catch (error) {
      console.error("Error fetching addresses for user:", error);
      res.status(500).json({ error: "Failed to fetch addresses for user." });
    }
};
  

// Get default address by user ID
export const getDefaultAddressByUserId = async (req, res) => {
    try {
      const userId = req.user.id;
  
      const defaultAddress = await Address.findOne({
        where: {
          user_id: userId,
          is_default: true,
        },
      });
  
      if (!defaultAddress) return res.status(404).json({ error: "Default address not found." });
  
      res.json(defaultAddress);
    } catch (error) {
      console.error("Error fetching default address:", error);
      res.status(500).json({ error: "Failed to fetch default address." });
    }
};
  

// Get address by ID
export const getAddressById = async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id, {
      include: [{ model: User, as: "user", attributes: ["id", "username", "email"] }],
    });
    if (!address) return res.status(404).json({ error: "Address not found" });
    res.json(address);
  } catch (error) {
    console.error("Error fetching address by ID:", error);
    res.status(500).json({ error: "Failed to fetch address." });
  }
};

// Create address (with JWT secure logic)
export const createAddress = async (req, res) => {
    try {
      // 🔒 Attach user_id from token
      req.body.user_id = req.user.id;
  
      // ✅ Unset any other default addresses if this one is marked as default
      if (req.body.is_default) {
        await Address.update(
          { is_default: false },
          { where: { user_id: req.user.id } }
        );
      }
  
      const address = await Address.create(req.body);
      res.status(201).json({ message: "Address created successfully", address });
    } catch (error) {
      console.error("Error creating address:", error);
      res.status(400).json({ error: "Failed to create address." });
    }
};

// Update address (with secure JWT logic)
export const updateAddress = async (req, res) => {
    try {
      const address = await Address.findByPk(req.params.id);
  
      if (!address) {
        return res.status(404).json({ error: "Address not found" });
      }
  
      const userIsOwner = address.user_id === req.user.id;
      const userIsAdmin = req.user.role === "admin";
  
      // 🔒 Check if the logged-in user is either the owner or an admin
      if (!userIsOwner && !userIsAdmin) {
        return res.status(403).json({ error: "You are not allowed to update this address." });
      }
  
      // ✅ If setting this address as default, unset other defaults for the same user
      if (req.body.is_default) {
        await Address.update(
          { is_default: false },
          { where: { user_id: address.user_id } } // Use address's owner here
        );
      }
  
      await address.update(req.body);
      res.json({ message: "Address updated successfully", address });
    } catch (error) {
      console.error("Error updating address:", error);
      res.status(500).json({ error: "Failed to update address." });
    }
};


// Delete address (with secure JWT logic)
export const deleteAddress = async (req, res) => {
    try {
      const address = await Address.findByPk(req.params.id);
  
      if (!address) {
        return res.status(404).json({ error: "Address not found" });
      }
  
      const userIsOwner = address.user_id === req.user.id;
      const userIsAdmin = req.user.role === "admin";
  
      // 🔒 Only owner or admin can delete
      if (!userIsOwner && !userIsAdmin) {
        return res.status(403).json({ error: "You are not allowed to delete this address." });
      }
  
      await address.destroy();
      res.json({ message: "Address deleted successfully" });
    } catch (error) {
      console.error("Error deleting address:", error);
      res.status(500).json({ error: "Failed to delete address." });
    }
};
  
