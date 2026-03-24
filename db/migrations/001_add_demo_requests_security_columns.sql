-- Add security and logging columns to demo_requests
-- Run: psql $POSTGRES_URL -f db/migrations/001_add_demo_requests_security_columns.sql
-- Or paste into Neon SQL Editor

ALTER TABLE demo_requests
  ADD COLUMN IF NOT EXISTS ip_address VARCHAR(45),
  ADD COLUMN IF NOT EXISTS user_agent TEXT,
  ADD COLUMN IF NOT EXISTS is_suspicious BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS role_arn TEXT;
