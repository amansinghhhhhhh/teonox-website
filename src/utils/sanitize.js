import DOMPurify from "dompurify";

// WordPress / ACF se aane wale HTML ko inject karne se pehle clean karta hai.
// Normal formatting aur YouTube/iframe embeds preserve rehte hain, lekin
// <script> aur event-handler attributes (onerror, onclick, ...) strip ho jaate hain.
export const sanitizeHtml = (dirty) => {
  if (!dirty) return "";

  return DOMPurify.sanitize(dirty, {
    // Embeds (YouTube etc.) ke liye iframe allow karo
    ADD_TAGS: ["iframe"],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "target",
    ],
    // javascript: / data: jaise dangerous URI schemes block rehte hain (default)
    ALLOW_UNKNOWN_PROTOCOLS: false,
  });
};

export default sanitizeHtml;
