import { useEffect } from "react";

export default function useIndustryCollaboration() {
  useEffect(() => {

    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObserver.observe(el);
    });

    // Init Lucide icons
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }

    return () => {
      revealObserver.disconnect();
    };

  }, []);
}