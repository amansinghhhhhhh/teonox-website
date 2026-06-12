import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";

export default function NotFound() {
  return (
    <div className="page active">
      <section className="section" style={{ paddingTop: "140px" }}>
        <div className="container">
          <div
            style={{
              minHeight: "60vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "60px 20px",
            }}
          >
            <div
              style={{
                fontSize: "clamp(5rem, 15vw, 10rem)",
                fontWeight: 900,
                fontFamily: "var(--font-head)",
                background: "var(--orange-grad)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              404
            </div>

            <h2
              style={{
                fontFamily: "var(--font-head)",
                fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: 12,
              }}
            >
              Page Not Found
            </h2>

            <p
              style={{
                color: "var(--text2)",
                fontSize: "0.95rem",
                maxWidth: 420,
                lineHeight: 1.7,
                marginBottom: 36,
              }}
            >
              The page you're looking for doesn't exist or has been moved.
              Let's get you back on track.
            </p>

            <Link
              to="/"
              className="btn btn-primary"
              style={{ marginBottom: 48 }}
            >
              Back to Home <Icon name="arrow-right" size={14} />
            </Link>

            <div
              style={{
                display: "flex",
                gap: 12,
              }}
            >
              <a
                href="#"
                aria-label="LinkedIn"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text3)",
                  transition: "color var(--t), border-color var(--t), background var(--t)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--orange)";
                  e.currentTarget.style.borderColor = "rgba(255, 92, 26, 0.25)";
                  e.currentTarget.style.background = "rgba(255, 92, 26, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text3)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--surface)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text3)",
                  transition: "color var(--t), border-color var(--t), background var(--t)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--orange)";
                  e.currentTarget.style.borderColor = "rgba(255, 92, 26, 0.25)";
                  e.currentTarget.style.background = "rgba(255, 92, 26, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text3)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--surface)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text3)",
                  transition: "color var(--t), border-color var(--t), background var(--t)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--orange)";
                  e.currentTarget.style.borderColor = "rgba(255, 92, 26, 0.25)";
                  e.currentTarget.style.background = "rgba(255, 92, 26, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text3)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--surface)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text3)",
                  transition: "color var(--t), border-color var(--t), background var(--t)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--orange)";
                  e.currentTarget.style.borderColor = "rgba(255, 92, 26, 0.25)";
                  e.currentTarget.style.background = "rgba(255, 92, 26, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text3)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--surface)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text3)",
                  transition: "color var(--t), border-color var(--t), background var(--t)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--orange)";
                  e.currentTarget.style.borderColor = "rgba(255, 92, 26, 0.25)";
                  e.currentTarget.style.background = "rgba(255, 92, 26, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text3)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.background = "var(--surface)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
