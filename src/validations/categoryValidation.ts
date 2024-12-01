import { param, body, query } from "express-validator";

export const validateGetAllCategories = [
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be a number between 1 and 100"),
  query("page")
    .optional()
    .isInt({ min: 0 })
    .withMessage("page must be a non-negative number"),
];

export const validateGetCategoryById = [
  param("id").isUUID().withMessage("Invalid category ID format"),
];

export const validateCreateCategory = [
  body("name").isString().withMessage("Name is required"),
  body("description").optional().isString(),
];

export const validateUpdateCategory = [
  param("id").isUUID().withMessage("Invalid category ID format"),
  body("name").optional().isString(),
  body("description").optional().isString(),
];

export const validateDeleteCategory = [
  param("id").isUUID().withMessage("Invalid category ID format"),
];

export const validateGetProductsByCategoryId = [
  param("id").isUUID().withMessage("Invalid category ID format"),
];
