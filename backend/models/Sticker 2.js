import {DataTypes} from "sequelize";
import sequelize from "../config/db.js";
const Sticker = sequelize.define("Sticker", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    category: {
        type: DataTypes.STRING(50),
    },
    sticker_type: {
        type: DataTypes.ENUM("single", "sheet"),
        allowNull: false,
        defaultValue: "single",
    },
    stock_quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 10,
    },

    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    discount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        validate: {
            min: 0,
        },
    },
    height: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },

    width: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,

    },
}, {
    tableName: "stickers",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",

});
export default Sticker;

