const GA_ID = 'G-YZ0K65RBRD';

/** Safe gtag() wrapper — no-ops if gtag is not loaded (SSR, build, consent denied). */
export function gtag(...args: unknown[]) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];

  // Delegate to the global gtag() installed in index.html when available.
  // It pushes the real `arguments` object that gtag.js expects; pushing a
  // plain array directly would leave events queued but never transmitted.
  const globalGtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof globalGtag === 'function') {
    globalGtag(...args);
    return;
  }

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
