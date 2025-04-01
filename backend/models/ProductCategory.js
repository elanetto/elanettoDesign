import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ProductCategory = sequelize.define("ProductCategory", {
  product_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    primaryKey: true,
  },
  category_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "categories", // ✅ use table name as string to avoid circular imports
      key: "id",
    },
    onDelete: "CASCADE",
  },
  product_type: {
    type: DataTypes.ENUM("sticker", "bookmark", "bundle"),
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: "product_categories",
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ["product_id", "category_id", "product_type"],
    },
  ],
  createdAt: false,
  updatedAt: false,
  freezeTableName: true,
});

export default ProductCategory;
