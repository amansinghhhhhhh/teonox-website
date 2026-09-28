/**
 * Build script: copies the entire static webinar landing page into dist/webinar-assets/.
 *
 * Output:
 *   dist/webinar.html               ← main HTML (rewrites from /webinar)
 *   dist/webinar-assets/**           ← ALL assets with /webinar-assets/ root-relative paths
 *
 * Source: ./webinar-source/ (static HTML/CSS/JS, committed to repo)
 */

const fs = require('fs');
const path = require('path');

const SRC = path.resolve(__dirname, '..', 'webinar-source');
const DIST = path.resolve(__dirname, '..', 'dist');
const DEST_ASSETS = path.join(DIST, 'webinar-assets');

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function countFiles(dir) {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      count += countFiles(path.join(dir, entry.name));
    } else {
      count++;
    }
  }
  return count;
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`[build-webinar] Source not found: ${SRC}`);
    process.exit(1);
  }

  // Clean destination — remove old directories if they exist
  for (const oldDir of ['webinar', 'webinar-assets']) {
    const oldPath = path.join(DIST, oldDir);
    if (fs.existsSync(oldPath)) {
      fs.rmSync(oldPath, { recursive: true, force: true });
    }
  }

  // Copy entire webinar-source/ to dist/webinar-assets/ (including root-level files)
  copyDirSync(SRC, DEST_ASSETS);

  // Read index.html and rewrite ALL paths to root-relative /webinar-assets/
  const htmlSrc = path.join(SRC, 'index.html');
  let html = fs.readFileSync(htmlSrc, 'utf8');

  // Rewrite href="css/... → href="/webinar-assets/css/...
  html = html.replace(/(href|src|action)="(css\/)/g, '$1="/webinar-assets/css/');
  // Rewrite href="js/... → href="/webinar-assets/js/...
  html = html.replace(/(href|src|action)="(js\/)/g, '$1="/webinar-assets/js/');
  // Rewrite href="assets/... → href="/webinar-assets/assets/...
  html = html.replace(/(href|src|action)="(assets\/)/g, '$1="/webinar-assets/assets/');
  // Rewrite src="images/... → src="/webinar-assets/images/...
  html = html.replace(/(href|src|action)="(images\/)/g, '$1="/webinar-assets/images/');

  // Rewrite root-level image files: src="teonox-... → src="/webinar-assets/teonox-...
  // Match src=" or href=" followed by a filename (no slash) ending in common image extensions
  html = html.replace(/(src|href)="(?!https?:\/\/|#|mailto:|\/)([^"\/][^"]*\.(jpg|jpeg|png|webp|gif|svg|ico))"/gi,
    '$1="/webinar-assets/$2"');

  // Rewrite folder-based paths with spaces: src="Tool logo/... → src="/webinar-assets/Tool logo/...
  // These have spaces so they start with a capital letter followed by a space and /
  html = html.replace(/(src|href)="([A-Z][^"\/]*\/)/g, '$1="/webinar-assets/$2');

  // Rewrite url() in inline styles if any
  html = html.replace(/url\(\s*['"]?(css\/|images\/|assets\/)/g, 'url(/webinar-assets/$1');

  // Write to dist/webinar.html
  const htmlDest = path.join(DIST, 'webinar.html');

  // Inject runtime config from env (no secrets in client bundle — only public checkout URL + amount).
  // VITE_TAGMANGO_URL / TAGMANGO_URL → window.__TAGMANGO_URL__ (default placeholder).
  // VITE_WEBHOOK_URL → window.__WEBHOOK_URL__ (optional override, defaults to Apps Script URL in main.js).
  // VITE_WORKSHOP_PRICE → window.__WORKSHOP_AMOUNT__ (default 99).
  const tagmangoUrl = process.env.VITE_TAGMANGO_URL || process.env.TAGMANGO_URL || 'https://tagmango.com/checkout/placeholder';
  const webhookUrl = process.env.VITE_WEBHOOK_URL || '';
  const workshopAmount = process.env.VITE_WORKSHOP_PRICE || '99';
  // Source HTML already contains a fallback config block; just sync its values from env
  // so dist output never carries duplicate config scripts.
  html = html.replace(/window\.__TAGMANGO_URL__\s*=\s*[^;]+;/, `window.__TAGMANGO_URL__=${JSON.stringify(tagmangoUrl)};`);
  html = html.replace(/window\.__WORKSHOP_AMOUNT__\s*=\s*[^;]+;/, `window.__WORKSHOP_AMOUNT__=${JSON.stringify(Number(workshopAmount) || 99)};`);
  if (webhookUrl && !html.includes('__WEBHOOK_URL__')) {
    const configScript = `<script>window.__WEBHOOK_URL__=${JSON.stringify(webhookUrl)};</script>`;
    if (html.includes('/webinar-assets/js/main.js')) {
      html = html.replace(/(<script\s+src="\/webinar-assets\/js\/main\.js"><\/script>)/, `${configScript}\n  $1`);
    } else {
      html = html.replace('</body>', `  ${configScript}\n</body>`);
    }
  }
  fs.writeFileSync(htmlDest, html, 'utf8');

  // Also rewrite CSS url() references to use root-relative paths
  const cssFiles = [
    path.join(DEST_ASSETS, 'css', 'style.css')
  ];
  for (const cssFile of cssFiles) {
    if (fs.existsSync(cssFile)) {
      let css = fs.readFileSync(cssFile, 'utf8');
      // url('../hero5.jpg') → url('/webinar-assets/hero5.jpg')
      css = css.replace(/url\(\s*['"]\.\.\/([^'"]+)['"\s*]\)/g, "url('/webinar-assets/$1')");
      // url('images/...') → url('/webinar-assets/images/...')
      css = css.replace(/url\(\s*['"](?:\.\.\/)?(images\/[^'"]+)['"\s*]\)/g, "url('/webinar-assets/$1')");
      fs.writeFileSync(cssFile, css, 'utf8');
    }
  }

  const assetCount = countFiles(DEST_ASSETS);
  console.log(`[build-webinar] Built dist/webinar.html + ${assetCount} asset file(s) in dist/webinar-assets/`);
}

main();
