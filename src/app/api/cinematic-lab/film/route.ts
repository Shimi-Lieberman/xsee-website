import { guarded } from "@/lib/cinematic/route.server";
import { buildFilm } from "@/lib/cinematic/takes.server";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export function POST() {
  return guarded(async () => Response.json(await buildFilm(), { status: 201 }));
}
