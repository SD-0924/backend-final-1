import{
    addToCartItem,
    getCartItemByUserAndProduct,
    updateCartItemQuantity,
    getCartByCartId,
    deleteCartItemById
} from "../reposetories/cartItemReposirtory";

import{
    getProductByIdRepository
} from "../reposetories/productRepository";

import{
    getUserById
} from "../reposetories/userRepository";

export const addToCartService = async(userId: string, productId: string, quantity: number) =>{

  // 1. checking if the userIs exists or not
  const user = await getUserById(userId);
  if(!user){
    throw new Error("User not found");
  }

  // 2. checking if the priduct id exists or not
  const product = await getProductByIdRepository(productId);
  if(!product){
    throw new Error("Product not found");
  }

  // 3. checking if the product already in the cart for the same user
  const existingCartItem = await getCartItemByUserAndProduct(userId, productId);
  let message = "";

  // 4. if exists before, we just increment the quantity of the product after validating the stockQuantity
  if(existingCartItem){
    let newQuantity = existingCartItem.quantity + quantity;
    // adjust to available stock if the requested quantity exceed the existing one
    if (newQuantity > product.stockQuantity) {
      message = `Requested quantity exceeded stock, adjusted to ${product.stockQuantity}.`
        newQuantity = product.stockQuantity;
      }else{
        message = 'Product quantity updated successfully.';
      }
      await updateCartItemQuantity(existingCartItem.id, newQuantity);
      const updatedCartItem = await getCartByCartId(existingCartItem.id);
      return {
        updatedCartItem,
        message
      }
    }
  // 5. if the product does not exist in the cart, we create a new cart item
  else{
    if(quantity > product.stockQuantity){
      message = `Requested quantity exceeded stock, adjusted to ${product.stockQuantity}.`;
      quantity = product.stockQuantity;
    }else{
      message = 'Product added to cart successfully.';
    }
    const newCartItem = await addToCartItem({ userId, productId, quantity });
    return {
      newCartItem,
      message
      }
  }
};

export const deleteCartItemService = async (cartId: string) =>{
  try{

    const cartItem = await getCartByCartId(cartId);
    if(!cartItem){
      throw new Error("cartId not found")
    }
    await deleteCartItemById(cartId);

  }catch(error){
    throw new Error("An error occurred while deleting the cart item");
  }
};