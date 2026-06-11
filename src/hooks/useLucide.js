import { useEffect } from 'react';
export default function useLucide() {
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (typeof lucide !== 'undefined') lucide.createIcons();
      } catch (e) {}
    }, 0);
    return () => clearTimeout(timer);
  });
}