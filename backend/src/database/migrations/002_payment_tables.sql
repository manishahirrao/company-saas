-- Create subscription_plans table
CREATE TABLE IF NOT EXISTS public.subscription_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price_monthly INTEGER NOT NULL,
  price_annual INTEGER NOT NULL,
  credits_included INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  features JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL REFERENCES subscription_plans(id) ON DELETE CASCADE,
  razorpay_subscription_id TEXT UNIQUE,
  status TEXT NOT NULL,
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT false,
  canceled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_user_plan UNIQUE(user_id, plan_id)
);

-- Create credit_transactions table
CREATE TABLE IF NOT EXISTS public.credit_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL,
  reference_id TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create credits_system table
CREATE TABLE IF NOT EXISTS public.credits_system (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  credits_remaining INTEGER NOT NULL DEFAULT 0,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON public.credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);

-- Function to update user credits
CREATE OR REPLACE FUNCTION public.update_user_credits(
  user_id UUID,
  credits_to_add INTEGER,
  transaction_type TEXT,
  reference_id TEXT
) 
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_credits INTEGER;
  new_credits INTEGER;
  transaction_description TEXT;
  result JSONB;
BEGIN
  -- Start transaction
  BEGIN
    -- Get current credits or initialize if not exists
    INSERT INTO public.credits_system (user_id, credits_remaining, last_updated)
    VALUES (user_id, 0, NOW())
    ON CONFLICT (user_id) DO UPDATE
    SET credits_remaining = credits_system.credits_remaining
    RETURNING credits_remaining INTO current_credits;
    
    -- Calculate new credits
    new_credits := current_credits + credits_to_add;
    
    -- Prevent negative credits
    IF new_credits < 0 THEN
      RAISE EXCEPTION 'Insufficient credits';
    END IF;
    
    -- Update user's credits
    UPDATE public.credits_system
    SET 
      credits_remaining = new_credits,
      last_updated = NOW()
    WHERE user_id = user_id;
    
    -- Determine transaction description
    CASE transaction_type
      WHEN 'subscription_created' THEN
        transaction_description := 'Credits added from subscription';
      WHEN 'subscription_activated' THEN
        transaction_description := 'Credits added from subscription activation';
      WHEN 'credit_purchase' THEN
        transaction_description := 'Credits purchased';
      WHEN 'hr_service_used' THEN
        transaction_description := 'Credits used for HR service';
      ELSE
        transaction_description := 'Credits updated';
    END CASE;
    
    -- Record the transaction
    INSERT INTO public.credit_transactions (
      user_id,
      amount,
      type,
      reference_id,
      description
    ) VALUES (
      user_id,
      credits_to_add,
      transaction_type,
      reference_id,
      transaction_description
    );
    
    -- Return success response
    result := jsonb_build_object(
      'success', true,
      'user_id', user_id,
      'previous_credits', current_credits,
      'credits_added', credits_to_add,
      'new_balance', new_credits,
      'transaction_type', transaction_type,
      'reference_id', reference_id
    );
    
    RETURN result;
    
  EXCEPTION WHEN OTHERS THEN
    -- Log error
    RAISE NOTICE 'Error in update_user_credits: %', SQLERRM;
    
    -- Return error response
    result := jsonb_build_object(
      'success', false,
      'error', SQLERRM,
      'user_id', user_id,
      'credits_to_add', credits_to_add
    );
    
    RETURN result;
  END;
END;
$$;

-- Create RLS policies for security
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credits_system ENABLE ROW LEVEL SECURITY;

-- RLS policies for subscription_plans
CREATE POLICY "Enable read access for all users" 
ON public.subscription_plans
FOR SELECT
TO authenticated, anon
USING (is_active = true);

-- RLS policies for subscriptions
CREATE POLICY "Users can view their own subscriptions"
ON public.subscriptions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own subscriptions"
ON public.subscriptions
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- RLS policies for credit_transactions
CREATE POLICY "Users can view their own transactions"
ON public.credit_transactions
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- RLS policies for credits_system
CREATE POLICY "Users can view their own credits"
ON public.credits_system
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Insert default subscription plans if they don't exist
INSERT INTO public.subscription_plans (
  id, name, description, price_monthly, price_annual, credits_included, is_active, features
) VALUES 
  ('free', 'Free', 'Basic plan with limited features', 0, 0, 10, true, '{"features": ["Basic features", "10 credits"]}'),
  ('basic', 'Basic', 'Perfect for individuals', 999, 9999, 100, true, '{"features": ["100 credits/month", "Basic support"]}'),
  ('premium', 'Premium', 'For power users and small teams', 2499, 24999, 300, true, '{"features": ["300 credits/month", "Priority support", "Advanced features"]}'),
  ('enterprise', 'Enterprise', 'For large organizations', 4999, 49999, 1000, true, '{"features": ["1000+ credits/month", "24/7 support", "Dedicated account manager", "Custom integrations"]}')
ON CONFLICT (id) DO NOTHING;
