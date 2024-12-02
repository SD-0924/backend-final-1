import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../server';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
     res.status(403).json({ message: 'Access denied. No token provided.' });
     return
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
       res.status(403).json({ message: 'Invalid or expired token' });
       return
    }

    // Use Type Assertion to let TypeScript know that req.user will exist
    (req as any).user = user;
    next();
  });
};
