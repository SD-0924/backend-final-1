import {
  getAllProductsRepository,
  getProductByIdRepository,
  addProductRepository,
  updateProductRepository,
  deleteProductRepository,
  getNewArrivalsRepository,
  getProductRatingsRepository,
  getProductsByBrandRepository,
  getProductsByCategoryRepository,
} from "../reposetories/productRepository";

import { fetchBrandByIdService } from "./brandService";
import { getCategoryByIdService } from "./categoryService";

import Product from "../models/Product";

export const getAllProductsService = async (
  page: number,
  limit: number,
  brandName?: any,
  categoryName?: any
) => {
  const offset = (page - 1) * limit;
  const { rows: products, count: totalProducts } =
    await getAllProductsRepository(limit, offset, brandName, categoryName);
  return {
    products,
    pagination: {
      currentPage: page,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
    },
  };
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

export const getProductsByCategoryService = async (categoryId: string) => {
  //check if the category exists or not by categoryId
  const categoryExists = await getCategoryByIdService(categoryId);
  if (!categoryExists) {
    throw new Error("Category not found");
  }
  return await getProductsByCategoryRepository(categoryId);
};
