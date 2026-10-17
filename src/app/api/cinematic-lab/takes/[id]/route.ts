import { guarded, readBody } from "@/lib/cinematic/route.server";
import { approveTake, deleteTake, LabError } from "@/lib/cinematic/takes.server";

export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f-]{36}$/i;

type Context = { params: Promise<{ id: string }> };

async function takeId(context: Context) {
  const { id } = await context.params;
  if (!UUID.test(id)) throw new LabError("Take not found.", 404);
  return id;
}

export function PATCH(request: Request, context: Context) {
  return guarded(async () => {
    const id = await takeId(context);
    const body = await readBody(request);
    if (typeof body.approved !== "boolean") throw new LabError("Expected { approved: boolean }.");
    return Response.json(await approveTake(id, body.approved));
  });
}

export function DELETE(_request: Request, context: Context) {
  return guarded(async () => {
    await deleteTake(await takeId(context));
    return new Response(null, { status: 204 });
  });
}
