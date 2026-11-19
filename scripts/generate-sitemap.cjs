const fs = require('fs');
const path = require('path');
const BASE_URL = 'https://teonox.com';
const CMS_BASE = 'https://cms.teonox.com/wp-json/wp/v2';

const routesData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'routes.json'), 'utf8'));
const STATIC_PAGES = routesData.map(r => ({ path: r.path, priority: r.priority, changefreq: r.changefreq }));

async function fetchLiveBlogSlugs() {
  try {
    const res = await fetch(CMS_BASE + '/posts?_fields=slug,date&per_page=100&_cb=' + Date.now());
    if (!res.ok) return [];
    const posts = await res.json();
    return Array.isArray(posts) ? posts.map((p) => ({
      slug: String(p.slug || ''),
      lastmod: p.date ? p.date.split('T')[0] : new Date().toISOString().split('T')[0],
    })).filter(p => p.slug) : [];
  } catch { return []; }
}

async function fetchLiveProgramSlugs() {
  try {
    const res = await fetch(CMS_BASE + '/program?_fields=slug,date&per_page=100&_cb=' + Date.now());
    if (!res.ok) return [];
    const programs = await res.json();
    return Array.isArray(programs) ? programs.map((p) => ({
      slug: String(p.slug || ''),
      lastmod: p.date ? p.date.split('T')[0] : new Date().toISOString().split('T')[0],
    })).filter(p => p.slug) : [];
  } catch { return []; }
}

function buildSitemapUrl(loc, lastmod, changefreq, priority) {
  return '  <url>\n    <loc>' + loc + '</loc>\n    <lastmod>' + lastmod + '</lastmod>\n    <changefreq>' + changefreq + '</changefreq>\n    <priority>' + priority + '</priority>\n  </url>';
}

async function main() {
  const distDir = path.resolve(__dirname, '..', 'dist');
  if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });
  
  const blogs = await fetchLiveBlogSlugs();
  const programs = await fetchLiveProgramSlugs();
  const today = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
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
  console.log('? Generated sitemap.xml');
}

main().catch((err) => {
  console.error('[Sitemap] Generation failed:', err);
  process.exit(1);
});
