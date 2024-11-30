import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategoryId,
} from "../controllers/categoryController";

import {
  validateGetAllCategories,
  validateGetCategoryById,
  validateCreateCategory,
  validateUpdateCategory,
  validateDeleteCategory,
  validateGetProductsByCategoryId,
} from "../validations/categoryValidation";

import { validateRequest } from "../middlewares/validateRequest";

const router = Router();

router.get(
  "/api/categories",
  validateGetAllCategories,
  validateRequest,
  getAllCategories
);

router.get(
  "/api/categories/:id",
  validateGetCategoryById,
  validateRequest,
  getCategoryById
);

router.post(
  "/api/categories",
  validateCreateCategory,
  validateRequest,
  createCategory
);

router.put(
  "/api/categories/:id",
  validateUpdateCategory,
  validateRequest,
  updateCategory
);

router.delete(
  "/api/categories/:id",
  validateDeleteCategory,
  validateRequest,
  deleteCategory
);

router.get(
  "/api/categories/:id/products",
  validateGetProductsByCategoryId,
  validateRequest,
  getProductsByCategoryId
);

export default router;
