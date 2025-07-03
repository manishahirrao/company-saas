import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Types
type Tables = Database['public']['Tables'];
type User = Tables['users']['Row'];
type Profile = Tables['user_profiles']['Row'];
type Company = Tables['companies']['Row'];
type Job = Tables['jobs']['Row'];

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// ====================
// AUTH HELPERS
// ====================

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// ====================
// USER PROFILE
// ====================

export const getProfile = async (userId: string): Promise<Profile> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

export const updateProfile = async (updates: Partial<Profile>) => {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('user_id', user.id)
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

// ====================
// COMPANIES
// ====================

export const getCompany = async (companyId: string): Promise<Company> => {
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .eq('id', companyId)
    .single();
    
  if (error) throw error;
  return data;
};

export const createCompany = async (companyData: Omit<Company, 'id' | 'owner_id' | 'created_at'>) => {
  const user = await getCurrentUser();
  if (!user) throw new Error('Not authenticated');
  
  const { data, error } = await supabase
    .from('companies')
    .insert([{ ...companyData, owner_id: user.id }])
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

// ====================
// JOBS
// ====================

export const getJob = async (jobId: string): Promise<Job> => {
  const { data, error } = await supabase
    .from('jobs')
    .select('*, companies(*)')
    .eq('id', jobId)
    .single();
    
  if (error) throw error;
  return data;
};

export const getJobs = async (filters: {
  companyId?: string;
  status?: string;
  limit?: number;
  page?: number;
}) => {
  let query = supabase
    .from('jobs')
    .select('*, companies(*)', { count: 'exact' });
    
  if (filters.companyId) {
    query = query.eq('company_id', filters.companyId);
  }
  
  if (filters.status) {
    query = query.eq('status', filters.status);
  }
  
  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  
  const { data, count, error } = await query.range(from, to);
  
  if (error) throw error;
  return { data, count };
};

// ====================
// ACTIVITY LOGGING
// ====================

export const logActivity = async ({
  action,
  entityType,
  entityId,
  metadata = {},
}: {
  action: string;
  entityType: string;
  entityId?: string;
  metadata?: Record<string, any>;
}) => {
  const user = await getCurrentUser();
  
  const { data, error } = await supabase
    .from('activity_logs')
    .insert([{
      user_id: user?.id,
      action,
      entity_type: entityType,
      entity_id: entityId,
      metadata,
    }])
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

// ====================
// TYPE GENERATION UTILITY
// ====================

// This will be used to generate TypeScript types from your database schema
// Run: npx supabase gen types typescript --project-id your-project-ref > src/lib/database.types.ts
