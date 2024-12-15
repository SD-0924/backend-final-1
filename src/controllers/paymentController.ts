// controllers/orderController.ts
import { STATUS_CODES } from "../constants/statusCodes";
import { Request, Response } from "express";
import {
  getUserOrdersService,
  placeOrderService,
} from "../services/orderService";
import { processPayment } from "../services/paymentService";

export const processOrderPayment = async (req: Request, res: Response) => {
  try {
    const { amount, paymentMethodId } = req.body;

    if (!amount || !paymentMethodId) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        message: "Amount and paymentMethodId are required",
      });
      return;
    }

    const paymentIntent = await processPayment(amount, paymentMethodId);

    if (paymentIntent.status === "succeeded") {
      res.status(STATUS_CODES.SUCCESS).json({
        message: "Payment successful",
        paymentStatus: paymentIntent.status,
        paymentIntent,
      });
      return;
    } else {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        message: "Payment failed",
        paymentStatus: paymentIntent.status,
      });
      return;
    }
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: "Error processing payment",
      error: error instanceof Error ? error.message : error,
    });
  }
};
