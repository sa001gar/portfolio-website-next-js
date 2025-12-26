-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES TABLE (for "About Me" and general info)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  title text,
  bio text,
  avatar_url text,
  email text,
  phone text,
  location text,
  working_hours text,
  available_for_work boolean default true,
  social_links jsonb default '[]'::jsonb, -- Array of {platform, url, icon}
  resume_url text, -- URL to resume file
  updated_at timestamp with time zone,
  
  constraint username_length check (char_length(full_name) >= 3)
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- PROJECTS TABLE
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  description text,
  content text, -- Rich text or markdown
  thumbnail_url text,
  images text[], -- Array of image URLs
  tags text[],
  live_url text,
  github_url text,
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for projects
alter table public.projects enable row level security;

-- Policies for projects
create policy "Projects are viewable by everyone."
  on projects for select
  using ( true );

create policy "Authenticated users can insert projects."
  on projects for insert
  with check ( auth.role() = 'authenticated' );

create policy "Authenticated users can update projects."
  on projects for update
  using ( auth.role() = 'authenticated' );

create policy "Authenticated users can delete projects."
  on projects for delete
  using ( auth.role() = 'authenticated' );

-- BLOG POSTS TABLE
create table public.blogs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text, -- Rich text content
  featured_image_url text,
  author text,
  publish_date timestamp with time zone default timezone('utc'::text, now()),
  read_time text,
  tags text[],
  featured boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for blogs
alter table public.blogs enable row level security;

-- Policies for blogs
create policy "Blogs are viewable by everyone."
  on blogs for select
  using ( true );

create policy "Authenticated users can insert blogs."
  on blogs for insert
  with check ( auth.role() = 'authenticated' );

create policy "Authenticated users can update blogs."
  on blogs for update
  using ( auth.role() = 'authenticated' );

create policy "Authenticated users can delete blogs."
  on blogs for delete
  using ( auth.role() = 'authenticated' );

-- EXPERIENCE TABLE
create table public.experience (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  company text not null,
  location text,
  start_date date,
  end_date date, -- null means "Present"
  current boolean default false,
  description text,
  technologies text[],
  achievements text[],
  order_index integer default 0, -- For sorting
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for experience
alter table public.experience enable row level security;

-- Policies for experience
create policy "Experience is viewable by everyone."
  on experience for select
  using ( true );

create policy "Authenticated users can manage experience."
  on experience for all
  using ( auth.role() = 'authenticated' );

-- EDUCATION TABLE
create table public.education (
  id uuid default uuid_generate_v4() primary key,
  degree text not null,
  institution text not null,
  start_year text,
  end_year text,
  logo_url text,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for education
alter table public.education enable row level security;

-- Policies for education
create policy "Education is viewable by everyone."
  on education for select
  using ( true );

create policy "Authenticated users can manage education."
  on education for all
  using ( auth.role() = 'authenticated' );

-- SKILLS TABLE
create table public.skills (
  id uuid default uuid_generate_v4() primary key,
  category text not null, -- e.g., 'Frontend', 'Backend', 'Design'
  name text not null,
  proficiency integer, -- 0-100
  icon text,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for skills
alter table public.skills enable row level security;

-- Policies for skills
create policy "Skills are viewable by everyone."
  on skills for select
  using ( true );

create policy "Authenticated users can manage skills."
  on skills for all
  using ( auth.role() = 'authenticated' );

-- STORAGE BUCKETS
-- Note: You'll need to create a bucket named 'portfolio-assets' in the Supabase Storage dashboard
-- and set policy to allow public read.

-- Trigger to handle updated_at
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on profiles
  for each row execute procedure handle_updated_at();

create trigger projects_updated_at
  before update on projects
  for each row execute procedure handle_updated_at();

create trigger blogs_updated_at
  before update on blogs
  for each row execute procedure handle_updated_at();
