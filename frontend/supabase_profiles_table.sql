-- Run this SQL in your Supabase SQL editor to create the required 'profiles' table and columns

create table if not exists profiles (
  user_id uuid primary key references auth.users(id),
  email text unique,
  full_name text,
  account_type text,
  email_confirmed boolean default false
);

-- Add any additional columns your app needs below
-- alter table profiles add column linkedin_url text;
-- alter table profiles add column location text;
-- alter table profiles add column industry text;
-- alter table profiles add column headline text;
-- alter table profiles add column profile_picture text;
