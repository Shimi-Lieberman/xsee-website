import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Risk Assessment | XSEE",
  description:
    "Connect your AWS account. Get a validated attack graph in 30 minutes. Free, no credit card required.",
};

export default function FreeScanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
