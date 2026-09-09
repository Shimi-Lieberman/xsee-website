-- Marketing lead tables, extracted from the runtime ensureMarketingSchema() helper.
--
-- Apply this once, then set MARKETING_AUTO_MIGRATE=false so the public intake
-- endpoints no longer issue DDL and the runtime database role can be reduced to
-- INSERT/SELECT only (least privilege).

CREATE TABLE IF NOT EXISTS free_scan_requests (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  full_name TEXT NOT NULL,
  work_email TEXT NOT NULL,
  company TEXT NOT NULL,
  aws_role_arn TEXT,
  aws_region TEXT NOT NULL,
  remediation_role_arn TEXT,
  ip_address TEXT,
  user_agent TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
);

ALTER TABLE free_scan_requests ADD COLUMN IF NOT EXISTS remediation_role_arn TEXT;
ALTER TABLE free_scan_requests ALTER COLUMN aws_role_arn DROP NOT NULL;

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
