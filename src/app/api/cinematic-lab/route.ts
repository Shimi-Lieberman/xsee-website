import { guarded } from "@/lib/cinematic/route.server";
import { snapshot } from "@/lib/cinematic/takes.server";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export function GET() {
  return guarded(async () => Response.json(await snapshot(), { headers: { "Cache-Control": "no-store" } }));
}
