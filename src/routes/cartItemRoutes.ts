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
    authenticateJWT,
    validateAddToCart,
    validateRequest,
    addToCartController
);

router.delete(
    "/api/carts/:cartId",
    //authenticateJWT,
    validatecartId,
    validateRequest,
    deleteCartItemController
);

router.get(
    "/api/carts/:userId",
    //authenticateJWT,
    validateuserId,
    validateRequest,
    getCartItemsByUserId
)

router.put(
    "/api/carts/:cartId",
    //authenticateJWT,
    validateUpdateQuantity,
    validateRequest,
    updateCartItemQuantityController
)
export default router;
