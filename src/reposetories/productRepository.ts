import { Op, fn, col, literal, where } from "sequelize";
import sequelize from "../config/mySQLConf"; // Import sequelize instance
import Product from "../models/Product";
import Rating from "../models/Rating";
import Category from "../models/Category";
import Brand from "../models/Brand";
import Discount from "../models/Discount";
import { ERROR_MESSAGES } from "../constants/errorMessages";

export const getAllProductsRepository = async (
  limit: number,
  offset: number,
  brandName?: any,
  categoryName?: any,
  productName?: any
) => {
  if (!categoryName && !brandName && !productName) {
    return await Product.findAndCountAll({ limit, offset });
  }

  const nameProducts = await Product.findAll({
    where: {
      name: {
        [Op.like]: `%${productName}%`, // % is a wildcard for zero or more characters
      },
    },
  });

  const brand = await Brand.findOne({
    where: { name: brandName },
    attributes:["id"]
  });

  const brandId = brand ? brand.dataValues.id : "";

  const category = await Category.findOne({
    where: { name: categoryName },
    attributes:["id"]
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

  const allProducts = [...nameProducts, ...brandProducts, ...categoryProducts];

  const uniqueProducts = Array.from(
    new Map(
      allProducts.map((product) => [product.dataValues.id, product])
    ).values()
  );

  const paginatedProducts = uniqueProducts.slice(offset, offset + limit);

  // Step 4: Return the unique products and the total count
  return {
    rows: paginatedProducts,
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
  const product = await Product.update(updatedData, {where: {id:productId}});
  if (!product) {
    throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
  }
  return product;
};

export const deleteProductRepository = async (productId: string) => {
  const product = await Product.destroy({where:{id:productId}});
  if (!product) {
    throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
  }
  return product;
};

export const getProductRatingsRepository = async (productId: string) => {
  return await Rating.findAll({
    where: { productId },
  });
};

export const getLimitedEditionRepository = async (
  limit: number,
  offset: number
) => {
  return await Product.findAll({
    where: { isLimitedEdition: true },
    limit,
    offset,
  });
};

export const getDiscountedProductsRepository = async (
  limit: number,
  offset: number
) => {
  const currentDate = new Date();
  const products = await Product.findAll({
    where: sequelize.literal(`
      EXISTS (
        SELECT 1
        FROM discounts
        WHERE discounts.productId = Product.id
          AND discounts.discountPercentage >= 15 
          AND discounts.startDate <= '${currentDate.toISOString()}'
          AND discounts.endDate >= '${currentDate.toISOString()}' 
      )
    `),
    limit,
    offset,
  });

  return products;
};

export const getPopularProductsRepository = async (
  limit: number,
  offset: number
) => {
  const products = await Product.findAll({
    where: sequelize.literal(`
      EXISTS (
        SELECT 1
        FROM ratings
        WHERE ratings.productId = Product.id 
          AND ratings.ratingValue IS NOT NULL
        GROUP BY ratings.productId
        HAVING AVG(ratings.ratingValue) >= 4.5 
      )
    `),
    limit,
    offset,
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

export const getProductsByBrandRepository = async (
  brandId: string,
  limit: number,
  offset: number
) => {
  return await Product.findAndCountAll({ where: { brandId }, limit, offset });
};

export const getProductsByCategoryRepository = async (
  categoryId: string,
  limit: number,
  offset: number
) => {
  return await Product.findAndCountAll({
    where: { categoryId },
    limit,
    offset,
  });
};

export const getHandpickedProducts = async (limit: number, offset: number) => {
  const currentDate = new Date();

  const products = await Product.findAll({
    where: sequelize.literal(`
    EXISTS (
      SELECT 1
      FROM ratings
      WHERE ratings.ratingValue IS NOT NULL
        AND ratings.productId = Product.id 
      GROUP BY ratings.productId
      HAVING AVG(ratings.ratingValue) > 4.5
    )
    AND COALESCE(
      Product.price - (
        Product.price * (
          SELECT discountPercentage / 100
          FROM discounts
          WHERE discounts.productId = Product.id 
            AND discounts.startDate <= '${currentDate.toISOString()}'
            AND discounts.endDate >= '${currentDate.toISOString()}'
          LIMIT 1
        )
      ),
      Product.price
    ) < 100
  `),
    limit,
    offset,
  });

  return products;
};
