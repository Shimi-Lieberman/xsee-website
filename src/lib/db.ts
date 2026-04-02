import { neon } from "@neondatabase/serverless";

// MARKETING_DATABASE_URL (used by platform admin)
// = POSTGRES_URL_NON_POOLING value from Vercel
// Add to app.xsee.io Vercel env vars to enable
// the Leads tab in the admin dashboard.

export function getSql() {
  const connectionString =
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING;
  if (!connectionString) {
    throw new Error(
      "No Postgres connection string (POSTGRES_URL, POSTGRES_PRISMA_URL, or POSTGRES_URL_NON_POOLING)"
    );
  }
  return neon(connectionString);
}
