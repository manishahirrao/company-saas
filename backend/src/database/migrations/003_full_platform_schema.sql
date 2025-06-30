-- ================================
-- 1. USERS TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  full_name text,
  company_name text,
  profile_picture text,
  phone text,
  user_type text CHECK (user_type IN ('job_seeker','employer','hr_agency','content_creator')),
  subscription_tier text CHECK (subscription_tier IN ('free','basic','premium','enterprise')),
  verification_status text CHECK (verification_status IN ('pending','verified','rejected')) DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ================================
-- 2. COMPANIES TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.companies (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  company_name text,
  industry text,
  company_size text CHECK (company_size IN ('startup','small','medium','large','enterprise')),
  website text,
  description text,
  logo_url text,
  location text,
  linkedin_profile text,
  verification_documents jsonb,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- ================================
-- 3. JOB POSTINGS TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.job_postings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE,
  title text,
  description text,
  requirements jsonb,
  responsibilities jsonb,
  job_type text CHECK (job_type IN ('full-time','part-time','contract','remote','hybrid')),
  experience_level text CHECK (experience_level IN ('entry','mid','senior','executive')),
  salary_range jsonb,
  location text,
  skills_required jsonb,
  benefits jsonb,
  application_deadline timestamptz,
  status text CHECK (status IN ('draft','active','paused','closed','expired')) DEFAULT 'draft',
  views_count integer DEFAULT 0,
  applications_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  posted_at timestamptz,
  expires_at timestamptz
);

