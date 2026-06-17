import { useEffect } from "react";

export default function useVideoGallery() {
  useEffect(() => {
    const v = document.getElementById("vcViewport");
    const t = document.getElementById("vcTrack");

    if (!v || !t) return;

    const c = t.querySelectorAll(".video-card");
    const d = document.querySelectorAll(".vc-dot");
    const p = document.getElementById("vcPrev");
    const n = document.getElementById("vcNext");

    const totalSlides = 4;
    let currentIndex = 0;

    // Fetch Instagram thumbnails
    c.forEach((card) => {
      const thumb = card.querySelector(".vc-thumb");

      fetch(
        "https://api.instagram.com/oembed?url=" +
          encodeURIComponent(card.dataset.url) +
          "&format=json"
      )
        .then((r) => r.json())
        .then((data) => {
          if (data?.thumbnail_url) {
            thumb.style.backgroundImage = `url(${data.thumbnail_url})`;
          }
        })
        .catch(() => {});
    });

    function getCardWidth() {
      const gap = parseInt(getComputedStyle(t).gap) || 16;
      const viewportWidth = v.offsetWidth;

      return (viewportWidth - gap * 3) / 4 + gap;
    }

    function go(index, smooth = true) {
      t.style.scrollBehavior = smooth ? "smooth" : "auto";

      if (index >= totalSlides) {
        t.style.scrollBehavior = "auto";
        t.scrollLeft = 0;
        currentIndex = 0;

        d.forEach((dot, j) => {
          dot.classList.toggle("active", j === 0);
        });

        return;
      }

      if (index < 0) {
        t.style.scrollBehavior = "auto";
        t.scrollLeft = t.scrollWidth / 2;
        currentIndex = totalSlides - 1;

        d.forEach((dot, j) => {
          dot.classList.toggle("active", j === totalSlides - 1);
        });

        return;
      }

      currentIndex = index;
      t.scrollLeft = getCardWidth() * currentIndex;

      d.forEach((dot, j) => {
        dot.classList.toggle("active", j === currentIndex);
      });
    }

    const prevHandler = () => go(currentIndex - 1, true);
    const nextHandler = () => go(currentIndex + 1, true);

    p?.addEventListener("click", prevHandler);
    n?.addEventListener("click", nextHandler);

    d.forEach((dot, j) => {
      dot.addEventListener("click", () => go(j, true));
    });

    const resizeHandler = () => {
      t.style.scrollBehavior = "auto";
      t.scrollLeft = getCardWidth() * currentIndex;
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      p?.removeEventListener("click", prevHandler);
      n?.removeEventListener("click", nextHandler);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);
}