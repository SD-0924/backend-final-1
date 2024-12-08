import express from "express";
import { getOrderItems } from "../controllers/orderItemController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();

// Route to fetch order items with authentication and validation
router.get(
  "/order-items/:orderId",
  authenticateJWT, // Middleware for JWT authentication
  validateRequest, // Middleware to handle validation errors
  getOrderItems // Controller to fetch order items
);

export default router;
