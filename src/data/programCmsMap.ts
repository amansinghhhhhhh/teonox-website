/**
 * Site route slug -> WordPress `program` slug mapping.
 *
 * Most routes use the same slug on both sides. The online programme is the
 * known exception: its marketing route is `...-months-online`, while the
 * matching CMS item is the older `business-digital-marketing-with-ai` post.
 * Unknown slugs intentionally fall through unchanged so a newly published CMS
 * programme is picked up automatically without another code change.
 */
export const PROGRAM_CMS_SLUG_MAP: Record<string, string> = {
  'business-digital-marketing-with-ai-6-months-online': 'business-digital-marketing-with-ai',
  'business-digital-marketing-with-ai-6-months': 'business-digital-marketing-with-ai-6-months',
  'specialisation-in-performance-marketing': 'specialisation-in-performance-marketing',
  'specialisation-in-search-engine-optimisation': 'specialisation-in-search-engine-optimisation',
  'specialisation-in-social-media-marketing': 'specialisation-in-social-media-marketing',
};

/** Normalise a route/CMS slug for lookup. */
export function normalizeProgramSlug(slug: string = ''): string {
  return String(slug)
    .trim()
    .replace(/^\/+/, '')
    .replace(/\/+$/, '');
}

/** Resolve a site route slug to the CMS slug that carries its Rank Math SEO fields. */
export function resolveCmsProgramSlug(routeSlug: string = ''): string {
  const clean = normalizeProgramSlug(routeSlug);
  return PROGRAM_CMS_SLUG_MAP[clean] || clean;
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  ndash: '-',
  mdash: '—',
  lsquo: "'",
  rsquo: "'",
  ldquo: '"',
  rdquo: '"',
};

function codePointToChar(code: number): string {
  try {
    return String.fromCodePoint(code);
  } catch {
    return '';
  }
}

/** Decode HTML entities without double-decoding the surrounding text. */
export function decodeProgramHtmlEntities(value: string = ''): string {
  return String(value || '')
    .replace(/&#x([0-9a-f]+);/gi, (_match, hex: string) => codePointToChar(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_match, decimal: string) => codePointToChar(Number(decimal)))
    .replace(/&([a-z]+);/gi, (match, name: string) => {
      const decoded = NAMED_ENTITIES[name.toLowerCase()];
      return decoded === undefined ? match : decoded;
    });
}

/** Strip markup and decode entities so Rank Math strings render verbatim. */
export function stripProgramHtmlTags(value: string = ''): string {
  return decodeProgramHtmlEntities(String(value || '').replace(/<[^>]*>/g, ''))
    .replace(/\s+/g, ' ')
    .trim();
}

/** Clean a Rank Math title, adding the site suffix only when Rank Math omitted it. */
export function normalizeProgramSeoTitle(title: string = '', siteName = 'TEONOX'): string {
  const clean = stripProgramHtmlTags(title);
  if (!clean) return '';
  return clean.toLowerCase().includes(siteName.toLowerCase()) ? clean : `${clean} | ${siteName}`;
}

/** Clean a Rank Math description. */
export function normalizeProgramSeoDescription(description: string = ''): string {
  return stripProgramHtmlTags(description);
}
