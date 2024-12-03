/**
 * @swagger
 * /api/coupons:
 *   get:
 *     summary: Retrieve all coupons
 *     description: Fetch a list of all coupons with optional filters.
 *     operationId: getAllCoupons
 *     tags:
 *       - Coupons
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number for pagination.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: The number of coupons to fetch per page.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: A list of coupons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coupon'
 *       500:
 *         description: Failed to fetch coupons
 */

/**
 * @swagger
 * /api/coupons/{id}:
 *   get:
 *     summary: Get a coupon by ID
 *     description: Fetch details of a coupon by its ID.
 *     operationId: getCouponById
 *     tags:
 *       - Coupons
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the coupon.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coupon details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Failed to fetch coupon
 */

/**
 * @swagger
 * /api/coupons:
 *   post:
 *     summary: Create a new coupon
 *     description: Add a new coupon to the system.
 *     operationId: createCoupon
 *     tags:
 *       - Coupons
 *     security:
 *       - JWT: []
 *       - Admin: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coupon'
 *     responses:
 *       201:
 *         description: Coupon created successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/coupons/{id}:
 *   put:
 *     summary: Update a coupon
 *     description: Update the details of an existing coupon.
 *     operationId: updateCoupon
 *     tags:
 *       - Coupons
 *     security:
 *       - JWT: []
 *       - Admin: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the coupon to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coupon'
 *     responses:
 *       200:
 *         description: Coupon updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/coupons/{id}:
 *   delete:
 *     summary: Delete a coupon
 *     description: Remove a coupon from the system.
 *     operationId: deleteCoupon
 *     tags:
 *       - Coupons
 *     security:
 *       - JWT: []
 *       - Admin: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the coupon to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Coupon deleted successfully
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/coupons/{id}/orders:
 *   get:
 *     summary: Get orders for a coupon
 *     description: Fetch orders associated with a specific coupon.
 *     operationId: getCouponOrders
 *     tags:
 *       - Coupons
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the coupon.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orders associated with the coupon
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       404:
 *         description: Coupon or orders not found
 *       500:
 *         description: Failed to fetch orders
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Coupon:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "b62f3e21-8a4d-4db4-9182-d38fb314f657"
 *         code:
 *           type: string
 *           example: "DISCOUNT10"
 *         discountType:
 *           type: string
 *           example: "percentage"
 *         discountValue:
 *           type: number
 *           example: 10
 *         minOrderValue:
 *           type: number
 *           example: 100
 *         usageLimit:
 *           type: number
 *           example: 5
 *         expiryDate:
 *           type: string
 *           format: date-time
 *           example: "2024-12-31T23:59:59.999Z"
 *         isActive:
 *           type: boolean
 *           example: true
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "d123f83c-4578-4c9b-97f0-cdd3b1d405bc"
 *         amount:
 *           type: number
 *           example: 150.75
 *         couponCode:
 *           type: string
 *           example: "DISCOUNT10"
 */
