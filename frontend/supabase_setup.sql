-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- Create enum types
create type user_type as enum ('job_seeker', 'employer', 'hr_agency', 'content_creator');
create type subscription_status as enum ('active', 'canceled', 'expired', 'past_due', 'trialing');
create type job_type as enum ('full-time', 'part-time', 'contract', 'remote', 'hybrid');
create type experience_level as enum ('entry', 'mid', 'senior', 'executive');
create type hr_service_category as enum ('recruitment', 'training', 'payroll', 'compliance', 'consulting');
create type content_type as enum ('blog_post', 'article', 'guide', 'news');
create type media_type as enum ('image', 'video', 'audio', 'gif');
create type campaign_status as enum ('draft', 'scheduled', 'active', 'paused', 'completed');

-- Users Table
create table if not exists public.users (
    id uuid primary key default uuid_generate_v4(),
    email text not null unique,
    full_name text,
    company_name text,
    profile_picture text,
    phone text,
    user_type user_type not null,
    subscription_tier text,
    verification_status text default 'pending',
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Companies Table
create table if not exists public.companies (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete cascade,
    company_name text not null,
    industry text,
    company_size text,
    website text,
    description text,
    logo_url text,
    location text,
    linkedin_profile text,
    verification_documents jsonb,
    is_verified boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Job Postings Table
create table if not exists public.job_postings (
    id uuid primary key default uuid_generate_v4(),
    company_id uuid references public.companies(id) on delete cascade,
    title text not null,
    description text,
    requirements jsonb,
    responsibilities jsonb,
    job_type job_type,
    experience_level experience_level,
    salary_range jsonb,
    location text,
    skills_required text[],
    benefits jsonb,
    application_deadline timestamp with time zone,
    status text,
    views_count integer default 0,
    applications_count integer default 0,
    is_featured boolean default false,
    posted_at timestamp with time zone default timezone('utc'::text, now()),
    expires_at timestamp with time zone
);

-- Activity Logs Table (for tracking all user activities)
create table if not exists public.activity_logs (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references auth.users(id) on delete cascade,
    action text not null,
    entity_type text not null,
    entity_id uuid,
    metadata jsonb,
    ip_address text,
    user_agent text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better performance
create index idx_activity_logs_user_id on public.activity_logs(user_id);
create index idx_activity_logs_created_at on public.activity_logs(created_at);
create index idx_job_postings_company_id on public.job_postings(company_id);
create index idx_job_postings_status on public.job_postings(status);

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.companies enable row level security;
alter table public.job_postings enable row level security;
alter table public.activity_logs enable row level security;

-- Create RLS policies
-- Users can see their own data
create policy "Users can view their own profile" 
on public.users for select 
using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update their own profile"
on public.users for update
using (auth.uid() = id);

-- Companies can be viewed by their owners
create policy "Company owners can view their company"
on public.companies for select
using (auth.uid() = user_id);

-- Job postings can be viewed by anyone, but only modified by company owners
create policy "Job postings are viewable by everyone"
on public.job_postings for select
to authenticated, anon
using (true);

create policy "Companies can manage their job postings"
on public.job_postings for all
using (exists (
    select 1 from public.companies 
    where public.companies.id = company_id 
    and public.companies.user_id = auth.uid()
));

-- Activity logs can only be viewed by the user who created them
create policy "Users can view their own activity logs"
on public.activity_logs for select
using (auth.uid() = user_id);

-- Function to update updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language 'plpgsql';

-- Create triggers for updated_at
create trigger update_users_updated_at
before update on public.users
for each row
execute function update_updated_at_column();

-- Function to log activities
create or replace function log_activity()
returns trigger as $$
begin
    insert into public.activity_logs (user_id, action, entity_type, entity_id, metadata)
    values (
        auth.uid(),
        tg_op,
        tg_table_name,
        case when tg_op = 'DELETE' then old.id else new.id end,
        case 
            when tg_op = 'INSERT' then to_jsonb(new)
            when tg_op = 'UPDATE' then jsonb_build_object(
                'old', to_jsonb(old),
                'new', to_jsonb(new)
            )
            when tg_op = 'DELETE' then to_jsonb(old)
        end
    );
    return null;
end;
$$ language plpgsql security definer;

-- Create triggers for activity logging
create trigger log_user_activity
after insert or update or delete on public.users
for each row execute function log_activity();

create trigger log_company_activity
after insert or update or delete on public.companies
for each row execute function log_activity();

create trigger log_job_posting_activity
after insert or update or delete on public.job_postings
for each row execute function log_activity();

-- Set up storage buckets
insert into storage.buckets (id, name, public) values 
    ('job-attachments', 'job-attachments', false),
    ('company-documents', 'company-documents', false),
    ('generated-media', 'generated-media', true),
    ('content-assets', 'content-assets', true),
    ('user-uploads', 'user-uploads', false)
on conflict (id) do nothing;

-- Set up storage policies
create policy "Users can upload their own files"
on storage.objects for insert
with check (bucket_id = 'user-uploads' and auth.uid() = owner);

create policy "Users can view their own files"
on storage.objects for select
using (bucket_id = 'user-uploads' and auth.uid() = owner);

-- Helper function to get user role
create or replace function public.get_user_role()
returns text as $$
begin
    return (select user_type from public.users where id = auth.uid());
exception when others then
    return null;
end;
$$ language plpgsql security definer;

-- Enable realtime for tables
alter publication supabase_realtime add table public.job_postings;
alter publication supabase_realtime add table public.companies;
