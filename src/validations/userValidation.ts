import { body } from 'express-validator';

export const validateUserRegistration = [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

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
];
export const validateUserUpdate = [
    // Validate email
    body("email")
      .optional()
      .isEmail()
      .withMessage("A valid email is required"),
  
    // Validate mobile number
    body("mobileNumber")
      .optional()
      .isMobilePhone("any")
      .withMessage("A valid mobile number is required"),
  
    // Validate street
    body("street")
      .optional()
      .notEmpty()
      .withMessage("Street is required")
      .isString()
      .withMessage("Street must be a valid string"),
  
    // Validate state
    body("state")
      .optional()
      .notEmpty()
      .withMessage("State is required")
      .isString()
      .withMessage("State must be a valid string"),
  
    // Validate city
    body("city")
      .optional()
      .notEmpty()
      .withMessage("City is required")
      .isString()
      .withMessage("City must be a valid string"),
  
    // Validate pincode
    body("pincode")
      .optional()
      .notEmpty()
      .withMessage("Pincode is required")
      .isPostalCode("any")
      .withMessage("Pincode must be a valid postal code"),
  
    // Validate old password
    body("oldPassword")
      .optional()
      .notEmpty()
      .withMessage("Old password is required if updating password"),
  
    // Validate new password
    body("newPassword")
      .optional()
      .notEmpty()
      .withMessage("New password is required")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters long"),
  
    // Validate confirm password
    body("confirmPassword")
      .optional()
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error("Confirm password must match the new password");
        }
        return true;
      }),
  ];


