import { Request, Response } from "express";
import { 
    addToCartService,
    deleteCartItemService
} from "../services/cartItemService";

// add items to cart functionality
export const addToCartController = async (req: Request, res: Response) => {
    try{
        const { userId, productId, quantity } = req.body;
        const { updatedCartItem, newCartItem, message } = await addToCartService(userId, productId, quantity);

        if (updatedCartItem) {
            res.status(200).json({
                success: "Product Added to cart.",
                message,
                cartItem: updatedCartItem
            });
        }else{
            res.status(200).json({
            success: "Product Added to cart.",
            message,
            cartItem: newCartItem
        });
        }
    }catch(error: any){
        if (error.message === "User not found") {
            res.status(404).json({ message: "User not found" });
        }else if (error.message === "Product not found") {
            res.status(404).json({ message: "Product not found" });
        } else{
        res.status(500).json({ message: 'An error occurred while adding to the cart'});
        }
    }
};

export const deleteCartItemController = async (req: Request, res: Response) => {
    try{

        const { cartId } = req.params;
        await deleteCartItemService(cartId);
        return res.status(200).json({ message: `cart item with id {$cartId} deleted successfully.` });

    }catch(error: any){

        if(error.message === "cartId not found"){
            res.status(404).json({ message: "cartItem not found" });
        }else{
            res.status(500).json({ message: "An error occurred while deleting the cart item" });
        }
        
    }
}