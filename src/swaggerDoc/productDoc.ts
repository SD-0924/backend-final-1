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
 *       - name: productName
 *         in: query
 *         description: The product name.
 *         required: false
 *         schema:
 *           type: string
 *           default: ""
 *       - name: brandName
 *         in: query
 *         description: The brand name.
 *         required: false
 *         schema:
 *           type: string
 *           default: ""
 *       - name: categoryName
 *         in: query
 *         description: The category name.
 *         required: false
 *         schema:
 *           type: string
 *           default: ""
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
 * /api/products/discounted:
 *   get:
 *     summary: Get discounted products
 *     description: Fetch any products that have a discount of 15% or more.
 *     operationId: discounted
 *     tags:
 *       - Products  # التاج هنا هو "Products"
 *     responses:
 *       200:
 *         description: List of discounted products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Failed to fetch discounted
 */

/**
 * @swagger
 * /api/products/popular:
 *   get:
 *     summary: Get popular products
 *     description: Fetch any products that have a rating of 4.5 or more.
 *     operationId: popular
 *     tags:
 *       - Products  # التاج هنا هو "Products"
 *     responses:
 *       200:
 *         description: List of popular products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Failed to fetch popular
 */

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
 *               stockQuantity:
 *                  type: number
 *                  example: 50
 *               categoryId:
 *                 type: string
 *                 example: "not-required-bc4fbd6e-37a1-40ee-86ba-80bb695a56ee"
 *               brandId:
 *                 type: string
 *                 example: "not-required-a84c591a-6a2b-4800-997f-32d39f5bf65a"
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *                 example: "not-required-https://example.com/product-image.png"
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
 * /api/products/limited-edition:
 *   get:
 *     summary: Get limited edition products
 *     description: Fetch any products that are less than 20 in stock.
 *     operationId: limited-edition
 *     tags:
 *       - Products  # التاج هنا هو "Products"
 *     responses:
 *       200:
 *         description: List of limited edition products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Failed to fetch limited edition
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
 * /api/products/by-category/{categoryId}:
 *   get:
 *     summary: Get products by category Id
 *     description: Fetch products that belong to a specific category.
 *     operationId: getProductsByCategory
 *     tags:
 *       - Products  # التاج هنا هو "Products"
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the category.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Products by category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No products found for the category
 *       500:
 *         description: Failed to fetch products by category
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
 *               categoryId:
 *                 type: string
 *                 example: "not-required-bc4fbd6e-37a1-40ee-86ba-80bb695a56ee"
 *               brandId:
 *                 type: string
 *                 example: "not-required-a84c591a-6a2b-4800-997f-32d39f5bf65a"
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

/**
 * @swagger
 * /api/products/{id}/price-after-discount:
 *   get:
 *     summary: Get product price after discount
 *     description: Fetch the price of a product after applying any available discount. If no discount is available or it has expired, the original price will be returned.
 *     operationId: getProductPriceAfterDiscount
 *     tags:
 *       - Products  # The tag here is "Products"
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the product.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched the price after applying the discount.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: integer
 *                   description: The unique ID of the product.
 *                 finalPrice:
 *                   type: number
 *                   format: float
 *                   description: The price of the product after the discount (if any).
 *                 originalPrice:
 *                   type: number
 *                   format: float
 *                   description: The original price of the product before any discount.
 *                 discountPercentage:
 *                   type: number
 *                   format: float
 *                   description: The percentage of the discount applied to the product.
 *                 discountEndDate:
 *                   type: string
 *                   format: date-time
 *                   description: The end date of the discount (null if no discount or expired).
 *       404:
 *         description: The product with the provided ID was not found.
 *       500:
 *         description: Internal server error when fetching price after discount.
 */
