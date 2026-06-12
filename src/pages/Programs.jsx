import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from '../components/Icon.jsx';
import useScrollReveal from "../hooks/useScrollReveal.js";
import { decodeEntities } from "../utils/decode.js";

import { getPrograms, getProgramCategories } from "../api/wordpressApi";

export default function Programs() {
  const [selectedProgramCategory, setSelectedProgramCategory] = useState("");
  const [programs, setPrograms] = useState([]);
  const [programCategories, setProgramCategories] = useState([]);
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
      <section id="programs-page" className="section" style={{ paddingTop: "140px" }}>
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
                <Icon name="arrow-right" size={14} />
              </a>
              <a href="#" className="btn btn-outline btn-sm">
                Subscribe for Updates
              </a>
            </div>
          </div>

          <div className="prog-filters reveal">
            <button
              className={"prog-filter" + (selectedProgramCategory === "" ? " active" : "")}
              onClick={() => setSelectedProgramCategory("")}
              data-filter="all"
            >
              All
            </button>
            {programCategories.map((cat) => (
              <button
                key={cat.id}
                className={
                  "prog-filter" + (selectedProgramCategory === cat.id ? " active" : "")
                }
                onClick={() => setSelectedProgramCategory(cat.id)}
                data-filter={cat.slug}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="prog-grid">
            {programs.map((program, i) => {
              const image =
                program._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                "/assets/asset-023.jpg";
              return (
                <Link
                  key={program.id}
                  to={`/programs/${program.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className={`prog-card reveal reveal-d${(i % 3) + 1}`}>
                    <img
                      className="prog-card-img"
                      src={image}
                      alt={decodeEntities(
                        program.title.rendered?.replace(/<[^>]+>/g, ""),
                      )}
                    />
                    <div className="prog-card-top">
                      <h3
                        dangerouslySetInnerHTML={{
                          __html: program.title.rendered,
                        }}
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: "2",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      />
                    </div>
                    <div className="prog-card-meta">
                      <div className="prog-card-meta-item">
                        <p
                          style={{
                            opacity: "0.7",
                            fontSize: "0.72rem",
                            margin: "0",
                            lineHeight: "1.2",
                          }}
                        >
                          Duration
                        </p>
                        <div style={{ fontWeight: "600", fontSize: "0.85rem" }}>
                          {program.acf?.duration || "—"}
                        </div>
                      </div>
                      <div className="prog-card-meta-item">
                        <p
                          style={{
                            opacity: "0.7",
                            fontSize: "0.72rem",
                            margin: "0",
                            lineHeight: "1.2",
                          }}
                        >
                          Best For
                        </p>
                        <div style={{ fontWeight: "600", fontSize: "0.85rem" }}>
                          {decodeEntities(program.acf?.best_for) || "—"}
                        </div>
                      </div>
                    </div>
                    <p className="prog-card-desc">
                      {(() => {
                        const raw = program.acf?.card_description
                          ? program.acf.card_description
                          : program.excerpt?.rendered || "";
                        const clean = decodeEntities(
                          raw.replace(/<[^>]*>/g, ""),
                        );
                        const words = clean.split(" ");
                        return words.length > 12
                          ? words.slice(0, 12).join(" ") + "..."
                          : clean;
                      })()}
                    </p>
                    <span className="btn btn-outline btn-sm prog-card-cta">
                      View Program <Icon name="arrow-right" size={14} />
                    </span>
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


