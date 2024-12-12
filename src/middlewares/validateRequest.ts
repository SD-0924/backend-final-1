import { STATUS_CODES } from "../constants/statusCodes";
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { ERROR_MESSAGES } from "../constants/errorMessages";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If validation errors exist, respond with status 400
    res
      .status(STATUS_CODES.BAD_REQUEST)
      .json({ error: ERROR_MESSAGES.VALIDATION_ERROR, errors: errors.array() });
    return; // Ensure no further processing happens
  }

  // Proceed to the next middleware or route handler
  next();
};
