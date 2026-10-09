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
      if (code && code.startsWith('non_json_response_http_')) {
        return `Server returned an unreadable response (HTTP ${code.replace('non_json_response_http_', '')}). Please try again.`;
      }
      return 'Something went wrong. Please try again.';
  }
}

export type OtpStatus = 'idle' | 'sending' | 'awaiting-code' | 'verifying' | 'verified';

// Apps Script web-app URL (public exec URL, NOT a secret). When set, OTP
// calls go there via JSONP — the only cross-origin pattern that can READ an
// Apps Script response (it 302-redirects, which plain fetch() cannot read
// due to CORS). Empty = use same-origin Express /api/* (Node build).
const OTP_API_URL = (import.meta.env.VITE_OTP_API_URL as string | undefined) || '';

type OtpResult = { ok: boolean; status: number; error?: string; phone?: string; gatewayError?: string };

// JSONP GET helper: resolves even if the script 404s (onerror) or hangs (20s cap).
function jsonpGet(params: Record<string, string>): Promise<OtpResult> {
  return new Promise((resolve) => {
    const cb = `__otpCb_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    let settled = false;
    const cleanup = () => {
      window.clearTimeout(timer);
      try {
        delete (window as unknown as Record<string, unknown>)[cb];
      } catch {
        // ignore
      }
      script.remove();
    };
    const finish = (result: OtpResult) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(result);
    };
    const timer = window.setTimeout(() => finish({ ok: false, status: 0, error: 'network_error' }), 20000);
    (window as unknown as Record<string, unknown>)[cb] = (data: unknown) => {
      const d = (data || {}) as { ok?: boolean; error?: string; phone?: string; gatewayError?: string };
      finish({
        ok: d.ok === true,
        status: 200,
        error: typeof d.error === 'string' ? d.error : undefined,
        phone: typeof d.phone === 'string' ? d.phone : undefined,
        gatewayError: typeof d.gatewayError === 'string' ? d.gatewayError : undefined,
      });
    };
    const script = document.createElement('script');
    script.onerror = () => finish({ ok: false, status: 0, error: 'network_error' });
    const q = new URLSearchParams({ ...params, callback: cb }).toString();
    script.src = `${OTP_API_URL}${OTP_API_URL.includes('?') ? '&' : '?'}${q}`;
    document.head.appendChild(script);
  });
}

async function postOtp(path: string, body: Record<string, string>): Promise<OtpResult> {
  if (OTP_API_URL) {
    return jsonpGet({ action: path.includes('verify') ? 'verifyOtp' : 'sendOtp', ...body });
  }
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    // If the body is not JSON at all (proxy/empty/HTML response), log the
    // raw body so we can see WHO answered (Node API vs static fallback),
    // and surface an explicit error instead of undefined keys.
    const rawText = await res.text().catch(() => '');
    let data: { ok?: boolean; error?: string; phone?: string; gatewayError?: string } | null = null;
    try {
      data = JSON.parse(rawText);
    } catch {
      data = null;
    }
    if (!data) {
      console.log('[SEND OTP RAW BODY]:', rawText.slice(0, 200));
      return { ok: false, status: res.status, error: `non_json_response_http_${res.status}` };
    }
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
