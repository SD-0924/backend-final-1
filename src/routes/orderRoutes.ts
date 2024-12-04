import { Router } from "express";
import { getUserOrders, placeOrder } from "../controllers/orderController";

const router = Router();

router.get("/:userId/orders", getUserOrders);
router.post("/place-order", placeOrder);
export default router;
