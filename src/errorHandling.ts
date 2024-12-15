import logger from "./logger";
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
  logger.error(`Error: ${err.message}`, { stack: err.stack });
  if (err.name === "JsonWebTokenError") {
    res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Invalid token." });
  } else if (err.name === "TokenExpiredError") {
    res.status(STATUS_CODES.UNAUTHORIZED).json({ message: "Token expired." });
  } else {
    // Default error handling
    res.status(status).json({ message });
  }
};

export default errorHandlingMiddleware;
