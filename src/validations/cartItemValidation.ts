import { body, param, query } from "express-validator";

export const validateAddToCart = [
    body('userId')
        .isUUID().withMessage('User ID is required and must be a valid UUID'),

    body('productId')
        .isUUID().withMessage('Product ID is required and must be a valid UUID'),
    
    body('quantity')
        .isInt({ gt: 0 }).withMessage('Quantity is required and must be a positive integer')
];