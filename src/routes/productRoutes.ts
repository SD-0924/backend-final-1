import { Router } from "express";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getNewArrivals,
} from "../controllers/productController";
import {
  validateAddProduct,
  validateUpdateProduct,
  validateDeleteProduct,
  validateGetNewArrivals,
} from "../validations/productValidation";
import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

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

// Route for fetching new arrivals
router.get(
  "/api/products/new-arrivals",
  validateGetNewArrivals,
  validateRequest,
  getNewArrivals
);

export default router;
