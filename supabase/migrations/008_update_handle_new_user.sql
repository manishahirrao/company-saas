-- Update the handle_new_user function to include all required fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (
    id, 
    email, 
    full_name,
    phone,
    profile_picture_url,
    user_type,
    subscription_tier,
    email_verified,
    verification_status,
    company_name
  )
  VALUES (
    NEW.id, 
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    '',  -- Default empty string for phone
    '',  -- Default empty string for profile_picture_url
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'job_seeker'),
    'free',  -- Default subscription tier
    COALESCE((NEW.raw_user_meta_data->>'email_verified')::boolean, false),
    'pending',  -- Default verification status
    COALESCE(NEW.raw_user_meta_data->>'company_name', '')
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

-- Update the trigger to ensure it's using the updated function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
