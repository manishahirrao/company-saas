import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Helper function to get user session
export const getSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};

// Helper to get current user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Activity logging helper
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
  
  return supabase.from('activity_logs').insert({
    user_id: user?.id,
    action,
    entity_type: entityType,
    entity_id: entityId,
    metadata,
  });
};
