-- ================================
-- 1. ENUM TYPES
-- ================================
CREATE TYPE user_type_enum AS ENUM ('job_seeker', 'employer', 'hr_agency', 'content_creator');
CREATE TYPE subscription_tier_enum AS ENUM ('free', 'basic', 'premium', 'enterprise');
CREATE TYPE verification_status_enum AS ENUM ('pending', 'verified', 'rejected');

-- ================================
-- 2. USERS TABLE (linked to auth.users)
-- ================================
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  profile_picture text,
  user_type user_type_enum NOT NULL,
  subscription_tier subscription_tier_enum DEFAULT 'free',
  email_verified boolean DEFAULT false,
  verification_status verification_status_enum DEFAULT 'pending',
  company_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ================================
-- 3. RLS POLICIES
-- ================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own user row" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own user row" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own user row" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- ================================
-- 4. TRIGGER: AUTO-INSERT INTO users ON SIGNUP
-- ================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, user_type, email_verified, verification_status, created_at, updated_at)
    VALUES (NEW.id, NEW.email, '', 'job_seeker', false, 'pending', now(), now())
    ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ================================
-- 5. TRIGGER: AUTO-UPDATE updated_at
-- ================================
CREATE OR REPLACE FUNCTION public.update_user_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_user_updated_at ON public.users;
CREATE TRIGGER set_user_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_user_updated_at();

-- ================================
-- 6. INDEXES
-- ================================
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- ================================
-- 7. (OPTIONAL) ADMIN POLICY
-- ================================
-- CREATE POLICY "Admin can manage all users" ON public.users FOR ALL USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND user_type = 'admin'));
-- ================================
