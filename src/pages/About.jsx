import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import useVideoGallery from "../hooks/useVideoGallery.js"
import useScrollReveal from "../hooks/useScrollReveal.js";

export default function About() {
  useScrollReveal();
  useVideoGallery();

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
          <div className="about-grid">
            <div className="reveal">
              <span className="section-label">Our Story</span>
              <h2 className="section-title">
                Backed by A2 Digital. Built for the Future of Work.
              </h2>
              <p className="section-sub" style={{ maxWidth: "100%" }}>
                TEONOX is built on 12+ years of industry experience through A2 Digital—a digital growth company helping businesses scale through marketing, technology, strategy, analytics, and performance-driven execution.
              </p>
              <p className="section-sub">
                Over the years, we've worked with businesses, built teams, hired talent, and solved real growth challenges. And we kept noticing the same gap. Students were graduating with knowledge. Businesses were hiring for capability.
              </p>
              <p className="section-sub">
                Many talented individuals lacked exposure to real projects, modern tools, industry workflows, and the practical skills needed to contribute with confidence.
              </p>
              <p className="section-sub">
                We saw this challenge firsthand for years. That's why we created TEONOX.
              </p>
              <p className="section-sub">
                A learning ecosystem designed to bridge the gap between education and industry by helping students develop practical skills, real-world confidence, and future-ready capabilities.
              </p>
              <div className="about-quote" style={{ marginTop: "24px" }}>
                <p>
                  "Built around <strong>Technology, Execution, Ownership, Next-Generation Opportunities, and Excellence</strong>, it reflects our belief that success comes not just from what you know, but from what you can build, solve, and achieve."
                </p>
              </div>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "var(--text2)",
                  fontWeight: "300",
                  lineHeight: "1.75",
                  marginTop: "16px",
                }}
              >
                These principles shape every learning experience, project, and opportunity at TEONOX.
