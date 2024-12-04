import { Request, Response } from "express";
import { getUserOrdersService, placeOrderService } from "../services/orderService";

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const orders = await getUserOrdersService(userId);

    res.status(200).json({
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Error fetching user orders",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export const placeOrder = async (req: Request, res: Response)=> {
  try {
    const { userId, couponId, status } = req.body;

   const order = await placeOrderService(userId, couponId, status);

     res.status(201).json({
      message: "Order placed successfully",
      data: order,
    });
  } catch (error: unknown) {
     res.status(500).json({
      message: "Error placing order",
      error: error instanceof Error ? error.message : error,
    });
  }
};