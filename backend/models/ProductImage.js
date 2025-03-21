import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Sticker from "./Sticker.js";

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
            references: {
                model: Sticker,
                key: "id",
            },
            onDelete: "CASCADE",
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
            defaultValue: false, // One image should be primary
        },
    },
    {
        tableName: "product_images",
        timestamps: false,
    }
);

// Define association
Sticker.hasMany(ProductImage, { foreignKey: "product_id", as: "images" });
ProductImage.belongsTo(Sticker, { foreignKey: "product_id" });

export default ProductImage;
