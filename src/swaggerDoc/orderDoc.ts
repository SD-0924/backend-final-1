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
 *
 * /place-order:
 *   post:
 *     summary: Place a new order
 *     description: Create a new order for a user with default values for couponId and status.
 *     operationId: placeOrder
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user placing the order
 *                 example: "6afd477d-e3cb-489a-ae09-3bb39fd6fde8"
 *     responses:
 *       201:
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order placed successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "1dcab749-7cbc-4656-bdbc-4871181dfa45"
 *                         status:
 *                           type: string
 *                           example: "processing"
 *                         couponId:
 *                           type: string
 *                           example: "b62f3e21-8a4d-4db4-9182-d38fb314f657"
 *       500:
 *         description: Error placing the order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error placing order"
 *                 error:
 *                   type: string
 *                   example: "Internal server error."
 */
