import {
  getAllCouponsRepo,
  getCouponByIdRepo,
  createCouponRepo,
  updateCouponRepo,
  deleteCouponRepo,
  //   getCouponOrdersRepo,
} from "../reposetories/couponPepository";

// Fetch all coupons
export const fetchAllCoupons = async () => {
  return await getAllCouponsRepo();
};

// Fetch a coupon by ID
export const fetchCouponById = async (couponId: string) => {
  return await getCouponByIdRepo(couponId);
};

// Add a new coupon
export const addCoupon = async (couponData: any) => {
  return await createCouponRepo(couponData);
};

// Update a coupon
export const modifyCoupon = async (couponId: string, couponData: any) => {
  return await updateCouponRepo(couponId, couponData);
};

// Delete a coupon
export const removeCoupon = async (couponId: string) => {
  return await deleteCouponRepo(couponId);
};

// Fetch orders for a coupon
// export const fetchCouponOrders = async (couponId: string) => {
//   return await getCouponOrdersRepo(couponId);
// };
