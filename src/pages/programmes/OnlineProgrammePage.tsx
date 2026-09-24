import React, { useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { submitForm as submitLeadForm } from '../../services/formService';
import { validateEmail, validatePhone, validateRequired } from '../../utils/validation';
import { rawHtmlBody } from './rawHtml';
import '../../index.css';
import '../../pages/programmes/online-programme.css';

function navigateTo(path: string) {
  if (path.startsWith('#')) {
    const el = document.querySelector(path);
    if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth' });
  } else {
    window.location.href = path;
  }
}

function getField(form: HTMLFormElement, selector: string): string {
  const el = form.querySelector(selector) as HTMLInputElement | HTMLSelectElement | null;
  return el?.value?.trim() || '';
}

function injectError(form: HTMLFormElement, message: string, selector?: string): void {
  const existing = form.querySelector('.teonox-online-form-error');
  if (existing) existing.remove();
  const div = document.createElement('div');
  div.className = 'teonox-online-form-error';
  div.style.cssText = 'color:#e74c3c;font-size:13px;margin-bottom:8px;font-family:Inter,sans-serif;';
  div.textContent = message;
  const btn = form.querySelector('button[type="submit"]');
  if (btn) {
    btn.parentNode?.insertBefore(div, btn);
  } else {
    form.appendChild(div);
  }
  if (selector) {
    const el = form.querySelector(selector) as HTMLElement | null;
    if (el) el.focus();
  }
}

function removeError(form: HTMLFormElement): void {
  const existing = form.querySelector('.teonox-online-form-error');
  if (existing) existing.remove();
}

function showSubmitting(form: HTMLFormElement): void {
  const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
  if (btn) {
    btn.disabled = true;
    btn.dataset.originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting…';
    btn.style.opacity = '0.7';
    btn.style.pointerEvents = 'none';
  }
}

function resetSubmit(form: HTMLFormElement, success: boolean): void {
  const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = btn.dataset.originalText || '<i class="fas fa-paper-plane"></i> Submit Application';
    btn.style.opacity = '1';
    btn.style.pointerEvents = '';
  }
}

