import { ProgramDetailData, PROGRAM_DETAILS_MAP } from '../data/programDetails';
import { PROGRAMS_DATA } from '../data';
import dmAiImg from '../assets/images/uploaded_digital_marketing_ai.webp';
import perfImg from '../assets/images/uploaded_performance.webp';
import seoImg from '../assets/images/uploaded_seo.webp';
import socialImg from '../assets/images/uploaded_social_media.webp';

/**
 * Normalised data for a single program card on the /programs listing page.
 * Populated from the WP "Card Information" ACF fields, with the detail-tab
 * fields as fallbacks when a card-specific value hasn't been entered yet.
 */
export interface LiveProgramCard {
  id: string;
  title: string;
  brandBadge: string;
  description: string;
  durationText: string;
  certText: string;
  targetText: string;
  mode: string;
  image?: string;
  brochureUrl: string;
  categoryId: string;
  /** Assigned `program-category` term slugs (from embedded WP terms). */
  categorySlugs: string[];
  /** Assigned `program-category` term IDs (from post['program-category'] / embedded terms). */
  categoryIds: string[];
  categories: string[];
}

/**
 * Curated sidebar categories (ProgramsPage) ->
 * mapping table from WP `program-category` term slug to those curated ids.
 * Every program card also always belongs to the "popular" tab (see below).
 */
export const PROGRAM_TERM_TO_CATEGORY: Record<string, string> = {
  ai: 'genai',
  'gen-ai': 'genai',
  'gen-ai-marketing': 'genai',
  'popular': 'popular',
  'popular-programs': 'popular',
  marketing: 'performance',
  'performance-marketing': 'performance',
  'performance-paid-ads': 'performance',
  'paid-ads': 'performance',
  'media-buying': 'performance',
  seo: 'seo',
  search: 'seo',
  growth: 'seo',
  'seo-search-growth': 'seo',
  'search-engine-optimization': 'seo',
  social: 'social',
  'social-media': 'social',
  'social-media-content': 'social',
  content: 'social',
  business: 'master',
  master: 'master',
  'master-certification': 'master',
  executive: 'master',
};

/**
 * Keyword fallback for posts that have no `program-category` term assigned in
 * WordPress yet. Scans the slug + title so the v2 test program (and any draft)
 * still lands on the correct curated tab instead of only "Popular Programs".
 */
const CATEGORY_KEYWORDS: Array<{ test: RegExp; id: string }> = [
  { test: /seo|search|organic|search-engine/i, id: 'seo' },
  { test: /social media|social|content|community/i, id: 'social' },
  { test: /performance|paid ads|paid-ads|media buying|ads/i, id: 'performance' },
  { test: /gen\s?ai|generative|artificial intelligence|\bai\b/i, id: 'genai' },
  { test: /master|executive|diploma|certification/i, id: 'master' },
];

const POPULAR_CATEGORY = 'popular';

/** Decode an embedded WP term's taxonomy slug, e.g. "program-category". */
function termTaxonomySlug(t: any): string {
  return (t?.taxonomy || '').toString().toLowerCase();
}

/**
 * Data-fetching + transformer utility for Program detail content.
 *
 * The WordPress CMS stores program content via the ACF "Program Fields V2"
 * field group (see src/data/programFieldsV2.json). ACF PRO exposes those
 * fields in the REST API either flattened at the top level of the post object
 * or nested under an `acf` object, depending on the site's ACF REST settings.
 * `transformWpProgram` accepts either shape and normalises it back into the
 * frontend `ProgramDetailData` type so `ProgramDetailPage.tsx` can render
 * live CMS content with the existing static data as a seamless fallback.
 *
 * Fetch strategy (mirrors blogService):
 *   1. Direct WordPress REST API  https://cms.teonox.com/index.php?rest_route=/wp/v2...
 *      (the same-origin /api/* proxy is NOT used on production — Hostinger's
 *      LiteSpeed does not enable mod_proxy, so /api/* served index.html)
 *   2. Static fallback  PROGRAM_DETAILS_MAP[idOrSlug]
 *
 * Direct CMS fetches require the CMS to send `Access-Control-Allow-Origin`
 * headers; when the browser blocks them, the static fallback keeps the UI up.
 */

/** Direct WordPress REST API base (ACF fields live under `post.acf`). */
const CMS_URL = 'https://cms.teonox.com/index.php?rest_route=/wp/v2';

// ---- Certification card styles ----
// WordPress editors only pick a Certification Type (cert_type) from a dropdown.
// The frontend derives the Tailwind gradient + border color from that type so
// non-technical editors never have to enter raw CSS classes. If an existing
// payload still sends cert_bg_gradient / cert_border_color, they win as overrides.
const CERT_STYLES: Record<string, { gradient: string; border: string }> = {
  teonox: { gradient: 'from-orange-50 to-amber-50', border: '#FED7AA' },
  google: { gradient: 'from-blue-50 to-indigo-50', border: '#BFDBFE' },
  analytics: { gradient: 'from-amber-50 to-orange-50', border: '#FDE68A' },
  semrush: { gradient: 'from-slate-100 to-gray-50', border: '#E2E8F0' },
  hubspot: { gradient: 'from-orange-50 to-amber-50', border: '#FED7AA' },
  meta: { gradient: 'from-rose-50 to-orange-50', border: '#FECDD3' },
  youtube: { gradient: 'from-red-50 to-rose-50', border: '#FECDD3' },
  linkedin: { gradient: 'from-sky-50 to-blue-50', border: '#BAE6FD' },
  other: { gradient: 'from-gray-100 to-slate-100', border: '#E2E8F0' },
  default: { gradient: 'from-gray-50 to-slate-50', border: '#E2E8F0' },
};

