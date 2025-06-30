-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums
CREATE TYPE user_type AS ENUM ('job_seeker', 'employer', 'hr_agency', 'content_creator', 'admin');
CREATE TYPE subscription_tier AS ENUM ('free', 'basic', 'premium', 'enterprise');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE company_size AS ENUM ('startup', 'small', 'medium', 'large', 'enterprise');
CREATE TYPE job_type AS ENUM ('full-time', 'part-time', 'contract', 'remote', 'hybrid');
CREATE TYPE experience_level AS ENUM ('entry', 'mid', 'senior', 'executive');
CREATE TYPE hr_service_category AS ENUM ('recruitment', 'training', 'payroll', 'compliance', 'consulting');
CREATE TYPE pricing_model AS ENUM ('fixed', 'per_hire', 'monthly', 'custom');
CREATE TYPE request_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
CREATE TYPE model_type AS ENUM ('content_generation', 'code_generation', 'analysis', 'custom');
CREATE TYPE content_type AS ENUM ('blog_post', 'article', 'guide', 'news');
CREATE TYPE content_status AS ENUM ('draft', 'scheduled', 'published', 'archived');
CREATE TYPE platform_type AS ENUM ('instagram', 'facebook', 'youtube', 'linkedin', 'twitter');
CREATE TYPE campaign_type AS ENUM ('organic_content', 'paid_ads', 'mixed');
CREATE TYPE post_content_type AS ENUM ('text', 'image', 'video', 'carousel', 'story');
CREATE TYPE post_status AS ENUM ('draft', 'scheduled', 'posted', 'failed');
CREATE TYPE media_type AS ENUM ('image', 'video', 'audio', 'gif');
CREATE TYPE form_type AS ENUM ('content_automation', 'hr_service', 'custom_tool');
CREATE TYPE processing_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'expired', 'past_due', 'trialing');
CREATE TYPE credit_type AS ENUM ('ai_generation', 'content_creation', 'media_generation', 'custom_tools');
CREATE TYPE transaction_type AS ENUM ('purchase', 'usage', 'refund', 'bonus', 'expiration');
CREATE TYPE environment_type AS ENUM ('development', 'staging', 'production');

-- Users Table
ALTER TABLE IF EXISTS public.users
ADD COLUMN IF NOT EXISTS company_name TEXT,
ADD COLUMN IF NOT EXISTS profile_picture TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS user_type user_type NOT NULL DEFAULT 'job_seeker',
ADD COLUMN IF NOT EXISTS subscription_tier subscription_tier NOT NULL DEFAULT 'free',
ADD COLUMN IF NOT EXISTS verification_status verification_status NOT NULL DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- Companies Table
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    company_name TEXT NOT NULL,
    industry TEXT,
    company_size company_size,
    website TEXT,
    description TEXT,
    logo_url TEXT,
    location TEXT,
    linkedin_profile TEXT,
    verification_documents JSONB,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Job Postings Table
CREATE TABLE IF NOT EXISTS public.job_postings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements JSONB[],
    responsibilities JSONB[],
    job_type job_type NOT NULL,
    experience_level experience_level NOT NULL,
    salary_range JSONB,
    location TEXT,
    skills_required JSONB[],
    benefits JSONB[],
    application_deadline TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'draft',
    views_count INTEGER DEFAULT 0,
    applications_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    posted_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- HR Services Table
CREATE TABLE IF NOT EXISTS public.hr_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_name TEXT NOT NULL,
    category hr_service_category NOT NULL,
    description TEXT,
    pricing_model pricing_model NOT NULL,
    base_price DECIMAL(10, 2),
    features JSONB[],
    delivery_time TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- HR Service Requests Table
CREATE TABLE IF NOT EXISTS public.hr_service_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    service_id UUID REFERENCES public.hr_services(id) ON DELETE SET NULL,
    request_details JSONB,
    budget_range JSONB,
    timeline TEXT,
    status request_status NOT NULL DEFAULT 'pending',
    assigned_agent_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    requirements_document TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Custom LLM Configurations Table
CREATE TABLE IF NOT EXISTS public.llm_configurations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    model_name TEXT NOT NULL,
    model_type model_type NOT NULL,
    provider TEXT,
    model_parameters JSONB,
    system_prompt TEXT,
    training_data TEXT,
    fine_tuning_status TEXT DEFAULT 'pending',
    usage_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SEO Blog Content Table
CREATE TABLE IF NOT EXISTS public.seo_blog_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT,
    meta_description TEXT,
    keywords JSONB[],
    target_audience TEXT,
    content_type content_type NOT NULL,
    seo_score INTEGER,
    readability_score INTEGER,
    word_count INTEGER,
    status content_status NOT NULL DEFAULT 'draft',
    scheduled_for TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    performance_metrics JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AI Operations Tools Table
