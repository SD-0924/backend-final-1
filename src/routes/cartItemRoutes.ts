import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { validateAddToCart } from "../validations/cartItemValidation";
import { validateRequest } from "../middlewares/validateRequest";
import { addToCartController } from "../controllers/cartItemController";


const router = Router();

router.post("/api/carts",
    // authenticateJWT, will add it later
    validateAddToCart,
    validateRequest,
    addToCartController
);



export default router;
