import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validation.middleware';
import * as authController from '../controllers/auth.controller';

const router = Router();

// Register route
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/[a-z]/)
      .withMessage('Password must contain at least one lowercase letter')
      .matches(/[A-Z]/)
      .withMessage('Password must contain at least one uppercase letter')
      .matches(/\d/)
      .withMessage('Password must contain at least one number'),
    body('full_name').trim().notEmpty(),
    body('user_type').optional().isIn(['user', 'admin', 'hr', 'content_creator']),
  ],
  validateRequest,
  authController.register
);

// Login route
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  validateRequest,
  authController.login
);

// Logout route
router.post('/logout', authController.logout);

// Get current user
router.get('/me', authController.getCurrentUser);

// Refresh token
router.post('/refresh-token', authController.refreshToken);

export default router;
