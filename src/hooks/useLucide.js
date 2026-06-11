import { useEffect } from 'react';

export default function useLucide() {
  useEffect(() => {
    let creating = false;

    const create = () => {
      if (creating) return;
      creating = true;
      requestAnimationFrame(() => {
        try { lucide?.createIcons(); } catch {}
        creating = false;
      });
    };

    create();

    const observer = new MutationObserver(() => create());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);
}
