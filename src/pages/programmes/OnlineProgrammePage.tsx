import React, { useEffect } from 'react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { submitForm as submitLeadForm } from '../../services/formService';
import { auth } from '../../lib/firebase';
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
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

function removeError(form: HTMLFormElement): void {
  const existing = form.querySelector('.teonox-online-form-error');
  if (existing) existing.remove();
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

function injectRealtimeError(input: HTMLInputElement, form: HTMLFormElement, message: string, key: string): void {
  const existing = form.querySelector(`.teonox-online-rt-${key}`);
  if (existing) existing.remove();
  const div = document.createElement('div');
  div.className = `teonox-online-rt-${key}`;
  div.style.cssText = 'color:#e74c3c;font-size:13px;margin-top:4px;font-family:Inter,sans-serif;';
  div.textContent = message;
  input.parentNode?.insertBefore(div, input.nextSibling);
}

function clearRealtimeError(input: HTMLInputElement, form: HTMLFormElement, key: string): void {
  const existing = form.querySelector(`.teonox-online-rt-${key}`);
  if (existing) existing.remove();
}

function showSubmitting(form: HTMLFormElement, label = 'Submitting…'): void {
  const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
  if (btn) {
    btn.disabled = true;
    btn.dataset.originalText = btn.dataset.originalText || btn.innerHTML;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${label}`;
    btn.style.opacity = '0.7';
    btn.style.pointerEvents = 'none';
  }
}

function resetSubmit(form: HTMLFormElement, success: boolean): void {
  const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
  if (btn) {
    btn.disabled = false;
    btn.innerHTML = btn.dataset.originalText || '<i class="fas fa-comment-sms"></i> Send OTP';
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

// --- Firebase Phone OTP state (Apply modal 2-step verification) ---
// The lead fields collected in step 1 are held here until the SMS code is
// confirmed in step 2 — only then is the Google Apps Script webhook called.
let otpConfirmation: ConfirmationResult | null = null;
let otpRecaptcha: RecaptchaVerifier | null = null;
let otpPendingLead: Record<string, string> | null = null;
let otpResendTimer: number | null = null;

function getOtpRecaptcha(): RecaptchaVerifier {
  if (otpRecaptcha) return otpRecaptcha;
  otpRecaptcha = new RecaptchaVerifier(auth, 'teonox-recaptcha-container', {
    size: 'invisible',
  });
  return otpRecaptcha;
}

function resetOtpRecaptcha(): void {
  try {
    otpRecaptcha?.clear();
  } catch {
    // Widget may already be cleared — safe to ignore.
  }
  otpRecaptcha = null;
}

function stopOtpResendTimer(): void {
  if (otpResendTimer !== null) {
    window.clearInterval(otpResendTimer);
    otpResendTimer = null;
  }
}

function friendlyOtpError(code?: string): string {
  switch (code) {
    case 'auth/invalid-phone-number':
      return 'Please enter a valid 10-digit phone number.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a while and try again.';
    case 'auth/quota-exceeded':
      return 'SMS limit reached. Please try again later.';
    case 'auth/captcha-check-failed':
    case 'auth/missing-client-identifiers':
      return 'Verification check failed. Please refresh the page and try again.';
    case 'auth/code-expired':
      return 'This code has expired. Please tap Resend OTP for a new code.';
    case 'auth/invalid-verification-code':
      return 'Incorrect code. Please check the SMS and try again.';
    default:
      return 'Something went wrong. Please try again.';
  }
}

function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 4 ? `XXXXXX${digits.slice(-4)}` : phone;
}

function setOtpFormBusy(otpForm: HTMLFormElement, busy: boolean, label: string): void {
  const submitBtn = otpForm.querySelector('button[type="submit"]') as HTMLButtonElement | null;
  const resendBtn = otpForm.querySelector('[data-otp-resend]') as HTMLButtonElement | null;
  if (submitBtn) {
    submitBtn.disabled = busy;
    if (busy) {
      submitBtn.dataset.originalText = submitBtn.dataset.originalText || submitBtn.innerHTML;
      submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${label}`;
      submitBtn.style.opacity = '0.7';
      submitBtn.style.pointerEvents = 'none';
    } else {
      submitBtn.innerHTML = submitBtn.dataset.originalText || '<i class="fas fa-check"></i> Verify & Submit';
      submitBtn.style.opacity = '1';
      submitBtn.style.pointerEvents = '';
    }
  }
  if (resendBtn && busy) resendBtn.disabled = true;
}

