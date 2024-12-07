import { findOrdersByStatus,createOrder, findCartItemsByUserId, clearCartForUser } from "../reposetories/orderRepository";
import { createOrderItems } from '../reposetories/orderItemRepository';
import { getDiscountById } from '../reposetories/discountRepository';
import { getProductByIdRepository, updateProductRepository } from '../reposetories/productRepository';
import { deleteCartItemsByUserId, getCartItemsWithProductDetails } from '../reposetories/cartItemReposirtory';
import { getOrderItemsService } from "../services/orderItemService";
export const placeOrderService = async (userId: string, couponId: string, status: string) => {
  // Step 1: Fetch cart items
  const cartItems = await getCartItemsWithProductDetails(userId);

  if (cartItems.length === 0) {
      throw new Error("Cart is empty");
  }

  // Step 2: Validate stock availability for all cart items
  for (const cartItem of cartItems) {
      const product = await getProductByIdRepository(cartItem.productId); // Fetch product details
      if (!product) {
          throw new Error(`Product not found for ID: ${cartItem.productId}`);
      }

      if (product.stockQuantity < cartItem.quantity) {
          throw new Error(
              `Insufficient stock for product ID: ${cartItem.productId}. Available: ${product.stockQuantity}, Requested: ${cartItem.quantity}`
          );
      }
  }

  // Step 3: Create a new order
  const order = await createOrder({
      userId,
      couponId,
      status,
  });

  // Step 4: Calculate price with discount, update stock, and create order items
  const orderItems = await Promise.all(
      cartItems.map(async (cartItem) => {
          const product = await getProductByIdRepository(cartItem.productId);
          if (!product) {
            throw new Error(`Product not found for ID: ${cartItem.productId}`);
        }
          let price = product.price;

          // Fetch the discount for the product, if applicable
          try {
              const discount = await getDiscountById(cartItem.productId);
              if (discount) {
                  const discountValue = discount.discountPercentage; // Assuming percentage discount
                  price = price - (price * discountValue) / 100; // Apply the discount
              }
          } catch (error) {
              console.warn(`No valid discount for product ${cartItem.productId}`);
          }

          // Reduce stock quantity for the product using updateProductRepository
          const newStockQuantity = product.stockQuantity - cartItem.quantity;
          await updateProductRepository(cartItem.productId, { stockQuantity: newStockQuantity });

          return {
              orderId: order.id,
              productId: cartItem.productId,
              price: price, // Final price after discount
              quantity: cartItem.quantity,
          };
      })
  );

  // Save order items
  await createOrderItems(orderItems);

  // Step 5: Clear the cart for the user
  await deleteCartItemsByUserId(userId);

  return {
      message: "Order placed successfully",
      order,
  };
};




export const getUserOrdersService = async (userId: string) => {
  const completedOrders = await findOrdersByStatus(userId, "completed");
  const processingOrders = await findOrdersByStatus(userId, "processing");
  const canceledOrders = await findOrdersByStatus(userId, "canceled");

  // Fetch the order items and calculate the total price for each order
  const completedOrdersWithTotalPrice = await Promise.all(
    completedOrders.map(async (order) => {
      const { totalPrice, orderDate } = await getOrderItemsService(order.id); // Only get total price and order date
      return {
        id: order.id,
        orderDate,
        totalPrice,
      };
    })
  );

  const processingOrdersWithTotalPrice = await Promise.all(
    processingOrders.map(async (order) => {
      const { totalPrice, orderDate } = await getOrderItemsService(order.id); // Only get total price and order date
      return {
        id: order.id,
        orderDate,
        totalPrice,
      };
    })
  );

  const canceledOrdersWithTotalPrice = await Promise.all(
    canceledOrders.map(async (order) => {
      const { totalPrice, orderDate } = await getOrderItemsService(order.id); // Only get total price and order date
      return {
        id: order.id,
        orderDate,
        totalPrice,
      };
    })
  );

  return {
    completedOrders: completedOrdersWithTotalPrice,
    processingOrders: processingOrdersWithTotalPrice,
    canceledOrders: canceledOrdersWithTotalPrice,
  };
};
