import  Users  from './User';
import  Coupons  from './Coupon';
import  Orders  from './Order';
import  OrderItems  from './OrderItem';
import  Products  from './Product';
import  Brands  from './Brand';
import  Categories from './Category';
import  Discounts from './Discount';
import  Rating from './Rating';

export const setupAssociations = () => {
    // Users - Orders
    Users.hasMany(Orders, { foreignKey: 'user_id' });
    Orders.belongsTo(Users, { foreignKey: 'user_id' });

    // Orders - OrderItems
    Orders.hasMany(OrderItems, { foreignKey: 'order_id' });
    OrderItems.belongsTo(Orders, { foreignKey: 'order_id' });

    // Products - OrderItems
    Products.hasMany(OrderItems, { foreignKey: 'product_id' });
    OrderItems.belongsTo(Products, { foreignKey: 'product_id' });

    // Products - Categories
    Categories.hasMany(Products, { foreignKey: 'category_id' });
    Products.belongsTo(Categories, { foreignKey: 'category_id' });

    // Products - Brands
    Brands.hasMany(Products, { foreignKey: 'brand_id' });
    Products.belongsTo(Brands, { foreignKey: 'brand_id' });

    // Products - Discounts
    Products.hasMany(Discounts, { foreignKey: 'product_id' });
    Discounts.belongsTo(Products, { foreignKey: 'product_id' });

    // Products - Ratings
    Products.hasMany(Rating, { foreignKey: 'product_id' });
    Rating.belongsTo(Products, { foreignKey: 'product_id' });

    // Users - Ratings
    Users.hasOne(Rating, { foreignKey: 'user_id' });
    Rating.belongsTo(Users, { foreignKey: 'user_id' });

    // Coupons - Orders
    Coupons.hasOne(Orders, { foreignKey: 'coupon_id' }); 
    Orders.belongsTo(Coupons, { foreignKey: 'coupon_id' }); 
};
