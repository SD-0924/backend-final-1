import { body, param } from "express-validator";

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