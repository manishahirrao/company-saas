-- 000_initial_clean_schema.sql
-- Clean, consolidated database schema for the application

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ================================
-- 1. ENUM TYPES
-- ================================
CREATE TYPE user_type_enum AS ENUM (
  'job_seeker', 
  'employer', 
  'hr_agency', 
  'content_creator',
  'admin'
);

CREATE TYPE subscription_tier_enum AS ENUM (
  'free', 
  'basic', 
  'premium', 
  'enterprise'
);

CREATE TYPE verification_status_enum AS ENUM (
  'pending', 
  'verified', 
  'rejected'
);

-- ================================
-- 2. USERS TABLE (linked to auth.users)
-- ================================
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  profile_picture_url text,
  user_type user_type_enum NOT NULL,
  subscription_tier subscription_tier_enum DEFAULT 'free',
  email_verified boolean DEFAULT false,
  verification_status verification_status_enum DEFAULT 'pending',
  company_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ================================
-- 3. USER PROFILES (Extended user information)
-- ================================
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  bio text,
  skills text[],
  experience_years integer,
  education jsonb,
  social_links jsonb,
  resume_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ================================
-- 4. COMPANIES
-- ================================
CREATE TABLE IF NOT EXISTS public.companies (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  industry text,
  size text CHECK (size IN ('1-10', '11-50', '51-200', '201-500', '501-1000', '1000+')),
  website text,
  description text,
  logo_url text,
  location text,
  linkedin_url text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- ================================
-- 5. JOB POSTINGS
-- ================================
CREATE TABLE IF NOT EXISTS public.jobs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  requirements text[],
  job_type text CHECK (job_type IN ('full-time', 'part-time', 'contract', 'internship', 'temporary')),
  experience_level text CHECK (experience_level IN ('entry', 'mid', 'senior', 'executive')),
  salary_range jsonb,
  location text,
  is_remote boolean DEFAULT false,
  status text CHECK (status IN ('draft', 'published', 'closed')) DEFAULT 'draft',
  published_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ================================
-- 6. INDEXES
-- ================================
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_user_type ON public.users(user_type);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_companies_owner_id ON public.companies(owner_id);
CREATE INDEX IF NOT EXISTS idx_jobs_company_id ON public.jobs(company_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON public.jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_location ON public.jobs(location);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON public.jobs(created_at);

-- ================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view their own data" 
  ON public.users FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" 
  ON public.users FOR UPDATE 
  USING (auth.uid() = id);

-- User profiles policies
CREATE POLICY "Users can view their own profile" 
  ON public.user_profiles FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
  ON public.user_profiles FOR ALL 
  USING (auth.uid() = user_id);

-- Companies policies
CREATE POLICY "Companies are viewable by everyone"
  ON public.companies FOR SELECT 
  USING (true);

CREATE POLICY "Users can manage their own companies"
  ON public.companies FOR ALL
  USING (auth.uid() = owner_id);

-- Jobs policies
CREATE POLICY "Jobs are viewable by everyone"
  ON public.jobs FOR SELECT 
  USING (true);

CREATE POLICY "Company owners can manage their jobs"
  ON public.jobs FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.companies 
    WHERE companies.id = jobs.company_id 
    AND companies.owner_id = auth.uid()
  ));

-- ================================
-- 8. TRIGGERS
-- ================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create user profile when a new auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, user_type, created_at, updated_at)
  VALUES (NEW.id, NEW.email, 'job_seeker', now(), now())
  ON CONFLICT (id) DO NOTHING;
  
  INSERT INTO public.user_profiles (user_id, created_at, updated_at)
  VALUES (NEW.id, now(), now())
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new auth users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ================================
-- 9. HELPER FUNCTIONS
-- ================================

-- Check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND user_type = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Get current user ID
CREATE OR REPLACE FUNCTION public.get_user_id()
RETURNS uuid AS $$
  SELECT auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- ================================
-- 10. DROP OLD SCHEMA IF EXISTS
-- ================================
-- This will remove any conflicting tables from previous migrations
DO $$
BEGIN
  -- Drop triggers first to avoid dependency issues
  DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
  
  -- Drop functions
  DROP FUNCTION IF EXISTS public.handle_new_user();
  DROP FUNCTION IF EXISTS public.update_updated_at_column();
  
  -- Drop tables in reverse order of dependencies
  DROP TABLE IF EXISTS public.jobs CASCADE;
  DROP TABLE IF EXISTS public.companies CASCADE;
  DROP TABLE IF EXISTS public.user_profiles CASCADE;
  DROP TABLE IF EXISTS public.users CASCADE;
  
  -- Drop types
  DROP TYPE IF EXISTS user_type_enum CASCADE;
  DROP TYPE IF EXISTS subscription_tier_enum CASCADE;
  DROP TYPE IF EXISTS verification_status_enum CASCADE;
  
  RAISE NOTICE 'Dropped old schema objects';
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Error dropping old schema: %', SQLERRM;
END $$;
