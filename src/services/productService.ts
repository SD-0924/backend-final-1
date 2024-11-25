import {
  getNewArrivalsRepository,
  countNewArrivalsRepository,
} from "../reposetories/productRepository";

export const getNewArrivalsService = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;

  // Calculate the date 3 months ago
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  // Fetch data from the repository
  const products = await getNewArrivalsRepository(
    threeMonthsAgo,
    limit,
    offset
  );
  const totalProducts = await countNewArrivalsRepository(threeMonthsAgo);

  return {
    products,
    pagination: {
      currentPage: page,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
    },
  };
};
