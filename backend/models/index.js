// backend/models/index.js

import User from "./User.js";
import Address from "./Address.js";
import Sticker from "./Sticker.js";
import StickerAlternative from "./StickerAlternative.js";
import Bookmark from "./Bookmark.js";
import Bundle from "./Bundle.js";
import BundleItem from "./BundleItem.js";
import ProductImage from "./ProductImage.js";
import Category from "./Category.js";
import ProductCategory from "./ProductCategory.js";
import Favorite from "./Favorite.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";
import Cart from "./Cart.js";
import NewsletterSubscriber from "./NewsletterSubscriber.js";

// Relationships
User.hasMany(Address, { foreignKey: "user_id", as: "addresses" });
Address.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.hasMany(Favorite, { foreignKey: "user_id" });
Favorite.belongsTo(User, { foreignKey: "user_id" });

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Sticker.hasMany(StickerAlternative, { foreignKey: "sticker_id", as: "alternatives" });
StickerAlternative.belongsTo(Sticker, { foreignKey: "sticker_id" });

// StickerAlternative images
StickerAlternative.hasMany(ProductImage, {
  foreignKey: "product_id",
  as: "images",
  constraints: false,
  scope: { product_type: "sticker_alternative" },
});
ProductImage.belongsTo(StickerAlternative, {
  foreignKey: "product_id",
  constraints: false,
});

OrderItem.belongsTo(Sticker, { foreignKey: "sticker_id" });

Bundle.hasMany(BundleItem, { foreignKey: "bundle_id", as: "items" });
BundleItem.belongsTo(Bundle, { foreignKey: "bundle_id" });

// Sticker images
Sticker.hasMany(ProductImage, {
  foreignKey: "product_id",
  as: "images",
  constraints: false,
  scope: { product_type: "sticker" },
});
ProductImage.belongsTo(Sticker, {
  foreignKey: "product_id",
  constraints: false,
});

// Bookmark images
Bookmark.hasMany(ProductImage, {
  foreignKey: "product_id",
  as: "images",
  constraints: false,
  scope: { product_type: "bookmark" },
});
ProductImage.belongsTo(Bookmark, {
  foreignKey: "product_id",
  constraints: false,
});

Cart.belongsTo(User, { foreignKey: "user_id" });

Order.belongsTo(Address, { foreignKey: "address_id", as: "address" });

Category.hasMany(ProductCategory, { foreignKey: "category_id" });
ProductCategory.belongsTo(Category, { foreignKey: "category_id", as: "category" });

// Many-to-Many: Stickers <-> Categories with product_type scope
Sticker.hasOne(ProductCategory, {
  foreignKey: "product_id",
  as: "category_link",
  constraints: false,
  scope: { product_type: "sticker" },
});
ProductCategory.belongsTo(Sticker, {
  foreignKey: "product_id",
  constraints: false,
});

Sticker.belongsToMany(Category, {
  through: ProductCategory,
  foreignKey: "product_id",
  otherKey: "category_id",
  constraints: false,
  scope: { product_type: "sticker" },
  as: "categories",
});
Category.belongsToMany(Sticker, {
  through: ProductCategory,
  foreignKey: "category_id",
  otherKey: "product_id",
  constraints: false,
  scope: { product_type: "sticker" },
  as: "stickers",
});

export {
  User,
  Address,
  Sticker,
  StickerAlternative,
  Bookmark,
  Bundle,
  BundleItem,
  ProductImage,
  Category,
  ProductCategory,
  Favorite,
  Order,
  OrderItem,
  Cart,
  NewsletterSubscriber,
};