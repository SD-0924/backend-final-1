import express from "express";
import {
  createBrand,
  getBrandById,
  getAllBrands,
  deleteBrandById,
<<<<<<< HEAD
=======
  updateBrandController
>>>>>>> a5a9e554b4b10d0642f96c53ea5eca1e2858dbe8
} from "../controllers/brandController";
import {
  validateAddBrand,
  validateBrandId,
<<<<<<< HEAD
=======
  validateGetAllBrands,
  validateUpdateBrand
>>>>>>> a5a9e554b4b10d0642f96c53ea5eca1e2858dbe8
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
<<<<<<< HEAD
router.get("/api/brands/:id", validateBrandId, validateRequest, getBrandById);

// get all brands
router.get(
  "/api/brands", // TO-DO: ValidateGetBrands (offset, limit => pagenation)
=======
router.get(
  "/api/brands/:id", 
  validateBrandId, 
  validateRequest, 
  getBrandById);

// get all brands
router.get(
  "/api/brands", 
  validateGetAllBrands,
>>>>>>> a5a9e554b4b10d0642f96c53ea5eca1e2858dbe8
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

// update brand
router.put(
  "/api/brands/:id",
  upload.single("logo"),
  validateUpdateBrand,
  validateRequest,
  updateBrandController
)
export default router;
