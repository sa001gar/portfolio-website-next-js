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

-- Add courses to education if not exists
alter table public.education add column if not exists courses text[];

-- ========================================================
-- SEED / UPDATE WORK EXPERIENCE
-- ========================================================

-- Ensure columns exist on experience table
alter table public.experience add column if not exists order_index integer default 0;
alter table public.experience add column if not exists achievements text[];
alter table public.experience add column if not exists technologies text[];
alter table public.experience add column if not exists location text;

-- Remove existing rows for these two positions to ensure idempotent re-runs
delete from public.experience 
where (title = 'SDE & Tech Lead' and company = 'Clustrix Tech Solutions')
   or (title = 'Security Researcher' and company = 'Freelance');

-- Adjust previous existing experience to have order_index 1
update public.experience 
set order_index = 1 
where company ilike '%Prime Dev%';

-- 1. SDE & Tech Lead at Clustrix Tech Solutions (Aug 2025 - Present)
insert into public.experience (
  title,
  company,
  location,
  start_date,
  end_date,
  current,
  description,
  achievements,
  technologies,
  order_index
) values (
  'SDE & Tech Lead',
  'Clustrix Tech Solutions',
  'Durgapur, West Bengal, India · Hybrid',
  '2025-08-01'::date,
  null,
  true,
  'Leading the architecture and development of scalable web platforms, internal tools, and high-performance infrastructure.',
  array[
    'Built and led multiple production systems across web, backend, and cloud infrastructure, focusing on scalability, security, performance, and maintainability.',
    'Developed reusable platforms and engineering tools that accelerated development and reduced boilerplate across projects.',
    'Designed high-performance systems in Next.js, Go, Rust, Cloudflare, and modern database technologies.',
    'Owned technical decisions across architecture, development, deployment, optimization, and production operations.'
  ],
  array[
    'Web Application Security',
    'Node.js',
    'Next.js',
    'Go',
    'Rust',
    'Cloudflare',
    'TypeScript',
    'PostgreSQL',
    'System Architecture',
    'Cloud Infrastructure',
    'Docker',
    'REST APIs',
    'Microservices',
    'DevOps',
    'Performance Optimization'
  ],
  0
);

-- 2. Security Researcher at Freelance (Apr 2023 - Aug 2024)
insert into public.experience (
  title,
  company,
  location,
  start_date,
  end_date,
  current,
  description,
  achievements,
  technologies,
  order_index
) values (
  'Security Researcher',
  'Freelance',
  'Durgapur, West Bengal, India · Remote',
  '2023-04-01'::date,
  '2024-08-31'::date,
  false,
  'Conducted security testing and responsible vulnerability disclosure across 20+ organizations, including government systems, universities, colleges, and private organizations. Identified and reported security issues, collaborated on remediation, and contributed to improving the security and reliability of web applications.',
  array[
    'Conducted security testing and responsible vulnerability disclosure across 20+ organizations, including government systems, universities, colleges, and private organizations.',
    'Identified and reported critical security vulnerabilities, focusing on Broken Access Control, authentication bypass, and injection flaws.',
    'Collaborated directly with organization security and engineering teams on remediation, patch verification, and application hardening.'
  ],
  array[
    'Web Application Security',
    'Broken Access Control',
    'Vulnerability Assessment',
    'Penetration Testing',
    'OWASP Top 10',
    'Burp Suite',
    'API Security',
    'Responsible Disclosure',
    'Authentication & Authorization',
    'Network Security'
  ],
  2
);
