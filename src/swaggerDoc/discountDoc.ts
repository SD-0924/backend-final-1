/**
 * @swagger
 * /api/discounts:
 *   post:
 *     summary: Create a new discount
 *     description: Create a new discount for a product with a specified discount percentage.
 *     operationId: createDiscount
 *     tags:
 *       - Discount
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
 *       400:
 *         description: Invalid input data
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
 *                   example: "b78c8d70-456f-412f-97b8-cf99f9b97b18"
 *                 discountPercentage:
 *                   type: integer
 *                   example: 20
 *                 productId:
 *                   type: string
 *                   example: "b78c8d70-456f-412f-97b8-cf99f9b97b18"
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-01T00:00:00Z"
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: "2024-12-31T00:00:00Z"
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
 *                   example: 3600000
 *                 message:
 *                   type: string
 *                   example: "Discount is still active"
 *                 formattedTime:
 *                   type: string
 *                   example: "0 days, 1 hours, 0 minutes"
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
 *                 example: 25
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
 *       200:
 *         description: Discount updated successfully
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