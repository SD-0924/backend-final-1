// controllers/orderController.ts
import { Request, Response } from "express";
import { getUserOrdersService, placeOrderService } from "../services/orderService";
import { processPayment } from "../services/paymentService"; 

export const processOrderPayment = async (req: Request, res: Response) => {
  try {
    const { amount, paymentMethodId } = req.body;  

    if (!amount || !paymentMethodId) {
       res.status(400).json({
        message: "Amount and paymentMethodId are required",
      });
      return
    }

    const paymentIntent = await processPayment(amount, paymentMethodId);

    if (paymentIntent.status === "succeeded") {
       res.status(200).json({
        message: "Payment successful",
        paymentStatus: paymentIntent.status,
        paymentIntent,
      });
      return
    } else {
       res.status(400).json({
        message: "Payment failed",
        paymentStatus: paymentIntent.status,
      });
      return
    }
  } catch (error: unknown) {
    res.status(500).json({
      message: "Error processing payment",
      error: error instanceof Error ? error.message : error,
    });
  }
};
