import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLucide from "../hooks/useLucide.js";
import useScrollReveal from "../hooks/useScrollReveal.js";

import { getPrograms, getProgramCategories } from "../api/wordpressApi";

export default function Programs() {
  const [selectedProgramCategory, setSelectedProgramCategory] = useState("");
  const [programs, setPrograms] = useState([]);
  const [programCategories, setProgramCategories] = useState([]);

  useLucide();
  useScrollReveal();
  //   const dh = (sel, fn) => {
  //     document.querySelectorAll(sel).forEach((el) => {
  //       el.addEventListener("click", fn);
  //       hdls.push(() => el.removeEventListener("click", fn));
  //     });
  //   };
  //   dh(".job-expandable-header", function () {
  //     const c = this.closest(".job-expandable");
  //     const b = c.querySelector(".job-expandable-body");
  //     const o = c.classList.contains("open");
  //     c.classList.toggle("open");
  //     if (b) b.style.display = o ? "none" : "";
  //   });
  //   dh(".faq-item", function () {
  //     this.classList.toggle("open");
  //   });
  //   dh(".prog-filter", function () {
  //     document
  //       .querySelectorAll(".prog-filter")
  //       .forEach((b) => b.classList.remove("active"));
  //     this.classList.add("active");
  //     const f = this.dataset.filter;
  //     document.querySelectorAll(".prog-card").forEach((c) => {
  //       if (f === "all") {
  //         c.style.display = "";
  //         return;
  //       }
  //       c.style.display = c.textContent.toLowerCase().includes(f) ? "" : "none";
  //     });
  //   });
  //   dh('a[href^="#"]', function (e) {
  //     const h = this.getAttribute("href");
  //     if (h && h.length > 1) {
  //       const t = document.querySelector(h);
  //       if (t) {
  //         e.preventDefault();
  //         t.scrollIntoView({ behavior: "smooth" });
  //       }
  //     }
  //   });
  //   return () => hdls.forEach((f) => f());
  // });

  useEffect(() => {
    getProgramCategories().then(setProgramCategories).catch(console.error);
  }, []);

  useEffect(() => {
    getPrograms(selectedProgramCategory).then(setPrograms).catch(console.error);
  }, [selectedProgramCategory]);

  return (
    <div className="page active">
      <section className="section" style={{ paddingTop: "140px" }}>
        <div className="container">
          <div className="section-center reveal">
            <span className="section-label">Insights</span>
            <h2 className="section-title">Programs</h2>
            <p className="section-sub" style={{ maxWidth: "600px" }}>
              Explore practical perspectives on AI, marketing, business growth,
              career development, and the skills shaping tomorrow's
              opportunities.
            </p>
            <div
              className="hero-actions"
              style={{ justifyContent: "center", marginTop: "24px" }}
            >
              <a href="#" className="btn btn-primary btn-sm">
                Explore Articles{" "}
                <i
                  data-lucide="arrow-right"
                  style={{ width: "14px", height: "14px" }}
                ></i>
              </a>
              <a href="#" className="btn btn-outline btn-sm">
                Subscribe for Updates
              </a>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "center",
              margin: "40px 0 48px",
              cursor: "pointer",
            }}
          >
            <span
              className={
                selectedProgramCategory === ""
                  ? "nav-cta"
                  : "job-tag job-tag-new"
              }
              onClick={() => setSelectedProgramCategory("")}
            >
              All
            </span>

            {programCategories.map((cat) => (
              <span
                className={
                  selectedProgramCategory === cat.id ? "nav-cta" : "job-tag"
                }
                key={cat.id}
                onClick={() => setSelectedProgramCategory(cat.id)}
              >
                {cat.name}
              </span>
            ))}
          </div>

          <div className="blog-grid">
            {programs.map((program, index) => {
              const image =
                program._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

              const programCategory =
                program._embedded?.["wp:term"]?.[0]?.[0]?.name || "General";

              return (
                <Link
                  key={program.id}
                  to={`/programs/${program.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    className={`blog-card reveal reveal-d${(index % 3) + 1}`}
                  >
                    <div className="blog-img">
                      <img src={image} alt={program.title.rendered} />

                      <span className="blog-tag">{programCategory}</span>
                    </div>

                    <div className="blog-body">
                      <h4
                        dangerouslySetInnerHTML={{
                          __html: program.title.rendered,
                        }}
                      />

                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            program.excerpt?.rendered
                              ?.replace(/<[^>]+>/g, "")
                              ?.slice(0, 120) + "...",
                        }}
                      />

                      <div className="blog-meta">
                        <span>By TEONOX Team</span>
                        <span>—</span>
                        <span>
                          {new Date(program.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
