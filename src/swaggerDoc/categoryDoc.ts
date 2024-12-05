/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     description: Add a new category to the system.
 *     operationId: createCategory
 *     tags:
 *       - Category
 *     security:
 *       - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Category"
 *               description:
 *                 type: string
 *                 example: "New description"
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Category created successfully!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique identifier of the category
 *                       example: "dfb444e1-509e-4e6e-919c-4ad973ba4091"
 *                     name:
 *                       type: string
 *                       description: The name of the category
 *                       example: "Home"
 *                     description:
 *                       type: string
 *                       description: The description of the category
 *                       example: "description"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the category was created
 *                       example: "2024-12-04T20:59:05.667Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the category was last updated
 *                       example: "2024-12-04T20:59:05.667Z"
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
 *                   example: "Error creating category"
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a paginated list of all categories.
 *     operationId: getAllCategories
 *     tags:
 *       - Category
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         description: The number of categories to retrieve.
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: offset
 *         in: query
 *         required: false
 *         description: The offset for pagination.
 *         schema:
 *           type: integer
 *           default: 0
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: The total number of categories.
 *                   example: 3
 *                 rows:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Unique identifier of the category.
 *                         example: "acd29cd9-b18c-11ef-adc3-068197f0a9f7"
 *                       name:
 *                         type: string
 *                         description: The name of the category.
 *                         example: "Electronics"
 *                       description:
 *                         type: string
 *                         description: A brief description of the category.
 *                         example: "All types of electronic products"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time when the category was created.
 *                         example: "2024-12-03T15:38:42.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The date and time when the category was last updated.
 *                         example: "2024-12-03T15:38:42.000Z"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if there was a server error
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message for server issues
 *                   example: "Error retrieving categories"
 */


/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     description: Retrieve details of a specific category by its ID.
 *     operationId: getCategoryById
 *     tags:
 *       - Category
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the category
 *                   example: "d107efab-b18c-11ef-adc3-068197f0a9f7"
 *                 name:
 *                   type: string
 *                   description: The name of the category
 *                   example: "Home Appliances"
 *                 description:
 *                   type: string
 *                   description: The description of the category
 *                   example: "Various home appliances"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the category was created
 *                   example: "2024-11-15T09:30:00.000Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the category was last updated
 *                   example: "2024-11-15T09:30:00.000Z"
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/categories/{id}/products:
 *   get:
 *     summary: Get products by category ID
 *     description: Retrieve a list of products belonging to a specific category.
 *     operationId: getProductsByCategoryId
 *     tags:
 *       - Category
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the product
 *                     example: "10831229-9383-4467-8873-41581aeb79f2"
 *                   name:
 *                     type: string
 *                     description: The name of the product
 *                     example: "pro3"
 *                   description:
 *                     type: string
 *                     description: The description of the product
 *                     example: "awfcdv"
 *                   price:
 *                     type: string
 *                     description: The price of the product
 *                     example: "1232.00"
 *                   stockQuantity:
 *                     type: integer
 *                     description: The quantity of the product available in stock
 *                     example: 123
 *                   isLimitedEdition:
 *                     type: boolean
 *                     description: Indicates if the product is a limited edition
 *                     example: true
 *                   isFeatured:
 *                     type: boolean
 *                     description: Indicates if the product is featured
 *                     example: true
 *                   brandId:
 *                     type: string
 *                     description: The ID of the brand to which the product belongs
 *                     example: "fd5d336d-274f-4f2b-9e0c-43c8dc184dcb"
 *                   categoryId:
 *                     type: string
 *                     description: The ID of the category to which the product belongs
 *                     example: "d107efab-b18c-11ef-adc3-068197f0a9f7"
 *                   imageUrl:
 *                     type: string
 *                     description: URL of the product image
 *                     example: "https://storage.googleapis.com/test-1107b.appspot.com/products/pro3-.png"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the product was created
 *                     example: "2024-12-03T15:43:21.000Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the product was last updated
 *                     example: "2024-12-03T15:43:21.000Z"
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a category
 *     description: Update the details of an existing category.
 *     operationId: updateCategory
 *     tags:
 *       - Category
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Home"
 *               description:
 *                 type: string
 *                 example: "description"
 *     responses:
 *       200:
 *         description: Category updated successfully
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
 *                   example: "Category updated successfully!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "d107efab-b18c-11ef-adc3-068197f0a9f7"
 *                     name:
 *                       type: string
 *                       example: "Home11"
 *                     description:
 *                       type: string
 *                       example: "description"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-15T09:30:00.000Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-04T21:29:40.073Z"
 *       404:
 *         description: Category not found
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
 *                   example: "Category not found"
       500:
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
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Remove a category from the system by its ID.
 *     operationId: deleteCategory
 *     tags:
 *       - Category
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
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
 *                   example: "Category deleted successfully!"
 *       404:
 *         description: Category not found
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
 *                   example: "Category not found"
       500:
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
