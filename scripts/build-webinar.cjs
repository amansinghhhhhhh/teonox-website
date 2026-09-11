/**
 * Build script: copies the static webinar landing page into dist/.
 *
 * Output structure:
 *   dist/webinar.html          ← main HTML (rewrites from /webinar)
 *   dist/webinar/css/style.css ← assets served from /webinar/ path
 *   dist/webinar/js/main.js
 *   dist/webinar/images/
 *
 * Source: ./webinar-source/ (static HTML/CSS/JS, committed to repo)
 */

const fs = require('fs');
const path = require('path');

const SRC = path.resolve(__dirname, '..', 'webinar-source');
const DIST = path.resolve(__dirname, '..', 'dist');
const DEST_ASSETS = path.join(DIST, 'webinar');

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

  // Clean destination assets directory
  if (fs.existsSync(DEST_ASSETS)) {
    fs.rmSync(DEST_ASSETS, { recursive: true, force: true });
  }

  // Copy css/, js/, images/ to dist/webinar/
  const assetDirs = ['css', 'js', 'images'];
  for (const dir of assetDirs) {
    const srcDir = path.join(SRC, dir);
    if (fs.existsSync(srcDir)) {
      copyDirSync(srcDir, path.join(DEST_ASSETS, dir));
    }
  }

  // Read index.html and rewrite asset paths from "css/" to "webinar/css/" etc.
  const htmlSrc = path.join(SRC, 'index.html');
  let html = fs.readFileSync(htmlSrc, 'utf8');

  // Update relative paths: href="css/ → href="webinar/css/, src="js/ → src="webinar/js/, etc.
  html = html.replace(/(href|src|action)="(css\/)/g, '$1="webinar/css/');
  html = html.replace(/(href|src|action)="(js\/)/g, '$1="webinar/js/');
  html = html.replace(/(href|src|action)="(images\/)/g, '$1="webinar/images/');

  // Write to dist/webinar.html
  const htmlDest = path.join(DIST, 'webinar.html');
  fs.writeFileSync(htmlDest, html, 'utf8');

  const assetCount = countFiles(DEST_ASSETS);
  console.log(`[build-webinar] Built dist/webinar.html + ${assetCount} asset file(s) in dist/webinar/`);
}

main();
