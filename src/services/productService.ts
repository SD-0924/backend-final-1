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
import { getBrandById } from "../reposetories/brandRepository";

import { fetchBrandByIdService } from "./brandService";
import { getCategoryByIdService } from "./categoryService";
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

  const finalProducts = await getProductsfinalPriceAndDiscount(products);
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
  const updatedProduct = await getProductsfinalPriceAndDiscount([product]);
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

export const getLimitedEditionService = async () => {
  const products = await getLimitedEditionRepository();
  return await getProductsfinalPriceAndDiscount(products);
};

export const getDiscountedProductsService = async () => {
  const products = await getDiscountedProductsRepository();
  return await getProductsfinalPriceAndDiscount(products);
};

export const getPopularProductsService = async () => {
  const products = await getPopularProductsRepository();
  return await getProductsfinalPriceAndDiscount(products);
};

export const getNewArrivalsService = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;

  // Calculate the date 3 months ago
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  // Fetch data from the repository
  const { rows: products, count: totalProducts } =
    await getNewArrivalsRepository(threeMonthsAgo, limit, offset);

  const finalProducts = await getProductsfinalPriceAndDiscount(products);
  return {
    products: finalProducts,
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
  const products = await getProductsByCategoryRepository(categoryId);
  return await getProductsfinalPriceAndDiscount(products);
};

export const fetchHandpickedProducts = async () => {
  const products = await getHandpickedProducts();
  return await getProductsfinalPriceAndDiscount(products);
};

const getProductsfinalPriceAndDiscount = async (products: any[]) => {
  const updatedProducts = await Promise.all(
    products.map(async (product) => {
      try {
        const brand = await getBrandById(product.dataValues.brandId);
        const brandName = brand ? brand.dataValues.name : null;
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
