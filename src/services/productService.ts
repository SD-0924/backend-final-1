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
  getLimitedEditionRepository,
  getHandpickedProducts,
  getDiscountedProductsRepository,
  getPopularProductsRepository,
} from "../reposetories/productRepository";

import { fetchBrandByIdService, getBrandByIdService } from "./brandService";
import { getCategoryByIdService } from "./categoryService";
import { calculateRating, countRatingsForProduct } from "./ratingService";
import {
  getDiscountTimeRemainingById,
  getDiscountByProductId,
} from "./discountService";

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

  const finalProducts = await addCustomFields(products);
  return {
    products: finalProducts,
    pagination: {
      currentPage: page,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
    },
  };
};

export const getProductByIdService = async (productId: string) => {
  const product = await getProductByIdRepository(productId);
  const updatedProduct = await addCustomFields([product]);
  return updatedProduct[0];
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

export const getLimitedEditionService = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  const products = await getLimitedEditionRepository(limit, offset);
  return await addCustomFields(products);
};

export const getDiscountedProductsService = async (
  page: number,
  limit: number
) => {
  const offset = (page - 1) * limit;
  const products = await getDiscountedProductsRepository(limit, offset);
  return await addCustomFields(products);
};

export const getPopularProductsService = async (
  page: number,
  limit: number
) => {
  const offset = (page - 1) * limit;
  const products = await getPopularProductsRepository(limit, offset);
  return await addCustomFields(products);
};

export const getNewArrivalsService = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;

  // Calculate the date 3 months ago
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  // Fetch data from the repository
  const { rows: products, count: totalProducts } =
    await getNewArrivalsRepository(threeMonthsAgo, limit, offset);

  const finalProducts = await addCustomFields(products);
  return {
    products: finalProducts,
    pagination: {
      currentPage: page,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
    },
  };
};

export const getProductsByBrandService = async (
  brandId: string,
  page: number,
  limit: number
) => {
  const offset = (page - 1) * limit;
  // check if the brand exists or not by brandId
  const brandExists = await fetchBrandByIdService(brandId);
  if (!brandExists) {
    throw new Error("Brand not found");
  }
  return await getProductsByBrandRepository(brandId, limit, offset);
};

export const getProductsByCategoryService = async (
  categoryId: string,
  page: number,
  limit: number
) => {
  const offset = (page - 1) * limit;
  //check if the category exists or not by categoryId
  const categoryExists = await getCategoryByIdService(categoryId);
  if (!categoryExists) {
    throw new Error("Category not found");
  }
  const products = await getProductsByCategoryRepository(
    categoryId,
    limit,
    offset
  );
  return await addCustomFields(products);
};

export const fetchHandpickedProducts = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  const products = await getHandpickedProducts(limit, offset);

  return await addCustomFields(products);
};

export const addCustomFields = async (products: any[]) => {
  const updatedProducts = await Promise.all(
    products.map(async (product) => {
      try {
        const brand = await getBrandByIdService(product.dataValues.brandId);
        const brandName = brand ? brand.dataValues.name : null;

        const category = await getCategoryByIdService(
          product.dataValues.categoryId
        );
        const categoryName = category ? category.dataValues.name : null;

        const ratingAverage = await calculateRating(product.dataValues.id);
        const ratingTotal = await countRatingsForProduct(product.dataValues.id);

        const discount = await getDiscountByProductId(product.dataValues.id);
        let finalPrice = product.dataValues.price;
        if (discount) {
          const discountTimeStatus = await getDiscountTimeRemainingById(
            discount.dataValues.id
          );

          if (discountTimeStatus.remainingTime > 0) {
            const discountAmount =
              product.dataValues.price *
              (discount.dataValues.discountPercentage / 100);
            finalPrice = product.dataValues.price - discountAmount;
          }
        }
        return {
          ...product.dataValues,
          brandName,
          categoryName,
          ratingAverage,
          ratingTotal,
          discountPercentage: discount
            ? discount.dataValues.discountPercentage
            : 0,
          finalPrice,
        };
      } catch (error) {
        throw error;
      }
    })
  );
  return updatedProducts;
};
