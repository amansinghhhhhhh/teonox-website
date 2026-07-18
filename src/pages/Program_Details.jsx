import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";
import { decodeEntities } from "../utils/decode.js";
import { getProgramBySlug, getMediaUrl } from "../api/wordpressApi";

const overviewIconMap = {
  Duration: "clock",
  Format: "map-pin",
  Structure: "layout",
  Modules: "layers",
  Tools: "wrench",
  Outcome: "briefcase",
};

const whoIconMap = {
  "Fresh Graduates": "graduation-cap",
  "Working Professionals": "briefcase",
};

const howIcons = ["briefcase", "monitor", "wrench", "target", "check-circle"];

const limitedIcons = ["users", "map-pin", "layers"];

export default function Program_Details() {
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toolLogos, setToolLogos] = useState({});
  const [careerImgs, setCareerImgs] = useState({});
  useScrollReveal();

  useEffect(() => {
    let cancelled = false;
    getProgramBySlug(slug)
      .then(async (data) => {
        if (!data) return;
        const a = data.acf || {};

        const tools = a["tools_you_will_get_hands-on_with_repeater"] || [];
        const toolIds = [
          ...new Set(tools.map((t) => t.tool_logo).filter(Boolean)),
        ];
        const tMap = {};
        if (toolIds.length) {
          const urls = await Promise.all(
            toolIds.map((id) => getMediaUrl(id).catch(() => null)),
          );
          toolIds.forEach((id, i) => {
            tMap[id] = urls[i];
          });
        }

        const paths =
          a.where_this_program_can_take_you_repeater ||
          a.where_this_program_can_take_you ||
          [];
        const pIds = [
          ...new Set(paths.map((p) => p.career_path_card_image).filter(Boolean)),
        ];
        const pMap = {};
        if (pIds.length) {
          const urls = await Promise.all(
            pIds.map((id) => getMediaUrl(id).catch(() => null)),
          );
          pIds.forEach((id, i) => {
            pMap[id] = urls[i];
          });
        }

        if (!cancelled) {
          setProgram(data);
          setToolLogos(tMap);
          setCareerImgs(pMap);
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
            <div className="preloader-inner">
              <img src="/assets/asset-001.png" alt="TEONOX" className="preloader-icon" />
              <div className="preloader-ring"></div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const a = program.acf || {};

  const getOverviewIcon = (heading) => {
    const key = Object.keys(overviewIconMap).find((k) =>
      heading?.toLowerCase().includes(k.toLowerCase()),
    );
    return key ? overviewIconMap[key] : "layers";
  };

  const getWhoIcon = (heading) => {
    const key = Object.keys(whoIconMap).find((k) =>
      heading?.toLowerCase().includes(k.toLowerCase()),
    );
    return key ? whoIconMap[key] : "users";
  };

  const tools =
    a["tools_you_will_get_hands-on_with_repeater"] || [];
  const careerPaths =
    a.where_this_program_can_take_you_repeater ||
    a.where_this_program_can_take_you ||
    [];
  const tracks = a.what_you_will_learn_cards || [];
  const overviewCards = a.program_overview_cards || [];
  const whoCards = a.who_this_program_is_for_card || [];
  const howCards = a.how_you_learn_repeater || [];
  const limitedCards = a.limited_seats_cards || [];
  const faqs = a["faq_q&a"] || [];

  const imgUrl =
    program._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/assets/asset-023.jpg";

  const showGuarantee =
    a.section_to_show === "Job Guarantee";
  const showAssistance =
    a.section_to_show === "Job Assistance";

  return (
    <div className="page active" id="page-program">
      <section className="section" style={{ paddingTop: "140px" }}>
        <div className="container">
          {/* HERO */}
          <div className="pg-hero">
            <div className="pg-hero-content">
              <h1>{decodeEntities(a.program_name || a.hero_heading)}</h1>
              {a.program_short_description && (
                <p
                  style={{
                    fontSize: "1.05rem",
                    color: "var(--text)",
                    fontWeight: 600,
                    lineHeight: 1.5,
                    marginBottom: "8px",
                  }}
                >
                  <em
                    dangerouslySetInnerHTML={{
                      __html: a.program_short_description,
                    }}
                  />
                </p>
              )}
              {a.program_hero_subheading && (
                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "var(--text2)",
                    lineHeight: 1.7,
                    maxWidth: "540px",
                    marginBottom: "16px",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: a.program_hero_subheading,
                  }}
                />
              )}
              <div className="pg-hero-meta">
                {a.duration && (
                  <span className="pg-hero-meta-item">
                    <Icon name="clock" />{" "}
                    <strong>{decodeEntities(a.duration)}</strong> Duration
                  </span>
                )}
                {a.mode_on && (
                  <span className="pg-hero-meta-item">
                    <Icon name="map-pin" />{" "}
                    <strong>{decodeEntities(a.mode_on)}</strong>
                  </span>
                )}
              </div>
              {a.program_hero_supporting_line && (
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text3)",
                    lineHeight: 1.6,
                    margin: "12px 0 20px",
                    maxWidth: "540px",
                    padding: "12px 16px",
                    background: "rgba(255,255,255,0.02)",
                    borderLeft: "3px solid var(--orange)",
                    borderRadius: "0 10px 10px 0",
                  }}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: a.program_hero_supporting_line,
                    }}
                  />
                </p>
              )}
              <div className="pg-hero-actions">
                {a.download_the_brochure_button && (
                  <a
                    href={a.download_the_brochure_button}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download the Brochure{" "}
                    <Icon name="download" size={16} />
                  </a>
                )}
                {a.book_a_call_with_career_advisor_button && (
                  <a
                    href={a.book_a_call_with_career_advisor_button}
                    className="btn btn-outline"
                    style={{
                      borderColor: "var(--orange)",
                      color: "var(--orange)",
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a Call with Career Advisor{" "}
                    <Icon name="calendar" size={14} />
                  </a>
                )}
              </div>
            </div>
            <div className="pg-hero-visual">
              <div className="pg-hero-glow"></div>
              <div className="pg-hero-img-wrap">
                <img
                  src={imgUrl}
                  alt={decodeEntities(program.title?.rendered) || "Program"}
                />
              </div>
            </div>
          </div>

          {/* WHO THIS PROGRAM IS FOR */}
          {whoCards.length > 0 && (
            <>
              <div className="reveal mesa-section">
                <div className="section-eyebrow">
                  {decodeEntities(
                    a.who_this_program_is_for_label || "Who This Program Is For",
                  )}
                </div>
              </div>
              <div className="mesa-grid">
                {whoCards.map((card, i) => (
                  <div
                    key={i}
                    className={`mesa-card reveal reveal-d${i + 1}`}
                  >
                    <div className="mesa-badge">
                      <Icon
                        name={getWhoIcon(card.who_this_program_is_for_card_heading)}
                        size={22}
                      />
                    </div>
                    <h4>
                      {decodeEntities(
                        card.who_this_program_is_for_card_heading,
                      )}
                    </h4>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          card.who_this_program_is_for_card_paragraph,
                      }}
                    />
                  </div>
                ))}
              </div>
              {a.who_this_program_is_for_card_note && (
                <div
                  className="reveal"
                  style={{
                    marginTop: "20px",
                    padding: "14px 20px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "10px",
                    fontSize: "15px",
                    color: "var(--text2)",
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: a.who_this_program_is_for_card_note,
                    }}
                  />
                </div>
              )}
            </>
          )}

          {/* PROGRAM OVERVIEW */}
          {overviewCards.length > 0 && (
            <>
              <div className="reveal mesa-section">
                <div className="section-eyebrow">
                  {decodeEntities(
                    a.program_overview_label || "Program Overview",
                  )}
                </div>
              </div>
              <div className="overview-grid">
                {overviewCards.map((card, i) => {
                  const iconName = getOverviewIcon(
                    card.program_overview_heading,
                  );
                  return (
                    <div
                      key={i}
                      className={`overview-card reveal reveal-d${(i % 5) + 1}`}
                    >
                      <div className="overview-card-icon">
                        <Icon
                          name={iconName}
                          size={24}
                          style={{ color: "var(--orange)" }}
                        />
                      </div>
                      <div
                        className="overview-card-value"
                        style={{
                          fontSize:
                            iconName === "layout" || iconName === "briefcase"
                              ? "1.1rem"
                              : "1.6rem",
                        }}
                      >
                        {decodeEntities(card.program_overview_heading)}
                      </div>
                      <div
                        className="overview-card-desc"
                        dangerouslySetInnerHTML={{
                          __html: card.program_overview_paragraph,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* CURRICULUM — WHAT YOU'LL LEARN */}
          {tracks.length > 0 && (
            <>
              <div className="reveal mesa-section">
                <div className="section-eyebrow">
                  {decodeEntities(
                    a.what_you_will_learn_label || "What You'll Learn",
                  )}
                </div>
                <h2
                  className="section-title"
                  style={{ fontSize: "clamp(1.3rem,2.2vw,1.6rem)" }}
                >
                  {decodeEntities(a.what_you_will_learn_heading)}
                </h2>
                {a.What_You_Will_Learn_Paragraph && (
                  <p
                    className="section-sub"
                    style={{ maxWidth: "100%" }}
                    dangerouslySetInnerHTML={{
                      __html: a.What_You_Will_Learn_Paragraph,
                    }}
                  />
                )}
              </div>
              <div className="mesa-tracks">
                {tracks.map((track, i) => (
                  <div
                    key={i}
                    className={`mesa-track reveal reveal-d${(i % 5) + 1} ${i === tracks.length - 1 ? "featured" : ""}`}
                  >
                    <div className="num">
                      {track.what_you_will_learn_number}
                    </div>
                    <span>
                      {decodeEntities(track.what_you_will_learn_heading)}
                    </span>
                  </div>
                ))}
              </div>
              {a.what_you_will_learn_button && (
                <div className="pg-hero-actions" style={{ marginTop: "24px" }}>
                  <a
                    href={a.what_you_will_learn_button}
                    className="btn btn-primary"
                  >
                    Download the Brochure{" "}
                    <Icon name="download" size={16} />
                  </a>
                </div>
              )}
            </>
          )}

          {/* WHERE THIS PROGRAM CAN TAKE YOU */}
          {careerPaths.length > 0 && (
            <>
              <div className="reveal mesa-section">
                <div className="section-eyebrow">
                  {decodeEntities(
                    a.where_this_program_can_take_you_section_label ||
                      "Where This Program Can Take You",
                  )}
                </div>
                {a.where_this_program_can_take_you_section_paragraph && (
                  <div
                    className="working-professional-section"
                    dangerouslySetInnerHTML={{
                      __html: a.where_this_program_can_take_you_section_paragraph,
                    }}
                  />
                )}
              </div>

              <div className="reveal" style={{ marginTop: "32px" }}>
                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "24px",
                    padding: "32px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    className="skills-grid"
                    style={{
                      gridTemplateColumns: "repeat(3,1fr)",
                      gap: "10px",
                    }}
                  >
                    {careerPaths.map((path, i) => {
                      const imgUrl = careerImgs[path.career_path_card_image];
                      return (
                        <div
                          key={i}
                          className="program-card"
                          style={{
                            padding: "16px",
                            textAlign: "center",
                          }}
                        >
                          <div
                            className="program-card-icon"
                            style={{
                              width: "40px",
                              height: "40px",
                              margin: "0 auto 10px",
                            }}
                          >
                            {imgUrl ? (
                              <img
                                src={imgUrl}
                                alt={decodeEntities(
                                  path.career_path_card_heading,
                                )}
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  objectFit: "contain",
                                  borderRadius: "6px",
                                }}
                              />
                            ) : (
                              <Icon name="briefcase" size={18} />
                            )}
                          </div>
                          <h4 style={{ fontSize: "0.82rem" }}>
                            {decodeEntities(path.career_path_card_heading)}
                          </h4>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {a.where_this_program_can_take_you_section_note && (
                <div
                  className="outcome-box reveal"
                  style={{
                    marginTop: "20px",
                    textAlign: "center",
                    padding: "20px",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: a.where_this_program_can_take_you_section_note,
                  }}
                />
              )}
            </>
          )}

          {/* TOOLS */}
          {tools.length > 0 && (
            <>
              <div className="reveal visible mesa-section">
                <div className="section-eyebrow">
                  {decodeEntities(
                    a["tools_you_will_get_hands-on_with_label"] ||
                      "Tools You'll Get Hands-On With",
                  )}
                </div>
              </div>
              <div
                className="reveal visible tools-cloud"
                style={{ marginTop: "20px" }}
              >
                {tools.map((tool, i) => {
                  const logoUrl = toolLogos[tool.tool_logo];
                  return (
                    <span
                      key={i}
                      className={`tool-chip ${i < 2 ? "hi" : ""}`}
                    >
                      {logoUrl && (
                        <span className="logo-badge">
                          <img
                            src={logoUrl}
                            alt={decodeEntities(tool.tool_name)}
                          />
                        </span>
                      )}
                      {decodeEntities(tool.tool_name)}
                    </span>
                  );
                })}
              </div>
              {a["tools_you_will_get_hands-on_with_paragraph"] && (
                <div
                  className="reveal visible"
                  style={{
                    marginTop: "16px",
                    fontSize: "0.85rem",
                    color: "var(--text3)",
                    textAlign: "center",
                  }}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html:
                        a["tools_you_will_get_hands-on_with_paragraph"],
                    }}
                  />
                </div>
              )}
            </>
          )}

          {/* HOW YOU LEARN */}
          {howCards.length > 0 && (
            <div className="reveal mesa-section">
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "24px",
                  padding: "48px 40px",
                }}
              >
                <div className="section-eyebrow">
                  {decodeEntities(
                    a.how_you_learn_label || "How You Learn",
                  )}
                </div>
                {a.how_you_learn_paragraph && (
                  <p
                    className="section-sub"
                    style={{ maxWidth: "100%" }}
                    dangerouslySetInnerHTML={{
                      __html: a.how_you_learn_paragraph,
                    }}
                  />
                )}
                <div className="learn-grid" style={{ marginTop: "32px" }}>
                  {howCards.map((card, i) => (
                    <div
                      key={i}
                      className={`learn-card reveal reveal-d${(i % 5) + 1}`}
                    >
                      <div className="ico">
                        <Icon
                          name={howIcons[i] || "briefcase"}
                          size={16}
                        />
                      </div>
                      <h4>
                        {decodeEntities(
                          card.how_you_learn_card_heading,
                        )}
                      </h4>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            card.how_you_learn_card_paragraph || "",
                        }}
                      />
                    </div>
                  ))}
                </div>
                {a.how_you_learn_note && (
                  <div
                    className="outcome-box reveal"
                    style={{ marginTop: "24px", textAlign: "center" }}
                    dangerouslySetInnerHTML={{
                      __html: a.how_you_learn_note,
                    }}
                  />
                )}
              </div>
            </div>
          )}

          {/* LIMITED SEATS */}
          {limitedCards.length > 0 && (
            <div className="reveal" style={{ marginTop: "60px" }}>
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  padding: "40px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "40px",
                  alignItems: "center",
                }}
              >
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-head)",
                      fontSize: "clamp(1.3rem,2.5vw,1.8rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      margin: "0 0 12px",
                    }}
                  >
                    {decodeEntities(
                      a.limited_seats_label || "Limited Seats",
                    )}
                  </h2>
                  {a.limited_seats_paragraph && (
                    <p
                      style={{
                        fontSize: "0.92rem",
                        color: "var(--text2)",
                        lineHeight: 1.7,
                      }}
                      dangerouslySetInnerHTML={{
                        __html: a.limited_seats_paragraph,
                      }}
                    />
                  )}
                  {a.limited_seats_button_1 && (
                    <div
                      style={{
                        marginTop: "24px",
                        display: "flex",
                        gap: "12px",
                        flexWrap: "wrap",
                      }}
                    >
                      <a
                        href={a.limited_seats_button_1}
                        className="btn btn-primary"
                        style={{ padding: "14px 32px", fontSize: "0.92rem" }}
                      >
                        Reserve Your Seat Now{" "}
                        <Icon name="arrow-right" size={16} />
                      </a>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  {limitedCards.map((card, i) => (
                    <div
                      key={i}
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid var(--border)",
                        borderRadius: "14px",
                        padding: "16px 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                      }}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          background: "rgba(255,92,26,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flex: "none",
                        }}
                      >
                        <Icon
                          name={limitedIcons[i] || "layers"}
                          size={18}
                          style={{ color: "var(--orange)" }}
                        />
                      </div>
                      <div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: "0.92rem",
                          }}
                        >
                          {decodeEntities(
                            card.limited_seats_heading,
                          )}
                        </div>
                        <div
                          style={{
                            fontSize: "0.78rem",
                            color: "var(--text3)",
                            marginTop: "1px",
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              card.limited_seats_paragraph || "",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* GUARANTEE / ASSISTANCE */}
          {(showGuarantee || showAssistance) && (
            <div className="reveal" style={{ marginTop: "60px" }}>
              {showGuarantee && a.job_guarantee_group && (
                <div className="mesa-banner">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <h4>
                        {decodeEntities(
                          a.job_guarantee_group
                            .placement_guarantee_label ||
                            "Placement Guarantee",
                        )}
                      </h4>
                      <p
                        style={{
                          color: "var(--text2)",
                          fontSize: "0.85rem",
                          marginTop: "4px",
                        }}
                        dangerouslySetInnerHTML={{
                          __html:
                            a.job_guarantee_group.get_hired_paragraph,
                        }}
                      />
                    </div>
                  </div>
                  {a.job_guarantee_group.reserve_your_seat && (
                    <a
                      href={a.job_guarantee_group.reserve_your_seat}
                      className="btn btn-primary btn-sm"
                    >
                      Enroll Now{" "}
                      <Icon name="arrow-right" size={14} />
                    </a>
                  )}
                </div>
              )}
              {showAssistance && a.job_assistance_group && (
                <div className="mesa-banner">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <h4>
                        {decodeEntities(
                          a.job_assistance_group
                            .job_assistance_program_label ||
                            "Job Assistance Program",
                        )}
                      </h4>
                      <p
                        style={{
                          color: "var(--text2)",
                          fontSize: "0.85rem",
                          marginTop: "4px",
                        }}
                        dangerouslySetInnerHTML={{
                          __html:
                            a.job_assistance_group.get_hired_paragraph,
                        }}
                      />
                    </div>
                  </div>
                  {a.job_assistance_group.reserve_your_seat && (
                    <a
                      href={a.job_assistance_group.reserve_your_seat}
                      className="btn btn-primary btn-sm"
                    >
                      Enroll Now{" "}
                      <Icon name="arrow-right" size={14} />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}

          {/* FAQ */}
          {faqs.length > 0 && (
            <>
              <div className="reveal" style={{ marginTop: "60px" }}>
                <span className="section-label">
                  {decodeEntities(
                    a.faq_label || "FAQ",
                  )}
                </span>
                <h2
                  className="section-title"
                  style={{ fontSize: "clamp(1.3rem,2.5vw,1.8rem)" }}
                >
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="faq-grid">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className={`faq-item reveal reveal-d${(i % 4) + 1}`}
                  >
                    <div className="faq-q">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: faq.faq_question,
                        }}
                      />{" "}
                      <Icon name="chevron-down" />
                    </div>
                    <div
                      className="faq-a"
                      dangerouslySetInnerHTML={{
                        __html: faq.faq_answer,
                      }}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
