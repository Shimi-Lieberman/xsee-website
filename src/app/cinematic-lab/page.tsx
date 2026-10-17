import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLabAccess } from "@/lib/cinematic/access.server";
import { LabClient } from "@/components/cinematic-lab/LabClient";
import { UnlockForm } from "@/components/cinematic-lab/UnlockForm";
import "./lab.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cinematic Lab",
  robots: { index: false, follow: false },
};

export default async function CinematicLabPage() {
  if (await hasLabAccess()) return <LabClient />;
  if (!process.env.CINEMATIC_LAB_KEY) notFound();
  return (
    <main className="lab">
      <div className="lab-wrap">
        <UnlockForm />
      </div>
    </main>
  );
}
