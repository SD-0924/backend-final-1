import { Router } from "express";
import upload from "../middlewares/multerUpload";
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductRatings,
  getNewArrivals,
  getProductsByBrandController
} from "../controllers/productController";


import {
  validateGetAllProducts,
  validateGetProductById,
  validateAddProduct,
  validateUpdateProduct,
  validateDeleteProduct,
  validateGetProductRatings,
  validateGetNewArrivals,
  validateGetBrandProduct
} from "../validations/productValidation";
import { validateRequest } from "../middlewares/validateRequest";


const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products.
 *     responses:
 *       200:
 *         description: List of products retrieved successfully.
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
 *                   imageUrl:
 *                     type: string
 *       500:
 *         description: Server error.
 */
router.get(
  "/api/products",
  validateGetAllProducts,
  getAllProducts
);

router.get(
  "/api/products/:id",
  validateGetProductById,
  getProductById
);

router.post("/api/products", upload.single('image'), validateAddProduct, validateRequest, addProduct);

router.put('/products/:id', upload.single('productImage'), validateUpdateProduct, updateProduct);


router.delete(
  "/api/products/:id",
  validateDeleteProduct,
  validateRequest,
  deleteProduct
);

router.get(
  "/api/products/:id/ratings",
  validateGetProductRatings,
  getProductRatings
);

// Route for fetching new arrivals
router.get(
  "/api/products/new-arrivals",
  validateGetNewArrivals,
  getNewArrivals
);

router.get(
  "/api/brands/:id/products",
  validateGetBrandProduct,
  validateGetAllProducts,
  getProductsByBrandController
)
export default router;
