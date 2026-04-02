import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

/**
 * Access Control Middleware
 * Roles: VIEWER, ANALYST, ADMIN
 * Check if the user's role is included in the allowed roles for a route.
 */
export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role) {
      return next(new AppError('Forbidden. User details missing.', 403));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError(`Forbidden. Requires one of: ${allowedRoles.join(', ')}`, 403));
    }

    next();
  };
};
