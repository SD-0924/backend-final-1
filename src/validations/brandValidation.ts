import { body } from "express-validator";

export const validateAddBrand = [

    // validate the brand name
    body("name")
    .notEmpty().withMessage('Brand name is required.')
    .isString().withMessage('Brand name must be string.'),
];