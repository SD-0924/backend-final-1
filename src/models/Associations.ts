import Users from "./User";
import Coupons from "./Coupon";
import Orders from "./Order";
import OrderItems from "./OrderItem";
import Products from "./Product";
import Brands from "./Brand";
import Categories from "./Category";
import Discounts from "./Discount";
import Rating from "./Rating";

export const setupAssociations = () => {
  // Users - Orders
  Users.hasMany(Orders, { foreignKey: "userId" });
  Orders.belongsTo(Users, { foreignKey: "userId" });

  // Orders - OrderItems
  Orders.hasMany(OrderItems, { foreignKey: "orderId" });
  OrderItems.belongsTo(Orders, { foreignKey: "orderId" });

  // Products - OrderItems
  Products.hasMany(OrderItems, { foreignKey: "productId" });
  OrderItems.belongsTo(Products, { foreignKey: "productId" });

  // Products - Categories
  Categories.hasMany(Products, { foreignKey: "categoryId" });
  Products.belongsTo(Categories, { foreignKey: "categoryId" });

  // Products - Brands
  Brands.hasMany(Products, { foreignKey: "brandId" });
  Products.belongsTo(Brands, { foreignKey: "brandId" });

  // Products - Discounts
  Products.hasMany(Discounts, { foreignKey: "productId" });
  Discounts.belongsTo(Products, { foreignKey: "productId" });

  // Products - Ratings
  Products.hasMany(Rating, { foreignKey: "productId" });
  Rating.belongsTo(Products, { foreignKey: "productId" });

  // Users - Ratings
  Users.hasOne(Rating, { foreignKey: "userId" });
  Rating.belongsTo(Users, { foreignKey: "userId" });

  // Coupons - Orders
  Coupons.hasOne(Orders, { foreignKey: "couponId" });
  Orders.belongsTo(Coupons, { foreignKey: "couponId" });
};