// ---- HTML entity decoding helpers (kept local, consistent with blogService) ----
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

// ---- Small type helpers for defensive ACF payload access ----
function str(v: any): string {
  if (typeof v === 'string') return decodeHtmlEntities(v);
  return v ? String(v) : '';
}
function rows(v: any): any[] {
  return Array.isArray(v) ? v : [];
}
function group(v: any): any {
  return v && typeof v === 'object' && !Array.isArray(v) ? v : {};
}

/**
 * ACF fields may be nested under an `acf` object or flattened at the top level
 * of the post, depending on the site's ACF REST settings. Return whichever
 * shape carries the actual field values (top-level fallback mirrors
 * `transformWpProgram` so image resolvers always read the same source).
 */
function postFields(p: any): any {
  const acf = group(p?.acf);
  return Object.keys(acf).length > 0 ? acf : p || {};
}

/**
 * Read a single ACF field value from a raw WP REST post, in priority order:
 *  1. `post.acf.<name>`      (ACF "show in REST" nested object — the norm)
 *  2. `post.<name>`          (ACF flattened at the top level of the post)
 *  3. `post.meta.<name>`     (registered meta key, flat object)
 * Returns the raw value, or null when the field is absent.
 */
function acfField(p: any, name: string): any {
  const candidates = [
    group(p?.acf)[name],
    p?.[name],
    group(p?.meta)[name],
  ];
  return candidates.find((v) => v != null) ?? null;
}

/**
 * Extract a usable image URL from an ACF image field, which can arrive in
 * multiple shapes depending on the field's `return_format`:
 *   - "array"    -> { url, source_url, sizes: {...}, ... }
 *   - "url"      -> "https://.../image.webp"
 *   - "id"       -> 145 (attachment ID; NOT resolvable without a separate
 *                      /wp/v2/media fetch, which is forbidden — such fields
 *                      resolve to '' and callers use embedded/static images)
 * Also accepts a full image object from the WP media API (`{ source_url }`).
 * Returns '' for every non-URL shape so callers fall through to the next image
 * source.
 */
function imageUrl(v: any): string {
  if (!v) return '';
  if (typeof v === 'string') {
    const trimmed = v.trim();
    // A numeric string is an attachment ID, never a URL. Let the resolver turn
    // it into a real media URL instead of rendering a broken `src="123"`.
    if (/^\d+$/.test(trimmed)) return '';
    return trimmed;
  }
  if (typeof v === 'number') return '';
  if (Array.isArray(v)) return imageUrl(v[0]);
  if (typeof v === 'object') {
    const top =
      v.url || v.source_url || v.full_url || v.guid?.rendered || '';
    if (top) return top;
    // Last resort: prefer the largest (full/medium_large) size registered by ACF.
    const sizes = group(v.sizes);
    return (
      sizes.full ||
      sizes['1536x1536'] ||
      sizes.large ||
      sizes.medium_large ||
      sizes.medium ||
      sizes.thumbnail ||
      ''
    );
  }
  return '';
}

/** Generic card image shown only when a WP post exposes no usable image at all. */
const DEFAULT_CARD_IMAGE = dmAiImg;

/**
 * Resolve a program card's image URL WITHOUT any additional /wp/v2/media fetch.
 * WordPress 401s individual media requests (attachment 400 is protected on the
 * CMS), so the URL is read synchronously from data already in the post payload:
 *
 *   1. `_embedded['wp:featuredmedia']` (already included via `&_embed`)
 *   2. ACF image fields that store a URL string or `{ url }` object
 *      (numeric attachment IDs are not resolvable without a media fetch)
 *   3. `DEFAULT_CARD_IMAGE` — only when the post has no usable image data
 */
function getProgramImage(post: any): string {
  if (!post || typeof post !== 'object') return DEFAULT_CARD_IMAGE;

  // 1. Featured media embedded via &_embed (source_url or the large size).
  const embeddedMedia = post._embedded?.['wp:featuredmedia']?.[0];
  const featuredUrl =
    embeddedMedia?.source_url ||
    embeddedMedia?.media_details?.sizes?.large?.source_url ||
    '';
  if (featuredUrl) return featuredUrl;

  // 2. ACF image field(s) — URL/array return formats only (never numeric IDs).
  for (const name of ['card_image', 'program_image', 'hero_image', 'program_hero_image']) {
    const url = imageUrl(acfField(post, name));
    if (url) return url;
  }

  // 3. Static fallback ONLY if the post has no image set.
  return DEFAULT_CARD_IMAGE;
}

/**
 * Parse a fetch Response as JSON, but ONLY when it is actually JSON. When the
 * CMS answers with HTML (e.g. a redirect or a stale LiteSpeed error page),
 * `res.json()` would throw. Returns null for HTML / 404 / network failure so
 * callers can cleanly fall through to the static fallback.
 */
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

// ACF V2 benefits tab groups (students / business / corporate) share the same
// sub-field shape, just with a different name prefix.
function mapBenefitGroup(g: any, prefix: string) {
  const root = group(g);
  return {
    title: str(root[`${prefix}_title`]),
    intro: str(root[`${prefix}_benefit_intro_text`] || root[`${prefix}_intro`]),
    heading: str(root[`${prefix}_benefit_lead_in_bold`] || root[`${prefix}_heading`]),
    bullets: rows(root[`${prefix}_benefit_points`] || root[`${prefix}_bullets`]).map((r: any) =>
      str(r.bullet || r.benefit_point),
    ),
  };
}

