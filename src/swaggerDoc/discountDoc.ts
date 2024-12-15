/**
 * @swagger
 * /api/discounts:
 *   post:
 *     summary: Create a new discount
 *     description: Create a new discount for a product with a specified discount percentage.
 *     operationId: createDiscount
 *     tags:
 *       - Discount
 *     security:
 *       - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discountPercentage:
 *                 type: integer
 *                 example: 20
 *               productId:
 *                 type: string
 *                 example: "b78c8d70-456f-412f-97b8-cf99f9b97b18"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-01T00:00:00Z"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2024-12-31T00:00:00Z"
 *     responses:
 *       201:
 *         description: Discount created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Discount created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "a5798ecf-54c9-4529-8a59-fd32dc5e41a2"
 *                     discountPercentage:
 *                       type: integer
 *                       example: 5
 *                     productId:
 *                       type: string
 *                       example: "7ced51a9-1403-4dbb-a34d-15b8287b50d9"
 *                     startDate:
 *                       type: string
 *                       example: "2024-12-20T15:38:42.000Z"
 *                     endDate:
 *                       type: string
 *                       example: "2024-12-20T15:38:42.000Z"
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /api/discounts:
 *   get:
 *     summary: Retrieve all discounts
 *     description: Fetch a list of all discounts for products.
 *     operationId: getAllDiscounts
 *     tags:
 *       - Discount
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: A list of discounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the discount.
 *                   discountPercentage:
 *                     type: integer
 *                     description: The percentage of the discount.
 *                   productId:
 *                     type: string
 *                     description: The ID of the product the discount applies to.
 *                   startDate:
 *                     type: string
 *                     format: date-time
 *                     description: The start date of the discount period.
 *                   endDate:
 *                     type: string
 *                     format: date-time
 *                     description: The end date of the discount period.
 *       401:
 *         description: Unauthorized, invalid or missing JWT token.
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/discounts/{discountId}:
 *   get:
 *     summary: Get discount by ID
 *     description: Retrieve a discount by its ID.
 *     operationId: getDiscountById
 *     tags:
 *       - Discount
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: discountId
 *         in: path
 *         required: true
 *         description: The ID of the discount.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Discount found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "6afd477d-e3cb-489a-ae09-3bb39fd6fde8"
 *                 discountPercentage:
 *                   type: integer
 *                   example: 30
 *                 productId:
 *                   type: string
 *                   example: "7ced51a9-1403-4dbb-a34d-15b8287b50d9"
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-01T00:00:00Z"
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-31T23:59:59Z"
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/discounts/{discountId}/time-remaining:
 *   get:
 *     summary: Get remaining time for discount by ID
 *     description: Get the remaining time for a discount based on the discount ID.
 *     operationId: getDiscountTimeRemainingById
 *     tags:
 *       - Discount
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: discountId
 *         in: path
 *         required: true
 *         description: The ID of the discount to check the remaining time for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Remaining time for the discount
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 remainingTime:
 *                   type: integer
 *                   example: 2338243755
 *                 message:
 *                   type: string
 *                   example: "Discount is still active"
 *                 formattedTime:
 *                   type: string
 *                   example: "27 days, 1 hours, 30 minutes"
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/discounts/{discountId}:
 *   put:
 *     summary: Update an existing discount
 *     description: Update the details of an existing discount.
 *     operationId: updateDiscount
 *     tags:
 *       - Discount
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: discountId
 *         in: path
 *         required: true
 *         description: The ID of the discount to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               discountPercentage:
 *                 type: integer
 *                 example: 33
 *               productId:
 *                 type: string
 *                 example: "7ced51a9-1403-4dbb-a34d-15b8287b50d9"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-20T15:38:42.000Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-20T15:38:42.000Z"
 *     responses:
 *       200:
 *         description: Discount updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "6afd477d-e3cb-489a-ae09-3bb39fd6fde8"
 *                 discountPercentage:
 *                   type: integer
 *                   example: 33
 *                 productId:
 *                   type: string
 *                   example: "7ced51a9-1403-4dbb-a34d-15b8287b50d9"
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-20T15:38:42.000Z"
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-20T15:38:42.000Z"
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/discounts/{discountId}:
 *   delete:
 *     summary: Delete a discount
 *     description: Delete a discount from the system.
 *     operationId: deleteDiscount
 *     tags:
 *       - Discount
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: discountId
 *         in: path
 *         required: true
 *         description: The ID of the discount to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Discount deleted successfully
 *       404:
 *         description: Discount not found
 *       500:
 *         description: Internal server error
 */