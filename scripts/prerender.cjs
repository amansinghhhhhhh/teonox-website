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

// Generate marketing-uncovered page static HTML from the designer's pure HTML/CSS/JS.
const PAYMENT_URL = 'https://learn.teonox.com/web/checkout/6af840ffc14ddf1c3575796e';
const DESIGNER_MARKETING_DIR = path.resolve(__dirname, '..', 'designer', 'marketing-uncovered');

function sanitizeDesignerScript(source) {
  let cleaned = source;
  const modalIndex = cleaned.indexOf('/* ---------------- Booking modal ---------------- */');
  if (modalIndex !== -1) {
    cleaned = cleaned.slice(0, modalIndex) + '\n})();\n';
  }
  return cleaned;
}

function transformDesignerMarketingHtml(source) {
  let html = source;

  // Remove the entire booking modal, including both <form> elements.
  const modalComment = '<!-- ============ BOOKING MODAL ============ -->';
  const scriptTag = '<script src="script.js"></script>';
  const modalStart = html.indexOf(modalComment);
  const scriptStart = html.indexOf(scriptTag);
  if (modalStart !== -1 && scriptStart > modalStart) {
    html = html.slice(0, modalStart) + html.slice(scriptStart);
  }

  // Remove the floating WhatsApp pill.
  html = html.replace(/<a class="float-pill float-pill-wa"[\s\S]*?<\/a>\s*/i, '');

  // Every booking/reserve CTA goes straight to the payment link.
  html = html.replace(/href="#reserve"/g, `href="${PAYMENT_URL}" target="_blank" rel="noopener noreferrer"`);

  // Session buttons become real links to payment.
  html = html.replace(
    /<button type="button" class="session-btn js-book">([\s\S]*?)<\/button>/g,
    (_match, inner) => `<a href="${PAYMENT_URL}" target="_blank" rel="noopener noreferrer" class="session-btn">${inner}</a>`
  );

  // WhatsApp CTA buttons become payment CTAs.
  const paymentCta = `<a href="${PAYMENT_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-solid">Reserve Your Spot <svg><use href="#i-arrow-right"/></svg></a>`;
  html = html.replace(/<a class="btn btn-wa"[^>]*id="wa-question"[^>]*>[\s\S]*?<\/a>/gi, paymentCta);
  html = html.replace(/<a class="btn btn-wa"[^>]*id="wa-final"[^>]*>[\s\S]*?<\/a>/gi, paymentCta);

  // Defensive cleanup: no WhatsApp links, no forms, no booking-script hooks.
  html = html.replace(/<a\b[^>]*href="https:\/\/(?:wa\.me|api\.whatsapp\.com)[^"]*"[^>]*>[\s\S]*?<\/a>/gi, '');
  html = html.replace(/<form\b[\s\S]*?<\/form>/gi, '');
  html = html.replace(/\s+js-book\b/g, '');

  // Static assets must resolve from /marketing-uncovered (the URL has no trailing slash).
  html = html.replace(/(href|src)="(styles\.css|script\.js|icon\.svg|apple-touch-icon\.png)"/g,
    (_match, attr, file) => `${attr}="/marketing-uncovered/${file}"`);
  html = html.replace(/(href|src|poster)="media\//g, (_match, attr) => `${attr}="/marketing-uncovered/media/`);

  return html;
}

async function writeMarketingUncoveredPage(distDir, googleProfileSchema) {
  const outDir = path.join(distDir, 'marketing-uncovered');
  fs.mkdirSync(outDir, { recursive: true });

  const designerHtml = fs.readFileSync(path.join(DESIGNER_MARKETING_DIR, 'index.html'), 'utf-8');
  const designerCss = fs.readFileSync(path.join(DESIGNER_MARKETING_DIR, 'styles.css'), 'utf-8');
  const designerScript = fs.readFileSync(path.join(DESIGNER_MARKETING_DIR, 'script.js'), 'utf-8');

  const meta = {
    title: 'Marketing Uncovered: Career Discovery Workshop | Teonox',
    description: 'Explore the world of marketing, AI, and business in this 90-minute career discovery workshop by TEONOX.',
    canonical: '/marketing-uncovered',
    robots: 'index, follow',
    ogType: 'website',
  };

  const transformedHtml = transformDesignerMarketingHtml(designerHtml);
  const html = ensureGoogleProfileSchema(injectMeta(transformedHtml, meta), googleProfileSchema);
  await writePage(distDir, '/marketing-uncovered', html);

  const publicDir = path.resolve(__dirname, '..', 'public', 'marketing-uncovered');
  fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, 'index.html'), html, 'utf-8');

  const cssContent = designerCss.replace(/overflow-x:\s*hidden\s*;/g, 'overflow-x: clip;');
  const scriptContent = sanitizeDesignerScript(designerScript);

  fs.writeFileSync(path.join(outDir, 'styles.css'), cssContent, 'utf-8');
  fs.writeFileSync(path.join(outDir, 'script.js'), scriptContent, 'utf-8');

  fs.cpSync(path.join(DESIGNER_MARKETING_DIR, 'media'), path.join(outDir, 'media'), { recursive: true, force: true });
  for (const icon of [
    'icon.svg',
    'apple-touch-icon.png',
    'pwa-192x192.png',
    'pwa-512x512.png',
    'pwa-maskable-512x512.png',
  ]) {
    const from = path.join(DESIGNER_MARKETING_DIR, icon);
    if (fs.existsSync(from)) fs.copyFileSync(from, path.join(outDir, icon));
  }

  // Also sync to public/marketing-uncovered for dev mode / SPA
  fs.writeFileSync(path.join(publicDir, 'styles.css'), cssContent, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'script.js'), scriptContent, 'utf-8');
  fs.cpSync(path.join(DESIGNER_MARKETING_DIR, 'media'), path.join(publicDir, 'media'), { recursive: true, force: true });
  for (const icon of [
    'icon.svg',
    'apple-touch-icon.png',
    'pwa-192x192.png',
    'pwa-512x512.png',
    'pwa-maskable-512x512.png',
  ]) {
    const from = path.join(DESIGNER_MARKETING_DIR, icon);
    if (fs.existsSync(from)) fs.copyFileSync(from, path.join(publicDir, icon));
  }

  // Generate src/pages/MarketingUncovered/rawHtml.ts
  const bodyMatch = transformedHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1].trim() : transformedHtml;
  const rawHtmlTsPath = path.resolve(__dirname, '..', 'src', 'pages', 'MarketingUncovered', 'rawHtml.ts');
  fs.writeFileSync(rawHtmlTsPath, `export const rawHtmlBody = \`${bodyContent.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\`;\n`, 'utf-8');

  // Generate src/pages/MarketingUncovered/marketingUncoveredScript.js
  const scriptJsPath = path.resolve(__dirname, '..', 'src', 'pages', 'MarketingUncovered', 'marketingUncoveredScript.js');
  const wrappedScript = `export function initializeMarketingUncovered() {\n${scriptContent}\n}\n`;
  fs.writeFileSync(scriptJsPath, wrappedScript, 'utf-8');

  // Generate src/pages/MarketingUncovered/marketing-uncovered.css
  const cssPath = path.resolve(__dirname, '..', 'src', 'pages', 'MarketingUncovered', 'marketing-uncovered.css');
  fs.writeFileSync(cssPath, `/* Marketing Uncovered overrides */\n.career-unlocked-lp.marketing-uncovered-lp {\n  overflow-x: clip;\n}\n.marketing-uncovered-lp [data-reveal] {\n  opacity: 1 !important;\n  transform: none !important;\n}\n${cssContent}\n`, 'utf-8');

  console.log('Generated: /marketing-uncovered (designer HTML/CSS/JS + media + React sync)');
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
  
  // Marketing Uncovered Prerendering
  await writeMarketingUncoveredPage(distDir, googleProfileSchema);
}

main();
