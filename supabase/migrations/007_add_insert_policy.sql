-- Add an INSERT policy to allow the trigger to create user profiles
DO $$
BEGIN
    -- Check if the policy already exists
    IF NOT EXISTS (
        SELECT 1 
        FROM pg_policies 
        WHERE tablename = 'user_profiles' 
        AND policyname = 'Allow insert for new users'
    ) THEN
        -- Create the policy
        CREATE POLICY "Allow insert for new users"
        ON public.user_profiles
        FOR INSERT
        WITH CHECK (true);
        
        -- Also ensure the other policies are set up correctly
        IF NOT EXISTS (
            SELECT 1 
            FROM pg_policies 
            WHERE tablename = 'user_profiles' 
            AND policyname = 'Users can view their own profile'
        ) THEN
            CREATE POLICY "Users can view their own profile" 
            ON public.user_profiles 
            FOR SELECT 
            USING (auth.uid() = id);
        END IF;
        
        IF NOT EXISTS (
            SELECT 1 
            FROM pg_policies 
            WHERE tablename = 'user_profiles' 
            AND policyname = 'Users can update their own profile'
        ) THEN
            CREATE POLICY "Users can update their own profile"
            ON public.user_profiles
            FOR UPDATE
            USING (auth.uid() = id);
        END IF;
    END IF;
END $$;

-- Grant necessary permissions
GRANT ALL ON public.user_profiles TO authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated, service_role;
