import { useEffect } from "react";
import Icon from '../components/Icon.jsx';
import useScrollReveal from "../hooks/useScrollReveal.js";

const programs = [
  {
    img: "/assets/asset-023.jpg",
    type: "Foundation Program",
    typeColor: "#ff5c1a",
    title: "Business Digital Marketing With AI",
    desc: "Master digital marketing from the ground up &mdash; SEO, paid ads, social media, analytics, AI tools, and business development.",
    meta: ["6 Months Duration", "12th Passed, Graduates &amp; Working Professionals", "On Campus, Pune"],
    href: "/program-bdm.html",
  },
  {
    img: "/assets/asset-004.jpg",
    type: "Specialization",
    typeColor: "#22c55e",
    title: "Specialization in Search Engine Optimization",
    desc: "Go deep into SEO &mdash; technical audits, link building, and AI search visibility.",
    meta: ["3 Months Duration", "12th Passed, Graduates &amp; Working Professionals", "On Campus, Pune"],
    href: "/program-seo.html",
  },
  {
    img: "/assets/asset-005.jpg",
    type: "Specialization",
    typeColor: "#a855f7",
    title: "Specialization in Social Media Marketing",
    desc: "Master organic growth and community building across every major social media platform.",
    meta: ["3 Months Duration", "12th Passed, Graduates &amp; Working Professionals", "On Campus, Pune"],
    href: "/program-social-media.html",
  },
  {
    img: "/assets/asset-006.jpg",
    type: "Specialization",
    typeColor: "#ff5c1a",
    title: "Specialization in Performance Marketing",
    desc: "Run and scale paid campaigns across Google, Meta &amp; LinkedIn like a performance marketer.",
    meta: ["3 Months Duration", "12th Passed, Graduates &amp; Working Professionals", "On Campus, Pune"],
    href: "/program-performance.html",
  },
];

export default function Programs() {
  useScrollReveal();

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

          <div className="prog-grid">
            {programs.map((prog, i) => (
              <a
                key={i}
                href={prog.href}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className={`prog-card reveal reveal-d${(i % 3) + 1}`}>
                  <img className="prog-card-img" src={prog.img} alt={prog.title} />
                  <div className="prog-card-body">
                    <div className="prog-card-top">
                      <span
                        className="prog-card-type"
                        style={{
                          background: `${prog.typeColor}26`,
                          color: prog.typeColor,
                          borderColor: `${prog.typeColor}40`,
                        }}
                      >
                        {prog.type}
                      </span>
                      <h3>{prog.title}</h3>
                    </div>
                    <p
                      className="prog-card-desc"
                      dangerouslySetInnerHTML={{ __html: prog.desc }}
                    />
                    <div className="prog-card-meta">
                      {prog.meta.map((m, j) => (
                        <span key={j} className="prog-card-meta-item" dangerouslySetInnerHTML={{ __html: m }} />
                      ))}
                    </div>
                    <span className="btn btn-outline btn-sm prog-card-cta">
                      View Program <Icon name="arrow-right" size={14} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