CREATE TABLE IF NOT EXISTS public.ai_tools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    tool_name TEXT NOT NULL,
    tool_category TEXT,
    description TEXT,
    configuration JSONB,
    workflow_steps JSONB[],
    input_schema JSONB,
    output_schema JSONB,
    execution_count INTEGER DEFAULT 0,
    average_execution_time DECIMAL(10, 4),
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AI Tool Executions Table
CREATE TABLE IF NOT EXISTS public.ai_tool_executions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tool_id UUID REFERENCES public.ai_tools(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    input_data JSONB,
    output_data JSONB,
    execution_time DECIMAL(10, 4),
    status TEXT NOT NULL DEFAULT 'pending',
    error_message TEXT,
    credits_consumed INTEGER,
    executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Social Media Accounts Table
CREATE TABLE IF NOT EXISTS public.social_media_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    platform platform_type NOT NULL,
    account_name TEXT NOT NULL,
    account_id TEXT,
    access_token TEXT,
    refresh_token TEXT,
    token_expires_at TIMESTAMPTZ,
    account_metrics JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    connected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Content Campaigns Table
CREATE TABLE IF NOT EXISTS public.content_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    campaign_name TEXT NOT NULL,
    campaign_type campaign_type NOT NULL,
    target_platforms JSONB[],
    content_themes JSONB[],
    posting_schedule JSONB,
    budget DECIMAL(10, 2),
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'draft',
    performance_metrics JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Content Posts Table
CREATE TABLE IF NOT EXISTS public.content_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES public.content_campaigns(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    platform platform_type NOT NULL,
    content_type post_content_type NOT NULL,
    title TEXT,
    content_text TEXT,
    media_urls JSONB[],
    hashtags JSONB[],
    mentions JSONB[],
    scheduled_for TIMESTAMPTZ,
    posted_at TIMESTAMPTZ,
    post_id TEXT,
    status post_status NOT NULL DEFAULT 'draft',
    engagement_metrics JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ad Campaigns Table
CREATE TABLE IF NOT EXISTS public.ad_campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    platform TEXT NOT NULL,
    campaign_name TEXT NOT NULL,
    campaign_objective TEXT,
    target_audience JSONB,
    ad_sets JSONB[],
    budget_daily DECIMAL(10, 2),
    budget_total DECIMAL(10, 2),
    start_date TIMESTAMPTZ,
    end_date TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'draft',
    performance_metrics JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Generated Media Table
CREATE TABLE IF NOT EXISTS public.generated_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    media_type media_type NOT NULL,
    prompt TEXT,
    style_preferences JSONB,
    dimensions TEXT,
    duration INTEGER,
    generated_url TEXT,
    generation_model TEXT,
    generation_cost DECIMAL(10, 4),
    usage_rights TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Content Templates Table
CREATE TABLE IF NOT EXISTS public.content_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    template_name TEXT NOT NULL,
    category TEXT,
    platform_specific TEXT,
    template_content TEXT,
    variables JSONB[],
    preview_image TEXT,
    usage_count INTEGER DEFAULT 0,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Form Submissions Table
CREATE TABLE IF NOT EXISTS public.form_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    form_type form_type NOT NULL,
    form_data JSONB,
    processing_status processing_status NOT NULL DEFAULT 'pending',
    generated_content JSONB,
    error_message TEXT,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    processed_at TIMESTAMPTZ
);

-- Subscription Plans Table
CREATE TABLE IF NOT EXISTS public.subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price_monthly DECIMAL(10, 2),
    price_yearly DECIMAL(10, 2),
    features JSONB[],
    limits JSONB,
    stripe_price_id_monthly TEXT,
    stripe_price_id_yearly TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Subscriptions Table
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES public.subscription_plans(id) ON DELETE SET NULL,
    status subscription_status NOT NULL,
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    canceled_at TIMESTAMPTZ,
    trial_start TIMESTAMPTZ,
    trial_end TIMESTAMPTZ,
    stripe_subscription_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Credits System Table
CREATE TABLE IF NOT EXISTS public.user_credits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    credit_type credit_type NOT NULL,
    credits_total INTEGER NOT NULL DEFAULT 0,
    credits_used INTEGER NOT NULL DEFAULT 0,
    credits_remaining INTEGER NOT NULL DEFAULT 0,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, credit_type)
);

-- Credit Transactions Table
CREATE TABLE IF NOT EXISTS public.credit_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    credit_type TEXT NOT NULL,
    amount INTEGER NOT NULL,
    transaction_type transaction_type NOT NULL,
    description TEXT,
    reference_id UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- API Keys Management Table
