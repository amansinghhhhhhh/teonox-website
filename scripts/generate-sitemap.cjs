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
  { path: '/careers',                priority: '0.7', changefreq: 'monthly' },
  { path: '/why-teonox',              priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy-policy',          priority: '0.3', changefreq: 'yearly'  },
  { path: '/terms-and-conditions',    priority: '0.3', changefreq: 'yearly'  },
];

async function fetchProgramSlugs() {
  try {
    const res = await fetch(`${CMS_URL}/program&_fields=slug&per_page=100&_cb=${Date.now()}`);
    if (!res.ok) return [];
    const type = (res.headers.get('content-type') || '').toLowerCase();
    if (!type.includes('application/json')) return [];
    const programs = await res.json();
    if (!Array.isArray(programs)) return [];
    return programs
      .map((p) => String(p.slug || ''))
      .filter(Boolean);
  } catch (e) {
    console.warn('[Sitemap] Failed to fetch program slugs from WordPress:', e.message);
    return [];
  }
}

async function fetchBlogPosts() {
  try {
    const res = await fetch(`${CMS_URL}/posts&_fields=slug,date&per_page=100&_cb=${Date.now()}`);
    if (!res.ok) return [];
    const type = (res.headers.get('content-type') || '').toLowerCase();
    if (!type.includes('application/json')) return [];
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

async function main() {
  const distDir = path.resolve(__dirname, '..', 'dist');

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  console.log('[Sitemap] Fetching blog posts from WordPress...');
  const blogPosts = await fetchBlogPosts();
  console.log(`[Sitemap] Found ${blogPosts.length} live blog post(s)`);

  console.log('[Sitemap] Fetching programs from WordPress...');
  const programSlugs = await fetchProgramSlugs();
  console.log(`[Sitemap] Found ${programSlugs.length} live program(s)`);

  // Generate sitemap.xml (static fallback for Vercel/Netlify deployments)
  const xmlUrls = [
    ...STATIC_PAGES.map((p) =>
      `  <url>\n    <loc>${BASE_URL}${p.path}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
    ),
    ...programSlugs.map((slug) =>
      `  <url>\n    <loc>${BASE_URL}/programs/${slug}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`
    ),
    ...blogPosts.map((p) =>
      `  <url>\n    <loc>${BASE_URL}/blog/${p.slug}</loc>\n    <lastmod>${p.lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlUrls.join('\n')}\n</urlset>`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
  console.log(`✓ Generated dist/sitemap.xml (${xmlUrls.length} URLs)`);

  // Generate sitemap.html as a human-readable fallback
  const blogLinks = blogPosts
    .map((p) => `      <li><a href="${BASE_URL}/blog/${p.slug}">${BASE_URL}/blog/${p.slug}</a></li>`)
    .join('\n');
  const programLinks = programSlugs
    .map((slug) => `      <li><a href="${BASE_URL}/programs/${slug}">${BASE_URL}/programs/${slug}</a></li>`)
    .join('\n');
  const pageLinks = STATIC_PAGES
    .map((p) => `      <li><a href="${BASE_URL}${p.path}">${BASE_URL}${p.path}</a></li>`)
    .join('\n');

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
  <p>Generated on ${TODAY}</p>
  <p><a href="${BASE_URL}/sitemap.xml">Download XML Sitemap</a></p>
  <div class="section">
    <h2>Main Pages</h2>
    <ul>
${pageLinks}
    </ul>
  </div>
  <div class="section">
    <h2>Programs</h2>
    <ul>
${programLinks}
    </ul>
  </div>
  <div class="section">
    <h2>Blog Posts (${blogPosts.length} live)</h2>
    <ul>
${blogLinks || '      <li>No blog posts found</li>'}
    </ul>
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(distDir, 'sitemap.html'), html, 'utf-8');
  console.log('✓ Generated dist/sitemap.html');
}

main().catch((err) => {
  console.error('[Sitemap] Generation failed:', err);
  process.exit(1);
});
