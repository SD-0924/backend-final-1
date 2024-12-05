import { body, param, validationResult } from 'express-validator';

export const validateRating = [
    body('rating')
        .isFloat({ min: 1, max: 5 })
        .withMessage('Rating must be an integer between 1 and 5'),
    body('review')
        .optional()
        .isString()
        .withMessage('Review must be a string'),

    (req: any, res: any, next: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];