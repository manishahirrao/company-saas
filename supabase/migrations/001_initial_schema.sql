-- Enable Row Level Security on all tables
ALTER TABLE IF EXISTS public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.jobs ENABLE ROW LEVEL SECURITY;

-- Users table (handled by Supabase Auth)
-- This table is automatically created by Supabase Auth

-- User Profiles
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Companies
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  website_url TEXT,
  owner_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Jobs
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  salary_range TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity Logs
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
-- User Profiles
CREATE POLICY "Users can view their own profile"
  ON public.user_profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Companies
CREATE POLICY "Users can view companies they own"
  ON public.companies
  FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert companies they own"
  ON public.companies
  FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update companies they own"
  ON public.companies
  FOR UPDATE
  USING (auth.uid() = owner_id);

-- Jobs
CREATE POLICY "Users can view jobs from their companies"
  ON public.jobs
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.companies
      WHERE companies.id = jobs.company_id
      AND companies.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert jobs for their companies"
  ON public.jobs
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.companies
      WHERE companies.id = jobs.company_id
      AND companies.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can update jobs from their companies"
  ON public.jobs
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.companies
      WHERE companies.id = jobs.company_id
      AND companies.owner_id = auth.uid()
    )
  );

-- Activity Logs (readable by all, but only insertable by the system)
CREATE POLICY "Users can view activity logs"
  ON public.activity_logs
  FOR SELECT
  USING (true);

CREATE POLICY "System can insert activity logs"
  ON public.activity_logs
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update updated_at
CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_companies_updated_at
BEFORE UPDATE ON public.companies
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
BEFORE UPDATE ON public.jobs
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable the uuid-ossp extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
