import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Category from "./Category.js";

const ProductCategory = sequelize.define("ProductCategory", {
    product_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
            model: Category,
            key: "id",
        },
        onDelete: "CASCADE",
    },
    product_type: {
        type: DataTypes.ENUM("sticker", "bookmark", "bundle"),
        allowNull: false,
    },
}, {
    tableName: "product_categories",
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ["product_id", "category_id", "product_type"]
        }
    ]
});

export default ProductCategory;
