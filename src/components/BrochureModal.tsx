import React, { useState, useEffect } from 'react';
import { X, Download, CheckCircle2, FileText, Loader2 } from 'lucide-react';
import { submitForm } from '../services/formService';
import popupFormImg from '../assets/images/popup_form_image.webp';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (href: string, label: string) => void;
  defaultCourse?: string;
}

/**
 * Brochure download file. Defaults to a static file shipped with the site at
 * public/brochure/teonox-brochure.pdf, or a hosted PDF via VITE_BROCHURE_URL.
 * When unset the form still captures the lead and shows the success state.
 */
const BROCHURE_DOWNLOAD_URL =
  import.meta.env.VITE_BROCHURE_URL || '/brochure/teonox-brochure.pdf';

/** Trigger the brochure download without leaving the page. */
function triggerBrochureDownload() {
  if (!BROCHURE_DOWNLOAD_URL) return;
  const a = document.createElement('a');
  a.href = BROCHURE_DOWNLOAD_URL;
  a.download = 'TEONOX-Program-Brochure.pdf';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function BrochureModal({ isOpen, onClose, defaultCourse = '' }: BrochureModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setError('');
    setIsSubmitted(false);
  }, [isOpen, defaultCourse]);

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
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      await submitForm('Brochure Download', {
        'Full Name': fullName,
        'Email Address': email,
        'Phone Number': phone,
        'Interested In': defaultCourse || 'General Enquiry',
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
      triggerBrochureDownload();
    } catch {
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Modal Card */}
      <div className="relative w-full max-w-[920px] bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row border border-slate-100 max-h-[92vh] overflow-y-auto md:overflow-y-visible">
        {/* Close Button */}
        <button
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
                <h3 className="font-sora text-[24px] sm:text-[28px] font-[800] text-[#111111] tracking-tight leading-tight">
                  Download the Brochure
                </h3>
                <p className="font-inter text-[14px] sm:text-[15px] font-[500] text-[#666666] mt-1.5">
                  Get the full program brochure — fill in your details and we'll send it right over.
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
                  <label className="block text-[12px] font-bold text-[#444444] uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border border-gray-300 focus:border-[#F15A29] text-[#111111] font-sora text-[14px] sm:text-[15px] font-[500] rounded-xl px-4 py-3 outline-none transition-colors"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-[12px] font-bold text-[#444444] uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-gray-300 focus:border-[#F15A29] text-[#111111] font-sora text-[14px] sm:text-[15px] font-[500] rounded-xl px-4 py-3 outline-none transition-colors"
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-[12px] font-bold text-[#444444] uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <div className="flex rounded-xl border border-gray-300 focus-within:border-[#F15A29] overflow-hidden bg-white transition-colors">
                    <div className="flex items-center gap-1.5 px-3 bg-gray-50 border-r border-gray-200 text-gray-700 font-sora text-[14px] font-bold shrink-0">
                      <span className="text-[16px]">🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="Enter mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full px-3.5 py-3 text-[#111111] font-sora text-[14px] sm:text-[15px] font-[500] outline-none"
                    />
                  </div>
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
                      <span>Submitting...</span>
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
              <h3 className="font-sora text-[24px] font-[800] text-[#111111] mb-2">
                Brochure on its way!
              </h3>
              <p className="font-inter text-[14px] text-gray-600 max-w-sm mb-6 leading-relaxed">
                Thanks <span className="font-bold text-[#111111]">{fullName}</span>! Your
                download is starting now. Our team will also reach out shortly on WhatsApp.
              </p>
              {BROCHURE_DOWNLOAD_URL && (
                <button
                  onClick={triggerBrochureDownload}
                  className="mb-3 bg-[#F15A29] hover:bg-[#D8481A] text-white font-sora font-[700] text-[14px] px-8 py-3 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  Download Brochure
                </button>
              )}
              <button
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