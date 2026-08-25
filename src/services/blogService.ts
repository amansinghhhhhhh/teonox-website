import { BlogPost } from '../types';

/**
 * Blog CMS traffic hits the WordPress REST API directly
 * (https://cms.teonox.com/index.php?rest_route=/wp/v2/...). The /api/* same-
 * origin proxy is NOT used on production — Hostinger's LiteSpeed does not
 * enable mod_proxy, so /api/* served index.html. Direct fetches require the
 * CMS to send `Access-Control-Allow-Origin`; when the browser blocks them, the
 * static fallback keeps the UI up.
 */

/** Direct WordPress REST API base. */
const CMS_URL = 'https://cms.teonox.com/index.php?rest_route=/wp/v2';

/** JSON-only response reader; returns null for HTML/404 static-host fallbacks. */
async function safeJson(res: Response): Promise<any> {
  if (!res) return null;
  const type = (res.headers.get('content-type') || '').toLowerCase();
  if (type && !type.includes('application/json')) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

// Fallback articles in case of offline / network unavailability
const FALLBACK_BLOGS: BlogPost[] = [
  {
    id: '153',
    slug: 'top-25-high-income-skills-to-learn-in-2026',
    category: 'Career Development',
    categories: ['Career Development', 'Professional Skills', 'Technology'],
    title: 'Top 25 High-Income Skills to Learn in 2026',
    excerpt: 'The work environment is changing faster than it has ever been. Innovations in artificial intelligence automation cloud technology are fundamentally altering industries across the world...',
    author: 'By TEONOX Team',
    date: '08/07/2026',
    readTime: '6 min read',
    image: 'https://cms.teonox.com/wp-content/uploads/2026/07/Top-25-High-Income-Skills-to-Learn-in-2026.webp',
    content: [
      'The work environment is changing faster than it has ever been. Innovations in artificial intelligence automation cloud technology, as well as digital revolutions are altering industries across all over the world. Employers aren’t seeking only qualifications, but rather the actual capabilities and skills that can help solve business-related issues.',
      'This is the reason why individuals who are skilled at earning high incomes are among the most sought-after careers lately. If you’re either a student or graduate or independent contractor or professional, knowing the knowledge you require significantly increases your career prospects and earnings potential.',
      'Contrary to traditional certifications which may take several years to finish, the vast majority of profitable skills you’ll acquire by 2026 are attainable through formal training, hands-on projects or certificates and continuous practice.'
    ],
    link: 'https://teonox.com/blog/top-25-high-income-skills-to-learn-in-2026'
  },
  {
    id: '150',
    slug: 'digital-marketing-roadmap-for-beginners-2026-a-complete-step-by-step-guide-to-build-a-successful-career',
    category: 'Digital Marketing',
    categories: ['Career & Skills', 'Digital Marketing', 'Online Marketing'],
    title: 'Digital Marketing Roadmap for Beginners (2026): A Complete Step-by-Step Guide to Build a Successful Career',
    excerpt: 'Marketing in the digital age is one of the fastest-growing professions around the world. From small businesses and startups to global enterprises, every organization relies on digital strategies...',
    author: 'By TEONOX Team',
    date: '08/07/2026',
    readTime: '5 min read',
    image: 'https://cms.teonox.com/wp-content/uploads/2026/07/Digital-Marketing-Roadmap-for-Beginners-2026.webp',
    content: [
      'Marketing in the digital age is one of the fastest-growing professions around the world. From small businesses and startups to global enterprises, every organization relies on digital strategies to reach customers and build sustainable brand equity.',
      'To build a long-term career in digital marketing in 2026, beginners must master SEO, paid advertising funnels, analytics tracking, and AI content generation techniques.'
    ],
    link: 'https://teonox.com/blog/digital-marketing-roadmap-for-beginners-2026-a-complete-step-by-step-guide-to-build-a-successful-career'
  },
  {
    id: '147',
    slug: 'ai-skills-everyone-should-learn-in-2026-before-they-become-essential',
    category: 'AI Skills',
    categories: ['AI Skills', 'Artificial Intelligence', 'Technology'],
    title: 'AI Skills Everyone Should Learn in 2026 (Before They Become Essential)',
    excerpt: 'Artificial Intelligence (AI) is not a new technology that is reserved to software engineers or large tech companies. Understanding prompt engineering, AI agent workflows, and automation will be essential...',
    author: 'By TEONOX Team',
    date: '08/07/2026',
    readTime: '4 min read',
    image: 'https://cms.teonox.com/wp-content/uploads/2026/07/AI-Skills-Everyone-Should-Learn-in-2026-Before-They-Become-Essential.webp',
    content: [
      'Artificial Intelligence (AI) is not a new technology that is reserved to software engineers or large tech companies. By understanding prompt design, generative tools, and algorithmic workflows, professionals can automate repetitive tasks and amplify creative output.',
      'In 2026, AI skills will no longer be optional add-ons on a resume; they will be foundational criteria for modern execution roles across marketing, sales, and analytics.'
    ],
    link: 'https://teonox.com/blog/ai-skills-everyone-should-learn-in-2026-before-they-become-essential'
  },
  {
    id: '42',
    slug: 'the-rise-of-full-stack-marketers-why-versatility-wins',
    category: 'Career Growth',
    categories: ['Career Growth'],
    title: 'The Rise of Full-Stack Marketers: Why Versatility Wins',
    excerpt: 'Versatility allows modern professionals to adapt rapidly to changing market conditions and technological breakthroughs in digital growth.',
    author: 'By TEONOX Team',
    date: '10/06/2026',
    readTime: '5 min read',
    image: 'https://cms.teonox.com/wp-content/uploads/2026/06/futuristic-hand-working-laptop-scaled.jpg',
    content: [
      'Versatility allows modern professionals to adapt rapidly to changing market conditions and technological breakthroughs. Learn how acquiring cross-disciplinary marketing skills sets high performers apart.'
    ],
    link: 'https://teonox.com/blog/the-rise-of-full-stack-marketers-why-versatility-wins'
  }
];

// Fallback category pills in case of offline / network unavailability
const FALLBACK_CATEGORIES = ['Marketing', 'AI', 'Business', 'Career', 'Digital Marketing', 'SEO'];

// Decode HTML Entities helper
function decodeHtmlEntities(str: string = ''): string {
  return str
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '-')
    .replace(/&#8212;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function stripHtml(html: string = ''): string {
  return decodeHtmlEntities(html.replace(/<[^>]*>/g, '')).trim();
}

function calculateReadTime(contentHtml: string = ''): string {
  const words = stripHtml(contentHtml).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/* Formats raw CMS author names for display:
   - drops the "By " prefix and any "TEONOX" tokens
   - splits camelCase compounds and inserts missing spaces
   - special-cases concatenated handles like "keshavkumari" → "Keshav Kumari"
   Always returns the field WITH its "By " prefix (components render it as-is). */
function formatAuthorName(raw: string = ''): string {
  let name = raw
    .replace(/^By\s+/i, '')
    .replace(/teonox/gi, '')
    .trim();
  if (!name) return 'By TEONOX Team';
  name = name.replace(/([a-z])([A-Z])/g, '$1 $2');
  if (/^keshav\s*kumari$/i.test(name.replace(/\s+/g, ''))) return 'By Keshav Kumari';
  return (
    'By ' +
    name
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  );
}

/* Normalizes a title into a duplicate-detection key (strips punctuation,
   casing and trailing revision artifacts like "…Wins 11" / "…Wins 2"). */
function titleDedupeKey(title: string = ''): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+\d{1,2}$/, '');
}

