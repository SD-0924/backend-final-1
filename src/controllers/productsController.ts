import { Request, Response } from "express";
import { getNewArrivalsService } from "../services/productService";

export const getNewArrivals = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { products, pagination } = await getNewArrivalsService(page, limit);

    res.status(200).json({
      success: true,
      data: products,
      pagination,
    });
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch new arrivals. Please try again later.",
    });
  }
};
