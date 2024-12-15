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
import { authenticateJWT, isAdmin } from '../middlewares/authMiddleware';

const router = Router();

router.get(
  "/api/categories",
  authenticateJWT, 
  validateGetAllCategories,
  validateRequest,
  getAllCategories
);

router.get(
  "/api/categories/:id",
  authenticateJWT, 
  validateGetCategoryById,
  validateRequest,
  getCategoryById
);

router.post(
  "/api/categories",
  authenticateJWT, isAdmin,
  validateCreateCategory,
  validateRequest,
  createCategory
);

router.put(
  "/api/categories/:id",
  authenticateJWT, isAdmin,
  validateUpdateCategory,
  validateRequest,
  updateCategory
);

router.delete(
  "/api/categories/:id",
  authenticateJWT, isAdmin,
  validateDeleteCategory,
  validateRequest,
  deleteCategory
);

router.get(
  "/api/categories/:id/products",
  authenticateJWT, 
  validateGetProductsByCategoryId,
  validateRequest,
  getProductsByCategoryId
);

export default router;
