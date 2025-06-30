-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create ENUM types
CREATE TYPE user_type AS ENUM ('job_seeker', 'employer', 'hr_agency', 'content_creator');
CREATE TYPE subscription_tier AS ENUM ('free', 'basic', 'premium', 'enterprise');
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected');
CREATE TYPE company_size AS ENUM ('startup', 'small', 'medium', 'large', 'enterprise');
CREATE TYPE job_type AS ENUM ('full-time', 'part-time', 'contract', 'remote', 'hybrid');
CREATE TYPE experience_level AS ENUM ('entry', 'mid', 'senior', 'executive');
CREATE TYPE job_status AS ENUM ('draft', 'active', 'paused', 'closed', 'expired');
CREATE TYPE service_category AS ENUM ('recruitment', 'training', 'payroll', 'compliance', 'consulting');
CREATE TYPE pricing_model AS ENUM ('fixed', 'per_hire', 'monthly', 'custom');
CREATE TYPE request_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
CREATE TYPE model_type AS ENUM ('content_generation', 'code_generation', 'analysis', 'custom');
CREATE TYPE fine_tuning_status AS ENUM ('pending', 'training', 'completed', 'failed');
CREATE TYPE content_type AS ENUM ('blog_post', 'article', 'guide', 'news');
CREATE TYPE content_status AS ENUM ('draft', 'scheduled', 'published', 'archived');
CREATE TYPE platform AS ENUM ('instagram', 'facebook', 'youtube', 'linkedin', 'twitter');
CREATE TYPE campaign_type AS ENUM ('organic_content', 'paid_ads', 'mixed');
CREATE TYPE post_content_type AS ENUM ('text', 'image', 'video', 'carousel', 'story');
CREATE TYPE post_status AS ENUM ('draft', 'scheduled', 'posted', 'failed');
CREATE TYPE media_type AS ENUM ('image', 'video', 'audio', 'gif');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'expired', 'past_due', 'trialing');
CREATE TYPE credit_type AS ENUM ('ai_generation', 'content_creation', 'media_generation', 'custom_tools');
CREATE TYPE transaction_type AS ENUM ('purchase', 'usage', 'refund', 'bonus', 'expiration');
CREATE TYPE environment AS ENUM ('development', 'staging', 'production');

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  company_name TEXT,
  profile_picture TEXT,
  phone TEXT,
  user_type user_type NOT NULL,
  subscription_tier subscription_tier DEFAULT 'free',
  verification_status verification_status DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Companies Table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
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
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Job Postings Table
CREATE TABLE job_postings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements JSONB[],
  responsibilities JSONB[],
  job_type job_type NOT NULL,
  experience_level experience_level,
  salary_range JSONB,
  location TEXT,
  skills_required TEXT[],
  benefits JSONB[],
  application_deadline TIMESTAMPTZ,
  status job_status DEFAULT 'draft',
  views_count INTEGER DEFAULT 0,
  applications_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  posted_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- HR Services Table
CREATE TABLE hr_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_name TEXT NOT NULL,
  category service_category NOT NULL,
  description TEXT,
  pricing_model pricing_model NOT NULL,
  base_price DECIMAL(10, 2),
  features JSONB[],
  delivery_time TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- HR Service Requests Table
CREATE TABLE hr_service_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES users(id) ON DELETE CASCADE,
  service_id UUID REFERENCES hr_services(id) ON DELETE SET NULL,
  request_details JSONB,
  budget_range JSONB,
  timeline TEXT,
  status request_status DEFAULT 'pending',
  assigned_agent_id UUID REFERENCES users(id) ON DELETE SET NULL,
  requirements_document TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Custom LLM Configurations Table
CREATE TABLE custom_llm_configurations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  model_name TEXT NOT NULL,
  model_type model_type NOT NULL,
  provider TEXT,
  model_parameters JSONB,
  system_prompt TEXT,
  training_data TEXT,
  fine_tuning_status fine_tuning_status DEFAULT 'pending',
  usage_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SEO Blog Content Table
CREATE TABLE seo_blog_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  meta_description TEXT,
  keywords TEXT[],
  target_audience TEXT,
  content_type content_type DEFAULT 'blog_post',
  seo_score INTEGER,
  readability_score INTEGER,
  word_count INTEGER,
  status content_status DEFAULT 'draft',
  scheduled_for TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  performance_metrics JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AI Operations Tools Table
CREATE TABLE ai_operations_tools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tool_name TEXT NOT NULL,
  tool_category TEXT,
  description TEXT,
  configuration JSONB,
  workflow_steps JSONB[],
  input_schema JSONB,
  output_schema JSONB,
  execution_count INTEGER DEFAULT 0,
  average_execution_time DECIMAL(10, 2),
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- AI Tool Executions Table
CREATE TABLE ai_tool_executions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tool_id UUID REFERENCES ai_operations_tools(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  input_data JSONB,
  output_data JSONB,
  execution_time DECIMAL(10, 2),
  status TEXT CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  error_message TEXT,
  credits_consumed INTEGER,
  executed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Social Media Accounts Table
CREATE TABLE social_media_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  platform platform NOT NULL,
  account_name TEXT NOT NULL,
  account_id TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expires_at TIMESTAMPTZ,
  account_metrics JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  connected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, platform, account_id)
);

