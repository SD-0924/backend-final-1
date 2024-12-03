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
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // حفظ البيانات في request
    (req as any).user = user;

    // يمكنك التحقق من الدور هنا
    if (user.role) {
      (req as any).userRole = user.role;
    }

    next();
  });
};

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if ((req as any).userRole !== 'Admin') {
     res.status(403).json({ message: 'Access denied. Admins only.' });
     return
  }
  next();
};

