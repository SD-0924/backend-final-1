import express from "express";
import {
  createBrand,
  getBrandById,
  getAllBrands,
  deleteBrandById,
} from "../controllers/brandController";
import {
  validateAddBrand,
  validateBrandId,
} from "../validations/brandValidation";
import upload from "../middlewares/multerUpload";
import { validateRequest } from "../middlewares/validateRequest";

const router = express.Router();

// create brand endpoint
router.post(
  "/api/brands",
  upload.single("logo"),
  validateAddBrand,
  validateRequest,
  createBrand
);

// get brand by ID endpoint
router.get("/api/brands/:id", validateBrandId, validateRequest, getBrandById);

// get all brands
router.get(
  "/api/brands", // TO-DO: ValidateGetBrands (offset, limit => pagenation)
  validateRequest,
  getAllBrands
);

// delete brand by id
router.delete(
  "/api/brands/:id",
  validateBrandId,
  validateRequest,
  deleteBrandById
);

export default router;
