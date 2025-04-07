import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Favorite = sequelize.define("Favorite", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    product_type: {
        type: DataTypes.ENUM("sticker", "bookmark", "bundle"),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "favorites",
    timestamps: false,
});

export default Favorite;
