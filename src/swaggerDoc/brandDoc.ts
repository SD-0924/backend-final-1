/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: Create a new brand
 *     description: Adds a new brand to the catalog with a logo.
 *     operationId: createBrand
 *     tags:
 *       - Brand
 *     security:
 *       - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Brand Name"
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Brand created successfully
 *       400:
 *         description: Invalid data or missing logo
 *       500:
 *         description: Internal server error
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
 *         description: The ID of the brand.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Brand found
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Internal server error
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

/**
 * @swagger
 * /api/brands/{id}:
 *   put:
 *     summary: Update a brand
 *     description: Update the details of an existing brand.
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
 *                 example: "Updated Brand Name"
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Internal server error
 */