import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Authentication token missing.' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'tracker_showroom_super_secret_jwt_key_2026!';
    const decoded = jwt.verify(token, secret) as { id: string; email: string; role: string };
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access forbidden. Admin role required.' });
  }
  next();
};
