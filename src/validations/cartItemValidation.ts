import { body, param, query } from "express-validator";

export const validateAddToCart = [
    body('userId')
        .isUUID().withMessage('User ID is required and must be a valid UUID'),

    body('productId')
        .isUUID().withMessage('Product ID is required and must be a valid UUID'),
    
    body('quantity')
        .isInt({ gt: 0 }).withMessage('Quantity is required and must be a positive integer')
];

export const validatecartId = [
    param('cartId')
        .isUUID().withMessage("Invalid cartId. It must be a valid UUID.")
];

export const validateuserId = [
    param('userId')
        .isUUID().withMessage("Invalid userId. It must be a valid UUID.")
]