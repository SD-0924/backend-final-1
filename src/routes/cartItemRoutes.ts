import { Router } from "express";
import { authenticateJWT } from "../middlewares/authMiddleware";
import { 
    validateAddToCart,
    validatecartId,
    validateuserId,
    validateUpdateQuantity
} from "../validations/cartItemValidation";
import { validateRequest } from "../middlewares/validateRequest";
import { 
    addToCartController,
    deleteCartItemController,
    getCartItemsByUserId,
    updateCartItemQuantityController
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

router.get(
    "/api/carts/:userId",
    // authenticateJWT, will add it later
    validateuserId,
    validateRequest,
    getCartItemsByUserId
)

router.put(
    "/api/carts/:cartId",
    // authenticateJWT, will add it later
    validateUpdateQuantity,
    validateRequest,
    updateCartItemQuantityController
)
export default router;
