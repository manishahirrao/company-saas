import { User as SupabaseUser } from '@supabase/supabase-js';

declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      full_name: string;
      user_type: 'job_seeker' | 'employer' | 'hr_agency' | 'content_creator' | 'admin';
    }

    interface Request {
      user?: User;
    }
  }
}
