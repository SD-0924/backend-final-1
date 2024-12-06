import { Op, fn, col, literal, where } from "sequelize";
import sequelize from "../config/mySQLConf"; // Import sequelize instance
import Product from "../models/Product";
import Rating from "../models/Rating";
import Category from "../models/Category";
import Brand from "../models/Brand";
import Discount from "../models/Discount";

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

export const getHandpickedProducts = async () => {
  const currentDate = new Date();

  const products = await Product.findAll({
    include: [
      {
        model: Rating,
        attributes: [], // No need to retrieve Rating fields
        where: {
          ratingValue: {
            [Op.ne]: null,
          },
        },
        required: true, // Only include products with ratings
      },
      {
        model: Discount,
        attributes: [], // No need to retrieve Discount fields
        where: {
          productId: col("Product.id"),
          startDate: {
            [Op.lte]: currentDate,
          },
          endDate: {
            [Op.gte]: currentDate,
          },
        },
        required: false, // Discounts are optional
      },
    ],
    attributes: {
      include: [
        [
          fn(
            "COALESCE",
            literal(
              `Product.price - (Product.price * (SELECT discountPercentage / 100 FROM discounts WHERE productId = Product.id AND startDate <= '${currentDate.toISOString()}' AND endDate >= '${currentDate.toISOString()}' LIMIT 1))`
            ),
            col("Product.price")
          ),
          "finalPrice",
        ],
      ],
    },
    group: ["Product.id"], // Group by product ID to use aggregate functions
    having: literal(`
      AVG(ratings.ratingValue) > 4.5
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
  });

  return products;
};
