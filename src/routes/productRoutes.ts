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

export default router;
