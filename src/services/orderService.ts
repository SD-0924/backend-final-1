import { findOrdersByStatus,createOrder, createOrderItems, findCartItemsByUserId, clearCartForUser } from "../reposetories/orderRepository";

export const placeOrderService = async (userId: string, couponId: string, status: string) => {
  // Step 1: Fetch cart items
  const cartItems = await findCartItemsByUserId(userId);

  if (cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  // Step 2: Create a new order
  const order = await createOrder({
    userId,
    couponId,
    status,
  });

  // Step 3: Create order items from cart items
  const orderItems = cartItems.map((cartItem) => ({
    orderId: order.id,
    productId: cartItem.productId,
    quantity: cartItem.quantity,
  }));

  await createOrderItems(orderItems);

  // Step 4: Clear the cart for the user
  await clearCartForUser(userId);

  return order;
};

export const getUserOrdersService = async (userId: string) => {
  const completedOrders = await findOrdersByStatus(userId, "completed");
  const processingOrders = await findOrdersByStatus(userId, "processing");
  const canceledOrders = await findOrdersByStatus(userId, "canceled");

  return {
    completedOrders,
    processingOrders,
    canceledOrders,
  };
};
