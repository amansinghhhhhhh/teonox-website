import { BlogPost } from '../types';

/**
 * Blog CMS traffic is always routed through the same-origin `/api/*` proxy
 * (Express server.ts, Vite dev proxy, or the .htaccess [P] rewrite on
 * production). The browser NEVER calls cms.teonox.com directly, so the CMS
 * origin stays out of the browser entirely (avoids CORS and stale-LiteSpeed-
 * header issues).
 */

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
    id: '62',
    slug: 'the-rise-of-full-stack-marketers-why-versatility-wins-2',
    category: 'Marketing & Growth',
    categories: ['Marketing & Growth'],
    title: 'The Rise of Full-Stack Marketers: Why Versatility Wins 11',
    excerpt: 'Full-stack marketers bridge data analytics, content creation, brand strategy, and conversion rate optimization to drive end-to-end growth across digital channels...',
    author: 'By TEONOX Team',
    date: '10/06/2026',
    readTime: '5 min read',
    image: 'https://cms.teonox.com/wp-content/uploads/2026/06/asset-004.jpg',
    content: [
      'The modern digital ecosystem demands marketers who understand both creative storytelling and quantitative performance metrics. Full-stack marketers operate across paid media, search optimization, automation funnels, and retention modeling.'
    ],
    link: 'https://teonox.com/blog/the-rise-of-full-stack-marketers-why-versatility-wins-2'
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
  const authorName = p._embedded?.author?.[0]?.name
    ? `By ${p._embedded.author[0].name}`
    : 'By TEONOX Team';

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
  // Strategy 1: Attempt local API proxy /api/blogs
  try {
    const res = await fetch('/api/blogs');
    if (res.ok) {
      const json = await safeJson(res);
      // Accept the Express proxy shape ({ success, data: [...] }) or a raw WP
      // posts array (LiteSpeed [P] rewrite to cms.teonox.com).
      const posts = Array.isArray(json) ? json : json?.data;
      if (Array.isArray(posts) && posts.length > 0) {
        return { blogs: posts, isLive: true };
      }
    }
  } catch (e) {
    // API proxy failed, use fallback data
  }

  // Strategy 2: Fallback data
  return { blogs: FALLBACK_BLOGS, isLive: false };
}

export async function fetchLiveBlogDetail(idOrSlug: string): Promise<BlogPost | null> {
  // Try proxy first
  try {
    const res = await fetch(`/api/blogs/${idOrSlug}`);
    if (res.ok) {
      const json = await safeJson(res);
      // Express proxy shape ({ success, data }) or a raw WP post ([P] rewrite).
      const post = json?.success ? json.data : json;
      if (post) return post;
    }
  } catch (e) {}

  // Find in fallback
  const found = FALLBACK_BLOGS.find((b) => b.id === idOrSlug || b.slug === idOrSlug);
  return found || null;
}

export async function fetchLiveCategories(): Promise<{ categories: string[]; isLive: boolean }> {
  // Categories come from the same-origin proxy; without it we use fallback data
  return { categories: FALLBACK_CATEGORIES, isLive: false };
}
