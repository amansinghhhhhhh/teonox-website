import { useEffect, useState } from "react";
import Icon from '../components/Icon.jsx';
import useScrollReveal from "../hooks/useScrollReveal.js";
import { getPrograms } from "../api/wordpressApi";
import { decodeEntities } from "../utils/decode.js";

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  useScrollReveal();

  useEffect(() => {
    let cancelled = false;
    getPrograms()
      .then((data) => {
        if (!cancelled) {
          setPrograms(data);
          setLoading(false);
        }
      })
      .catch(console.error);
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="page active">
      <section id="programs-page" className="section" style={{ paddingTop: "140px" }}>
        <div className="container">
          <div className="section-center reveal">
            <span className="section-label">Our Programs</span>
            <h2 className="section-title">Programs</h2>
            <p className="section-sub" style={{ maxWidth: "600px" }}>
              Explore practical perspectives on AI, marketing, business growth,
              career development, and the skills shaping tomorrow's opportunities.
            </p>
          </div>

          {loading ? (
            <div style={{ minHeight: "40vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="preloader-inner">
                <img src="/assets/asset-001.png" alt="TEONOX" className="preloader-icon" />
                <div className="preloader-ring"></div>
              </div>
            </div>
          ) : (
          <div className="prog-grid">
            {programs.map((prog, i) => {
              const a = prog.acf || {};
              const imgUrl = prog._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/assets/asset-023.jpg";
              const slug = prog.slug;
              return (
              <a
                key={prog.id}
                href={`/program/${slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className={`prog-card reveal reveal-d${(i % 3) + 1}`}>
                  <img className="prog-card-img" src={imgUrl} alt={decodeEntities(prog.title?.rendered)} />
                  <div className="prog-card-body">
                    <h3>{decodeEntities(prog.title?.rendered)}</h3>
                    <p
                      className="prog-card-desc"
                    >
                      {decodeEntities(a.program_short_description)}
                    </p>
                    <div className="prog-card-meta">
                      {a.duration && (
                        <span className="prog-card-meta-item">
                          <strong>{decodeEntities(a.duration)}</strong> Duration
                        </span>
                      )}
                      {a.best_for && (
                        <span className="prog-card-meta-item">
                          <strong>{decodeEntities(a.best_for)}</strong> Eligibility
                        </span>
                      )}
                      {a.mode_on && (
                        <span className="prog-card-meta-item">
                          <strong>{decodeEntities(a.mode_on)}</strong> Mode
                        </span>
                      )}
                    </div>
                    <span className="btn btn-outline btn-sm prog-card-cta">
                      View Program <Icon name="arrow-right" size={14} />
                    </span>
                  </div>
                </div>
              </a>
              );
            })}
          </div>
          )}
        </div>
      </section>
    </div>
  );
}


