import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";
import { decodeEntities } from "../utils/decode.js";
import { getProgramBySlug, getMediaUrl } from "../api/wordpressApi";

export default function Program_Details() {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [careerImgUrls, setCareerImgUrls] = useState({});
  useScrollReveal();

  useEffect(() => {
    let cancelled = false;
    getProgramBySlug(slug)
      .then(async (data) => {
        const paths = data?.acf?.where_this_program_can_take_you || [];
        const imgIds = [
          ...new Set(
            paths.map((p) => p.career_path_card_image).filter(Boolean),
          ),
        ];
        let imgMap = {};
        if (imgIds.length) {
          const urls = await Promise.all(
            imgIds.map((id) => getMediaUrl(id).catch(() => null)),
          );
          imgIds.forEach((id, i) => {
            imgMap[id] = urls[i];
          });
        }
        if (!cancelled) {
          setProgram(data);
          setCareerImgUrls(imgMap);
          setLoading(false);
        }
      })
      .catch(console.error);
    return () => {
      cancelled = true;
    };
  }, [slug]);

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
    dh(".prog-filter", function () {
      document
        .querySelectorAll(".prog-filter")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      const f = this.dataset.filter;
      document.querySelectorAll(".prog-card").forEach((c) => {
        if (f === "all") {
          c.style.display = "";
          return;
        }
        c.style.display = c.textContent.toLowerCase().includes(f) ? "" : "none";
      });
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
    return () => hdls.forEach((f) => f());
  });

  if (loading || !program) {
    return (
      <div className="page active">
        <section className="section" style={{ paddingTop: "140px" }}>
          <div
            className="container"
            style={{
              minHeight: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Loading...
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page active">
      <section className="section" style={{ paddingTop: "140px" }}>
        <div className="container">
          {/* Banner */}
          <div className="pg-hero">
            <div className="pg-hero-content">
              <h1>{decodeEntities(program.acf.hero_heading)}</h1>
              <div className="pg-hero-meta">
                <div className="pg-hero-meta-item">
                  <Icon name="clock" />
                  Duration:{" "}
                  <strong>{decodeEntities(program.acf.duration)}</strong>
                </div>
                <div className="pg-hero-meta-divider"></div>
                <div className="pg-hero-meta-item">
                  <Icon name="graduation-cap" />
                  Best For:{" "}
                  <strong>{decodeEntities(program.acf.best_for)}</strong>
                </div>
              </div>
              <p className="pg-hero-sub">
                <strong>{decodeEntities(program.acf.hero_description)}</strong>
              </p>
              <p className="pg-hero-desc">
                {decodeEntities(program.acf.card_description)}
              </p>
              <div className="pg-hero-actions">
                <a
                  href={program.acf.brochure_url}
                  className="btn btn-outline btn-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Brochure <Icon name="download" size={14} />
                </a>
                <a
                  href={program.acf.consultation_url}
                  className="btn btn-outline btn-sm"
                  style={{
                    borderColor: "var(--orange)",
                    color: "var(--orange)",
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Career Consultation <Icon name="calendar" size={14} />
                </a>
              </div>
            </div>
            <div className="pg-hero-visual">
              <div className="pg-hero-glow"></div>
              <div className="pg-hero-img-wrap">
                <img
                  src={
                    program._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                    "/assets/asset-023.jpg"
                  }
                  alt={decodeEntities(program.title?.rendered) || "Program"}
                />
              </div>
            </div>
          </div>

          {/* Intro */}
          <div className="pg-intro-wrap reveal">
            <div className="pg-intro-grid">
              <div className="pg-intro">
                <div className="pg-intro-label">
                  <span></span>
                  Introduction
                </div>
                <h2>
                  More Than a Course.
                  <br />A <em>Business Growth Ecosystem.</em>
                </h2>
                <p className="pg-intro-text">
                  Most programs focus on teaching tools. Businesses hire people
                  who can{" "}
                  <strong>
                    think, solve problems, communicate ideas, work with data,
                    leverage AI, and drive outcomes.
                  </strong>
                </p>
                <div
                  className="pg-intro-highlight"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <Icon name="quote" size={20} />
                  <span>
                    TEONOX was created to help bridge the gap between{" "}
                    <strong style={{ color: "var(--text)" }}>
                      education and execution.
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Designed for Ambitious Learners title */}
          <div className="reveal" style={{ marginTop: "80px" }}>
            <span className="section-label">Who This Program Is For</span>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)" }}
            >
              Designed for Ambitious Learners
            </h2>
          </div>
          {/* Designed for Ambitious Learners title - card */}
          <div className="program-cards" style={{ marginTop: "32px" }}>
            <div className="program-card reveal reveal-d1">
              <div className="program-card-icon">
                <Icon name="graduation-cap" size={22} />
              </div>
              <h4>Students &amp; Fresh Graduates</h4>
              <p>Build practical skills before entering the workforce.</p>
            </div>
            <div className="program-card reveal reveal-d2">
              <div className="program-card-icon">
                <Icon name="trending-up" size={22} />
              </div>
              <h4>Young Professionals</h4>
              <p>Upgrade your capabilities and accelerate your growth.</p>
            </div>
            <div className="program-card reveal reveal-d3">
              <div className="program-card-icon">
                <Icon name="compass" size={22} />
              </div>
              <h4>Career Explorers</h4>
              <p>
                Gain exposure to modern business functions before choosing a
                specialization.
              </p>
            </div>
            <div className="program-card reveal reveal-d4">
              <div className="program-card-icon">
                <Icon name="lightbulb" size={22} />
              </div>
              <h4>Aspiring Entrepreneurs</h4>
              <p>
                Understand how marketing, sales, analytics, and AI drive
                business growth.
              </p>
            </div>
          </div>
        </div>

        {/* Piller */}
        <section className="cp-section">
          <div className="container" style={{ textAlign: "center" }}>
            <div className="reveal" style={{ marginBottom: "56px" }}>
              <span className="section-label">Curriculum Pillars</span>
              <h2
                className="section-title cp-header"
                style={{ fontSize: "clamp(1.6rem,3.2vw,2.8rem)" }}
              >
                The <em>5 Pillars</em> of the Program
              </h2>
            </div>
          </div>
          <div className="cp-track">
            <div className="cp-item reveal reveal-d1">
              <div className="cp-dot-wrap">
                <div className="cp-dot">
                  <Icon name="compass" />
                </div>
              </div>
              <span className="cp-name">Strategy</span>
              <p className="cp-desc">
                How businesses think, position, grow, and decide
              </p>
            </div>
            <div className="cp-item reveal reveal-d2">
              <div className="cp-dot-wrap">
                <div className="cp-dot">
                  <Icon name="rocket" />
                </div>
              </div>
              <span className="cp-name">Execution</span>
              <p className="cp-desc">
                Campaigns, projects, and operational workflows
              </p>
            </div>
            <div className="cp-item reveal reveal-d3">
              <div className="cp-dot-wrap">
                <div className="cp-dot">
                  <Icon name="target" />
                </div>
              </div>
              <span className="cp-name">Analytics</span>
              <p className="cp-desc">
                Data, reporting, and decision-making insights
              </p>
            </div>
            <div className="cp-item reveal reveal-d4">
              <div className="cp-dot-wrap">
                <div className="cp-dot">
                  <Icon name="cpu" />
                </div>
              </div>
              <span className="cp-name">AI</span>
              <p className="cp-desc">
                Modern AI for productivity and automation
              </p>
            </div>
            <div className="cp-item reveal reveal-d5">
              <div className="cp-dot-wrap">
                <div className="cp-dot">
                  <Icon name="handshake" />
                </div>
              </div>
              <span className="cp-name">Sales Mindset</span>
              <p className="cp-desc">
                Communication, persuasion, and influence
              </p>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="reveal" style={{ marginTop: "80px" }}>
            <span className="section-label">Why Choose TEONOX</span>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(1.5rem,3vw,2.6rem)" }}
            >
              The TEONOX Difference
            </h2>
          </div>

          <div className="skills-grid">
            {[
              {
                icon: "briefcase",
                title: "Business-First Curriculum",
                desc: "Designed around how businesses actually operate, not how textbooks are structured.",
              },
              {
                icon: "cpu",
                title: "Deep AI Integration",
                desc: "AI isn't a separate module. It is embedded throughout the learning experience.",
              },
              {
                icon: "play-circle",
                title: "Learn By Doing",
                desc: "Projects, simulations, workshops, business challenges, and practical execution.",
              },
              {
                icon: "users",
                title: "Industry-Led Learning",
                desc: "Learn from professionals who actively work with businesses and growth teams.",
              },
              {
                icon: "target",
                title: "Outcome Accountability",
                desc: "We focus on what you can build, present, solve, and execute—not just what you can memorize.",
              },
              {
                icon: "award",
                title: "Certificate of Excellence",
                desc: "Earn a credential that reflects real capability, not just attendance.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`skill-card reveal reveal-d${(i % 5) + 1}`}
                style={{ textAlign: "center" }}
              >
                <div
                  className="skill-card-icon"
                  style={{ margin: "0 auto 12px" }}
                >
                  <Icon name={item.icon} size={24} />
                </div>
                <div className="skill-card-title">{item.title}</div>
                <div className="skill-card-desc">{item.desc}</div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: "80px" }}>
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border2)",
                borderRadius: "var(--r3)",
                padding: "48px 40px",
              }}
            >
              <div style={{ marginBottom: "36px" }}>
                <span className="section-label">Outcomes</span>
                <h2
                  className="section-title"
                  style={{ fontSize: "clamp(1.5rem,3vw,2.6rem)" }}
                >
                  What You Graduate With
                </h2>
              </div>
              <div className="skills-grid graduate-grid">
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "rgba(255,92,26,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 10px",
                      color: "var(--orange)",
                    }}
                  >
                    <Icon name="briefcase" size={22} />
                  </div>
                  <h5
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: "700",
                      marginBottom: "4px",
                    }}
                  >
                    Practical Experience
                  </h5>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--text3)",
                      lineHeight: "1.5",
                    }}
                  >
                    Project work that demonstrates your capabilities.
                  </p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "rgba(59,130,246,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 10px",
                      color: "rgb(59,130,246)",
                    }}
                  >
                    <Icon name="globe" size={22} />
                  </div>
                  <h5
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: "700",
                      marginBottom: "4px",
                    }}
                  >
                    Industry Exposure
                  </h5>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--text3)",
                      lineHeight: "1.5",
                    }}
                  >
                    Understanding of how modern businesses function.
                  </p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "rgba(16,185,129,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 10px",
                      color: "rgb(16,185,129)",
                    }}
                  >
                    <Icon name="cpu" size={22} />
                  </div>
                  <h5
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: "700",
                      marginBottom: "4px",
                    }}
                  >
                    AI Readiness
                  </h5>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--text3)",
                      lineHeight: "1.5",
                    }}
                  >
                    Hands-on experience using modern AI tools and workflows.
                  </p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "rgba(245,158,11,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 10px",
                      color: "rgb(245,158,11)",
                    }}
                  >
                    <Icon name="message-circle" size={22} />
                  </div>
                  <h5
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: "700",
                      marginBottom: "4px",
                    }}
                  >
                    Communication Skills
                  </h5>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--text3)",
                      lineHeight: "1.5",
                    }}
                  >
                    Confidence in presenting ideas and collaborating
                    professionally.
                  </p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "rgba(139,92,246,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 10px",
                      color: "rgb(139,92,246)",
                    }}
                  >
                    <Icon name="trending-up" size={22} />
                  </div>
                  <h5
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: "700",
                      marginBottom: "4px",
                    }}
                  >
                    Business Acumen
                  </h5>
                  <p
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--text3)",
                      lineHeight: "1.5",
                    }}
                  >
                    The ability to think beyond tasks and understand outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal" style={{ marginTop: "80px" }}>
            <span className="section-label">Career Paths</span>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(1.5rem,3vw,2.6rem)" }}
            >
              Where This Program Can Take You
            </h2>
          </div>
          <div className="skills-grid">
            {program.acf.where_this_program_can_take_you?.map((path, i) => {
              const imgUrl = careerImgUrls[path.career_path_card_image];
              return (
                <div
                  key={i}
                  className={`program-card reveal reveal-d${(i % 4) + 1}`}
                  style={{ padding: "20px 16px", textAlign: "center" }}
                >
                  <div className="program-card-icon">
                    {imgUrl ? (
                      <img
                        src={imgUrl}
                        alt={decodeEntities(path.career_path_card_heading)}
                        style={{
                          width: "24px",
                          height: "24px",
                          objectFit: "contain",
                          borderRadius: "6px",
                        }}
                      />
                    ) : (
                      <Icon name="briefcase" size={20} />
                    )}
                  </div>
                  <h4 style={{ fontSize: "0.85rem" }}>
                    {decodeEntities(path.career_path_card_heading)}
                  </h4>
                </div>
              );
            })}
          </div>

          <div className="reveal" style={{ marginTop: "80px" }}>
            <div
              style={{
                background:
                  "linear-gradient(135deg,rgba(255,92,26,0.06),transparent)",
                border: "1px solid rgba(255,92,26,0.12)",
                borderRadius: "var(--r3)",
                padding: "48px 40px",
              }}
            >
              <span
                className="section-label"
                style={{ display: "inline-block" }}
              >
                Powered By
              </span>
              <h2
                className="section-title"
                style={{
                  fontSize: "clamp(1.3rem,2.5vw,2rem)",
                  marginTop: "8px",
                }}
              >
                Built on Industry Experience
              </h2>
              <p
                className="section-sub"
                style={{ maxWidth: "700px", margin: "16px 0 0" }}
              >
                TEONOX is built on insights gained through years of working with
                businesses, brands, growth teams, and hiring professionals.
              </p>
              <p
                className="section-sub"
                style={{ maxWidth: "700px", margin: "12px 0 0" }}
              >
                Through this journey, we observed a clear gap between academic
                learning and workplace expectations. This program is our
                response — a learning experience designed to help students
                become more capable, confident, and prepared for the realities
                of modern business.
              </p>
            </div>
          </div>

          <div
            style={{ marginTop: "80px", marginBottom: "40px" }}
            className="reveal"
          >
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border2)",
                borderRadius: "var(--r3)",
                padding: "56px 40px",
              }}
            >
              <span className="section-label">
                Ready To Build Skills That Matter?
              </span>
              <h2
                className="section-title"
                style={{
                  fontSize: "clamp(1.6rem,3.5vw,2.8rem)",
                  marginTop: "12px",
                }}
              >
                Learn practical business skills.
                <br />
                Work on real projects.
                <br />
                Gain industry exposure.
              </h2>
              <p
                className="section-sub"
                style={{ maxWidth: "500px", margin: "12px 0 0" }}
              >
                Develop future-ready capabilities that help you stand out and
                contribute from day one.
              </p>
              <div
                className="hero-actions"
                style={{ marginTop: "28px", flexWrap: "wrap" }}
              >
                <a href="contact.html" className="btn btn-primary">
                  Apply as Trainer <Icon name="arrow-right" size={16} />
                </a>
                <a href="#" className="btn btn-outline">
                  Download Brochure <Icon name="download" size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
