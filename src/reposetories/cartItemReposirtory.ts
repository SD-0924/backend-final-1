import CartItem from "../models/CartItem";
import Product from "../models/Product";
import { getProductByIdRepository } from "../reposetories/productRepository";


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
    const [updatedRows] = await CartItem.update(
        { quantity },
        { where: { id: cartItemId } }
    );
    if (updatedRows === 0) {
        throw new Error("CartItem not found or quantity unchanged");
    }
    return updatedRows;
};

// get cart by id
export const getCartByCartId = async (cartId: string) => {
    return await CartItem.findByPk(cartId, {
        attributes: ['id', 'userId', 'productId', 'quantity'],
    });
};

// delete item from cartItem table
export const deleteCartItemById = async (cartId: string) => {
    const deletedRows = await CartItem.destroy({ where: { id: cartId } });
    if (deletedRows === 0) {
        throw new Error("CartItem not found");
    }
    return deletedRows;
};

// delete items for specific userId
export const deleteCartItemsByUserId = async (userId: string) => {
    const deletedRows = await CartItem.destroy({ where: { userId } });
    if (deletedRows === 0) {
        throw new Error("No cart items found for this user.");
    }
};

// getting the items of specific user
export const getCartItemsByUserId = async (userId: string) => {
    return await CartItem.findAll({ where: { userId } });
};

export const getCartItemsWithProductDetails = async (userId: string) => {
  const cartItems = await getCartItemsByUserId(userId);

  const cartItemsWithDetails = await Promise.all(
    cartItems.map(async (item) => {
      const product = await getProductByIdRepository(item.productId); // Fetch product details manually
      return {
        ...item.dataValues,
        product,
      };
    })
  );

  return cartItemsWithDetails;

// return await CartItem.findAll({ //optmization
//     where: { userId },
//     include: [
//         {
//             model: Product
//         },
//     ],
// });
};
