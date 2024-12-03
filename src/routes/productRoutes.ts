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
import { authenticateJWT, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

// Routes for products
router.get("/api/products", validateGetAllProducts, getAllProducts);
router.get("/api/products/:id", authenticateJWT, validateGetProductById, getProductById);
router.post("/api/products", upload.single('image'), authenticateJWT, isAdmin, validateAddProduct, validateRequest, addProduct);
router.put("/api/products/:id", upload.single('productImage'), authenticateJWT, isAdmin, validateUpdateProduct, updateProduct);
router.delete("/api/products/:id", authenticateJWT, isAdmin, validateDeleteProduct, validateRequest, deleteProduct);
router.get("/api/products/:id/ratings", validateGetProductRatings, getProductRatings);
router.get("/api/products/new-arrivals", validateGetNewArrivals, getNewArrivals);
router.get("/api/products/by-brand/:brandId", validateGetBrandProduct, validateGetAllProducts, getProductsByBrandController);

export default router;
