import express from 'express';
import { createBrand } from "../controllers/brandController";
import { validateAddBrand } from "../validations/brandValidation";
import upload from '../middlewares/multerUpload';
import { validateRequest } from '../middlewares/validateRequest';


const router = express.Router();

router.post(
    "/api/brands", 
    upload.single('logo'),
    validateAddBrand,
    validateRequest,
    createBrand
);

export default router;

