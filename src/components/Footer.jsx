import Icon from "../components/Icon.jsx";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="footer" style={{ borderTopColor: "transparent" }}>
      <div className="container">
        <div className="footer-grid reveal">
          <div className="footer-brand">
            <Link to="/" className="nav-logo">
              <img
                src="/assets/asset-028.png"
                alt="TEONOX"
                style={{ height: 44, width: "auto" }}
              />
            </Link>
            <p>
              Building industry-ready professionals through experiential,
              practitioner-led learning. Bridging the gap between education and
              execution.
            </p>
            <div className="hero-actions" style={{ marginTop: 16 }}>
              <Link to="/contact" className="btn btn-primary btn-sm">
                Enquire Now <Icon name="arrow-right" size={12} />
              </Link>
            </div>
          </div>
          <div className="footer-col">
            <h5>Quick Links</h5>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/programs">Program</Link>
              </li>
              <li>
                <Link to="/hire">Hire From Us</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>More</h5>
            <ul>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/blog">Insights</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li>
                <a href="#">
                  Office No. 13, 4th Floor, Revolution Mall, Near City Pride
                  Multiplex, Kothrud, Pune - 411038
                </a>
              </li>
              <li>
                <a href="#">info@teonox.com</a>
              </li>
              <li>
                <a href="#">+91-808-717-7760</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 TEONOX. All rights reserved. Powered by A2 Digital.</p>
          <div className="footer-socials">
            <a href="#" aria-label="LinkedIn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
