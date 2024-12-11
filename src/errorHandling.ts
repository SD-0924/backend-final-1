import { ERROR_MESSAGES } from "./constants/errorMessages";
import { STATUS_CODES } from "./constants/statusCodes";


import { Request, Response, NextFunction } from "express";

const errorHandlingMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = err.status || STATUS_CODES.SERVER_ERROR;
  const message = err.message || ERROR_MESSAGES.SERVER_ERROR;

  // Specific error handling
  if (err.name === "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid token." });
  } else if (err.name === "TokenExpiredError") {
    res.status(401).json({ message: "Token expired." });
  } else {
    // Default error handling
    res.status(status).json({ message });
  }
};

export default errorHandlingMiddleware;
