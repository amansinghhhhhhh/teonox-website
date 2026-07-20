import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";

const TOC = [
  { number: "1",  title: "Information We Collect" },
  { number: "2",  title: "How We Use Your Information" },
  { number: "3",  title: "Cookies" },
  { number: "4",  title: "Sharing of Information" },
  { number: "5",  title: "Data Security" },
  { number: "6",  title: "Data Retention" },
  { number: "7",  title: "Third-Party Services" },
  { number: "8",  title: "Your Rights" },
  { number: "9",  title: "Children's Privacy" },
  { number: "10", title: "Changes to This Privacy Policy" },
  { number: "11", title: "Contact Us" },
];

export default function PrivacyPolicy() {
  useScrollReveal();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="page active">

      {/* ── Page Hero ─────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: "140px" }}>
        <div className="container">
          <div className="section-center reveal">
            <span className="section-label">Legal</span>
            <h1 className="section-title">Privacy Policy</h1>
            <p className="section-sub">
              At <strong style={{ color: "#ff5c1a" }}>TEONOX</strong> ("TEONOX", "we", "our", or "us"), we value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, disclose, and protect your information when you visit <a href="https://teonox.com" target="_blank" rel="noreferrer" style={{ color: "#ff5c1a" }}>https://teonox.com</a>, submit an enquiry, apply for a program, or interact with our services.
            </p>
            <p className="section-sub" style={{ marginTop: "12px" }}>
              By using our website, you agree to the practices described in this Privacy Policy.
            </p>
            <div className="pg-hero-meta" style={{ justifyContent: "center", marginTop: "20px" }}>
              <div className="pg-hero-meta-item">
                <Icon name="calendar" size={16} />
                <strong>Effective Date:</strong>&nbsp;1 January 2025
              </div>
              <div className="pg-hero-meta-item">
                <Icon name="globe" size={16} />
                <strong>Applies to:</strong>&nbsp;
                <a href="https://teonox.com" target="_blank" rel="noreferrer">
                  teonox.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Table of Contents ─────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="reveal">
            <span className="section-label">Contents</span>
            <div className="cp-benefits-grid" style={{ marginTop: "16px" }}>
              {TOC.map((item) => (
                <a key={item.number} href={`#pp-${item.number}`} className="cp-benefit-card">
                  <div className="cp-benefit-check">
                    <span style={{ fontSize: "0.72rem", fontWeight: 800 }}>
                      {item.number}
                    </span>
                  </div>
                  <span className="cp-benefit-text">{item.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 1 ─────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }} id="pp-1">
        <div className="container">
          <div className="reveal">
            <h2 className="section-title" style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
              1. Information We Collect
            </h2>
            <div>
              <p className="section-sub">
                We may collect the following categories of information:
              </p>

              <p className="contact-sidebar-title" style={{ fontSize: "0.95rem", marginTop: "20px", marginBottom: "10px" }}>
                Personal Information
              </p>
              <p className="section-sub" style={{ marginBottom: "12px" }}>
                When you submit an enquiry, register for a program, book a counselling session, or contact us, we may collect:
              </p>
              <ul className="contact-info" style={{ gap: "8px", marginBottom: "24px" }}>
                {[
                  "Full Name",
                  "Email Address",
                  "Phone Number",
                  "City/Location",
                  "Educational Background",
                  "Professional Experience",
                  "Course or Program Interest",
                  "Any information voluntarily shared through forms, emails, WhatsApp, or phone calls",
                ].map((item) => (
                  <li key={item} className="pg-hero-meta-item">
                    <Icon name="check" size={14} />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="contact-sidebar-title" style={{ fontSize: "0.95rem", marginBottom: "10px" }}>
                Technical Information
              </p>
              <p className="section-sub" style={{ marginBottom: "12px" }}>
                When you browse our website, we may automatically collect:
              </p>
              <ul className="contact-info" style={{ gap: "8px" }}>
                {[
                  "IP Address",
                  "Browser Type",
                  "Device Information",
                  "Operating System",
                  "Website Usage Data",
                  "Referral Source",
                  "Cookies and Similar Tracking Technologies",
                ].map((item) => (
                  <li key={item} className="pg-hero-meta-item">
                    <Icon name="check" size={14} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2 ─────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }} id="pp-2">
        <div className="container">
          <div className="reveal">
            <h2 className="section-title" style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
              2. How We Use Your Information
            </h2>
            <div>
              <p className="section-sub" style={{ marginBottom: "16px" }}>
                We use your information to:
              </p>
              <ul className="contact-info" style={{ gap: "8px" }}>
                {[
                  "Respond to your enquiries.",
                  "Provide information about our programs and services.",
                  "Process applications and admissions.",
                  "Schedule counselling sessions.",
                  "Improve our website and user experience.",
                  "Send important updates regarding admissions, events, webinars, or learning opportunities.",
                  "Communicate promotional offers (only where permitted by applicable law).",
                  "Maintain internal records.",
                  "Comply with legal obligations.",
                ].map((item) => (
                  <li key={item} className="pg-hero-meta-item">
                    <Icon name="check" size={14} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3 ─────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }} id="pp-3">
        <div className="container">
          <div className="reveal">
            <h2 className="section-title" style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
              3. Cookies
            </h2>
            <div>
              <p className="section-sub" style={{ marginBottom: "16px" }}>
                Our website may use cookies and similar technologies to:
              </p>
              <ul className="contact-info" style={{ gap: "8px", marginBottom: "16px" }}>
                {[
                  "Improve website functionality",
                  "Remember user preferences",
                  "Analyse visitor behaviour",
                  "Measure website performance",
                  "Support marketing and remarketing campaigns",
                ].map((item) => (
                  <li key={item} className="pg-hero-meta-item">
                    <Icon name="check" size={14} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="section-sub">
                You can disable cookies through your browser settings. However, some features of the website may not function properly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4 ─────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }} id="pp-4">
        <div className="container">
          <div className="reveal">
            <h2 className="section-title" style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
              4. Sharing of Information
            </h2>
            <div>
              <p className="section-sub" style={{ marginBottom: "16px" }}>
                We do not sell, rent, or trade your personal information.
              </p>
              <p className="section-sub" style={{ marginBottom: "16px" }}>
                We may share information with trusted third-party service providers solely for purposes such as:
              </p>
              <ul className="contact-info" style={{ gap: "8px", marginBottom: "16px" }}>
                {[
                  "Website hosting",
                  "CRM and lead management",
                  "Email communication",
                  "Analytics",
                  "Payment processing (where applicable)",
                  "Marketing automation",
                  "Customer support",
                ].map((item) => (
                  <li key={item} className="pg-hero-meta-item">
                    <Icon name="check" size={14} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="section-sub" style={{ marginBottom: "12px" }}>
                These partners are required to protect your information and use it only for authorized purposes.
              </p>
              <p className="section-sub">
                We may also disclose information if required by law or to protect our legal rights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5 ─────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }} id="pp-5">
        <div className="container">
          <div className="reveal">
            <h2 className="section-title" style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
              5. Data Security
            </h2>
            <div>
              <p className="section-sub" style={{ marginBottom: "16px" }}>
                We implement reasonable administrative, technical, and organizational measures to safeguard your personal information against unauthorized access, misuse, alteration, disclosure, or destruction.
              </p>
              <p className="section-sub">
                While we strive to use commercially acceptable means to protect your information, no method of transmission over the Internet is completely secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6 ─────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }} id="pp-6">
        <div className="container">
          <div className="reveal">
            <h2 className="section-title" style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
              6. Data Retention
            </h2>
            <div>
              <p className="section-sub" style={{ marginBottom: "16px" }}>
                We retain your personal information only for as long as necessary to:
              </p>
              <ul className="contact-info" style={{ gap: "8px", marginBottom: "16px" }}>
                {[
                  "Provide our services",
                  "Fulfil legal obligations",
                  "Resolve disputes",
                  "Maintain business records",
                ].map((item) => (
                  <li key={item} className="pg-hero-meta-item">
                    <Icon name="check" size={14} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="section-sub">
                Once information is no longer required, it is securely deleted or anonymized where reasonably practicable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 7 ─────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }} id="pp-7">
        <div className="container">
          <div className="reveal">
            <h2 className="section-title" style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
              7. Third-Party Services
            </h2>
            <div>
              <p className="section-sub" style={{ marginBottom: "16px" }}>
                Our website may contain links to third-party websites or use third-party platforms such as:
              </p>
              <ul className="contact-info" style={{ gap: "8px", marginBottom: "16px" }}>
                {[
                  "Google Analytics",
                  "Meta (Facebook & Instagram)",
                  "LinkedIn",
                  "YouTube",
                  "Payment gateways",
                  "Email service providers",
                ].map((item) => (
                  <li key={item} className="pg-hero-meta-item">
                    <Icon name="check" size={14} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="section-sub">
                These services have their own privacy policies, and TEONOX is not responsible for their privacy practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 8 ─────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }} id="pp-8">
        <div className="container">
          <div className="reveal">
            <h2 className="section-title" style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
              8. Your Rights
            </h2>
            <div>
              <p className="section-sub" style={{ marginBottom: "16px" }}>
                Subject to applicable laws, you may have the right to:
              </p>
              <ul className="contact-info" style={{ gap: "8px", marginBottom: "16px" }}>
                {[
                  "Access your personal information",
                  "Request correction of inaccurate information",
                  "Request deletion of your information",
                  "Withdraw consent where processing is based on consent",
                  "Opt out of promotional communications",
                ].map((item) => (
                  <li key={item} className="pg-hero-meta-item">
                    <Icon name="check" size={14} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="section-sub">
                To exercise these rights, please contact us using the details below.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 9 ─────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }} id="pp-9">
        <div className="container">
          <div className="reveal">
            <h2 className="section-title" style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
              9. Children's Privacy
            </h2>
            <div>
              <p className="section-sub">
                Our programs are generally intended for individuals aged 18 years and above. If we become aware that personal information has been collected from a minor without appropriate consent where required, we will take reasonable steps to delete such information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 10 ────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }} id="pp-10">
        <div className="container">
          <div className="reveal">
            <h2 className="section-title" style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
              10. Changes to This Privacy Policy
            </h2>
            <div>
              <p className="section-sub" style={{ marginBottom: "16px" }}>
                We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or services.
              </p>
              <p className="section-sub">
                The revised version will be posted on this page with an updated Effective Date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 11 (Contact Us) ───────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }} id="pp-11">
        <div className="container">
          <div className="contact-wrap reveal">
            <div className="contact-sidebar">
              <h3 className="contact-sidebar-title">11. Contact Us</h3>
              <p>
                If you have any questions regarding this Privacy Policy or how your information is handled, please contact:
              </p>
              <ul className="contact-info">
                <li>
                  <div className="contact-info-icon">
                    <Icon name="building-2" size={18} />
                  </div>
                  <div>
                    <strong>TEONOX</strong>
                  </div>
                </li>
                <li>
                  <div className="contact-info-icon">
                    <Icon name="map-pin" size={18} />
                  </div>
                  <div>
                    <span>
                      Office No. 13, 4th Floor, Revolution Mall, Near City Pride Multiplex, Kothrud, Pune – 411038
                    </span>
                  </div>
                </li>
                <li>
                  <div className="contact-info-icon">
                    <Icon name="mail" size={18} />
                  </div>
                  <div>
                    <strong>Email:</strong>&nbsp;
                    <span>
                      <a href="mailto:info@teonox.com">info@teonox.com</a>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="contact-info-icon">
                    <Icon name="phone" size={18} />
                  </div>
                  <div>
                    <strong>Phone:</strong>&nbsp;
                    <span>
                      <a href="tel:8087177760">+91 80871 77760</a>
                    </span>
                  </div>
                </li>
                <li>
                  <div className="contact-info-icon">
                    <Icon name="globe" size={18} />
                  </div>
                  <div>
                    <strong>Website:</strong>&nbsp;
                    <span>
                      <a href="https://teonox.com" target="_blank" rel="noreferrer">
                        https://teonox.com
                      </a>
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="form-wrap">
              <span className="section-label">Have a Privacy Question?</span>
              <h3 className="section-title" style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", marginTop: "8px" }}>
                We're Here to Help
              </h3>
              <p className="section-sub" style={{ marginBottom: "28px" }}>
                Our team is ready to answer any questions — no matter how small.
              </p>
              <div className="hero-actions">
                <Link to="/contact" className="btn btn-primary">
                  Contact Us
                  <Icon name="arrow-right" size={16} />
                </Link>
                <Link to="/" className="btn btn-outline">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final Section (Consent) ────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="cp-final reveal">
            <div className="cp-final-glow" />
            <div className="cp-final-content">
              <span className="section-label">Consent</span>
              <h2>Consent</h2>
              <p>
                By using the TEONOX website or submitting your information through any of our forms, you acknowledge that you have read, understood, and agree to this Privacy Policy.
              </p>
              <div className="cp-final-actions">
                <Link to="/contact" className="btn btn-primary">
                  Contact Us With Questions
                  <Icon name="arrow-right" size={16} />
                </Link>
                <Link to="/" className="btn btn-outline">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}