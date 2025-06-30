import { Request, Response, NextFunction } from 'express';
import { supabase } from '../../../database/config';
import { CustomError } from './error.middleware';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    
    // Verify the token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      throw new CustomError('Invalid or expired token', 401);
    }

    // Get user profile from database
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !userProfile) {
      throw new CustomError('User profile not found', 404);
    }

    // Attach user to request object
    req.user = {
      id: user.id,
      email: user.email || '',
      full_name: userProfile.full_name,
      user_type: userProfile.user_type,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (roles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new CustomError('Not authenticated', 401);
    }

    if (roles.length && !roles.includes(req.user.user_type)) {
      throw new CustomError('Not authorized to access this resource', 403);
    }

    next();
  };
};

export const checkOwnership = (model: string, paramKey = 'id') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new CustomError('Not authenticated', 401);
      }

      const entityId = req.params[paramKey];
      
      // Check if the entity exists and belongs to the user
      const { data: entity, error } = await supabase
        .from(model)
        .select('user_id')
        .eq('id', entityId)
        .single();

      if (error || !entity) {
        throw new CustomError('Resource not found', 404);
      }

      // Allow admins to access any resource
      if (req.user.user_type !== 'admin' && entity.user_id !== req.user.id) {
        throw new CustomError('Not authorized to access this resource', 403);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
