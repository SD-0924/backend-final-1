import { Request, Response } from "express";
import { addItemToCartService, getUserCartService } from "../services/cartService";

export const addItemToCart = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, productId, quantity } = req.body;
  
      if (!userId || !productId || !quantity) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }
  
      const cartItem = await addItemToCartService(userId, productId, quantity);
      res.status(201).json({
        message: "Item added to cart successfully",
        cartItem,
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error instanceof Error ? error.message : error });
    }
  };



export const viewCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const cartItems = await getUserCartService(userId);

    if (!cartItems || cartItems.length === 0) {
      res.status(404).json({ message: "No items found in the cart for this user" });
      return;
    }

    res.status(200).json({
      message: "Cart retrieved successfully",
      cartItems,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error instanceof Error ? error.message : error });
  }
};
  
