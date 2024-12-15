import { Router } from "express";
import { getUserOrders, placeOrder } from "../controllers/orderController";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest";
import {  validatePlaceOrder } from "../validations/placeOrdervalidation";

const router = Router();

// Route to get user orders with authentication and validation
router.get(
  "/:userId/orders",
  authenticateJWT, // Middleware for JWT authentication
  validateRequest, // Middleware to handle validation errors
  getUserOrders // Controller to get user orders
);

// Route to place an order with authentication and validation
router.post(
  "/place-order",
  authenticateJWT, // Middleware for JWT authentication
  validatePlaceOrder, // Middleware to validate the request body for placing an order
  validateRequest, // Middleware to handle validation errors
  placeOrder // Controller to place an order
);

export default router;
