const fs = require('fs');
const path = require('path');
// const { JSDOM } = require('jsdom'); // Removed JSDOM dependency as it's not actually used for DOM manipulation here

const BASE_URL = 'https://teonox.com';
const SITE_NAME = 'TEONOX';
const DEFAULT_OG_IMAGE = BASE_URL + '/og-default.webp';
const CMS_BASE = 'https://cms.teonox.com/index.php?rest_route=/wp/v2';

// ─── Metadata Utilities ──────────────────────────────────────────────
function escapeHtml(unsafe) {
  return String(unsafe).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function buildMetaTags(meta) {
  const title = escapeHtml(meta.title);
  const desc = escapeHtml(meta.description);
  const canonicalUrl = BASE_URL + meta.canonical;
  const ogType = meta.ogType || 'website';
  const robots = meta.robots || 'index, follow';

  let html = '    <title>' + title + '</title>\n';
  html += '    <meta name=\"description\" content=\"' + desc + '\">\n';
  html += '    <meta name=\"robots\" content=\"' + robots + '\">\n';
  html += '    <link rel=\"canonical\" href=\"' + canonicalUrl + '\">\n';
  html += '    <meta property=\"og:title\" content=\"' + title + '\">\n';
  html += '    <meta property=\"og:description\" content=\"' + desc + '\">\n';
  html += '    <meta property=\"og:image\" content=\"' + DEFAULT_OG_IMAGE + '\">\n';
  html += '    <meta property=\"og:url\" content=\"' + canonicalUrl + '\">\n';
  html += '    <meta property=\"og:type\" content=\"' + ogType + '\">\n';
  html += '    <meta property=\"og:site_name\" content=\"' + SITE_NAME + '\">';
  return html;
}

function injectMeta(htmlTemplate, meta) {
  const metaBlock = buildMetaTags(meta);
  return htmlTemplate
    .replace(/<meta name=\"description\"[^>]*>/i, '')
    .replace(/<meta name=\"robots\"[^>]*>/i, '')
    .replace(/<link rel=\"canonical\"[^>]*>/i, '')
    .replace(/<meta property=\"og:[^>]*>/gi, '')
    .replace(/<title>[^<]*<\/title>/i, metaBlock);
}

// ─── Mocking/Data Fetching ──────────────────────────────────────────
async function fetchBlogSlugs() {
  try {
    const res = await fetch(CMS_BASE + '/posts?_fields=slug,title,excerpt&per_page=100');
    if (!res.ok) {
      console.error('[Prerender] Failed to fetch blog posts:', res.statusText);
      return [];
    }
    return await res.json();
  } catch (e) {
    console.error('[Prerender] Error fetching blog posts:', e.message);
    return [];
  }
}


async function writePage(distDir, routePath, html) {
  const outDir = routePath === '/' ? distDir : path.join(distDir, routePath.replace(/^\//, ''));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
  return path.join(outDir, 'index.html');
}

// ─── Main ──────────────────────────────────────────────────────────
async function main() {
  const distDir = path.resolve(__dirname, '..', 'dist');
  const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
  
  // Blog Prerendering
  const posts = await fetchBlogSlugs();
  for (const post of posts) {
    const meta = {
      title: post.title.rendered + ' | TEONOX Blog',
      description: post.excerpt.rendered.replace(/<[^>]+>/g, ''),
      canonical: '/blog/' + post.slug,
      robots: 'index, follow',
      ogType: 'article'
    };
    await writePage(distDir, '/blog/' + post.slug, injectMeta(indexHtml, meta));
    console.log('Generated: /blog/' + post.slug);
  }
}

main();
