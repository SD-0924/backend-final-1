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
  getProductsByBrandController,
  getProductsByCategory,
  getProductPriceAfterDiscount,
  getLimitedEdition,
} from "../controllers/productController";

import {
  validatePaganation,
  validatGetAllProducts,
  validateGetProductById,
  validateAddProduct,
  validateUpdateProduct,
  validateDeleteProduct,
  validateGetProductRatings,
  validateGetNewArrivals,
  validateGetBrandProduct,
  validateGetCategoryProduct,
  validateGetPriceAfterDiscount,
} from "../validations/productValidation";

import { validateRequest } from "../middlewares/validateRequest";
import { authenticateJWT, isAdmin } from "../middlewares/authMiddleware";

const router = Router();

// Routes for products
router.get(
  "/api/products",
  authenticateJWT,
  validatePaganation,
  validatGetAllProducts,
  getAllProducts
);

router.get("/api/products/limited-edition", getLimitedEdition);
router.get(
  "/api/products/new-arrivals",
  validateGetNewArrivals,
  validatePaganation,
  getNewArrivals
);

router.get(
  "/api/products/:id",
  authenticateJWT,
  validateGetProductById,
  getProductById
);
router.post(
  "/api/products",
  upload.single("image"),
  authenticateJWT,
  isAdmin,
  validateAddProduct,
  validateRequest,
  addProduct
);
router.put(
  "/api/products/:id",
  upload.single("productImage"),
  authenticateJWT,
  isAdmin,
  validateUpdateProduct,
  updateProduct
);
router.delete(
  "/api/products/:id",
  authenticateJWT,
  isAdmin,
  validateDeleteProduct,
  validateRequest,
  deleteProduct
);
router.get(
  "/api/products/:id/ratings",
  validateGetProductRatings,
  getProductRatings
);
router.get(
  "/api/products/by-brand/:brandId",
  validateGetBrandProduct,
  validatePaganation,
  getProductsByBrandController
);
router.get(
  "/api/products/by-category/:categoryId",
  validateGetCategoryProduct,
  validatePaganation,
  getProductsByCategory
);
router.get(
  "/api/products/:id/price-after-discount",
  authenticateJWT,
  validateGetPriceAfterDiscount,
  getProductPriceAfterDiscount
);
export default router;