/* Removes placeholder ("Lorem Ipsum") posts and duplicate titles from a
   transformed blog list — keeps the first occurrence of each title. */
function sanitizeBlogList(blogs: BlogPost[]): BlogPost[] {
  const withoutPlaceholders = blogs.filter(
    (b) => !/lorem ipsum/i.test(`${b.excerpt} ${b.content.join(' ')}`)
  );
  const seen = new Set<string>();
  return withoutPlaceholders.filter((b) => {
    const key = titleDedupeKey(b.title);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function transformWpPost(p: any): BlogPost {
  const title = decodeHtmlEntities(p.title?.rendered || 'Untitled');
  const rawContent = p.content?.rendered || '';
  const rawExcerpt = p.excerpt?.rendered || '';
  const plainTextExcerpt = stripHtml(rawExcerpt || rawContent).slice(0, 180) + '...';

  const terms = p._embedded?.['wp:term']?.[0] || [];
  const categoriesList = terms.map((t: any) => decodeHtmlEntities(t.name));
  const primaryCategory = categoriesList.length > 0 ? categoriesList[0] : 'Career & Skills';

  const featuredMedia = p._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const image =
    featuredMedia ||
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80';

  const postDate = p.date ? new Date(p.date).toLocaleDateString('en-GB') : '08/07/2026';
  const authorName = formatAuthorName(p._embedded?.author?.[0]?.name || '');

  const paragraphs = rawContent
    .split(/<\/p>|<br\s*\/?>/i)
    .map((block: string) => stripHtml(block))
    .filter((txt: string) => txt.length > 10);

  return {
    id: String(p.id),
    slug: p.slug || '',
    category: primaryCategory,
    categories: categoriesList,
    title,
    excerpt: plainTextExcerpt,
    author: authorName,
    date: postDate,
    readTime: calculateReadTime(rawContent),
    image,
    contentHtml: rawContent,
    content: paragraphs,
    link: p.link || `https://teonox.com/blog/${p.slug}`,
  };
}

export async function fetchLiveBlogs(): Promise<{ blogs: BlogPost[]; isLive: boolean }> {
  // Strategy 1: direct WordPress REST API.
  try {
    const res = await fetch(`${CMS_URL}/posts&_embed&per_page=50&_cb=${Date.now()}`);
    if (res.ok) {
      const json = await safeJson(res);
      const posts = Array.isArray(json) ? json : json?.data;
      if (Array.isArray(posts) && posts.length > 0) {
        return { blogs: sanitizeBlogList(posts.map(transformWpPost)), isLive: true };
      }
    }
  } catch (e) {
    // CORS/fetch failed, use fallback data
  }

  // Strategy 2: Fallback data
  return { blogs: FALLBACK_BLOGS, isLive: false };
}

export async function fetchLiveBlogDetail(idOrSlug: string): Promise<BlogPost | null> {
  // Try direct WP API by numeric id first.
  try {
    const res = await fetch(
      `${CMS_URL}/posts/${encodeURIComponent(idOrSlug)}&_embed&_cb=${Date.now()}`,
    );
    if (res.ok) {
      const post = await safeJson(res);
      if (post) return transformWpPost(post);
    }
  } catch (e) {}

  // Then by slug.
  try {
    const res = await fetch(
      `${CMS_URL}/posts&slug=${encodeURIComponent(idOrSlug)}&_embed&_cb=${Date.now()}`,
    );
    if (res.ok) {
      const posts = await safeJson(res);
      if (Array.isArray(posts) && posts.length > 0) return transformWpPost(posts[0]);
    }
  } catch (e) {}

  // Find in fallback
  const found = FALLBACK_BLOGS.find((b) => b.id === idOrSlug || b.slug === idOrSlug);
  return found || null;
}

export async function fetchLiveCategories(): Promise<{ categories: string[]; isLive: boolean }> {
  // Direct WP categories fetch; fall back to the static list when CORS/network fails.
  try {
    const res = await fetch(`${CMS_URL}/categories&per_page=100&_cb=${Date.now()}`);
    if (res.ok) {
      const data = await safeJson(res);
      if (Array.isArray(data) && data.length > 0) {
        const categories = data
          .filter((cat: any) => cat.slug !== 'uncategorized' && cat.count > 0)
          .map((cat: any) => decodeHtmlEntities(cat.name))
          .filter(Boolean);
        if (categories.length > 0) return { categories, isLive: true };
      }
    }
  } catch (e) {
    console.warn('Direct WP categories fetch failed, using fallback categories', e);
  }

  return { categories: FALLBACK_CATEGORIES, isLive: false };
}
