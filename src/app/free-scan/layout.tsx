import type { Metadata } from "next";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata: Metadata = pageMetadata({
  title: "Free Risk Assessment | XSEE",
  description:
    "Request a read-only AWS risk assessment. We'll contact you to schedule it.",
  path: "/free-scan",
});

export default function FreeScanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="free-scan-layout-shell w-full max-w-[100vw] mx-auto box-border min-w-0">
      {children}
    </div>
  );
}