// Opportunity groups (internships / freelancing) share the same shape.
function mapOpportunityGroup(g: any, prefix: string) {
  const root = group(g);
  return {
    title: str(root[`${prefix}_title`]),
    intro: str(root[`${prefix}_intro`]),
    leadInBold: str(root[`${prefix}_lead_in_bold`]),
    note: str(root[`${prefix}_note`]),
    items: rows(root[`${prefix}_items`] || root[`${prefix}_list`]).map((r: any) => ({
      title: str(r.item_title),
      iconName: str(r.item_icon_name),
    })),
  };
}

/**
 * Recursively strip the leading "[V2] " data-entry marker from every string so
 * live CMS content renders with clean production-style copy. Used by the
 * production detail page (preview scaffold previously did this internally).
 */
export function stripV2Prefixes<T>(value: T): T {
  if (typeof value === 'string') {
    return (value.startsWith('[V2] ') ? value.slice(5) : value) as T;
  }
  if (Array.isArray(value)) {
    return value.map(stripV2Prefixes) as T;
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(value)) {
      out[key] = stripV2Prefixes((value as Record<string, unknown>)[key]);
    }
    return out as T;
  }
  return value;
}

/**
 * Convert a raw WordPress post (with ACF V2 fields) into ProgramDetailData.
 * Returns null when the payload carries no program-specific content.
 */
export function transformWpProgram(p: any): ProgramDetailData | null {
  if (!p || typeof p !== 'object') return null;

  // Strict V2 ACF guard: legacy V1 posts carry no V2 fields and must never be
  // rendered as live program content on this site.
  if (!isV2Program(p)) return null;

  // ACF fields may live at the top level or under an `acf` object.
  const fields = postFields(p);

  const title = str(fields.program_title || p.title?.rendered);
  const featured = p._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const heroImg =
    imageUrl(fields.hero_image || fields.program_hero_image || p.hero_image) ||
    featured ||
    '';

  // "THIS COURSE IS DESIGNED FOR" section image — strictly dynamic from the
  // ACF `designed_for_image` field (URL/object only). Numeric attachment IDs
  // are not resolvable client-side (media fetches 401), so they stay empty.
  const designedForImg = imageUrl(fields.designed_for_image);

  // Bottom CTA banner fields — strictly dynamic from ACF. Numeric image IDs are
  // not resolvable client-side (media fetches 401), so they stay empty.
  const ctaImage = imageUrl(fields.cta_image);

  // Exit early if the post doesn't expose ACF program fields at all.
  if (!title && !fields.program_badge && !fields.overview) return null;

  const benefitRoot = group(fields.benefits);

  const detail: ProgramDetailData = {
    id: str(p.slug || p.id),
    programTitle: title,
    badge: str(fields.program_badge) || 'PROGRAM',
    subHeading: str(fields.program_subheading),
    duration: str(fields.program_duration),
    mode: str(fields.program_mode),
    heroIntro: str(fields.hero_intro),
    heroImage: heroImg,
    designedForImage: designedForImg || undefined,
    designedForIntro: str(fields.designed_for_intro) || undefined,
    overview: (() => {
      const o = group(fields.overview);
      return {
        highlight: str(o.overview_highlight),
        main: str(o.overview_main),
        expanded: rows(o.overview_expanded).map((r: any) => str(r.overview_expanded_paragraph)),
      };
    })(),
    designedFor: rows(fields.designed_for).map((r: any) => ({
      title: str(r.designed_for_title),
      icon: undefined,
      text: str(r.designed_for_text),
    })),
    keyReasons: rows(fields.key_reasons).map((r: any) => ({
      title: str(r.reason_title_bold),
      text: str(r.reason_text),
    })),
    keyReasonsFootnote: str(fields.key_reasons_footnote) || undefined,
    benefits: {
      students: mapBenefitGroup(benefitRoot.benefits_students, 'benefits_students'),
      business: mapBenefitGroup(benefitRoot.benefits_business, 'benefits_business'),
      corporate: mapBenefitGroup(benefitRoot.benefits_corporate, 'benefits_corporate'),
    },
    prerequisites: (() => {
      const o = group(fields.prerequisites);
      return {
        intro: str(o.prerequisites_intro),
        bullets: rows(o.prerequisites_bullets).map((r: any) => str(r.bullet)),
        note: str(o.prerequisites_note),
      };
    })(),
    outcomes: (() => {
      const o = group(fields.outcomes);
      return {
        intro: str(o.outcome_intro_text) || str(o.outcomes_intro) || undefined,
        leadInBold: str(o.outcome_lead_in_bold) || str(o.outcomes_lead_in_bold) || undefined,
        bullets: rows(o.outcome_bullets || o.outcomes_bullets).map((r: any) => str(r.bullet || r.outcome_bullet)),
        projectsNote: str(o.outcomes_projects_note),
      };
    })(),
    valueSequence: rows(fields.value_sequence).map((r: any) => str(r.step)),
    valueProposition: str(fields.value_bold_paragraph_1) || str(fields.value_proposition) || undefined,
    valueBodyParagraph: str(fields.value_body_paragraph) || undefined,
    valueBoldParagraph2: str(fields.value_bold_paragraph_2) || undefined,
    valueGreyParagraph: str(fields.value_grey_paragraph) || undefined,
    valueHighlightOrangeBold: str(fields.value_highlight_orange_bold) || undefined,
    certifications: rows(fields.certifications).map((r: any) => {
      const type = (str(r.cert_type) || 'other') as string;
      const style = CERT_STYLES[type] || CERT_STYLES.default;
      return {
        title: str(r.cert_title),
        badge: str(r.cert_badge),
        bgGradient: str(r.cert_bg_gradient) || style.gradient,
        borderColor: str(r.cert_border_color) || style.border,
        type: type as ProgramDetailData['certifications'][number]['type'],
      };
    }),
    certificationsIntro: str(fields.certifications_intro) || undefined,
    certificationsPathwaysLeadIn: str(fields.certifications_pathways_lead_in) || undefined,
    certificationsImportantTitle: str(fields.certifications_important_title) || undefined,
    certificationsImportantText: str(fields.certifications_important_text) || undefined,
    placementAssistance: (() => {
      const o = group(fields.placement_assistance);
      return {
        intro: str(o.placement_assistance_intro),
        bullets: rows(o.placement_assistance_bullets).map((r: any) => str(r.bullet)),
        careerPaths: rows(o.placement_assistance_career_paths).map((r: any) => str(r.career_path)),
      };
    })(),
    opportunities: {
      internships: mapOpportunityGroup(
        group(fields.opportunities).opportunities_internships,
        'opportunities_internships',
      ),
      freelancing: mapOpportunityGroup(
        group(fields.opportunities).opportunities_freelancing,
        'opportunities_freelancing',
      ),
    },
    faqs: rows(fields.faqs).map((r: any) => ({
      q: str(r.faq_question),
      a: str(r.faq_answer),
    })),
    cta: {
      title: str(fields.cta_title) || undefined,
      description: str(fields.cta_description) || undefined,
      image: ctaImage || undefined,
      primaryButtonText: str(fields.cta_primary_button_text) || undefined,
      primaryButtonUrl: str(fields.cta_primary_button_url) || undefined,
      secondaryButtonText: str(fields.cta_secondary_button_text) || undefined,
      secondaryButtonUrl: str(fields.cta_secondary_button_url) || undefined,
      brandTagline: str(fields.cta_brand_tagline) || undefined,
    },
  };

  return detail;
}

