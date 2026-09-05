import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronDown, CheckCircle2, MessageSquare } from 'lucide-react';
import { submitForm } from '../services/formService';
import popupFormImg from '../assets/images/popup_form_image.webp';

interface EnquireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (href: string, label: string) => void;
  defaultCourse?: string;
}

const COURSES = [
  "Business Digital Marketing With AI",
  "Specialization in Search Engine Optimization",
  "Specialization in Social Media Marketing",
  "Specialization in Performance Marketing",
];

export function EnquireModal({ isOpen, onClose, onNavigate, defaultCourse = '' }: EnquireModalProps) {
  const [selectedCourse, setSelectedCourse] = useState<string>(defaultCourse || '');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (defaultCourse) {
      // Find matching course or default
      const matched = COURSES.find(c => c.toLowerCase().includes(defaultCourse.toLowerCase()));
      setSelectedCourse(matched || defaultCourse);
    } else {
      setSelectedCourse('');
    }
  }, [defaultCourse, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) {
      setError('Please select a course');
      return;
    }
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
    if (!agreeTerms) {
      setError('Please accept terms & conditions');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      // Field keys match the legacy "Home Hero Enquiry" payload so the
      // Sheet columns and email template keep working unchanged.
      await submitForm('Home Hero Enquiry', {
        'Full Name': fullName,
        'Email Address': email,
        'Phone Number': phone,
        'Interested In': selectedCourse,
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
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
    setSelectedCourse('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquire-modal-title"
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
        <div className="relative w-full md:w-[46%] bg-orange-50/30 flex flex-col items-center justify-center min-h-[320px] md:min-h-[480px] overflow-hidden border-b md:border-b-0 md:border-r border-[#EDE4DA] p-4 sm:p-6">

          {/* Subtle Background Radial Glow */}

          {/* Counsellor Image */}
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={popupFormImg}
              alt="Career Counsellor"
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
              <div className="mb-6">
                <h3 id="enquire-modal-title" className="font-sora text-[24px] sm:text-[28px] font-[800] text-[#111111] tracking-tight leading-tight">
                  Need Assistance?
                </h3>
                <p className="font-inter text-[14px] sm:text-[15px] font-[500] text-[#666666] mt-1">
                  Get on a call with our senior career counsellor
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px] font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Course Select Dropdown */}
                <div>
                  <label htmlFor="enquire-course" className="block text-[12px] font-bold text-[#444444] uppercase tracking-wider mb-1.5">
                    Select Course *
                  </label>
                  <div className="relative">
                    <select
                      id="enquire-course"
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full appearance-none bg-white border-2 border-[#0066FF] focus:border-[#F15A29] text-[#111111] font-sora text-[14px] sm:text-[15px] font-[600] rounded-xl px-4 py-3.5 pr-10 outline-none transition-colors cursor-pointer"
                    >
                      <option value="" disabled>Select Course</option>
                      {COURSES.map((c, i) => (
                        <option key={i} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0066FF] pointer-events-none" />
                  </div>
                </div>

                {/* Name Input */}
                <div>
                  <label htmlFor="enquire-name" className="block text-[12px] font-bold text-[#444444] uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="enquire-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white border border-gray-300 focus:border-[#F15A29] text-[#111111] font-sora text-[14px] sm:text-[15px] font-[500] rounded-xl px-4 py-3 outline-none transition-colors"
                  />
                </div>

                {/* Email Address Input */}
                <div>
                  <label htmlFor="enquire-email" className="block text-[12px] font-bold text-[#444444] uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="enquire-email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-gray-300 focus:border-[#F15A29] text-[#111111] font-sora text-[14px] sm:text-[15px] font-[500] rounded-xl px-4 py-3 outline-none transition-colors"
                  />
                </div>

                {/* Phone Input with +91 Flag Badge */}
                <div>
                  <label htmlFor="enquire-phone" className="block text-[12px] font-bold text-[#444444] uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <div className="flex rounded-xl border border-gray-300 focus-within:border-[#F15A29] overflow-hidden bg-white transition-colors">
                    <div className="flex items-center gap-1.5 px-3 bg-gray-50 border-r border-gray-200 text-gray-700 font-sora text-[14px] font-bold shrink-0">
                      <span className="text-[16px]">🇮🇳</span>
                      <span>+91</span>
                      <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                    <input
                      id="enquire-phone"
                      type="tel"
                      placeholder="Enter mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      className="w-full px-3.5 py-3 text-[#111111] font-sora text-[14px] sm:text-[15px] font-[500] outline-none"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 mt-1.5 text-[12px] font-medium text-[#25D366]">
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    <span>You will receive updates on WhatsApp</span>
                  </div>
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="terms-check"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-[#F15A29] rounded border-gray-300 focus:ring-[#F15A29] cursor-pointer"
                  />
                  <label htmlFor="terms-check" className="text-[11px] sm:text-[12px] text-gray-500 font-inter leading-tight cursor-pointer">
                    I agree to TEONOX's <a href="/terms-and-conditions" onClick={(e) => { e.preventDefault(); onNavigate?.('/terms-and-conditions', 'Terms & Conditions'); onClose(); }} className="text-[#0066FF] hover:underline font-semibold">T&C</a> and <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); onNavigate?.('/privacy-policy', 'Privacy Policy'); onClose(); }} className="text-[#0066FF] hover:underline font-semibold">Privacy Policy</a>. This consent overrides any DNC/NDNC registrations.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-[#F15A29] hover:bg-[#D8481A] text-white font-sora text-[16px] font-[700] py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  <span>{isSubmitting ? 'Submitting...' : 'Proceed'}</span>
                </button>
              </form>
            </>
          ) : (
            /* SUCCESS STATE */
            <div className="py-8 text-center flex flex-col items-center justify-center animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-sora text-[24px] font-[800] text-[#111111] mb-2">
                Callback Requested!
              </h3>
              <p className="font-inter text-[14px] text-gray-600 max-w-sm mb-6 leading-relaxed">
                Thank you <span className="font-bold text-[#111111]">{fullName}</span>! Our senior career counsellor will call you shortly on <span className="font-bold text-[#F15A29]">+91 {phone}</span> regarding <span className="font-bold text-[#111111]">{selectedCourse}</span>.
              </p>
              <button type="button"
                onClick={handleReset}
                className="bg-[#111111] hover:bg-black text-white font-sora font-bold text-[14px] px-8 py-3 rounded-xl transition-all"
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
