import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { validatePhone } from '../utils/validation';

// Shared Firebase phone-OTP logic for all lead forms.
// Extracted from the tested OnlineProgrammePage inline flow and generalized
// into a hook + modal so every form verifies numbers the same way.

export const OTP_RESEND_COOLDOWN_SECONDS = 30;

/** Form names that must always submit directly without OTP. */
const OTP_EXEMPT_FORMS = new Set(['Brochure Downloads']);

export function normalizePhone(raw: string): string {
  return (raw || '').replace(/\D/g, '');
}

/**
 * Central exclusion gate. Brochure downloads and payloads without a valid
 * 10-digit number (e.g. the email-only newsletter) skip OTP entirely.
 */
export function shouldVerifyOtp(formName: string, phone: string): boolean {
  if (OTP_EXEMPT_FORMS.has(formName)) return false;
  return validatePhone(normalizePhone(phone));
}

export function friendlyOtpError(code?: string): string {
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
      return 'App verification failed. Please complete the reCAPTCHA below and tap Resend OTP again.';
    case 'auth/code-expired':
      return 'This code has expired. Please tap Resend OTP for a new code.';
    case 'auth/invalid-verification-code':
      return 'Incorrect code. Please check the SMS and try again.';
    default:
      return 'Something went wrong. Please try again.';
  }
}

export type OtpStatus = 'idle' | 'sending' | 'awaiting-code' | 'verifying' | 'verified';

export const VISIBLE_RECAPTCHA_CONTAINER_ID = 'phone-otp-visible-recaptcha';

// Module-singleton verifiers. Created lazily on first send and never
// re-created per click — re-binding is what triggers identitytoolkit 400s.
let invisibleVerifier: RecaptchaVerifier | null = null;
let visibleVerifier: RecaptchaVerifier | null = null;

function clearVerifier(v: RecaptchaVerifier | null): void {
  try {
    v?.clear();
  } catch {
    // Widget may already be cleared — safe to ignore.
  }
}

function clearInvisibleVerifier(): void {
  clearVerifier(invisibleVerifier);
  invisibleVerifier = null;
  try {
    const w = window as unknown as { recaptchaVerifier?: RecaptchaVerifier | null };
    if (w.recaptchaVerifier && w.recaptchaVerifier !== visibleVerifier) {
      clearVerifier(w.recaptchaVerifier);
    }
    w.recaptchaVerifier = null;
  } catch {
    // Non-browser / restricted contexts — safe to ignore.
  }
}

async function getFreshInvisibleVerifier(): Promise<RecaptchaVerifier | null> {
  if (typeof document === 'undefined' || !document.getElementById('recaptcha-container')) return null;
  clearInvisibleVerifier();
  try {
    const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved - allow signInWithPhoneNumber
      },
      'expired-callback': () => {
        clearInvisibleVerifier();
      },
    });
    invisibleVerifier = verifier;
    try {
      (window as unknown as { recaptchaVerifier?: RecaptchaVerifier | null }).recaptchaVerifier = verifier;
    } catch {
      // Non-browser / restricted contexts — safe to ignore.
    }
    await verifier.render();
    return verifier;
  } catch {
    clearInvisibleVerifier();
    return null;
  }
}

export function renderVisibleRecaptchaFallback(): boolean {
  if (typeof document === 'undefined') return false;
  if (!document.getElementById(VISIBLE_RECAPTCHA_CONTAINER_ID) || visibleVerifier) return !!visibleVerifier;
  try {
    visibleVerifier = new RecaptchaVerifier(auth, VISIBLE_RECAPTCHA_CONTAINER_ID, {
      size: 'normal',
      callback: () => {
        // reCAPTCHA solved - allow signInWithPhoneNumber
      },
      'expired-callback': () => {
        clearVerifier(visibleVerifier);
        visibleVerifier = null;
      },
    });
    return true;
  } catch {
    visibleVerifier = null;
    return false;
  }
}

