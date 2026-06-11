import { useEffect } from 'react';
export default function useTypewriter() {
  useEffect(() => {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const lines = ['Build the Skills','Businesses <em>Actually Hire For</em>.'];
    let li=0, ci=0, d='', t;
    const tick = () => {
      const l = lines[li]; ci++;
      if(ci <= l.length) el.innerHTML = d + l.slice(0, ci);
      if(ci === l.length) { if(li < lines.length-1) { d += l+'<br>'; li++; ci=0; t = setTimeout(tick,400); return; } return; }
      t = setTimeout(tick, 35 + Math.random() * 65);
    };
    t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, []);
}