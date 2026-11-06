/**
 * Batch Schedule data — Business Digital Marketing with AI (Online & Offline)
 * No ACF required. Kept as a clean JSON/array structure.
 */

/** Session mode for a batch slot */
export type SessionMode = 'Online' | 'Offline';

/** A single batch slot: time string or null → renders "—" */
export interface BatchSlot {
  time: string;
  mode: SessionMode | null; // null → empty slot, renders dash
}

/** One row of the schedule per month */
export interface BatchRow {
  month: string;
  morning: BatchSlot;
  afternoon: BatchSlot;
  evening: BatchSlot;
}

/** Title used as the section heading */
export const BATCH_SCHEDULE_TITLE = 'Batch Schedule — Business Digital Marketing with AI (Online & Offline)';

/** Schedule rows for Dec 2026 → Mar 2027 (exact data as specified) */
export const BATCH_SCHEDULE: BatchRow[] = [
  {
    month: 'December 2026',
    morning: { time: '11:00 AM – 1:00 PM', mode: 'Offline' },
    afternoon: { time: '—', mode: null },
    evening: { time: '8:00 PM – 10:00 PM', mode: 'Online' },
  },
  {
    month: 'January 2027',
    morning: { time: '—', mode: null },
    afternoon: { time: '2:00 PM – 4:00 PM', mode: 'Offline' },
    evening: { time: '5:00 PM – 7:00 PM', mode: 'Online' },
  },
  {
    month: 'February 2027',
    morning: { time: '8:00 AM – 10:00 AM', mode: 'Online' },
    afternoon: { time: '12:00 PM – 2:00 PM', mode: 'Offline' },
    evening: { time: '—', mode: null },
  },
  {
    month: 'March 2027',
    morning: { time: '9:00 AM – 11:00 AM', mode: 'Offline' },
    afternoon: { time: '—', mode: null },
    evening: { time: '8:00 PM – 10:00 PM', mode: 'Online' },
  },
];

/**
 * Slugs this schedule applies to (live CMS slugs confirmed):
 *   - business-digital-marketing-with-ai-6-months-online   → Online page
 *   - business-digital-marketing-with-ai                     → Offline flagship
 *   - business-digital-marketing-with-ai-6-months           → Offline legacy slug
 *   - business-digital-marketing-with-ai-v2                  → kept for safety
 */
export const BATCH_SCHEDULE_SLUGS = [
  'business-digital-marketing-with-ai-6-months-online',
  'business-digital-marketing-with-ai',
  'business-digital-marketing-with-ai-6-months',
  'business-digital-marketing-with-ai-v2',
] as const;

/** Normalised slug → true if this schedule should appear */
export function includesBatchSchedule(slug: string): boolean {
  if (!slug) return false;
  const normalised = slug
    .toLowerCase()
    .replace(/\/+$/, '')
    .replace(/-v2$/, ''); // strip trailing -v2 defensively
  return BATCH_SCHEDULE_SLUGS.some((s) => s.toLowerCase() === normalised);
}