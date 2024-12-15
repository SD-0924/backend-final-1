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
 *           example: "1dcab749-7cbc-4656-bdbc-4871181dfa45"
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
 *                       example: "1dcab749-7cbc-4656-bdbc-4871181dfa45"
 *                     orderDate:
 *                       type: string
 *                       example: "December 7, 2024"
 *                     totalPrice:
 *                       type: number
 *                       format: float
 *                       example: 153.9
 *                     totalPriceafterdiscount:
 *                       type: number
 *                       format: float
 *                       example: 153.9
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "55e6c201-12cd-4f1a-81ca-9708a7986652"
 *                           productId:
 *                             type: string
 *                             example: "f674fc74-c65f-4bf0-89d3-71ee7b6481bb"
 *                           quantity:
 *                             type: integer
 *                             example: 5
 *                           discountedprice:
 *                             type: number
 *                             format: float
 *                             example: 30.78
 *                           product:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                                 example: "f674fc74-c65f-4bf0-89d3-71ee7b6481bb"
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