/**
 * Resolve the authoritative image URLs for a raw WP post and, when a resolved
 * URL is found, override it on an already-transformed detail. Image extraction
 * is purely synchronous — only URL/object ACF shapes and the embedded featured
 * media URL are read (NO separate /wp/v2/media fetches, which WordPress 401s).
 * Numeric attachment IDs yield '' and the existing detail value is kept.
 */
function applyResolvedHeroImage(post: any, detail: ProgramDetailData): ProgramDetailData {
  const fields = postFields(post);
  const featured = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
  let next: ProgramDetailData = detail;

  const rawHero = fields.hero_image || fields.program_hero_image || post.hero_image;
  const resolvedHero = imageUrl(rawHero) || featured;
  if (resolvedHero && resolvedHero !== detail.heroImage) {
    next = { ...next, heroImage: resolvedHero };
  }

  // The designed-for section image has no featured-media fallback: strictly the
  // ACF field, and only applied when it carries a usable URL.
  const rawDesigned = fields.designed_for_image;
  if (rawDesigned) {
    const resolvedDesigned = imageUrl(rawDesigned);
    if (resolvedDesigned && resolvedDesigned !== detail.designedForImage) {
      next = { ...next, designedForImage: resolvedDesigned };
    }
  }

  // Bottom CTA banner image has no featured-media fallback: strictly the ACF
  // field (URL/object only). Falls back to `undefined` (component then shows
  // its default counsellor image).
  const rawCta = fields.cta_image;
  if (rawCta) {
    const resolvedCta = imageUrl(rawCta);
    if (resolvedCta && resolvedCta !== detail.cta?.image) {
      next = { ...next, cta: { ...(next.cta || {}), image: resolvedCta } };
    }
  }

  return next;
}

// ---- Dynamic program list cache ----
// Stores the raw WP post array from a single fetchAllProgramPosts() call so
// multiple fetchLiveProgramDetail() invocations share one network round-trip.
let _allProgramsCache: any[] | null = null;
let _allProgramsCachePromise: Promise<any[]> | null = null;

/**
 * Fetch ALL published V2 program posts from the WP REST API, caching the
 * result in-module so subsequent calls reuse the same network round-trip.
 * Returns the raw WP post objects (not mapped cards — callers need the full
 * payload for slug matching and transformWpProgram).
 */
async function fetchAllProgramPosts(): Promise<any[]> {
  if (_allProgramsCache) return _allProgramsCache;
  if (_allProgramsCachePromise) return _allProgramsCachePromise;

  _allProgramsCachePromise = (async () => {
    try {
      const url = `${CMS_URL}/program&_embed&per_page=50&orderby=date&order=desc&_cb=${Date.now()}`;
      const res = await fetch(url);
      if (!res.ok) return [];
      const raw = await safeJson(res);
      const posts = Array.isArray(raw) ? raw : [];
      // Only keep V2 programs (same guard as fetchLivePrograms).
      const v2Posts = posts.filter((p: any) => isV2Program(p) && isProgramVisible(p));
      _allProgramsCache = v2Posts;
      return v2Posts;
    } catch {
      return [];
    }
  })();

  return _allProgramsCachePromise;
}

