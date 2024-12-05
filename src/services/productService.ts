import {
  getAllProductsRepository,
  getProductByIdRepository,
  addProductRepository,
  updateProductRepository,
  deleteProductRepository,
  getNewArrivalsRepository,
  getProductRatingsRepository,
  getProductsByBrandRepository,
  getHandpickedProducts,
} from "../reposetories/productRepository";

import { fetchBrandByIdService } from "./brandService";

import Product from "../models/Product";

export const getAllProductsService = async () => {
  return await getAllProductsRepository();
};

export const getProductByIdService = async (productId: string) => {
  return await getProductByIdRepository(productId);
};

export const addProductService = async (productData: Partial<Product>) => {
  return await addProductRepository(productData);
};

export const updateProductService = async (
  productId: string,
  updatedData: Partial<Product>
) => {
  return await updateProductRepository(productId, updatedData);
};

export const deleteProductService = async (productId: string) => {
  return await deleteProductRepository(productId);
};

export const getProductRatingsService = async (productId: string) => {
  return await getProductRatingsRepository(productId);
};

export const getNewArrivalsService = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;

  // Calculate the date 3 months ago
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  // Fetch data from the repository
  const { rows: products, count: totalProducts } =
    await getNewArrivalsRepository(threeMonthsAgo, limit, offset);

  return {
    products,
    pagination: {
      currentPage: page,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
    },
  };
};

export const getProductsByBrandService = async (brandId: string) => {
  // check if the brand exists or not by brandId
  const brandExists = await fetchBrandByIdService(brandId);
  if (!brandExists) {
    throw new Error("Brand not found");
  }
  return await getProductsByBrandRepository(brandId);
};

export const fetchHandpickedProducts = async () => {
  return await getHandpickedProducts();
};
