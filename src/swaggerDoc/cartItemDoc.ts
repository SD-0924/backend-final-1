/**
 * @swagger
 * /api/carts:
 *   post:
 *     summary: Add items to the cart
 *     description: Adds a product to a user's cart. If the product already exists in the user's cart, the quantity will be updated.
 *     operationId: addToCart
 *     tags:
 *       - CartItem
 *     security:
 *       - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 description: The unique identifier of the user
 *                 example: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
 *               productId:
 *                 type: string
 *                 format: uuid
 *                 description: The unique identifier of the product
 *                 example: "z1y2x3w4-v5u6-t7s8-r9q0-p1o2n3m4l5k6"
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product to add to the cart
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product successfully added to the cart or quantity updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: string
 *                   description: Indicates the operation was successful
 *                   example: "Product Added to cart."
 *                 message:
 *                   type: string
 *                   description: A detailed message about the operation
 *                   example: "Product quantity updated successfully."
 *                 cartItem:
 *                   type: object
 *                   description: The updated or newly added cart item
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       description: The unique identifier of the cart item
 *                       example: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6"
 *                     userId:
 *                       type: string
 *                       format: uuid
 *                       description: The unique identifier of the user
 *                       example: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
 *                     productId:
 *                       type: string
 *                       format: uuid
 *                       description: The unique identifier of the product
 *                       example: "z1y2x3w4-v5u6-t7s8-r9q0-p1o2n3m4l5k6"
 *                     quantity:
 *                       type: integer
 *                       description: The quantity of the product in the cart
 *                       example: 5
 *             examples:
 *               addedNewProduct:
 *                 summary: Adding a new product to the cart
 *                 value:
 *                   success: "Product Added to cart."
 *                   message: "Product added to cart successfully."
 *                   cartItem:
 *                     id: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6"
 *                     userId: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
 *                     productId: "z1y2x3w4-v5u6-t7s8-r9q0-p1o2n3m4l5k6"
 *                     quantity: 2
 *               updatedExistingProduct:
 *                 summary: Updating the quantity of an existing product in the cart
 *                 value:
 *                   success: "Product Added to cart."
 *                   message: "Product quantity updated successfully."
 *                   cartItem:
 *                     id: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6"
 *                     userId: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
 *                     productId: "z1y2x3w4-v5u6-t7s8-r9q0-p1o2n3m4l5k6"
 *                     quantity: 5
 *       404:
 *         description: User or Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "User not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "An error occurred while adding to the cart"
 */

/**
 * @swagger
 * /api/carts/{cartId}:
 *   delete:
 *     summary: Delete a cart item
 *     description: Deletes a cart item from the database by its unique cart ID.
 *     operationId: deleteCartItem
 *     tags:
 *       - CartItem
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: cartId
 *         required: true
 *         description: The unique identifier of the cart item to delete
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6"
 *     responses:
 *       200:
 *         description: Cart item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Cart item with id 1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6 deleted successfully."
 *       404:
 *         description: Cart item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "Cart item not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "An error occurred while deleting the cart item"
 */

/**
 * @swagger
 * /api/carts/{userId}:
 *   get:
 *     summary: Fetch cart items for a user
 *     description: Retrieves all cart items for a given user along with detailed product information and a summary of the cart.
 *     operationId: getCartItemsByUserId
 *     tags:
 *       - CartItem
 *     security:
 *       - JWT: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The unique identifier of the user whose cart items are to be fetched.
 *         schema:
 *           type: string
 *           format: uuid
 *         example: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
 *     responses:
 *       200:
 *         description: Successfully fetched cart items and summary for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cartItems:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       userId:
 *                         type: string
 *                         format: uuid
 *                       productId:
 *                         type: string
 *                         format: uuid
 *                       quantity:
 *                         type: integer
 *                       priceBeforeDiscount:
 *                         type: number
 *                         format: float
 *                       priceAfterDiscount:
 *                         type: number
 *                         format: float
 *                       totalPriceBeforeDiscount:
 *                         type: number
 *                         format: float
 *                       totalPriceAfterDiscount:
 *                         type: number
 *                         format: float
 *                       itemDiscount:
 *                         type: number
 *                         format: float
 *                       product:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           price:
 *                             type: number
 *                             format: float
 *                           finalPrice:
 *                             type: number
 *                             format: float
 *                           stockQuantity:
 *                             type: integer
 *                           discountPercentage:
 *                             type: number
 *                             format: float
 *                           ratingAverage:
 *                             type: number
 *                             format: float
 *                           ratingTotal:
 *                             type: integer
 *                           brandName:
 *                             type: string
 *                           categoryName:
 *                             type: string
 *                           imageUrl:
 *                             type: string
 *                             format: url
 *                 summary:
 *                   type: object
 *                   properties:
 *                     subtotal:
 *                       type: number
 *                       format: float
 *                     discount:
 *                       type: number
 *                       format: float
 *                     grandTotal:
 *                       type: number
 *                       format: float
 *       404:
 *         description: User not found or no cart items available for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal server error while fetching cart items.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch cart items."
 */