/**
 * Permanent WordPress Post IDs for each program. These never change even if
 * slugs/permalinks are updated by the SEO team. Kept as a secondary fallback
 * for slugs that predate the dynamic discovery mechanism.
 *
 * Live Post IDs confirmed from CMS API (https://cms.teonox.com/wp-json/wp/v2/program):
 *   410 = Business Digital Marketing With AI
 *   458 = Specialization in Performance Marketing
 *   460 = Specialization in Search Engine Optimization
 *   461 = Specialization in Social Media Marketing
 */
export const PROGRAM_POST_IDS: Record<string, number> = {
  'business-digital-marketing-ai': 410,
  'business-digital-marketing-with-ai': 410,
  'performance-marketing': 458,
  'specialization-in-performance-marketing': 458,
  'seo-specialization': 460,
  'specialization-in-search-engine-optimization': 460,
  'social-media-marketing': 461,
  'specialization-in-social-media-marketing': 461,
};

/**
 * Reverse mapping: WP Post ID (as string) -> static program ID. Used by the
 * router and ProgramDetailPage to resolve a WordPress Post ID extracted from
 * the browser URL or API response back to the static program ID that
 * PROGRAMS_DATA and PROGRAM_DETAILS_MAP expect.
 */
export const POST_ID_TO_STATIC: Record<string, string> = Object.fromEntries(
  Object.entries(PROGRAM_POST_IDS).map(([staticId, wpId]) => [String(wpId), staticId]),
);

/**
 * URL slug aliases: WordPress slugs that differ from the static program ID.
 * When a user navigates via a WordPress slug (e.g. from a card link), this map
 * resolves it back to the canonical static ID used by PROGRAMS_DATA and
 * PROGRAM_DETAILS_MAP.
 */
const SLUG_ALIASES: Record<string, string> = {
  'business-digital-marketing-with-ai': 'business-digital-marketing-ai',
  'specialization-in-performance-marketing': 'performance-marketing',
  'specialization-in-search-engine-optimization': 'seo-specialization',
  'specialization-in-social-media-marketing': 'social-media-marketing',
};

/**
 * Resolve any raw identifier (URL slug, WP Post ID, or static program ID)
 * back to the canonical static program ID used by PROGRAMS_DATA and
 * PROGRAM_DETAILS_MAP.
 */
export function resolveStaticProgramId(rawId: string): string {
  return SLUG_ALIASES[rawId] || POST_ID_TO_STATIC[rawId] || rawId;
}

/**
 * Fetch a single program's detail content using a 3-tier strategy:
 *   1. Dynamic slug match against all published WP posts (auto-discovers new programs)
 *   2. Hardcoded WP Post ID lookup (legacy fallback for pre-existing programs)
 *   3. Static PROGRAM_DETAILS_MAP (offline / unpublished content)
 *
 * Returns `notFound: true` when the CMS is reachable but the slug does not
 * match any published post — signals ProgramDetailPage to render a 404.
 */
export async function fetchLiveProgramDetail(
  idOrSlug: string,
): Promise<{ detail: ProgramDetailData | null; isLive: boolean; notFound: boolean }> {
  const key = idOrSlug || '';
  if (!key) return { detail: null, isLive: false, notFound: true };

  // --- Tier 1: Dynamic discovery via cached full-program fetch ---
  try {
    const allPosts = await fetchAllProgramPosts();
    // CMS is online (we got a response) — search the list by slug.
    const match = allPosts.find((p: any) => p.slug === key);
    if (match) {
      const transformed = transformWpProgram(match);
      if (transformed) {
        const detail = applyResolvedHeroImage(match, transformed);
        return { detail, isLive: true, notFound: false };
      }
    }
    // CMS responded with a valid array but no slug match → true 404.
    if (allPosts.length > 0 && !match) {
      console.warn(`[fetchLiveProgramDetail] Slug "${key}" not found in ${allPosts.length} published programs — returning 404`);
      return { detail: null, isLive: true, notFound: true };
    }
  } catch (e) {
    console.warn('[fetchLiveProgramDetail] Dynamic discovery failed for:', key, e);
  }

  // --- Tier 2: Hardcoded WP Post ID fallback (legacy pre-existing programs) ---
  const wpPostId = PROGRAM_POST_IDS[key];
  if (wpPostId) {
    try {
      const url = `${CMS_URL}/program/${wpPostId}&_embed&_cb=${Date.now()}`;
      const res = await fetch(url);
      if (res.ok) {
        const raw = await safeJson(res);
        if (raw && isProgramVisible(raw)) {
          const transformed = transformWpProgram(raw);
          if (transformed) {
            const detail = applyResolvedHeroImage(raw, transformed);
            return { detail, isLive: true, notFound: false };
          }
        }
      }
    } catch (e) {
      console.warn('[fetchLiveProgramDetail] ID fetch failed for Post ID:', wpPostId, e);
    }
  }

  // --- Tier 3: Static fallback (CMS unreachable or program unpublished) ---
  const staticResult = PROGRAM_DETAILS_MAP[key] || null;
  if (staticResult) {
    return { detail: staticResult, isLive: false, notFound: false };
  }

  // Nothing found anywhere — CMS offline (no dynamic data) + no static entry.
  // Return notFound so ProgramDetailPage can render the 404 page.
  console.warn(`[fetchLiveProgramDetail] No content found for "${key}" — returning 404`);
  return { detail: null, isLive: false, notFound: true };
}

/**
 * Convert a raw WordPress post (with ACF V2 "Card Information" fields) into a
 * LiveProgramCard for the /programs listing page. Card-specific ACF fields win;
 * detail-tab / post fields are used as fallbacks so cards render fully even
 * before the new card fields are populated on the CMS.
 */
