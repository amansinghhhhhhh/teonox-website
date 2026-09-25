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

// --- Firebase Phone OTP state (inline verification under the Phone field) ---
// The RecaptchaVerifier is created ONCE on mount and cleared on unmount.
// Re-creating it on every click is what triggers identitytoolkit 400 errors.
let otpConfirmation: ConfirmationResult | null = null;
let otpRecaptcha: RecaptchaVerifier | null = null;
let otpVerifiedPhone = '';
let otpResendTimer: number | null = null;

function initOtpRecaptcha(): RecaptchaVerifier | null {
  if (otpRecaptcha) return otpRecaptcha;
  // The host node is rendered statically in the modal (never conditional),
  // so it is always available by mount time.
  if (!document.getElementById('recaptcha-container')) return null;
  try {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (_response: unknown) => {
        // reCAPTCHA solved - allow signInWithPhoneNumber
      },
      'expired-callback': () => {
        // Response expired. Reset reCAPTCHA so the next attempt rebuilds it.
        resetOtpRecaptcha();
      },
    });
    otpRecaptcha = (window as any).recaptchaVerifier as RecaptchaVerifier;
  } catch {
    otpRecaptcha = null;
  }
  return otpRecaptcha;
}

function resetOtpRecaptcha(): void {
  try {
    otpRecaptcha?.clear();
  } catch {
    // Widget may already be cleared — safe to ignore.
  }
  otpRecaptcha = null;
  try {
    if ((window as any).recaptchaVerifier) (window as any).recaptchaVerifier = null;
  } catch {
    // Non-browser / restricted contexts — safe to ignore.
  }
}

// Fallback: when Firebase rejects the invisible check
// (auth/invalid-app-credential, auth/captcha-check-failed), render a standard
// visible reCAPTCHA checkbox inside the phone error slot so the user can solve
// it manually and retry Get OTP with the solved verifier.
function renderVisibleRecaptchaFallback(): void {
  const slot = document.getElementById('teonox-phone-error-slot');
  if (!slot || document.getElementById('teonox-visible-recaptcha')) return;
  resetOtpRecaptcha();
  const wrap = document.createElement('div');
  wrap.id = 'teonox-visible-recaptcha';
  wrap.style.marginTop = '8px';
  slot.appendChild(wrap);
  try {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'teonox-visible-recaptcha', {
      'size': 'normal',
      'callback': (_response: unknown) => {
        // reCAPTCHA solved - allow signInWithPhoneNumber
      },
      'expired-callback': () => {
        // Response expired. Reset reCAPTCHA.
        resetOtpRecaptcha();
      },
    });
    otpRecaptcha = (window as any).recaptchaVerifier as RecaptchaVerifier;
  } catch {
    otpRecaptcha = null;
  }
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
      return 'Please enter a valid 10-digit mobile number.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a while and try again.';
    case 'auth/quota-exceeded':
      return 'SMS limit reached. Please try again later.';
    case 'auth/captcha-check-failed':
    case 'auth/missing-client-identifiers':
      return 'Verification check failed. Please refresh the page and try again.';
    case 'auth/invalid-app-credential':
      return 'App verification failed. Please complete the reCAPTCHA below and tap Get OTP again.';
    case 'auth/code-expired':
      return 'This code has expired. Please tap Resend OTP for a new code.';
    case 'auth/invalid-verification-code':
      return 'Incorrect code. Please check the SMS and try again.';
    default:
      return 'Something went wrong. Please try again.';
  }
}

// Strip spaces/dashes/etc so Firebase only ever receives exactly 10 digits
// (the +91 prefix is visual only — the user types just their mobile number).
function normalizePhone(raw: string): string {
  return (raw || '').replace(/\D/g, '');
}

// Dedicated error slot under the phone row (always visible, never cramped
// inside the input). Reuses the .teonox-online-rt-phone class so the submit
// gate still detects outstanding phone errors.
function showPhoneSlotError(message: string): void {
  const slot = document.getElementById('teonox-phone-error-slot');
  if (!slot) return;
  slot.innerHTML = '';
  const div = document.createElement('div');
  div.className = 'teonox-online-rt-phone';
  div.style.cssText = 'color:#e74c3c;font-size:13px;margin-top:4px;font-family:Inter,sans-serif;';
  div.textContent = message;
  slot.appendChild(div);
}

function clearPhoneSlotError(): void {
  const slot = document.getElementById('teonox-phone-error-slot');
  if (slot) slot.innerHTML = '';
}

