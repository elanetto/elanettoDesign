import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Sticker from "./Sticker.js";
import StickerAlternative from "./StickerAlternative.js";
import Bookmark from "./Bookmark.js";

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
            type: DataTypes.ENUM("sticker", "sticker_alternative"),
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

// Define relationships
Sticker.hasMany(ProductImage, { foreignKey: "product_id", as: "images", scope: { product_type: "sticker" } });
ProductImage.belongsTo(Sticker, { foreignKey: "product_id" });

StickerAlternative.hasMany(ProductImage, { foreignKey: "product_id", as: "images", scope: { product_type: "sticker_alternative" } });
ProductImage.belongsTo(StickerAlternative, { foreignKey: "product_id" });

// Add bookmark association
Bookmark.hasMany(ProductImage, {
    foreignKey: "product_id",
    as: "images",
    scope: { product_type: "bookmark" },
});
ProductImage.belongsTo(Bookmark, {
    foreignKey: "product_id",
});


export default ProductImage;
