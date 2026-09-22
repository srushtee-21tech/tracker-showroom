import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { isMongoConnected } from '../config/db';
import { inMemoryStore } from '../store/inMemoryStore';
import { AuthRequest } from '../middleware/auth';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    let userObj: { id: string; name: string; email: string; role: string; passwordHash: string } | null = null;

    if (isMongoConnected) {
      const foundUser = await User.findOne({ email: email.toLowerCase().trim() });
      if (foundUser) {
        userObj = {
          id: foundUser._id.toString(),
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          passwordHash: foundUser.passwordHash,
        };
      }
    } else {
      const foundUser = inMemoryStore.users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
      if (foundUser) {
        userObj = {
          id: foundUser._id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          passwordHash: foundUser.passwordHash,
        };
      }
    }

    if (!userObj) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, userObj.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const secret = process.env.JWT_SECRET || 'tracker_showroom_super_secret_jwt_key_2026!';
    const token = jwt.sign(
      { id: userObj.id, email: userObj.email, role: userObj.role },
      secret,
      { expiresIn: '1d' }
    );

    return res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: userObj.id,
        name: userObj.name,
        email: userObj.email,
        role: userObj.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const verifyMe = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }
  return res.json({
    success: true,
    user: req.user,
  });
};
