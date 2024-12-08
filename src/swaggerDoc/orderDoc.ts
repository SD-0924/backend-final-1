/**
 * @swagger
 * /{userId}/orders:
 *   get:
 *     summary: Get user's orders
 *     description: Retrieve all orders associated with a specific user ID.
 *     operationId: getUserOrders
 *     tags:
 *       - Orders
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve orders for
 *         schema:
 *           type: string
 *           example: "6afd477d-e3cb-489a-ae09-3bb39fd6fde8"
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orders fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     completedOrders:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "1dcab749-7cbc-4656-bdbc-4871181dfa45"
 *                           orderDate:
 *                             type: string
 *                             example: "December 7, 2024"
 *                           totalPrice:
 *                             type: number
 *                             format: float
 *                             example: 153.9
 *                           totalPriceafterdiscount:
 *                             type: number
 *                             format: float
 *                             example: 153.9
 *                     processingOrders:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "214edb60-c42e-4a23-993c-c9f8418c32a1"
 *                           orderDate:
 *                             type: string
 *                             example: "December 4, 2024"
 *                           totalPrice:
 *                             type: number
 *                             format: float
 *                             example: 0.00
 *                           totalPriceafterdiscount:
 *                             type: number
 *                             format: float
 *                             example: 0.00
 *                     canceledOrders:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "ea048482-fe8b-4e07-92ce-f0773b8f027f"
 *                           orderDate:
 *                             type: string
 *                             example: "December 4, 2024"
 *                           totalPrice:
 *                             type: number
 *                             format: float
 *                             example: 0.00
 *                           totalPriceafterdiscount:
 *                             type: number
 *                             format: float
 *                             example: 0.00
 *       500:
 *         description: Error fetching user orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching user orders"
 *                 error:
 *                   type: string
 *                   example: "Database connection failed"
 */
