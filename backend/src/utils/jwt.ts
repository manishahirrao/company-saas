import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables
config({ path: path.join(__dirname, '../../.env') });

// JWT configuration
export const JWT_CONFIG = {
  ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_SECRET || 'your-access-token-secret',
  REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_SECRET || 'your-refresh-token-secret',
  ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  ISSUER: process.env.JWT_ISSUER || 'postpilot-api',
  AUDIENCE: process.env.JWT_AUDIENCE || 'postpilot-app',
};

export interface TokenPayload {
  jti: string; // JWT ID
  sub: string; // Subject (user ID)
  email: string; // User email
  role: string; // User role
  iat?: number; // Issued at
  exp?: number; // Expiration time
}

/**
 * Generate a JWT token
 */
export const generateToken = (
  payload: Omit<TokenPayload, 'jti' | 'iat' | 'exp'>,
  type: 'access' | 'refresh' = 'access'
): string => {
  const secret = type === 'access' ? JWT_CONFIG.ACCESS_TOKEN_SECRET : JWT_CONFIG.REFRESH_TOKEN_SECRET;
  const expiresIn = type === 'access' ? JWT_CONFIG.ACCESS_TOKEN_EXPIRES_IN : JWT_CONFIG.REFRESH_TOKEN_EXPIRES_IN;
  
  const tokenPayload: TokenPayload = {
    jti: uuidv4(),
    ...payload,
  };

  return jwt.sign(tokenPayload, secret, {
    expiresIn,
    issuer: JWT_CONFIG.ISSUER,
    audience: JWT_CONFIG.AUDIENCE,
  });
};

/**
 * Verify a JWT token
 */
export const verifyToken = (
  token: string,
  type: 'access' | 'refresh' = 'access'
): TokenPayload => {
  const secret = type === 'access' ? JWT_CONFIG.ACCESS_TOKEN_SECRET : JWT_CONFIG.REFRESH_TOKEN_SECRET;
  
  try {
    return jwt.verify(token, secret, {
      issuer: JWT_CONFIG.ISSUER,
      audience: JWT_CONFIG.AUDIENCE,
    }) as TokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token has expired');
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    }
    throw new Error('Failed to verify token');
  }
};

/**
 * Generate both access and refresh tokens
 */
export const generateAuthTokens = (payload: Omit<TokenPayload, 'jti' | 'iat' | 'exp'>) => {
  const accessToken = generateToken(payload, 'access');
  const refreshToken = generateToken(payload, 'refresh');
  
  return {
    accessToken,
    refreshToken,
    expiresIn: JWT_CONFIG.ACCESS_TOKEN_EXPIRES_IN,
  };
};

/**
 * Refresh an access token using a refresh token
 */
export const refreshAccessToken = (refreshToken: string) => {
  try {
    // Verify the refresh token
    const payload = verifyToken(refreshToken, 'refresh');
    
    // Generate a new access token
    const { jti, iat, exp, ...userPayload } = payload;
    const accessToken = generateToken(userPayload, 'access');
    
    return {
      accessToken,
      expiresIn: JWT_CONFIG.ACCESS_TOKEN_EXPIRES_IN,
    };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

/**
 * Generate a password reset token
 */
export const generatePasswordResetToken = (userId: string, email: string): string => {
  const secret = `${JWT_CONFIG.ACCESS_TOKEN_SECRET}${email}`;
  
  return jwt.sign(
    { sub: userId, email, type: 'password_reset' },
    secret,
    { expiresIn: '1h' }
  );
};

/**
 * Verify a password reset token
 */
export const verifyPasswordResetToken = (token: string, email: string): { userId: string; email: string } => {
  const secret = `${JWT_CONFIG.ACCESS_TOKEN_SECRET}${email}`;
  
  try {
    const payload = jwt.verify(token, secret) as { sub: string; email: string; type: string };
    
    if (payload.type !== 'password_reset') {
      throw new Error('Invalid token type');
    }
    
    return {
      userId: payload.sub,
      email: payload.email,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Password reset token has expired');
    }
    throw new Error('Invalid password reset token');
  }
};

export default {
  generateToken,
  verifyToken,
  generateAuthTokens,
  refreshAccessToken,
  generatePasswordResetToken,
  verifyPasswordResetToken,
  JWT_CONFIG,
};
