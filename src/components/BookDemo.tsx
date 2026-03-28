"use client";

import { useState } from "react";
import { X } from "lucide-react";

type BookDemoModalProps = {
  variant?: "default" | "ghost";
};

export function BookDemoModal({ variant = "default" }: BookDemoModalProps) {
  const [open, setOpen] = useState(false);

  const triggerClass =
    variant === "ghost"
      ? "btn btn-secondary btn-lg"
      : "inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white/80 transition-all duration-200 hover:border-white/40 hover:bg-white/5 hover:text-white";

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={triggerClass}>
        Book a Demo
      </button>

      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            aria-label="Close modal"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a1628] shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/10 p-5">
              <div>
                <h3 className="text-lg font-bold text-white">Book a 30-min Demo</h3>
                <p className="mt-0.5 text-sm text-white/50">
                  We&apos;ll show you a live scan on a real AWS environment
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-white/40 transition-colors hover:text-white"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-0">
              <iframe
                src="https://calendly.com/xsee-io/30min?hide_gdpr_banner=1&background_color=050d1a&text_color=ffffff&primary_color=ff2d78"
                width="100%"
                height={600}
                title="Book a Demo with XSEE"
                className="block border-0"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
