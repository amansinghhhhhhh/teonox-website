import emailjs from "@emailjs/browser";

const WEBHOOK = import.meta.env.VITE_WEBHOOK_URL;

export const submitForm = async (
    formName,
    fields
) => {

    await fetch(WEBHOOK, {

        method: "POST",

        mode: "no-cors",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            formName,
            fields
        })
    });

    await emailjs.send(

        import.meta.env.VITE_EMAILJS_SERVICE_ID,

        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,

        {
            form_name: formName,

            name: fields["Full Name"] || "",

            email: fields["Email Address"] || "",

            phone: fields["Phone Number"] || "",

            message: fields["Message"] || "",

            program: fields["Program"] || "",

            resume_link: fields["Resume Link"] || ""
        },

        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

};