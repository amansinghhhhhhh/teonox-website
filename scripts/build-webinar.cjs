/**
 * Build script: copies the static webinar landing page into dist/webinar/.
 * Runs after vite build + prerender so dist/ already exists.
 *
 * Source: D:\teonox-workshop\teonox-workshop (static HTML/CSS/JS, no build step)
 * Dest:   dist/webinar/
 */

const fs = require('fs');
const path = require('path');

const SRC = path.resolve('D:\\teonox-workshop\\teonox-workshop');
const DEST = path.resolve(__dirname, '..', 'dist', 'webinar');

// Directories to copy recursively
const DIRS = ['css', 'js', 'assets', 'mentor and social proff', 'OUR MENTORS', 'placement logo', 'portfolio', 'Tool logo', 'The 30-Day Creator Journey', 'What You Get', "What You'll Learn in This Workshop"];

// Files to copy from root
const ROOT_FILES = [
  'index.html',
  'favicon.png',
  'hero5.jpg',
  'instagram image.webp',
  'LinkedIn image.jpeg',
  'teonox-Logo-with-Tagline-2.png',
  'teonox-community-1.jpg',
  'teonox-office-1.webp',
  'teonox-office-2.webp',
  'teonox-office-3.webp',
  'teonox-office-4.webp',
  'teonox-office-5.webp',
  'teonox-office-6.webp',
  'teonox-strip-1.jpg',
  'teonox-strip-2.jpg',
  'teonox-strip-3.jpg',
  'teonox-workshop-1.jpg',
];

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

function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`[build-webinar] Source not found: ${SRC}`);
    process.exit(1);
  }

  // Clean destination
  if (fs.existsSync(DEST)) {
    fs.rmSync(DEST, { recursive: true, force: true });
  }
  fs.mkdirSync(DEST, { recursive: true });

  // Copy root files
  let fileCount = 0;
  for (const file of ROOT_FILES) {
    const srcPath = path.join(SRC, file);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, path.join(DEST, file));
      fileCount++;
    }
  }

  // Copy directories
  for (const dir of DIRS) {
    const srcPath = path.join(SRC, dir);
    if (fs.existsSync(srcPath)) {
      copyDirSync(srcPath, path.join(DEST, dir));
      // Count files in dir
      const count = walkSync(srcPath);
      fileCount += count;
    }
  }

  console.log(`[build-webinar] Copied ${fileCount} file(s) to dist/webinar/`);
}

function walkSync(dir) {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      count += walkSync(path.join(dir, entry.name));
    } else {
      count++;
    }
  }
  return count;
}

main();
