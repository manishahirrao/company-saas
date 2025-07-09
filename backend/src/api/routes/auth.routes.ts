import { Router, type Express, type Request, type Response, type NextFunction } from 'express';
import { body } from 'express-validator';
import Joi from 'joi';
import { validateBody } from '../middleware/validation.middleware.js';
import { commonValidators } from '../../utils/validation.js';
import * as authController from '../controllers/auth.controller.js';

const router: ReturnType<typeof Router> = Router();

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
    body('name').trim().notEmpty().withMessage('Name is required'),
  ],
  validateBody(Joi.object({
    email: commonValidators.email,
    password: commonValidators.password,
    name: Joi.string().required()
  })),
  authController.register
);

// Login route
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validateBody(Joi.object({
    email: commonValidators.email,
    password: Joi.string().required()
  })),
  authController.login
);

// Logout route
router.post('/logout', authController.logout);

// Refresh token route
router.post('/refresh-token', authController.refreshToken);

export default router;
