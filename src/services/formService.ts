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
 * Uses standard CORS so we can read the response and detect failures.
 * Falls back to no-cors only if the server rejects the preflight (legacy
 * Apps Script deployments without doOptions), in which case we assume
 * success on network-level completion since the response is opaque.
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

  const body = JSON.stringify({ formName, fields: textFields, files });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    // Attempt CORS first — allows us to read the response status/body.
    let res: Response;
    try {
      res = await fetch(WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body,
        signal: controller.signal,
      });
    } catch {
      // CORS preflight rejected — try no-cors (opaque response).
      // This happens with legacy Apps Script deployments.
      console.warn("[formService] CORS rejected, retrying with no-cors mode");
      res = await fetch(WEBHOOK, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body,
        signal: controller.signal,
      });
    }

    // If we got a readable response (CORS mode), validate it.
    if (res.type === "basic" || res.type === "cors") {
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error(`[formService] Webhook returned ${res.status}:`, text);
        throw new Error(`Webhook failed with status ${res.status}`);
      }

      // Some Apps Script deployments return { success: true/false }.
      const json = await res.json().catch(() => null);
      if (json && json.success === false) {
        console.error("[formService] Webhook reported failure:", json);
        throw new Error(json.message || "Webhook reported failure");
      }
    }
    // If res.type is "opaque" (no-cors), we can't read the body — assume
    // the request reached the server. Network errors still throw.
  } finally {
    clearTimeout(timeout);
  }
};
