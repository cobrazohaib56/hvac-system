-- Create user_emails table to store names and email addresses
create table if not exists public.user_emails (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security)
alter table public.user_emails enable row level security;

-- Allow public insert (anyone can add their email)
create policy "Allow public insert" on public.user_emails
  for insert
  with check (true);

-- Allow public read (optional - remove if you don't want public reads)
-- create policy "Allow public read" on public.user_emails
--   for select
--   using (true);

-- Create index on email for faster lookups
create index if not exists idx_user_emails_email on public.user_emails(email);
create index if not exists idx_user_emails_created_at on public.user_emails(created_at);