function showSuccessMessage(form: HTMLFormElement): void {
  const formContainer = form.closest('.teonox-online-apply-modal-form');
  if (!formContainer) return;
  formContainer.innerHTML = `
    <div style="text-align:center;padding:40px 20px;">
      <div style="width:80px;height:80px;border-radius:50%;background:#FF8A50;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;">
        <i class="fas fa-check" style="font-size:36px;color:#FFFFFF;"></i>
      </div>
      <h3 style="font-family:Sora,sans-serif;font-size:24px;font-weight:800;color:#EDE4DB;margin-bottom:12px;">Application Received!</h3>
      <p style="font-family:Inter,sans-serif;font-size:15px;color:#9E9082;line-height:1.6;margin-bottom:24px;">Thank you for your interest. Our team will reach out to you within 24 hours with the perfect batch timing.</p>
      <button type="button" class="teonox-online-btn teonox-online-btn-primary" style="padding:14px 32px;font-size:15px;cursor:pointer;" onclick="closeApplyModal()">
        <i class="fas fa-arrow-right"></i> Close
      </button>
    </div>
  `;
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
    (window as any).submitForm = async (e: Event) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const fullName = getField(form, 'input[type="text"]');
      const phone = getField(form, 'input[type="tel"]');
      const email = getField(form, 'input[type="email"]');
      const profile = getField(form, 'select');
      const batchTiming = form.querySelectorAll('select')[1]?.value?.trim() || '';

      removeError(form);

      if (!validateRequired(fullName)) { injectError(form, 'Full Name is required.', 'input[type="text"]'); return; }
      if (!validateRequired(email) || !validateEmail(email)) { injectError(form, 'Please enter a valid email address containing \'@\'.', 'input[type="email"]'); return; }
      if (!validateRequired(phone) || !validatePhone(phone)) { injectError(form, 'Please enter a valid 10-digit phone number.', 'input[type="tel"]'); return; }

      showSubmitting(form);

      const fields: Record<string, string> = {
        'Full Name': fullName,
        'Email Address': email,
        'Phone Number': phone,
        'Profile': profile,
        'Preferred Batch Timing': batchTiming,
        fullName,
        name: fullName,
        email,
        phone,
        profile,
        batchTiming,
        preferredBatch: batchTiming,
        source: 'build-digital-marketing-skills-with-ai-landing-page',
      };

      try {
        await submitLeadForm('Online Programme Apply', fields);
        form.reset();
        resetSubmit(form, true);
        showSuccessMessage(form);
      } catch {
        resetSubmit(form, false);
        injectError(form, 'Something went wrong. Please try again.');
      }
    };
    (window as any).playReel = (overlay: HTMLElement) => {
      const card = overlay.closest('.teonox-online-reel-card');
      const video = card?.querySelector('video') as HTMLVideoElement | null;
      if (!video) return;
      document.querySelectorAll('.teonox-online-reel-card video').forEach((v: Element) => {
        if (v !== video) { (v as HTMLVideoElement).pause(); (v as HTMLVideoElement).currentTime = 0; }
      });
      video.muted = false;
      video.play();
      overlay.style.display = 'none';
    };
    (window as any).togglePause = (btn: HTMLElement) => {
      const card = btn.closest('.teonox-online-reel-card');
      const video = card?.querySelector('video') as HTMLVideoElement | null;
      const icon = btn.querySelector('i');
      if (!video) return;
      if (video.paused) { video.play(); if (icon) icon.className = 'fas fa-pause'; btn.classList.remove('teonox-online-active'); }
      else { video.pause(); if (icon) icon.className = 'fas fa-play'; btn.classList.add('teonox-online-active'); }
    };
    (window as any).toggleMute = (btn: HTMLElement) => {
      const card = btn.closest('.teonox-online-reel-card');
      const video = card?.querySelector('video') as HTMLVideoElement | null;
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
      return viewport?.querySelector('.teonox-online-slider-track') as HTMLElement | null;
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
      const viewport = wrap.querySelector('.teonox-online-slider-viewport') as HTMLElement | null;
      const id = viewport?.id;
      if (!id) return;
      scrollOffsets[id] = 0;
      startAutoScroll(id, 0.4);
      wrap.addEventListener('mouseenter', () => stopAutoScroll(id));
      wrap.addEventListener('mouseleave', () => startAutoScroll(id, 0.4));
    });

    // --- Touch/Swipe support ---
    document.querySelectorAll('.teonox-online-slider-viewport').forEach((viewport: Element) => {
      let startX = 0, startOffset = 0, isDragging = false;
      const viewportId = viewport.id;
      function dragStart(x: number) { isDragging = true; stopAutoScroll(viewportId); startX = x; startOffset = scrollOffsets[viewportId] || 0; (viewport as HTMLElement).style.cursor = 'grabbing'; }
      function dragMove(x: number) { if (!isDragging) return; const walk = (startX - x) * 1.2; applyOffset(viewportId, startOffset + walk); }
      function dragEnd(resumeSpeed: number) { if (!isDragging) return; isDragging = false; (viewport as HTMLElement).style.cursor = 'grab'; startAutoScroll(viewportId, resumeSpeed || 0.4); }
      viewport.addEventListener('mousedown', (e: MouseEvent) => { dragStart(e.pageX); e.preventDefault(); });
      viewport.addEventListener('mousemove', (e: MouseEvent) => { if (!isDragging) return; dragMove(e.pageX); e.preventDefault(); });
      viewport.addEventListener('mouseup', () => dragEnd(1.0));
      viewport.addEventListener('mouseleave', () => dragEnd(0.4));
      viewport.addEventListener('touchstart', (e: TouchEvent) => { dragStart(e.touches[0].pageX); });
      viewport.addEventListener('touchmove', (e: TouchEvent) => { if (!isDragging) return; dragMove(e.touches[0].pageX); e.preventDefault(); });
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
    document.addEventListener('click', (e: Event) => {
      const modal = document.querySelector('.teonox-online-apply-modal');
      if (modal && e.target === modal) (window as any).closeApplyModal();
    });

    // --- Cleanup ---
    return () => {
      document.querySelectorAll('.teonox-online-slider-viewport').forEach(v => {
        (v as HTMLElement).style.cursor = '';
      });
      Object.keys(scrollAnimations).forEach(k => cancelAnimationFrame(scrollAnimations[k]));
    };
  }, []);

  return (
    <>
      <Navbar onEnquireClick={() => { if (typeof window !== 'undefined' && (window as any).openApplyModal) (window as any).openApplyModal(); }} activeSection="programmes" onNavigate={(path, label) => navigateTo(path)} />
      <div className="tl-landing-page">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@400;500;600;700;800&display=swap" as="style" onLoad={() => { const l = document.querySelector('link[rel="preload"]') as HTMLLinkElement | null; if (l) l.rel = 'stylesheet'; }} />
        <div dangerouslySetInnerHTML={{ __html: rawHtmlBody }} />
      </div>
      <Footer onEnquireClick={() => { if (typeof window !== 'undefined' && (window as any).openApplyModal) (window as any).openApplyModal(); }} onNavigate={(path, label) => navigateTo(path)} />
    </>
  );
}
