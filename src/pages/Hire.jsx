import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";
import industryCollaboration from "../hooks/industry-collaboration.js"
import { submitForm } from "../services/formService";
import {
  validateEmail,
  validatePhone,
  validateRequired,
} from "../utils/validation.js";

export default function Hire() {
  useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const clearError = (name) =>
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });

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
              <span className="section-label">Hire From Us</span>
              <h2 className="section-title">
                Hire Talent That's Ready to Contribute.
              </h2>
              <p className="section-sub" style={{ maxWidth: "100%" }}>
                TEONOX learners are trained through practical projects, industry exposure, AI-powered workflows, and real business challenges helping them bring confidence, adaptability, and execution-focused thinking to modern workplaces.
              </p>
              <div className="hero-actions" style={{ marginTop: "20px" }}>
                <a href="#form-wrap-id" className="btn btn-primary btn-sm">
                  Speak to Our Team <Icon name="arrow-right" size={14} />
                </a>
              </div>
            </div>
            <div className="about-img-wrap" style={{ aspectRatio: "16/10" }}>
              <img src="assets/asset-024.jpg" alt="" />
            </div>
          </div>

          <div className="reveal" style={{ marginBottom: "24px" }}>
            <span className="section-label">Why Teonox Talent</span>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)" }}
            >
              Built Through Experience, Not Just Theory.
            </h2>
            <p className="section-sub">
              At TEONOX, learners gain exposure to real-world projects, business
              scenarios, industry tools, and collaborative environments that
              help them develop practical skills before stepping into
              professional roles.
            </p>
          </div>

          <div className="hire-why reveal " style={{ marginBottom: "56px" }}>
            <h3 className="hire-why-title">
              What Makes TEONOX Professionals Different?
            </h3>
            <div className="hire-why-grid hire-new-wire">
              <div className="hire-why-item">
                <div className="hire-why-icon">
                  <Icon name="zap" size={16} />
                </div>
                <div>
                  <h5>Practical Exposure</h5>
                  <p>
                    Worked on projects, campaigns, simulations, and business challenges.                  </p>
                </div>
              </div>
              <div className="hire-why-item">
                <div className="hire-why-icon">
                  <Icon name="cpu" size={16} />
                </div>
                <div>
                  <h5>AI-Ready</h5>
                  <p>
                    Trained to use modern AI tools and workflows for
                    productivity and decision-making.
                  </p>
                </div>
              </div>
              <div className="hire-why-item">
                <div className="hire-why-icon">
                  <Icon name="message-circle" size={16} />
                </div>
                <div>
                  <h5>Strong Communication</h5>
                  <p>
                    Experienced in presentations, collaboration, and
                    professional communication.
                  </p>
                </div>
              </div>
              <div className="hire-why-item">
                <div className="hire-why-icon">
                  <Icon name="briefcase" size={16} />
                </div>
                <div>
                  <h5>Business Understanding</h5>
                  <p>
                    Exposure to marketing, analytics, sales, and business growth
                    fundamentals.
                  </p>
                </div>
              </div>
              <div className="hire-why-item">
                <div className="hire-why-icon">
                  <Icon name="trending-up" size={16} />
                </div>
                <div>
                  <h5>Growth Mindset</h5>
                  <p>
                    Prepared to learn quickly, adapt, and contribute in
                    fast-moving environments.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal" style={{ marginBottom: "28px" }}>
            <span className="section-label">Who You Can Hire From TEONOX</span>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)" }}
            >
              Trained for Impact. Ready to Contribute.
            </h2>
          </div>
          <div className="hire-grid">
            <div className="hire-card reveal reveal-d1">
              <div className="hire-card-icon">
                <Icon name="trending-up" size={22} />
              </div>
              <h4>Digital Marketing & Growth Professionals</h4>
              <p>Individuals trained in digital marketing, content strategy, growth initiatives, and campaign execution.</p>
            </div>
            <div className="hire-card reveal reveal-d2">
              <div className="hire-card-icon">
                <Icon name="bar-chart-3" size={22} />
              </div>
              <h4>AI & Analytics Talent</h4>
              <p>Professionals equipped with analytical thinking, dashboarding, reporting, and AI-assisted workflows.</p>
            </div>
            <div className="hire-card reveal reveal-d3">
              <div className="hire-card-icon">
                <Icon name="users" size={22} />
              </div>
              <h4>Sales & Revenue Professionals</h4>
              <p>Talent trained in communication, business development, client engagement, and revenue-focused thinking.</p>
            </div>
            <div className="hire-card reveal reveal-d4">
              <div className="hire-card-icon">
                <Icon name="layers" size={22} />
              </div>
              <h4>Multi-Disciplinary Growth Talent</h4>
              <p>Professionals with exposure across marketing, AI, analytics, and business functions.</p>
            </div>
          </div>

          <div className="reveal" style={{ marginTop: "56px" }}>
            <span className="section-label">Industry Collaboration</span>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)" }}
            >
              Looking To Build The Next Generation Of Talent?
            </h2>
            <p className="section-sub" style={{ maxWidth: "100%" }}>
              We welcome partnerships with organizations interested in campus
              hiring, internships, live projects, industry workshops, guest
              sessions, and mentorship initiatives.
            </p>
          </div>

    <div className="reveal">
      <p
        className="section-sub"
        style={{
          maxWidth: "100%",
          marginBottom: "20px",
        }}
      >
        We welcome partnerships with
        organizations interested in:
      </p>

      <div className="collab-grid">

        <div className="collab-card">
          <div className="collab-icon">
            <Icon
              name="briefcase"
              size={14}
              style={{ color: "var(--orange)" }}
            />
          </div>
          <span>Campus Hiring</span>
        </div>

        <div className="collab-card">
          <div className="collab-icon">
            <Icon
              name="book-open"
              size={14}
              style={{ color: "var(--orange)" }}
            />
          </div>
          <span>Internships</span>
        </div>

        <div className="collab-card">
          <div className="collab-icon">
            <Icon
              name="zap"
              size={14}
              style={{ color: "var(--orange)" }}
            />
          </div>
          <span>Live Projects</span>
        </div>

        <div className="collab-card">
          <div className="collab-icon">
            <Icon
              name="users"
              size={14}
              style={{ color: "var(--orange)" }}
            />
          </div>
          <span>Industry Workshops</span>
        </div>

        <div className="collab-card">
          <div className="collab-icon">
            <Icon
              name="mic"
              size={14}
              style={{ color: "var(--orange)" }}
            />
          </div>
          <span>Guest Sessions</span>
        </div>

        <div className="collab-card">
          <div className="collab-icon">
            <Icon
              name="star"
              size={14}
              style={{ color: "var(--orange)" }}
            />
          </div>
          <span>Mentorship Initiatives</span>
        </div>

      </div>
    </div>


          <div className="contact-wrap reveal" style={{}}>
            <div className="form-wrap" id="form-wrap-id">
              <h3
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  marginBottom: "24px",
                }}
              >
                Let's Find The Right Talent For Your Team.
              </h3>
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
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setError("");
                    const fd = new FormData(e.target);
                    const fields = {};
                    fd.forEach((value, key) => {
                      fields[key] = value;
                    });
                    const errors = {};
                    const val = (name, label, opts = {}) => {
                      const v = fields[name] || "";
                      if (!validateRequired(v))
                        errors[name] = `${label} is required.`;
                      else if (opts.email && !validateEmail(v))
                        errors[name] = "Please enter a valid email address.";
                      else if (opts.phone && !validatePhone(v.replace(/[\s\-\(\)\+]/g, "")))
                        errors[name] = "Please enter a valid 10-digit Indian phone number.";
                      else if (opts.min && Number(v) < opts.min)
                        errors[name] = `${label} must be at least ${opts.min}.`;
                    };
                    val("Company Name", "Company Name");
                    val("Contact Person", "Contact Person");
                    val("Email Address", "Email Address", { email: true });
                    val("Phone Number", "Phone Number", { phone: true });
                    val("Hiring Requirement", "Hiring Requirement");
                    val("Open Positions", "Open Positions", { min: 1 });
                    if (Object.keys(errors).length) {
                      setFieldErrors(errors);
                      return;
                    }
                    setFieldErrors({});
                    setSubmitting(true);
                    try {
                      await submitForm("Hire Talent", fields);
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
                  <div className="form-row">
                    <div className={`field${fieldErrors["Company Name"] ? " field-invalid" : ""}`}>
                      <label>Company Name</label>
                      <input
                        type="text"
                        name="Company Name"
                        placeholder="Enter company name"
                        onChange={() => clearError("Company Name")}
                      />
                      {fieldErrors["Company Name"] && (
                        <span className="field-error">{fieldErrors["Company Name"]}</span>
                      )}
                    </div>
                    <div className={`field${fieldErrors["Contact Person"] ? " field-invalid" : ""}`}>
                      <label>Contact Person</label>
                      <input
                        type="text"
                        name="Contact Person"
                        placeholder="Full name"
                        onChange={() => clearError("Contact Person")}
                      />
                      {fieldErrors["Contact Person"] && (
                        <span className="field-error">{fieldErrors["Contact Person"]}</span>
                      )}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className={`field${fieldErrors["Email Address"] ? " field-invalid" : ""}`}>
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="Email Address"
                        placeholder="your@email.com"
                        onChange={() => clearError("Email Address")}
                      />
                      {fieldErrors["Email Address"] && (
                        <span className="field-error">{fieldErrors["Email Address"]}</span>
                      )}
                    </div>
                    <div className={`field${fieldErrors["Phone Number"] ? " field-invalid" : ""}`}>
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="Phone Number"
                        placeholder="8087177760"
                        onChange={() => clearError("Phone Number")}
                      />
                      {fieldErrors["Phone Number"] && (
                        <span className="field-error">{fieldErrors["Phone Number"]}</span>
                      )}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className={`field${fieldErrors["Hiring Requirement"] ? " field-invalid" : ""}`}>
                      <label>Hiring Requirement</label>
                      <input
                        type="text"
                        name="Hiring Requirement"
                        placeholder="e.g. Digital Marketing Executive"
                        onChange={() => clearError("Hiring Requirement")}
                      />
                      {fieldErrors["Hiring Requirement"] && (
                        <span className="field-error">{fieldErrors["Hiring Requirement"]}</span>
                      )}
                    </div>
                    <div className={`field${fieldErrors["Open Positions"] ? " field-invalid" : ""}`}>
                      <label>Open Positions</label>
                      <input
                        type="number"
                        name="Open Positions"
                        placeholder="Number of hires"
                        onChange={() => clearError("Open Positions")}
                      />
                      {fieldErrors["Open Positions"] && (
                        <span className="field-error">{fieldErrors["Open Positions"]}</span>
                      )}
                    </div>
                  </div>
                  <div className="field">
                    <label>Message</label>
                    <textarea
                      name="Message"
                      placeholder="Tell us about your requirements..."
                    ></textarea>
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
                    style={{ width: "100%", justifyContent: "center" }}
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Request Talent"}{" "}
                    {!submitting && <Icon name="arrow-right" size={16} />}
                  </button>
                </form>
              )}
            </div>
            <div className="contact-sidebar">
              <h3 className="contact-sidebar-title">
                Great Teams Are Built With Great People.
              </h3>
              <p>
                Let's work together to create meaningful opportunities for the
                next generation of professionals.
              </p>
              <div className="hero-actions" style={{ marginTop: "24px" }}>
                <a
                  href="/contact"
                  className="btn btn-outline btn-sm"
                  style={{
                    borderColor: "var(--border2)",
                    color: "var(--text)",
                  }}
                >
                  Partner With TEONOX <Icon name="arrow-right" size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
