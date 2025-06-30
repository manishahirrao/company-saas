-- Create or replace the increment_credits function
CREATE OR REPLACE FUNCTION public.increment_credits(
  user_id uuid,
  credit_amount integer
) RETURNS jsonb
LANGUAGE plpgsql
AS $function$
DECLARE
  current_credits integer;
  result jsonb;
BEGIN
  -- Check if user exists in credits_system
  SELECT credits_remaining INTO current_credits
  FROM public.credits_system
  WHERE user_id = increment_credits.user_id;

  IF current_credits IS NULL THEN
    -- User doesn't exist in credits_system, insert new record
    INSERT INTO public.credits_system (user_id, credits_remaining, last_updated)
    VALUES (increment_credits.user_id, GREATEST(0, credit_amount), NOW())
    RETURNING jsonb_build_object(
      'user_id', user_id,
      'previous_credits', 0,
      'new_credits', GREATEST(0, credit_amount),
      'credits_added', GREATEST(0, credit_amount)
    ) INTO result;
  ELSE
    -- User exists, update credits
    UPDATE public.credits_system
    SET 
      credits_remaining = GREATEST(0, credits_remaining + credit_amount),
      last_updated = NOW()
    WHERE user_id = increment_credits.user_id
    RETURNING jsonb_build_object(
      'user_id', user_id,
      'previous_credits', current_credits,
      'new_credits', GREATEST(0, current_credits + credit_amount),
      'credits_added', credit_amount
    ) INTO result;
  END IF;

  RETURN result;
END;
$function$;

-- Create the payments table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.payments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  razorpay_payment_id TEXT UNIQUE,
  razorpay_order_id TEXT,
  razorpay_invoice_id TEXT,
  razorpay_subscription_id TEXT,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'INR',
  status VARCHAR(50) NOT NULL,
  method VARCHAR(50),
  invoice_id TEXT,
  notes JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- Create the hr_service_requests table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.hr_service_requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  payment_id TEXT REFERENCES public.payments(razorpay_payment_id) ON DELETE SET NULL,
  service_type VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  notes TEXT,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users(id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_razorpay_payment_id ON public.payments(razorpay_payment_id);
CREATE INDEX IF NOT EXISTS idx_hr_service_requests_user_id ON public.hr_service_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_hr_service_requests_payment_id ON public.hr_service_requests(payment_id);

-- Create RLS policies for payments table
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payments"
  ON public.payments
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all payments"
  ON public.payments
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin'
  ));

-- Create RLS policies for hr_service_requests table
ALTER TABLE public.hr_service_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own service requests"
  ON public.hr_service_requests
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own service requests"
  ON public.hr_service_requests
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all service requests"
  ON public.hr_service_requests
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid() AND raw_user_meta_data->>'role' = 'admin'
  ));
