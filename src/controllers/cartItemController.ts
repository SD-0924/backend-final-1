import { STATUS_CODES } from "../constants/statusCodes";
import { ERROR_MESSAGES } from "../constants/errorMessages";
import { Request, Response } from "express";
import {
  addToCartService,
  deleteCartItemService,
  deleteAllCartItemsForUserService,
  getCartItemsWithProductDetailsService,
  updateCartItemQuantityService,
} from "../services/cartItemService";

// add items to cart functionality
export const addToCartController = async (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity } = req.body;
    const { updatedCartItem, newCartItem, message } = await addToCartService(
      userId,
      productId,
      quantity
    );

    if (updatedCartItem) {
      res.status(STATUS_CODES.SUCCESS).json({
        success: "Product Added to cart.",
        message,
        cartItem: updatedCartItem,
      });
    } else {
      res.status(STATUS_CODES.SUCCESS).json({
        success: "Product Added to cart.",
        message,
        cartItem: newCartItem,
      });
    }
  } catch (error: any) {
    if (error.message === ERROR_MESSAGES.USER_NOT_FOUND) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    } else if (error.message === ERROR_MESSAGES.PRODUCT_NOT_FOUND) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
    } else {
      res
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ message: "An error occurred while adding to the cart" });
    }
  }
};

export const deleteCartItemController = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params;
    await deleteCartItemService(cartId);
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: `Cart item with ID ${cartId} deleted successfully.` });
  } catch (error: any) {
    if (error.message === "cartId not found") {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "cartItem not found" });
    } else {
      res
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ message: "An error occurred while deleting the cart item" });
    }
  }
};

export const deleteAllCartItems = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await deleteAllCartItemsForUserService(userId);

    res.status(STATUS_CODES.SUCCESS).json({
      message: `All cart items have been deleted successfully for the user with id ${userId}.`,
    });
  } catch (error: any) {
    if (error.message === ERROR_MESSAGES.USER_NOT_FOUND) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    } else if (error.message === "No cart items found for this user.") {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "No cart items found for this user." });
    } else {
      res.status(STATUS_CODES.SERVER_ERROR).json({
        message:
          "An error occurred while deleting the cart items. Please try again later.",
      });
    }
  }
};

export const getCartItemsByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    // fetching the cart items for the user
    const cartItems = await getCartItemsWithProductDetailsService(userId);

    res.status(STATUS_CODES.SUCCESS).json(cartItems);
  } catch (error: any) {
    if (error.message === ERROR_MESSAGES.USER_NOT_FOUND) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ error: ERROR_MESSAGES.USER_NOT_FOUND });
    } else if (error.message === "No cart items found for this user.") {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: error.message });
    } else if (error.message.includes("Product with ID")) {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: error.message });
    } else {
      res
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ error: "Failed to fetch cart items." });
    }
  }
};

export const updateCartItemQuantityController = async (
  req: Request,
  res: Response
) => {
  try {
    const cartId = req.params.cartId;
    const { quantity } = req.body;

    const result = await updateCartItemQuantityService(cartId, quantity);

    res.status(STATUS_CODES.SUCCESS).json({
      message: result.message,
      updatedCartItem: result.updatedCartItem,
    });
  } catch (error: any) {
    if (error.message === "Cart item not found.") {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ error: "Cart item not found." });
    } else if (error.message === ERROR_MESSAGES.PRODUCT_NOT_FOUND) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ error: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
    } else {
      res
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ error: "Error updating the item quantity." });
    }
  }
};
