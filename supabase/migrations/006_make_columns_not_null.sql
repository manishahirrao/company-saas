-- Make columns NOT NULL
ALTER TABLE public.user_profiles 
    ALTER COLUMN user_type SET NOT NULL,
    ALTER COLUMN subscription_tier SET NOT NULL,
    ALTER COLUMN email_verified SET NOT NULL,
    ALTER COLUMN verification_status SET NOT NULL;

-- Make email NOT NULL and add a default empty string for existing NULL values
UPDATE public.user_profiles SET email = '' WHERE email IS NULL;
ALTER TABLE public.user_profiles 
    ALTER COLUMN email SET NOT NULL,
    ALTER COLUMN email SET DEFAULT '';

-- Add a default empty string for full_name
UPDATE public.user_profiles SET full_name = '' WHERE full_name IS NULL;
ALTER TABLE public.user_profiles 
    ALTER COLUMN full_name SET NOT NULL,
    ALTER COLUMN full_name SET DEFAULT '';

-- Add a default empty string for phone
UPDATE public.user_profiles SET phone = '' WHERE phone IS NULL;
ALTER TABLE public.user_profiles 
    ALTER COLUMN phone SET NOT NULL,
    ALTER COLUMN phone SET DEFAULT '';

-- Add a default empty string for profile_picture_url
UPDATE public.user_profiles SET profile_picture_url = '' WHERE profile_picture_url IS NULL;
ALTER TABLE public.user_profiles 
    ALTER COLUMN profile_picture_url SET NOT NULL,
    ALTER COLUMN profile_picture_url SET DEFAULT '';

-- Add a default empty string for company_name
UPDATE public.user_profiles SET company_name = '' WHERE company_name IS NULL;
ALTER TABLE public.user_profiles 
    ALTER COLUMN company_name SET NOT NULL,
    ALTER COLUMN company_name SET DEFAULT '';
