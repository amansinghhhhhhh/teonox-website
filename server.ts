import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// ─── Dynamic Sitemap ───────────────────────────────────────────────
// Generates sitemap.xml on-the-fly from live WordPress data.
// No build/push needed — updates automatically when blogs are added/removed.
const BASE_URL = 'https://teonox.com';
const CMS_BASE = 'https://cms.teonox.com/index.php?rest_route=/wp/v2';
const PROGRAM_IDS = [
  'business-digital-marketing-with-ai',
  'performance-marketing',
  'seo-specialization',
  'social-media-marketing',
];
const STATIC_PAGES: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/programs', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/admissions', priority: '0.8', changefreq: 'monthly' },
  { path: '/careers', priority: '0.7', changefreq: 'monthly' },
  { path: '/why-teonox', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-and-conditions', priority: '0.3', changefreq: 'yearly' },
];

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

// Register BEFORE static middleware so it takes priority over dist/sitemap.xml
app.get('/sitemap.xml', async (_req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const urls: string[] = [];

  // Static pages
  for (const page of STATIC_PAGES) {
    urls.push(buildSitemapUrl(`${BASE_URL}${page.path}`, today, page.changefreq, page.priority));
  }

  // Programs
  for (const id of PROGRAM_IDS) {
    urls.push(buildSitemapUrl(`${BASE_URL}/programs/${id}`, today, 'monthly', '0.8'));
  }

  // Live blog posts from WordPress
  const blogs = await fetchLiveBlogSlugs();
  for (const post of blogs) {
    urls.push(buildSitemapUrl(`${BASE_URL}/blog/${post.slug}`, post.lastmod, 'monthly', '0.7'));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour cache
  res.send(xml);
});

// ─── Dynamic Sitemap HTML ──────────────────────────────────────────
app.get('/sitemap.html', async (_req, res) => {
  const blogs = await fetchLiveBlogSlugs();
  const blogLinks = blogs.map((p) => `<li><a href="${BASE_URL}/blog/${p.slug}">${BASE_URL}/blog/${p.slug}</a></li>`).join('\n');
  const programLinks = PROGRAM_IDS.map((id) => `<li><a href="${BASE_URL}/programs/${id}">${BASE_URL}/programs/${id}</a></li>`).join('\n');
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
  <div class="section"><h2>Programs</h2><ul>${programLinks}</ul></div>
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
}

const META_MAP: Record<string, RouteMeta> = {
  '/': {
    title: 'AI Automation & Digital Marketing Courses in Pune | Teonox',
    description: "Upskill with Teonox's AI automation & digital marketing courses in Pune. 100% placement support for students, graduates & career switchers. Enroll today!",
    canonical: '/',
  },
  '/about': {
    title: 'Business Digital Marketing Classes in Pune | Teonox',
    description: 'Learn business digital marketing classes in Pune at Teonox, a trusted digital marketing training institute with practical, placement-focused courses.',
    canonical: '/about',
  },
  '/programs': {
    title: 'Best Digital Marketing Course in Pune Near You | Teonox',
    description: "Join Teonox's top digital marketing courses in Pune classroom & AI-integrated training, live projects, certification & placement support. Enroll now.",
    canonical: '/programs',
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
  '/terms-and-conditions': {
    title: 'Terms & Conditions | TEONOX',
    description: 'Read the TEONOX Terms & Conditions \u2014 governing your access to and use of our website, programs, and services.',
    canonical: '/terms-and-conditions',
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

  return `<title>${title}</title>
    <meta name="description" content="${desc}">
    <link rel="canonical" href="${canonicalUrl}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:image" content="${DEFAULT_OG_IMAGE}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:type" content="${ogType}">
    <meta property="og:site_name" content="${SITE_NAME}">`;
}

// Simple in-memory cache for dynamic route metadata (avoid repeated WP API calls)
const dynamicMetaCache = new Map<string, { meta: RouteMeta; ts: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

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
  const cacheKey = `program:${slug}`;
  const cached = getCachedDynamicMeta(cacheKey);
  if (cached) return cached;

  try {
    const isNumeric = /^\d+$/.test(slug);
    const url = isNumeric
      ? `${WP_PROGRAM_BASE}/${slug}&_fields=title,acf`
      : `${WP_PROGRAM_BASE}&slug=${encodeURIComponent(slug)}&_fields=title,acf&per_page=1`;
    const res = await fetch(`${url}&_cb=${Date.now()}`);
    if (!res.ok) return null;
    const data = await res.json();
    const post = isNumeric ? data : (Array.isArray(data) ? data[0] : null);
    if (!post) return null;

    const title = decodeHtmlEntities(post.title?.rendered || '').replace(/<[^>]*>/g, '');
    const heroIntro = decodeHtmlEntities(post.acf?.hero_intro || '').replace(/<[^>]*>/g, '').slice(0, 160);

    const meta: RouteMeta = {
      title: `${title} | TEONOX`,
      description: heroIntro || `Explore ${title} at TEONOX \u2014 Gen AI School of Marketing & Business in Pune.`,
      canonical: `/programs/${slug}`,
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

  // Exact static match
  if (META_MAP[clean]) return META_MAP[clean];

  // Dynamic: /blog/:slug
  const segments = clean.split('/').filter(Boolean);
  if (segments.length === 2 && segments[0] === 'blog') {
    return fetchBlogMeta(segments[1]);
  }

  // Dynamic: /programs/:slug or /program/:slug
  if (segments.length === 2 && (segments[0] === 'programs' || segments[0] === 'program')) {
    return fetchProgramMeta(segments[1]);
  }

  return null;
}

// Serve index.html with injected route-specific meta tags
function serveWithMeta(html: string) {
  return async (req: express.Request, res: express.Response) => {
    const meta = await resolveRouteMeta(req.path);
    if (!meta) {
      return res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
    }

    const metaHtml = buildMetaTags(meta);
    // Replace the fallback <title>...</title> with the full route-specific
    // meta block (which includes <title>, <meta description>, canonical, OG).
    // Then also strip the original <meta name="description"> line.
    // Remove the old <meta name="description"> line BEFORE inserting new meta block,
    // because replace() without /g flag removes the FIRST match.
    const withoutOldDesc = html.replace(/\r?\n\s*<meta name="description" content="[^"]*"\s*\/?>/, '');
    const modified = withoutOldDesc.replace(/<title>[^<]*<\/title>/, metaHtml);

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

  // Featured Image
  const featuredMedia = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const image =
    featuredMedia ||
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80";

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
    app.use(express.static(distPath, { index: false }));

    // All remaining GET requests → serve index.html with injected meta tags
    app.get('*', serveWithMeta(indexHtml));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TEONOX App running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
