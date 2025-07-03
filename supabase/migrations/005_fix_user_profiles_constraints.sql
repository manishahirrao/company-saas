-- Update existing NULL values with defaults
UPDATE public.user_profiles 
SET 
    user_type = 'job_seeker',
    subscription_tier = 'free',
    email_verified = false,
    verification_status = 'pending'
WHERE 
    user_type IS NULL OR
    subscription_tier IS NULL OR
    email_verified IS NULL OR
    verification_status IS NULL;

-- Add NOT NULL constraints with defaults
ALTER TABLE public.user_profiles 
    ALTER COLUMN user_type SET NOT NULL,
    ALTER COLUMN user_type SET DEFAULT 'job_seeker',
    ALTER COLUMN subscription_tier SET NOT NULL,
    ALTER COLUMN subscription_tier SET DEFAULT 'free',
    ALTER COLUMN email_verified SET NOT NULL,
    ALTER COLUMN email_verified SET DEFAULT false,
    ALTER COLUMN verification_status SET NOT NULL,
    ALTER COLUMN verification_status SET DEFAULT 'pending';

-- Add CHECK constraints with existence checks
DO $$
BEGIN
    -- Check and add user_type constraint
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'user_profiles_user_type_check' 
        AND table_name = 'user_profiles'
    ) THEN
        ALTER TABLE public.user_profiles 
        ADD CONSTRAINT user_profiles_user_type_check 
        CHECK (user_type IN ('job_seeker','employer','hr_agency','content_creator','admin'));
    END IF;

    -- Check and add subscription_tier constraint
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'user_profiles_subscription_tier_check' 
        AND table_name = 'user_profiles'
    ) THEN
        ALTER TABLE public.user_profiles 
        ADD CONSTRAINT user_profiles_subscription_tier_check 
        CHECK (subscription_tier IN ('free','basic','premium','enterprise'));
    END IF;

    -- Check and add verification_status constraint
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'user_profiles_verification_status_check' 
        AND table_name = 'user_profiles'
    ) THEN
        ALTER TABLE public.user_profiles 
        ADD CONSTRAINT user_profiles_verification_status_check 
        CHECK (verification_status IN ('pending','verified','rejected'));
    END IF;
END $$;

-- Add UNIQUE constraint on email if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'user_profiles_email_key'
    ) THEN
        ALTER TABLE public.user_profiles 
        ADD CONSTRAINT user_profiles_email_key UNIQUE (email);
    END IF;
END $$;
