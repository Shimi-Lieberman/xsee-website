import { getSql } from "@/lib/db";

let schemaEnsured = false;

/**
 * Auto-migration is on by default so existing deployments keep working, but it
 * means unauthenticated public endpoints trigger DDL and the runtime database
 * role therefore needs schema-modification rights.
 *
 * Preferred hardening: apply db/migrations/002_marketing_lead_tables.sql once,
 * set MARKETING_AUTO_MIGRATE=false, and reduce the runtime role to DML only.
 */
const AUTO_MIGRATE = process.env.MARKETING_AUTO_MIGRATE !== "false";

/**
 * Creates marketing lead tables and extends demo_requests when missing.
 * Safe to call once per serverless invocation; uses module flag to avoid repeat work.
 */
export async function ensureMarketingSchema(): Promise<void> {
  if (schemaEnsured) return;
  if (!AUTO_MIGRATE) {
    schemaEnsured = true;
    return;
  }
  const sql = getSql();

  await sql`
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
    )
  `;

  await sql`ALTER TABLE free_scan_requests ADD COLUMN IF NOT EXISTS remediation_role_arn TEXT`;
  await sql`ALTER TABLE free_scan_requests ALTER COLUMN aws_role_arn DROP NOT NULL`;
  await sql`ALTER TABLE free_scan_requests ALTER COLUMN aws_region DROP NOT NULL`;

  await sql`
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
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS contact_requests (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'footer',
      ip_address TEXT,
      user_agent TEXT
    )
  `;

  await sql`ALTER TABLE demo_requests ADD COLUMN IF NOT EXISTS full_name TEXT`;
  await sql`ALTER TABLE demo_requests ADD COLUMN IF NOT EXISTS work_email TEXT`;
  await sql`ALTER TABLE demo_requests ADD COLUMN IF NOT EXISTS cloud_provider TEXT`;
  await sql`ALTER TABLE demo_requests ADD COLUMN IF NOT EXISTS cloud_assets TEXT`;
  await sql`ALTER TABLE demo_requests ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'homepage'`;

  schemaEnsured = true;
}
