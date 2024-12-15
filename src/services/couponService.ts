import {
  getAllCouponsRepo,
  getCouponByIdRepo,
  createCouponRepo,
  updateCouponRepo,
  deleteCouponRepo,
  getCouponOrdersRepo,
} from "../reposetories/couponPepository";

export const fetchAllCoupons = async () => {
  return await getAllCouponsRepo();
};

export const fetchCouponById = async (couponId: string) => {
  return await getCouponByIdRepo(couponId);
};

// Add a new coupon
export const addCoupon = async (couponData: any) => {
  return await createCouponRepo(couponData);
};

export const modifyCoupon = async (couponId: string, couponData: any) => {
  return await updateCouponRepo(couponId, couponData);
};

export const removeCoupon = async (couponId: string) => {
  return await deleteCouponRepo(couponId);
};

export const fetchCouponOrders = async (couponId: string) => {
  return await getCouponOrdersRepo(couponId);
};
