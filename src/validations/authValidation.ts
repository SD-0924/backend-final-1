import { check } from "express-validator";

export const registerValidation = [
  check("email").isEmail().withMessage("Enter a valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  check("first").notEmpty().withMessage("First name is required"),
  check("last").notEmpty().withMessage("Last name is required"),
];
