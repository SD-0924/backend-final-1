import OrderItems from "../models/OrderItem";
import Products from "../models/Product";

export const findOrderItemsByOrderId = async (orderId: string) => {
  // Fetch all order items by orderId
  const orderItems = await OrderItems.findAll({
    where: { orderId },
    attributes: ["id", "quantity", "productId"],
  });

  // Retrieve product details for each order item
  const orderItemsWithProducts = await Promise.all(
    orderItems.map(async (orderItem) => {
      const product = await Products.findOne({
        where: { id: orderItem.productId },
        attributes: ["id", "name", "description", "price", "imageUrl"],
      });

      return {
        ...orderItem.toJSON(),
        product: product ? product.toJSON() : null, // Add product info if found
      };
    })
  );

  return orderItemsWithProducts;
};
