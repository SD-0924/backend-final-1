import { findOrderItemsByOrderId } from "../reposetories/orderItemRepository";

export const getOrderItemsService = async (orderId: string) => {
  const orderItems = await findOrderItemsByOrderId(orderId);

  if (!orderItems.length) {
    throw new Error("No order items found for the given order ID");
  }

  return orderItems;
};
