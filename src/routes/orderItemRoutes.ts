import express from "express";
import { getOrderItems } from "../controllers/orderItemController";

const router = express.Router();

router.get("/order-items/:orderId", getOrderItems);

export default router;