-- ================================
-- 4. HR SERVICES TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.hr_services (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_name text,
  category text CHECK (category IN ('recruitment','training','payroll','compliance','consulting')),
  description text,
  pricing_model text CHECK (pricing_model IN ('fixed','per_hire','monthly','custom')),
  base_price decimal,
  features jsonb,
  delivery_time text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- ================================
-- 5. HR SERVICE REQUESTS TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.hr_service_requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  service_id uuid REFERENCES public.hr_services(id) ON DELETE CASCADE,
  request_details jsonb,
  budget_range jsonb,
  timeline text,
  status text CHECK (status IN ('pending','in_progress','completed','cancelled')) DEFAULT 'pending',
  assigned_agent_id uuid REFERENCES public.users(id),
  requirements_document text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ================================
-- 6. CUSTOM LLM CONFIGURATIONS TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.custom_llm_configurations (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  model_name text,
  model_type text CHECK (model_type IN ('content_generation','code_generation','analysis','custom')),
  provider text,
  model_parameters jsonb,
  system_prompt text,
  training_data text,
  fine_tuning_status text CHECK (fine_tuning_status IN ('pending','training','completed','failed')) DEFAULT 'pending',
  usage_count integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- ================================
-- 7. SEO BLOG CONTENT TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.seo_blog_content (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  title text,
  content text,
  meta_description text,
  keywords jsonb,
  target_audience text,
  content_type text CHECK (content_type IN ('blog_post','article','guide','news')),
  seo_score integer,
  readability_score integer,
  word_count integer,
  status text CHECK (status IN ('draft','scheduled','published','archived')),
  scheduled_for timestamptz,
  published_at timestamptz,
  performance_metrics jsonb
);

-- ================================
-- 8. AI OPERATIONS TOOLS TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.ai_operations_tools (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  tool_name text,
  tool_category text,
  description text,
  configuration jsonb,
  workflow_steps jsonb,
  input_schema jsonb,
  output_schema jsonb,
  execution_count integer DEFAULT 0,
  average_execution_time decimal,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ================================
-- 9. AI TOOL EXECUTIONS TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.ai_tool_executions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  tool_id uuid REFERENCES public.ai_operations_tools(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  input_data jsonb,
  output_data jsonb,
  execution_time decimal,
  status text CHECK (status IN ('pending','running','completed','failed')),
  error_message text,
  credits_consumed integer,
  executed_at timestamptz
);

-- ================================
-- 10. SOCIAL MEDIA ACCOUNTS TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.social_media_accounts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  platform text CHECK (platform IN ('instagram','facebook','youtube','linkedin','twitter')),
  account_name text,
  account_id text,
  access_token text,
  refresh_token text,
  token_expires_at timestamptz,
  account_metrics jsonb,
  is_active boolean DEFAULT true,
  connected_at timestamptz
);

-- ================================
-- 11. CONTENT CAMPAIGNS TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.content_campaigns (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  campaign_name text,
  campaign_type text CHECK (campaign_type IN ('organic_content','paid_ads','mixed')),
  target_platforms jsonb,
  content_themes jsonb,
  posting_schedule jsonb,
  budget decimal,
  start_date timestamptz,
  end_date timestamptz,
  status text CHECK (status IN ('draft','active','paused','completed')),
  performance_metrics jsonb
);

-- ================================
-- 12. CONTENT POSTS TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.content_posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id uuid REFERENCES public.content_campaigns(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  platform text,
  content_type text CHECK (content_type IN ('text','image','video','carousel','story')),
  title text,
  content_text text,
  media_urls jsonb,
  hashtags jsonb,
  mentions jsonb,
  scheduled_for timestamptz,
  posted_at timestamptz,
  post_id text,
  status text CHECK (status IN ('draft','scheduled','posted','failed')),
  engagement_metrics jsonb
);

-- ================================
-- 13. AD CAMPAIGNS TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.ad_campaigns (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  platform text CHECK (platform IN ('meta','google','linkedin','youtube')),
  campaign_name text,
  campaign_objective text,
  target_audience jsonb,
  ad_sets jsonb,
  budget_daily decimal,
  budget_total decimal,
  start_date timestamptz,
  end_date timestamptz,
  status text CHECK (status IN ('draft','active','paused','completed')),
  performance_metrics jsonb
);

-- ================================
-- 14. GENERATED MEDIA TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.generated_media (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  media_type text CHECK (media_type IN ('image','video','audio','gif')),
  prompt text,
  style_preferences jsonb,
  dimensions text,
  duration integer,
  generated_url text,
  generation_model text,
  generation_cost decimal,
  usage_rights text,
  created_at timestamptz DEFAULT now()
);

-- ================================
-- 15. CONTENT TEMPLATES TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.content_templates (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  template_name text,
  category text,
  platform_specific text,
  template_content text,
  variables jsonb,
  preview_image text,
  usage_count integer DEFAULT 0,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- ================================
-- 16. FORM SUBMISSIONS TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.form_submissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  form_type text CHECK (form_type IN ('content_automation','hr_service','custom_tool')),
  form_data jsonb,
  processing_status text CHECK (processing_status IN ('pending','processing','completed','failed')),
  generated_content jsonb,
  error_message text,
  submitted_at timestamptz,
  processed_at timestamptz
);

-- ================================
-- 17. API KEYS MANAGEMENT TABLE
-- ================================
CREATE TABLE IF NOT EXISTS public.api_keys_management (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_name text,
  key_name text,
  encrypted_key text,
  environment text CHECK (environment IN ('development','staging','production')),
  expires_at timestamptz,
  usage_limit integer,
  current_usage integer,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  last_used timestamptz
);

-- ================================
-- 18. TRIGGERS FOR UPDATED_AT
-- ================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  tbl text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['users','companies','job_postings','hr_service_requests','custom_llm_configurations','ai_operations_tools','content_campaigns','content_posts','ad_campaigns','generated_media','content_templates']
  LOOP
    EXECUTE format('CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();', tbl);
  END LOOP;
END$$;

-- ================================
-- 19. FUNCTION STUBS (BUSINESS LOGIC)
-- ================================
CREATE OR REPLACE FUNCTION process_job_application() RETURNS void AS $$ BEGIN END; $$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION calculate_seo_score() RETURNS void AS $$ BEGIN END; $$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION execute_custom_ai_tool() RETURNS void AS $$ BEGIN END; $$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION schedule_social_media_posts() RETURNS void AS $$ BEGIN END; $$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION generate_ad_copy() RETURNS void AS $$ BEGIN END; $$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION process_media_generation() RETURNS void AS $$ BEGIN END; $$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION track_campaign_performance() RETURNS void AS $$ BEGIN END; $$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION manage_social_tokens() RETURNS void AS $$ BEGIN END; $$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION validate_content_form() RETURNS void AS $$ BEGIN END; $$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION calculate_hr_service_cost() RETURNS void AS $$ BEGIN END; $$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION update_user_credits() RETURNS void AS $$ BEGIN END; $$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION rotate_api_keys() RETURNS void AS $$ BEGIN END; $$ LANGUAGE plpgsql;
CREATE OR REPLACE FUNCTION sync_platform_metrics() RETURNS void AS $$ BEGIN END; $$ LANGUAGE plpgsql;

-- ================================
-- 20. STORAGE BUCKET POLICY EXAMPLES (to run in Supabase SQL editor)
-- ================================
-- Example: Allow users to access only their own files
-- UPDATE storage.objects SET owner = auth.uid() WHERE ...;
-- CREATE POLICY "Users can access their own files" ON storage.objects FOR SELECT USING (bucket_id IN ('job-attachments', 'user-uploads', 'generated-media', 'content-assets', 'template-previews', 'hr-documents', 'backup-exports') AND owner = auth.uid());
-- CREATE POLICY "Admins can access all files" ON storage.objects FOR ALL USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND user_type = 'admin'));
-- CREATE POLICY "Public read for published content" ON storage.objects FOR SELECT USING (bucket_id = 'content-assets' AND metadata->>'is_public' = 'true');
-- ================================
