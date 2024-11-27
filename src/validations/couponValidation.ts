import { body, param } from "express-validator";

export const validateGetAllCoupons = [];

export const validateGetCouponById = [
  param("id").isUUID().withMessage("Coupon ID must be a valid UUID"),
];

export const validateCreateCoupon = [
  body("code").isString().withMessage("Code is required and must be a string"),
  body("discountType")
    .isIn(["amount", "percentage"])
    .withMessage("Invalid discount type"),
  body("discountValue")
    .isFloat({ gt: 0 })
    .withMessage("Discount value must be positive"),
  body("expiryDate")
    .optional()
    .isISO8601()
    .withMessage("Expiry date must be a valid date"),
  body("usageLimit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Usage limit must be a positive integer"),
];

export const validateUpdateCoupon = [
  param("id").isUUID().withMessage("Coupon ID must be a valid UUID"),
  body("code").optional().isString().withMessage("Code must be a string"),
  body("discountType")
    .optional()
    .isIn(["amount", "percentage"])
    .withMessage("Invalid discount type"),
  body("discountValue")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Discount value must be positive"),
  body("expiryDate")
    .optional()
    .isISO8601()
    .withMessage("Expiry date must be a valid date"),
  body("usageLimit")
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
