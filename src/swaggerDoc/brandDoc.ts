/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: Create a new brand
 *     description: Adds a new brand to the catalog along with a logo.
 *     operationId: createBrand
 *     tags:
 *       - Brand
 *     security:
 *       - JWT: [] # Specify authentication if needed
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the brand
 *                 example: "Brand Name"
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: The logo file for the brand
 *     responses:
 *       201:
 *         description: Brand created successfully
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
 *                   example: "Brand created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique ID of the created brand
 *                       example: "7a71d100-76b6-4f26-96a2-5eaf4799c15d"
 *                     name:
 *                       type: string
 *                       description: The name of the created brand
 *                       example: "zaras"
 *                     logo:
 *                       type: string
 *                       format: url
 *                       description: The URL of the brand's logo
 *                       example: "https://storage.googleapis.com/test-1107b.appspot.com/logos/7a71d100-76b6-4f26-96a2-5eaf4799c15d.png"
 *       400:
 *         description: Invalid data or missing logo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation failed
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message for the invalid request
 *                   example: "A logo file is required for brand creation."
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
 *                   example: "Error creating brand"
 */

/**
 * @swagger
 * /api/brands/{id}:
 *   get:
 *     summary: Get a brand by ID
 *     description: Fetch a specific brand by its ID.
 *     operationId: getBrandById
 *     tags:
 *       - Brand
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the brand to fetch.
 *         schema:
 *           type: string
 *           example: "7a71d100-76b6-4f26-96a2-5eaf4799c15d"
 *     responses:
 *       200:
 *         description: Brand found
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
 *                   example: "Brand found successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "7a71d100-76b6-4f26-96a2-5eaf4799c15d"
 *                     name:
 *                       type: string
 *                       example: "zaras"
 *                     logo:
 *                       type: string
 *                       format: url
 *                       example: "https://storage.googleapis.com/test-1107b.appspot.com/logos/7a71d100-76b6-4f26-96a2-5eaf4799c15d.png"
 *       404:
 *         description: Brand not found
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
 *                   example: "Brand not found"
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
 *                   example: "Error fetching brand"
 */

/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Get all brands
 *     description: Fetch a list of all brands.
 *     operationId: getAllBrands
 *     tags:
 *       - Brand
 *     responses:
 *       200:
 *         description: A list of all brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *       500:
 *         description: Failed to fetch brands
 */

/**
 * @swagger
 * /api/brands/{id}:
 *   put:
 *     summary: Update a brand
 *     description: Update the details of an existing brand, including the name and logo.
 *     operationId: updateBrand
 *     tags:
 *       - Brand
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the brand to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name for the brand
 *                 example: "Updated Brand Name"
 *               logo:
 *                 type: string
 *                 format: binary
 *                 description: The new logo file for the brand (optional)
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the update was successful
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Brand updated successfully"
 *       404:
 *         description: Brand not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the brand was not found
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: Error message when brand is not found
 *                   example: "Brand not found"
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
 *                   example: "Error updating brand"
 *       default:
 *         description: Unexpected error
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
 *                   example: "Unexpected error occurred"
 */


/**
 * @swagger
 * /api/brands/{id}:
 *   delete:
 *     summary: Delete a brand by ID
 *     description: Deletes a brand by its ID.
 *     operationId: deleteBrandById
 *     tags:
 *       - Brand
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the brand to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Brand deleted successfully
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Internal server error
 */
