import { Request, Response } from "express";
import { getNewArrivalsService } from "../services/productService";
import {
  addProductService,
  updateProductService,
  deleteProductService,
} from "../services/productService";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    const newProduct = await addProductService(productData);

    res.status(201).json({
      success: true,
      message: "Product added successfully!",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add product. Please try again later.",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    const updatedProduct = await updateProductService(productId, updatedData);

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update product. Please try again later.",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;

    await deleteProductService(productId);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete product. Please try again later.",
    });
  }
};

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
