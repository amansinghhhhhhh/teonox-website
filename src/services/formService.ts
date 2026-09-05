// Google Apps Script webhook (Google Sheets + Drive + Email).
// Ported directly from the legacy teonox website. Override via
// VITE_WEBHOOK_URL when set, otherwise fall back to the exact
// deployed Apps Script endpoint so no re-configuration is needed.
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
 * Apps Script doesn't return CORS headers, so we use mode "no-cors": the
 * request still reaches the server and runs, but the response is "opaque"
 * (unreadable). A network failure still rejects this fetch, which the caller
 * catches; an HTTP error cannot be detected here.
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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    await fetch(WEBHOOK, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ formName, fields: textFields, files }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
};
