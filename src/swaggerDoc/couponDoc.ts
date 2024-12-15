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
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "1425222"
 *               discountType:
 *                 type: string
 *                 example: "amount"
 *               discountValue:
 *                 type: integer
 *                 example: 50
 *               minOrderValue:
 *                 type: integer
 *                 example: 10
 *               usageLimit:
 *                 type: integer
 *                 example: 10
 *               expiryDate:
 *                 type: string
 *                 example: "2024-12-03 15:38:42"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Coupon created successfully
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
 *                   example: "Coupon created successfully!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "d89ec084-8e8d-43ab-9f4d-04f42157089e"
 *                     code:
 *                       type: string
 *                       example: "1425222"
 *                     discountType:
 *                       type: string
 *                       example: "amount"
 *                     discountValue:
 *                       type: integer
 *                       example: 50
 *                     minOrderValue:
 *                       type: integer
 *                       example: 10
 *                     usageLimit:
 *                       type: integer
 *                       example: 10
 *                     expiryDate:
 *                       type: string
 *                       example: "2024-12-03T15:38:42.000Z"
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *                     updatedAt:
 *                       type: string
 *                       example: "2024-12-04T21:46:27.725Z"
 *                     createdAt:
 *                       type: string
 *                       example: "2024-12-04T21:46:27.725Z"
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid request data"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "b62f3e21-8a4d-4db4-9182-d38fb314f657"
 *                   code:
 *                     type: string
 *                     example: "DISCOUNT10"
 *                   discountType:
 *                     type: string
 *                     example: "percentage"
 *                   discountValue:
 *                     type: integer
 *                     example: 10
 *                   minOrderValue:
 *                     type: integer
 *                     example: 100
 *                   usageLimit:
 *                     type: integer
 *                     example: 5
 *                   expiryDate:
 *                     type: string
 *                     example: "2024-12-31T23:59:59.000Z"
 *                   isActive:
 *                     type: boolean
 *                     example: true
 *                   createdAt:
 *                     type: string
 *                     example: "2024-12-04T16:47:29.000Z"
 *                   updatedAt:
 *                     type: string
 *                     example: "2024-12-04T16:47:29.000Z"
 *       500:
 *         description: Failed to fetch coupons
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch coupons"
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
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "b62f3e21-8a4d-4db4-9182-d38fb314f657"
 *                 code:
 *                   type: string
 *                   example: "DISCOUNT10"
 *                 discountType:
 *                   type: string
 *                   example: "percentage"
 *                 discountValue:
 *                   type: integer
 *                   example: 10
 *                 minOrderValue:
 *                   type: integer
 *                   example: 100
 *                 usageLimit:
 *                   type: integer
 *                   example: 5
 *                 expiryDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-31T23:59:59.000Z"
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-04T16:47:29.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-04T16:47:29.000Z"
 *       404:
 *         description: Coupon not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Coupon not found"
 *       500:
 *         description: Failed to fetch coupon
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch coupon"
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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "214edb60-c42e-4a23-993c-c9f8418c32a1"
 *                   userId:
 *                     type: string
 *                     example: "149adaf0-4b94-4897-9df3-5621d2c0d7de"
 *                   couponId:
 *                     type: string
 *                     example: "b62f3e21-8a4d-4db4-9182-d38fb314f657"
 *                   status:
 *                     type: string
 *                     example: "processing"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-04T16:51:07.000Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-12-04T16:51:07.000Z"
 *       404:
 *         description: Coupon or orders not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Coupon or orders not found"
 *       500:
 *         description: Failed to fetch orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch orders"
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
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "1425222"
 *               discountType:
 *                 type: string
 *                 example: "amount"
 *               discountValue:
 *                 type: number
 *                 example: 70
 *               minOrderValue:
 *                 type: number
 *                 example: 10
 *               usageLimit:
 *                 type: number
 *                 example: 10
 *               expiryDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-20 15:38:42"
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Coupon updated successfully
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
 *                   example: "Coupon updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "d89ec084-8e8d-43ab-9f4d-04f42157089e"
 *                     code:
 *                       type: string
 *                       example: "1425222"
 *                     discountType:
 *                       type: string
 *                       example: "amount"
 *                     discountValue:
 *                       type: number
 *                       example: 70
 *                     minOrderValue:
 *                       type: number
 *                       example: 10
 *                     usageLimit:
 *                       type: number
 *                       example: 10
 *                     expiryDate:
 *                       type: string
 *                       example: "2024-12-20T15:38:42.000Z"
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-04T21:46:27.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-04T22:08:06.992Z"
 *       400:
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request data"
 *       404:
 *         description: Coupon not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Coupon not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
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

