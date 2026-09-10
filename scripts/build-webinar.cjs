/**
 * Build script: copies the static webinar landing page into dist/webinar/.
 * Runs after vite build + prerender so dist/ already exists.
 *
 * Source: ./webinar-source/ (static HTML/CSS/JS, committed to repo)
 * Dest:   dist/webinar/
 */

const fs = require('fs');
const path = require('path');

const SRC = path.resolve(__dirname, '..', 'webinar-source');
const DEST = path.resolve(__dirname, '..', 'dist', 'webinar');

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

  // Clean destination
  if (fs.existsSync(DEST)) {
    fs.rmSync(DEST, { recursive: true, force: true });
  }

  // Copy everything recursively
  copyDirSync(SRC, DEST);

  const fileCount = countFiles(DEST);
  console.log(`[build-webinar] Copied ${fileCount} file(s) from webinar-source/ -> dist/webinar/`);
}

main();
