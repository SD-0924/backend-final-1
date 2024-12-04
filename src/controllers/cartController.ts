import { Request, Response } from "express";
import { addItemToCartService } from "../services/cartService";

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
  
