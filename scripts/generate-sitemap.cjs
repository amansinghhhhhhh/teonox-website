const fs = require('fs');
const path = require('path');

async function main() {
  const distDir = path.resolve(__dirname, '..', 'dist');
  const sourceSitemap = path.resolve(__dirname, '..', 'public', 'sitemap.xml');

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  if (fs.existsSync(sourceSitemap)) {
    const xml = fs.readFileSync(sourceSitemap, 'utf-8');
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf-8');
    console.log('✓ Copied static sitemap.xml to dist/');
  } else {
    console.error('! Error: public/sitemap.xml not found.');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('[Sitemap] Generation failed:', err);
  process.exit(1);
});
