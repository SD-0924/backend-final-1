import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If validation errors exist, respond with status 400
    res.status(400).json({ error: "Validation error", errors: errors.array() });
    return; // Ensure no further processing happens
  }

  // Proceed to the next middleware or route handler
  next();
};
