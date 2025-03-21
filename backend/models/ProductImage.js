import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Sticker from "./Sticker.js";
import StickerAlternative from "./StickerAlternative.js";
import Bookmark from "./Bookmark.js";
import Bundle from "./Bundle.js";

const ProductImage = sequelize.define(
    "ProductImage",
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
        },
        product_type: {
            type: DataTypes.ENUM("sticker", "sticker_alternative", "bookmark", "bundle"),
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        image_alt: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        is_primary: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: "product_images",
        timestamps: false,
    }
);

// Associations
Sticker.hasMany(ProductImage, { foreignKey: "product_id", as: "images", scope: { product_type: "sticker" } });
StickerAlternative.hasMany(ProductImage, { foreignKey: "product_id", as: "images", scope: { product_type: "sticker_alternative" } });
Bookmark.hasMany(ProductImage, { foreignKey: "product_id", as: "images", scope: { product_type: "bookmark" } });
Bundle.hasMany(ProductImage, { foreignKey: "product_id", as: "images", scope: { product_type: "bundle" } });

export default ProductImage;
