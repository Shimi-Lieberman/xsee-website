"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Analytics } from "@/lib/analytics";
import { SALES_EMAIL } from "@/lib/navigation";

export type RequestType = "demo" | "pilot";

type Fields = { name: string; email: string; company: string; goal: string };
type FieldErrors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", email: "", company: "", goal: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_ORDER: (keyof Fields)[] = ["name", "email", "company", "goal"];

function validate(values: Fields): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.email.trim()) errors.email = "Enter your work email.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (!values.company.trim()) errors.company = "Enter your company.";
  if (!values.goal.trim()) errors.goal = "Tell us briefly what you want to evaluate.";
  return errors;
}

export default function DemoRequestForm({ requestType }: { requestType: RequestType }) {
  const id = useId();
  const [values, setValues] = useState<Fields>(EMPTY);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const fieldRefs = useRef<Partial<Record<keyof Fields, HTMLInputElement | HTMLTextAreaElement | null>>>({});
  const successRef = useRef<HTMLHeadingElement>(null);
  const startedRef = useRef(false);

  const isPilot = requestType === "pilot";
  const submitLabel = isPilot ? "Discuss a pilot" : "Book a demo";
  const mailSubject = encodeURIComponent(isPilot ? "XSEE pilot discussion" : "Book an XSEE demo");

  function update(field: keyof Fields, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = FIELD_ORDER.find((f) => nextErrors[f]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website: honeypot,
          full_name: values.name,
          work_email: values.email,
          company: values.company,
          evaluation_goal: values.goal,
          request_type: requestType,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { success?: boolean; error?: string };
      if (res.ok && data.success) {
        Analytics.formSubmitted(isPilot ? "pilot_request" : "demo_request");
        setStatus("success");
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      setStatus("error");
      setServerError(data.error ?? "We couldn't send your request.");
    } catch {
      setStatus("error");
      setServerError("We couldn't reach our server.");
    }
  }

  if (status === "success") {
    return (
      <div className="xsee-form-card xsee-form-success" role="status">
        <span className="xsee-form-success-icon" aria-hidden>
          <Check size={20} />
        </span>
        <h2 ref={successRef} tabIndex={-1}>
          Request sent
        </h2>
        <p>
          Thanks, {values.name.trim().split(" ")[0]}. The XSEE team will reply to {values.email.trim()}.
        </p>
        <button
          type="button"
          className="xsee-form-link"
          onClick={() => {
            setValues(EMPTY);
            setStatus("idle");
          }}
        >
          Send another request
        </button>
      </div>
    );
  }

  const fieldProps = (field: keyof Fields) => ({
    id: `${id}-${field}`,
    name: field,
    value: values[field],
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${id}-${field}-error` : undefined,
    disabled: status === "submitting",
  });

  const errorText = (field: keyof Fields) =>
    errors[field] ? (
      <p id={`${id}-${field}-error`} className="xsee-field-error">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form
      className="xsee-form-card"
      onSubmit={handleSubmit}
      noValidate
      aria-label={isPilot ? "Pilot request" : "Demo request"}
      onFocusCapture={() => {
        if (!startedRef.current) {
          startedRef.current = true;
          Analytics.formStarted(isPilot ? "pilot_request" : "demo_request");
        }
      }}
    >
      <div className="honeypot" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="xsee-field">
        <label htmlFor={`${id}-name`}>Name</label>
        <input
          {...fieldProps("name")}
          ref={(el) => {
            fieldRefs.current.name = el;
          }}
          type="text"
          autoComplete="name"
          required
          onChange={(e) => update("name", e.target.value)}
        />
        {errorText("name")}
      </div>

      <div className="xsee-field">
        <label htmlFor={`${id}-email`}>Work email</label>
        <input
          {...fieldProps("email")}
          ref={(el) => {
            fieldRefs.current.email = el;
          }}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          onChange={(e) => update("email", e.target.value)}
        />
        {errorText("email")}
      </div>

      <div className="xsee-field">
        <label htmlFor={`${id}-company`}>Company</label>
        <input
          {...fieldProps("company")}
          ref={(el) => {
            fieldRefs.current.company = el;
          }}
          type="text"
          autoComplete="organization"
          required
          onChange={(e) => update("company", e.target.value)}
        />
        {errorText("company")}
      </div>

      <div className="xsee-field">
        <label htmlFor={`${id}-goal`}>Evaluation goal</label>
        <textarea
          {...fieldProps("goal")}
          ref={(el) => {
            fieldRefs.current.goal = el;
          }}
          rows={4}
          required
          placeholder={isPilot ? "What should a pilot help your team validate?" : "What would you like to see in the demo?"}
          onChange={(e) => update("goal", e.target.value)}
        />
        {errorText("goal")}
      </div>

      <div aria-live="assertive">
        {status === "error" ? (
          <div className="xsee-form-alert" role="alert">
            <p>
              <strong>{serverError}</strong> Your details are still here, so you can try again or email{" "}
              <a href={`mailto:${SALES_EMAIL}?subject=${mailSubject}`}>{SALES_EMAIL}</a>.
            </p>
          </div>
        ) : null}
      </div>

      <button type="submit" className="xsee-primary-cta xsee-form-submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : submitLabel}
        {status === "submitting" ? null : <ArrowRight size={16} aria-hidden />}
      </button>
      <p className="xsee-form-footnote">
        Prefer email? Write to <a href={`mailto:${SALES_EMAIL}?subject=${mailSubject}`}>{SALES_EMAIL}</a>.
      </p>
    </form>
  );
}
