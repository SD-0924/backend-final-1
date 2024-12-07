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
 *                             example: "123e4567-e89b-12d3-a456-426614174000"
 *                           orderDate:
 *                             type: string
 *                             example: "December 4, 2024"
 *                           totalPrice:
 *                             type: number
 *                             format: float
 *                             example: 500.75
 *                     processingOrders:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "123e4567-e89b-12d3-a456-426614174001"
 *                           orderDate:
 *                             type: string
 *                             example: "December 7, 2024"
 *                           totalPrice:
 *                             type: number
 *                             format: float
 *                             example: 150.00
 *                     canceledOrders:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "123e4567-e89b-12d3-a456-426614174002"
 *                           orderDate:
 *                             type: string
 *                             example: "December 5, 2024"
 *                           totalPrice:
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
