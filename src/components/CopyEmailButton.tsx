"use client";

import { useState } from "react";

type Props = {
  email: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
};

export default function CopyEmailButton({
  email,
  label = "Copy email",
  copiedLabel = "Copied",
  className = "",
}: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`rounded-lg border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:border-white/25 hover:bg-white/[0.1] hover:text-white ${className}`}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
