import { Router } from "express";
import { addItemToCart, viewCart } from "../controllers/cartController";

const router = Router();

// Route to add an item to the cart
router.post("/cart/add", addItemToCart);
router.get("/cart/:userId", viewCart);
export default router;
