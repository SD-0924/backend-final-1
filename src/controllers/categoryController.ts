import { STATUS_CODES } from "../constants/statusCodes";
import { Request, Response } from "express";
import {
  getAllCategoriesService,
  getCategoryByIdService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
  getProductsByCategoryIdService,
} from "../services/categoryService";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const categories = await getAllCategoriesService(limit, offset);
    res.status(STATUS_CODES.SUCCESS).json(categories);
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ error: "Failed to fetch categories" });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const category = await getCategoryByIdService(categoryId);
    if (!category) {
      res.status(STATUS_CODES.NOT_FOUND).json({ error: "Category not found" });
    } else {
      res.status(STATUS_CODES.SUCCESS).json(category);
    }
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ error: "Failed to fetch category" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const categoryData = req.body;
    const newCategory = await createCategoryService(categoryData);
    res.status(201).json({
      success: true,
      message: "Category created successfully!",
      data: newCategory,
    });
  } catch (error) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      success: false,
      message: "Failed to create category",
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const updatedData = req.body;
    const updatedCategory = await updateCategoryService(
      categoryId,
      updatedData
    );

    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Category updated successfully!",
      data: updatedCategory,
    });
  } catch (error: any) {
    if (error.message === "Category not found") {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Category not found" });
    } else {
      res.status(STATUS_CODES.SERVER_ERROR).json({
        success: false,
        message: "Failed to update category",
      });
    }
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    await deleteCategoryService(categoryId);
    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Category deleted successfully!",
    });
  } catch (error: any) {
    if (error.message === "Category not found") {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: "Category not found" });
    } else {
      res.status(STATUS_CODES.SERVER_ERROR).json({
        success: false,
        message: "Failed to delete category",
      });
    }
  }
};

export const getProductsByCategoryId = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    const products = await getProductsByCategoryIdService(categoryId);
    res.status(STATUS_CODES.SUCCESS).json(products);
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ error: "Failed to fetch products" });
  }
};
