import CartItem from "../models/CartItem";

// create new cartItem record
export const addToCartItem = async(cartItem: any) =>{
    return await CartItem.create(cartItem);
};

// searching for existing items
export const getCartItemByUserAndProduct = async(userId: string, productId: string) => {
    return await CartItem.findOne({ where: {userId,productId,}, });
};

// updating the cart Quantity of specific product for specific user
export const updateCartItemQuantity = async (cartItemId: string, quantity: number) => {
    return await CartItem.update(
        { quantity },
        {where: { id: cartItemId },}
    );
};

// get cart by id
export const getCartByCartId = async (cartId: string) => {
    return CartItem.findOne({
        where: { id: cartId },
        attributes: ['id', 'userId', 'productId', 'quantity'],
    });
};

// delete item from cartItem table
export const deleteCartItemById = async (cartId: string) => {
    const item = await CartItem.findByPk(cartId);
    if (!item) {
        throw new Error("cartId not found");
    }
    return await item.destroy(); 
};