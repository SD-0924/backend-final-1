import { body, param, validationResult } from 'express-validator';

export const validateRating = [
  body('userId').isUUID().withMessage('Invalid product ID'),
  body('productId').isUUID().withMessage('Invalid product ID'),
    body('ratingValue')
        .isFloat({ min: 1, max: 5 })
        .withMessage('Rating must be an integer between 1 and 5'),
    body('review')
        .optional()
        .isString()
        .withMessage('Review must be a string'),
];
