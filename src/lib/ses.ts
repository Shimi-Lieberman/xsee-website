import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable");
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

interface EmailParams {
  to: string;
  subject: string;
  html: string;
  text: string;
  priority?: "high" | "normal";
}

export async function sendEmail(params: EmailParams): Promise<void> {
  const from =
    process.env.RESEND_FROM_EMAIL || "notifications@xsee.io";

  const { error } = await getResendClient().emails.send({
    from: `XSEE <${from}>`,
    to: params.to,
    subject: params.subject,
    html: params.html,
    text: params.text,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
}

export const sendUrgentEmail = sendEmail;

export const getAdminEmail = () =>
  process.env.ADMIN_EMAIL?.trim() || "admin@xsee.io";
