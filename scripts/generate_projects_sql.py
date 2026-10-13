import json

with open('projects_seed_data.json', 'r', encoding='utf-8') as f:
    projects = json.load(f)

sql_lines = []
sql_lines.append('-- ========================================================')
sql_lines.append('-- SEED PROJECTS DATA FROM LINKEDIN HTML (SAGAR KUNDU)')
sql_lines.append('-- Run this script in the Supabase SQL Editor')
sql_lines.append('-- ========================================================')
sql_lines.append('')
sql_lines.append('-- Ensure contributors column exists on projects')
sql_lines.append("alter table public.projects add column if not exists contributors jsonb default '[]'::jsonb;")
sql_lines.append('alter table public.projects drop column if exists shoutout;')
sql_lines.append('')

for p in projects:
    title = p['title'].replace("'", "''")
    slug = p['slug'].replace("'", "''")
    desc = p['description'].replace("'", "''")
    content = p['content'].replace("'", "''")
    tags_sql = 'array[' + ', '.join([f"'{t}'" for t in p['tags']]) + ']'
    featured = 'true' if p['featured'] else 'false'
    github_url = f"'{p['github_url']}'" if p['github_url'] else 'null'
    live_url = f"'{p['live_url']}'" if p['live_url'] else 'null'
    contribs_json = json.dumps(p['contributors']).replace("'", "''")
    
    sql = f"""insert into public.projects (
  title,
  slug,
  description,
  content,
  tags,
  featured,
  github_url,
  live_url,
  contributors,
  images,
  updated_at
) values (
  '{title}',
  '{slug}',
  '{desc}',
  '{content}',
  {tags_sql},
  {featured},
  {github_url},
  {live_url},
  '{contribs_json}'::jsonb,
  array[]::text[],
  now()
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  content = excluded.content,
  tags = excluded.tags,
  featured = excluded.featured,
  github_url = excluded.github_url,
  live_url = excluded.live_url,
  contributors = excluded.contributors,
  updated_at = now();
"""
    sql_lines.append(sql)

sql_lines.append('-- Verify all projects in database:')
sql_lines.append('select id, title, slug, featured, github_url, live_url from public.projects order by featured desc, title asc;')

with open('seed_projects.sql', 'w', encoding='utf-8') as f:
    f.write('\n'.join(sql_lines))

print('Wrote seed_projects.sql successfully!')
