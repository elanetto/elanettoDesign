import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import stickerRoutes from "./routes/stickerRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import sequelize from "./config/db.js";

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
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Elanetto's Sticker API");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

