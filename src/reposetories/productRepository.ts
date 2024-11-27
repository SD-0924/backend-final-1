import { Op } from "sequelize";
import Product from "../models/Product";
import Rating from "../models/Rating";

export const getAllProductsRepository = async () => {
  return await Product.findAll();
};

export const getProductByIdRepository = async (productId: string) => {
  return await Product.findByPk(productId);
};

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

export const getProductRatingsRepository = async (productId: string) => {
  return await Rating.findAll({
    where: { productId },
  });
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
      created_at: {
        [Op.gte]: dateThreshold, // Created within the last 3 months
      },
    },
    order: [["created_at", "DESC"]],
    limit,
    offset,
  });
};
