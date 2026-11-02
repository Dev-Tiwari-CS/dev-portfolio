export type ContactInput = { name: string; email: string; message: string };
export type ContactErrors = { [K in keyof ContactInput]?: string | undefined };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name (at least 2 characters).";
  else if (v.name.length > 100) e.name = "Name must be under 100 characters.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  else if (v.message.length > 2000) e.message = "Message must be under 2000 characters.";
  return e;
}

/** Resolves only when the backend confirms; throws otherwise. */
export async function submitContact(endpoint: string, v: ContactInput) {
  if (!endpoint) throw new Error("The contact form isn't connected yet. Please use the email link instead.");
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ name: v.name.trim(), email: v.email.trim(), message: v.message.trim() }),
  });
  if (!res.ok) throw new Error("Message couldn't be sent. Please try again or email directly.");
}
