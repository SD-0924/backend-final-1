import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../server';
import {STATUS_CODES} from "../constants/statusCodes";
export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const environment = process.env.NODE_ENV || "development";
  if (environment.toString().trim() === "test") {
    return next(); // Skip authentication during tests
  }
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
     res.status(STATUS_CODES.FORBIDDEN).json({ message: 'Access denied. No token provided.' });
     return
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(STATUS_CODES.FORBIDDEN).json({ message: 'Invalid or expired token' });
    }

    (req as any).user = user;

    if (user.role) {
      (req as any).userRole = user.role;
    }

    next();
  });
};

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const environment = process.env.NODE_ENV || "development";
  if (environment.toString().trim() === "test") {
    return next(); // Skip authentication during tests
  }
  if ((req as any).userRole !== 'Admin') {
     res.status(STATUS_CODES.FORBIDDEN).json({ message: 'Access denied. Admins only.' });
     return
  }
  next();
};

