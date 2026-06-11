import { useEffect } from 'react';
export default function useScrollReveal() {
  useEffect(() => {
    const o = new IntersectionObserver(e => { e.forEach(x => { if(x.isIntersecting) x.target.classList.add('visible') }) }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(el => o.observe(el));
    return () => o.disconnect();
  });
}