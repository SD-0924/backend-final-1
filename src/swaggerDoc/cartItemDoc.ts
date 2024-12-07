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
