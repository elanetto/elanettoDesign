import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Address from "./Address.js";
import User from "./User.js"; // optional, if you want to associate with users later

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    address_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2).UNSIGNED,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "shipped", "delivered", "cancelled"),
        defaultValue: "pending",
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
    tableName: "orders",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});

// Associations
import OrderItem from "./OrderItem.js";
Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });

Order.belongsTo(Address, { foreignKey: "address_id", as: "address" });

export default Order;
