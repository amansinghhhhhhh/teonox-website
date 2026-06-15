import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from '../components/Icon.jsx';
import useScrollReveal from "../hooks/useScrollReveal.js";
import { getBlogs, getCategories } from "../api/wordpressApi";
import { decodeEntities } from "../utils/decode.js";
import { sanitizeHtml } from "../utils/sanitize.js";
export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("");  
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mediaMap, setMediaMap] = useState({});
  useScrollReveal();

  
  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getBlogs(selectedCategory)
      .then((data) => {
        setBlogs(data);
      })
      .catch(console.error);
  }, [selectedCategory]);

  return (
    <div className="page active">
      <section className="section" style={{ paddingTop: "140px" }}>
        <div className="container">
          <div className="section-center reveal">
            <span className="section-label">Insights for the Future of Marketing</span>
            <h2 className="section-title">Blogs</h2>
            <p className="section-sub" style={{ maxWidth: "600px" }}>
              Explore practical perspectives on AI, marketing, business growth,
              career development, and the skills shaping tomorrow's
              opportunities.
            </p>
            <div
              className="hero-actions"
              style={{ justifyContent: "center", marginTop: "24px" }}
            >
              <a href="#" className="btn btn-primary btn-sm">
                Explore Articles{" "}
                <Icon name="arrow-right" size={14} />
              </a>
              <a href="#" className="btn btn-outline btn-sm">
                Subscribe for Updates
              </a>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              justifyContent: "center",
              margin: "40px 0 48px",
              cursor: "pointer",
            }}
          >
            <span
              className={
                selectedCategory === "" ? "nav-cta" : "job-tag job-tag-new  "
              }
              onClick={() => setSelectedCategory("")}
            >
              All
            </span>

            {categories.map((cat) => (
              <span
                className={selectedCategory === cat.id ? "nav-cta" : "job-tag"}
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {decodeEntities(cat.name)}
              </span>
            ))}
          </div>

          <div className="blog-grid">
            {blogs.map((blog, index) => {
              const image =
                blog._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                "/assets/asset-023.jpg";

              const category =
                blog._embedded?.["wp:term"]?.[0]?.[0]?.name || "General";

              return (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    className={`blog-card reveal reveal-d${(index % 3) + 1}`}
                  >
                    <div className="blog-img">
                      <img src={image} alt={decodeEntities(blog.title.rendered?.replace(/<[^>]+>/g, ""))} />

                      <span className="blog-tag">{decodeEntities(category)}</span>
                    </div>

                    <div className="blog-body">
                      <h4
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtml(blog.title.rendered),
                        }}
                      />

                      <p
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtml(
                            blog.excerpt?.rendered
                              ?.replace(/<[^>]+>/g, "")
                              ?.slice(0, 120) + "...",
                          ),
                        }}
                      />

                      <div className="blog-meta">
                        <span>By TEONOX Team</span>
                        <span>—</span>
                        <span>{new Date(blog.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}


