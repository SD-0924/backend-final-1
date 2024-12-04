import { body, param } from 'express-validator';

export const validateCreateDiscount = [
    body('discountPercentage').isInt({ min: 1, max: 100 }).withMessage('Discount percentage must be between 1 and 100'),
    body('productId').isUUID().withMessage('Invalid product ID'),
    body('startDate').isISO8601().withMessage('Invalid start date'),
    body('endDate').isISO8601().withMessage('Invalid end date'),
];

export const validateUpdateDiscount = [...validateCreateDiscount];

export const validateGetDiscountById = [
    param('id').isUUID().withMessage('Invalid discount ID'),
];
