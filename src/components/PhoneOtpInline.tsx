import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2, MessageCircle } from 'lucide-react';
import {
  VISIBLE_RECAPTCHA_CONTAINER_ID,
  normalizePhone,
  renderVisibleRecaptchaFallback,
  usePhoneOtp,
} from '../hooks/usePhoneOtp';
import { validatePhone } from '../utils/validation';

interface PhoneOtpInlineProps {
  /** Digits-only mobile number from the parent form's phone field. */
  phone: string;
  /**
   * Fires with the verified 10-digit number on success, and with null
   * whenever the number changes (invalidating verification) or resets.
   * Parent gates its submit button on this value.
   */
  onVerifiedChange: (verifiedPhone: string | null) => void;
}

/**
 * Shared inline phone-verification block. Renders directly beneath the host
 * form's phone input (single-column: Get OTP button → 6-digit input +
 * Verify button → timer/resend row), following the proven inline layout.
 * No modals, no overlays, no form hiding or swapping.
 */
export function PhoneOtpInline({ phone, onVerifiedChange }: PhoneOtpInlineProps) {
  const { status, error, cooldown, needsVisibleCaptcha, sendOtp, verifyOtp, resendOtp, reset } =
    usePhoneOtp();
  const [code, setCode] = useState('');
  const digits = normalizePhone(phone);
  const phoneValid = validatePhone(digits);

  const cbRef = useRef(onVerifiedChange);
  cbRef.current = onVerifiedChange;

  // Any edit to the number invalidates verification and clears OTP state.
  const prevPhoneRef = useRef(digits);
  useEffect(() => {
    if (prevPhoneRef.current !== digits) {
      prevPhoneRef.current = digits;
      setCode('');
      reset();
      cbRef.current(null);
    }
  }, [digits, reset]);

  // Render the visible reCAPTCHA fallback inside this block when Firebase
  // rejects the invisible check.
  useEffect(() => {
    if (needsVisibleCaptcha) {
      renderVisibleRecaptchaFallback();
    }
  }, [needsVisibleCaptcha]);

  const busy = status === 'sending' || status === 'verifying';

  const handleVerify = async () => {
    const verified = await verifyOtp(code);
    if (verified) {
      cbRef.current(verified);
    }
  };

  if (status === 'verified') {
    return (
      <div
        className="mt-2 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-2.5 text-[13px] font-[700] text-emerald-700"
        role="status"
      >
        <CheckCircle2 className="w-4 h-4 shrink-0" />
        <span>✓ Phone Number Verified</span>
      </div>
    );
  }

  return (
    <div className="mt-2">
      {status === 'idle' && (
        <button
          type="button"
          onClick={() => void sendOtp(digits)}
          disabled={!phoneValid}
          className="inline-flex items-center gap-2 rounded-xl border-2 border-[#F15A29] bg-white px-4 py-2.5 font-sora text-[13px] font-[700] text-[#F15A29] transition-all hover:bg-[#FFF0EB] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Get OTP</span>
        </button>
      )}

      {status === 'sending' && (
        <div className="flex items-center gap-2 py-2 text-[13.5px] font-sora font-[600] text-[#666666]">
          <Loader2 className="w-4 h-4 animate-spin text-[#F15A29]" />
          Sending code…
        </div>
      )}

      {(status === 'awaiting-code' || status === 'verifying') && (
        <div className="rounded-2xl border border-[#F0DFCE] bg-[#FFF6EE] p-3.5">
          <label
            htmlFor="phone-otp-code-input"
            className="block text-[12px] font-[600] text-[#444444] mb-2"
          >
            Enter 6-digit OTP sent to +91 {digits}
          </label>
          <div className="flex gap-2">
            <input
              id="phone-otp-code-input"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="••••••"
              value={code}
              disabled={busy}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  void handleVerify();
                }
              }}
              className="flex-1 min-w-0 text-center font-sora text-[18px] font-[800] tracking-[0.4em] indent-[0.4em] text-[#111111] bg-white border-2 border-gray-200 focus:border-[#F15A29] rounded-xl px-3 py-2.5 outline-none transition-colors disabled:opacity-60"
              aria-label="6-digit OTP code"
            />
            <button
              type="button"
              onClick={() => void handleVerify()}
              disabled={busy || code.length !== 6}
              className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-[#F15A29] hover:bg-[#D8481A] text-white font-sora text-[13.5px] font-[700] px-4 py-2.5 transition-all cursor-pointer disabled:opacity-60"
            >
              {status === 'verifying' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : null}
              <span>{status === 'verifying' ? 'Verifying…' : 'Verify OTP'}</span>
            </button>
          </div>

          <div className="mt-2 flex items-center justify-between text-[12.5px] text-[#666666]">
            {cooldown > 0 ? (
              <span>Resend available in {cooldown}s</span>
            ) : (
              <span>
                Didn&apos;t get the code?{' '}
                <button
                  type="button"
                  onClick={() => void resendOtp()}
                  disabled={busy}
                  className="text-[#F15A29] font-bold hover:underline disabled:opacity-50 cursor-pointer"
                >
                  Resend OTP
                </button>
              </span>
            )}
          </div>

          {needsVisibleCaptcha && (
            <div className="mt-2 flex justify-center">
              <div id={VISIBLE_RECAPTCHA_CONTAINER_ID} />
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[12.5px] font-medium">
          {error}
        </div>
      )}

      {needsVisibleCaptcha && status === 'idle' && (
        <div className="mt-2 flex justify-center">
          <div id={VISIBLE_RECAPTCHA_CONTAINER_ID} />
        </div>
      )}
    </div>
  );
}
