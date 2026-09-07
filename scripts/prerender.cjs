/**
 * Build-time prerendering script.
 * Runs after vite build to generate static HTML files for each route with
 * pre-baked <title>, <meta description>, canonical URL, and Open Graph tags.
 *
 * Hostinger serves static files directly — no Node middleware — so every
 * route needs its own index.html with the correct metadata in <head>.
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://teonox.com';
const SITE_NAME = 'TEONOX';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.webp`;
const CMS_BASE = 'https://cms.teonox.com/index.php?rest_route=/wp/v2';

// ─── Static Route Metadata ─────────────────────────────────────────
const META_MAP = {
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

// ─── Helpers ───────────────────────────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function decodeHtmlEntities(str) {
  return (str || '')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '\u2014')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function buildMetaTags(meta) {
  const title = escapeHtml(meta.title);
  const desc = escapeHtml(meta.description);
  const canonicalUrl = `${BASE_URL}${meta.canonical}`;
  const ogType = meta.ogType || 'website';

  return `    <title>${title}</title>
    <meta name="description" content="${desc}">
    <link rel="canonical" href="${canonicalUrl}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${desc}">
    <meta property="og:image" content="${DEFAULT_OG_IMAGE}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:type" content="${ogType}">
    <meta property="og:site_name" content="${SITE_NAME}">`;
}

// Inject route-specific meta tags into the index.html template
function injectMeta(htmlTemplate, meta) {
  const metaBlock = buildMetaTags(meta);
  return htmlTemplate
    .replace(/\r?\n\s*<meta name="description" content="[^"]*"\s*\/?>/, '')
    .replace(/<title>[^<]*<\/title>/, metaBlock);
}

// Write a prerendered page: dist/<route>/index.html
function writePage(distDir, routePath, html) {
  // For '/' route, write to dist/index.html (overwrite SPA fallback)
  const outDir = routePath === '/'
    ? distDir
    : path.join(distDir, routePath.replace(/^\//, ''));

  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'index.html');
  fs.writeFileSync(outFile, html, 'utf-8');
  return outFile;
}

// ─── Dynamic Route Fetching ────────────────────────────────────────
async function fetchBlogSlugs() {
  try {
    const res = await fetch(
      `${CMS_BASE}/posts&_fields=slug,title,excerpt&per_page=100&_cb=${Date.now()}`
    );
    if (!res.ok) return [];
    const type = (res.headers.get('content-type') || '').toLowerCase();
    if (!type.includes('application/json')) return [];
    const posts = await res.json();
    if (!Array.isArray(posts)) return [];
    return posts
      .filter((p) => p.slug)
      .map((p) => {
        const title = decodeHtmlEntities(p.title?.rendered || '').replace(/<[^>]*>/g, '');
        const excerpt = decodeHtmlEntities(p.excerpt?.rendered || '').replace(/<[^>]*>/g, '').slice(0, 160);
        return { slug: p.slug, title, excerpt };
      });
  } catch (e) {
    console.warn('[Prerender] Failed to fetch blog slugs:', e.message);
    return [];
  }
}

async function fetchProgramSlugs() {
  try {
    const res = await fetch(
      `${CMS_BASE}/program&_fields=slug,title,acf&per_page=100&_cb=${Date.now()}`
    );
    if (!res.ok) return [];
    const type = (res.headers.get('content-type') || '').toLowerCase();
    if (!type.includes('application/json')) return [];
    const programs = await res.json();
    if (!Array.isArray(programs)) return [];
    return programs
      .filter((p) => p.slug)
      .map((p) => {
        const title = decodeHtmlEntities(p.title?.rendered || '').replace(/<[^>]*>/g, '');
        const heroIntro = decodeHtmlEntities(p.acf?.hero_intro || '').replace(/<[^>]*>/g, '').slice(0, 160);
        return { slug: p.slug, title, heroIntro };
      });
  } catch (e) {
    console.warn('[Prerender] Failed to fetch program slugs:', e.message);
    return [];
  }
}

// ─── Main ──────────────────────────────────────────────────────────
async function main() {
  const distDir = path.resolve(__dirname, '..', 'dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('[Prerender] dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const htmlTemplate = fs.readFileSync(indexHtmlPath, 'utf-8');
  let count = 0;

  // 1. Static routes
  console.log('[Prerender] Generating static route pages...');
  for (const [routePath, meta] of Object.entries(META_MAP)) {
    const outPath = writePage(distDir, routePath, injectMeta(htmlTemplate, meta));
    count++;
    console.log(`  ${routePath} -> ${path.relative(process.cwd(), outPath)}`);
  }

  // 2. Dynamic: blog posts
  console.log('[Prerender] Fetching blog posts from WordPress...');
  const blogPosts = await fetchBlogSlugs();
  console.log(`[Prerender] Found ${blogPosts.length} blog post(s)`);

  for (const post of blogPosts) {
    const meta = {
      title: `${post.title} | TEONOX Blog`,
      description: post.excerpt || `Read about ${post.title} on the TEONOX blog.`,
      canonical: `/blog/${post.slug}`,
      ogType: 'article',
    };
    const outPath = writePage(distDir, `/blog/${post.slug}`, injectMeta(htmlTemplate, meta));
    count++;
    console.log(`  /blog/${post.slug} -> ${path.relative(process.cwd(), outPath)}`);
  }

  // 3. Dynamic: program detail pages
  console.log('[Prerender] Fetching programs from WordPress...');
  const programs = await fetchProgramSlugs();
  console.log(`[Prerender] Found ${programs.length} program(s)`);

  for (const prog of programs) {
    const meta = {
      title: `${prog.title} | TEONOX`,
      description: prog.heroIntro || `Explore ${prog.title} at TEONOX \u2014 Gen AI School of Marketing & Business in Pune.`,
      canonical: `/programs/${prog.slug}`,
    };
    const outPath = writePage(distDir, `/programs/${prog.slug}`, injectMeta(htmlTemplate, meta));
    count++;
    console.log(`  /programs/${prog.slug} -> ${path.relative(process.cwd(), outPath)}`);
  }

  console.log(`\n[Prerender] Done! Generated ${count} prerendered page(s) in dist/`);
}

main().catch((err) => {
  console.error('[Prerender] Failed:', err);
  process.exit(1);
});
