import express from "express";
import {
  createBrand,
  getBrandById,
  getAllBrands,
  deleteBrandById,
  updateBrandController
} from "../controllers/brandController";
import {
  validateAddBrand,
  validateBrandId,
  validateGetAllBrands,
  validateUpdateBrand
} from "../validations/brandValidation";
import upload from "../middlewares/multerUpload";
import { validateRequest } from "../middlewares/validateRequest";
import { authenticateJWT, isAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

// create brand endpoint
router.post(
  "/api/brands",
  upload.single("logo"),
  //authenticateJWT, isAdmin,
  validateAddBrand,
  validateRequest,
  createBrand
);

// get brand by ID endpoint
router.get(
  "/api/brands/:id", 
  //authenticateJWT, 
  validateBrandId, 
  validateRequest, 
  getBrandById);

// get all brands
router.get(
  "/api/brands", 
  //authenticateJWT, 
  validateGetAllBrands,
  validateRequest,
  getAllBrands
);

// delete brand by id
router.delete(
  "/api/brands/:id",
  //authenticateJWT, isAdmin,
  validateBrandId,
  validateRequest,
  deleteBrandById
);

// update brand
router.put(
  "/api/brands/:id",
  //authenticateJWT, isAdmin,
  upload.single("logo"),
  validateUpdateBrand,
  validateRequest,
  updateBrandController
)
export default router;
