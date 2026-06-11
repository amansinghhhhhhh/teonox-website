import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import useLucide from "../hooks/useLucide.js";
import useScrollReveal from "../hooks/useScrollReveal.js";
import useTypewriter from "../hooks/useTypewriter.js";
import {
  getBlogs,
  getPrograms,
  getProgramCategories,
} from "../api/wordpressApi";
import { decodeEntities } from "../utils/decode.js";
import emailjs from "@emailjs/browser";

const WEBHOOK =
  "https://script.google.com/macros/s/AKfycbwD25H1aTA5MzUXZvNjVOEPoBXNUl-QzFCNxwqwytC9_ysq1RUaLxHUwfWFAXO6jt4Mpw/exec";

export default function Home() {
  useLucide();
  useScrollReveal();
  useTypewriter();

  useEffect(() => {
    const hdls = [];
    const dh = (sel, fn) => {
      document.querySelectorAll(sel).forEach((el) => {
        el.addEventListener("click", fn);
        hdls.push(() => el.removeEventListener("click", fn));
      });
    };
    dh(".job-expandable-header", function () {
      const c = this.closest(".job-expandable");
      const b = c.querySelector(".job-expandable-body");
      const o = c.classList.contains("open");
      c.classList.toggle("open");
      if (b) b.style.display = o ? "none" : "";
    });
    dh(".faq-item", function () {
      this.classList.toggle("open");
    });
    dh('a[href^="#"]', function (e) {
      const h = this.getAttribute("href");
      if (h && h.length > 1) {
        const t = document.querySelector(h);
        if (t) {
          e.preventDefault();
          t.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
    // Guarantee particles
    var bg = document.getElementById("guaranteeParticles");
    if (bg) {
      for (var i = 0; i < 18; i++) {
        var p = document.createElement("div");
        p.className = "guarantee-particle";
        var s = Math.random() * 6 + 2;
        p.style.cssText =
          "width:" +
          s +
          "px;height:" +
          s +
          "px;left:" +
          Math.random() * 100 +
          "%;animation-duration:" +
          (Math.random() * 10 + 8) +
          "s;animation-delay:" +
          Math.random() * 8 +
          "s;";
        bg.appendChild(p);
      }
    }
    return () => hdls.forEach((f) => f());
  });

  const [homeBlogs, setHomeBlogs] = useState([]);
  const [heroSubmitted, setHeroSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [progCategories, setProgCategories] = useState([]);
  const [progFilter, setProgFilter] = useState("");

  const submitForm = async (formName, formEl, setSubmitted) => {
    const fd = new FormData(formEl);
    const fields = {};
    fd.forEach((value, key) => {
      fields[key] = value;
    });

    try {
      await fetch(WEBHOOK, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formName, fields }),
      });
    } catch {}

    formEl.reset();
    setSubmitted(true);
  };

  useEffect(() => {
    getBlogs()
      .then((data) => setHomeBlogs(data.slice(0, 3)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    getProgramCategories().then(setProgCategories).catch(console.error);
  }, []);

  useEffect(() => {
    getPrograms(progFilter).then(setPrograms).catch(console.error);
  }, [progFilter]);

  return (
    <div className="page active">
      <section className="hero">
        <div className="hero-bg">
          <video
            autoplay
            muted
            loop
            playsinline
            style={{
              position: "absolute",
              inset: "0",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: "0.5",
            }}
          >
            <source src="assets/asset-003.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-noise"></div>
        <div className="container">
          <div className="hero-split">
            <div
              className="hero-content"
              style={{ maxWidth: "100%", paddingRight: "20px" }}
            >
              <h1>
                <span id="typewriter"></span>
                <span className="cursor">|</span>
              </h1>
              <p className="hero-sub" style={{ maxWidth: "100%" }}>
                Learn new-age Digital Marketing, AI & Automation, Data Analytics
                and Sales & Business Development skills through experiential,
                industry-led learning.
              </p>
              <div className="hero-actions">
                <a href="programs.html" className="btn btn-primary">
                  Explore Programs
                  <i
                    data-lucide="arrow-right"
                    style={{ width: "16px", height: "16px" }}
                  ></i>
                </a>
                <a href="#contact" className="btn btn-outline">
                  <i
                    data-lucide="phone"
                    style={{ width: "16px", height: "16px" }}
                  ></i>
                  Speak to Our Team
                </a>
              </div>
            </div>
            <div className="hero-form-wrap">
              <div className="hero-form-inner">
                <div className="hero-form-title">Enquire Now</div>
                <p className="hero-form-sub">
                  Fill in your details and our team will reach out to you.
                </p>
                {heroSubmitted ? (
                  <div style={{ textAlign: "center", padding: "24px 0" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "var(--orange-grad)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 12px",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p
                      style={{
                        color: "var(--text)",
                        fontWeight: "600",
                        fontSize: "1rem",
                      }}
                    >
                      Thank you! We'll get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      submitForm(
                        "Home Hero Enquiry",
                        e.target,
                        setHeroSubmitted,
                      );
                    }}
                  >
                    <div className="field">
                      <input
                        type="text"
                        name="Full Name"
                        placeholder="Full Name"
                        required
                      />
                    </div>
                    <div className="field">
                      <input
                        type="email"
                        name="Email Address"
                        placeholder="Email Address"
                        required
                      />
                    </div>
                    <div className="field">
                      <input
                        type="tel"
                        name="Phone Number"
                        placeholder="Phone Number"
                      />
                    </div>
                    <div className="field">
                      <input
                        type="text"
                        name="Interested In"
                        placeholder="I'm interested in"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ justifyContent: "center" }}
                    >
                      Submit{" "}
                      <i
                        data-lucide="arrow-right"
                        style={{ width: "16px", height: "16px" }}
                      ></i>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="programs-home">
        <div className="container">
          <div className="reveal" style={{ marginBottom: "48px" }}>
            <h2 className="section-title">Our Programs</h2>
            <p className="section-sub">
              Practical, immersive programs designed to help you build skills
              that businesses actually hire for.
            </p>
          </div>
          <div className="prog-filters reveal">
            <button
              className={"prog-filter" + (progFilter === "" ? " active" : "")}
              onClick={() => setProgFilter("")}
              data-filter="all"
            >
              All
            </button>
            {progCategories.map((cat) => (
              <button
                key={cat.id}
                className={
                  "prog-filter" + (progFilter === cat.id ? " active" : "")
                }
                onClick={() => setProgFilter(cat.id)}
                data-filter={cat.slug}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="prog-grid">
            {programs.map((program, i) => {
              const image =
                program._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
              return (
                <Link
                  key={program.id}
                  to={`/programs/${program.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className={`prog-card reveal reveal-d${(i % 3) + 1}`}>
                    {image && (
                      <img
                        className="prog-card-img"
                        src={image}
                        alt={decodeEntities(
                          program.title.rendered?.replace(/<[^>]+>/g, ""),
                        )}
                      />
                    )}
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
                          {program.acf?.best_for || "—"}
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
                      View Program{" "}
                      <i
                        data-lucide="arrow-right"
                        style={{ width: "14px", height: "14px" }}
                      ></i>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="reveal" style={{ marginTop: "56px" }}>
            <div className="guarantee-section" style={{ padding: 0 }}>
              <div className="guarantee-glow-blob"></div>
              <div
                className="guarantee-particle-bg"
                id="guaranteeParticles"
              ></div>
              <div className="gc-wrapper">
                <div className="gc-card">
                  <div className="gc-left">
                    <div className="gc-badge">
                      <span className="gc-badge-dot"></span>Placement Guarantee
                    </div>
                    <span className="gc-percent">100%</span>
                    <span className="gc-percent-label">Job Placement</span>
                  </div>
                  <div className="gc-right">
                    <div className="gc-shield-wrap">
                      <svg
                        className="gc-shield"
                        viewBox="0 0 84 84"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#ea580c" />
                            <stop offset="100%" stopColor="#fdba74" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M42 7L13 20V41C13 57 26 70 42 77C58 70 71 57 71 41V20L42 7Z"
                          fill="url(#sg)"
                          opacity="0.15"
                        />
                        <path
                          d="M42 7L13 20V41C13 57 26 70 42 77C58 70 71 57 71 41V20L42 7Z"
                          stroke="url(#sg)"
                          strokeWidth="2"
                          fill="none"
                        />
                        <path
                          d="M29 42L38 51L55 34"
                          stroke="url(#sg)"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="gc-content">
                      <div className="gc-title">
                        We're So Confident, We Guarantee It.
                      </div>
                      <p className="gc-desc">
                        Get hired after successful completion or{" "}
                        <span className="gc-highlight">
                          receive your fee back.*
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section approach-section" id="approach">
        <div className="container">
          <div className="reveal">
            <span className="section-label">The Teonox Approach</span>
            <h2 className="section-title">Learn. Apply. Lead.</h2>
            <p className="section-sub">
              Brands see what you have built, solved and delivered. Companies
              don't ask "What did you study?" They ask "Can you execute & create
              impact?"
            </p>
          </div>
          <div className="approach-grid">
            <div className="approach-card reveal reveal-delay-1">
              <div className="approach-card-img">
                <img src="assets/asset-008.jpg" alt="Learning" />
                <span className="approach-step">01</span>
              </div>
              <div className="approach-card-body">
                <div className="approach-icon">
                  <i
                    data-lucide="book-open"
                    style={{ width: "20px", height: "20px" }}
                  ></i>
                </div>
                <h3>Learn</h3>
                <p>
                  Understand what actually matters — not just the skills, the
                  mindset. Practical concepts, modern tools, and real-world
                  thinking that makes you stand out.
                </p>
              </div>
            </div>
            <div className="approach-card reveal reveal-delay-2">
              <div className="approach-card-img">
                <img src="assets/asset-009.jpg" alt="Applying skills" />
                <span className="approach-step">02</span>
              </div>
              <div className="approach-card-body">
                <div className="approach-icon">
                  <i
                    data-lucide="briefcase"
                    style={{ width: "20px", height: "20px" }}
                  ></i>
                </div>
                <h3>Apply</h3>
                <p>
                  Be a part of the systems and workflows that create an impact.
                  You'll work on live projects, run real campaigns, use AI
                  tools, dig into data, and get feedback that makes you better.
                </p>
              </div>
            </div>
            <div className="approach-card reveal reveal-delay-3">
              <div className="approach-card-img">
                <img src="assets/asset-010.jpg" alt="Leadership" />
                <span className="approach-step">03</span>
              </div>
              <div className="approach-card-body">
                <div className="approach-icon">
                  <i
                    data-lucide="trending-up"
                    style={{ width: "20px", height: "20px" }}
                  ></i>
                </div>
                <h3>Lead</h3>
                <p>
                  Execution is just the start. You'll develop the strategic
                  thinking, communication edge, and ownership mindset to drive
                  outcomes in teams, with clients, or in your own venture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="img-strip">
        <img src="strip image/01.jpg" alt="" />
        <div className="img-strip-overlay"></div>
      </div>

      <section className="section bento-section">
        <div className="container">
          <div className="reveal">
            <span className="section-label">The Learning Experience</span>
            <h2 className="section-title">The TEONOX Learning Experience</h2>
            <p className="section-sub">
              No lectures. No theory dumps. Just real work, real tools, real
              feedback.
            </p>
          </div>
          <div className="bento-grid">
            <div className="bento-item reveal reveal-delay-1">
              <div className="bento-img">
                <img src="assets/asset-012.jpg" alt="Live Brand Projects" />
                <div className="bento-chip">
                  <i
                    data-lucide="briefcase"
                    style={{ width: "13px", height: "13px" }}
                  ></i>
                  Live Projects
                </div>
              </div>
              <div className="bento-body">
                <h4>
                  <span className="bento-icon">
                    <i
                      data-lucide="briefcase"
                      style={{ width: "16px", height: "16px" }}
                    ></i>
                  </span>
                  Live Brand Projects
                </h4>
                <p>
                  Work on real business challenges, campaigns, and growth
                  initiatives that build practical experience.
                </p>
              </div>
            </div>
            <div className="bento-item reveal reveal-delay-2">
              <div className="bento-img">
                <img src="assets/asset-013.jpg" alt="AI & Future Labs" />
                <div className="bento-chip">
                  <i
                    data-lucide="cpu"
                    style={{ width: "13px", height: "13px" }}
                  ></i>
                  AI & Future
                </div>
              </div>
              <div className="bento-body">
                <h4>
                  <span className="bento-icon">
                    <i
                      data-lucide="cpu"
                      style={{ width: "16px", height: "16px" }}
                    ></i>
                  </span>
                  AI & Future Labs
                </h4>
                <p>
                  Learn how to use AI tools, automation platforms, and emerging
                  technologies that modern businesses rely on.
                </p>
              </div>
            </div>
            <div className="bento-item reveal reveal-delay-1">
              <div className="bento-img">
                <img src="assets/asset-014.jpg" alt="Industry Mentorship" />
                <div className="bento-chip">
                  <i
                    data-lucide="users"
                    style={{ width: "13px", height: "13px" }}
                  ></i>
                  Mentorship
                </div>
              </div>
              <div className="bento-body">
                <h4>
                  <span className="bento-icon">
                    <i
                      data-lucide="users"
                      style={{ width: "16px", height: "16px" }}
                    ></i>
                  </span>
                  Industry Mentorship
                </h4>
                <p>
                  Learn from professionals, founders, and practitioners who
                  bring real-world insights into the classroom.
                </p>
              </div>
            </div>
            <div className="bento-item reveal reveal-delay-2">
              <div className="bento-img">
                <img src="assets/asset-015.jpg" alt="Business Simulations" />
                <div className="bento-chip">
                  <i
                    data-lucide="monitor"
                    style={{ width: "13px", height: "13px" }}
                  ></i>
                  Simulations
                </div>
              </div>
              <div className="bento-body">
                <h4>
                  <span className="bento-icon">
                    <i
                      data-lucide="monitor"
                      style={{ width: "16px", height: "16px" }}
                    ></i>
                  </span>
                  Business Simulations
                </h4>
                <p>
                  Solve realistic business scenarios, make decisions, and
                  experience how companies operate.
                </p>
              </div>
            </div>
            <div className="bento-item reveal reveal-delay-3">
              <div className="bento-img">
                <img src="assets/asset-016.jpg" alt="Agency Exposure" />
                <div className="bento-chip">
                  <i
                    data-lucide="building-2"
                    style={{ width: "13px", height: "13px" }}
                  ></i>
                  Agency
                </div>
              </div>
              <div className="bento-body">
                <h4>
                  <span className="bento-icon">
                    <i
                      data-lucide="building-2"
                      style={{ width: "16px", height: "16px" }}
                    ></i>
                  </span>
                  Agency & Industry Exposure
                </h4>
                <p>
                  Gain first-hand exposure to agencies, startups, and
                  growth-focused organizations through visits and interactions.
                </p>
              </div>
            </div>
            <div className="bento-item reveal reveal-delay-1">
              <div className="bento-img">
                <img
                  src="assets/asset-018.jpg"
                  alt="Portfolio & Career Development"
                />
                <div className="bento-chip">
                  <i
                    data-lucide="folder"
                    style={{ width: "13px", height: "13px" }}
                  ></i>
                  Portfolio
                </div>
              </div>
              <div className="bento-body">
                <h4>
                  <span className="bento-icon">
                    <i
                      data-lucide="folder"
                      style={{ width: "16px", height: "16px" }}
                    ></i>
                  </span>
                  Portfolio & Career Development
                </h4>
                <p>
                  Build projects, presentations, and case studies that showcase
                  your skills to future employers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="reveal">
              <span className="section-label">About TEONOX</span>
              <h2 className="section-title">
                12+ Years in Industry Led Us Here.
              </h2>
              <p className="section-sub">
                TEONOX wasn't created in a classroom.
              </p>
              <p className="section-sub" style={{ marginTop: "16px" }}>
                For over 12 years, A2 Digital has partnered with businesses to
                help them grow in an increasingly digital world. Along the way,
                we hired fresh graduates, trained teams, worked with ambitious
                professionals, and helped organizations scale.
              </p>
              <p className="section-sub" style={{ marginTop: "16px" }}>
                And we kept noticing the same pattern.
              </p>
              <p className="section-sub" style={{ marginTop: "16px" }}>
                Many candidates had qualifications. Few had practical business
                exposure.
              </p>
              <p className="section-sub" style={{ marginTop: "16px" }}>
                Most understood concepts. Very few understood execution.
              </p>
              <p className="section-sub" style={{ marginTop: "16px" }}>
                TEONOX is our response to that challenge.
              </p>
              <p className="section-sub" style={{ marginTop: "16px" }}>
                A learning ecosystem designed by practitioners who have spent
                years building businesses, solving growth problems, and
                developing teams.
              </p>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="about-img-wrap">
                <img src="assets/asset-017.jpg" alt="Team at work" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="career-paths-home">
        <div className="container">
          <div className="reveal" style={{ marginBottom: "36px" }}>
            <span className="section-label">Career Paths</span>
            <h3
              style={{
                fontFamily: "var(--font-head)",
                fontSize: "clamp(1.6rem,3vw,2.4rem)",
                fontWeight: "800",
                letterSpacing: "-0.03em",
                color: "var(--text)",
                marginTop: "12px",
                lineHeight: "1.1",
              }}
            >
              Where You'll{" "}
              <em
                style={{
                  fontStyle: "normal",
                  background: "var(--orange-grad)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Go From Here
              </em>
            </h3>
          </div>
          <div className="career-grid reveal">
            <div className="career-box">
              <h4>Career Roles</h4>
              <ul className="career-list">
                <li>
                  <i data-lucide="megaphone"></i>Digital Marketing Executive
                </li>
                <li>
                  <i data-lucide="trending-up"></i>Growth Associate
                </li>
                <li>
                  <i data-lucide="bar-chart-3"></i>Performance Marketer
                </li>
                <li>
                  <i data-lucide="pie-chart"></i>Business Analyst
                </li>
                <li>
                  <i data-lucide="handshake"></i>Sales & Growth Associate
                </li>
                <li>
                  <i data-lucide="cpu"></i>AI Operations Associate
                </li>
                <li>
                  <i data-lucide="file-text"></i>Content Strategist
                </li>
              </ul>
            </div>
            <div className="career-box">
              <h4>Industries</h4>
              <ul className="career-list">
                <li>
                  <i data-lucide="rocket"></i>Startups
                </li>
                <li>
                  <i data-lucide="building-2"></i>Agencies
                </li>
                <li>
                  <i data-lucide="cloud"></i>SaaS Companies
                </li>
                <li>
                  <i data-lucide="shopping-cart"></i>E-commerce
                </li>
                <li>
                  <i data-lucide="briefcase"></i>Consulting
                </li>
                <li>
                  <i data-lucide="monitor"></i>Media & Technology
                </li>
              </ul>
              <div className="outcome-box">
                <p>
                  You don't just become job-ready. You become{" "}
                  <em>business-ready</em>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="container">
          <div className="work-grid">
            <div className="reveal">
              <span className="section-label">Work With Us</span>
              <h2 className="section-title">
                Work With TEONOX. Shape the Next Generation of Business Leaders.
              </h2>
              <p className="section-sub">
                We collaborate with industry professionals who believe education
                should create impact, not just certificates.
              </p>
              <ul className="work-benefits">
                <li>
                  <i data-lucide="check"></i>Business-first learning environment
                </li>
                <li>
                  <i data-lucide="check"></i>Premium learner audience
                </li>
                <li>
                  <i data-lucide="check"></i>Long-term collaboration mindset
                </li>
                <li>
                  <i data-lucide="check"></i>Freedom to teach real-world
                  thinking
                </li>
              </ul>
              <div
                style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
              ></div>
            </div>
            <div className="reveal reveal-delay-2">
              <div className="work-img-wrap">
                <img src="assets/asset-018.jpg" alt="Trainer speaking" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="img-strip">
        <img src="strip image/02.jpg" alt="" />
        <div className="img-strip-overlay"></div>
      </div>

      <section className="section hire-section" id="hire">
        <div className="container">
          <div className="hire-header reveal">
            <div className="hire-header-left">
              <span className="section-label">Hire From Us</span>
              <h2 className="section-title">
                Hire Business-Ready Talent.
                <br />
                Not Just Certified Candidates.
              </h2>
              <p className="section-sub">
                TEONOX learners are trained through practical projects, industry
                exposure, AI-powered workflows, and real business challenges —
                helping them bring confidence, adaptability, and
                execution-focused thinking to modern workplaces.
              </p>
            </div>
            <div className="hire-header-right">
              <a
                href="#contact"
                className="btn btn-primary"
                style={{ marginBottom: "12px", display: "flex" }}
              >
                Request Talent{" "}
                <i
                  data-lucide="arrow-right"
                  style={{ width: "16px", height: "16px" }}
                ></i>
              </a>
              <a href="#contact" className="hire-cta-btn">
                <i
                  data-lucide="phone"
                  style={{ width: "16px", height: "16px" }}
                ></i>{" "}
                Speak to Our Team
              </a>
            </div>
          </div>

          <div className="reveal" style={{ marginBottom: "20px" }}>
            <span className="section-label">Who You Can Hire From TEONOX</span>
            <h3
              style={{
                fontFamily: "var(--font-head)",
                fontSize: "clamp(1.3rem,2.5vw,2rem)",
                fontWeight: "800",
                letterSpacing: "-0.03em",
                color: "var(--text)",
                marginTop: "8px",
                lineHeight: "1.1",
              }}
            >
              Trained for Impact. Ready to Contribute.
            </h3>
          </div>
          <div className="hire-grid reveal">
            <div className="hire-card reveal-delay-1">
              <div className="hire-card-icon">
                <i
                  data-lucide="megaphone"
                  style={{ width: "22px", height: "22px" }}
                ></i>
              </div>
              <h4>Digital Marketing & Growth Professionals</h4>
            </div>
            <div className="hire-card reveal-delay-2">
              <div className="hire-card-icon">
                <i
                  data-lucide="bar-chart-4"
                  style={{ width: "22px", height: "22px" }}
                ></i>
              </div>
              <h4>AI & Business Analytics Talent</h4>
            </div>
            <div className="hire-card reveal-delay-3">
              <div className="hire-card-icon">
                <i
                  data-lucide="phone"
                  style={{ width: "22px", height: "22px" }}
                ></i>
              </div>
              <h4>Sales & Revenue Operations Professionals</h4>
            </div>
            <div className="hire-card reveal-delay-4">
              <div className="hire-card-icon">
                <i
                  data-lucide="rocket"
                  style={{ width: "22px", height: "22px" }}
                ></i>
              </div>
              <h4>Full-Stack Business Growth Professionals</h4>
            </div>
          </div>

          <div className="hire-why reveal">
            <div className="hire-why-title">Why Hire From TEONOX</div>
            <div className="hire-why-grid">
              <div className="hire-why-item">
                <div className="hire-why-icon">
                  <i
                    data-lucide="briefcase"
                    style={{ width: "18px", height: "18px" }}
                  ></i>
                </div>
                <div>
                  <h5>Trained on real business scenarios</h5>
                  <p>
                    Learners work on actual brand projects, live campaigns, and
                    business challenges — not textbook theory.
                  </p>
                </div>
              </div>
              <div className="hire-why-item">
                <div className="hire-why-icon">
                  <i
                    data-lucide="cpu"
                    style={{ width: "18px", height: "18px" }}
                  ></i>
                </div>
                <div>
                  <h5>AI & data-first mindset</h5>
                  <p>
                    Every professional is trained to leverage AI tools,
                    analytics platforms, and data-driven decision making.
                  </p>
                </div>
              </div>
              <div className="hire-why-item">
                <div className="hire-why-icon">
                  <i
                    data-lucide="message-square"
                    style={{ width: "18px", height: "18px" }}
                  ></i>
                </div>
                <div>
                  <h5>Strong communication & sales</h5>
                  <p>
                    Built with soft skills, confidence, and business acumen
                    needed to thrive in client-facing roles.
                  </p>
                </div>
              </div>
              <div className="hire-why-item">
                <div className="hire-why-icon">
                  <i
                    data-lucide="target"
                    style={{ width: "18px", height: "18px" }}
                  ></i>
                </div>
                <div>
                  <h5>Outcome-driven execution</h5>
                  <p>
                    Hire people who think in terms of impact, metrics, and
                    results — not just task completion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section blog-section" id="blog">
        <div className="container">
          <div
            className="reveal"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "0",
            }}
          >
            <div>
              <span className="section-label">Insights</span>
              <h2 className="section-title">Blog / Insights</h2>
              <p className="section-sub">
                Business growth, AI in decision making, marketing & sales
                psychology, and career advice.
              </p>
            </div>
            <Link
              to="/blog"
              className="btn btn-outline"
              style={{ flexShrink: "0", marginBottom: "8px" }}
            >
              View All{" "}
              <i
                data-lucide="arrow-right"
                style={{ width: "14px", height: "14px" }}
              ></i>
            </Link>
          </div>
          <div className="blog-grid">
            {homeBlogs.map((blog, index) => {
              const image =
                blog._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                "assets/asset-019.webp";
              const category =
                blog._embedded?.["wp:term"]?.[0]?.[0]?.name || "General";
              const imageAlt = decodeEntities(
                blog.title.rendered?.replace(/<[^>]+>/g, ""),
              );
              const excerpt =
                (blog.excerpt?.rendered
                  ?.replace(/<[^>]+>/g, "")
                  ?.slice(0, 120) || "") + "...";

              return (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <article
                    className={`blog-card reveal reveal-d${(index % 3) + 1}`}
                  >
                    <div className="blog-img">
                      <img src={image} alt={imageAlt} />
                      <span className="blog-tag">{category}</span>
                    </div>
                    <div className="blog-body">
                      <h4
                        dangerouslySetInnerHTML={{
                          __html: blog.title.rendered,
                        }}
                      />
                      <p>{decodeEntities(excerpt)}</p>
                      <div className="blog-meta">
                        <span>By TEONOX Team</span>
                        <span>—</span>
                        <span>{new Date(blog.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="img-strip">
        <img src="strip image/03.jpg" alt="" />
        <div className="img-strip-overlay"></div>
      </div>

      <section className="section contact-section" id="contact">
        <div className="container">
          <div className="reveal" style={{ marginBottom: "40px" }}>
            <span className="section-label">Contact</span>
            <h2 className="section-title">Let's Talk About Your Growth</h2>
            <p className="section-sub">
              Ready to build skills that matter? Fill out the form and our team
              will reach out shortly.
            </p>
          </div>
          <div
            className="contact-wrap reveal"
            style={{ gridTemplateColumns: "1fr" }}
          >
            <div className="contact-form-wrap">
              {contactSubmitted ? (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "var(--orange-grad)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 12px",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p
                    style={{
                      color: "var(--text)",
                      fontWeight: "600",
                      fontSize: "1rem",
                    }}
                  >
                    Thank you! We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitForm("Home Contact", e.target, setContactSubmitted);
                  }}
                >
                  <div className="form-row">
                    <div className="field">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="Full Name"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="field">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="Email Address"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="field">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="Phone Number"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div className="field">
                      <label>I'm interested in</label>
                      <select name="Interested In">
                        <option value="">Select an option</option>
                        <option value="Joining the Program">
                          Joining the Program
                        </option>
                        <option value="Hiring Talent">Hiring Talent</option>
                        <option value="Partnering with Teonox">
                          Partnering with Teonox
                        </option>
                        <option value="Applying as Trainer">
                          Applying as Trainer
                        </option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label>Your Message</label>
                    <textarea
                      name="Your Message"
                      placeholder="Tell us about yourself or what you're looking for..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ justifyContent: "center" }}
                  >
                    Send Message{" "}
                    <i
                      data-lucide="send"
                      style={{ width: "16px", height: "16px" }}
                    ></i>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
