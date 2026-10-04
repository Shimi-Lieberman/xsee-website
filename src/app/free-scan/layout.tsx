import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Risk Assessment | XSEE",
  description:
    "Request a read-only AWS risk assessment. We'll contact you to schedule it.",
};

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
