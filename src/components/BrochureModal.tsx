import React, { useState, useEffect, useRef } from 'react';
import { X, Download, CheckCircle2, FileText, Loader2, MessageCircle } from 'lucide-react';
import { submitForm } from '../services/formService';
import popupFormImg from '../assets/images/popup_form_image.webp';

const BROCHURE_PDF_URL = 'https://teonox.com/brochure/teonox-brochure.pdf';

/** Clean phone to digits-only and ensure country code 91 prefix. */
function cleanWhatsAppPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length >= 12) return digits;
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

/** Build a pre-filled WhatsApp wa.me link with brochure message. */
function buildWhatsAppUrl(name: string, phone: string): string {
  const clean = cleanWhatsAppPhone(phone);
  const msg = `Hi ${name}, here is your TEONOX Brochure: ${BROCHURE_PDF_URL}`;
  return `https://wa.me/${clean}?text=${encodeURIComponent(msg)}`;
}

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (href: string, label: string) => void;
  defaultCourse?: string;
}

export function BrochureModal({ isOpen, onClose, defaultCourse = '' }: BrochureModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setError('');
    setIsSubmitted(false);
  }, [isOpen, defaultCourse]);

  // Focus trap + Escape key + focus on open
  useEffect(() => {
    if (!isOpen) return;
    const el = modalRef.current;
    if (el) el.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'Tab' && el) {
        const focusable = el.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setError('Please enter a valid 10-digit WhatsApp number');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      await submitForm('Brochure Download', {
        'Full Name': fullName,
        'Email Address': email,
        'WhatsApp Number': phone,
        'Interested In': defaultCourse || 'General Enquiry',
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      console.error('[BrochureModal] Form submission failed:', err);
      setIsSubmitting(false);
      setError('Something went wrong. Please try again.');
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="brochure-modal-title"
    >
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Modal Card */}
      <div ref={modalRef} tabIndex={-1} className="relative w-full max-w-[920px] bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row border border-slate-100 max-h-[92vh] overflow-y-auto md:overflow-y-visible outline-none">
        {/* Close Button */}
        <button type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 md:bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-all shadow-xs"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT GRAPHIC PANEL */}
        <div className="relative w-full md:w-[46%] bg-orange-50/30 flex flex-col items-center justify-center min-h-[260px] md:min-h-[520px] overflow-hidden border-b md:border-b-0 md:border-r border-[#EDE4DA] p-4 sm:p-6">
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={popupFormImg}
              alt="TEONOX program brochure"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain object-center"
            />
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="w-full md:w-[54%] p-6 sm:p-9 lg:p-10 flex flex-col justify-center">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF0EB] text-[#F15A29] flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 id="brochure-modal-title" className="font-sora text-[24px] sm:text-[28px] font-[800] text-[#111111] tracking-tight leading-tight">
                  Get the Brochure
                </h3>
                <p className="font-inter text-[14px] sm:text-[15px] font-[500] text-[#666666] mt-1.5">
                  Fill in your details and we'll send the brochure to your Email & WhatsApp instantly.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px] font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label htmlFor="brochure-name" className="block text-[12px] font-bold text-[#444444] uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="brochure-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border border-gray-300 focus:border-[#F15A29] text-[#111111] font-sora text-[14px] sm:text-[15px] font-[500] rounded-xl px-4 py-3 outline-none transition-colors"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="brochure-email" className="block text-[12px] font-bold text-[#444444] uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="brochure-email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-gray-300 focus:border-[#F15A29] text-[#111111] font-sora text-[14px] sm:text-[15px] font-[500] rounded-xl px-4 py-3 outline-none transition-colors"
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label htmlFor="brochure-phone" className="block text-[12px] font-bold text-[#444444] uppercase tracking-wider mb-1.5">
                    WhatsApp Number *
                  </label>
                  <div className="flex rounded-xl border border-gray-300 focus-within:border-[#F15A29] overflow-hidden bg-white transition-colors">
                    <div className="flex items-center gap-1.5 px-3 bg-gray-50 border-r border-gray-200 text-gray-700 font-sora text-[14px] font-bold shrink-0">
                      <span className="text-[16px]">🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      id="brochure-phone"
                      type="tel"
                      placeholder="Enter WhatsApp number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full px-3.5 py-3 text-[#111111] font-sora text-[14px] sm:text-[15px] font-[500] outline-none"
                    />
                  </div>
                  <p className="mt-1.5 text-[12px] text-[#888888] font-inter">
                    Please enter your active WhatsApp number to receive the brochure directly on WhatsApp.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-[#F15A29] hover:bg-[#D8481A] text-white font-sora text-[16px] font-[700] py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Get Brochure</span>
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* SUCCESS STATE */
            <div className="py-6 text-center flex flex-col items-center justify-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-sora text-[22px] sm:text-[24px] font-[800] text-[#111111] mb-2 leading-tight">
                Thank you, {fullName}!
              </h3>
              <p className="font-inter text-[14px] text-gray-600 max-w-sm mb-6 leading-relaxed">
                We've emailed your brochure! You can also receive it directly on WhatsApp or download it below.
              </p>
              <div className="flex flex-col gap-3 w-full max-w-sm mx-auto mb-4">
                <a
                  href={BROCHURE_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#F15A29] hover:bg-[#D8481A] text-white font-sora font-[700] text-[14px] py-3 px-6 rounded-xl transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  View / Download Brochure PDF
                </a>
                <a
                  href="https://wa.me/919890004828?text=Hi%20TEONOX%2C%20I%20just%20requested%20the%20brochure"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white font-sora font-[700] text-[14px] py-3 px-6 rounded-xl transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  Chat with Us on WhatsApp
                </a>
              </div>
              <button type="button"
                onClick={handleReset}
                className="bg-[#111111] hover:bg-black text-white font-sora font-bold text-[14px] px-8 py-3 rounded-xl transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}