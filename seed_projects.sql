-- ========================================================
-- SEED PROJECTS DATA FROM LINKEDIN HTML (SAGAR KUNDU)
-- Run this script in the Supabase SQL Editor
-- ========================================================

-- Ensure contributors column exists on projects
alter table public.projects add column if not exists contributors jsonb default '[]'::jsonb;
alter table public.projects drop column if exists shoutout;

insert into public.projects (
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
  'DocOS - AI-assisted Document Workspace',
  'docos-ai-assisted-document-workspace',
  'Developed an AI-assisted document workspace that organizes documents into independently editable sections, with generation, validation, revision history, and export workflows.',
  'An AI-assisted document workspace that organizes documents into independently editable sections, with automated generation, validation, revision history, and export workflows.

### Key Highlights
- **Hierarchical Document Model**: Designed a structured model supporting section-level editing, granular regeneration, and hierarchical tree navigation.
- **Specialized AI Workflows**: Integrated specialized multi-stage AI workflows for planning, writing, refining, validating, and reviewing documents.
- **Version History & Diffs**: Implemented section-level version history with real-time change comparison and instant rollback/restoration.
- **Modern Full-Stack Stack**: Combined a high-performance React/TypeScript frontend with a FastAPI backend and relational PostgreSQL database.
- **Flexible Inference Engine**: Added support for both hosted and local Gemma-compatible inference providers alongside multi-format document export workflows.',
  array['AI', 'FastAPI', 'React', 'TypeScript', 'Document Processing', 'PostgreSQL', 'LLM'],
  true,
  'https://github.com/sa001gar/document-os',
  null,
  '[{"name": "Shreya Ray", "role": "Contributor"}, {"name": "Biswajit", "role": "Contributor"}, {"name": "Soumitra Konar", "role": "Contributor"}]'::jsonb,
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

insert into public.projects (
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
  'GopherQueue - Durable Job Queue in Go',
  'gopherqueue-durable-job-queue-in-go',
  'Built an open-source, persistent background job engine in Go, designed to make asynchronous task processing reliable without requiring an external message broker.',
  'A local-first, enterprise-grade background job engine written in Go. Built for reliability and performance with BoltDB-backed persistence, zero external runtime dependencies, and native SDKs.

### Key Highlights
- **Durable Storage Engine**: Implemented durable embedded job storage using BoltDB to preserve queued tasks across process restarts and server crashes without needing Redis or RabbitMQ.
- **Scheduling & Retries**: Designed priority-based scheduling, exponential retries with configurable backoff, and end-to-end task lifecycle state management.
- **Resilient Execution**: Added task dependencies, idempotency keys, deduplication windows, and dead-letter queues (DLQ) for mission-critical jobs.
- **Production Observability**: Built-in Prometheus metrics exporter, structured JSON logging, and live health check probes.
- **Multi-Language Client SDKs**: Developed native Python and TypeScript client libraries alongside a lightweight CLI and HTTP management API.',
  array['Go', 'Job Queues', 'BoltDB', 'Distributed Systems', 'TypeScript', 'Python', 'Open Source'],
  true,
  'https://github.com/sa001gar/gopherqueue',
  null,
  '[]'::jsonb,
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

insert into public.projects (
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
  'Kookie - Encrypted Developer Secrets Manager',
  'kookie-encrypted-developer-secrets-manager',
  'Developed a local-first command-line secrets manager in Rust that helps developers securely manage credentials without depending on a cloud vault.',
  'A secure, local-first, encrypted secret manager for developers built in Rust to protect passwords, keys, and tokens offline without third-party cloud trust.

### Key Highlights
- **Zero-Knowledge Encryption**: Built on AES-256-GCM authenticated encryption paired with Argon2id memory-hard key derivation to prevent brute-force attacks.
- **Versatile Secret Store**: Seamlessly stores and organizes API keys, database connection strings, JWT signing keys, passwords, and private development notes.
- **Security-First UX**: Implemented automatic vault locking, customizable session idle timeouts, and clipboard auto-clearing.
- **Built-in Developer Utilities**: Instant generation of cryptographically secure random passwords, hex keys, and high-entropy JWT secrets.
- **Cross-Platform Compatibility**: Ships as a single self-contained binary across Linux, macOS, Windows, and Termux environments.',
  array['Rust', 'Cryptography', 'CLI', 'Security', 'Argon2', 'AES-256', 'Open Source'],
  true,
  'https://github.com/sa001gar/kookie-cli',
  null,
  '[]'::jsonb,
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

insert into public.projects (
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
  'Medical Prescription OCR',
  'medical-prescription-ocr',
  'Built an ML-powered prescription digitization pipeline that extracts medicine names, dosage information, and frequency instructions from handwritten prescription images.',
  'An end-to-end machine learning computer vision pipeline designed to digitize handwritten medical prescriptions into structured, machine-readable records.

### Key Highlights
- **Deep Learning Recognition**: Integrated Microsoft TrOCR (Transformer-based Optical Character Recognition) fine-tuned for handwritten doctor prescriptions.
- **Computer Vision Preprocessing**: Implemented adaptive thresholding, deskewing, denoising, morphological operations, and line segmentation to maximize OCR accuracy.
- **Entity Extraction & Matching**: Automated extraction of drug dosage, frequency, and duration with fuzzy matching against standard pharmaceutical drug databases.
- **Confidence Scoring & Flagging**: Designed an uncertainty scoring algorithm to flag ambiguous handwriting for manual human pharmacist review.
- **Service Architecture**: Packaged as a high-performance RESTful API service using FastAPI, complete with interactive OpenAPI documentation and Docker containerization.',
  array['Machine Learning', 'Computer Vision', 'TrOCR', 'FastAPI', 'Python', 'Healthcare', 'PyTorch'],
  true,
  'https://github.com/sa001gar',
  null,
  '[{"name": "Mainak", "role": "Contributor"}]'::jsonb,
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

insert into public.projects (
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
  'MCCS Quiz Platform - Mankar College',
  'mccs-quiz-platform-mankar-college',
  'Developed an online quiz platform for the Department of Computer Science at Mankar College to support its recurring annual online quiz events.',
  'An interactive web assessment platform built for the Department of Computer Science at Mankar College to manage, host, and score annual competitive quizzes and departmental examinations.

### Key Highlights
- **Institutional Scale**: Designed specifically to handle concurrent student submissions during live timed departmental quiz events with low latency.
- **Modern Full-Stack Architecture**: Built with Next.js App Router, Tailwind CSS, and a real-time Supabase PostgreSQL backend.
- **Exam Integrity**: Automated timer synchronization, single-submission guarantees, question shuffling, and real-time anti-cheating state tracking.
- **Administrative Portal**: Built-in quiz creator with instant CSV export, automated scoring, and real-time leaderboard generation.
- **Practical Impact**: Deployed and utilized in real academic competitions for hundreds of participating students.',
  array['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'PostgreSQL', 'Education'],
  false,
  'https://github.com/sa001gar/quiz_mccs',
  null,
  '[{"name": "Mainak", "role": "Contributor"}]'::jsonb,
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

insert into public.projects (
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
  'Serverless Visitor Count API - Global',
  'serverless-visitor-count-api-global',
  'Built a reusable serverless visitor analytics API for tracking total visits, unique visitors, and visit timestamps across multiple web applications.',
  'A high-throughput, edge-deployed visitor analytics service designed to track real-time total and unique page views across distributed websites with zero cold-start delay.

### Key Highlights
- **Edge Deployment**: Built using Cloudflare Workers, serving requests at edge datacenters with sub-10ms response times globally.
- **In-Memory Speed**: Backed by Upstash Serverless Redis for atomic counters, IP-based deduplication, and daily time-series metrics.
- **Multi-Tenant Architecture**: Supports tracking multiple web applications and blogs using custom application identifiers and namespaced keys.
- **Cross-Origin Support**: Fully configured CORS preflight handling and rate limiting to permit seamless integration from any frontend domain.
- **Lightweight Embeds**: Designed to be invoked via simple SVG badge or JSON fetch in one line of JavaScript.',
  array['Cloudflare Workers', 'Redis', 'Serverless', 'TypeScript', 'Edge Computing', 'APIs'],
  false,
  'https://github.com/sa001gar/visitor-count',
  'https://rkavpanagarh.in',
  '[]'::jsonb,
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

insert into public.projects (
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
  'Modern Electricity Theft Detection System',
  'modern-electricity-theft-detection-system',
  'Co-developed an ML and IoT-based electricity theft detection system that combines electrical measurements, machine-learning analysis, and a backend service.',
  'An Internet-of-Things (IoT) and machine-learning solution to combat energy loss by identifying power line tapping and meter tampering in real time.

### Key Highlights
- **Hardware Sensing Layer**: Utilized ESP32 microcontrollers paired with precision non-invasive CT current sensors and AC voltage sensors to gather continuous power telemetry.
- **Machine Learning Analysis**: Trained classification algorithms on historical consumption profiles to accurately detect line power imbalances and anomalous usage.
- **Backend Data Pipeline**: Real-time telemetry ingestion pipeline that processes raw readings, computes phase differences, and flags suspicious power draw.
- **Operator Dashboard**: Interactive web interface displaying live grid statistics, phase current comparisons, and automated alert dispatching for field inspection.
- **Multidisciplinary Engineering**: Spanned embedded firmware, IoT communication protocols, predictive analytics, and cloud infrastructure.',
  array['IoT', 'Machine Learning', 'ESP32', 'Python', 'FastAPI', 'Sensors', 'Energy'],
  false,
  'https://github.com/sa001gar/Smart-Electricity-Theft-Detection',
  null,
  '[{"name": "Koyel", "role": "Contributor"}, {"name": "Mainak", "role": "Contributor"}]'::jsonb,
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

insert into public.projects (
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
  'Stress Detection Using Smartwatch Data',
  'stress-detection-using-smartwatch-data',
  'Developed a machine-learning project exploring stress detection from smartwatch-derived physiological and activity data.',
  'A data science and machine learning research project focused on non-invasive human mental stress identification using multi-modal physiological sensor streams collected from consumer wearables.

### Key Highlights
- **Sensor Modalities**: Analyzed wearable time-series datasets featuring Photoplethysmography (PPG) heart rate, Heart Rate Variability (HRV), Galvanic Skin Response (GSR), skin temperature, and 3-axis accelerometer movement.
- **Signal Processing & Feature Extraction**: Extracted statistical time-domain and frequency-domain biometric indicators (RMSSD, SDNN, spectral power) to identify autonomic nervous system stress reactions.
- **Classification Models**: Compared tree-based classifiers (Random Forest, XGBoost) and neural architectures for continuous stress vs. baseline state classification.
- **Preventative Health Potential**: Investigated the viability of deploying lightweight quantized models directly on edge devices for real-time wellness intervention prompts.',
  array['Machine Learning', 'Data Analysis', 'Python', 'Wearables', 'Healthcare', 'Signal Processing'],
  false,
  'https://github.com/sa001gar/Stress-Detection-Using-Smartwatch-Data',
  null,
  '[{"name": "Mainak", "role": "Contributor"}]'::jsonb,
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

-- Verify all projects in database:
select id, title, slug, featured, github_url, live_url from public.projects order by featured desc, title asc;