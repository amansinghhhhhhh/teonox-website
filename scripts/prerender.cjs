const fs = require('fs');
const path = require('path');
const auditSchemas = require('../src/data/schemaAudit.json');
// const { JSDOM } = require('jsdom'); // Removed JSDOM dependency as it's not actually used for DOM manipulation here

const BASE_URL = 'https://teonox.com';
const SITE_NAME = 'TEONOX';
const DEFAULT_OG_IMAGE = BASE_URL + '/og-default.webp';
const CMS_BASE = 'https://cms.teonox.com/wp-json/wp/v2';

// ─── Metadata Utilities ──────────────────────────────────────────────
function escapeHtml(unsafe) {
  return String(unsafe).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function decodeEntities(value) {
  return String(value || '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_match, code) => String.fromCharCode(Number(code)));
}

function plainText(value) {
  return decodeEntities(String(value || '').replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeSlug(value) {
  return String(value || '').trim().replace(/^\/+/, '').replace(/\/+$/, '');
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

// ─── Google Profile JSON-LD ────────────────────────────────────────
// The SEO team's schema lives verbatim in index.html. Read it from there so
// the exact values (including full hyperlink targets) are used everywhere.
// Tempered pattern: never crosses a </script> boundary, so a later injected
// schema block cannot be swallowed while normalizing the canonical block.
const GOOGLE_PROFILE_PATTERN = /<script type="application\/ld\+json">((?:(?!<\/script>)[\s\S])*?"@type":\s*"LocalBusiness"(?:(?!<\/script>)[\s\S])*?)<\/script>/;

function getGoogleProfileSchema() {
  const sourcePath = path.resolve(__dirname, '..', 'index.html');
  const source = fs.readFileSync(sourcePath, 'utf-8');
  const match = source.match(GOOGLE_PROFILE_PATTERN);
  if (!match) {
    throw new Error('Google Profile JSON-LD block not found in index.html');
  }
  const json = match[0]
    .replace(/^<script type="application\/ld\+json">/, '')
    .replace(/<\/script>$/, '');
  JSON.parse(json);
  return match[0];
}

function ensureGoogleProfileSchema(html, schemaBlock) {
  if (html.includes(schemaBlock)) return html;
  if (GOOGLE_PROFILE_PATTERN.test(html)) {
    return html.replace(GOOGLE_PROFILE_PATTERN, schemaBlock);
  }
  return html.replace('</head>', `  ${schemaBlock}\n  </head>`);
}

// ─── Schema Report JSON-LD ─────────────────────────────────────────
// Append report blocks after the canonical LocalBusiness schema. Each block
// is marked so a rerun replaces it instead of creating duplicates.
function injectSchemaBlock(html, schemaId, schema, source) {
  const sourceAttr = source ? ` data-schema-source="${escapeHtml(source)}"` : '';
  const block = `<script type="application/ld+json" data-schema-id="${escapeHtml(schemaId)}"${sourceAttr}>${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;
  const marker = `data-schema-id="${schemaId}"`;
  const existing = new RegExp(`[ \\t]*<script type="application/ld\\+json"[^>]*${marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^>]*>[\\s\\S]*?<\\/script>\\n?`);
  if (existing.test(html)) {
    return html.replace(existing, `  ${block}\n`);
  }
  return html.replace('</head>', `${block}\n  </head>`);
}

// ─── Mocking/Data Fetching ──────────────────────────────────────────
async function fetchJson(url, label) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`[Prerender] Failed to fetch ${label}:`, res.statusText);
      return null;
    }
    const contentType = (res.headers.get('content-type') || '').toLowerCase();
    if (!contentType.includes('application/json')) {
      console.error(`[Prerender] Unexpected content type for ${label}:`, contentType || 'unknown');
      return null;
    }
    return await res.json();
  } catch (e) {
    console.error(`[Prerender] Error fetching ${label}:`, e.message);
    return null;
  }
}

async function fetchBlogSlugs() {
  const posts = await fetchJson(CMS_BASE + '/posts?_fields=slug,title,excerpt&per_page=100', 'blog posts');
  return Array.isArray(posts) ? posts : [];
}

async function fetchBlogMetadata(slug) {
  const posts = await fetchJson(
    `${CMS_BASE}/posts?slug=${encodeURIComponent(slug)}&_fields=slug,title,excerpt`,
    `blog post "${slug}"`,
  );
  if (!Array.isArray(posts) || posts.length === 0) return null;
  return {
    slug: normalizeSlug(posts[0].slug) || slug,
    title: { rendered: plainText(posts[0].title && posts[0].title.rendered) },
    excerpt: { rendered: plainText(posts[0].excerpt && posts[0].excerpt.rendered) },
  };
}


async function writePage(distDir, routePath, html) {
  const outDir = routePath === '/' ? distDir : path.join(distDir, routePath.replace(/^\//, ''));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
  return path.join(outDir, 'index.html');
}

// ─── Marketing Uncovered standalone landing page ────────────────────
// Source of truth lives at designer/marketing-uncovered/. The incoming
// index.html is stored as marketing-uncovered.html so it can never shadow
// the SPA's root index.html. The generated document is written to BOTH
// public/ (dev serving) and dist/ (production serving).
const DESIGNER_MARKETING_DIR = path.resolve(__dirname, '..', 'designer', 'marketing-uncovered');

function rewriteMarketingAssetPaths(html) {
  return html.replace(
    /\b(href|src|poster|data-src)=(["'])(?:\.\/)?(css|js|media)\//gi,
    (_match, attr, quote, dir) => `${attr}=${quote}/marketing-uncovered/${dir}/`,
  );
}

function rewriteMarketingCssPaths(css) {
  return css.replace(
    /url\((["']?)(?:\.\/)?(media|css|js)\//g,
    (_match, quote, dir) => `url(${quote}/marketing-uncovered/${dir}/`,
  );
}

function rewriteMarketingJsPaths(js) {
  return js.replace(
    /(["'`])(?:\.\/)?media\//g,
    (_match, quote) => `${quote}/marketing-uncovered/media/`,
  );
}

function getGa4Snippet() {
  const source = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf-8');
  const match = source.match(
    /<!--\s*GA4:[\s\S]*?-->\s*<script[^>]*src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-YZ0K65RBRD"[^>]*><\/script>\s*<script>[\s\S]*?<\/script>/,
  );
  if (!match) throw new Error('GA4 snippet not found in index.html');
  return match[0];
}

function injectGa4(html) {
  const snippet = getGa4Snippet();
  if (html.includes(snippet)) return html;
  return html.replace('</head>', `    ${snippet}\n  </head>`);
}

function injectMarketingHeadExtras(html, meta) {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const canonicalUrl = BASE_URL + meta.canonical;
  let extras = '';

  if (!html.includes('rel="icon"')) {
    extras += '    <link rel="icon" type="image/svg+xml" href="/favicon.svg">\n';
  }
  if (!html.includes('name="twitter:card"')) {
    extras += [
      '    <meta name="twitter:card" content="summary_large_image">',
      `    <meta name="twitter:title" content="${title}">`,
      `    <meta name="twitter:description" content="${description}">`,
      `    <meta name="twitter:image" content="${DEFAULT_OG_IMAGE}">`,
      `    <meta name="twitter:url" content="${canonicalUrl}">`,
    ].join('\n') + '\n';
  }

  return extras ? html.replace('</head>', extras + '  </head>') : html;
}

function writeMarketingUncoveredPage(distDir, googleProfileSchema) {
  const sourceHtmlPath = path.join(DESIGNER_MARKETING_DIR, 'marketing-uncovered.html');
  const sourceCssPath = path.join(DESIGNER_MARKETING_DIR, 'css', 'style.css');
  const sourceJsPath = path.join(DESIGNER_MARKETING_DIR, 'js', 'main.js');
  const sourceMediaDir = path.join(DESIGNER_MARKETING_DIR, 'media');

  if (!fs.existsSync(sourceHtmlPath)) {
    console.warn('[Prerender] Marketing Uncovered source HTML not found; skipping');
    return;
  }

  const meta = {
    title: 'Marketing Uncovered: Career Discovery Workshop in Pune | TEONOX',
    description:
      'Don’t choose your next career based on trends. Discover what the marketing industry is really like in this 90-minute career discovery workshop by TEONOX in Pune.',
    canonical: '/marketing-uncovered',
    robots: 'index, follow',
    ogType: 'website',
  };

  let html = fs.readFileSync(sourceHtmlPath, 'utf-8');
  html = rewriteMarketingAssetPaths(html);
  html = injectMeta(html, meta);
  html = injectGa4(html);
  html = injectMarketingHeadExtras(html, meta);
  html = ensureGoogleProfileSchema(html, googleProfileSchema);

  const css = rewriteMarketingCssPaths(fs.readFileSync(sourceCssPath, 'utf-8'));
  const js = rewriteMarketingJsPaths(fs.readFileSync(sourceJsPath, 'utf-8'));

  const outputRoots = [
    path.resolve(__dirname, '..', 'public', 'marketing-uncovered'),
    path.join(distDir, 'marketing-uncovered'),
  ];

  for (const outDir of outputRoots) {
    fs.mkdirSync(path.join(outDir, 'css'), { recursive: true });
    fs.mkdirSync(path.join(outDir, 'js'), { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
    fs.writeFileSync(path.join(outDir, 'css', 'style.css'), css, 'utf-8');
    fs.writeFileSync(path.join(outDir, 'js', 'main.js'), js, 'utf-8');
    if (fs.existsSync(sourceMediaDir)) {
      fs.cpSync(sourceMediaDir, path.join(outDir, 'media'), { recursive: true, force: true });
    }
  }

  console.log('Generated: /marketing-uncovered (public + dist)');
}

// ─── Main ──────────────────────────────────────────────────────────
async function main() {
  const distDir = path.resolve(__dirname, '..', 'dist');
  const googleProfileSchema = getGoogleProfileSchema();
  const indexPath = path.join(distDir, 'index.html');
  let indexHtml = fs.readFileSync(indexPath, 'utf-8');

  // Vite normally preserves the JSON-LD verbatim. Normalize it from the
  // source template anyway so every generated page uses the exact block.
  const normalizedIndexHtml = ensureGoogleProfileSchema(indexHtml, googleProfileSchema);
  if (normalizedIndexHtml !== indexHtml) {
    fs.writeFileSync(indexPath, normalizedIndexHtml, 'utf-8');
    indexHtml = normalizedIndexHtml;
  }

  // Course and contact graphs are emitted by the React components at runtime;
  // do not copy every course schema into the shared index template.
  
  // Blog Prerendering — always generate the 7 report slugs, even when the CMS
  // is unavailable. Live metadata is used when the REST API responds.
  const auditSlugs = Object.keys(auditSchemas.blogPosts).map(normalizeSlug).filter(Boolean);
  const cmsPosts = await fetchBlogSlugs();
  const postsBySlug = new Map();
  for (const post of cmsPosts) {
    const slug = normalizeSlug(post.slug);
    if (slug) postsBySlug.set(slug, post);
  }

  const allSlugs = [...new Set([...auditSlugs, ...postsBySlug.keys()])];
  for (const slug of allSlugs) {
    const auditPost = auditSchemas.blogPosts[slug];
    let cmsPost = postsBySlug.get(slug);
    if (auditSlugs.includes(slug)) {
      cmsPost = (await fetchBlogMetadata(slug)) || cmsPost;
    }

    const fallbackTitle = auditPost ? auditPost.headline : slug;
    const liveTitle = cmsPost && plainText(cmsPost.title && cmsPost.title.rendered);
    const title = liveTitle || fallbackTitle;
    const liveDescription = cmsPost && plainText(cmsPost.excerpt && cmsPost.excerpt.rendered);
    const meta = {
      title: title + ' | TEONOX Blog',
      description: liveDescription || fallbackTitle,
      canonical: '/blog/' + slug,
      robots: 'index, follow',
      ogType: 'article',
    };

    let pageHtml = injectMeta(indexHtml, meta);
    if (auditPost) {
      pageHtml = injectSchemaBlock(pageHtml, `blog:${slug}`, auditPost, 'prerender');
    }
    await writePage(distDir, '/blog/' + slug, pageHtml);
    console.log('Generated: /blog/' + slug);
  }

  // Marketing Uncovered standalone landing page (public + dist)
  writeMarketingUncoveredPage(distDir, googleProfileSchema);
}

main();
