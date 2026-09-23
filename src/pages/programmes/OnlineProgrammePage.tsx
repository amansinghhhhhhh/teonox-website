import React, { useEffect } from 'react';
import { rawHtmlBody } from './rawHtml';
import '../../pages/programmes/online-programme.css';

export function OnlineProgrammePage() {
  useEffect(() => {
    (window as any).openApplyModal = () => {
      const modal = document.querySelector('.teonox-online-apply-modal') || document.querySelector('.apply-modal');
      if (modal) { modal.classList.add('active'); (modal as HTMLElement).style.display = 'flex'; }
    };
    (window as any).closeApplyModal = () => {
      const modal = document.querySelector('.teonox-online-apply-modal') || document.querySelector('.apply-modal');
      if (modal) { modal.classList.remove('active'); (modal as HTMLElement).style.display = 'none'; }
    };
    (window as any).toggleFaq = (element: HTMLElement) => {
      const item = element.closest('.teonox-online-faq-item') || element.parentElement;
      if (item) item.classList.toggle('active');
    };
    const handleWindowClick = (e: MouseEvent) => {
      const modal = document.querySelector('.teonox-online-apply-modal');
      if (modal && e.target === modal) (window as any).closeApplyModal();
    };
    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);

    const links = document.querySelectorAll('.tl-landing-page a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId !== '#') {
          const target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    const applyBtns = document.querySelectorAll('.teonox-online-btn-primary');
    applyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = document.querySelector('.teonox-online-apply-modal');
        if (modal) modal.classList.add('active');
      });
    });

    const closeBtns = document.querySelectorAll('.teonox-online-modal-close');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const modal = document.querySelector('.teonox-online-apply-modal');
        if (modal) modal.classList.remove('active');
      });
    });

    const slider = document.getElementById('teonox-online-trustSlider');
    if (slider) {
      const track = slider.querySelector('.teonox-online-slider-track');
      if (track) {
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;
        track.addEventListener('mousedown', (e: MouseEvent) => {
          isDown = true;
          startX = (e as MouseEvent).pageX - track.offsetLeft;
          scrollLeft = track.scrollLeft;
        });
        track.addEventListener('mouseleave', () => { isDown = false; });
        track.addEventListener('mouseup', () => { isDown = false; });
        track.addEventListener('mousemove', (e: MouseEvent) => {
          if (!isDown) return;
          (e as MouseEvent).preventDefault();
          const x = (e as MouseEvent).pageX - track.offsetLeft;
          track.scrollLeft = scrollLeft - (x - startX) * 2;
        });
      }
    }
  }, []);

  return (
    <div className="tl-landing-page">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <div dangerouslySetInnerHTML={{ __html: rawHtmlBody }} />
    </div>
  );
}
