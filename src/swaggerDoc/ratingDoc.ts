/**
 * @swagger
 * components:
 *   schemas:
 *     Rating:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the rating
 *         productId:
 *           type: string
 *           description: ID of the product being rated
 *         userId:
 *           type: string
 *           description: ID of the user providing the rating
 *         ratingValue:
 *           type: number
 *           description: The rating value (e.g., 4.5)
 *         review:
 *           type: string
 *           description: Optional review text
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the rating was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of when the rating was last updated
 */

/**
 * @swagger
 * /ratings:
 *   post:
 *     summary: Add a new rating
 *     tags: [Ratings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rating'
 *     responses:
 *       201:
 *         description: Rating added successfully
 *       400:
 *         description: Invalid input data
 */

/**
 * @swagger
 * /ratings/{ratingId}:
 *   put:
 *     summary: Edit an existing rating
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: ratingId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the rating to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rating'
 *     responses:
 *       200:
 *         description: Rating updated successfully
 *       404:
 *         description: Rating not found
 *       400:
 *         description: Invalid input data
 */

/**
 * @swagger
 * /ratings/{ratingId}:
 *   delete:
 *     summary: Delete a rating
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: ratingId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the rating to delete
 *     responses:
 *       204:
 *         description: Rating deleted successfully
 *       404:
 *         description: Rating not found
 */

/**
 * @swagger
 * /ratings/user/{userId}:
 *   get:
 *     summary: Fetch ratings by user ID
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user whose ratings to fetch
 *     responses:
 *       200:
 *         description: List of ratings by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rating'
 *       404:
 *         description: User not found or no ratings available
 */

/**
 * @swagger
 * /ratings/product/{productId}:
 *   get:
 *     summary: Fetch ratings by product ID
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product whose ratings to fetch
 *     responses:
 *       200:
 *         description: List of ratings for the product
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rating'
 *       404:
 *         description: Product not found or no ratings available
 */

/**
 * @swagger
 * /ratings/product/{productId}/average:
 *   get:
 *     summary: Calculate average rating for a product
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: Average rating for the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 averageRating:
 *                   type: number
 *       404:
 *         description: Product not found or no ratings available
 */

/**
 * @swagger
 * /ratings/product/{productId}/count:
 *   get:
 *     summary: Count total ratings for a product
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: Total count of ratings for the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *       404:
 *         description: Product not found or no ratings available
 */
