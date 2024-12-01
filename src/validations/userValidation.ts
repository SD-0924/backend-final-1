import { body } from 'express-validator';

export const validateUserRegistration = [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('confirmPassword').notEmpty().withMessage('Confirm password is required'),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),

    body('first')
    .notEmpty()
    .withMessage('First name is required')
    .isString()
    .withMessage('First name must be a valid string'),

// Validate last name
body('last')
    .notEmpty()
    .withMessage('Last name is required')
    .isString()
    .withMessage('Last name must be a valid string'),
];

export const validateUserLogin = [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').notEmpty()
]
