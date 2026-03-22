import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Breach Proof Report | XSEE",
  description: "Connect your AWS account with read-only IAM. Get a ranked report of your top attack paths in under 30 minutes.",
};

export default function FreeScanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
