import { useEffect } from "react";
import Icon from '../components/Icon.jsx';
import useScrollReveal from "../hooks/useScrollReveal.js";

const programs = [
  {
    img: "/assets/asset-023.jpg",
    title: "Business Digital Marketing With AI",
    desc: "Master digital marketing from the ground up &mdash; SEO, paid ads, social media, analytics, AI tools, and business development.",
    meta: [
      { value: "6 Months", label: "Duration" },
      { value: "12th Passed, Graduates &amp; Working Professionals", label: "Eligibility" },
      { value: "On Campus, Pune", label: "Mode" },
    ],
    href: "/program-bdm.html",
  },
  {
    img: "/assets/asset-004.jpg",
    title: "Specialization in Search Engine Optimization",
    desc: "Go deep into SEO &mdash; technical audits, link building, and AI search visibility.",
    meta: [
      { value: "3 Months", label: "Duration" },
      { value: "12th Passed, Graduates &amp; Working Professionals", label: "Eligibility" },
      { value: "On Campus, Pune", label: "Mode" },
    ],
    href: "/program-seo.html",
  },
  {
    img: "/assets/asset-005.jpg",
    title: "Specialization in Social Media Marketing",
    desc: "Master organic growth and community building across every major social media platform.",
    meta: [
      { value: "3 Months", label: "Duration" },
      { value: "12th Passed, Graduates &amp; Working Professionals", label: "Eligibility" },
      { value: "On Campus, Pune", label: "Mode" },
    ],
    href: "/program-social-media.html",
  },
  {
    img: "/assets/asset-006.jpg",
    title: "Specialization in Performance Marketing",
    desc: "Run and scale paid campaigns across Google, Meta &amp; LinkedIn like a performance marketer.",
    meta: [
      { value: "3 Months", label: "Duration" },
      { value: "12th Passed, Graduates &amp; Working Professionals", label: "Eligibility" },
      { value: "On Campus, Pune", label: "Mode" },
    ],
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
                    <h3>{prog.title}</h3>
                    <p
                      className="prog-card-desc"
                      dangerouslySetInnerHTML={{ __html: prog.desc }}
                    />
                    <div className="prog-card-meta">
                      {prog.meta.map((m, j) => (
                        <span key={j} className="prog-card-meta-item">
                          <strong>{m.value}</strong>
                          {m.label}
                        </span>
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


