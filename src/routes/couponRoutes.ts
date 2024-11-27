import express from "express";
import {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  getCouponOrders,
} from "../controllers/couponController";
import {
  validateGetAllCoupons,
  validateGetCouponById,
  validateCreateCoupon,
  validateUpdateCoupon,
  validateDeleteCoupon,
  validateGetCouponOrders,
} from "../validations/couponValidation";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();

// Coupons Routes
router.get(
  "/api/coupons",
  validateGetAllCoupons,
  validateRequest,
  getAllCoupons
);
router.get(
  "/api/coupons/:id",
  validateGetCouponById,
  validateRequest,
  getCouponById
);
router.post(
  "/api/coupons",
  validateCreateCoupon,
  validateRequest,
  createCoupon
);
router.put(
  "/api/coupons/:id",
  validateUpdateCoupon,
  validateRequest,
  updateCoupon
);
router.delete(
  "/api/coupons/:id",
  validateDeleteCoupon,
  validateRequest,
  deleteCoupon
);
router.get(
  "/api/coupons/:id/orders",
  validateGetCouponOrders,
  validateRequest,
  getCouponOrders
);

export default router;
