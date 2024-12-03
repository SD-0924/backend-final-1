/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     description: Add a new product to the catalog.
 *     operationId: addProduct
 *     tags:
 *       - Products  # التاج هنا هو "Products"
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
 *                 example: "Product Name"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 19.99
 *               description:
 *                 type: string
 *                 example: "This is a product description."
 *               category:
 *                 type: string
 *                 example: "Electronics"
 *               brand:
 *                 type: string
 *                 example: "Brand Name"
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/product-image.png"
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve all products
 *     description: Fetch a list of all products with optional pagination.
 *     operationId: getAllProducts
 *     tags:
 *       - Products  # التاج هنا هو "Products"
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
 *         description: The number of products to fetch per page.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Failed to fetch products
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     description: Fetch a product by its ID.
 *     operationId: getProductById
 *     tags:
 *       - Products  # التاج هنا هو "Products"
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Failed to fetch product
 */

/**
 * @swagger
 * /api/products/{id}/ratings:
 *   get:
 *     summary: Get product ratings
 *     description: Fetch ratings for a specific product.
 *     operationId: getProductRatings
 *     tags:
 *       - Products  # التاج هنا هو "Products"
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product ratings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: integer
 *       500:
 *         description: Failed to fetch ratings
 */

/**
 * @swagger
 * /api/products/new-arrivals:
 *   get:
 *     summary: Get new arrivals
 *     description: Fetch the most recent products added to the catalog.
 *     operationId: getNewArrivals
 *     tags:
 *       - Products  # التاج هنا هو "Products"
 *     responses:
 *       200:
 *         description: List of new arrival products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Failed to fetch new arrivals
 */

/**
 * @swagger
 * /api/products/by-brand/{brandId}:
 *   get:
 *     summary: Get products by brand
 *     description: Fetch products that belong to a specific brand.
 *     operationId: getProductsByBrand
 *     tags:
 *       - Products  # التاج هنا هو "Products"
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the brand.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Products by brand
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No products found for the brand
 *       500:
 *         description: Failed to fetch products by brand
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     description: Update the details of an existing product.
 *     operationId: updateProduct
 *     tags:
 *       - Products  # التاج هنا هو "Products"
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to update.
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
 *                 example: "Updated Product Name"
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 25.99
 *               description:
 *                 type: string
 *                 example: "Updated product description."
 *               category:
 *                 type: string
 *                 example: "Electronics"
 *               brand:
 *                 type: string
 *                 example: "Updated Brand Name"
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/updated-product-image.png"
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a product from the catalog.
 *     operationId: deleteProduct
 *     tags:
 *       - Products  # التاج هنا هو "Products"
 *     security:
 *       - JWT: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */