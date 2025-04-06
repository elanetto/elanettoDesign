import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const BundleItem = sequelize.define("BundleItem", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  bundle_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    references: {
      model: "bundles", // ✅ this can be a string, not a model import
      key: "id",
    },
    onDelete: "CASCADE",
  },
  item_type: {
    type: DataTypes.ENUM("sticker", "sticker_alternative", "bookmark"),
    allowNull: false,
  },
  item_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
  },
}, {
  tableName: "bundle_items",
  timestamps: false,
});

export default BundleItem;
