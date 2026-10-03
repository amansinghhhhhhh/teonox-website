import { useEffect, useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';
import {
  VISIBLE_RECAPTCHA_CONTAINER_ID,
  normalizePhone,
  renderVisibleRecaptchaFallback,
  usePhoneOtp,
} from '../hooks/usePhoneOtp';

interface PhoneOtpStepProps {
  /** 10-digit mobile number (without +91 prefix). */
  phone: string;
  /** Called with the verified 10-digit number. */
  onVerified: (verifiedPhone: string) => void;
  /** Optional "wrong number? go back" handler. */
  onBack?: () => void;
}

/**
 * Shared phone-verification step. Renders INLINE inside the host form's
 * container (single-column, full-width input + verify button, timer/resend
 * row beneath) — never as a nested floating overlay, so nothing can clip.
 * Follows the proven 49a18e3 inline layout.
 */
export function PhoneOtpStep({ phone, onVerified, onBack }: PhoneOtpStepProps) {
  const { status, error, cooldown, needsVisibleCaptcha, sendOtp, verifyOtp, resendOtp, reset } =
    usePhoneOtp();
  const [code, setCode] = useState('');
  const digits = normalizePhone(phone);

  // Auto-send the code each time the step mounts with a (new) number.
  useEffect(() => {
    setCode('');
    reset();
    if (digits.length === 10) {
      void sendOtp(digits);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits]);

  // Render the visible reCAPTCHA fallback inside the step when Firebase
  // rejects the invisible check.
  useEffect(() => {
    if (needsVisibleCaptcha) {
      renderVisibleRecaptchaFallback();
    }
  }, [needsVisibleCaptcha]);

  const busy = status === 'sending' || status === 'verifying';

  const handleVerify = async () => {
    const verifiedPhone = await verifyOtp(code);
    if (verifiedPhone) {
      onVerified(verifiedPhone);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-full bg-[#FFF0EB] border border-[#F8E3D8] text-[#F15A29] flex items-center justify-center mb-4">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h3 className="font-sora text-[20px] sm:text-[22px] font-[800] text-[#111111] tracking-tight">
          Verify your number
        </h3>
        <p className="font-inter text-[13.5px] text-[#666666] mt-1.5 leading-relaxed">
          We sent a 6-digit code to <span className="font-bold text-[#111111]">+91 {digits}</span>.
          Enter it below to continue.
        </p>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            disabled={busy}
            className="mt-2 inline-flex items-center gap-1 font-inter text-[13px] font-[600] text-[#F15A29] hover:underline disabled:opacity-50 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Wrong number? Edit details
          </button>
        )}
      </div>

      {status === 'sending' && (
        <div className="mt-6 flex items-center justify-center gap-2 text-[14px] font-sora font-[600] text-[#666666]">
          <Loader2 className="w-4 h-4 animate-spin text-[#F15A29]" />
          Sending code…
        </div>
      )}

      {(status === 'awaiting-code' || status === 'verifying' || status === 'verified') && (
        <div className="mt-6">
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="••••••"
            value={code}
            disabled={busy}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void handleVerify();
            }}
            className="w-full text-center font-sora text-[22px] font-[800] tracking-[0.5em] indent-[0.5em] text-[#111111] bg-white border-2 border-gray-200 focus:border-[#F15A29] rounded-xl px-4 py-3 outline-none transition-colors disabled:opacity-60"
            aria-label="6-digit OTP code"
          />

          {error && (
            <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px] font-medium">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={() => void handleVerify()}
            disabled={busy || code.length !== 6}
            className="w-full mt-4 bg-[#F15A29] hover:bg-[#D8481A] text-white font-sora text-[15px] font-[700] py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {status === 'verifying' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying…</span>
              </>
            ) : (
              <span>Verify & Continue</span>
            )}
          </button>

          <div className="mt-3 text-center font-inter text-[13px] text-[#666666]">
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
            <div className="mt-4 flex justify-center">
              <div id={VISIBLE_RECAPTCHA_CONTAINER_ID} />
            </div>
          )}
        </div>
      )}

      {status === 'verified' && (
        <div className="mt-4 flex items-center justify-center gap-2 text-[14px] font-sora font-[700] text-emerald-600">
          <CheckCircle2 className="w-5 h-5" />
          Number verified!
        </div>
      )}
    </div>
  );
}

interface PhoneOtpModalProps {
  open: boolean;
  /** 10-digit mobile number (without +91 prefix). */
  phone: string;
  /** Called with the verified 10-digit number. Parent submits the lead, then closes. */
  onVerified: (verifiedPhone: string) => void;
  onClose: () => void;
}

/**
 * Standalone overlay variant wrapping the shared inline step.
 * Prefer embedding <PhoneOtpStep/> directly inside the host form's container
 * (no nested fixed overlay → no backdrop clipping).
 */
export function PhoneOtpModal({ open, phone, onVerified, onClose }: PhoneOtpModalProps) {
  // Escape closes the modal.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  // Key remounts the step (fresh SMS + timer) each time the modal opens.
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="phone-otp-title"
    >
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-[520px] max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-8 z-10 border border-slate-100">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-all"
          aria-label="Close verification"
        >
          <X className="w-4 h-4" />
        </button>
        <PhoneOtpStep key={phone} phone={phone} onVerified={onVerified} />
      </div>
    </div>
  );
}
