import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const NewsletterSubscriber = sequelize.define("NewsletterSubscriber", {
  name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
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
}, {
  tableName: "newsletter_subscribers",
  timestamps: false,
});

export const subscribe = async (req, res) => {
  const { name, email } = req.body;
  try {
    const [subscriber, created] = await NewsletterSubscriber.findOrCreate({
      where: { email },
      defaults: { name },
    });

    if (!created) {
      return res.status(409).json({ message: "Email is already subscribed." });
    }

    res.status(201).json({ message: "Successfully subscribed!" });
  } catch (err) {
    console.error("Error subscribing:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};
