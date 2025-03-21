import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Sticker from "./Sticker.js";

const StickerAlternative = sequelize.define(
    "StickerAlternative",
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        sticker_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: Sticker,
                key: "id",
            },
            onDelete: "CASCADE",
        },
        title: {
            type: DataTypes.STRING(100),
        },
        description: {
            type: DataTypes.TEXT,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
        },
        stock_quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 10,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "sticker_alternatives",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

// Define relationship with Stickers
Sticker.hasMany(StickerAlternative, { foreignKey: "sticker_id", as: "alternatives" });
StickerAlternative.belongsTo(Sticker, { foreignKey: "sticker_id" });

export default StickerAlternative;
