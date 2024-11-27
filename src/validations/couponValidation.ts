import { body, param } from "express-validator";

export const validateGetAllCoupons = [];

export const validateGetCouponById = [
  param("id").isUUID().withMessage("Coupon ID must be a valid UUID"),
];

export const validateCreateCoupon = [
  body("code").isString().withMessage("Code is required and must be a string"),
  body("discount_type")
    .isIn(["amount", "percentage"])
    .withMessage("Invalid discount type"),
  body("discount_value")
    .isFloat({ gt: 0 })
    .withMessage("Discount value must be positive"),
  body("expiry_date")
    .optional()
    .isISO8601()
    .withMessage("Expiry date must be a valid date"),
  body("usage_limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Usage limit must be a positive integer"),
];

export const validateUpdateCoupon = [
  param("id").isUUID().withMessage("Coupon ID must be a valid UUID"),
  body("code").optional().isString().withMessage("Code must be a string"),
  body("discount_type")
    .optional()
    .isIn(["amount", "percentage"])
    .withMessage("Invalid discount type"),
  body("discount_value")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Discount value must be positive"),
  body("expiry_date")
    .optional()
    .isISO8601()
    .withMessage("Expiry date must be a valid date"),
  body("usage_limit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Usage limit must be a positive integer"),
];

export const validateDeleteCoupon = [
  param("id").isUUID().withMessage("Coupon ID must be a valid UUID"),
];

export const validateGetCouponOrders = [
  param("id").isUUID().withMessage("Coupon ID must be a valid UUID"),
];
