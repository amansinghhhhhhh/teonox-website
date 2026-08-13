const WEBHOOK = import.meta.env.VITE_WEBHOOK_URL;

// Convert a File to a base64 payload the Apps Script can rebuild into a Drive file.
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // reader.result looks like "data:<mime>;base64,<data>" — strip the prefix.
      const base64 = String(reader.result).split(",")[1] || "";
      resolve(base64);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

export const submitForm = async (formName, fields) => {
  const textFields = {};
  const files = [];

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

  // Single source of truth now: the Google Apps Script webhook.
  // It saves text to the Sheet, stores files in Drive, and sends the email.
  //
  // Apps Script doesn't return CORS headers, so we use mode "no-cors":
  // the request still reaches the server and runs, but the response is
  // "opaque" (unreadable). A network failure still rejects this fetch,
  // which the caller catches; an HTTP error cannot be detected here.
  await fetch(WEBHOOK, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ formName, fields: textFields, files }),
  });
};