Backed by the industry experience and insights gained through years of building brands, managing campaigns, growing businesses, and developing teams at A2 Digital, TEONOX is a learning ecosystem designed to help students gain the skills, experience, confidence, and industry exposure needed to thrive in today's rapidly evolving world.

              </p>
            </div>
            <div className="reveal reveal-d2">
              <div className="about-img-wrap">
                <img src="assets/asset-022.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="about-grid" style={{ alignItems: "start" }}>
            <div className="reveal-left">
              <span className="section-label">Our Vision</span>
              <h2
                className="section-title"
                style={{ fontSize: "clamp(1.5rem,3vw,2.6rem)" }}
              >
                Building Future-Ready Professionals.
              </h2>
              <p
                className="section-sub"
                style={{ maxWidth: "100%", marginTop: "20px" }}
              >
                To create a generation of confident, capable professionals who can adapt, contribute, and thrive in the modern digital economy.
              </p>
            </div>
            <div className="reveal-right">
              <span className="section-label">Our Mission</span>
              <h2
                className="section-title"
                style={{ fontSize: "clamp(1.5rem,3vw,2.6rem)" }}
              >
                Bridging Learning and Doing.
              </h2>
              <p
                className="section-sub"
                style={{ maxWidth: "100%", marginTop: "20px" }}
              >
                To help students develop practical skills, industry exposure, and real-world confidence through experiential, industry-led learning.
              </p>
            </div>
          </div>
        </div>
      </section>

       <section className="section section-alt">
        <div className="container">
          <div className="" style={{ alignItems: "start" }}>
            <div className="reveal-left">
              <span className="section-label">Our Values</span>
             
              <div className="about-stats" style={{ marginTop: "32px" }}>
            <div className="hire-why-item">
              <div className="hire-why-icon">
                <Icon name="sun-dim" size={16} />
              </div>
              <div>
                <h5>Industry Relevance</h5>
                <p>Everything we teach is rooted in the realities of modern business, ensuring students develop skills that matter in today's workplace.</p>
              </div>
            </div>
            <div className="hire-why-item">
              <div className="hire-why-icon">
                <Icon name="sun-dim" size={16} />
              </div>
              <div>
                <h5>Practical Learning</h5>
                <p>We believe experience is one of the most powerful teachers. Learning should go beyond theory and translate into real-world application.</p>
              </div>
            </div>
            <div className="hire-why-item">
              <div className="hire-why-icon">
                <Icon name="sun-dim" size={16} />
              </div>
              <div>
                <h5>Innovation & Adaptability</h5>
                <p>Technology, AI, and industries are constantly evolving. We encourage learners to embrace change, think creatively, and stay future-ready.</p>
              </div>
            </div>
            <div className="hire-why-item">
              <div className="hire-why-icon">
                <Icon name="sun-dim" size={16} />
              </div>
              <div>
                <h5>Ownership & Accountability</h5>
                <p>Growth comes from taking responsibility for outcomes, actions, and continuous improvement.</p>
              </div>
            </div>
            <div className="hire-why-item">
              <div className="hire-why-icon">
                <Icon name="sun-dim" size={16} />
              </div>
              <div>
                <h5>Curiosity & Continuous Learning</h5>
                <p>The most successful professionals never stop learning. We foster a mindset of exploration, growth, and lifelong development.</p>
              </div>
            </div>
            <div className="hire-why-item">
              <div className="hire-why-icon">
                <Icon name="sun-dim" size={16} />
              </div>
              <div>
                <h5>Impact Over Activity</h5>
                <p>We value meaningful outcomes over busy work. Success is measured by the value created, problems solved, and progress achieved.</p>
              </div>
            </div>
          </div>
            </div>
           
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="reveal">
            <span className="section-label">The Challenge</span>
            <h2 className="section-title">
              The World of Work Is Changing.
              <br />
              Learning Needs to Change Too.
            </h2>
            <p className="section-sub" style={{ maxWidth: "100%" }}>
              Technology is evolving faster than ever. AI is transforming how
              businesses operate. Consumer behaviour changes constantly. But
              much of traditional education still struggles to keep pace.
              Today's employers increasingly look for people who can:
            </p>
          </div>
          <div className="about-stats" style={{ marginTop: "32px" }}>
            <div className="hire-why-item">
              <div className="hire-why-icon">
                <Icon name="check" size={16} />
              </div>
              <div>
                <h5>Work with data</h5>
                <p>Transform raw data into actionable business decisions</p>
              </div>
            </div>
            <div className="hire-why-item">
              <div className="hire-why-icon">
                <Icon name="check" size={16} />
              </div>
              <div>
                <h5>Use AI tools effectively</h5>
                <p>Leverage modern AI for productivity and automation</p>
              </div>
            </div>
            <div className="hire-why-item">
              <div className="hire-why-icon">
                <Icon name="check" size={16} />
              </div>
              <div>
                <h5>Understand customer behaviour</h5>
                <p>Analyze and predict consumer patterns</p>
              </div>
            </div>
            <div className="hire-why-item">
              <div className="hire-why-icon">
                <Icon name="check" size={16} />
              </div>
              <div>
                <h5>Execute campaigns and projects</h5>
                <p>Drive outcomes from strategy to delivery</p>
              </div>
            </div>
            <div className="hire-why-item">
              <div className="hire-why-icon">
                <Icon name="check" size={16} />
              </div>
              <div>
                <h5>Communicate ideas clearly</h5>
                <p>Present, persuade, and collaborate effectively</p>
              </div>
            </div>
            <div className="hire-why-item">
              <div className="hire-why-icon">
                <Icon name="check" size={16} />
              </div>
              <div>
                <h5>Adapt to new technologies</h5>
                <p>Stay current in a rapidly evolving landscape</p>
              </div>
            </div>
          </div>
          <div
            className="outcome-box reveal"
            style={{ marginTop: "32px", textAlign: "left" }}
          >
            <p style={{ fontSize: "0.9rem", fontWeight: "400" }}>
              Yet these skills are often learned <em>after</em> entering the
              workforce rather than before.{" "}
              <strong>That's the gap we're working to close.</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="section video-gallery-section">
  <div className="container">
    <div className="reveal" style={{ marginBottom: "40px" }}>
      <span className="section-label">Life at TEONOX</span>

      <h2 className="section-title">
        Moments That Define Us
      </h2>

      <p
        className="section-sub"
        style={{ maxWidth: "100%" }}
      >
        A glimpse into our world — real sessions,
        real energy, real growth.
      </p>
    </div>

    <div className="vc-wrap">
      <button
        className="vc-arrow vc-prev"
        id="vcPrev"
      >
        &#10094;
      </button>

      <div
        className="vc-viewport"
        id="vcViewport"
      >
        <div className="vc-track" id="vcTrack">

          <div
            className="video-card"
            data-url="https://www.instagram.com/reel/DV_KQluArs_/"
          >
            <div className="vc-thumb"></div>

            <div className="vc-embed-wrap">
              <iframe
                src="https://www.instagram.com/reel/DV_KQluArs_/embed"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                allow="autoplay; encrypted-media"
              ></iframe>
            </div>
          </div>

          <div
            className="video-card"
            data-url="https://www.instagram.com/reel/DWN5rOAjMts/"
          >
            <div className="vc-thumb"></div>

            <div className="vc-embed-wrap">
              <iframe
                src="https://www.instagram.com/reel/DWN5rOAjMts/embed"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                allow="autoplay; encrypted-media"
              ></iframe>
            </div>
          </div>

          <div
            className="video-card"
            data-url="https://www.instagram.com/reel/DWf3dceghLh/"
          >
            <div className="vc-thumb"></div>

            <div className="vc-embed-wrap">
              <iframe
                src="https://www.instagram.com/reel/DWf3dceghLh/embed"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                allow="autoplay; encrypted-media"
              ></iframe>
            </div>
          </div>

          <div
            className="video-card"
            data-url="https://www.instagram.com/reel/DYWhSgig_gL/"
          >
            <div className="vc-thumb"></div>

            <div className="vc-embed-wrap">
              <iframe
                src="https://www.instagram.com/reel/DYWhSgig_gL/embed"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                allow="autoplay; encrypted-media"
              ></iframe>
            </div>
          </div>

          <div
            className="video-card"
            data-url="https://www.instagram.com/reel/DV_KQluArs_/"
          >
            <div className="vc-thumb"></div>

            <div className="vc-embed-wrap">
              <iframe
                src="https://www.instagram.com/reel/DV_KQluArs_/embed"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                allow="autoplay; encrypted-media"
              ></iframe>
            </div>
          </div>

          <div
            className="video-card"
            data-url="https://www.instagram.com/reel/DWN5rOAjMts/"
          >
            <div className="vc-thumb"></div>

            <div className="vc-embed-wrap">
              <iframe
                src="https://www.instagram.com/reel/DWN5rOAjMts/embed"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                allow="autoplay; encrypted-media"
              ></iframe>
            </div>
          </div>

          <div
            className="video-card"
            data-url="https://www.instagram.com/reel/DWf3dceghLh/"
          >
            <div className="vc-thumb"></div>

            <div className="vc-embed-wrap">
              <iframe
                src="https://www.instagram.com/reel/DWf3dceghLh/embed"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                allow="autoplay; encrypted-media"
              ></iframe>
            </div>
          </div>

          <div
            className="video-card"
            data-url="https://www.instagram.com/reel/DYWhSgig_gL/"
          >
            <div className="vc-thumb"></div>

            <div className="vc-embed-wrap">
              <iframe
                src="https://www.instagram.com/reel/DYWhSgig_gL/embed"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                allow="autoplay; encrypted-media"
              ></iframe>
            </div>
          </div>

        </div>
      </div>

      <button
        className="vc-arrow vc-next"
        id="vcNext"
      >
        &#10095;
      </button>

      <div className="vc-dots" id="vcDots">
        <span className="vc-dot active"></span>
        <span className="vc-dot"></span>
        <span className="vc-dot"></span>
        <span className="vc-dot"></span>
      </div>
    </div>
  </div>
</section>          

      <section className="section section-alt">
        <div className="container section-center">
          <div className="reveal">
            <span className="section-label">Our Promise</span>
            <h2 className="section-title">The TEONOX Promise</h2>
            <p className="section-sub" style={{ maxWidth: "600px" }}>
              We can't promise shortcuts. We can't promise overnight success.
              What we can promise is an environment where you'll learn by doing,
              gain meaningful exposure, build practical skills, and develop the
              confidence needed to take the next step in your career.{" "}
              <strong style={{ color: "var(--text)" }}>
                Because your future deserves more than just knowledge. It
                deserves experience.
              </strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
