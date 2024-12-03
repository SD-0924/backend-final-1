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
import { authenticateJWT, isAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

// Coupons Routes
router.get(
  "/api/coupons",
  authenticateJWT, 
  validateGetAllCoupons,
  validateRequest,
  getAllCoupons
);
router.get(
  "/api/coupons/:id",
  authenticateJWT,
  validateGetCouponById,
  validateRequest,
  getCouponById
);
router.post(
  "/api/coupons",
  authenticateJWT, isAdmin,
  validateCreateCoupon,
  validateRequest,
  createCoupon
);
router.put(
  "/api/coupons/:id",
  authenticateJWT, isAdmin,
  validateUpdateCoupon,
  validateRequest,
  updateCoupon
);
router.delete(
  "/api/coupons/:id",
  authenticateJWT, isAdmin,
  validateDeleteCoupon,
  validateRequest,
  deleteCoupon
);
router.get(
  "/api/coupons/:id/orders",
  authenticateJWT, 
  validateGetCouponOrders,
  validateRequest,
  getCouponOrders
);

export default router;
