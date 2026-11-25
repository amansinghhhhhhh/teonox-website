#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const GA_ID = 'G-YZ0K65RBRD';
const GA_LOADER = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
const GA_CONFIG = `gtag('config', '${GA_ID}')`;
const failures = [];

function fail(message) {
  failures.push(message);
}

function abs(relativePath) {
  return path.join(ROOT, relativePath);
}

function read(relativePath, required = true) {
  const filePath = abs(relativePath);
  if (!fs.existsSync(filePath)) {
    if (required) fail(`Missing required file: ${relativePath}`);
    return null;
  }
  return fs.readFileSync(filePath, 'utf8');
}

function countOccurrences(text, needle) {
  if (!text || !needle) return 0;
  let count = 0;
  let index = 0;
  while ((index = text.indexOf(needle, index)) !== -1) {
    count += 1;
    index += needle.length;
  }
  return count;
}

function expectExactlyOnce(relativePath, text, needle, label) {
  if (text == null) return;
  const actual = countOccurrences(text, needle);
  if (actual !== 1) {
    fail(`${label}: ${relativePath} has ${actual} occurrence(s) of ${JSON.stringify(needle)}; expected exactly 1`);
  }
}

function checkSourcePatterns(relativePath, patterns) {
  const source = read(relativePath);
  if (source == null) return;
  for (const [label, pattern] of patterns) {
    if (!pattern.test(source)) {
      fail(`${relativePath}: missing ${label}`);
    }
  }
}