export function mapWpProgramCard(p: any, resolvedImage?: string): LiveProgramCard | null {
  if (!p || typeof p !== 'object') return null;

  // Strict V2 ACF guard: legacy V1 posts must never become cards here.
  if (!isV2Program(p)) return null;

  const fields = postFields(p);
  // Title: post.acf.program_title, falling back to the post's own WP title.
  const title = str(acfField(p, 'program_title') || p.title?.rendered);
  if (!title) return null;

  const featured = p._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const img = resolvedImage || imageUrl(fields.hero_image || p.hero_image) || featured || '';

  // Assigned `program-category` terms, read from BOTH the embedded term objects
  // (WP REST `_embed`) and the post's direct `program-category` term-ID array.
  const wpTerms: any[] = (p._embedded?.['wp:term'] || []).flat();
  const programCategoryTerms = wpTerms.filter(
    (t: any) => termTaxonomySlug(t) === 'program-category',
  );
  const categorySlugs: string[] = [
    ...new Set(programCategoryTerms.map((t: any) => str(t.slug)).filter(Boolean)),
  ];
  const directTermIds: any[] = Array.isArray(p['program-category'])
    ? p['program-category']
    : [];
  const categoryIds: string[] = [
    ...new Set(
      [...directTermIds, ...programCategoryTerms.map((t: any) => t.id)]
        .map((id: any) => String(id))
        .filter(Boolean),
    ),
  ];

  const programCategories = programCategoryTerms
    .map((t: any) => decodeHtmlEntities(t.name))
    .filter(Boolean);

  const mapped = new Set<string>([POPULAR_CATEGORY]);
  for (const name of programCategories) {
    const slug = name.toString().toLowerCase().replace(/\s+/g, '-');
    const curated = PROGRAM_TERM_TO_CATEGORY[slug] || PROGRAM_TERM_TO_CATEGORY[name.toString().toLowerCase()];
    if (curated) mapped.add(curated);
  }

  // No WP term mapped to a curated tab yet (e.g. posts created before the
  // taxonomy was filled in)? Derive a tab from the slug + title keywords so
  // the card still appears under the right category, not only "Popular".
  if (mapped.size === 1) {
    const haystack = `${str(p.slug)} ${title}`.toLowerCase();
    for (const { test, id } of CATEGORY_KEYWORDS) {
      if (test.test(haystack)) mapped.add(id);
    }
  }

  // Pure ACF mapping: card content is taken 1:1 from the WordPress ACF fields
  // (post.acf.card_duration / card_certifications / card_designed_for). No
  // hardcoded defaults or static string overrides — an empty field stays empty
  // so the CMS is the single source of truth.
  const cardDuration = str(acfField(p, 'card_duration'));
  const cardCertifications = str(acfField(p, 'card_certifications'));
  const cardDesignedFor = str(acfField(p, 'card_designed_for'));

  return {
    id: str(p.slug || p.id),
    title,
    brandBadge: str(fields.program_badge),
    description:
      str(fields.program_subheading) ||
      stripHtml(p.excerpt?.rendered || p.content?.rendered || '').slice(0, 160),
    durationText: cardDuration,
    certText: cardCertifications,
    targetText: cardDesignedFor,
    mode: str(fields.program_mode) || 'On Campus, Pune',
    image: img,
    brochureUrl: str(fields.card_brochure_url),
    categoryId: mapped.has('popular') && mapped.size > 1
      ? Array.from(mapped).find((c) => c !== POPULAR_CATEGORY) || POPULAR_CATEGORY
      : POPULAR_CATEGORY,
    categorySlugs,
    categoryIds,
    categories: Array.from(mapped),
  };
}

/**
 * Strict V2 ACF guard (isolates the new site from legacy V1 content).
 *
 * A program post may ONLY appear on this new build when it carries real
 * content in the new "Program Fields V2" group. Legacy V1 posts use a
 * completely different ACF shape (program_name, duration, best_for, category,
 * hero_heading, who_this_program_is_for_label, ...) and belong exclusively to
 * teonox.com — they are never fetched or rendered here.
 *
 * The distinguishing V2-only field names are listed below. Any post that has
 * a non-empty value in one of them qualifies; legacy V1 posts expose none of
 * them and are therefore filtered out in every environment (dev, staging and
 * production alike) so broken V1 cards/routes can never reach the UI.
 */
const V2_PROGRAM_FIELDS = [
  'program_title',
  'program_badge',
  'program_subheading',
  'program_duration',
  'program_mode',
  'card_duration',
  'card_certifications',
  'card_designed_for',
  'card_brochure_url',
  'hero_intro',
  'designed_for',
  'designed_for_image',
  'designed_for_intro',
  'key_reasons',
  'value_sequence',
  'value_proposition',
  'value_bold_paragraph_1',
  'value_body_paragraph',
  'value_bold_paragraph_2',
  'value_grey_paragraph',
  'value_highlight_orange_bold',
  'certifications_intro',
  'certifications_pathways_lead_in',
  'certifications_important_title',
  'certifications_important_text',
  'faqs',
];

/** True when a raw WP post carries any non-empty V2-only ACF field. */
function isV2Program(p: any): boolean {
  if (!p || typeof p !== 'object') return false;
  // Read via `postFields` (same source as transformWpProgram / mapWpProgramCard)
  // so the check holds whether ACF REST serves fields nested under `acf` or
  // flattened at the top level of the post.
  const fields = postFields(p);
  return V2_PROGRAM_FIELDS.some((name) => {
    const v = fields[name];
    if (v == null) return false;
    if (typeof v === 'string') return v.trim().length > 0;
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'number') return v > 0;
    if (typeof v === 'object') return Object.keys(v).length > 0;
    return false;
  });
}

