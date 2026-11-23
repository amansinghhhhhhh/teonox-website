import { useLayoutEffect } from 'react';

/**
 * Programme pages use Helmet for their client-side <title>/description/og tags
 * while server.ts injects an equivalent set into the initial HTML. React
 * Helmet commits its head changes on the next animation frame, so without this
 * hook both sets briefly coexist (and headless Chrome captures the duplicates).
 *
 * Call this in a layout effect with `active = true` on the same render that
 * mounts the programme <SEO> component. It removes only the server-owned head
 * tags (marked with data-rh by buildMetaTags) before Helmet appends its own.
 * JSON-LD scripts are intentionally untouched.
 */
export function useProgramHeadDedupe(active: boolean): void {
  useLayoutEffect(() => {
    if (!active || typeof document === 'undefined') return;

    document.head
      .querySelectorAll('title[data-rh], meta[data-rh], link[data-rh]')
      .forEach((node) => node.remove());
  }, [active]);
}
