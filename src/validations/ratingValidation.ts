import { body, param, validationResult } from 'express-validator';

export const validateRating = [
    body('rating')
        .isInt({ min: 1, max: 5 })
        .withMessage('Rating must be an integer between 1 and 5'),
    body('review')
        .optional()
        .isString()
        .withMessage('Review must be a string'),

    param('ratingId')
        .isMongoId()
        .withMessage('Invalid rating ID format'),

    param('userId')
        .isMongoId()
        .withMessage('Invalid user ID format'),

    param('productId')
        .isMongoId()
        .withMessage('Invalid product ID format'),

    (req: any, res: any, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];