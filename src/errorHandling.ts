import { Request, Response, NextFunction } from "express";

const errorHandlingMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err.name === "JsonWebTokenError") {
    res.status(401).json({ message: "Invalid token." });
  } else if (err.name === "TokenExpiredError") {
    res.status(401).json({ message: "Token expired." });
  } else {
    res.status(500).send(err.message);
  }

  next(err); // propagate the error further if needed
};

export default errorHandlingMiddleware;
