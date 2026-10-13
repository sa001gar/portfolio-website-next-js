-- Add new columns to projects
alter table public.projects add column if not exists contributors jsonb default '[]'::jsonb; -- Array of {name, role, url, avatar_url}
alter table public.projects drop column if exists shoutout;

-- Create CERTIFICATIONS table
create table if not exists public.certifications (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  issuer text not null,
  date text, -- Year or full date
  url text, -- Link to certificate
  image_url text,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for certifications
alter table public.certifications enable row level security;

-- Policies for certifications
drop policy if exists "Certifications are viewable by everyone." on public.certifications;
create policy "Certifications are viewable by everyone."
  on public.certifications for select
  using ( true );

drop policy if exists "Authenticated users can manage certifications." on public.certifications;
create policy "Authenticated users can manage certifications."
  on public.certifications for all
  using ( auth.role() = 'authenticated' );

-- Add courses to education if not exists (to match mock data fidelity)
alter table public.education add column if not exists courses text[];
