-- Add missing columns to user_profiles table
ALTER TABLE public.user_profiles
ADD COLUMN IF NOT EXISTS email text UNIQUE,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS profile_picture_url text,
ADD COLUMN IF NOT EXISTS user_type text CHECK (user_type IN ('job_seeker','employer','hr_agency','content_creator','admin')) DEFAULT 'job_seeker',
ADD COLUMN IF NOT EXISTS subscription_tier text CHECK (subscription_tier IN ('free','basic','premium','enterprise')) DEFAULT 'free',
ADD COLUMN IF NOT EXISTS email_verified boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS verification_status text CHECK (verification_status IN ('pending','verified','rejected')) DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS company_name text;

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);

-- Add foreign key constraint to auth.users
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'user_profiles_id_fkey'
    ) THEN
        ALTER TABLE public.user_profiles
        ADD CONSTRAINT user_profiles_id_fkey 
        FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Enable RLS if not already enabled
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own profile' AND tablename = 'user_profiles') THEN
        DROP POLICY "Users can view their own profile" ON public.user_profiles;
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update their own profile' AND tablename = 'user_profiles') THEN
        DROP POLICY "Users can update their own profile" ON public.user_profiles;
    END IF;
END $$;

-- Create policies
CREATE POLICY "Users can view their own profile" 
ON public.user_profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.user_profiles
FOR UPDATE
USING (auth.uid() = id);

-- Create or replace the trigger function
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
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'job_seeker'),
    COALESCE((NEW.raw_user_meta_data->>'email_verified')::boolean, false)
  )
  ON CONFLICT (id) 
  DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, user_profiles.full_name),
    user_type = COALESCE(EXCLUDED.user_type, user_profiles.user_type),
    email_verified = COALESCE(EXCLUDED.email_verified, user_profiles.email_verified),
    updated_at = now();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_trigger 
        WHERE tgname = 'on_auth_user_created'
    ) THEN
        CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
    END IF;
END $$;
