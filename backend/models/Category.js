import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Category = sequelize.define("Category", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: "categories",
    timestamps: false,
});

export default Category;
