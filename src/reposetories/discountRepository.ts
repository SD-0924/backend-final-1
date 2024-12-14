import logger from "../logger";
import Discount from "../models/Discount";

export const getAllDiscounts = async () => {
  return await Discount.findAll();
};

export const getDiscountById = async (id: string) => {
  return await Discount.findByPk(id);
};

export const createDiscount = async (data: any) => {
  return await Discount.create(data);
};

export const updateDiscount = async (id: string, data: any) => {
  const discount = await Discount.update(data, { where: { id } });
  if (!discount) {
    throw new Error("Discount not found");
  }
  return discount;
};

export const deleteDiscount = async (id: string) => {
  const discount = await Discount.destroy({ where: { id } });
  if (discount) {
    throw new Error("Discount not found");
  }
  return discount;
};

export const getDiscountTimeRemainingById = async (discountId: string) => {
  const discount = await Discount.findOne({
    where: { id: discountId },
    attributes: ["endDate"], // Only fetch the necessary column
  });

  if (!discount) {
    throw new Error("Discount not found");
  }

  const now = Date.now(); // Use `Date.now()` for better performance
  const endDate = new Date(discount.endDate).getTime();

  // Check if the discount has expired
  if (endDate < now) {
    return { remainingTime: 0, message: "Discount has expired" };
  }

  // Calculate remaining time
  const remainingTime = endDate - now;
  return { remainingTime, message: "Discount is still active" };
};

export const getDiscountByProductId = async (productId: string) => {
  try {
    const discount = await Discount.findOne({ where: { productId } });
    return discount;
  } catch (error) {
    logger.error(error);
    throw new Error("Error fetching discount");
  }
};