/**
 * Detect whether the app is running in a staging/preview context. Staging-only
 * programs are hidden on the live production site (teonox.com) but shown in
 * every other context so editors can preview unreleased V2 programs freely.
 */
export function isStagingEnv(): boolean {
  if (typeof window !== 'undefined' && window.location?.hostname) {
    const host = window.location.hostname.toLowerCase();
    if (host.includes('hostingersite.com') || host === 'localhost' || host.startsWith('127.')) {
      return true;
    }
  }
  return (
    typeof import.meta !== 'undefined' &&
    import.meta.env?.VITE_IS_STAGING === 'true'
  );
}

/** True when a program is flagged staging-only via its ACF field. */
export function isStagingOnlyProgram(post: any): boolean {
  if (!post || typeof post !== 'object') return false;

  // ACF flag: `staging_only` / `is_staging_only` set to any truthy value
  // (ACF true_false delivers 1 / "1" / true depending on the transport).
  const fields = postFields(post);
  for (const name of ['staging_only', 'is_staging_only']) {
    const v = fields[name];
    if (v === true || v === 1 || v === '1' || v === 'true' || v === 'yes') {
      return true;
    }
  }

  // NOTE: a slug ending in `-v2` is NOT treated as staging-only. The flagship
  // program's live slug is `business-digital-marketing-with-ai-v2`, so slug
  // heuristics must never hide it on production.
  return false;
}

/**
 * True when a raw post should be visible in the current environment: staging
 * always shows everything; production hides staging-only programs.
 */
function isProgramVisible(post: any): boolean {
  return isStagingEnv() || !isStagingOnlyProgram(post);
}

/**
 * Bundled banner images for the static program cards, keyed by the static
 * program ids in PROGRAMS_DATA. A default is provided so unknown ids never
 * render a blank card banner.
 */
const FALLBACK_CARD_IMAGES: Record<string, string> = {
  'business-digital-marketing-ai': dmAiImg,
  'seo-specialization': seoImg,
  'social-media-marketing': socialImg,
  'performance-marketing': perfImg,
  default: dmAiImg,
};

/**
 * Static fallback cards used when the WordPress CMS is unreachable (e.g. a CORS
 * block on cms.teonox.com). Derived from the bundled PROGRAMS_DATA so the
 * /programs listing and the home page section never collapse into the "Programs
 * coming soon" state just because the live API could not be reached.
 */
const FALLBACK_PROGRAM_CARDS: LiveProgramCard[] = PROGRAMS_DATA.programs.map((p) => {
  const mapped = new Set<string>([POPULAR_CATEGORY]);
  const haystack = `${p.id} ${p.title}`.toLowerCase();
  for (const { test, id } of CATEGORY_KEYWORDS) {
    if (test.test(haystack)) mapped.add(id);
  }
  const categories = Array.from(mapped);
  return {
    id: p.id,
    title: p.title,
    brandBadge: 'PROGRAM',
    description: p.description,
    durationText: p.durationText || p.duration || 'Custom Duration',
    certText: p.certText || 'Official Certification',
    targetText:
      p.targetText || (p.eligibility ? `Designed for ${p.eligibility}` : ''),
    mode: p.mode || 'On Campus, Pune',
    categoryId:
      categories.find((c) => c !== POPULAR_CATEGORY) || POPULAR_CATEGORY,
    categorySlugs: categories,
    categoryIds: [],
    categories,
    brochureUrl: '',
    // Bundled local banners (no CMS/CORS dependency) so fallback cards never
    // render with a blank image.
    image:
      FALLBACK_CARD_IMAGES[p.id] || FALLBACK_CARD_IMAGES.default,
  };
});

/**
 * Fetch the full program listing from WordPress and normalise each post into a
 * LiveProgramCard. Falls back to FALLBACK_PROGRAM_CARDS (isLive: false) when
 * the CMS is unreachable, so programs never disappear from the UI.
 *
 * Every published V2 program returned by the WordPress REST API is rendered —
 * no hardcoded ordering or exclusion of specific programs. Card order is the
 * API order (`orderby=date&order=desc`, newest first) — never sorted client-side.
 */
