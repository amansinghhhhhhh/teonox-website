/**
 * youtubeService — pulls the latest @teonoxofficial YouTube Shorts for the
 * "Moments That Define Us" section (MomentsSection).
 *
 * Flow (3 quota units per cold fetch; free tier = 10,000 units/day):
 *   1. channels.list?forHandle=...        → resolve the channel's uploads playlist
 *   2. playlistItems.list (maxResults=25) → recent upload video IDs
 *   3. videos.list (snippet, contentDetails) → filter to Shorts (duration ≤ 3 min)
 *
 * Results are cached in sessionStorage (~30 min TTL) so repeat page views cost
 * zero quota. Any failure — missing key, quota exhaustion, network error —
 * returns { shorts: [], isLive: false } so callers can fall back to the static
 * card list without breaking the layout.
 */

export interface MomentVideo {
  id: string;
  title: string;
  /** Embeddable player URL (append ?autoplay=1 when rendering an iframe). */
  videoUrl: string;
  thumbnail: string;
}

const API_KEY = import.meta.env.VITE_YT_API_KEY;
const CHANNEL_HANDLE = '@teonoxofficial';
const CACHE_KEY = 'teonox_yt_shorts_v1';
const CACHE_TTL_MS = 30 * 60 * 1000;
const SHORTS_MAX_SECONDS = 180;
const MAX_CARDS = 4;

interface CachePayload {
  ts: number;
  shorts: MomentVideo[];
}

function readCache(): MomentVideo[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachePayload;
    if (!parsed || typeof parsed.ts !== 'number' || !Array.isArray(parsed.shorts)) return null;
    if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
    if (parsed.shorts.length === 0) return null;
    return parsed.shorts;
  } catch {
    return null;
  }
}

function writeCache(shorts: MomentVideo[]): void {
  try {
    const payload: CachePayload = { ts: Date.now(), shorts };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    /* storage unavailable/full — caching is best-effort only */
  }
}

/** Parse an ISO-8601 duration (e.g. "PT58S", "PT1M30S") into total seconds.
 *  Unparseable values return Infinity so they are filtered out. */
export function parseIsoDurationSeconds(iso: string): number {
  const m = /^P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?$/.exec(iso || '');
  if (!m) return Number.POSITIVE_INFINITY;
  const days = m[1] ? Number(m[1]) * 86400 : 0;
  const hours = m[2] ? Number(m[2]) * 3600 : 0;
  const minutes = m[3] ? Number(m[3]) * 60 : 0;
  const seconds = m[4] ? Math.round(Number(m[4])) : 0;
  return days + hours + minutes + seconds;
}

async function fetchJson(url: string): Promise<any> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`YouTube API responded ${res.status}`);
  return res.json();
}

export async function fetchLatestShorts(): Promise<{ shorts: MomentVideo[]; isLive: boolean }> {
  if (!API_KEY) return { shorts: [], isLive: false };

  const cached = readCache();
  if (cached) return { shorts: cached, isLive: true };

  try {
    // 1) Resolve uploads playlist for @teonoxofficial
    const channel = await fetchJson(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${encodeURIComponent(
        CHANNEL_HANDLE
      )}&key=${API_KEY}`
    );
    const uploadsPlaylistId =
      channel?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsPlaylistId) throw new Error('uploads playlist not found for handle');

    // 2) Recent upload IDs
    const playlist = await fetchJson(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=25&playlistId=${uploadsPlaylistId}&key=${API_KEY}`
    );
    const videoIds: string[] = (playlist?.items ?? [])
      .map((item: any) => item?.contentDetails?.videoId)
      .filter(Boolean);
    if (videoIds.length === 0) throw new Error('no recent uploads returned');

    // 3) Durations + snippets → keep Shorts only, newest first
    const details = await fetchJson(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoIds.join(
        ','
      )}&key=${API_KEY}`
    );

    const shorts: MomentVideo[] = (details?.items ?? [])
      .filter(
        (v: any) => parseIsoDurationSeconds(v?.contentDetails?.duration ?? '') <= SHORTS_MAX_SECONDS
      )
      .slice(0, MAX_CARDS)
      .map((v: any) => ({
        id: v.id,
        title: v?.snippet?.title || 'TEONOX Short',
        videoUrl: `https://www.youtube.com/embed/${v.id}`,
        thumbnail:
          v?.snippet?.thumbnails?.medium?.url ||
          v?.snippet?.thumbnails?.high?.url ||
          `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
      }));

    if (shorts.length === 0) return { shorts: [], isLive: false };

    writeCache(shorts);
    return { shorts, isLive: true };
  } catch (e) {
    console.warn('YouTube Shorts fetch failed, using static fallback cards', e);
    return { shorts: [], isLive: false };
  }
}
