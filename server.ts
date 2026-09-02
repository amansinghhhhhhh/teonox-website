import express from "express";
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
  'business-digital-marketing-ai',
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
    urls.push(buildSitemapUrl(`${BASE_URL}/program/${id}`, today, 'monthly', '0.8'));
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
  const programLinks = PROGRAM_IDS.map((id) => `<li><a href="${BASE_URL}/program/${id}">${BASE_URL}/program/${id}</a></li>`).join('\n');
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

// Helper function to decode HTML entities
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
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TEONOX App running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
