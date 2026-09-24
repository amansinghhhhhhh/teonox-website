import React, { useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { rawHtmlBody } from './rawHtml';
import '../../index.css';
import '../../pages/programmes/online-programme.css';

function navigateTo(path: string) {
  if (path.startsWith('#')) {
    const el = document.querySelector(path);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.location.href = path;
  }
}

export function OnlineProgrammePage() {
  useEffect(() => {
    // --- Global Window Handlers ---
    (window as any).openApplyModal = () => {
      const modal = document.getElementById('teonox-online-applyModal') || document.querySelector('.teonox-online-apply-modal');
      if (modal) { modal.classList.add('teonox-online-active'); document.body.style.overflow = 'hidden'; }
    };
    (window as any).closeApplyModal = () => {
      const modal = document.getElementById('teonox-online-applyModal') || document.querySelector('.teonox-online-apply-modal');
      if (modal) { modal.classList.remove('teonox-online-active'); document.body.style.overflow = ''; }
    };
    (window as any).toggleFaq = (btn: HTMLElement) => {
      const item = btn.closest('.teonox-online-faq-item');
      if (!item) return;
      const answer = item.querySelector('.teonox-online-faq-answer') as HTMLElement;
      const isActive = item.classList.contains('teonox-online-active');
      document.querySelectorAll('.teonox-online-faq-item').forEach(i => {
        i.classList.remove('teonox-online-active');
        const a = i.querySelector('.teonox-online-faq-answer') as HTMLElement;
        if (a) a.style.maxHeight = null;
      });
      if (!isActive && answer) {
        item.classList.add('teonox-online-active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    };
    (window as any).submitForm = (e: Event) => {
      e.preventDefault();
      alert('Thank you! Your application has been submitted. Our team will contact you soon.');
      (e.target as HTMLFormElement).reset();
    };
    (window as any).playReel = (overlay: HTMLElement) => {
      const card = overlay.closest('.teonox-online-reel-card');
      const video = card?.querySelector('video');
      if (!video) return;
      document.querySelectorAll('.teonox-online-reel-card video').forEach(v => {
        if (v !== video) { v.pause(); v.currentTime = 0; }
      });
      video.muted = false;
      video.play();
      overlay.style.display = 'none';
    };
    (window as any).togglePause = (btn: HTMLElement) => {
      const card = btn.closest('.teonox-online-reel-card');
      const video = card?.querySelector('video');
      const icon = btn.querySelector('i');
      if (!video) return;
      if (video.paused) { video.play(); if (icon) icon.className = 'fas fa-pause'; btn.classList.remove('teonox-online-active'); }
      else { video.pause(); if (icon) icon.className = 'fas fa-play'; btn.classList.add('teonox-online-active'); }
    };
    (window as any).toggleMute = (btn: HTMLElement) => {
      const card = btn.closest('.teonox-online-reel-card');
      const video = card?.querySelector('video');
      const icon = btn.querySelector('i');
      if (!video) return;
      video.muted = !video.muted;
      if (video.muted) { if (icon) icon.className = 'fas fa-volume-xmark'; btn.classList.add('teonox-online-active'); }
      else { if (icon) icon.className = 'fas fa-volume-high'; btn.classList.remove('teonox-online-active'); }
    };
    (window as any).slideScroll = (id: string, dir: number) => {
      const viewport = document.getElementById(id);
      if (!viewport) return;
      stopAutoScroll(id);
      const scrollAmount = viewport.offsetWidth * 0.6;
      const currentOffset = (scrollOffsets as any)[id] || 0;
      applyOffset(id, currentOffset + dir * scrollAmount);
      setTimeout(() => startAutoScroll(id, 0.4), 1000);
    };

    // --- Scroll Reveal (IntersectionObserver) ---
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('teonox-online-visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.teonox-online-reveal').forEach(el => observer.observe(el));

    // --- Smooth Scroll: ONLY intercept # hash links inside .tl-landing-page ---
    document.querySelectorAll('.tl-landing-page a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e: Event) {
        const target = e.target as HTMLElement;
        const href = target.getAttribute('href');
        if (href === '#' || !href || !href.startsWith('#')) return;
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // --- Auto-scroll sliders ---
    const scrollOffsets: Record<string, number> = {};
    const scrollAnimations: Record<string, number> = {};
    function getSliderTrack(id: string) {
      const viewport = document.getElementById(id);
      return viewport?.querySelector('.teonox-online-slider-track');
    }
    function applyOffset(id: string, offset: number) {
      const track = getSliderTrack(id);
      if (!track) return;
      const half = track.scrollWidth / 2;
      if (half > 0) { offset = offset % half; if (offset < 0) offset += half; }
      scrollOffsets[id] = offset;
      track.style.transform = 'translateX(-' + offset + 'px)';
    }
    function startAutoScroll(id: string, speed: number) {
      speed = speed || 0.4;
      const track = getSliderTrack(id);
      if (!track) return;
      stopAutoScroll(id);
      function tick() { applyOffset(id, (scrollOffsets[id] || 0) + speed); scrollAnimations[id] = requestAnimationFrame(tick); }
      scrollAnimations[id] = requestAnimationFrame(tick);
    }
    function stopAutoScroll(id: string) {
      if (scrollAnimations[id]) { cancelAnimationFrame(scrollAnimations[id]); delete scrollAnimations[id]; }
    }
    document.querySelectorAll('.teonox-online-slider-wrap').forEach(wrap => {
      const viewport = wrap.querySelector('.teonox-online-slider-viewport');
      const id = viewport?.id;
      if (!id) return;
      scrollOffsets[id] = 0;
      startAutoScroll(id, 0.4);
      wrap.addEventListener('mouseenter', () => stopAutoScroll(id));
      wrap.addEventListener('mouseleave', () => startAutoScroll(id, 0.4));
    });

    // --- Touch/Swipe support ---
    document.querySelectorAll('.teonox-online-slider-viewport').forEach(viewport => {
      let startX = 0, startOffset = 0, isDragging = false;
      const viewportId = viewport.id;
      function dragStart(x: number) { isDragging = true; stopAutoScroll(viewportId); startX = x; startOffset = scrollOffsets[viewportId] || 0; viewport.style.cursor = 'grabbing'; }
      function dragMove(x: number) { if (!isDragging) return; const walk = (startX - x) * 1.2; applyOffset(viewportId, startOffset + walk); }
      function dragEnd(resumeSpeed: number) { if (!isDragging) return; isDragging = false; viewport.style.cursor = 'grab'; startAutoScroll(viewportId, resumeSpeed || 0.4); }
      viewport.addEventListener('mousedown', (e) => { dragStart(e.pageX); e.preventDefault(); });
      viewport.addEventListener('mousemove', (e) => { if (!isDragging) return; dragMove(e.pageX); e.preventDefault(); });
      viewport.addEventListener('mouseup', () => dragEnd(1.0));
      viewport.addEventListener('mouseleave', () => dragEnd(0.4));
      viewport.addEventListener('touchstart', (e) => { dragStart(e.touches[0].pageX); });
      viewport.addEventListener('touchmove', (e) => { if (!isDragging) return; dragMove(e.touches[0].pageX); e.preventDefault(); });
      viewport.addEventListener('touchend', () => dragEnd(0.4));
    });

    // --- Reel card hover pause/resume ---
    document.querySelectorAll('.teonox-online-reel-card').forEach(card => {
      const viewport = card.closest('.teonox-online-slider-viewport');
      if (!viewport) return;
      card.addEventListener('mouseenter', () => stopAutoScroll(viewport.id));
      card.addEventListener('mouseleave', () => startAutoScroll(viewport.id, 0.4));
    });

    // --- Modal backdrop click ---
    document.addEventListener('click', (e) => {
      const modal = document.querySelector('.teonox-online-apply-modal');
      if (modal && e.target === modal) (window as any).closeApplyModal();
    });

    // --- Cleanup ---
    return () => {
      document.querySelectorAll('.teonox-online-slider-viewport').forEach(v => {
        v.style.cursor = '';
      });
      Object.keys(scrollAnimations).forEach(k => cancelAnimationFrame(scrollAnimations[k]));
    };
  }, []);

  return (
    <>
      <Navbar onEnquireClick={() => {}} activeSection="programmes" onNavigate={(path, label) => navigateTo(path)} />
      <div className="tl-landing-page">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@400;500;600;700;800&display=swap" as="style" onLoad="this.rel='stylesheet'" />
        <div dangerouslySetInnerHTML={{ __html: rawHtmlBody }} />
      </div>
      <Footer />
    </>
  );
}
