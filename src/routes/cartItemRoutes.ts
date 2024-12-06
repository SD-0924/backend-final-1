import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { 
    validateAddToCart,
    validatecartId
} from "../validations/cartItemValidation";
import { validateRequest } from "../middlewares/validateRequest";
import { 
    addToCartController,
    deleteCartItemController
} from "../controllers/cartItemController";



const router = Router();

router.post(
    "/api/carts",
    // authenticateJWT, will add it later
    validateAddToCart,
    validateRequest,
    addToCartController
);

router.delete(
    "/api/carts/:cartId",
    // authenticateJWT, will add it later
    validatecartId,
    validateRequest,
    deleteCartItemController
);

export default router;
