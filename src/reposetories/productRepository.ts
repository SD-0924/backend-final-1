import { Op } from "sequelize";
import Product from "../models/Product";

export const addProductRepository = async (productData: any) => {
  return await Product.create(productData);
};

export const updateProductRepository = async (
  productId: string,
  updatedData: Partial<Product>
) => {
  const product = await Product.findByPk(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  return await product.update(updatedData);
};

export const deleteProductRepository = async (productId: string) => {
  const product = await Product.findByPk(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  return await product.destroy();
};
export const getNewArrivalsRepository = async (
  dateThreshold: Date,
  limit: number,
  offset: number
) => {
  return await Product.findAndCountAll({
    where: {
      stockQuantity: {
        [Op.gt]: 0, // Products with stock > 0
      },
      createdAt: {
        [Op.gte]: dateThreshold, // Created within the last 3 months
      },
    },
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });
};
