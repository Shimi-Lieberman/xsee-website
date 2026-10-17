import { hasLabAccess, notFoundResponse } from "./access.server";
import { LabError } from "./takes.server";

export async function guarded(handler: () => Promise<Response>) {
  if (!(await hasLabAccess())) return notFoundResponse();
  try {
    return await handler();
  } catch (error) {
    if (error instanceof LabError) return Response.json({ error: error.message }, { status: error.status });
    console.error("[cinematic-lab]", error);
    return Response.json({ error: error instanceof Error ? error.message : "Unexpected error." }, { status: 500 });
  }
}

export async function readBody(request: Request): Promise<Record<string, unknown>> {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new LabError("Expected a JSON object.");
  return body as Record<string, unknown>;
}
