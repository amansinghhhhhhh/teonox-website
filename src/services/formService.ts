// Google Apps Script webhook (Google Sheets + Drive + Email).
// Uses no-cors mode because Apps Script redirects responses through
// an echo URL, causing CORS read failures in the browser.
const WEBHOOK =
  import.meta.env.VITE_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbwD25H1aTA5MzUXZvNjVOEPoBXNUl-QzFCNxwqwytC9_ysq1RUaLxHUwfWFAXO6jt4Mpw/exec";

export interface FormFile {
  field: string;
  name: string;
  mimeType: string;
  data: string;
}

// Fields may hold plain text values or File uploads (e.g. Resume).
export type FormFields = Record<string, string | File>;

// Convert a File to a base64 payload the Apps Script can rebuild into a Drive file.
const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // reader.result looks like "data:<mime>;base64,<data>" - strip the prefix.
      const base64 = String(reader.result).split(",")[1] || "";
      resolve(base64);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

/**
 * Pushes form data to the Google Apps Script webhook, which saves text to
 * the Sheet, stores files in Drive, and sends the email notification.
 *
 * Uses no-cors mode to bypass the Apps Script redirect/CORS issue.
 * Response is opaque — we assume success on network-level completion.
 */
export const submitForm = async (
  formName: string,
  fields: FormFields,
): Promise<void> => {
  const textFields: Record<string, string> = {};
  const files: FormFile[] = [];

  for (const [key, value] of Object.entries(fields)) {
    if (value instanceof File && value.size > 0) {
      const data = await fileToBase64(value);
      files.push({
        field: key,
        name: value.name,
        mimeType: value.type || "application/octet-stream",
        data,
      });
    } else if (!(value instanceof File)) {
      textFields[key] = value;
    }
  }

  // Map fields to match what doPost expects
  const payload = {
    name: textFields.fullName || textFields.name || "",
    email: textFields.email || "",
    phone: textFields.whatsapp || textFields.phone || "",
    location: textFields.location || "",
    qualification: textFields.qualification || "",
    profile: textFields.profile || "",
    reason: textFields.reason || "",
    source: textFields.source || "",
    traffic_channel: textFields.traffic_channel || "",
    referral: textFields.referral || "",
    formName: formName,
    submittedAt: new Date().toISOString(),
    fields: textFields,
    files,
  };

  const body = JSON.stringify(payload);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    // Use no-cors directly — Apps Script redirects cause CORS failures.
    // Response is opaque; we assume success if no network error throws.
    await fetch(WEBHOOK, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
};
