import { STATUS_CODES } from "../constants/statusCodes";
import { Request, Response } from "express";
import { getOrderItemsService } from "../services/orderItemService";

export const getOrderItems = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    if (!orderId) {
      res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ error: "Order ID is required" });
      return;
    }

    const orderItems = await getOrderItemsService(orderId);

    res.status(STATUS_CODES.SUCCESS).json({ orderItems });
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ error: error instanceof Error ? error.message : error });
  }
};
