import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";
import { getCareers } from "../api/wordpressApi";
import { submitForm } from "../services/formService";
import {
  validateEmail,
  validatePhone,
  validateRequired,
  validateFile,
} from "../utils/validation.js";
import { sanitizeHtml } from "../utils/sanitize.js";

export default function Careers() {
  useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [careers, setCareers] = useState([]);
  const clearError = (name) =>
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });

  useEffect(() => {
    getCareers().then(setCareers).catch(console.error);
  }, []);

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

  return (
    <div className="page active">
      <section className="section" style={{ paddingTop: "140px" }}>
        <div className="container">
          <div className="about-grid reveal" style={{ marginBottom: "56px" }}>
            <div>
              <span className="section-label">Careers</span>
              <h2 className="section-title">
                Help Shape The Future of Learning.
              </h2>
              <p className="section-sub" style={{ maxWidth: "100%" }}>
                At TEONOX, we're building more than programs. We're building an
                ecosystem where students gain practical skills, real-world
                exposure, and the confidence to succeed. If you're passionate
                about education, business, technology, and impact — we'd love to
                hear from you.
              </p>
              <div className="hero-actions" style={{ marginTop: "20px" }}>
                <a href="#careers-form" className="btn btn-primary btn-sm">
                  View Opportunities <Icon name="arrow-down" size={14} />
                </a>
                <Link to="/hire" className="btn btn-outline" style={{ flexShrink: "0" }}                            >
                              Partner With Us<Icon name="arrow-right" size={14} />
                            </Link>
              </div>
            </div>
            <div className="about-img-wrap" style={{ aspectRatio: "16/10" }}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85&fit=crop&auto=format"
                alt=""
              />
            </div>
          </div>

          <div className="reveal" style={{ marginBottom: "36px" }}>
            <span className="section-label">Why Work With Us</span>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)" }}
            >
              Build More Than Careers. Build Impact.
            </h2>
            <p className="section-sub" style={{ maxWidth: "100%" }}>
              Every workshop, project, mentorship session, and interaction has
              the potential to influence someone's future. We're looking for
              people who believe learning should be practical, relevant, and
              connected to the real world.
            </p>
          </div>
          <div
            className="hire-why-grid"
            style={{
              marginBottom: "56px",
            }}
          >
            <div
              className="hire-why-item"
              style={{
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "28px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r2)",
              }}
            >
              <div
                className="hire-why-icon"
                style={{ width: "48px", height: "48px", marginBottom: "12px" }}
              >
                <Icon name="book-open" size={20} />
              </div>
              <h5>Learn Continuously</h5>
              <p>Work alongside professionals from diverse industries.</p>
            </div>
            <div
              className="hire-why-item"
              style={{
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "28px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r2)",
              }}
            >
              <div
                className="hire-why-icon"
                style={{ width: "48px", height: "48px", marginBottom: "12px" }}
              >
                <Icon name="heart" size={20} />
              </div>
              <h5>Create Impact</h5>
              <p>Help students develop skills that transform careers.</p>
            </div>
            <div
              className="hire-why-item"
              style={{
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "28px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r2)",
              }}
            >
              <div
                className="hire-why-icon"
                style={{ width: "48px", height: "48px", marginBottom: "12px" }}
              >
                <Icon name="lightbulb" size={20} />
              </div>
              <h5>Collaborate Freely</h5>
              <p>An environment that values ideas and innovation.</p>
            </div>
            <div
              className="hire-why-item"
              style={{
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "28px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r2)",
              }}
            >
              <div
                className="hire-why-icon"
                style={{ width: "48px", height: "48px", marginBottom: "12px" }}
              >
                <Icon name="clock" size={20} />
              </div>
              <h5>Think Long-Term</h5>
              <p>Focus on meaningful outcomes, not short-term metrics.</p>
            </div>
          </div>

          <div className="reveal" style={{ marginBottom: "28px" }}>
            <span className="section-label">Open Positions</span>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)" }}
            >
              Current Opportunities
            </h2>
          </div>

          <div className="reveal" style={{ marginBottom: "36px" }}>
            {careers.map((career, i) => {
              const a = career.acf;
              const responsibilities = [
                {
                  icon: "book-open",
                  label: "Training Delivery",
                  key: "training_delivery",
                },
                {
                  icon: "layers",
                  label: "Curriculum Enhancement",
                  key: "curriculum_enhancement",
                },
                {
                  icon: "users",
                  label: "Student Development",
                  key: "student_development",
                },
                {
                  icon: "megaphone",
                  label: "Engagement & Outreach",
                  key: "engagement_outreach",
                },
                {
                  icon: "smile",
                  label: "Learning Experience",
                  key: "learning_experience",
                },
              ];
              return (
                <div key={career.id} className="job-expandable">
                  <div className="job-expandable-header">
                    <div>
                      <h3 className="job-expandable-title">{a.job_title}</h3>
                      <div className="job-expandable-meta">
                        <span>
                          <Icon name="map-pin" /> {a.location}
                        </span>
                        <span>
                          <Icon name="clock" /> {a.employment_type}
                        </span>
                        <span className="job-tag highlight">
                          {a.experience}
                        </span>
                      </div>
                    </div>
                    <button className="job-toggle" aria-label="Toggle">
                      <Icon name="chevron-down" />
                    </button>
                  </div>
                  <div
                    className="job-expandable-body"
                    style={{ display: "none" }}
                  >
                    <div className="job-section">
                      <h4>Role Overview</h4>
                      <p>{a.role_overview}</p>
                    </div>
                    <div className="job-section">
                      <h4>Key Responsibilities</h4>
                      <div className="job-list">
                        {responsibilities.map((r) =>
                          a[r.key] ? (
                            <div key={r.key} className="job-list-item">
                              <div className="job-list-icon">
                                <Icon name={r.icon} />
                              </div>
                              <div>
                                <h5>{r.label}</h5>
                                <p>{a[r.key]}</p>
                              </div>
                            </div>
                          ) : null,
                        )}
                      </div>
                    </div>
                    {a.must_have_skills && (
                      <div className="job-section">
                        <h4>Must-Have Skills</h4>
                        <div
                          className="job-bullets"
                          dangerouslySetInnerHTML={{
                            __html: sanitizeHtml(a.must_have_skills),
                          }}
                        />
                      </div>
                    )}
                    {a.good_to_have && (
                      <div className="job-section">
                        <h4>Good-to-Have</h4>
                        <div
                          className="job-bullets"
                          dangerouslySetInnerHTML={{ __html: sanitizeHtml(a.good_to_have) }}
                        />
                      </div>
                    )}
                   {a.education && (
  <div className="job-section">
    <h4>Education</h4>

    <p
     dangerouslySetInnerHTML={{ __html: sanitizeHtml(a.education) }}
    />
  </div>
)}
                    <div style={{ marginTop: "24px" }}>
                      <a href="#careers-form" className="btn btn-primary">
                        Apply for This Position{" "}
                        <Icon name="arrow-right" size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="reveal" style={{ marginTop: "56px" }}>
            <div className="contact-wrap" style={{}}>
              <div className="contact-sidebar">
                <h3 className="contact-sidebar-title">
                  Let's Create Opportunities Together.
                </h3>
                <p>
                  Whether you're a business leader, educator, founder, or
                  industry practitioner, there are many ways to contribute to
                  the TEONOX ecosystem.
                </p>
              </div>
              <div
                className="form-wrap"
                style={{
                  background:
                    "linear-gradient(180deg,rgba(13,25,38,0.5) 0%,var(--surface) 100%)",
                }}
              >
                {submitted ? (
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
                    id="careers-form"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setError("");
                      const fd = new FormData(e.target);
                      const fields = {};
                      fd.forEach((value, key) => {
                        fields[key] = value;
                      });
                      const file = fields["Resume"];
                      const errors = {};
                      const val = (name, label, opts = {}) => {
                        const v = fields[name] || "";
                        if (!validateRequired(v))
                          errors[name] = `${label} is required.`;
                        else if (opts.email && !validateEmail(v))
                          errors[name] = "Please enter a valid email address.";
                        else if (opts.phone && !validatePhone(v.replace(/[\s\-\(\)\+]/g, "")))
                          errors[name] = "Please enter a valid 10-digit Indian phone number.";
                      };
                      val("Full Name", "Full Name");
                      val("Email", "Email", { email: true });
                      val("Role", "Role");
                      val("Phone Number", "Phone Number", { phone: true });
                      val("Experience", "Experience");
                      val("Why TEONOX", "Why TEONOX");
                      if (fields["Role"] === "Select" || fields["Role"] === "") {
                        errors["Role"] = "Please select a role.";
                      }
                      if (file && file instanceof File && file.size > 0) {
                        const fv = validateFile(file);
                        if (!fv.valid) errors["Resume"] = fv.message;
                      }
                      if (Object.keys(errors).length) {
                        setFieldErrors(errors);
                        return;
                      }
                      setFieldErrors({});
                      setSubmitting(true);
                      try {
                        await submitForm("Careers Application", fields);
                      } catch {
                        setError("Something went wrong. Please try again.");
                        setSubmitting(false);
                        return;
                      }
                      setSubmitting(false);
                      e.target.reset();
                      setSubmitted(true);
                    }}
                  >
                    <div style={{ marginBottom: "28px" }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-head)",
                          fontSize: "1.15rem",
                          fontWeight: "700",
                          color: "#fff",
                          margin: "0 0 4px",
                        }}
                      >
                        Interested In Working With TEONOX?
                      </h3>
                      <p
                        style={{
                          fontSize: "0.82rem",
                          color: "rgba(255,255,255,0.4)",
                          fontWeight: "300",
                          margin: "0",
                        }}
                      >
                        Fill in your details and we'll get back to you.
                      </p>
                    </div>
                    <div className="form-row">
                      <div className={`field${fieldErrors["Full Name"] ? " field-invalid" : ""}`}>
                        <label>Full Name</label>
                        <input
                          type="text"
                          name="Full Name"
                          placeholder="Enter your full name"
                          onChange={() => clearError("Full Name")}
                        />
                        {fieldErrors["Full Name"] && (
                          <span className="field-error">{fieldErrors["Full Name"]}</span>
                        )}
                      </div>
                      <div className={`field${fieldErrors["Email"] ? " field-invalid" : ""}`}>
                        <label>Email</label>
                        <input
                          type="email"
                          name="Email"
                          placeholder="you@example.com"
                          onChange={() => clearError("Email")}
                        />
                        {fieldErrors["Email"] && (
                          <span className="field-error">{fieldErrors["Email"]}</span>
                        )}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className={`field${fieldErrors["Role"] ? " field-invalid" : ""}`}>
                        <label>Role</label>
                        <select name="Role" onChange={() => clearError("Role")}>
                          <option value="">Select</option>
                          <option value="Digital Marketing Trainer">
                            Digital Marketing Trainer
                          </option>
                          <option value="Business Development Manager">
                            Business Development Manager
                          </option>
                          <option value="AI & Data Science Trainer">
                            AI & Data Science Trainer
                          </option>
                          <option value="Head of Academics">
                            Head of Academics
                          </option>
                          <option value="Other">Other</option>
                        </select>
                        {fieldErrors["Role"] && (
                          <span className="field-error">{fieldErrors["Role"]}</span>
                        )}
                      </div>
                      <div className={`field${fieldErrors["Phone Number"] ? " field-invalid" : ""}`}>
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          name="Phone Number"
                          placeholder="+91 98765 43210"
                          onChange={() => clearError("Phone Number")}
                        />
                        {fieldErrors["Phone Number"] && (
                          <span className="field-error">{fieldErrors["Phone Number"]}</span>
                        )}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className={`field${fieldErrors["Experience"] ? " field-invalid" : ""}`}>
                        <label>Experience</label>
                        <input
                          type="text"
                          name="Experience"
                          placeholder="e.g. 5 years"
                          onChange={() => clearError("Experience")}
                        />
                        {fieldErrors["Experience"] && (
                          <span className="field-error">{fieldErrors["Experience"]}</span>
                        )}
                      </div>
                      <div className={`field${fieldErrors["Why TEONOX"] ? " field-invalid" : ""}`}>
                        <label>Why TEONOX?</label>
                        <textarea
                          name="Why TEONOX"
                          rows="4"
                          placeholder="Tell us why you would like to work with us..."
                          onChange={() => clearError("Why TEONOX")}
                        ></textarea>
                        {fieldErrors["Why TEONOX"] && (
                          <span className="field-error">{fieldErrors["Why TEONOX"]}</span>
                        )}
                      </div>
                    </div>
                    <div className={`field${fieldErrors["Resume"] ? " field-invalid" : ""}`}>
                      <label>Upload Resume / CV</label>
                      <input
                        type="file"
                        name="Resume"
                        accept=".pdf,.doc,.docx"
                        onChange={() => clearError("Resume")}
                      />
                      {fieldErrors["Resume"] && (
                        <span className="field-error">{fieldErrors["Resume"]}</span>
                      )}
                    </div>
                    {error && (
                      <p
                        style={{
                          color: "#ef4444",
                          fontSize: "0.85rem",
                          margin: "0 0 8px",
                          textAlign: "center",
                        }}
                      >
                        {error}
                      </p>
                    )}
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Submit Application"}{" "}
                      {!submitting && <Icon name="arrow-right" size={16} />}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
