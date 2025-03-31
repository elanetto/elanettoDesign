import express from "express";
import {
  getAllAddresses,
  getAddressById,
  getAddressesByUserId,
  getDefaultAddressByUserId,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";

import { authenticateToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// 🛡️ All routes below this line are protected
router.use(authenticateToken);

// Logged-in user's own addresses
router.get("/me", getAddressesByUserId);
router.get("/me/default", getDefaultAddressByUserId);

// Admin-only route to see all addresses
router.get("/admin/all", isAdmin, getAllAddresses);

router.get("/:id", getAddressById);
router.post("/", createAddress);
router.put("/:id", updateAddress);
router.delete("/:id", deleteAddress);

export default router;
