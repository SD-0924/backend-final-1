import Order from "../models/Order";
import OrderItem from "../models/OrderItem";
import CartItem from "../models/CartItem";

export const createOrder = async (orderData: any) => {
  return await Order.create(orderData);
};

export const findCartItemsByUserId = async (userId: string) => {
  return await CartItem.findAll({ where: { userId } });
};

export const createOrderItems = async (orderItems: any[]) => {
  return await OrderItem.bulkCreate(orderItems);
};

export const clearCartForUser = async (userId: string) => {
  return await CartItem.destroy({ where: { userId } });
};


export const findOrdersByStatus = async (userId: string, status: string) => {
  return await Order.findAll({
    where: { userId, status },
  });
};
