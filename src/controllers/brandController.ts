import { ERROR_MESSAGES } from "../constants/errorMessages";
import { STATUS_CODES } from "../constants/statusCodes";
import { Request, Response } from "express";
import {
  createBrandService,
  fetchBrandByIdService,
  getAllBrandsService,
  deleteBrandByIdService,
  updateBrandService,
} from "../services/brandService";
import logger from "../logger";

export const createBrand = async (req: Request, res: Response) => {
  try {
    // extract the product name from the body and the file to be uploaded to the firbase
    const { name } = req.body;
    const file = req.file;

    if (!req.file) {
      res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: "A logo file is required for brand creation.",
      });
      return;
    }

    const newBrand = await createBrandService(name, file!);

    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      message: "Brand created successfully",
      data: newBrand,
    });
    return;
  } catch (error) {
    logger.error("Error in Creating Brand.");

    res.status(STATUS_CODES.SERVER_ERROR).json({
      success: false,
      message: "Error creating brand",
    });
    return;
  }
};

export const getBrandById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const brand = await fetchBrandByIdService(id);

    if (!brand) {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Brand not found." });
    } else {
      res.status(STATUS_CODES.SUCCESS).json(brand);
    }
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: ERROR_MESSAGES.SERVER_ERROR });
  }
};

export const getAllBrands = async (req: Request, res: Response) => {
  try {
    // TO-DO: uncommint when you adjest the routs
    // const limit = parseInt(req.query.limit as string) || 10;
    // const offset = parseInt(req.query.offset as string) || 0;
    const brands = await getAllBrandsService();
    res.status(STATUS_CODES.SUCCESS).json(brands);
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: ERROR_MESSAGES.SERVER_ERROR });
  }
};

export const deleteBrandById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteBrandByIdService(id);
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: `Brand with ID ${id} deleted successfully.` });
  } catch (error: any) {
    if (error.message === "Brand not found") {
      res.status(STATUS_CODES.NOT_FOUND).json({ message: "Brand not found" });
    } else {
      res
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ message: ERROR_MESSAGES.SERVER_ERROR });
    }
  }
};

export const updateBrandController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const file = req.file;

    const updatedBrand = await updateBrandService(id, name, file);

    res.status(STATUS_CODES.SUCCESS).json({
      message: "Brand updated successfully",
      brand: updatedBrand,
    });
  } catch (error: any) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: ERROR_MESSAGES.SERVER_ERROR, error: error.message });
  }
};
