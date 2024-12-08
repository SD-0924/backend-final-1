import { body } from "express-validator";

export const validatePlaceOrder = [
  body("userId")
    .isUUID()
    .withMessage("User ID must be a valid UUID."),
  body("items.*.productId")
    .isUUID()
    .withMessage("Each item must have a valid product ID."),
  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Each item must have a valid quantity of at least 1."),
];
