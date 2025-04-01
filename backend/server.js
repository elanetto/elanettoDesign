import dotenv from "dotenv";
dotenv.config(); // Load .env first

import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import "./models/index.js";

import stickerRoutes from "./routes/stickerRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import stickerAlternativeRoutes from "./routes/stickerAlternativeRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import bundleRoutes from "./routes/bundleRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/stickers", stickerRoutes);
app.use("/api/sticker-alternatives", stickerAlternativeRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/bundles", bundleRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/addresses", addressRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Elanetto's Sticker API 💖✨");
});

app.get("/debug", async (req, res) => {
  try {
    const [results] = await sequelize.query("SELECT * FROM Stickers LIMIT 1");
    res.json(results);
  } catch (e) {
    console.error("🔥 DEBUG ERROR:", e);
    res.status(500).json({ error: e.message });
  }
});

// Async startup function
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("🛜 Database connected successfully");

    await sequelize.sync({ alter: false });
    console.log("✅ Sequelize synced (without altering existing tables)");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();
