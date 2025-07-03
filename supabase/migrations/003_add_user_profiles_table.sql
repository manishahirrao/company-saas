-- ================================
-- USER PROFILES TABLE
-- ================================
-- Drop the trigger first if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop the function if it exists
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create the user_profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4() REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  profile_picture_url text,
  user_type text CHECK (user_type IN ('job_seeker','employer','hr_agency','content_creator','admin')),
  subscription_tier text CHECK (subscription_tier IN ('free','basic','premium','enterprise')) DEFAULT 'free',
  email_verified boolean DEFAULT false,
  verification_status text CHECK (verification_status IN ('pending','verified','rejected')) DEFAULT 'pending',
  company_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS if not already enabled
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;

-- Create policies
CREATE POLICY "Users can view their own profile" 
ON public.user_profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.user_profiles
FOR UPDATE
USING (auth.uid() = id);

-- Create a trigger to automatically create a user profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (
    id, 
    email, 
    full_name, 
    user_type,
    email_verified
  )
  VALUES (
    NEW.id, 
    NEW.email, 
    NEW.raw_user_meta_data->>'full_name',
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'job_seeker'),
    NEW.email_confirmed_at IS NOT NULL
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, user_profiles.full_name),
    user_type = COALESCE(EXCLUDED.user_type, user_profiles.user_type),
    email_verified = EXCLUDED.email_verified,
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
