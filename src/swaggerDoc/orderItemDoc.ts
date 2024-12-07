/**
 * @swagger
 * /order-items/{orderId}:
 *   get:
 *     summary: Get order items
 *     description: Retrieve items associated with a specific order ID.
 *     operationId: getOrderItems
 *     tags:
 *       - Order Items
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: The ID of the order to retrieve items for.
 *         schema:
 *           type: string
 *           example: "e7374a3d-1762-42cc-81e8-672eae0d534a"
 *     responses:
 *       200:
 *         description: Order items retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderItems:
 *                   type: object
 *                   properties:
 *                     orderId:
 *                       type: string
 *                       example: "e7374a3d-1762-42cc-81e8-672eae0d534a"
 *                     orderDate:
 *                       type: string
 *                       example: "December 7, 2024"
 *                     totalPrice:
 *                       type: number
 *                       format: float
 *                       example: 261.56
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "cbb7ed3d-e7ee-4501-aaf0-2258fac3abc8"
 *                           productId:
 *                             type: string
 *                             example: "29b2c242-1b84-4ea8-84d0-aa12b08f7e90"
 *                           quantity:
 *                             type: integer
 *                             example: 2
 *                           product:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 example: "29b2c242-1b84-4ea8-84d0-aa12b08f7e90"
 *                               name:
 *                                 type: string
 *                                 example: "Blazer"
 *                               description:
 *                                 type: string
 *                                 example: "Leather Coach Bag"
 *                               price:
 *                                 type: string
 *                                 example: "30.78"
 *                               imageUrl:
 *                                 type: string
 *                                 example: "https://storage.googleapis.com/test-1107b.appspot.com/products/Blazer-.jpeg"
 *       400:
 *         description: Order ID is required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Order ID is required"
 *       500:
 *         description: Error retrieving order items.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */
