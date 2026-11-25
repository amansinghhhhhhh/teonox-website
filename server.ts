import express from "express";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import {
  normalizeProgramSeoDescription,
  normalizeProgramSeoTitle,
  normalizeProgramSlug,
  resolveCmsProgramSlug,
  stripProgramHtmlTags,
} from "./src/data/programCmsMap";

// Load .env from the app dir OR Hostinger's hbuilds layout, where the env
// file lives outside the deploy dir (…/hbuilds/config/.env) while the app
// runs from …/hbuilds/current/<dir>/). First file found wins; dotenv never
// overrides real environment variables, so panel-set vars always take
// precedence over file values.
for (const candidate of [
  path.join(process.cwd(), ".env"),
  path.join(process.cwd(), "..", "config", ".env"),
  path.join(process.cwd(), "..", "..", "config", ".env"),
]) {
  if (fs.existsSync(candidate)) {
    dotenv.config({ path: candidate });
    break;
  }
}

const app = express();
const PORT = 3000;

app.use(express.json());

// ─── 301 Redirect Middleware (www to non-www canonical enforcement) ───
app.use((req, res, next) => {
  const host = req.headers.host || '';
  if (host.startsWith('www.')) {
    const nonWwwHost = host.replace(/^www\./, '');
    return res.redirect(301, `https://${nonWwwHost}${req.originalUrl}`);
  }
  next();
});

// ─── Dynamic Sitemap ───────────────────────────────────────────────
// Generates sitemap.xml on-the-fly from live WordPress data.
// No build/push needed — updates automatically when blogs are added/removed.
const BASE_URL = 'https://teonox.com';
const CMS_BASE = 'https://cms.teonox.com/index.php?rest_route=/wp/v2';
// Correct REST base used for Rank Math programme metadata. The legacy
// index.php?rest_route= URL above now redirects to the public blog HTML.
const CMS_PROGRAM_REST_BASE = 'https://cms.teonox.com/wp-json/wp/v2/program';
const PROGRAM_IDS = [
  'business-digital-marketing-with-ai',
  'performance-marketing',
  'seo-specialization',
  'social-media-marketing',
];
import routes from "./src/routes.json";
export const STATIC_ROUTES = routes;

const STATIC_PAGES = STATIC_ROUTES.map((r) => ({ path: r.path, priority: r.priority, changefreq: r.changefreq }));

async function fetchLiveBlogSlugs(): Promise<Array<{ slug: string; lastmod: string }>> {
  try {
    const res = await fetch(`${CMS_BASE}/posts&_fields=slug,date&per_page=100&_cb=${Date.now()}`);
    if (!res.ok) return [];
    const type = (res.headers.get('content-type') || '').toLowerCase();
    if (!type.includes('application/json')) return [];
    const posts = await res.json();
    if (!Array.isArray(posts)) return [];
    return posts
      .map((p: any) => ({
        slug: String(p.slug || ''),
        lastmod: p.date ? p.date.split('T')[0] : new Date().toISOString().split('T')[0],
      }))
      .filter((p) => p.slug);
  } catch {
    return [];
  }
}

function buildSitemapUrl(loc: string, lastmod: string, changefreq: string, priority: string): string {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

// Serve static sitemap.xml
// Removed app.get('/sitemap.xml') as it is now served as a static file

// ─── Dynamic Sitemap HTML ──────────────────────────────────────────
app.get('/sitemap.html', async (_req, res) => {
  const blogs = await fetchLiveBlogSlugs();
  const blogLinks = blogs.map((p) => `<li><a href="${BASE_URL}/blog/${p.slug}">${BASE_URL}/blog/${p.slug}</a></li>`).join('\n');
  const programLinks = PROGRAM_IDS.map((id) => `<li><a href="${BASE_URL}/programmes/${id}">${BASE_URL}/programmes/${id}</a></li>`).join('\n');
  const pageLinks = STATIC_PAGES.map((p) => `<li><a href="${BASE_URL}${p.path}">${BASE_URL}${p.path}</a></li>`).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TEONOX Sitemap</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 2rem auto; padding: 0 1rem; color: #111; }
    h1 { border-bottom: 2px solid #F15A29; padding-bottom: 0.5rem; }
    .section { margin: 1.5rem 0; }
    h2 { color: #F15A29; margin-bottom: 0.5rem; }
    ul { list-style: none; padding: 0; }
    li { padding: 0.3rem 0; }
    a { color: #111; text-decoration: none; }
    a:hover { text-decoration: underline; color: #F15A29; }
  </style>
</head>
<body>
  <h1>TEONOX Sitemap</h1>
  <p>Auto-generated from live WordPress data — no rebuild needed.</p>
  <p><a href="${BASE_URL}/sitemap.xml">Download XML Sitemap</a></p>
  <div class="section"><h2>Main Pages</h2><ul>${pageLinks}</ul></div>
  <div class="section"><h2>Programmes</h2><ul>${programLinks}</ul></div>
  <div class="section"><h2>Blog Posts (${blogs.length} live)</h2><ul>${blogLinks.length > 0 ? blogLinks : '<li>No blog posts found</li>'}</ul></div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

const SITE_NAME = 'TEONOX';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.webp`;

// ─── Server-Side Meta Injection ────────────────────────────────────
// Every route returns a unique <title>, <meta description>, <link rel="canonical">,
// and Open Graph tags in the initial HTML so crawlers see them without JS.
interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
  /** Robots directive. Defaults to 'index, follow' when omitted. */
  robots?: string;
}

const META_MAP: Record<string, RouteMeta> = {
  '/': {
    title: 'AI Automation & Digital Marketing Courses in Pune | Teonox',
    description: "Upskill with Teonox's AI automation & digital marketing courses in Pune. 100% placement support for students, graduates & career switchers. Enrol today!",
    canonical: '/',
  },
  '/about': {
    title: 'Business Digital Marketing Classes in Pune | Teonox',
    description: 'Learn business digital marketing classes in Pune at Teonox, a trusted digital marketing training institute with practical, placement-focused courses.',
    canonical: '/about',
  },
  '/programmes': {
    title: 'Best Digital Marketing Course in Pune Near You | Teonox',
    description: "Join Teonox's top digital marketing courses in Pune classroom & AI-integrated training, live projects, certification & placement support. Enrol now.",
    canonical: '/programmes',
  },
  '/programmes/build-digital-marketing-skills-with-ai': {
    title: 'Digital Marketing Skills in Pune | Course with Live Projects',
    description: 'Learn digital marketing skills in Pune with a practical course featuring live projects. Build SEO, social media, PPC and marketing skills for your career.',
    canonical: '/programmes/build-digital-marketing-skills-with-ai',
  },
  '/programmes/business-digital-marketing-with-ai-6-months-online': {
    title: 'Best Business Digital Marketing With AI - Online Course Pune',
    description: 'Upskill with Teonox AI automation and Business digital marketing online courses in Pune. Assured placement support for students, graduates and career switchers. Enrol today!',
    canonical: '/programmes/business-digital-marketing-with-ai-6-months-online',
  },
  // React-only programme routes: no matching CMS item today, so these static
  // values keep their metadata route-specific. A future CMS program with the
  // same slug is picked up automatically because dynamic CMS lookup runs first.
  '/programmes/business-digital-marketing-with-ai': {
    title: 'Business Digital Marketing With AI | TEONOX',
    description: 'Become a complete digital marketer, trained across AI, SEO, paid ads, analytics, and business growth.',
    canonical: '/programmes/business-digital-marketing-with-ai',
  },
  '/programmes/performance-marketing': {
    title: 'Specialisation in Performance Marketing | TEONOX',
    description: 'Advanced Paid Media, Tracking, Attribution, Experimentation, Analytics & Scaling.',
    canonical: '/programmes/performance-marketing',
  },
  '/programmes/seo-specialization': {
    title: 'Specialisation in Search Engine Optimisation | TEONOX',
    description: 'Advanced SEO, AI Search, Technical SEO, Digital Authority & Organic Growth.',
    canonical: '/programmes/seo-specialization',
  },
  '/programmes/social-media-marketing': {
    title: 'Specialisation in Social Media Marketing | TEONOX',
    description: 'Social Media Strategy, Content Creation, Community Management, Analytics & Paid Social.',
    canonical: '/programmes/social-media-marketing',
  },
  // CMS-backed routes also carry static fallbacks so an API outage never
  // drops them back to the homepage title/description.
  '/programmes/business-digital-marketing-with-ai-6-months': {
    title: 'Business Digital Marketing With AI | TEONOX',
    description: 'Become a complete digital marketer, trained across AI, SEO, paid ads, analytics, and business growth.',
    canonical: '/programmes/business-digital-marketing-with-ai-6-months',
  },
  '/programmes/specialisation-in-performance-marketing': {
    title: 'Specialisation in Performance Marketing | TEONOX',
    description: 'Advanced Paid Media, Tracking, Attribution, Experimentation, Analytics & Scaling.',
    canonical: '/programmes/specialisation-in-performance-marketing',
  },
  '/programmes/specialisation-in-search-engine-optimisation': {
    title: 'Specialisation in Search Engine Optimisation | TEONOX',
    description: 'Advanced SEO, AI Search, Technical SEO, Digital Authority & Organic Growth.',
    canonical: '/programmes/specialisation-in-search-engine-optimisation',
  },
  '/programmes/specialisation-in-social-media-marketing': {
    title: 'Specialisation in Social Media Marketing | TEONOX',
    description: 'Social Media Strategy, Content Creation, Community Management, Analytics & Paid Social.',
    canonical: '/programmes/specialisation-in-social-media-marketing',
  },
  '/blog': {
    title: 'Blog & Insights | TEONOX',
    description: 'Read the latest insights on AI, digital marketing, automation, and career growth from TEONOX \u2014 Gen AI School of Marketing & Business in Pune.',
    canonical: '/blog',
  },
  '/contact': {
    title: 'Digital Marketing Course Institute in Kothrud, Pune | Teonox',
    description: 'Looking for a digital marketing course institute near you in Pune? Teonox offers offline & online digital marketing courses in Kothrud & across Pune.',
    canonical: '/contact',
  },
  '/admissions': {
    title: 'Admissions | TEONOX',
    description: 'Apply for TEONOX admissions \u2014 AI-integrated digital marketing courses in Pune with assured placement. Learn from 12+ year experience faculty, 50+ tools, and practical training.',
    canonical: '/admissions',
  },
  '/careers': {
    title: 'Job Guarantee Digital Marketing Course in Pune | Teonox',
    description: 'Career-oriented digital marketing course in Pune with 100% job guarantee. Placement-focused training for freshers, graduates & career switchers.',
    canonical: '/careers',
  },
  '/why-teonox': {
    title: 'Why Teonox? AI-Digital Marketing School in Pune',
    description: "Discover why Teonox is Pune's leading AI marketing school. Learn business digital marketing with AI-driven, industry-relevant training. Know more.",
    canonical: '/why-teonox',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | TEONOX',
    description: 'Read the TEONOX Privacy Policy \u2014 how we collect, use, store, and protect your personal information.',
    canonical: '/privacy-policy',
  },
  '/career-unlocked': {
    title: 'Career Unlocked: Digital Marketing, Business & AI Workshop in Pune | Teonox',
    description: '90-minute live career workshop for students, graduates, and aspiring marketers. Backed by A2 Digital, 12+ years of industry experience.',
    canonical: '/career-unlocked',
  },
  '/career-unlocked/thank-you': {
    title: 'Registration Successful | Career Unlocked',
    description: 'You have successfully registered for the Career Unlocked webinar.',
    canonical: '/career-unlocked/thank-you',
  },
  '/thank-you': {
    title: 'Thank You | TEONOX',
    description: 'Thank you for contacting TEONOX. Our team will reach out shortly.',
    canonical: '/thank-you',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | TEONOX',
    description: 'Read the TEONOX Terms & Conditions \u2014 governing your access to and use of our website, programmes, and services.',
    canonical: '/terms-and-conditions',
  },
  '/enquiry-form': {
    title: 'Enquiry Form | TEONOX',
    description: 'Fill out the TEONOX enquiry form for digital marketing and AI course admissions in Pune. Get callback support for classroom and online programmes.',
    canonical: '/enquiry-form',
    // Pre-launch: keep the form out of the index until signoff.
    robots: 'noindex, nofollow',
  },
};

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildMetaTags(meta: RouteMeta): string {
  const title = escapeHtml(meta.title);
  const desc = escapeHtml(meta.description);
  const canonicalUrl = `${BASE_URL}${meta.canonical}`;
  const ogType = meta.ogType || 'website';
  const robots = escapeHtml(meta.robots || 'index, follow');

  // react-helmet-async claims head tags with data-rh. Marking the injected
  // tags the same way lets Helmet replace them instead of appending a second
  // <title>/description/og:* set on hydration.
  return `<title data-rh="true">${title}</title>
    <meta data-rh="true" name="description" content="${desc}">
    <meta data-rh="true" name="robots" content="${robots}">
    <link data-rh="true" rel="canonical" href="${canonicalUrl}">
    <meta data-rh="true" property="og:title" content="${title}">
    <meta data-rh="true" property="og:description" content="${desc}">
    <meta data-rh="true" property="og:image" content="${DEFAULT_OG_IMAGE}">
    <meta data-rh="true" property="og:url" content="${canonicalUrl}">
    <meta data-rh="true" property="og:type" content="${ogType}">
    <meta data-rh="true" property="og:site_name" content="${SITE_NAME}">`;
}

// Simple in-memory cache for dynamic route metadata (avoid repeated WP API calls)
const dynamicMetaCache = new Map<string, { meta: RouteMeta; ts: number }>();
const CACHE_TTL = 60 * 1000; // 60s — Rank Math edits propagate within a minute

function getCachedDynamicMeta(key: string): RouteMeta | null {
  const entry = dynamicMetaCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) {
    dynamicMetaCache.delete(key);
    return null;
  }
  return entry.meta;
}

function setCachedDynamicMeta(key: string, meta: RouteMeta): void {
  dynamicMetaCache.set(key, { meta, ts: Date.now() });
}

async function fetchBlogMeta(slug: string): Promise<RouteMeta | null> {
  const cacheKey = `blog:${slug}`;
  const cached = getCachedDynamicMeta(cacheKey);
  if (cached) return cached;

  try {
    const res = await fetch(
      `${CMS_BASE}/posts&slug=${encodeURIComponent(slug)}&_fields=title,excerpt&per_page=1&_cb=${Date.now()}`
    );
    if (!res.ok) return null;
    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) return null;

    const post = posts[0];
    const title = decodeHtmlEntities(post.title?.rendered || '').replace(/<[^>]*>/g, '');
    const excerpt = decodeHtmlEntities(post.excerpt?.rendered || '').replace(/<[^>]*>/g, '').slice(0, 160);

    const meta: RouteMeta = {
      title: `${title} | TEONOX Blog`,
      description: excerpt || `Read about ${title} on the TEONOX blog.`,
      canonical: `/blog/${slug}`,
      ogType: 'article',
    };
    setCachedDynamicMeta(cacheKey, meta);
    return meta;
  } catch {
    return null;
  }
}

async function fetchProgramMeta(slug: string): Promise<RouteMeta | null> {
  const routeSlug = normalizeProgramSlug(slug);
  if (!routeSlug) return null;

  const cacheKey = `program:${routeSlug}`;
  const cached = getCachedDynamicMeta(cacheKey);
  if (cached) return cached;

  try {
    const cmsSlug = resolveCmsProgramSlug(routeSlug);
    const fields = '_fields=id,slug,title,acf,rank_math_seo';
    const url = /^\d+$/.test(cmsSlug)
      ? `${CMS_PROGRAM_REST_BASE}/${cmsSlug}?${fields}`
      : `${CMS_PROGRAM_REST_BASE}?slug=${encodeURIComponent(cmsSlug)}&${fields}&per_page=1`;

    const res = await fetch(`${url}&_cb=${Date.now()}`);
    if (!res.ok) return null;
    const data = await res.json();
    const post = Array.isArray(data) ? data[0] : data;
    if (!post) return null;

    const rankTitle = normalizeProgramSeoTitle(post.rank_math_seo?.title || '');
    const rankDescription = normalizeProgramSeoDescription(post.rank_math_seo?.description || '');
    if (!rankTitle && !rankDescription) return null;

    const wpTitle = stripProgramHtmlTags(post.title?.rendered || '');
    const heroIntro = stripProgramHtmlTags(post.acf?.hero_intro || '').slice(0, 160);
    const staticMeta = META_MAP[`/programmes/${routeSlug}`];

    const meta: RouteMeta = {
      title: rankTitle || staticMeta?.title || (wpTitle ? `${wpTitle} | TEONOX` : 'Programme | TEONOX'),
      description:
        rankDescription ||
        heroIntro ||
        staticMeta?.description ||
        `Explore ${wpTitle || 'this programme'} at TEONOX \u2014 Gen AI School of Marketing & Business in Pune.`,
      // Always canonicalise to the on-site route, never the CMS permalink/slug.
      canonical: `/programmes/${routeSlug}`,
    };
    setCachedDynamicMeta(cacheKey, meta);
    return meta;
  } catch {
    return null;
  }
}

// Resolve metadata for any SPA path (static or dynamic)
async function resolveRouteMeta(pathname: string): Promise<RouteMeta | null> {

  const clean = pathname.replace(/\/+$/, '') || '/';
  const segments = clean.split('/').filter(Boolean);

  // Dynamic: /blog/:slug
  if (segments.length === 2 && segments[0] === 'blog') {
    return (await fetchBlogMeta(segments[1])) || META_MAP[clean] || null;
  }

  // Dynamic: /programmes/:slug or /programs/:slug or /program/:slug.
  // Check the CMS before META_MAP so Rank Math edits win even for routes that
  // also have a static fallback entry. META_MAP still covers React-only
  // routes, empty Rank Math fields, and a temporarily unreachable CMS.
  if (segments.length === 2 && (segments[0] === 'programmes' || segments[0] === 'programs' || segments[0] === 'program')) {
    const dynamic = await fetchProgramMeta(segments[1]);
    if (dynamic) return dynamic;
    return META_MAP[clean] || null;
  }

  // Exact static match for every other route
  if (META_MAP[clean]) return META_MAP[clean];

  return null;
}

// Route-specific <head> extras (e.g. LCP image preloads)
const HEAD_EXTRAS: Record<string, string> = {
  '/career-unlocked': `    <link rel="preload" as="image" href="/career-unlocked/media/global-tech-visionary.webp" media="(min-width: 1024px)" fetchpriority="high">
    <link rel="preload" as="image" href="/career-unlocked/media/hero-mobile-bg.webp" media="(max-width: 1023px)" fetchpriority="high">`,
};

// Serve index.html with injected route-specific meta tags
function serveWithMeta(html: string) {
  return async (req: express.Request, res: express.Response) => {
    const meta = await resolveRouteMeta(req.path);
    if (!meta) {
      // If the route meta cannot be resolved (e.g. CMS unreachable), 
      // do not automatically redirect. Let the SPA attempt to load it.
      return res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
    }

    const metaHtml = buildMetaTags(meta);
    // Strip the template's fallback SEO tags BEFORE inserting the
    // route-specific block. dist/index.html is NOT the raw Vite template: the
    // prerender step has already written the homepage's full meta block into
    // it, so it carries a canonical and a complete og:* set pointing at
    // https://teonox.com/. Replacing only <title> left those behind, which
    // served every route a duplicate canonical plus duplicate og:title /
    // og:description / og:url with homepage data.
    //
    // Order matters: strip first, then insert — the reverse would strip the
    // tags we just injected. buildMetaTags() re-emits description, robots,
    // canonical and every og:* key, so nothing is lost by removing them
    // wholesale. twitter:* is deliberately left alone: it is not re-emitted.
    //
    // The template ships a global <meta name="robots" content="index, follow">,
    // so it must be stripped here too — otherwise the enquiry route's
    // noindex would arrive as two conflicting robots tags.
    let modified = html
      .replace(/(?:\r?\n\s*)?<meta\s+name="description"[^>]*>/g, '')
      .replace(/(?:\r?\n\s*)?<meta\s+name="robots"[^>]*>/g, '')
      .replace(/(?:\r?\n\s*)?<link\s+rel="canonical"[^>]*>/g, '')
      .replace(/(?:\r?\n\s*)?<meta\s+property="og:[a-z_:]+"[^>]*>/g, '')
      .replace(/(?:\r?\n\s*)?<title[^>]*>[^<]*<\/title>/, metaHtml);

    const clean = req.path.replace(/\/+$/, '') || '/';
    const extra = HEAD_EXTRAS[clean];
    if (extra) modified = modified.replace('</head>', `${extra}\n  </head>`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(modified);
  };
}
function decodeHtmlEntities(str: string = ""): string {
  return str
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "-")
    .replace(/&#8212;/g, "—")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
}

// Helper function to strip HTML tags for plain text excerpts
function stripHtml(html: string = ""): string {
  return decodeHtmlEntities(html.replace(/<[^>]*>/g, "")).trim();
}

// Calculate read time
function calculateReadTime(contentHtml: string = ""): string {
  const words = stripHtml(contentHtml).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

// Transform WordPress post object to clean format for front-end
function transformPost(p: any) {
  const title = decodeHtmlEntities(p.title?.rendered || "Untitled");
  const rawContent = p.content?.rendered || "";
  const rawExcerpt = p.excerpt?.rendered || "";
  const plainTextExcerpt = stripHtml(rawExcerpt || rawContent).slice(0, 180) + "...";

  // Categories extraction
  const terms = p._embedded?.["wp:term"]?.[0] || [];
  const categoriesList = terms.map((t: any) => decodeHtmlEntities(t.name));
  const primaryCategory = categoriesList.length > 0 ? categoriesList[0] : "Career & Skills";

  // Featured Image — prefer a smaller WP-generated thumbnail over full-res
  const featuredMediaObj = p._embedded?.["wp:featuredmedia"]?.[0];
  const featuredMedia = featuredMediaObj?.source_url;
  const sizes = featuredMediaObj?.media_details?.sizes || {};
  const preferredSize = sizes.medium_large || sizes.large || sizes.medium || null;
  const image =
    preferredSize?.source_url ||
    featuredMedia ||
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80";

  // Build a responsive srcset from WordPress-generated image sizes
  const imageSrcSet = Object.values(sizes)
    .filter((s: any) => s?.source_url && s?.width)
    .map((s: any) => `${s.source_url} ${s.width}w`)
    .join(', ');

  // Date formatting
  const postDate = p.date ? new Date(p.date).toLocaleDateString("en-GB") : "08/07/2026";

  // Author
  const authorName = p._embedded?.author?.[0]?.name
    ? `By ${p._embedded.author[0].name}`
    : "By TEONOX Team";

  // Paragraphs array
  const paragraphs = rawContent
    .split(/<\/p>|<br\s*\/?>/i)
    .map((block: string) => stripHtml(block))
    .filter((txt: string) => txt.length > 10);

  return {
    id: String(p.id),
    slug: p.slug || "",
    category: primaryCategory,
    categories: categoriesList,
    title,
    excerpt: plainTextExcerpt,
    author: authorName,
    date: postDate,
    readTime: calculateReadTime(rawContent),
    image,
    imageSrcSet: imageSrcSet || undefined,
    contentHtml: rawContent,
    content: paragraphs,
    link: p.link || `https://teonox.com/blog/${p.slug}`,
  };
}

// API Routes
app.get("/api/blogs", async (req, res) => {
  try {
    const response = await fetch("https://cms.teonox.com/index.php?rest_route=/wp/v2/posts&_embed&per_page=20");
    if (!response.ok) {
      throw new Error(`WordPress API returned ${response.status}`);
    }
    const postsData = await response.json();
    const cleanPosts = postsData.map(transformPost);
    res.json({ success: true, count: cleanPosts.length, source: "https://teonox.com/blog", data: cleanPosts });
  } catch (error: any) {
    console.error("Error fetching blogs from teonox.com:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/api/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`https://cms.teonox.com/index.php?rest_route=/wp/v2/posts/${id}&_embed`);
    if (!response.ok) {
      throw new Error(`Post not found: ${response.status}`);
    }
    const postData = await response.json();
    res.json({ success: true, data: transformPost(postData) });
  } catch (error: any) {
    res.status(404).json({ success: false, error: error.message });
  }
});

app.get("/api/blogs/slug/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const response = await fetch(`https://cms.teonox.com/index.php?rest_route=/wp/v2/posts&slug=${slug}&_embed`);
    if (!response.ok) {
      throw new Error(`Post not found: ${response.status}`);
    }
    const postsData = await response.json();
    if (!postsData || postsData.length === 0) {
      return res.status(404).json({ success: false, error: "Post not found" });
    }
    res.json({ success: true, data: transformPost(postsData[0]) });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API Routes - Programs (raw WordPress pass-through; mapping happens client-side)
const WP_PROGRAM_BASE = "https://cms.teonox.com/index.php?rest_route=/wp/v2/program";

app.get("/api/programs", async (_req, res) => {
  try {
    const response = await fetch(`${WP_PROGRAM_BASE}&_embed&per_page=50`);
    if (!response.ok) throw new Error(`WordPress API returned ${response.status}`);
    const programsData = await response.json();
    res.json({ success: true, count: programsData.length, data: programsData });
  } catch (error: any) {
    console.error("Error fetching programs from teonox.com:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

const WP_PROGRAM_CATEGORY_BASE = "https://cms.teonox.com/index.php?rest_route=/wp/v2/program-category";

app.get("/api/programs/categories", async (_req, res) => {
  try {
    const response = await fetch(
      `${WP_PROGRAM_CATEGORY_BASE}&per_page=100&_fields=id,name,slug,count`,
    );
    if (!response.ok) throw new Error(`WordPress API returned ${response.status}`);
    const categoriesData = await response.json();
    res.json({ success: true, count: categoriesData.length, data: categoriesData });
  } catch (error: any) {
    console.error("Error fetching program categories from teonox.com:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API Route - WP Media attachment -> source URL resolution.
// ACF image fields may be returned as a numeric attachment ID. This same-origin
// proxy resolves that ID against the WP media REST API on the SERVER side so the
// browser never makes a cross-origin request (no CORS anywhere: localhost,
// staging, or production are identical because only relative paths are used).
const WP_MEDIA_BASE = "https://cms.teonox.com/index.php?rest_route=/wp/v2/media";

app.get("/api/media/:id", async (req, res) => {
  const id = String(req.params.id || "");
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ success: false, error: "Invalid media id" });
  }
  try {
    const response = await fetch(`${WP_MEDIA_BASE}/${id}&_fields=source_url`);
    if (!response.ok) {
      throw new Error(`WordPress media API returned ${response.status}`);
    }
    const data = await response.json();
    res.json({ success: true, data });
  } catch (error: any) {
    console.error(`Error resolving WP media ${id} from teonox.com:`, error.message);
    res.status(502).json({ success: false, error: error.message });
  }
});

// ─── MagicText Phone OTP ─────────────────────────────────────────────
// Server-side OTP so the MagicText credentials never reach the browser.
// Requires: MAGICTEXT_API_URL, MAGICTEXT_AUTH_KEY, MAGICTEXT_SENDER_ID,
// MAGICTEXT_ROUTE, MAGICTEXT_TEMPLATE_ID (see .env.example).
const MAGICTEXT_API_URL = process.env.MAGICTEXT_API_URL || 'http://panel.magictext.in/http-tokenkeyapi.php';
const MAGICTEXT_AUTH_KEY = process.env.MAGICTEXT_AUTH_KEY || '';
const MAGICTEXT_SENDER_ID = process.env.MAGICTEXT_SENDER_ID || '';
const MAGICTEXT_ROUTE = process.env.MAGICTEXT_ROUTE || '';
const MAGICTEXT_TEMPLATE_ID = process.env.MAGICTEXT_TEMPLATE_ID || '';
const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const OTP_MAX_ATTEMPTS = 5; // wrong-code tries before invalidation
const OTP_SEND_LIMIT = 3; // max sends per number per window
const OTP_SEND_WINDOW_MS = 10 * 60 * 1000;

interface OtpEntry {
  otp: string;
  expiresAt: number;
  attempts: number;
  sends: number[];
}

// In-memory store. Single Node process per deploy; entries are short-lived
// (5-min TTL) and wiped on restart, which is acceptable for OTPs.
const otpStore = new Map<string, OtpEntry>();

// Sweep expired entries every minute; unref so it never holds the process open.
const otpSweeper = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of otpStore) {
    if (entry.expiresAt <= now) otpStore.delete(key);
  }
}, 60 * 1000);
if (typeof (otpSweeper as unknown as { unref?: () => void }).unref === 'function') {
  (otpSweeper as unknown as { unref: () => void }).unref();
}

function normalizePhoneNumber(raw: unknown): string | null {
  const digits = String(raw ?? '').replace(/\D/g, '');
  const num = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
  return /^[6-9]\d{9}$/.test(num) ? num : null;
}

// Single choke-point for /api/send-otp failures: logs the exact payload
// being returned and guarantees the `error` key is always present so the
// client never receives a bare `{ ok: false }`.
// Explicit JSON Content-Type so no proxy/static layer can mislabel it as HTML.
function sendOtpFail(res: express.Response, httpStatus: number, error: string, extra?: Record<string, unknown>) {
  const jsonResponse = { ok: false, error, ...extra };
  console.log('[SEND OTP RESPONSE PAYLOAD]:', JSON.stringify(jsonResponse).slice(0, 500));
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.status(httpStatus).json(jsonResponse);
}

app.post('/api/send-otp', async (req, res) => {
  // DEBUG-OTP: verbose tracing for Hostinger Runtime Logs. Remove once stable.
  const phone = normalizePhoneNumber(req.body?.phone);
  console.log('[OTP SEND START] Phone:', phone);
  console.log(
    '[OTP ENV CHECK] API_URL:',
    process.env.MAGICTEXT_API_URL,
    'KEY EXISTS:',
    !!process.env.MAGICTEXT_AUTH_KEY,
    'SENDER EXISTS:',
    !!process.env.MAGICTEXT_SENDER_ID,
    'ROUTE EXISTS:',
    !!process.env.MAGICTEXT_ROUTE,
    'TEMPLATE EXISTS:',
    !!process.env.MAGICTEXT_TEMPLATE_ID
  );
  if (!phone) {
    return sendOtpFail(res, 400, 'invalid_phone');
  }
  if (!MAGICTEXT_AUTH_KEY || !MAGICTEXT_SENDER_ID || !MAGICTEXT_ROUTE || !MAGICTEXT_TEMPLATE_ID) {
    console.error('[OTP] MagicText credentials missing — set MAGICTEXT_* env vars.');
    return sendOtpFail(res, 200, 'Missing MagicText environment variables on server.');
  }

  const now = Date.now();
  const existing = otpStore.get(phone);
  const recentSends = (existing?.sends || []).filter((t) => now - t < OTP_SEND_WINDOW_MS);
  if (recentSends.length >= OTP_SEND_LIMIT) {
    return sendOtpFail(res, 429, 'rate_limited');
  }

  const otp = String(crypto.randomInt(100000, 1000000));
  // Postman-confirmed format: clean 10-digit number (no +91 prefix),
  // URLSearchParams-encoded query string.
  const params = new URLSearchParams({
    'authentic-key': MAGICTEXT_AUTH_KEY,
    senderid: MAGICTEXT_SENDER_ID,
    route: MAGICTEXT_ROUTE,
    number: phone,
    message: `OTP for student enrollment request is ${otp}. Please enter this to verify your details for TEONOX enrollment. Thank You TEONOX BUSINESS SOLUTIONS`,
    templateid: MAGICTEXT_TEMPLATE_ID,
  });
  const targetUrl = `${MAGICTEXT_API_URL}?${params.toString()}`;
  console.log(
    '[MAGIC_TEXT_URL]:',
    targetUrl.replace(MAGICTEXT_AUTH_KEY, `${MAGICTEXT_AUTH_KEY.slice(0, 4)}****`)
  );

  try {
    console.log('[OTP FETCH ATTEMPT] at', new Date().toISOString());
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const gw = await fetch(targetUrl, { signal: controller.signal });
    clearTimeout(timeout);
    console.log('[OTP GATEWAY STATUS]:', gw.status);
    const gatewayResponseText = (await gw.text()).trim();
    console.log('[OTP GATEWAY RESPONSE]:', gatewayResponseText.slice(0, 500));
    if (!gw.ok || /fail|error|invalid/i.test(gatewayResponseText)) {
      // Surface the exact raw gateway text to the browser console for debugging.
      const raw = gatewayResponseText || `(empty gateway response body, HTTP ${gw.status})`;
      return sendOtpFail(res, 200, `MagicText gateway rejected the request (HTTP ${gw.status}).`, {
        gatewayError: raw,
        status: gw.status,
      });
    }
  } catch (error: any) {
    // Gateway failures return above, so reaching here means the fetch
    // itself threw (network/DNS/SSL/abort) — no gateway text exists.
    console.error('[OTP FETCH ERROR]:', error?.message || error);
    if (error?.stack) console.error(error.stack);
    return sendOtpFail(res, 500, error?.message || 'sms_failed', { status: 500 });
  }

  otpStore.set(phone, { otp, expiresAt: now + OTP_TTL_MS, attempts: 0, sends: [...recentSends, now] });
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.json({ ok: true });
});

app.post('/api/verify-otp', (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const phone = normalizePhoneNumber(req.body?.phone);
  const code = String(req.body?.otp ?? '').trim();
  if (!phone || !/^\d{6}$/.test(code)) {
    return res.status(400).json({ ok: false, error: 'invalid_code' });
  }

  const entry = otpStore.get(phone);
  if (!entry || entry.expiresAt <= Date.now()) {
    otpStore.delete(phone);
    return res.status(400).json({ ok: false, error: 'expired' });
  }
  if (entry.attempts >= OTP_MAX_ATTEMPTS) {
    otpStore.delete(phone);
    return res.status(429).json({ ok: false, error: 'rate_limited' });
  }

  const match =
    code.length === entry.otp.length &&
    crypto.timingSafeEqual(Buffer.from(code), Buffer.from(entry.otp));
  if (!match) {
    entry.attempts += 1;
    if (entry.attempts >= OTP_MAX_ATTEMPTS) otpStore.delete(phone);
    return res.status(400).json({ ok: false, error: 'invalid_code' });
  }

  otpStore.delete(phone); // single-use
  res.json({ ok: true, phone });
});

app.get("/api/programs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const isNumeric = /^\d+$/.test(id);
    const url = isNumeric
      ? `${WP_PROGRAM_BASE}/${id}&_embed`
      : `${WP_PROGRAM_BASE}&slug=${encodeURIComponent(id)}&_embed`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Program not found: ${response.status}`);
    const data = await response.json();
    const post = isNumeric ? data : Array.isArray(data) ? data[0] : null;
    if (!post) {
      return res.status(404).json({ success: false, error: "Program not found" });
    }
    res.json({ success: true, data: post });
  } catch (error: any) {
    res.status(404).json({ success: false, error: error.message });
  }
});

// ─── API fallback guard ──────────────────────────────────────────────
// Express mounts ALL /api/* routes above BEFORE any static middleware or
// SPA fallback below. Any /api path not matched above is an unknown API
// route — return JSON 404 here so it can NEVER fall through to
// express.static() or the `GET *` index.html handler (which would send
// text/html and break frontend res.json() parsing with the exact
// `non_json_response_http_200` symptom seen in production).
app.use('/api', (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(404).json({ ok: false, error: `api_not_found: ${req.method} ${req.path}` });
});

// ─── Standalone Marketing Uncovered landing page ─────────────────────
// Served as a plain prerendered document (never mounted in the React SPA).
// Registered before startServer() so it wins over Vite middleware and the
// production SPA fallback for both slash variants. Static assets under
// /marketing-uncovered/* fall through to express.static / Vite as usual.
app.get(['/marketing-uncovered', '/marketing-uncovered/'], (_req, res) => {
  const baseDir = process.env.NODE_ENV === 'production' ? 'dist' : 'public';
  const pagePath = path.join(process.cwd(), baseDir, 'marketing-uncovered', 'index.html');
  if (fs.existsSync(pagePath)) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.sendFile(pagePath);
  }
  res.status(404).send('Marketing Uncovered page not found');
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    const indexPath = path.join(distPath, "index.html");
    const indexHtml = fs.readFileSync(indexPath, 'utf-8');

    // Health-check endpoint so we can confirm Node is alive (bypasses Nginx)
    app.get('/__health', (_req, res) => {
      res.json({ ok: true, metaMiddleware: true, ts: new Date().toISOString() });
    });

    // Serve real static assets (JS, CSS, images, PDFs) — but NOT index.html
    app.use(express.static(distPath, {
      index: false,
      redirect: false,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        } else if (filePath.includes('/assets/') || filePath.includes('\\assets\\')) {
          // All hashed Vite build assets under /assets/* get long-term immutable caching
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (/\.[a-f0-9]{8,}\.(js|css)$/.test(filePath)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        } else {
          res.setHeader('Cache-Control', 'public, max-age=31536000');
        }
      },
    }));

    // Exact legacy programme URLs -> /programmes (301, both slash variants)
    const LEGACY_PROGRAMME_REDIRECT_PATHS = [
      '/programmes/build-digital-marketing-skills-with-ai',
      '/programmesspecialization-in-performance-marketing',
    ];
    app.get(
      LEGACY_PROGRAMME_REDIRECT_PATHS.flatMap((path) => [path, `${path}/`]),
      (_req, res) => res.redirect(301, '/programmes'),
    );

    // 301 redirect /programs → /programmes (SEO link equity preservation)
    app.get('/programs', (_req, res) => { res.redirect(301, '/programmes'); });
    app.get('/programs/:path(*)', (req, res) => { res.redirect(301, `/programmes/${req.params.path}`); });

    // Serve /webinar
    app.get(['/webinar', '/webinar/'], (_req, res) => {
      res.sendFile(path.join(distPath, 'webinar.html'));
    });

    // Serve prerendered blog detail pages (with their report BlogPosting JSON-LD)
    app.get(['/blog/:slug', '/blog/:slug/'], (req, res, next) => {
      const slug = String(req.params.slug || '');
      if (!/^[a-z0-9-]+$/i.test(slug)) return next();
      const blogPagePath = path.join(distPath, 'blog', slug, 'index.html');
      if (fs.existsSync(blogPagePath)) {
        return res.sendFile(blogPagePath);
      }
      next();
    });

    // All remaining GET requests → serve index.html with injected meta tags
    app.get('*', serveWithMeta(indexHtml));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TEONOX App running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
