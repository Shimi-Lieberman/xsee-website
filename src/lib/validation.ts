const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  const trimmed = email?.trim() ?? "";
  return trimmed.length > 0 && EMAIL_REGEX.test(trimmed);
}
