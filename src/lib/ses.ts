interface EmailParams {
  to: string;
  subject: string;
  html: string;
  text: string;
  priority?: "high" | "normal";
}

export async function sendEmail(params: EmailParams): Promise<void> {
  const apiKey = process.env.SENDER_API_KEY;
  const fromEmail =
    process.env.SENDER_FROM_EMAIL || "notifications@xsee.io";

  if (!apiKey) {
    throw new Error("SENDER_API_KEY not set");
  }

  const res = await fetch("https://api.sender.net/v2/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      from: { name: "XSEE", email: fromEmail },
      to: [{ email: params.to }],
      subject: params.subject,
      html: params.html,
      text: params.text,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Sender error ${res.status}: ${err}`);
  }
}

/** Alias for emergency route — same function, priority is cosmetic */
export const sendUrgentEmail = sendEmail;

export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL?.trim() || "admin@xsee.io";
}
