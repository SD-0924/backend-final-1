import Coupon from "../models/Coupon";
import Order from "../models/Order";

// Get all coupons
export const getAllCouponsRepo = async () => {
  return await Coupon.findAll();
};

// Get a coupon by ID
export const getCouponByIdRepo = async (couponId: string) => {
  return await Coupon.findByPk(couponId);
};

// Create a new coupon
export const createCouponRepo = async (couponData: any) => {
  return await Coupon.create(couponData);
};

// Update a coupon
export const updateCouponRepo = async (couponId: string, couponData: any) => {
  const coupon = await Coupon.update(couponData,{where:{id: couponId}});
  if (!coupon) return null;
  return coupon;
};

// Delete a coupon
export const deleteCouponRepo = async (couponId: string) => {
  const coupon = await Coupon.destroy({where:{id: couponId}});
  if (!coupon) return false;
  return true;
};

//Get orders associated with a coupon
export const getCouponOrdersRepo = async (couponId: string) => {
  return await Order.findAll({
    where: { couponId },
  });
};
