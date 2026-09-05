/** Direct WordPress REST API base (ACF fields live under `post.acf`). */
export const CMS_URL = 'https://cms.teonox.com/index.php?rest_route=/wp/v2';

/** Decode common HTML entities from WordPress content. */
export function decodeHtmlEntities(str: string = ''): string {
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

/** Strip HTML tags and decode entities. */
export function stripHtml(html: string = ''): string {
  return decodeHtmlEntities(html.replace(/<[^>]*>/g, '')).trim();
}

/** Parse a fetch Response as JSON, but ONLY when it is actually JSON. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function safeJson(res: Response): Promise<any> {
  if (!res) return null;
  const type = (res.headers.get('content-type') || '').toLowerCase();
  if (type && !type.includes('application/json')) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}
