"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import SectionFadeIn from "./SectionFadeIn";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    cloudProvider: "",
    assetCount: "",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({
          fullName: "",
          email: "",
          company: "",
          cloudProvider: "",
          assetCount: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section id="contact" className="bg-slate-50 py-28 px-6">
        <SectionFadeIn className="mx-auto max-w-xl text-center">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#22C55E]/10">
              <Check className="h-8 w-8 text-[#22C55E]" />
            </div>
          </div>
          <h2 className="mt-6 text-4xl font-semibold text-slate-900">
            Thanks!
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            We&apos;ll be in touch within 24 hours.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 font-medium text-[#3B82F6] hover:underline"
          >
            Submit another request
          </button>
        </SectionFadeIn>
      </section>
    );
  }

  return (
    <section id="contact" className="bg-slate-50 py-28 px-6">
      <div className="mx-auto max-w-xl">
        <SectionFadeIn>
          <h2 className="text-center text-3xl font-bold text-[#0F172A] sm:text-4xl">
          Request a Demo
        </h2>
        <p className="mt-4 text-center text-lg text-slate-500">
            See XSEE in action on your own environment.
          </p>
        </SectionFadeIn>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-slate-900"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="mt-1 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-slate-900 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
              placeholder="Jane Smith"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-900"
            >
              Work Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-slate-900 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
              placeholder="jane@company.com"
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-slate-900"
            >
              Company
            </label>
            <input
              id="company"
              type="text"
              required
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              className="mt-1 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-slate-900 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
              placeholder="Acme Inc"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="cloudProvider"
                className="block text-sm font-medium text-slate-900"
              >
                Cloud Provider
              </label>
              <select
                id="cloudProvider"
                required
                value={formData.cloudProvider}
                onChange={(e) =>
                  setFormData({ ...formData, cloudProvider: e.target.value })
                }
                className="mt-1 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-slate-900 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
              >
                <option value="">Select...</option>
                <option value="AWS">AWS</option>
                <option value="Azure">Azure</option>
                <option value="GCP">GCP</option>
                <option value="Multi-cloud">Multi-cloud</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="assetCount"
                className="block text-sm font-medium text-slate-900"
              >
                Number of cloud assets
              </label>
              <select
                id="assetCount"
                required
                value={formData.assetCount}
                onChange={(e) =>
                  setFormData({ ...formData, assetCount: e.target.value })
                }
                className="mt-1 h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-slate-900 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
              >
                <option value="">Select...</option>
                <option value="1-100">1-100</option>
                <option value="100-500">100-500</option>
                <option value="500-1000">500-1000</option>
                <option value="1000+">1000+</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-slate-900"
            >
              Message (optional)
            </label>
            <textarea
              id="message"
              rows={3}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-[#3B82F6] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20"
              placeholder="Tell us about your security goals..."
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-[#DC2626]">
              Something went wrong. Please try again or email demo@xsee.io
              directly.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="h-12 w-full rounded-xl bg-[#3B82F6] text-base font-semibold text-white shadow-[0_4px_14px_rgba(59,130,246,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2563EB] hover:shadow-[0_8px_24px_rgba(59,130,246,0.45)] disabled:opacity-70"
          >
            {status === "loading" ? "Sending..." : "Request Demo"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Or:{" "}
          <a href="#" className="font-medium text-[#3B82F6] hover:underline">
            Book a Call →
          </a>{" "}
          <span className="text-[#CBD5E1]">|</span>{" "}
          <a href="#" className="font-medium text-[#3B82F6] hover:underline">
            Join Waitlist →
          </a>
        </p>
      </div>
    </section>
  );
}