CREATE TABLE IF NOT EXISTS public.api_keys (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    service_name TEXT NOT NULL,
    key_name TEXT NOT NULL,
    encrypted_key TEXT NOT NULL,
    environment environment_type NOT NULL,
    expires_at TIMESTAMPTZ,
    usage_limit INTEGER,
    current_usage INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_used TIMESTAMPTZ
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_job_postings_company_id ON public.job_postings(company_id);
CREATE INDEX IF NOT EXISTS idx_job_postings_status ON public.job_postings(status);
CREATE INDEX IF NOT EXISTS idx_hr_service_requests_client_id ON public.hr_service_requests(client_id);
CREATE INDEX IF NOT EXISTS idx_hr_service_requests_status ON public.hr_service_requests(status);
CREATE INDEX IF NOT EXISTS idx_llm_configurations_user_id ON public.llm_configurations(user_id);
CREATE INDEX IF NOT EXISTS idx_seo_blog_content_user_id ON public.seo_blog_content(user_id);
CREATE INDEX IF NOT EXISTS idx_seo_blog_content_status ON public.seo_blog_content(status);
CREATE INDEX IF NOT EXISTS idx_ai_tools_user_id ON public.ai_tools(user_id);
CREATE INDEX IF NOT EXISTS idx_social_media_accounts_user_id ON public.social_media_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_content_campaigns_user_id ON public.content_campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_content_posts_campaign_id ON public.content_posts(campaign_id);
CREATE INDEX IF NOT EXISTS idx_content_posts_status ON public.content_posts(status);
CREATE INDEX IF NOT EXISTS idx_ad_campaigns_user_id ON public.ad_campaigns(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_media_user_id ON public.generated_media(user_id);
CREATE INDEX IF NOT EXISTS idx_content_templates_user_id ON public.content_templates(user_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_user_id ON public.form_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_user_credits_user_id ON public.user_credits(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_transactions_user_id ON public.credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON public.api_keys(user_id);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to all tables with updated_at
DO $$
DECLARE
    t record;
BEGIN
    FOR t IN 
        SELECT table_name 
        FROM information_schema.columns 
        WHERE column_name = 'updated_at' 
        AND table_schema = 'public'
        AND table_name != 'users' -- Skip users table as it's already handled
    LOOP
        EXECUTE format('CREATE TRIGGER update_%s_updated_at
                      BEFORE UPDATE ON %I
                      FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()',
                      t.table_name, t.table_name);
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Function to update credits remaining
CREATE OR REPLACE FUNCTION update_credits_remaining()
RETURNS TRIGGER AS $$
BEGIN
    NEW.credits_remaining = NEW.credits_total - NEW.credits_used;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_credits_remaining
BEFORE INSERT OR UPDATE ON public.user_credits
FOR EACH ROW EXECUTE FUNCTION update_credits_remaining();

-- Function to log credit transactions
CREATE OR REPLACE FUNCTION log_credit_transaction()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        IF OLD.credits_used != NEW.credits_used THEN
            INSERT INTO public.credit_transactions (
                user_id, 
                credit_type, 
                amount, 
                transaction_type,
                description,
                reference_id
            ) VALUES (
                NEW.user_id,
                NEW.credit_type,
                NEW.credits_used - OLD.credits_used,
                'usage',
                'Credit usage',
                gen_random_uuid()
            );
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER log_credit_usage
AFTER UPDATE ON public.user_credits
FOR EACH ROW EXECUTE FUNCTION log_credit_transaction();

-- Function to rotate API keys
CREATE OR REPLACE FUNCTION rotate_api_keys()
RETURNS void AS $$
BEGIN
    UPDATE public.api_keys
    SET is_active = FALSE
    WHERE expires_at < NOW()
    AND is_active = TRUE;
END;
$$ LANGUAGE plpgsql;

-- Schedule API key rotation (runs daily)
-- Note: This requires pg_cron extension to be installed
-- CREATE EXTENSION IF NOT EXISTS pg_cron;
-- SELECT cron.schedule('0 0 * * *', 'SELECT rotate_api_keys()');

-- Function to update job posting status based on dates
CREATE OR REPLACE FUNCTION update_job_posting_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.expires_at < NOW() THEN
        NEW.status := 'expired';
    ELSIF NEW.posted_at IS NOT NULL AND NEW.posted_at <= NOW() THEN
        NEW.status := 'active';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_job_posting_status
BEFORE INSERT OR UPDATE ON public.job_postings
FOR EACH ROW EXECUTE FUNCTION update_job_posting_status();

-- Function to update content post status based on schedule
CREATE OR REPLACE FUNCTION update_content_post_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.posted_at IS NOT NULL AND NEW.posted_at <= NOW() THEN
        NEW.status := 'posted';
    ELSIF NEW.scheduled_for IS NOT NULL AND NEW.scheduled_for <= NOW() THEN
        NEW.status := 'scheduled';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_content_post_status
BEFORE INSERT OR UPDATE ON public.content_posts
FOR EACH ROW EXECUTE FUNCTION update_content_post_status();

-- Function to update campaign status based on dates
CREATE OR REPLACE FUNCTION update_campaign_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.end_date < NOW() THEN
        NEW.status := 'completed';
    ELSIF NEW.start_date <= NOW() AND (NEW.end_date IS NULL OR NEW.end_date >= NOW()) THEN
        NEW.status := 'active';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_campaign_status
BEFORE INSERT OR UPDATE ON public.content_campaigns
FOR EACH ROW EXECUTE FUNCTION update_campaign_status();

CREATE TRIGGER check_ad_campaign_status
BEFORE INSERT OR UPDATE ON public.ad_campaigns
FOR EACH ROW EXECUTE FUNCTION update_campaign_status();

-- Function to update subscription status based on dates
CREATE OR REPLACE FUNCTION update_subscription_status()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.canceled_at IS NOT NULL AND NEW.cancel_at_period_end = TRUE THEN
        NEW.status := 'canceled';
    ELSIF NEW.current_period_end < NOW() THEN
        NEW.status := 'expired';
    ELSIF NEW.trial_end < NOW() AND NEW.status = 'trialing' THEN
        NEW.status := 'active';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_subscription_status
BEFORE INSERT OR UPDATE ON public.subscriptions
FOR EACH ROW EXECUTE FUNCTION update_subscription_status();

-- Function to generate API key
CREATE OR REPLACE FUNCTION generate_api_key()
RETURNS TEXT AS $$
DECLARE
    key TEXT;
BEGIN
    key := encode(gen_random_bytes(32), 'base64');
    RETURN translate(key, E'/+=', 'abc');
END;
$$ LANGUAGE plpgsql;

-- Function to encrypt API key
CREATE OR REPLACE FUNCTION encrypt_api_key(key TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN encode(hmac(key, current_setting('app.settings.encryption_key'), 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Function to create a new API key
CREATE OR REPLACE FUNCTION create_api_key(
    p_user_id UUID,
    p_service_name TEXT,
    p_key_name TEXT,
    p_environment environment_type,
    p_expires_at TIMESTAMPTZ DEFAULT NULL,
    p_usage_limit INTEGER DEFAULT NULL
)
RETURNS TEXT AS $$
DECLARE
    v_api_key TEXT;
    v_encrypted_key TEXT;
BEGIN
    -- Generate a new API key
    v_api_key := generate_api_key();
    
    -- Encrypt the API key
    v_encrypted_key := encrypt_api_key(v_api_key);
    
    -- Store the encrypted key in the database
    INSERT INTO public.api_keys (
        user_id,
        service_name,
        key_name,
        encrypted_key,
        environment,
        expires_at,
        usage_limit
    ) VALUES (
        p_user_id,
        p_service_name,
        p_key_name,
        v_encrypted_key,
        p_environment,
        p_expires_at,
        p_usage_limit
    );
    
    -- Return the plaintext API key (only time it's available)
    RETURN v_api_key;
END;
$$ LANGUAGE plpgsql;

-- Function to validate API key
CREATE OR REPLACE FUNCTION validate_api_key(
    p_api_key TEXT,
    p_service_name TEXT
)
RETURNS TABLE (
    is_valid BOOLEAN,
    user_id UUID,
    key_id UUID
) AS $$
DECLARE
    v_encrypted_key TEXT;
    v_key_record RECORD;
BEGIN
    -- Encrypt the provided API key
    v_encrypted_key := encrypt_api_key(p_api_key);
    
    -- Try to find a matching API key
    SELECT id, user_id, current_usage, usage_limit, is_active, expires_at
    INTO v_key_record
    FROM public.api_keys
    WHERE encrypted_key = v_encrypted_key
    AND service_name = p_service_name
    AND is_active = TRUE
    AND (expires_at IS NULL OR expires_at > NOW())
    AND (usage_limit IS NULL OR current_usage < usage_limit);
    
    -- If no matching key found
    IF v_key_record.id IS NULL THEN
        RETURN QUERY SELECT FALSE, NULL::UUID, NULL::UUID;
        RETURN;
    END IF;
    
    -- Update usage count
    UPDATE public.api_keys
    SET 
        current_usage = current_usage + 1,
        last_used = NOW()
    WHERE id = v_key_record.id;
    
    -- Return success with user ID and key ID
    RETURN QUERY SELECT TRUE, v_key_record.user_id, v_key_record.id;
END;
$$ LANGUAGE plpgsql;
