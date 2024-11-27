import { Router } from "express";

import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductRatings,
  getNewArrivals,
} from "../controllers/productController";

import {
  validateGetAllProducts,
  validateGetProductById,
  validateAddProduct,
  validateUpdateProduct,
  validateDeleteProduct,
  validateGetProductRatings,
  validateGetNewArrivals,
} from "../validations/productValidation";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.get(
  "/api/products",
  validateGetAllProducts,
  validateRequest,
  getAllProducts
);

router.get(
  "/api/products/:id",
  validateGetProductById,
  validateRequest,
  getProductById
);

router.post("/api/products", validateAddProduct, validateRequest, addProduct);

router.put(
  "/api/products/:id",
  validateUpdateProduct,
  validateRequest,
  updateProduct
);

router.delete(
  "/api/products/:id",
  validateDeleteProduct,
  validateRequest,
  deleteProduct
);

router.get(
  "/api/products/:id/ratings",
  validateGetProductRatings,
  validateRequest,
  getProductRatings
);

// Route for fetching new arrivals
router.get(
  "/api/products/new-arrivals",
  validateGetNewArrivals,
  validateRequest,
  getNewArrivals
);

export default router;