export function resetRecaptchaVerifiers(): void {
  clearInvisibleVerifier();
  clearVerifier(visibleVerifier);
  visibleVerifier = null;
  try {
    (window as unknown as { recaptchaVerifier?: RecaptchaVerifier | null }).recaptchaVerifier = null;
  } catch {
    // Non-browser / restricted contexts — safe to ignore.
  }
}

export interface UsePhoneOtp {
  status: OtpStatus;
  error: string;
  cooldown: number;
  needsVisibleCaptcha: boolean;
  sendOtp: (rawPhone: string) => Promise<boolean>;
  verifyOtp: (code: string) => Promise<string | null>;
  resendOtp: () => Promise<boolean>;
  reset: () => void;
}

export function usePhoneOtp(): UsePhoneOtp {
  const [status, setStatus] = useState<OtpStatus>('idle');
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [needsVisibleCaptcha, setNeedsVisibleCaptcha] = useState(false);
  const confirmationRef = useRef<ConfirmationResult | null>(null);
  const phoneRef = useRef('');
  const timerRef = useRef<number | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startCooldown = useCallback(
    (seconds = OTP_RESEND_COOLDOWN_SECONDS) => {
      stopTimer();
      setCooldown(seconds);
      timerRef.current = window.setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            if (timerRef.current !== null) {
              window.clearInterval(timerRef.current);
              timerRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [stopTimer]
  );

  useEffect(
    () => () => {
      stopTimer();
      confirmationRef.current = null;
    },
    [stopTimer]
  );

  const sendOtp = useCallback(
    async (rawPhone: string): Promise<boolean> => {
      const phone = normalizePhone(rawPhone);
      setError('');
      setNeedsVisibleCaptcha(false);
      if (!validatePhone(phone)) {
        setError('Please enter a valid 10-digit mobile number.');
        return false;
      }
      const verifier = await getFreshInvisibleVerifier();
      if (!verifier) {
        setError('Verification unavailable. Please refresh the page and try again.');
        return false;
      }
      setStatus('sending');
      try {
        confirmationRef.current = await signInWithPhoneNumber(auth, '+91' + phone, verifier);
        phoneRef.current = phone;
        setStatus('awaiting-code');
        startCooldown();
        return true;
      } catch (err: unknown) {
        const code = (err as { code?: string })?.code;
        if (code === 'auth/captcha-check-failed' || code === 'auth/missing-client-identifiers') {
          clearInvisibleVerifier();
        }
        if (code === 'auth/invalid-app-credential' || code === 'auth/captcha-check-failed') {
          setNeedsVisibleCaptcha(true);
        }
        setError(friendlyOtpError(code));
        setStatus('idle');
        return false;
      } finally {
        clearInvisibleVerifier();
      }
    },
    [startCooldown]
  );

  const verifyOtp = useCallback(async (code: string): Promise<string | null> => {
    const clean = (code || '').trim();
    if (!/^\d{6}$/.test(clean)) {
      setError('Please enter the 6-digit code sent to your phone.');
      return null;
    }
    if (!confirmationRef.current) {
      setError('Your session expired. Please tap Resend OTP for a new code.');
      return null;
    }
    setStatus('verifying');
    setError('');
    try {
      await confirmationRef.current.confirm(clean);
      stopTimer();
      setStatus('verified');
      return phoneRef.current;
    } catch (err: unknown) {
      setError(friendlyOtpError((err as { code?: string })?.code));
      setStatus('awaiting-code');
      return null;
    }
  }, [stopTimer]);

  const resendOtp = useCallback(async (): Promise<boolean> => {
    if (!phoneRef.current) return false;
    const ok = await sendOtp(phoneRef.current);
    // A failed resend must not collapse the code UI back to idle —
    // keep the input visible so the user can retry or enter a code.
    if (!ok) setStatus('awaiting-code');
    return ok;
  }, [sendOtp]);

  const reset = useCallback(() => {
    confirmationRef.current = null;
    phoneRef.current = '';
    stopTimer();
    setCooldown(0);
    setError('');
    setNeedsVisibleCaptcha(false);
    setStatus('idle');
  }, [stopTimer]);

  return { status, error, cooldown, needsVisibleCaptcha, sendOtp, verifyOtp, resendOtp, reset };
}
