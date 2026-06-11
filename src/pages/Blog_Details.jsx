import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useLucide from "../hooks/useLucide.js";
import useScrollReveal from "../hooks/useScrollReveal.js";
import { getBlogBySlug, getRelatedBlogs } from "../api/wordpressApi";
import { decodeEntities } from "../utils/decode.js";
export default function Blog_Details() {
  useLucide();
  useScrollReveal();

  const { slug } = useParams();
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    getBlogBySlug(slug)
      .then((currentPost) => {
        setBlog(currentPost);

        if (currentPost?.categories?.length) {
          return getRelatedBlogs(currentPost.categories[0], currentPost.id);
        }

        return [];
      })
      .then((related) => {
        setRelatedBlogs(related);
      })
      .catch(console.error);
  }, [slug]);

  if (!blog) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  const readTime = Math.max(
    1,
    Math.ceil(
      blog.content.rendered.replace(/<[^>]*>/g, "").split(" ").length / 200,
    ),
  );

  return (
    <div className="page active testnew">
      <section className="section" style={{ paddingTop: "120px" }}>
        <div className="container">
          <Link
            to="/blog"
            className="reveal visible"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.82rem",
              color: "var(--text2)",
              marginBottom: "32px",
              transition: "color var(--t-fast)",
            }}
          >
            <i
              data-lucide="arrow-left"
              style={{ width: "16px", height: "16px" }}
            ></i>
            Back to Insights
          </Link>

          <div
            className="reveal"
            style={{ maxWidth: "100%", margin: "0 auto" }}
          >
            <div
              style={{
                borderRadius: "var(--r3)",
                overflow: "hidden",
                marginBottom: "40px",
                border: "1px solid var(--border2)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src={
                  blog._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                  "https://via.placeholder.com/1400x800"
                }
                alt={decodeEntities(blog.title.rendered?.replace(/<[^>]+>/g, ""))}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  filter: "saturate(0.7)",
                  transition: "filter 0.6s ease, transform 0.8s ease",
                }}
              />
            </div>
          </div>

          <div
            className="reveal"
            style={{ maxWidth: "100%", margin: "0 auto" }}
          >
            <div
              className="pg-hero-meta"
              style={{ justifyContent: "center", marginBottom: "20px" }}
            >
              <div className="pg-hero-meta-item">
                <i data-lucide="user"></i>
                <strong>
                  {blog._embedded?.author?.[0]?.name || "TEONOX Team"}
                </strong>
              </div>
              <div className="pg-hero-meta-divider"></div>
              <div className="pg-hero-meta-item">
                <i data-lucide="calendar"></i>
                <strong>
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </strong>
              </div>
              <div className="pg-hero-meta-divider"></div>
              <div className="pg-hero-meta-item">
                <i data-lucide="clock"></i>
                <strong>{readTime} min read</strong>
              </div>
            </div>

            <h1
              style={{
                fontFamily: "var(--font-head)",
                fontSize: "clamp(2rem,4vw,3.2rem)",
                fontWeight: "800",
                lineHeight: "1.08",
                letterSpacing: "-0.04em",
                color: "var(--text)",
                marginBottom: "24px",
                textAlign: "center",
              }}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: blog.title.rendered,
                }}
              />
            </h1>
          </div>

          {/* <div
            className="reveal"
            style={{ maxWidth: "100%", margin: "0 auto", paddingTop: "16px" }}
          >
            <div
              className="pg-hero-sub"
              style={{
                maxWidth: "100%",
                fontSize: "1.1rem",
                marginBottom: "32px",
                color: "var(--text2)",
                lineHeight: "1.8",
                textAlign: "center",
              }}
              dangerouslySetInnerHTML={{
                __html: blog.excerpt.rendered,
              }}
            />
          </div> */}

          <div
            className="reveal"
            style={{ maxWidth: "100%", margin: "48px auto 0" }}
          >
            <div
              style={{
                width: "60px",
                height: "3px",
                background: "var(--orange-grad)",
                borderRadius: "3px",
                marginBottom: "32px",
              }}
            ></div>

            <div
              className="section-sub"
              style={{
                maxWidth: "100%",
                fontSize: "1rem",
                lineHeight: "1.9",
              }}
              dangerouslySetInnerHTML={{
                __html: blog.content.rendered,
              }}
            />
          </div>

          {/* related Blogs */}
          <div style={{ marginTop: "80px", marginBottom: "40px" }}>
            <div className="reveal" style={{ marginBottom: "40px" }}>
              <span className="section-label">Related Articles</span>
              <h2
                className="section-title"
                style={{ fontSize: "clamp(1.5rem,3vw,2.4rem)" }}
              >
                You May Also Like
              </h2>
            </div>
            <div className="blog-grid">
              {relatedBlogs.map((post, index) => {
                const image =
                  post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                  "https://via.placeholder.com/800x500";

                const readTime = Math.max(
                  1,
                  Math.ceil(
                    post.content.rendered.replace(/<[^>]*>/g, "").split(" ")
                      .length / 200,
                  ),
                );

                return (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <article
                      className={`blog-card reveal reveal-d${index + 1}`}
                    >
                      <div className="blog-img">
                        <img src={image} alt={decodeEntities(post.title.rendered?.replace(/<[^>]+>/g, ""))} />

                        <span className="blog-tag-pill">Related</span>
                      </div>

                      <div className="blog-body">
                        <h4
                          dangerouslySetInnerHTML={{
                            __html: post.title.rendered,
                          }}
                        />

                        <p>
                          {decodeEntities(post.excerpt?.rendered
                            ?.replace(/<[^>]*>/g, "")
                            ?.substring(0, 120))}
                          ...
                        </p>

                        <div className="blog-footer">
                          <div className="blog-avatar">TN</div>

                          <div className="blog-meta">
                            <strong>TEONOX Team</strong>
                            <span>{readTime} min read</span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
