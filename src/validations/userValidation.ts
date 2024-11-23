import { body } from 'express-validator';

export const validateUserRegistration = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('first').notEmpty().withMessage('First name is required'),
    body('last').notEmpty().withMessage('Last name is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];
