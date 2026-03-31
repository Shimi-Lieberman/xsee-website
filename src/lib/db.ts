import { neon } from "@neondatabase/serverless";

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
