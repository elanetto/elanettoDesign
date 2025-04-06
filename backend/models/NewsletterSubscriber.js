import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const NewsletterSubscriber = sequelize.define(
  "NewsletterSubscriber",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true, // Sequelize will know it's unique, but won't alter the DB
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    subscribed_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    unsubscribed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "newsletter_subscribers",
    timestamps: false,
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
    paranoid: false,
    underscored: true,

    // 👇 This is the real protection — don't sync/alter schema!
    hooks: {
      beforeSync: (options) => {
        options.alter = false;
        options.force = false;
      },
    },
  }
);

export default NewsletterSubscriber;