function listGeneratedBlogPages() {
  const blogDir = path.join(DIST, 'blog');
  if (!fs.existsSync(blogDir) || !fs.statSync(blogDir).isDirectory()) {
    fail('Missing generated blog directory: dist/blog');
    return [];
  }

  const pages = [];
  for (const entry of fs.readdirSync(blogDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const relativePath = `dist/blog/${entry.name}/index.html`;
    const absolutePath = abs(relativePath);
    if (!fs.existsSync(absolutePath)) {
      fail(`Generated blog directory is missing index.html: dist/blog/${entry.name}/`);
      continue;
    }
    pages.push({ slug: entry.name, relativePath, html: fs.readFileSync(absolutePath, 'utf8') });
  }

  if (pages.length === 0) {
    fail('No generated blog pages found under dist/blog');
  }
  return pages;
}

function extractJsonLdBlocks(html) {
  const pattern = /<script\b([^>]*)type=["']application\/ld\+json["']([^>]*)>([\s\S]*?)<\/script>/gi;
  const blocks = [];
  let match;
  while ((match = pattern.exec(html)) !== null) {
    blocks.push({ attrs: `${match[1]} ${match[2]}`, json: match[3] });
  }
  return blocks;
}

// ─── 1. GA4 analytics ───────────────────────────────────────────────
const sourceIndexHtml = read('index.html');
const distIndexHtml = read('dist/index.html');
const blogPages = listGeneratedBlogPages();

expectExactlyOnce('index.html', sourceIndexHtml, GA_LOADER, 'GA4 loader (source)');
expectExactlyOnce('index.html', sourceIndexHtml, GA_CONFIG, 'GA4 config (source)');
expectExactlyOnce('dist/index.html', distIndexHtml, GA_LOADER, 'GA4 loader (build output)');
expectExactlyOnce('dist/index.html', distIndexHtml, GA_CONFIG, 'GA4 config (build output)');
for (const page of blogPages) {
  expectExactlyOnce(page.relativePath, page.html, GA_LOADER, 'GA4 loader (prerendered blog)');
  expectExactlyOnce(page.relativePath, page.html, GA_CONFIG, 'GA4 config (prerendered blog)');
}

// ─── 2. Canonical LocalBusiness + report JSON-LD ─────────────────────
const GOOGLE_PROFILE_PATTERN = /<script type="application\/ld\+json">((?:(?!<\/script>)[\s\S])*?"@type":\s*"LocalBusiness"(?:(?!<\/script>)[\s\S])*?)<\/script>/;
const profileMatch = sourceIndexHtml ? sourceIndexHtml.match(GOOGLE_PROFILE_PATTERN) : null;

if (!profileMatch) {
  fail('Canonical LocalBusiness JSON-LD block not found in index.html');
} else {
  const canonicalBlock = profileMatch[0];
  const jsonText = canonicalBlock
    .replace(/^<script[^>]*>/, '')
    .replace(/<\/script>$/, '');
  try {
    const parsed = JSON.parse(jsonText);
    if (parsed['@type'] !== 'LocalBusiness') {
      fail('Canonical JSON-LD block in index.html is not LocalBusiness');
    }
  } catch (error) {
    fail(`Canonical LocalBusiness JSON-LD in index.html is invalid JSON: ${error.message}`);
  }

  expectExactlyOnce('dist/index.html', distIndexHtml, canonicalBlock, 'canonical LocalBusiness JSON-LD');
  for (const page of blogPages) {
    expectExactlyOnce(page.relativePath, page.html, canonicalBlock, 'canonical LocalBusiness JSON-LD');
  }
}

// ─── 2b. Marketing Uncovered standalone landing page ─────────────────
const marketingUncoveredRelativePath = 'dist/marketing-uncovered/index.html';
const marketingUncoveredHtml = read(marketingUncoveredRelativePath);
if (marketingUncoveredHtml != null) {
  expectExactlyOnce(marketingUncoveredRelativePath, marketingUncoveredHtml, GA_LOADER, 'GA4 loader (marketing-uncovered)');
  expectExactlyOnce(marketingUncoveredRelativePath, marketingUncoveredHtml, GA_CONFIG, 'GA4 config (marketing-uncovered)');
  if (profileMatch) {
    expectExactlyOnce(marketingUncoveredRelativePath, marketingUncoveredHtml, profileMatch[0], 'canonical LocalBusiness JSON-LD (marketing-uncovered)');
  }
  if (!marketingUncoveredHtml.includes('rel="canonical" href="https://teonox.com/marketing-uncovered"')) {
    fail(`${marketingUncoveredRelativePath}: missing canonical https://teonox.com/marketing-uncovered`);
  }
  if (!marketingUncoveredHtml.includes('href="/marketing-uncovered/css/style.css"')) {
    fail(`${marketingUncoveredRelativePath}: missing absolute stylesheet /marketing-uncovered/css/style.css`);
  }
  if (!marketingUncoveredHtml.includes('src="/marketing-uncovered/js/main.js"')) {
    fail(`${marketingUncoveredRelativePath}: missing absolute script /marketing-uncovered/js/main.js`);
  }
  if (/\b(?:href|src|poster|data-src)="(?:css|js|media)\//.test(marketingUncoveredHtml)) {
    fail(`${marketingUncoveredRelativePath}: contains un-rewritten relative asset path`);
  }
}

const auditSource = read('src/data/schemaAudit.json');
let audit = null;
if (auditSource != null) {
  try {
    audit = JSON.parse(auditSource);
  } catch (error) {
    fail(`src/data/schemaAudit.json is invalid JSON: ${error.message}`);
  }
}

const auditEntries = audit && audit.blogPosts && typeof audit.blogPosts === 'object'
  ? Object.entries(audit.blogPosts)
  : [];
if (auditEntries.length !== 7) {
  fail(`src/data/schemaAudit.json must define exactly 7 blogPosts; found ${auditEntries.length}`);
}

for (const [slug, expectedSchema] of auditEntries) {
  const relativePath = `dist/blog/${slug}/index.html`;
  const page = blogPages.find((entry) => entry.slug === slug);
  if (!page) {
    fail(`Audit blog page was not generated: ${relativePath}`);
    continue;
  }

  const blocks = extractJsonLdBlocks(page.html);
  const injectedBlocks = blocks.filter((block) =>
    block.attrs.includes(`data-schema-id="blog:${slug}"`));
  if (injectedBlocks.length !== 1) {
    fail(`${relativePath}: expected exactly one JSON-LD block with data-schema-id="blog:${slug}"; found ${injectedBlocks.length}`);
    continue;
  }

  let actualSchema;
  try {
    actualSchema = JSON.parse(injectedBlocks[0].json);
  } catch (error) {
    fail(`${relativePath}: BlogPosting JSON-LD is invalid JSON: ${error.message}`);
    continue;
  }

  if (actualSchema['@type'] !== 'BlogPosting') {
    fail(`${relativePath}: injected schema @type is ${JSON.stringify(actualSchema['@type'])}; expected "BlogPosting"`);
  }

  try {
    assert.deepStrictEqual(actualSchema, expectedSchema);
  } catch {
    fail(`${relativePath}: BlogPosting JSON-LD does not match src/data/schemaAudit.json for slug "${slug}"`);
  }

  const blogPostingBlocks = blocks.filter((block) => {
    try {
      return JSON.parse(block.json)['@type'] === 'BlogPosting';
    } catch {
      return false;
    }
  });
  if (blogPostingBlocks.length !== 1) {
    fail(`${relativePath}: expected exactly one BlogPosting JSON-LD block; found ${blogPostingBlocks.length}`);
  }
}

// ─── 3. Dynamic Rank Math meta + blog prerender coverage ─────────────
checkSourcePatterns('server.ts', [
  ['program REST fields including rank_math_seo', /_fields=id,slug,title,acf,rank_math_seo/],
  ['Rank Math title resolution', /normalizeProgramSeoTitle\(post\.rank_math_seo\?\.title/],
  ['Rank Math description resolution', /normalizeProgramSeoDescription\(post\.rank_math_seo\?\.description/],
  ['route slug mapped to CMS slug', /resolveCmsProgramSlug\(routeSlug\)/],
  [
    'dynamic programme meta resolved before static fallback',
    /segments\[0\]\s*===\s*'programmes'[\s\S]*?fetchProgramMeta\(segments\[1\]\)[\s\S]*?META_MAP\[clean\]/,
  ],
  ['canonical preserved on the site route', /canonical:\s*`\/programmes\/\$\{routeSlug\}`/],
]);

checkSourcePatterns('scripts/prerender.cjs', [
  ['live CMS blog slug fetch', /const cmsPosts\s*=\s*await fetchBlogSlugs\(\)/],
  ['audit slugs loaded from the report', /const auditSlugs\s*=\s*Object\.keys\(auditSchemas\.blogPosts\)/],
  ['audit and CMS slugs merged', /new Set\(\[\.\.\.auditSlugs,\s*\.\.\.postsBySlug\.keys\(\)\]\)/],
  [
    'every merged slug is written',
    /for \(const slug of allSlugs\)[\s\S]*?writePage\(distDir,\s*'\/blog\/'\s*\+\s*slug,\s*pageHtml\)/,
  ],
  [
    'audit BlogPosting schema injected at prerender time',
    /injectSchemaBlock\(pageHtml,\s*`blog:\$\{slug\}`,\s*auditPost,\s*'prerender'\)/,
  ],
]);

const sitemap = read('dist/sitemap.xml');
if (sitemap != null) {
  const sitemapSlugs = new Set();
  const sitemapPattern = /<loc>https:\/\/teonox\.com\/blog\/([^<]+)<\/loc>/g;
  let match;
  while ((match = sitemapPattern.exec(sitemap)) !== null) {
    try {
      sitemapSlugs.add(decodeURIComponent(match[1]));
    } catch {
      sitemapSlugs.add(match[1]);
    }
  }

  if (sitemapSlugs.size === 0) {
    fail('dist/sitemap.xml contains no /blog/<slug> URLs; live CMS blog slugs cannot be verified');
  }

  for (const slug of sitemapSlugs) {
    if (!blogPages.some((page) => page.slug === slug)) {
      fail(`Live CMS blog slug from sitemap has no prerendered page: ${slug} (dist/blog/${slug}/index.html)`);
    }
  }
}

// ─── 4. Legacy 301 redirects ─────────────────────────────────────────
const legacyRedirectRules = [
  'RewriteRule ^programmes/build-digital-marketing-skills-with-ai/?$ /programmes [R=301,L]',
  'RewriteRule ^programmesspecialization-in-performance-marketing/?$ /programmes [R=301,L]',
];

for (const relativePath of ['public/.htaccess', 'dist/.htaccess']) {
  const contents = read(relativePath);
  if (contents == null) continue;

  const lines = contents.split(/\r?\n/).map((line) => line.trim());
  for (const rule of legacyRedirectRules) {
    const matches = lines.filter((line) => line === rule).length;
    if (matches !== 1) {
      fail(`${relativePath}: expected exactly one exact rule ${JSON.stringify(rule)}; found ${matches}`);
    }
  }

  const firstLegacyRuleIndex = lines.indexOf(legacyRedirectRules[0]);
  const trailingSlashRuleIndex = lines.findIndex((line) =>
    line === 'RewriteCond %{REQUEST_URI} ^/(.+)/$');
  if (firstLegacyRuleIndex !== -1 && trailingSlashRuleIndex !== -1 && firstLegacyRuleIndex > trailingSlashRuleIndex) {
    fail(`${relativePath}: legacy 301 rules must appear before trailing-slash removal`);
  }
}

if (failures.length > 0) {
  console.error(`\nSEO/analytics guardrail verification FAILED (${failures.length} issue${failures.length === 1 ? '' : 's'}):`);
  for (const failure of failures) {
    console.error(`  - ${failure}`);
  }
  process.exit(1);
}

console.log(
  `SEO/analytics guardrails OK: ${blogPages.length} prerendered blog page(s), ` +
  `${auditEntries.length} audit schema(s), GA4 ${GA_ID}.`,
);