export async function fetchLivePrograms(): Promise<{ programs: LiveProgramCard[]; isLive: boolean }> {
  const fromPosts = (posts: any[]): LiveProgramCard[] => {
    // Strict V2-only guard applied in EVERY environment (dev, staging, prod):
    // legacy V1 posts never become cards on this site. Staging-only programs
    // (ACF staging_only flag) are additionally hidden here so unreleased V2
    // bets never surface on the live production site.
    const eligible = posts.filter((p) => isV2Program(p) && isProgramVisible(p));
    const cards: LiveProgramCard[] = [];
    for (const post of eligible) {
      // Image extracted synchronously from embedded featured media / ACF fields
      // (NO /wp/v2/media fetch — those 401 on the CMS).
      const card = mapWpProgramCard(post, getProgramImage(post));
      if (card) cards.push(card);
    }
    return cards;
  };

  // Strategy 1: direct WordPress REST API (raw WP array).
  try {
    const res = await fetch(`${CMS_URL}/program&_embed&per_page=50&orderby=date&order=desc&_cb=${Date.now()}`);
    if (!res.ok) {
      // The REST URL itself is breaking (404/500 etc.) — surface it before
      // falling through to the static cards so it is visible in DevTools.
      console.error('[Programs API Failed]: Status', res.status);
    }

    const rawText = await res.text();
    let rawJson: any = null;
    try {
      rawJson = rawText ? JSON.parse(rawText) : null;
    } catch (e) {
      // Not JSON — CMS returned HTML (error page / redirect).
      console.error(
        '[Programs API Failed]: non-JSON response (HTML fallback or error page)',
        rawText.slice(0, 200),
      );
    }

    // Extract the array safely from any common wrapper shape.
    let posts: any[] = [];
    if (Array.isArray(rawJson)) {
      posts = rawJson;
    } else if (Array.isArray(rawJson?.data)) {
      posts = rawJson.data;
    } else if (Array.isArray(rawJson?.posts)) {
      posts = rawJson.posts;
    } else if (Array.isArray(rawJson?.items)) {
      posts = rawJson.items;
    }

    // A valid WP response is any JSON whose top level IS an array or wraps one
    // (raw WP array / { data } / { posts } / { items }). Empty arrays still
    // count as live (drives the "coming soon" state); only HTML/garbage
    // responses fall through to the static cards.
    const isLiveResponse =
      Array.isArray(rawJson) ||
      Array.isArray(rawJson?.data) ||
      Array.isArray(rawJson?.posts) ||
      Array.isArray(rawJson?.items);

    if (isLiveResponse) {
      const programs = fromPosts(posts);
      // Live CMS even when zero V2 programs exist (drives "coming soon").
      // Programs render in the order WordPress returns them.
      return { programs, isLive: true };
    }
  } catch (e) {
    console.warn('Programs list fetch failed, using static fallback', e);
  }

  // Strategy 2: static fallback so programs never disappear when the CMS is
  // unreachable (CORS, DNS, network, proxy down, etc).
  return { programs: FALLBACK_PROGRAM_CARDS, isLive: false };
}

/**
 * Fetch the `program-category` custom taxonomy terms for the /programs page.
 * Categories drive the sidebar/tab UI directly from WordPress data (direct
 * REST fetch — no same-origin proxy on production).
 */
export async function fetchProgramCategories(): Promise<
  { id: number; name: string; slug: string; count: number }[]
> {
  const mapTerms = (data: any[]) =>
    (Array.isArray(data) ? data : []).map((t: any) => ({
      id: Number(t.id),
      name: decodeHtmlEntities(t.name || ''),
      slug: String(t.slug || ''),
      count: Number(t.count || 0),
    }));

  try {
    const res = await fetch(
      `${CMS_URL}/program-category&per_page=100&_cb=${Date.now()}`,
    );
    if (res.ok) {
      const json = await safeJson(res);
      const terms = Array.isArray(json) ? json : json?.data;
      if (Array.isArray(terms) && terms.length > 0) {
        return mapTerms(terms);
      }
    }
  } catch (e) {
    console.warn('Direct program-category fetch failed, returning empty', e);
  }

  return [];
}

/**
 * Fetch aggregate certification data across all published programs for the
 * homepage Certifications showcase. Counts every certification row returned
 * by the WP REST list endpoint (each program's `certifications` ACF repeater),
 * so the total stays in sync whenever new programs or certifications are added
 * in WordPress Admin.
 */
export async function fetchCertificationStats(): Promise<{
  total: number;
  programs: number;
  isLive: boolean;
}> {
  // Never hardcode counts — the numbers always come from the live WP payload so
  // new programs/certifications reflect automatically. Zero + isLive:false means
  // "don't render any figures" when the API is unreachable.
  const fallback = { total: 0, programs: 0, isLive: false };
  try {
    const res = await fetch(
      `${CMS_URL}/program&per_page=100&orderby=date&order=desc&_cb=${Date.now()}`,
    );
    if (!res.ok) return fallback;
    const json = await safeJson(res);
    const posts = Array.isArray(json) ? json : json?.data;
    if (!Array.isArray(posts) || posts.length === 0) return fallback;

    let total = 0;
    for (const p of posts) {
      const rows = p?.acf?.certifications;
      if (Array.isArray(rows)) total += rows.length;
    }
    return { total, programs: posts.length, isLive: true };
  } catch {
    return fallback;
  }
}

/**
 * Fetch lightweight { id, title } program list for the footer SEO program links
 * (IIDE-style keyword block). Falls back to static program data when the API is
 * unreachable so the footer never renders empty.
 */
export async function fetchFooterPrograms(): Promise<{
  programs: { id: string; title: string }[];
  isLive: boolean;
}> {
  const fallback = FALLBACK_PROGRAM_CARDS.map((c) => ({ id: c.id, title: c.title }));
  try {
    const res = await fetch(
      `${CMS_URL}/program&per_page=100&orderby=title&order=asc&_cb=${Date.now()}`,
    );
    if (!res.ok) return { programs: fallback, isLive: false };
    const json = await safeJson(res);
    const posts = Array.isArray(json) ? json : json?.data;
    if (!Array.isArray(posts) || posts.length === 0) {
      return { programs: fallback, isLive: false };
    }
    const programs = posts
      .map((p) => ({
        id: String(p?.slug || p?.id || '').trim(),
        title: String(p?.title?.rendered || p?.slug || '').trim(),
      }))
      .filter((p) => p.id && p.title);
    return { programs: programs.length ? programs : fallback, isLive: true };
  } catch {
    return { programs: fallback, isLive: false };
  }
}