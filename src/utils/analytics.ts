const GA_ID = 'G-YZ0K65RBRD';

/** Safe gtag() wrapper — no-ops if gtag is not loaded (SSR, build, consent denied). */
export function gtag(...args: unknown[]) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/** Fire a GA4 page_view event on SPA route change. */
export function trackPageView(pathname: string, title?: string) {
  gtag('event', 'page_view', {
    page_path: pathname,
    page_title: title || document.title,
    send_to: GA_ID,
  });
}
