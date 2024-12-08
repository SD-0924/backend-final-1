import{
    addToCartItem,
    getCartItemByUserAndProduct,
    updateCartItemQuantity,
    getCartByCartId,
    deleteCartItemById,
    deleteCartItemsByUserId,
    getCartItemsByUserId
} from "../reposetories/cartItemReposirtory";

import{
    getProductByIdRepository
} from "../reposetories/productRepository";

import{
    getUserById
} from "../reposetories/userRepository";

import{
  getProductImageUrlFromFirebase
} from "../utils/firebaseUtils";

import{
  addCustomFields
}from "../services/productService"

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

export const deleteAllCartItemsForUserService = async (userId: string) => {
  try{
    const user = await getUserById(userId);
    if(!user){
      throw new Error("User not found");
    }
    await deleteCartItemsByUserId(userId);
    
  }catch(error){
    throw new Error("An error occurred while deleting the cart item");
  }
};

// for calcualting the prices
const calculatePricingDetails = (quantity: number, priceBeforeDiscount: number, priceAfterDiscount: number) => {
  const totalPriceBeforeDiscount = quantity * priceBeforeDiscount;
  const totalPriceAfterDiscount = quantity * priceAfterDiscount;
  const itemDiscount = totalPriceBeforeDiscount - totalPriceAfterDiscount;

  return {
    priceBeforeDiscount,
    priceAfterDiscount,
    totalPriceBeforeDiscount,
    totalPriceAfterDiscount,
    itemDiscount,
  };
};

export const getCartItemsWithProductDetailsService = async (userId: string) => {

  const user = await getUserById(userId);

  if (!user) {
    throw new Error("User not found")
  }

  const cartItems = await getCartItemsByUserId(userId);

  if (!cartItems || cartItems.length === 0) {
    throw new Error("No cart items found for this user.");
  }

  // Initialize summary values for *Order Summary*
  let subtotal = 0;
  let totalDiscount = 0;
  let grandTotal = 0;

   // Enrich cart items
  const enrichedCartItems = await Promise.all(
    cartItems.map(async (cartItem) => {
      // Fetching the product
      const product = await getProductByIdRepository(cartItem.productId);
      if (!product) {
        throw new Error(`Product with ID ${cartItem.productId} not found.`);
      }

      // Add custom fields (including discount information)
      const [enrichedProduct] = await addCustomFields([product]);

      const priceBeforeDiscount = product.price; // Original price
      const priceAfterDiscount = enrichedProduct.finalPrice; // Discounted price
      const totalPriceBeforeDiscount = cartItem.quantity * priceBeforeDiscount; // Quantity * original price
      const totalPriceAfterDiscount = cartItem.quantity * priceAfterDiscount; // Quantity * discounted price
      const itemDiscount = totalPriceBeforeDiscount - totalPriceAfterDiscount; // Discount for this item

      // Update summary values
      subtotal += totalPriceBeforeDiscount;
      totalDiscount += itemDiscount;
      grandTotal += totalPriceAfterDiscount;

      // Return enriched cart item with detailed pricing information
      return {
        id: cartItem.id,
        userId: cartItem.userId,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        priceBeforeDiscount, // Original price
        priceAfterDiscount, // Discounted price
        totalPriceBeforeDiscount, // Quantity * original price
        totalPriceAfterDiscount, // Quantity * discounted price
        itemDiscount, // Discount for this item
        product: {
          name: enrichedProduct.name,
          price: priceBeforeDiscount, // Original price
          finalPrice: priceAfterDiscount, // Discounted price
          stockQuantity: enrichedProduct.stockQuantity,
          discountPercentage: enrichedProduct.discountPercentage,
          ratingAverage: enrichedProduct.ratingAverage,
          ratingTotal: enrichedProduct.ratingTotal,
          brandName: enrichedProduct.brandName,
          categoryName: enrichedProduct.categoryName,
          imageUrl: enrichedProduct.imageUrl
            ? await getProductImageUrlFromFirebase(enrichedProduct.imageUrl)
            : "https://shop.songprinting.com/global/images/PublicShop/ProductSearch/prodgr_default_300.png",
        },
      };
    })
  );

  // Return enriched cart items and summary
  return {
    cartItems: enrichedCartItems,
    summary: {
      subtotal: parseFloat(subtotal.toFixed(2)), // Total before discount
      discount: parseFloat(totalDiscount.toFixed(2)), // Total discount applied
      grandTotal: parseFloat(grandTotal.toFixed(2)), // Total after discount
    },
  };
};

export const updateCartItemQuantityService = async( cartId: string, newQuantity: number) =>{

  // validating the cartId
  const cartItem = await getCartByCartId(cartId);
  if (!cartItem) {
    throw new Error("Cart item not found.");
  }

  // validating the productId
  const product = await getProductByIdRepository(cartItem.productId);
  if (!product) {
    throw new Error("Product not found.");
  }

  // if the new quantity exceeds available stock, set the quantity to the stock quantity
  const finalQuantity = newQuantity > product.stockQuantity ? product.stockQuantity : newQuantity;
  
  // message to return to the user about the updated quantity
  let message = "Quantity updated successfully.";
  if (newQuantity > product.stockQuantity) {
    message = `Quantity set to the stock limit of ${product.stockQuantity}.`;
  } else {
    message = `Quantity updated to ${newQuantity}.`;
  }
  try {
    // updating the cart item's quantity
    await updateCartItemQuantity(cartItem.id, finalQuantity);

    // Fetch updated discount information
    const [enrichedProduct] = await addCustomFields([product]);

    // Pricing calculations
    const priceBeforeDiscount = product.price; // Original price
    const priceAfterDiscount = enrichedProduct.finalPrice; // Discounted price
    const totalPriceBeforeDiscount = finalQuantity * priceBeforeDiscount; // Quantity * original price
    const totalPriceAfterDiscount = finalQuantity * priceAfterDiscount; // Quantity * discounted price
    const itemDiscount = totalPriceBeforeDiscount - totalPriceAfterDiscount; // Discount for this item

    // Return detailed information about the updated cart item
    return {
      message: message,
      updatedCartItem: {
        id: cartItem.id,
        userId: cartItem.userId,
        productId: cartItem.productId,
        quantity: finalQuantity,
        priceBeforeDiscount, // Original price
        priceAfterDiscount, // Discounted price
        totalPriceBeforeDiscount, // Quantity * original price
        totalPriceAfterDiscount, // Quantity * discounted price
        itemDiscount, // Discount for this item
        product: {
          name: enrichedProduct.name,
          price: priceBeforeDiscount, // Original price
          finalPrice: priceAfterDiscount, // Discounted price
          stockQuantity: enrichedProduct.stockQuantity,
          discountPercentage: enrichedProduct.discountPercentage,
          ratingAverage: enrichedProduct.ratingAverage,
          ratingTotal: enrichedProduct.ratingTotal,
          brandName: enrichedProduct.brandName,
          categoryName: enrichedProduct.categoryName,
          imageUrl: enrichedProduct.imageUrl
            ? await getProductImageUrlFromFirebase(enrichedProduct.imageUrl)
            : "https://shop.songprinting.com/global/images/PublicShop/ProductSearch/prodgr_default_300.png",
        },
      }
    };
  }catch(error){
    throw new Error("Failed to update the cart item due to an unexpected error.");
  }
};