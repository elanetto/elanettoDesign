import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Category = sequelize.define(
    "Category",
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true, // Ensures no duplicate category names
        },
    },
    {
        tableName: "categories",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default Category;
