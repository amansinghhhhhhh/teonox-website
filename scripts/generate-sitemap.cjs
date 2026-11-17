const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://teonox.com';
const CMS_BASE = 'https://cms.teonox.com/wp-json/wp/v2';

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/programmes', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/admissions', priority: '0.8', changefreq: 'monthly' },
  { path: '/careers', priority: '0.7', changefreq: 'monthly' },
  { path: '/why-teonox', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-and-conditions', priority: '0.3', changefreq: 'yearly' },
  { path: '/programmes/business-digital-marketing-with-ai', priority: '0.9', changefreq: 'weekly' },
  { path: '/programmes/business-digital-marketing-with-ai-6-months', priority: '0.9', changefreq: 'weekly' },
  { path: '/programmes/build-digital-marketing-with-ai', priority: '0.9', changefreq: 'weekly' },
  { path: '/programmes/business-digital-marketing-with-ai-6-months-online', priority: '0.9', changefreq: 'weekly' },
];

async function fetchLiveBlogSlugs() {
  try {
    const res = await fetch(CMS_BASE + '/posts?_fields=slug,date&per_page=100&_cb=' + Date.now());
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const posts = await res.json();
    return Array.isArray(posts) ? posts.map((p) => ({
      slug: String(p.slug || ''),
      lastmod: p.date ? p.date.split('T')[0] : new Date().toISOString().split('T')[0],
    })).filter(p => p.slug) : [];
  } catch (e) {
    console.error('[Sitemap] Failed to fetch blog slugs:', e.message);
    return [];
  }
}

async function fetchLiveProgramSlugs() {
  try {
    const res = await fetch(CMS_BASE + '/program?_fields=slug,date&per_page=100&_cb=' + Date.now());
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const programs = await res.json();
    return Array.isArray(programs) ? programs.map((p) => ({
      slug: String(p.slug || ''),
      lastmod: p.date ? p.date.split('T')[0] : new Date().toISOString().split('T')[0],
    })).filter(p => p.slug) : [];
  } catch (e) {
    console.error('[Sitemap] Failed to fetch program slugs:', e.message);
    return [];
  }
}

function buildSitemapUrl(loc, lastmod, changefreq, priority) {
  return '  <url>\n    <loc>' + loc + '</loc>\n    <lastmod>' + lastmod + '</lastmod>\n    <changefreq>' + changefreq + '</changefreq>\n    <priority>' + priority + '</priority>\n  </url>';
}

async function main() {
  const distDir = path.resolve(__dirname, '..', 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  console.log('[Sitemap] Generating dynamic sitemap.xml...');

  const blogs = await fetchLiveBlogSlugs();
  const programs = await fetchLiveProgramSlugs();

  const today = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const page of STATIC_PAGES) {
    xml += buildSitemapUrl(BASE_URL + (page.path === '/' ? '' : page.path), today, page.changefreq, page.priority) + "\n";
  }

  const staticProgramPaths = STATIC_PAGES.filter(p => p.path.startsWith('/programmes/')).map(p => p.path);
  for (const prog of programs) {
    const fullPath = '/programmes/' + prog.slug;
    if (!staticProgramPaths.includes(fullPath)) {
      xml += buildSitemapUrl(BASE_URL + fullPath, prog.lastmod, 'weekly', '0.9') + "\n";
    }
  }

  for (const post of blogs) {
    xml += buildSitemapUrl(BASE_URL + '/blog/' + post.slug, post.lastmod, 'weekly', '0.8') + "\n";
  }

  xml += '</urlset>';

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
  fs.writeFileSync(path.resolve(__dirname, '..', 'public', 'sitemap.xml'), xml, 'utf-8');

  console.log('? Generated sitemap.xml with ' + (STATIC_PAGES.length + programs.length + blogs.length) + ' URLs');
}

main().catch((err) => {
  console.error('[Sitemap] Generation failed:', err);
  process.exit(1);
});
