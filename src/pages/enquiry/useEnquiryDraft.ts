// localStorage draft persistence for the /enquiry-form page.
//
// The photo is a File and is not serializable, so it is deliberately excluded
// from the draft — restoring shows a hint instead of silently dropping it.

import { useEffect, useRef } from 'react';
import { DEFAULT_ENQUIRY_VALUES, EnquiryFormData } from './enquiryTypes';

const STORAGE_KEY = 'teonox_enquiry_form_draft';
const DEBOUNCE_MS = 600;

type DraftValues = Omit<EnquiryFormData, 'photo'>;

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/** Returns the saved draft, or null when absent/corrupt. */
export function loadEnquiryDraft(): DraftValues | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isPlainObject(parsed)) return null;

    // Only accept known scalar keys so a schema change can't inject garbage.
    const restored: Record<string, unknown> = {};
    (Object.keys(DEFAULT_ENQUIRY_VALUES) as (keyof EnquiryFormData)[]).forEach((key) => {
      if (key === 'photo') return;
      const fallback = DEFAULT_ENQUIRY_VALUES[key];
      const saved = parsed[key];
      if (typeof fallback === 'boolean' && typeof saved === 'boolean') {
        restored[key] = saved;
      } else if (typeof fallback === 'string' && typeof saved === 'string') {
        restored[key] = saved;
      }
    });

    return restored as DraftValues;
  } catch {
    return null;
  }
}

/** Removes any saved draft (called after a successful submit). */
export function clearEnquiryDraft(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage may be unavailable (private mode / quota) — nothing to clear.
  }
}

/**
 * Debounced autosave of the text/radio fields. The photo is skipped.
 * Returns a function that forces an immediate save (used before unload).
 */
export function useEnquiryDraft(values: EnquiryFormData): () => void {
  const timerRef = useRef<number | null>(null);
  const latestRef = useRef(values);
  latestRef.current = values;

  // Debounced save whenever any non-photo value changes.
  useEffect(() => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      const { photo: _photo, ...rest } = latestRef.current;
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
      } catch {
        // Quota exceeded / private mode — draft saving is best-effort.
      }
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, [values]);

  // Flush any pending draft immediately (e.g. on page hide).
  return () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    const { photo: _photo, ...rest } = latestRef.current;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
    } catch {
      // Best-effort.
    }
  };
}
