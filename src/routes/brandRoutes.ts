import express from 'express';
import { createBrand, getBrandById } from "../controllers/brandController";
import { validateAddBrand, validateBrandId } from "../validations/brandValidation";
import upload from '../middlewares/multerUpload';
import { validateRequest } from '../middlewares/validateRequest';


const router = express.Router();

// create brand endpoint
router.post(
    "/api/brands", 
    upload.single('logo'),
    validateAddBrand,
    validateRequest,
    createBrand
);

// get brand by ID endpoint
router.get(
    "/api/brands/:id",
    validateBrandId,
    validateRequest,
    getBrandById
);

export default router;
