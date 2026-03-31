-- XSEE website schema
-- Run against Neon Postgres: psql $POSTGRES_URL -f db/schema.sql
-- Or paste into Neon SQL Editor: https://console.neon.tech

CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS demo_requests (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  message TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  is_suspicious BOOLEAN DEFAULT false,
  role_arn TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Marketing lead tables (also ensured at runtime via ensureMarketingSchema() in src/lib/marketingSchema.ts)
CREATE TABLE IF NOT EXISTS free_scan_requests (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  full_name TEXT NOT NULL,
  work_email TEXT NOT NULL,
  company TEXT NOT NULL,
  aws_role_arn TEXT NOT NULL,
  aws_region TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS emergency_requests (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  full_name TEXT,
  work_email TEXT NOT NULL,
  company TEXT,
  message TEXT,
  ip_address TEXT,
  user_agent TEXT,
  status TEXT NOT NULL DEFAULT 'new'
);

CREATE TABLE IF NOT EXISTS contact_requests (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'footer',
  ip_address TEXT,
  user_agent TEXT
);

ALTER TABLE demo_requests ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE demo_requests ADD COLUMN IF NOT EXISTS work_email TEXT;
ALTER TABLE demo_requests ADD COLUMN IF NOT EXISTS cloud_provider TEXT;
ALTER TABLE demo_requests ADD COLUMN IF NOT EXISTS cloud_assets TEXT;
ALTER TABLE demo_requests ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'homepage';
