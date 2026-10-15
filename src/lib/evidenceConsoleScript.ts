/**
 * Fictional, simulated scenario for the hero Evidence Console.
 * All identifiers are invented; nothing here connects to a real account.
 * The workflow mirrors the verified product boundary: XSEE assesses with
 * read-only access, the customer's team approves and applies any change.
 */

export type ConsoleStatus =
  | "observed"
  | "simulated"
  | "untested"
  | "verified"
  | "pending"
  | "reassess";

export type ConsoleTone = "output" | "muted" | "accent" | "event" | "summary";

export type ConsoleEvent =
  | { kind: "command"; text: string; delay: number }
  | { kind: "line"; text: string; delay: number; tone?: ConsoleTone; status?: ConsoleStatus };

export const CONSOLE_TIMING = {
  charMs: 42,
  commandSettleMs: 260,
  endPauseMs: 5200,
  fadeMs: 520,
  maxLines: 22,
} as const;

export const STATUS_LABELS: Record<ConsoleStatus, string> = {
  observed: "Observed",
  simulated: "Simulated",
  untested: "Untested",
  verified: "Verified",
  pending: "Pending review",
  reassess: "Reassess",
};

export const CONSOLE_SCRIPT: ConsoleEvent[] = [
  { kind: "command", text: "xsee assess --env demo-prod --read-only", delay: 900 },
  { kind: "line", tone: "muted", text: "Fictional account 111122223333 · us-east-1", delay: 450 },
  { kind: "line", text: "Read-only assessment initialized", delay: 500 },

  { kind: "command", text: "xsee discover --identity", delay: 1100 },
  { kind: "line", text: "214 resources · 38 roles · 6 trust links", delay: 700 },
  { kind: "line", text: "Edge: ec2/web-01 → role/app-runtime", delay: 450 },

  { kind: "command", text: "xsee paths --rank", delay: 1100 },
  { kind: "line", tone: "accent", text: "Candidate path AP-07 · priority high", delay: 800 },
  { kind: "line", text: "  internet → sg-web:443 → ec2/web-01", delay: 350 },
  { kind: "line", text: "  → role/app-runtime → s3/billing-exports", delay: 350 },

  { kind: "command", text: "xsee validate AP-07", delay: 2400 },
  { kind: "line", status: "observed", text: "sg-web open to 0.0.0.0/0 on 443", delay: 700 },
  { kind: "line", status: "observed", text: "app-runtime may s3:GetObject on exports", delay: 500 },
  { kind: "line", status: "simulated", text: "Policy eval: web-01 can read exports", delay: 650 },
  { kind: "line", status: "untested", text: "Data sensitivity of billing-exports", delay: 500 },

  { kind: "command", text: "xsee remediate AP-07 --propose", delay: 2600 },
  { kind: "line", text: "Proposed: scope GetObject to /public/*", delay: 700 },
  { kind: "line", status: "pending", text: "CR-118 sent to platform-security", delay: 500 },
  { kind: "line", tone: "event", text: "event  CR-118 approved by owner team", delay: 1800 },
  { kind: "line", tone: "event", text: "event  Change applied by customer pipeline", delay: 900 },
  { kind: "line", tone: "muted", text: "XSEE holds no write access", delay: 400 },

  { kind: "command", text: "xsee recheck AP-07", delay: 1500 },
  { kind: "line", status: "verified", text: "app-runtime can no longer read exports", delay: 1000 },
  { kind: "line", tone: "accent", text: "AP-07 closed · illustrative result", delay: 500 },

  { kind: "line", tone: "muted", text: "— 9 days later —", delay: 2600 },
  { kind: "command", text: "xsee watch demo-prod", delay: 600 },
  { kind: "line", text: "drift  app-runtime policy changed (v4)", delay: 900 },
  { kind: "line", status: "reassess", text: "AP-07 closure flagged for reassessment", delay: 600 },

  { kind: "line", tone: "summary", text: "Summary  1 path validated, closed, re-verified", delay: 2200 },
  { kind: "line", tone: "summary", text: "         1 closure reopened by drift", delay: 350 },
];

/** Representative frame shown instead of playback when reduced motion is preferred. */
export const CONSOLE_STATIC_SNAPSHOT: ConsoleEvent[] = [
  CONSOLE_SCRIPT[7],
  CONSOLE_SCRIPT[10],
  CONSOLE_SCRIPT[11],
  CONSOLE_SCRIPT[13],
  CONSOLE_SCRIPT[14],
  CONSOLE_SCRIPT[17],
  CONSOLE_SCRIPT[19],
  CONSOLE_SCRIPT[21],
  CONSOLE_SCRIPT[22],
  CONSOLE_SCRIPT[26],
  CONSOLE_SCRIPT[27],
  CONSOLE_SCRIPT[28],
];

export const CONSOLE_ACCESSIBLE_SUMMARY =
  "Automated demo in a simulated environment with fictional resources. XSEE runs a read-only assessment, finds candidate attack path AP-07 from a public web server through an IAM role to a billing-exports bucket, and validates it with observed, simulated, and untested checks. It proposes a scoped policy change; the customer's team approves and applies it. A re-check verifies the path is closed, and later configuration drift flags that closure for reassessment.";
