import { Op, fn, col, literal } from "sequelize";
import Rating from "../models/Rating";
import Category from "../models/Category";
import Brand from "../models/Brand";
import Discount from "../models/Discount";
import Product from "../models/Product";

export const getAllProductsRepository = async (
  limit: number,
  offset: number,
  brandName?: any,
  categoryName?: any
) => {
  const brand = await Brand.findOne({
    where: { name: brandName },
  });

  const brandId = brand ? brand.dataValues.id : "";

  const category = await Category.findOne({
    where: { name: categoryName },
  });

  const categoryId = category ? category.dataValues.id : "";

  const brandProducts = brandId
    ? await Product.findAll({
        where: { brandId },
      })
    : [];

  // Step 2: Find all products based on categoryId
  const categoryProducts = categoryId
    ? await Product.findAll({
        where: { categoryId },
      })
    : [];

  // Step 3: Combine the products and remove duplicates by product ID
  const allProducts = [...brandProducts, ...categoryProducts];

  const uniqueProducts = Array.from(
    new Map(
      allProducts.map((product) => [product.dataValues.id, product])
    ).values()
  );

  // Step 4: Return the unique products and the total count
  return {
    rows: uniqueProducts,
    count: uniqueProducts.length,
  };
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

export const getLimitedEditionRepository = async () => {
  return await Product.findAll({
    where: { isLimitedEdition: true },
  });
};

export const getDiscountedProductsRepository = async () => {
  const currentDate = new Date();
  // Step 1: Fetch discounts with discountPercentage <= 15
  const discounts = await Discount.findAll({
    where: {
      discountPercentage: {
        [Op.lte]: 15,
      },
      startDate: {
        [Op.lte]: currentDate,
      },
      endDate: {
        [Op.gte]: currentDate,
      },
    },
    attributes: ["productId"], // Only fetch productId
  });

  // Step 2: Extract productIds
  const productIds = discounts.map((discount) => discount.productId);

  if (productIds.length === 0) {
    // No matching products found
    return [];
  }

  // Step 3: Fetch products based on productIds
  const products = await Product.findAll({
    where: {
      id: {
        [Op.in]: productIds,
      },
    },
  });

  return products;
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

export const getProductsByBrandRepository = async (brandId: string) => {
  return await Product.findAll({ where: { brandId } });
};

export const getProductsByCategoryRepository = async (categoryId: string) => {
  return await Product.findAll({ where: { categoryId } });
};
