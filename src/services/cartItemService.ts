import CartItem from "../models/CartItem";
import Product from "../models/Product";

export const addItemToCartService = async (userId: string, productId: string, quantity: number) => {
  // Step 1: Check if the product exists
  const product = await Product.findOne({ where: { id: productId } });
  if (!product) {
    throw new Error("Product not found");
  }

  // Step 2: Check stock availability
  if (product.stockQuantity < quantity) {
    throw new Error("Insufficient stock available");
  }

  // Step 3: Check if the item already exists in the cart
  const existingCartItem = await CartItem.findOne({
    where: { userId, productId },
  });

  if (existingCartItem) {
    // Step 4: Update the existing item's quantity
    const newQuantity = existingCartItem.quantity + quantity;

    // Check stock again for updated quantity
    if (product.stockQuantity < newQuantity) {
      throw new Error("Insufficient stock available for the updated quantity");
    }

    await existingCartItem.update({ quantity: newQuantity });
    return existingCartItem;
  } else {
    // Step 5: Add a new item to the cart
    const newCartItem = await CartItem.create({
      userId,
      productId,
      quantity,
    });

    return newCartItem;
  }
};

export const getUserCartService = async (userId: string) => {
  // Fetch cart items for the user
  const cartItems = await CartItem.findAll({
    where: { userId },  // Filter cart items by userId
  });

  // Fetch product details for each cart item
  const cartItemsWithProductInfo = await Promise.all(
    cartItems.map(async (cartItem) => {
      const product = await Product.findOne({
        where: { id: cartItem.productId },  // Find the product using the productId from CartItem
      });

      // Return cartItem with product info (if found)
      return {
        cartItem,
        product: product || null, // If product is not found, return null
      };
    })
  );

  return cartItemsWithProductInfo;
};
