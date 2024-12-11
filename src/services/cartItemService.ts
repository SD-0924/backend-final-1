import { ERROR_MESSAGES } from "../constants/errorMessages";
import {
  addToCartItem,
  getCartItemByUserAndProduct,
  updateCartItemQuantity,
  getCartByCartId,
  deleteCartItemById,
  deleteCartItemsByUserId,
  getCartItemsByUserId,
} from "../reposetories/cartItemReposirtory";

import { getProductByIdRepository } from "../reposetories/productRepository";

import { getUserById } from "../reposetories/userRepository";

import { getProductImageUrlFromFirebase } from "../utils/firebaseUtils";

import { addCustomFields } from "../services/productService";

export const addToCartService = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  // 1. checking if the userIs exists or not
  const user = await getUserById(userId);
  if (!user) {
    throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
  }

  // 2. checking if the priduct id exists or not
  const product = await getProductByIdRepository(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  // 3. checking if the product already in the cart for the same user
  const existingCartItem = await getCartItemByUserAndProduct(userId, productId);
  let message = "";

  // 4. if exists before, we just increment the quantity of the product after validating the stockQuantity
  if (existingCartItem) {
    let newQuantity = existingCartItem.quantity + quantity;
    // adjust to available stock if the requested quantity exceed the existing one
    if (newQuantity > product.stockQuantity) {
      message = `Requested quantity exceeded stock, adjusted to ${product.stockQuantity}.`;
      newQuantity = product.stockQuantity;
    } else {
      message = "Product quantity updated successfully.";
    }
    await updateCartItemQuantity(existingCartItem.id, newQuantity);
    const updatedCartItem = await getCartByCartId(existingCartItem.id);
    return {
      updatedCartItem,
      message,
    };
  }
  // 5. if the product does not exist in the cart, we create a new cart item
  else {
    if (quantity > product.stockQuantity) {
      message = `Requested quantity exceeded stock, adjusted to ${product.stockQuantity}.`;
      quantity = product.stockQuantity;
    } else {
      message = "Product added to cart successfully.";
    }
    const newCartItem = await addToCartItem({ userId, productId, quantity });
    return {
      newCartItem,
      message,
    };
  }
};

export const deleteCartItemService = async (cartId: string) => {
  try {
    const cartItem = await getCartByCartId(cartId);
    if (!cartItem) {
      throw new Error("cartId not found");
    }
    await deleteCartItemById(cartId);
  } catch (error) {
    throw new Error("An error occurred while deleting the cart item");
  }
};

export const deleteAllCartItemsForUserService = async (userId: string) => {
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    await deleteCartItemsByUserId(userId);
  } catch (error) {
    throw new Error("An error occurred while deleting the cart item");
  }
};

// for calcualting the prices
const calculatePricingDetails = (
  quantity: number,
  priceBeforeDiscount: number,
  priceAfterDiscount: number
) => {
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

// for enrching the product with additional details and calculate pricing
const enrichProductDetails = async (product: any, quantity: number) => {
  const [enrichedProduct] = await addCustomFields([product]);

  const pricingDetails = calculatePricingDetails(
    quantity,
    product.price,
    enrichedProduct.finalPrice
  );

  const productDetails = {
    name: enrichedProduct.name,
    price: product.price,
    finalPrice: enrichedProduct.finalPrice,
    stockQuantity: enrichedProduct.stockQuantity,
    discountPercentage: enrichedProduct.discountPercentage,
    ratingAverage: enrichedProduct.ratingAverage,
    ratingTotal: enrichedProduct.ratingTotal,
    brandName: enrichedProduct.brandName,
    categoryName: enrichedProduct.categoryName,
    imageUrl: enrichedProduct.imageUrl
      ? await getProductImageUrlFromFirebase(enrichedProduct.imageUrl)
      : "https://shop.songprinting.com/global/images/PublicShop/ProductSearch/prodgr_default_300.png",
  };

  return { ...pricingDetails, productDetails };
};

// for getting the cart details for specific user
export const getCartItemsWithProductDetailsService = async (userId: string) => {
  const user = await getUserById(userId);
  if (!user) throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);

  const cartItems = await getCartItemsByUserId(userId);
  if (!cartItems || cartItems.length === 0)
    throw new Error("No cart items found for this user.");

  let subtotal = 0;
  let totalDiscount = 0;
  let grandTotal = 0;

  const enrichedCartItems = await Promise.all(
    cartItems.map(async (cartItem) => {
      const product = await getProductByIdRepository(cartItem.productId);
      if (!product)
        throw new Error(`Product with ID ${cartItem.productId} not found.`);

      const {
        priceBeforeDiscount,
        priceAfterDiscount,
        totalPriceBeforeDiscount,
        totalPriceAfterDiscount,
        itemDiscount,
        productDetails,
      } = await enrichProductDetails(product, cartItem.quantity);

      subtotal += totalPriceBeforeDiscount;
      totalDiscount += itemDiscount;
      grandTotal += totalPriceAfterDiscount;

      return {
        id: cartItem.id,
        userId: cartItem.userId,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        priceBeforeDiscount,
        priceAfterDiscount,
        totalPriceBeforeDiscount,
        totalPriceAfterDiscount,
        itemDiscount,
        product: productDetails,
      };
    })
  );

  return {
    cartItems: enrichedCartItems,
    summary: {
      subtotal: parseFloat(subtotal.toFixed(2)),
      discount: parseFloat(totalDiscount.toFixed(2)),
      grandTotal: parseFloat(grandTotal.toFixed(2)),
    },
  };
};

export const updateCartItemQuantityService = async (
  cartId: string,
  newQuantity: number
) => {
  const cartItem = await getCartByCartId(cartId);
  if (!cartItem) throw new Error("Cart item not found.");

  const product = await getProductByIdRepository(cartItem.productId);
  if (!product) throw new Error("Product not found.");

  const finalQuantity =
    newQuantity > product.stockQuantity ? product.stockQuantity : newQuantity;

  const message =
    newQuantity > product.stockQuantity
      ? `Quantity set to the stock limit of ${product.stockQuantity}.`
      : `Quantity updated to ${newQuantity}.`;

  try {
    await updateCartItemQuantity(cartItem.id, finalQuantity);

    const {
      priceBeforeDiscount,
      priceAfterDiscount,
      totalPriceBeforeDiscount,
      totalPriceAfterDiscount,
      itemDiscount,
      productDetails,
    } = await enrichProductDetails(product, finalQuantity);

    return {
      message,
      updatedCartItem: {
        id: cartItem.id,
        userId: cartItem.userId,
        productId: cartItem.productId,
        quantity: finalQuantity,
        priceBeforeDiscount,
        priceAfterDiscount,
        totalPriceBeforeDiscount,
        totalPriceAfterDiscount,
        itemDiscount,
        product: productDetails,
      },
    };
  } catch (error) {
    throw new Error(
      "Failed to update the cart item due to an unexpected error."
    );
  }
};
