export function initMetaPixel(): void {
  if (typeof window === 'undefined') return;
  const w = window as any;
  if (!w.fbq) {
    const fbq = function () {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments as any) : fbq.queue.push(arguments);
    } as any;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    w.fbq = fbq;
    w._fbq = fbq;
  }
  if (!document.getElementById('meta-pixel-script')) {
    const script = document.createElement('script');
    script.id = 'meta-pixel-script';
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }
  w.fbq('init', '2960469077709298');
  w.fbq('track', 'PageView');
}
