import emailjs from "@emailjs/browser";

const WEBHOOK = import.meta.env.VITE_WEBHOOK_URL;

export const submitForm = async (formName, fields) => {
  const textFields = {};

  for (const [key, value] of Object.entries(fields)) {
    if (!(value instanceof File)) {
      textFields[key] = value;
    }
  }

  await fetch(WEBHOOK, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formName, fields: textFields }),
  });

  await emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      form_name: formName,
      name: textFields["Full Name"] || "",
      email: textFields["Email Address"] || textFields["Email"] || "",
      phone: textFields["Phone Number"] || "",
      message: textFields["Message"] || textFields["Your Message"] || "",
      program: textFields["Program"] || "",
      resume_link: textFields["Resume Link"] || "",
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  );
};
