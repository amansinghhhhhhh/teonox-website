const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://teonox.com';
const CMS_URL = 'https://cms.teonox.com/index.php?rest_route=/wp/v2';
const TODAY = new Date().toISOString().split('T')[0];

// Static pages with their metadata
const STATIC_PAGES = [
  { path: '/',                        priority: '1.0', changefreq: 'weekly'  },
  { path: '/about',                   priority: '0.8', changefreq: 'monthly' },
  { path: '/programs',                priority: '0.9', changefreq: 'weekly'  },
  { path: '/blog',                    priority: '0.8', changefreq: 'weekly'  },
  { path: '/contact',                 priority: '0.7', changefreq: 'monthly' },
  { path: '/admissions',              priority: '0.8', changefreq: 'monthly' },
  { path: '/career-outcomes',         priority: '0.7', changefreq: 'monthly' },
  { path: '/why-teonox',              priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy-policy',          priority: '0.3', changefreq: 'yearly'  },
  { path: '/terms-and-conditions',    priority: '0.3', changefreq: 'yearly'  },
];

// Program IDs (from src/data.ts and src/data/programDetails.ts)
const PROGRAM_IDS = [
  'business-digital-marketing-ai',
  'performance-marketing',
  'seo-specialization',
  'social-media-marketing',
];

// Fetch live blog posts from WordPress REST API — returns { slug, lastmod }[]
async function fetchBlogPosts() {
  try {
    const res = await fetch(`${CMS_URL}/posts&_fields=slug,date&per_page=100&_cb=${Date.now()}`);
    if (!res.ok) {
      console.warn('[Sitemap] WordPress posts API returned', res.status);
      return [];
    }
    const type = (res.headers.get('content-type') || '').toLowerCase();
    if (!type.includes('application/json')) {
      console.warn('[Sitemap] WordPress returned non-JSON, skipping live blogs');
      return [];
    }
    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) return [];
    return posts.map((p) => ({
      slug: String(p.slug || ''),
      lastmod: p.date ? p.date.split('T')[0] : TODAY,
    })).filter((p) => p.slug);
  } catch (e) {
    console.warn('[Sitemap] Failed to fetch blog posts from WordPress:', e.message);
    return [];
  }
}

function buildUrl(pagePath, priority, changefreq, lastmod) {
  return `  <url>
    <loc>${BASE_URL}${pagePath}</loc>
    <lastmod>${lastmod || TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function generateSitemapXml(blogPosts) {
  const urls = [];

  // Static pages
  for (const page of STATIC_PAGES) {
    urls.push(buildUrl(page.path, page.priority, page.changefreq));
  }

  // Program pages (singular /program/ route)
  for (const id of PROGRAM_IDS) {
    urls.push(buildUrl(`/program/${id}`, '0.8', 'monthly'));
  }

  // Blog posts — live from WordPress
  for (const post of blogPosts) {
    urls.push(buildUrl(`/blog/${post.slug}`, '0.7', 'monthly', post.lastmod));
  }

  // Fallback: if no live blogs fetched, show a message in console
  if (blogPosts.length === 0) {
    console.warn('[Sitemap] No live blog posts found — sitemap will not include any blog URLs');
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

async function generateSitemapHtml(blogPosts) {
  const sections = [
    { title: 'Main Pages', pages: STATIC_PAGES },
    {
      title: 'Programs',
      pages: PROGRAM_IDS.map(id => ({
        path: `/program/${id}`,
        priority: '0.8',
        changefreq: 'monthly',
      })),
    },
    {
      title: 'Blog Posts',
      pages: blogPosts.length > 0
        ? blogPosts.map(post => ({
            path: `/blog/${post.slug}`,
            priority: '0.7',
            changefreq: 'monthly',
          }))
        : [],
    },
  ];

  const linksHtml = sections
    .map(
      (section) => `
    <div class="section">
      <h2>${section.title}</h2>
      <ul>
        ${section.pages
          .map(
            (page) =>
              `<li><a href="${BASE_URL}${page.path}">${BASE_URL}${page.path}</a></li>`,
          )
          .join('\n        ')}
      </ul>
    </div>`,
    )
    .join('\n');

  return `<!DOCTYPE html>
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
  <p>Generated on ${TODAY}</p>
  <p><a href="${BASE_URL}/sitemap.xml">Download XML Sitemap</a></p>
${linksHtml}
</body>
</html>`;
}

// Write files
async function main() {
  const distDir = path.resolve(__dirname, '..', 'dist');

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Fetch live blog posts from WordPress before generating sitemap
  console.log('[Sitemap] Fetching blog posts from WordPress...');
  const blogPosts = await fetchBlogPosts();
  console.log(`[Sitemap] Found ${blogPosts.length} live blog post(s)`);

  const sitemapXml = await generateSitemapXml(blogPosts);
  const sitemapHtml = await generateSitemapHtml(blogPosts);

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(distDir, 'sitemap.html'), sitemapHtml, 'utf-8');

  console.log('✓ Generated dist/sitemap.xml');
  console.log('✓ Generated dist/sitemap.html');
}

main().catch((err) => {
  console.error('[Sitemap] Generation failed:', err);
  process.exit(1);
});