-- Content Campaigns Table
CREATE TABLE content_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  campaign_name TEXT NOT NULL,
  campaign_type campaign_type NOT NULL,
  target_platforms platform[],
  content_themes TEXT[],
  posting_schedule JSONB,
  budget DECIMAL(10, 2),
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  status TEXT CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  performance_metrics JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Content Posts Table
CREATE TABLE content_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES content_campaigns(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  platform platform NOT NULL,
  content_type post_content_type NOT NULL,
  title TEXT,
  content_text TEXT,
  media_urls TEXT[],
  hashtags TEXT[],
  mentions TEXT[],
  scheduled_for TIMESTAMPTZ,
  posted_at TIMESTAMPTZ,
  post_id TEXT,
  status post_status DEFAULT 'draft',
  engagement_metrics JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ad Campaigns Table
CREATE TABLE ad_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  platform TEXT CHECK (platform IN ('meta', 'google', 'linkedin', 'youtube')),
  campaign_name TEXT NOT NULL,
  campaign_objective TEXT,
  target_audience JSONB,
  ad_sets JSONB[],
  budget_daily DECIMAL(10, 2),
  budget_total DECIMAL(10, 2),
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  status TEXT CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  performance_metrics JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Generated Media Table
CREATE TABLE generated_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  media_type media_type NOT NULL,
  prompt TEXT,
  style_preferences JSONB,
  dimensions TEXT,
  duration INTEGER,
  generated_url TEXT NOT NULL,
  generation_model TEXT,
  generation_cost DECIMAL(10, 4),
  usage_rights TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Content Templates Table
CREATE TABLE content_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
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
CREATE TABLE form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  form_type TEXT CHECK (form_type IN ('content_automation', 'hr_service', 'custom_tool')),
  form_data JSONB,
  processing_status TEXT CHECK (processing_status IN ('pending', 'processing', 'completed', 'failed')),
  generated_content JSONB,
  error_message TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

-- Subscription Plans Table
CREATE TABLE subscription_plans (
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
  sort_order INTEGER
);

-- Subscriptions Table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES subscription_plans(id) ON DELETE SET NULL,
  status subscription_status NOT NULL,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  canceled_at TIMESTAMPTZ,
  trial_start TIMESTAMPTZ,
  trial_end TIMESTAMPTZ,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, plan_id, status)
);

-- Credits System Table
CREATE TABLE credits_system (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  credit_type credit_type NOT NULL,
  credits_total INTEGER NOT NULL DEFAULT 0,
  credits_used INTEGER NOT NULL DEFAULT 0,
  credits_remaining INTEGER GENERATED ALWAYS AS (credits_total - credits_used) STORED,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, credit_type)
);

-- Credit Transactions Table
CREATE TABLE credit_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  credit_type TEXT NOT NULL,
  amount INTEGER NOT NULL,
  transaction_type transaction_type NOT NULL,
  description TEXT,
  reference_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- API Keys Management Table
CREATE TABLE api_keys_management (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,
  key_name TEXT NOT NULL,
  encrypted_key TEXT NOT NULL,
  environment environment NOT NULL,
  expires_at TIMESTAMPTZ,
  usage_limit INTEGER,
  current_usage INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_used TIMESTAMPTZ,
  UNIQUE(service_name, key_name, environment)
);

-- Activity Logs Table
CREATE TABLE activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  metadata JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_companies_user_id ON companies(user_id);
CREATE INDEX idx_job_postings_company_id ON job_postings(company_id);
CREATE INDEX idx_job_postings_status ON job_postings(status);
CREATE INDEX idx_hr_service_requests_client_id ON hr_service_requests(client_id);
CREATE INDEX idx_hr_service_requests_status ON hr_service_requests(status);
CREATE INDEX idx_social_media_accounts_user_id ON social_media_accounts(user_id);
CREATE INDEX idx_content_campaigns_user_id ON content_campaigns(user_id);
CREATE INDEX idx_content_posts_campaign_id ON content_posts(campaign_id);
CREATE INDEX idx_content_posts_status ON content_posts(status);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_credits_system_user_id ON credits_system(user_id);
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);

-- Create function to update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_postings_updated_at
BEFORE UPDATE ON job_postings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hr_service_requests_updated_at
BEFORE UPDATE ON hr_service_requests
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_custom_llm_configurations_updated_at
BEFORE UPDATE ON custom_llm_configurations
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_seo_blog_content_updated_at
BEFORE UPDATE ON seo_blog_content
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_operations_tools_updated_at
BEFORE UPDATE ON ai_operations_tools
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_media_accounts_updated_at
BEFORE UPDATE ON social_media_accounts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_campaigns_updated_at
BEFORE UPDATE ON content_campaigns
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_posts_updated_at
BEFORE UPDATE ON content_posts
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ad_campaigns_updated_at
BEFORE UPDATE ON ad_campaigns
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_templates_updated_at
BEFORE UPDATE ON content_templates
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON subscriptions
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_credits_system_updated_at
BEFORE UPDATE ON credits_system
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to log activity
CREATE OR REPLACE FUNCTION log_activity(
  p_user_id UUID,
  p_action TEXT,
  p_entity_type TEXT DEFAULT NULL,
  p_entity_id UUID DEFAULT NULL,
  p_metadata JSONB DEFAULT NULL,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
  INSERT INTO activity_logs (
    user_id, 
    action, 
    entity_type, 
    entity_id, 
    metadata, 
    ip_address, 
    user_agent
  ) VALUES (
    p_user_id, 
    p_action, 
    p_entity_type, 
    p_entity_id, 
    p_metadata, 
    p_ip_address, 
    p_user_agent
  );
END;
$$ LANGUAGE plpgsql;
