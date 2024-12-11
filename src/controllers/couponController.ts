import { STATUS_CODES } from "../constants/statusCodes";
import { Request, Response } from "express";
import {
  fetchAllCoupons,
  fetchCouponById,
  addCoupon,
  modifyCoupon,
  removeCoupon,
  fetchCouponOrders,
} from "../services/couponService";

export const getAllCoupons = async (req: Request, res: Response) => {
  try {
    const coupons = await fetchAllCoupons();
    res.json(coupons);
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ error: "Failed to fetch coupons" });
  }
};

export const getCouponById = async (req: Request, res: Response) => {
  try {
    const coupon = await fetchCouponById(req.params.id);
    if (!coupon) {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: "Coupon not found" });
    } else {
      res.json(coupon);
    }
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ error: "Failed to fetch coupon" });
  }
};

// Create a new coupon
export const createCoupon = async (req: Request, res: Response) => {
  try {
    const coupon = await addCoupon(req.body);
    res.status(STATUS_CODES.CREATED).json(coupon);
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ error: "Failed to create coupon" });
  }
};

export const updateCoupon = async (req: Request, res: Response) => {
  try {
    const coupon = await modifyCoupon(req.params.id, req.body);
    if (!coupon) {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: "Coupon not found" });
    } else {
      res.status(STATUS_CODES.CREATED).json(coupon);
    }
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ error: "Failed to update coupon" });
  }
};

export const deleteCoupon = async (req: Request, res: Response) => {
  try {
    const success = await removeCoupon(req.params.id);
    if (!success) {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: "Coupon not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ error: "Failed to delete coupon" });
  }
};

export const getCouponOrders = async (req: Request, res: Response) => {
  try {
    const orders = await fetchCouponOrders(req.params.id);
    res.status(STATUS_CODES.CREATED).json(orders);
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ error: "Failed to fetch orders for the coupon" });
  }
};
