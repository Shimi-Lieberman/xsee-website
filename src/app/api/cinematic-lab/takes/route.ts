import { guarded, readBody } from "@/lib/cinematic/route.server";
import { getShot, isModelId } from "@/lib/cinematic/shots";
import { createTake, LabError } from "@/lib/cinematic/takes.server";

export const dynamic = "force-dynamic";

export function POST(request: Request) {
  return guarded(async () => {
    const body = await readBody(request);
    const shot = getShot(body.shotId);
    if (!shot) throw new LabError("Unknown shot.");
    if (!isModelId(body.model)) throw new LabError("Unknown model.");
    const duration = Number(body.duration);
    const approvedCredits = Number(body.approvedCredits);
    if (!Number.isInteger(duration) || !Number.isInteger(approvedCredits)) {
      throw new LabError("Duration and approved credits must be whole numbers.");
    }
    const take = await createTake({ shot, model: body.model, duration, chain: body.chain === true, approvedCredits });
    return Response.json(take, { status: 201 });
  });
}
