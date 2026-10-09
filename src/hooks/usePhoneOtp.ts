import { useCallback, useEffect, useRef, useState } from 'react';
import { validatePhone } from '../utils/validation';

// Shared MagicText-backed phone-OTP logic for all lead forms.
// Previously Firebase phone auth; now the browser only talks to our own
// Express endpoints (/api/send-otp, /api/verify-otp), which own OTP
// generation, expiry, rate limits, and the MagicText SMS call server-side.
// The hook interface is unchanged so every consumer keeps working untouched.

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
    case 'invalid_phone':
      return 'Please enter a valid 10-digit mobile number.';
    case 'rate_limited':
      return 'Too many attempts. Please wait a while and try again.';
    case 'expired':
      return 'This code has expired. Please tap Resend OTP for a new code.';
    case 'invalid_code':
      return 'Incorrect code. Please check the SMS and try again.';
    case 'sms_failed':
    case 'service_unavailable':
      return 'Could not send the code. Please try again in a bit.';
    case 'network_error':
      return 'Network error. Please check your connection and try again.';
    default:
      return 'Something went wrong. Please try again.';
  }
}

export type OtpStatus = 'idle' | 'sending' | 'awaiting-code' | 'verifying' | 'verified';

async function postOtp(path: string, body: Record<string, string>): Promise<{ ok: boolean; status: number; error?: string; phone?: string; gatewayError?: string }> {
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; phone?: string; gatewayError?: string };
    if (res.ok && data.ok) return { ok: true, status: res.status, phone: data.phone };
    return {
      ok: false,
      status: res.status,
      error: typeof data.error === 'string' ? data.error : undefined,
      gatewayError: typeof data.gatewayError === 'string' ? data.gatewayError : undefined,
    };
  } catch {
    return { ok: false, status: 0, error: 'network_error' };
  }
}

export interface UsePhoneOtp {
  status: OtpStatus;
  error: string;
  cooldown: number;
  sendOtp: (rawPhone: string) => Promise<boolean>;
  verifyOtp: (code: string) => Promise<string | null>;
  resendOtp: () => Promise<boolean>;
  reset: () => void;
}

export function usePhoneOtp(): UsePhoneOtp {
  const [status, setStatus] = useState<OtpStatus>('idle');
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);
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
      phoneRef.current = '';
    },
    [stopTimer]
  );

  const sendOtp = useCallback(
    async (rawPhone: string): Promise<boolean> => {
      // Accept 10-digit input or a leading-91 variant; the server normalizes.
      const digits = normalizePhone(rawPhone);
      const phone = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
      setError('');
      if (!validatePhone(phone)) {
        setError('Please enter a valid 10-digit mobile number.');
        return false;
      }
      setStatus('sending');
      const result = await postOtp('/api/send-otp', { phone });
      if (result.ok) {
        phoneRef.current = phone;
        setStatus('awaiting-code');
        startCooldown();
        return true;
      }
      // DEBUG-OTP: surface backend failure detail in DevTools console.
      console.log('[CLIENT SEND OTP RESP]:', result.status, result);
      if (result.gatewayError) console.log('[MAGIC_TEXT_GATEWAY_RESPONSE]:', result.gatewayError);
      setError(friendlyOtpError(result.error));
      setStatus('idle');
      return false;
    },
    [startCooldown]
  );

  const verifyOtp = useCallback(async (code: string): Promise<string | null> => {
    const clean = (code || '').trim();
    if (!/^\d{6}$/.test(clean)) {
      setError('Please enter the 6-digit code sent to your phone.');
      return null;
    }
    if (!phoneRef.current) {
      setError('Your session expired. Please tap Resend OTP for a new code.');
      return null;
    }
    setStatus('verifying');
    setError('');
    const result = await postOtp('/api/verify-otp', { phone: phoneRef.current, otp: clean });
    if (result.ok) {
      stopTimer();
      setStatus('verified');
      return phoneRef.current;
    }
    setError(friendlyOtpError(result.error));
    setStatus('awaiting-code');
    return null;
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
    phoneRef.current = '';
    stopTimer();
    setCooldown(0);
    setError('');
    setStatus('idle');
  }, [stopTimer]);

  return { status, error, cooldown, sendOtp, verifyOtp, resendOtp, reset };
}
