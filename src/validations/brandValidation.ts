import { body, param, query } from "express-validator";

// validate the brand fields passed in the body
export const validateAddBrand = [

    // validate the brand name
    body("name")
    .notEmpty().withMessage('Brand name is required.')
    .isString().withMessage('Brand name must be string.'),
];

// validate the brand ID passed in the URL (UUID format)
export const validateBrandId = [
    param('id')
        .notEmpty().withMessage('Brand ID is required.') 
        .isUUID().withMessage('Brand ID must be a valid UUID format.'),
];

// vaidate 
export const validateGetAllBrands = [
    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 }) // limit the number of brands fetched per request
        .withMessage("Limit must be a number between 1 and 100"),
    query("offset")
        .optional()
        .isInt({ min: 0 }) // nsure offset starts from 0 or higher
        .withMessage("Offset must be a non-negative number"),
];
