import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { supabase } from '../../../database/config.js';
import { asyncHandler } from '../middleware/error.middleware.js';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password, full_name, user_type = 'user' } = req.body;

  // Check if user already exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create user in auth.users
  const { data: authUser, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        user_type,
      },
    },
  });

  if (signUpError) {
    throw new Error(signUpError.message);
  }

  if (!authUser.user) {
    throw new Error('Failed to create user');
  }

  // Create user in public.users
  const { error: dbError } = await supabase.from('users').insert([
    {
      id: authUser.user.id,
      email,
      full_name,
      user_type,
    },
  ]);

  if (dbError) {
    // Clean up auth user if DB insert fails
    await supabase.auth.admin.deleteUser(authUser.user.id);
    throw new Error('Failed to create user profile');
  }

  // Log activity
  await supabase.from('activity_logs').insert([
    {
      user_id: authUser.user.id,
      action: 'user_registered',
      entity_type: 'user',
      entity_id: authUser.user.id,
      metadata: {
        email,
        user_type,
      },
    },
  ]);

  res.status(201).json({
    message: 'Registration successful. Please check your email to verify your account.',
    userId: authUser.user.id,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Log activity
  await supabase.from('activity_logs').insert([
    {
      user_id: data.user.id,
      action: 'user_logged_in',
      entity_type: 'user',
      entity_id: data.user.id,
      metadata: {
        provider: 'email',
      },
    },
  ]);

  res.json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
    user: {
      id: data.user.id,
      email: data.user.email,
      full_name: data.user.user_metadata?.full_name,
      user_type: data.user.user_metadata?.user_type,
    },
  });
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw new Error(error.message);
  }

  res.json({ message: 'Successfully logged out' });
});

export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);
  
  if (error || !user) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  // Get user profile from public.users
  const { data: userProfile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!userProfile) {
    return res.status(404).json({ message: 'User profile not found' });
  }

  res.json({
    id: user.id,
    email: user.email,
    full_name: userProfile.full_name,
    user_type: userProfile.user_type,
    created_at: userProfile.created_at,
    updated_at: userProfile.updated_at,
  });
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { refresh_token } = req.body;
  
  if (!refresh_token) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  const { data, error } = await supabase.auth.refreshSession({
    refresh_token,
  });

  if (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  res.json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  });
});