// --- Inline OTP DOM helpers (scoped to the Apply modal form) ---
function getApplyForm(): HTMLFormElement | null {
  return document.querySelector('.teonox-online-apply-modal-form form[onsubmit="submitForm(event)"]') as HTMLFormElement | null;
}

function showOtpInlineError(message: string): void {
  const err = document.getElementById('teonox-otp-error');
  if (!err) return;
  err.textContent = message;
  err.style.display = 'block';
}

function clearOtpInlineError(): void {
  const err = document.getElementById('teonox-otp-error');
  if (!err) return;
  err.textContent = '';
  err.style.display = 'none';
}

function setGetOtpEnabled(enabled: boolean): void {
  const btn = document.getElementById('teonox-get-otp-btn') as HTMLButtonElement | null;
  if (!btn) return;
  btn.disabled = !enabled;
  btn.style.opacity = enabled ? '1' : '0.5';
  btn.style.cursor = enabled ? 'pointer' : 'not-allowed';
}

function setGetOtpBusy(busy: boolean, label = 'Sending…'): void {
  const btn = document.getElementById('teonox-get-otp-btn') as HTMLButtonElement | null;
  if (!btn) return;
  if (busy) {
    btn.dataset.originalText = btn.dataset.originalText || btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${label}`;
    btn.style.opacity = '0.7';
  } else {
    btn.innerHTML = btn.dataset.originalText || '<i class="fas fa-comment-sms"></i> Get OTP';
    btn.style.opacity = '1';
  }
}

function showOtpBox(): void {
  const box = document.getElementById('teonox-otp-box');
  if (box) box.style.display = 'block';
  clearOtpInlineError();
  const input = document.getElementById('teonox-otp-input') as HTMLInputElement | null;
  if (input) {
    input.value = '';
    input.focus();
  }
}

function hideOtpBox(): void {
  const box = document.getElementById('teonox-otp-box');
  if (box) box.style.display = 'none';
  clearOtpInlineError();
}

function showVerifiedBadge(): void {
  const badge = document.getElementById('teonox-phone-verified') as HTMLElement | null;
  if (badge) badge.style.display = 'flex';
  const btn = document.getElementById('teonox-get-otp-btn') as HTMLButtonElement | null;
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-circle-check"></i> OTP Sent';
    btn.style.opacity = '0.5';
  }
}

function hideVerifiedBadge(): void {
  const badge = document.getElementById('teonox-phone-verified');
  if (badge) badge.style.display = 'none';
}

function setVerifyBusy(busy: boolean): void {
  const btn = document.getElementById('teonox-verify-otp-btn') as HTMLButtonElement | null;
  if (!btn) return;
  if (busy) {
    btn.dataset.originalText = btn.dataset.originalText || btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying…';
    btn.style.opacity = '0.7';
  } else {
    btn.disabled = false;
    btn.innerHTML = btn.dataset.originalText || '<i class="fas fa-check"></i> Verify';
    btn.style.opacity = '1';
  }
}

// 30-second resend cooldown rendered on the Resend button + timer label.
function startOtpCooldown(seconds = 30): void {
  stopOtpResendTimer();
  const resendBtn = document.getElementById('teonox-otp-resend') as HTMLButtonElement | null;
  const timer = document.getElementById('teonox-otp-timer');
  let remaining = seconds;
  const paint = () => {
    if (timer) timer.textContent = remaining > 0 ? `Resend available in ${remaining}s` : 'Didn\'t get the code?';
    if (resendBtn) {
      resendBtn.disabled = remaining > 0;
      resendBtn.style.opacity = remaining > 0 ? '0.5' : '1';
      resendBtn.style.cursor = remaining > 0 ? 'not-allowed' : 'pointer';
    }
  };
  paint();
  otpResendTimer = window.setInterval(() => {
    remaining -= 1;
    paint();
    if (remaining <= 0) stopOtpResendTimer();
  }, 1000);
}

// Phone number changed (or user must re-verify): drop verified state,
// re-enable editing, hide the OTP box + badge, and re-arm Get OTP.
function resetPhoneVerification(): void {
  stopOtpResendTimer();
  otpConfirmation = null;
  otpVerifiedPhone = '';
  const phoneInput = document.querySelector('.teonox-online-apply-modal-form input[type="tel"]') as HTMLInputElement | null;
  if (phoneInput) {
    phoneInput.disabled = false;
    phoneInput.style.opacity = '1';
  }
  hideOtpBox();
  hideVerifiedBadge();
  const phone = normalizePhone(phoneInput?.value || '');
  const btn = document.getElementById('teonox-get-otp-btn') as HTMLButtonElement | null;
  if (btn) {
    delete btn.dataset.originalText;
    btn.innerHTML = '<i class="fas fa-comment-sms"></i> Get OTP';
  }
  setGetOtpEnabled(validatePhone(phone));
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
    // "Get OTP" beside the Phone field: sends the SMS code via the single
    // mount-time RecaptchaVerifier instance. Firebase is only called with a
    // strictly validated 10-digit payload — anything shorter never hits the API.
    (window as any).requestOtp = async () => {
      const form = getApplyForm();
      const phoneInput = form?.querySelector('input[type="tel"]') as HTMLInputElement | null;
      const phone = normalizePhone(phoneInput?.value || '');
      clearPhoneSlotError();
      clearOtpInlineError();
      if (!validatePhone(phone)) {
        showPhoneSlotError('Please enter a valid 10-digit mobile number.');
        phoneInput?.focus();
        return;
      }
      const verifier = initOtpRecaptcha();
      if (!verifier) {
        showPhoneSlotError('Verification unavailable. Please refresh the page and try again.');
        return;
      }
      setGetOtpBusy(true);
      try {
        otpConfirmation = await signInWithPhoneNumber(auth, '+91' + phone, verifier);
        otpVerifiedPhone = '';
        hideVerifiedBadge();
        setGetOtpBusy(false);
        showOtpBox();
        startOtpCooldown();
      } catch (err: unknown) {
        const code = (err as { code?: string; message?: string })?.code;
        const message = (err as { code?: string; message?: string })?.message;
        console.error('[OTP] signInWithPhoneNumber failed:', code, message);
        if (code === 'auth/captcha-check-failed' || code === 'auth/missing-client-identifiers') {
          resetOtpRecaptcha();
        }
        if (code === 'auth/invalid-app-credential' || code === 'auth/captcha-check-failed') {
          renderVisibleRecaptchaFallback();
        }
        setGetOtpBusy(false);
        showPhoneSlotError(friendlyOtpError(code));
      }
    };
    // "Verify" under the Phone field: confirms the 6-digit code inline.
    (window as any).verifyInlineOtp = async () => {
      const code = (document.getElementById('teonox-otp-input') as HTMLInputElement | null)?.value.trim() || '';
      clearOtpInlineError();
      if (!/^\d{6}$/.test(code)) {
        showOtpInlineError('Please enter the 6-digit code sent to your phone.');
        return;
      }
      if (!otpConfirmation) {
        showOtpInlineError('Your session expired. Please tap Resend OTP for a new code.');
        return;
      }
      setVerifyBusy(true);
      try {
        await otpConfirmation.confirm(code);
        const phoneInput = document.querySelector('.teonox-online-apply-modal-form input[type="tel"]') as HTMLInputElement | null;
        otpVerifiedPhone = normalizePhone(phoneInput?.value || '');
        if (phoneInput) {
          phoneInput.disabled = true;
          phoneInput.style.opacity = '0.6';
        }
        stopOtpResendTimer();
        hideOtpBox();
        showVerifiedBadge();
      } catch (err: unknown) {
        const code = (err as { code?: string; message?: string })?.code;
        const message = (err as { code?: string; message?: string })?.message;
        console.error('[OTP] confirmationResult.confirm failed:', code, message);
        showOtpInlineError(friendlyOtpError(code));
      } finally {
        setVerifyBusy(false);
      }
    };
    // "Edit" toggle on the verified badge: re-enable phone editing and force
    // a fresh OTP cycle for the new number.
    (window as any).editPhoneNumber = () => {
      resetPhoneVerification();
      clearPhoneSlotError();
      const phoneInput = document.querySelector('.teonox-online-apply-modal-form input[type="tel"]') as HTMLInputElement | null;
      phoneInput?.focus();
    };
    // Fresh SMS code for the currently typed phone number.
    (window as any).resendInlineOtp = async () => {
      const form = getApplyForm();
      const phone = normalizePhone((form?.querySelector('input[type="tel"]') as HTMLInputElement | null)?.value || '');
      clearOtpInlineError();
      if (!validatePhone(phone)) {
        showPhoneSlotError('Please enter a valid 10-digit mobile number.');
        return;
      }
      const verifier = initOtpRecaptcha();
      if (!verifier) {
        showOtpInlineError('Verification unavailable. Please refresh the page and try again.');
        return;
      }
      const resendBtn = document.getElementById('teonox-otp-resend') as HTMLButtonElement | null;
      if (resendBtn) {
        resendBtn.disabled = true;
        resendBtn.style.opacity = '0.5';
      }
      try {
        otpConfirmation = await signInWithPhoneNumber(auth, '+91' + phone, verifier);
        startOtpCooldown();
      } catch (err: unknown) {
        const code = (err as { code?: string; message?: string })?.code;
        const message = (err as { code?: string; message?: string })?.message;
        console.error('[OTP] signInWithPhoneNumber (resend) failed:', code, message);
        if (code === 'auth/captcha-check-failed' || code === 'auth/missing-client-identifiers') {
          resetOtpRecaptcha();
        }
        if (code === 'auth/invalid-app-credential' || code === 'auth/captcha-check-failed') {
          renderVisibleRecaptchaFallback();
        }
        if (resendBtn) {
          resendBtn.disabled = false;
          resendBtn.style.opacity = '1';
        }
        showOtpInlineError(friendlyOtpError(code));
      }
    };
    // Final submit: allowed only after the typed number passes OTP verification.
    (window as any).submitForm = async (e: Event) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const fullName = getField(form, 'input[type="text"]');
      const phone = normalizePhone(getField(form, 'input[type="tel"]'));
      const email = getField(form, 'input[type="email"]');
      const profile = getField(form, 'select');
      const batchTiming = form.querySelectorAll('select')[1]?.value?.trim() || '';

      removeError(form);

      if (!validateRequired(fullName)) { injectError(form, 'Full Name is required.', 'input[type="text"]'); return; }
      if (!validateRequired(email) || !validateEmail(email)) { injectError(form, 'Please enter a valid email address containing \'@\'.', 'input[type="email"]'); return; }
      if (!validatePhone(phone)) { injectError(form, 'Please enter a valid 10-digit mobile number.', 'input[type="tel"]'); return; }

      // Block submission if real-time validation errors exist
      const hasPhoneError = form.querySelector('.teonox-online-rt-phone');
      const hasEmailError = form.querySelector('.teonox-online-rt-email');
      if (hasPhoneError || hasEmailError) {
        if (hasPhoneError) { (hasPhoneError.previousElementSibling as HTMLElement)?.focus(); }
        else if (hasEmailError) { (hasEmailError.previousElementSibling as HTMLElement)?.focus(); }
        return;
      }

      // Gate: phone must be OTP-verified (and verification must match the typed number).
      if (!otpVerifiedPhone || otpVerifiedPhone !== phone) {
        injectError(form, 'Please verify your phone number with the OTP first.', 'input[type="tel"]');
        return;
      }

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
        otpVerified: 'true',
        phoneVerified: 'true',
      };

      try {
        await submitLeadForm('Online Programme Apply', fields);
        form.reset();
        resetSubmit(form, true);
        stopOtpResendTimer();
        otpConfirmation = null;
        otpVerifiedPhone = '';
        showSuccessMessage(form);
      } catch {
        resetSubmit(form, false);
        injectError(form, 'Something went wrong. Please try again.');
      }
    };
    // --- reCAPTCHA lifecycle: initialize ONCE on mount, clear on unmount ---
    // (Created here — not inside click handlers — so only one widget ever
    // binds to #recaptcha-container, fixing identitytoolkit 400 errors.)
    initOtpRecaptcha();
    setGetOtpEnabled(false);

    // --- Real-time Input Validation Listeners ---
    const form = document.querySelector('form[onsubmit="submitForm(event)"]') as HTMLFormElement | null;
    if (form) {
      const phoneInput = form.querySelector('input[type="tel"]') as HTMLInputElement | null;
      const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement | null;

      if (phoneInput) {
        phoneInput.addEventListener('input', () => {
          phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
          const phone = normalizePhone(phoneInput.value);
          if (phoneInput.value.trim() && (!validatePhone(phone))) {
            showPhoneSlotError('Must be a valid 10-digit number starting with 6-9.');
          } else {
            clearPhoneSlotError();
          }
          // Arm Get OTP from validity; any edit after verify / while the OTP
          // box is open invalidates that state and requires a fresh code.
          const otpBoxOpen = (document.getElementById('teonox-otp-box') as HTMLElement | null)?.style.display === 'block';
          if (otpVerifiedPhone !== '' || otpBoxOpen) {
            if (phone !== otpVerifiedPhone) resetPhoneVerification();
          } else {
            setGetOtpEnabled(validatePhone(phone));
          }
        });
        phoneInput.addEventListener('blur', () => {
          const phone = normalizePhone(phoneInput.value);
          if (phoneInput.value.trim() && (!validatePhone(phone))) {
            showPhoneSlotError('Must be a valid 10-digit number starting with 6-9.');
          } else {
            clearPhoneSlotError();
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
      otpVerifiedPhone = '';
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
