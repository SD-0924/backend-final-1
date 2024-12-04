import { body, param, query } from "express-validator";

export const validateGetAllProducts = [
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be a number between 1 and 100"),
  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Offset must be a non-negative integer"),
];

export const validateGetProductById = [
  param("id").isUUID().withMessage("Product ID must be a valid UUID"),
];

export const validateAddProduct = [
  body("name")
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be a string between 3 and 100 characters"),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("stockQuantity")
    .isInt({ min: 0 })
    .withMessage("Stock quantity must be a non-negative integer"),
];

export const validateUpdateProduct = [
  param("id").isUUID().withMessage("Invalid product ID format"),
  body("name")
    .optional()
    .isString()
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be a string between 3 and 100 characters"),
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("stockQuantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock quantity must be a non-negative integer"),
  body("category")
    .optional()
    .isIn(["electronics", "fashion", "home"])
    .withMessage("Invalid category"),
];

export const validateDeleteProduct = [
  param("id").isUUID().withMessage("Invalid product ID format"),
];

export const validateGetProductRatings = [
  param("id").isUUID().withMessage("Product ID must be a valid UUID"),
];

export const validateGetNewArrivals = [
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be a number between 1 and 100"),
  query("offset")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Offset must be a non-negative number"),
  query("dateThreshold")
    .optional()
    .isISO8601()
    .withMessage("Date threshold must be a valid ISO 8601 date"),
];

export const validateGetBrandProduct = [
  param("id").isUUID().withMessage("Brand ID must be a valid UUID"),
];

export const validateGetCategoryProduct = [
  param("id").isUUID().withMessage("Category ID must be a valid UUID"),
];

export const validateGetPriceAfterDiscount = [
  param("productId").isUUID().withMessage("Invalid product ID"),
  param("discountId").isUUID().withMessage("Invalid discount ID"),
];
