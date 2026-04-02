import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Extending Express Request to add authenticated user context
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authentication required. Invalid or missing token.', 401);
    }

    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'finance-api-super-secret-key-123') as any;

    // Check if user still exists and isActive
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user || !user.isActive) {
      throw new AppError('User not found or is disabled.', 401);
    }

    // Attach user to req
    req.user = { id: user.id, email: user.email, role: user.role };
    next();
  } catch (error) {
    if (error instanceof AppError) return next(error);
    return next(new AppError('Invalid authentication token.', 401));
  }
};
