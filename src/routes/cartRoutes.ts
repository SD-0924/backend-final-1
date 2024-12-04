import { Router } from "express";
import { addItemToCart } from "../controllers/cartController";

const router = Router();

// Route to add an item to the cart
router.post("/cart/add", addItemToCart);

export default router;
