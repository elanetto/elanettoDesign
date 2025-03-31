import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import stickerRoutes from "./routes/stickerRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import sequelize from "./config/db.js";
import stickerAlternativeRoutes from "./routes/stickerAlternativeRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import bundleRoutes from "./routes/bundleRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";


// Sync the database (this updates the structure automatically)
sequelize.sync({ alter: true })
    .then(() => console.log("Database synced successfully"))
    .catch((error) => console.error("Failed to sync database:", error));

dotenv.config();

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
    res.send("Welcome to Elanetto's Sticker API");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

