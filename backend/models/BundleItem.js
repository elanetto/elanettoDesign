import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Bundle from "./Bundle.js";

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
            model: Bundle,
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

Bundle.hasMany(BundleItem, { foreignKey: "bundle_id", as: "items" });
BundleItem.belongsTo(Bundle, { foreignKey: "bundle_id" });

export default BundleItem;
