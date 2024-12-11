import { ERROR_MESSAGES } from "../constants/errorMessages";
import { Request, Response } from "express";
import {
    createBrandService,
    fetchBrandByIdService,
    getAllBrandsService,
    deleteBrandByIdService,
    updateBrandService
} from "../services/brandService";

export const createBrand = async (req: Request, res: Response) => {
    try {
        // extract the product name from the body and the file to be uploaded to the firbase
        const { name } = req.body;
        const file = req.file;

        if (!req.file) {
        res.status(400).json({
            success: false,
            message: "A logo file is required for brand creation.",
        });
        return
        }

        const newBrand = await createBrandService(name, file!);

        res.status(201).json({
        success: true,
        message: "Brand created successfully",
        data: newBrand,
        });
        return
    } catch (error) {
        console.error("Error in Creating Brand.");

        res.status(500).json({
        success: false,
        message: "Error creating brand",
        });
        return
    }
};

export const getBrandById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const brand = await fetchBrandByIdService(id);

        if (!brand) {
        res.status(404).json({ message: "Brand not found." });
        } else {
        res.status(200).json(brand);
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
};

export const getAllBrands = async (req: Request, res: Response) => {
    try {
        // TO-DO: uncommint when you adjest the routs
        // const limit = parseInt(req.query.limit as string) || 10;
        // const offset = parseInt(req.query.offset as string) || 0;
        const brands = await getAllBrandsService();
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ message: ERROR_MESSAGES.SERVER_ERROR });
    }
};

export const deleteBrandById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteBrandByIdService(id);
        res
        .status(200)
        .json({ message: `Brand with ID ${id} deleted successfully.` });
    } catch (error: any) {
        if (error.message === "Brand not found") {
        res.status(404).json({ message: "Brand not found" });
        } else {
        res.status(500).json({ message: ERROR_MESSAGES.SERVER_ERROR });
        }
    }
};

export const updateBrandController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 
        const { name } = req.body; 
        const file = req.file; 

        const updatedBrand = await updateBrandService(id, name, file);

        res.status(200).json({
        message: "Brand updated successfully",
        brand: updatedBrand,
        });
    } catch (error: any) {
        res.status(500).json({ message: ERROR_MESSAGES.SERVER_ERROR, error: error.message });
    }
};