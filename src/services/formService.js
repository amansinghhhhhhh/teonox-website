import emailjs from "@emailjs/browser";

const WEBHOOK = import.meta.env.VITE_WEBHOOK_URL;

export const submitForm = async (formName, fields) => {
  const textFields = {};

  for (const [key, value] of Object.entries(fields)) {
    if (!(value instanceof File)) {
      textFields[key] = value;
    }
  }

  const results = await Promise.allSettled([
    fetch(WEBHOOK, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ formName, fields: textFields }),
    }),
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        form_name: formName,
        name: textFields["Full Name"] || "",
        email: textFields["Email Address"] || textFields["Email"] || "",
        phone: textFields["Phone Number"] || "",
        message: textFields["Message"] || textFields["Your Message"] || "",
        program: textFields["Program"] || textFields["Interested In"] || "",
        resume_link: textFields["Resume Link"] || "",
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    ),
  ]);

  const rejected = results.filter((r) => r.status === "rejected");
  if (rejected.length > 0) {
    console.error("Form submission errors:", rejected.map((r) => r.reason));
  }

  if (results.every((r) => r.status === "rejected")) {
    throw new Error("All submission methods failed");
  }
};
