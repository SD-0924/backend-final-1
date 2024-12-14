import { findOrderItemsByOrderId } from "../reposetories/orderItemRepository";
import Order from "../models/Order"; // Assuming `Order` is your order model

export const getOrderItemsService = async (orderId: string) => {
    const orderItems = await findOrderItemsByOrderId(orderId);
    if (!orderItems.length) {
        throw new Error("No order items found for the given order ID");
      }
  
    const order = await Order.findByPk(orderId, {
      attributes: ["id", "createdAt"],
    });
  
    if (!order) {
      throw new Error("Order not found for the given ID");
    }
  
    const totalPrice = orderItems.reduce((acc, item) => {
      const productPrice = parseFloat(String(item.product?.price || "0"));
      return acc + productPrice * item.quantity;
    }, 0);
    const totalPriceafterdiscount = orderItems.reduce((acc, item) => {
        const productPrice = parseFloat(String(item.price || "0"));
        return acc + productPrice * item.quantity;
      }, 0);
  
    const createdAt = new Date(order.createdAt);
    const orderDate = `${createdAt.toLocaleString("default", { month: "long" })} ${createdAt.getDate()}, ${createdAt.getFullYear()}`;
  
    return {
      orderId: order.id,
      orderDate,
      totalPrice,
      totalPriceafterdiscount,
      items: orderItems.map(item => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        discountedprice:item.price,
        product: {
          id: item.product?.id,
          name: item.product?.name,
          description: item.product?.description,
          price: item.product?.price,
          imageUrl: item.product?.imageUrl,
        },
      })),
    };
  };
  