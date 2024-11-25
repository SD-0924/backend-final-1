import { Op } from "sequelize";
import Product from "../models/Product";

export const getNewArrivalsRepository = async (
  //TO-DO: optemize this code
  dateThreshold: Date,
  limit: number,
  offset: number
) => {
  return await Product.findAll({
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

export const countNewArrivalsRepository = async (dateThreshold: Date) => {
  return await Product.count({
    where: {
      stockQuantity: {
        [Op.gt]: 0,
      },
      created_at: {
        [Op.gte]: dateThreshold,
      },
    },
  });
};