function startResendCooldown(resendBtn: HTMLButtonElement, seconds = 30): void {
  stopOtpResendTimer();
  let remaining = seconds;
  resendBtn.disabled = true;
  resendBtn.innerHTML = `<i class="fas fa-clock"></i> Resend OTP in ${remaining}s`;
  otpResendTimer = window.setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      stopOtpResendTimer();
      resendBtn.disabled = false;
      resendBtn.innerHTML = '<i class="fas fa-rotate-right"></i> Resend OTP';
      return;
    }
    resendBtn.innerHTML = `<i class="fas fa-clock"></i> Resend OTP in ${remaining}s`;
  }, 1000);
}

// Step 2 UI: hide the details form and show the 6-digit code entry.
function renderOtpStep(detailsForm: HTMLFormElement, phone: string): HTMLFormElement {
  detailsForm.style.display = 'none';
  detailsForm.parentNode?.querySelector('.teonox-online-otp-step')?.remove();
  const step = document.createElement('div');
  step.className = 'teonox-online-otp-step';
  step.innerHTML = `
    <div class="teonox-online-section-label">VERIFY PHONE</div>
    <h2 style="font-size:24px;font-weight:800;margin-bottom:6px;">Check your <span style="color:var(--orange)">messages</span></h2>
    <p style="color:var(--text-secondary);margin-bottom:24px;font-size:14px;">We sent a 6-digit code to <strong>+91 ${maskPhone(phone)}</strong>. <a href="javascript:void(0)" onclick="otpGoBack()" style="color:var(--orange);font-weight:600;">Wrong number?</a></p>
    <form onsubmit="verifyOtp(event)">
      <div class="teonox-online-form-group">
        <label>6-digit OTP</label>
        <input type="text" inputmode="numeric" placeholder="Enter 6-digit code" required maxlength="6" autocomplete="one-time-code" style="letter-spacing:6px;text-align:center;font-size:18px;font-weight:700;" oninput="this.value=this.value.replace(/\\D/g,'').slice(0,6)">
      </div>
      <button type="submit" class="teonox-online-btn teonox-online-btn-primary" style="width:100%;padding:14px;font-size:15px;">
        <i class="fas fa-check"></i> Verify &amp; Submit
      </button>
      <button type="button" data-otp-resend onclick="resendOtp()" class="teonox-online-btn teonox-online-btn-outline" style="width:100%;padding:12px;font-size:14px;margin-top:10px;cursor:pointer;">
        <i class="fas fa-rotate-right"></i> Resend OTP
      </button>
      <p style="text-align:center;font-size:11px;color:var(--text-muted);margin-top:10px;">
        <i class="fas fa-lock" style="font-size:10px;"></i> Your information is secure. We will never share your data.
      </p>
    </form>
  `;
  detailsForm.parentNode?.insertBefore(step, detailsForm.nextSibling);
  const otpForm = step.querySelector('form') as HTMLFormElement;
  const resendBtn = step.querySelector('[data-otp-resend]') as HTMLButtonElement | null;
  if (resendBtn) startResendCooldown(resendBtn);
  (step.querySelector('input') as HTMLInputElement | null)?.focus();
  return otpForm;
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
    // Step 1 of Apply verification: validate details, then send the SMS OTP.
    // The lead is only submitted to the webhook after the code is confirmed.
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

      // Block submission if real-time validation errors exist
      const hasPhoneError = form.querySelector('.teonox-online-rt-phone');
      const hasEmailError = form.querySelector('.teonox-online-rt-email');
      if (hasPhoneError || hasEmailError) {
        if (hasPhoneError) { (hasPhoneError.previousElementSibling as HTMLElement)?.focus(); }
        else if (hasEmailError) { (hasEmailError.previousElementSibling as HTMLElement)?.focus(); }
        return;
      }

      if (!document.getElementById('teonox-recaptcha-container')) {
        injectError(form, 'Verification unavailable. Please refresh the page and try again.');
        return;
      }

      showSubmitting(form, 'Sending OTP…');

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
        otpConfirmation = await signInWithPhoneNumber(auth, '+91' + phone, getOtpRecaptcha());
        otpPendingLead = fields;
        resetSubmit(form, true);
        renderOtpStep(form, phone);
      } catch (err: unknown) {
        const code = (err as { code?: string })?.code;
        if (code === 'auth/captcha-check-failed' || code === 'auth/missing-client-identifiers') {
          resetOtpRecaptcha();
        }
        resetSubmit(form, false);
        injectError(form, friendlyOtpError(code));
      }
    };
    // Step 2: confirm the 6-digit SMS code, then submit the stored lead.
    (window as any).verifyOtp = async (e: Event) => {
      e.preventDefault();
      const otpForm = e.target as HTMLFormElement;
      const code = (otpForm.querySelector('input')?.value || '').trim();
      removeError(otpForm);

      if (!/^\d{6}$/.test(code)) {
        injectError(otpForm, 'Please enter the 6-digit code sent to your phone.', 'input');
        return;
      }
      if (!otpConfirmation || !otpPendingLead) {
        injectError(otpForm, 'Your session expired. Please tap Resend OTP for a new code.');
        return;
      }

      setOtpFormBusy(otpForm, true, 'Verifying…');
      try {
        await otpConfirmation.confirm(code);
      } catch (err: unknown) {
        setOtpFormBusy(otpForm, false, 'Verifying…');
        injectError(otpForm, friendlyOtpError((err as { code?: string })?.code), 'input');
        return;
      }

      // OTP verified — submit the lead via the existing webhook.
      setOtpFormBusy(otpForm, true, 'Submitting…');
      const detailsForm = otpForm.closest('.teonox-online-apply-modal-form')?.querySelector('form[onsubmit="submitForm(event)"]') as HTMLFormElement | null;
      try {
        await submitLeadForm('Online Programme Apply', {
          ...otpPendingLead,
          otpVerified: 'true',
          phoneVerified: 'true',
        });
        stopOtpResendTimer();
        otpConfirmation = null;
        otpPendingLead = null;
        if (detailsForm) {
          detailsForm.reset();
          showSuccessMessage(detailsForm);
        }
      } catch {
        setOtpFormBusy(otpForm, false, 'Submitting…');
        injectError(otpForm, 'Something went wrong. Please try again.');
      }
    };
    // Request a fresh SMS code for the stored phone number.
    (window as any).resendOtp = async () => {
      const step = document.querySelector('.teonox-online-otp-step');
      const otpForm = step?.querySelector('form') as HTMLFormElement | null;
      const resendBtn = step?.querySelector('[data-otp-resend]') as HTMLButtonElement | null;
      const phone = otpPendingLead?.phone;
      if (!otpForm || !phone) return;
      removeError(otpForm);
      if (resendBtn) {
        resendBtn.disabled = true;
        resendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
      }
      try {
        otpConfirmation = await signInWithPhoneNumber(auth, '+91' + phone, getOtpRecaptcha());
        if (resendBtn) startResendCooldown(resendBtn);
      } catch (err: unknown) {
        const code = (err as { code?: string })?.code;
        if (code === 'auth/captcha-check-failed' || code === 'auth/missing-client-identifiers') {
          resetOtpRecaptcha();
        }
        if (resendBtn) {
          resendBtn.disabled = false;
          resendBtn.innerHTML = '<i class="fas fa-rotate-right"></i> Resend OTP';
        }
        injectError(otpForm, friendlyOtpError(code));
      }
    };
    // Back to the details form (keeps typed values — the form was only hidden).
    (window as any).otpGoBack = () => {
      document.querySelector('.teonox-online-otp-step')?.remove();
      const form = document.querySelector('.teonox-online-apply-modal-form form[onsubmit="submitForm(event)"]') as HTMLFormElement | null;
      if (form) {
        form.style.display = '';
        resetSubmit(form, true);
      }
      stopOtpResendTimer();
      otpConfirmation = null;
      otpPendingLead = null;
    };
    // --- Real-time Input Validation Listeners ---
    const form = document.querySelector('form[onsubmit="submitForm(event)"]') as HTMLFormElement | null;
    if (form) {
      const phoneInput = form.querySelector('input[type="tel"]') as HTMLInputElement | null;
      const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement | null;

      if (phoneInput) {
        phoneInput.addEventListener('input', () => {
          phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
          const phone = phoneInput.value.trim();
          if (phone && (!validatePhone(phone))) {
            injectRealtimeError(phoneInput, form, "Must be a valid 10-digit number starting with 6-9.", 'phone');
          } else {
            clearRealtimeError(phoneInput, form, 'phone');
          }
        });
        phoneInput.addEventListener('blur', () => {
          const phone = phoneInput.value.trim();
          if (phone && (!validatePhone(phone))) {
            injectRealtimeError(phoneInput, form, "Must be a valid 10-digit number starting with 6-9.", 'phone');
          } else {
            clearRealtimeError(phoneInput, form, 'phone');
          }
        });
      }

      if (emailInput) {
        emailInput.addEventListener('input', () => {
          const email = emailInput.value.trim();
          if (email && (!validateEmail(email))) {
            injectRealtimeError(emailInput, form, "Please enter a valid email address with '@' and domain.", 'email');
          } else {
            clearRealtimeError(emailInput, form, 'email');
          }
        });
        emailInput.addEventListener('blur', () => {
          const email = emailInput.value.trim();
          if (email && (!validateEmail(email))) {
            injectRealtimeError(emailInput, form, "Please enter a valid email address with '@' and domain.", 'email');
          } else {
            clearRealtimeError(emailInput, form, 'email');
          }
        });
      }
    }

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
      stopOtpResendTimer();
      resetOtpRecaptcha();
      otpConfirmation = null;
      otpPendingLead = null;
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
