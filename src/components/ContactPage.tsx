import React, { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  MessageCircle,
  Phone,
  Map,
  CheckCircle2,
  Send,
  Users,
  Compass,
  Building,
  User,
  Mail,
  Smartphone,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import { submitForm } from '../services/formService';
import { validateEmail, validatePhone, validateRequired } from '../utils/validation';
import bookCounsellingImg from '../assets/images/contact/book-counselling.webp';
import campusImg from '../assets/images/contact/campus.webp';

interface ContactPageProps {
  onEnquireClick?: (topic?: string) => void;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as any },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as any },
});

export function ContactPage({ onEnquireClick }: ContactPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    program: 'Business Digital Marketing With AI',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const programOptions = [
    'Business Digital Marketing With AI',
    'Specialization in Search Engine Optimization',
    'Specialization in Social Media Marketing',
    'Specialization in Performance Marketing',
    'Career Counselling & Admissions Enquiry',
    'Campus Visit Booking',
    'Hire Talent / Corporate Training',
    'Other / General Enquiry',
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation (mirrors the legacy teonox form rules)
    if (!validateRequired(formData.fullName)) {
      setError('Full Name is required.');
      return;
    }
    if (!validateRequired(formData.email) || !validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validateRequired(formData.phone) || !validatePhone(formData.phone)) {
      setError('Please enter a valid 10-digit Indian phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Field keys match the legacy "Contact Page" payload so the Sheet
      // columns and email template keep working unchanged.
      await submitForm('Contact Page', {
        'Full Name': formData.fullName,
        'Email Address': formData.email,
        'Phone Number': formData.phone,
        City: formData.city,
        'Interested In': formData.program,
        'Your Message': formData.message,
      });
      setIsSubmitting(false);
      setSubmitted(true);
    } catch {
      setIsSubmitting(false);
      setError('Something went wrong. Please try again.');
    }
  };

  const scrollToMap = () => {
    const mapElement = document.getElementById('campus-map-section');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToForm = () => {
    const formElement = document.getElementById('contact-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenWhatsApp = () => {
    window.open('https://wa.me/918087177760?text=Hello%20TEONOX%20Team%2C%20I%20would%20like%20to%20know%20more%20about%20your%20programs.', '_blank');
  };

  const handleOpenGoogleMaps = () => {
    window.open('https://maps.app.goo.gl/1EPnX5kVCPbZsTP16', '_blank');
  };

  return (
    <div className="bg-white text-[#111111] min-h-screen pt-20 sm:pt-24 pb-0 font-['Sora',sans-serif] relative overflow-hidden">
      {/* Subtle Background Orange Glow */}

      <div className="w-[85%] max-w-7xl mx-auto relative z-10 space-y-16 sm:space-y-24">
        {/* ────────────────────────────────────────
            SECTION 01 - HERO
            ──────────────────────────────────────── */}
        <section className="text-center py-8 sm:py-12 relative max-w-4xl mx-auto">
          {/* Background Glow behind heading */}

          {/* Heading */}
          <motion.h1 {...fadeUp(0.08)} className="font-sora text-[36px] sm:text-[52px] md:text-[60px] font-[800] text-[#111111] leading-[1.12] tracking-tight mb-6 relative z-10">
            Let's Talk About Your Future
          </motion.h1>

          {/* Paragraph */}
          <motion.p {...fadeUp(0.15)} className="font-inter text-[16px] sm:text-[19px] text-[#666666] leading-[1.7] max-w-2xl mx-auto mb-10 relative z-10">
            Whether you're exploring our programs, planning your career, or looking to visit our campus, our team is here to help every step of the way.
          </motion.p>

          {/* 3 CTA Buttons Row */}
          <motion.div {...fadeUp(0.22)} className="flex flex-wrap items-center justify-center gap-4 relative z-10">
            {/* Primary Button */}
            <button
              onClick={() => (onEnquireClick ? onEnquireClick('Book Counselling') : scrollToForm())}
              className="px-7 py-3.5 rounded-full bg-[#F15A29] hover:bg-[#D8420F] text-white font-sora font-[700] text-[15px] transition-all duration-300 shadow-md shadow-[#F15A29]/25 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              Book a Counselling Session
            </button>

            {/* Secondary Button */}
            <button
              onClick={scrollToMap}
              className="px-7 py-3.5 rounded-full bg-[#111111] hover:bg-[#201A17] text-white font-sora font-[600] text-[15px] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              Visit Our Campus
            </button>

            {/* Outline Button */}
            <button
              onClick={scrollToForm}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-[#FFF0EB] text-[#111111] font-sora font-[600] text-[15px] border border-[#EFEFEF] hover:border-[#F8E3D8] transition-all duration-300 shadow-xs hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              Get in Touch
            </button>
          </motion.div>
        </section>

        {/* ────────────────────────────────────────
            SECTION 02 - CONTACT OPTIONS
            ──────────────────────────────────────── */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1: Campus Location */}
            <motion.div {...fadeUp(0)} className="card-premium bg-white rounded-3xl border border-[#EFEFEF] p-8 sm:p-10 shadow-sm hover:border-[#F15A29]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFF0EB] border border-[#F8E3D8] text-[#F15A29] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <p className="font-mono text-[12px] font-[700] uppercase tracking-wider text-[#F15A29] mb-1">
                  Campus Location
                </p>
                <h3 className="font-sora text-[22px] sm:text-[24px] font-[800] text-[#111111] mb-3">
                  TEONOX Campus
                </h3>
                <p className="font-inter text-[15px] text-[#666666] leading-relaxed mb-6">
                  Office No. 13, 4th Floor, Revolution Mall, Near City Pride Multiplex, Kothrud, Pune – 411038.
                </p>
              </div>
              <button
                onClick={handleOpenGoogleMaps}
                className="w-full sm:w-auto self-start px-6 py-3 rounded-full bg-[#111111] hover:bg-[#F15A29] text-white font-sora font-[600] text-[14px] transition-all duration-300 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Get Directions</span>
                <Compass className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Card 2: WhatsApp */}
            <motion.div {...fadeUp(0.1)} className="card-premium bg-white rounded-3xl border border-[#EFEFEF] p-8 sm:p-10 shadow-sm hover:border-[#F15A29]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8F8EF] border border-[#C5EEDA] text-[#10B981] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <p className="font-mono text-[12px] font-[700] uppercase tracking-wider text-[#10B981] mb-1">
                  WhatsApp
                </p>
                <h3 className="font-sora text-[22px] sm:text-[24px] font-[800] text-[#111111] mb-3">
                  Have a quick question?
                </h3>
                <p className="font-inter text-[15px] text-[#666666] leading-relaxed mb-6">
                  Chat with our admissions team for instant assistance.
                </p>
              </div>
              <button
                onClick={handleOpenWhatsApp}
                className="w-full sm:w-auto self-start px-6 py-3 rounded-full bg-[#10B981] hover:bg-[#059669] text-white font-sora font-[600] text-[14px] transition-all duration-300 shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Chat on WhatsApp</span>
                <MessageCircle className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Card 3: Call Us */}
            <motion.div {...fadeUp(0.2)} className="card-premium bg-white rounded-3xl border border-[#EFEFEF] p-8 sm:p-10 shadow-sm hover:border-[#F15A29]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFF0EB] border border-[#F8E3D8] text-[#F15A29] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <p className="font-mono text-[12px] font-[700] uppercase tracking-wider text-[#F15A29] mb-1">
                  Call Us
                </p>
                <h3 className="font-sora text-[22px] sm:text-[24px] font-[800] text-[#111111] mb-2">
                  Speak directly with a Career Advisor.
                </h3>
                <p className="font-sora text-[18px] font-[700] text-[#111111] mb-6">
                  Phone: <a href="tel:+918087177760" className="text-[#F15A29] hover:underline">+91 80871 77760</a>
                </p>
              </div>
              <a
                href="tel:+918087177760"
                className="w-full sm:w-auto self-start px-6 py-3 rounded-full bg-[#111111] hover:bg-[#F15A29] text-white font-sora font-[600] text-[14px] transition-all duration-300 shadow-xs inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Call Now</span>
                <Phone className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ────────────────────────────────────────
            SECTION 03 - COUNSELLING
            ──────────────────────────────────────── */}
        <section className="bg-[#FFF0EB]/50 rounded-3xl border border-[#F8E3D8] p-8 sm:p-12 md:p-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div {...fadeUp(0)} className="space-y-6">
              <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] leading-[1.18] tracking-tight">
                Book a Counselling Session
              </h2>

              <p className="font-sora text-[15px] sm:text-[17px] font-[500] text-[#555555] leading-relaxed">
                Schedule a one-on-one session with our Career Advisors to discuss programs, admissions, fees, and career opportunities.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => (onEnquireClick ? onEnquireClick('Book Counselling') : scrollToForm())}
                  className="px-8 py-4 rounded-full bg-[#F15A29] hover:bg-[#D8420F] text-white font-sora font-[700] text-[15px] transition-all duration-300 shadow-md shadow-[#F15A29]/25 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <span>Book Counselling</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Right Image Area */}
            <motion.div {...fadeUp(0.15)} className="relative">
              <div className="rounded-2xl overflow-hidden border border-[#F8E3D8] shadow-lg bg-white relative aspect-[4/3] group">
                <img
                  src={bookCounsellingImg}
                  alt="Book a Counselling Session"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ────────────────────────────────────────
            SECTION 04 - CAMPUS VISIT
            ──────────────────────────────────────── */}
        <section className="bg-white rounded-3xl border border-[#EFEFEF] p-8 sm:p-12 md:p-16 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image Placeholder */}
            <motion.div {...fadeUp(0)} className="order-2 lg:order-1 relative">
              <div className="rounded-2xl overflow-hidden border border-[#EFEFEF] shadow-lg bg-white aspect-[4/3] relative group">
                <img
                  src={campusImg}
                  alt="TEONOX Campus"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/50 text-[12px] font-sora font-bold text-[#111111] flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-[#F15A29]" />
                  <span>Kothrud Campus, Pune</span>
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div {...fadeUp(0.15)} className="order-1 lg:order-2 space-y-6">
              <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] leading-[1.18] tracking-tight">
                Campus Visit
              </h2>

              <p className="font-sora text-[15px] sm:text-[17px] font-[500] text-[#555555] leading-relaxed">
                Experience TEONOX in person.
              </p>

              {/* Feature List */}
              <div className="space-y-3.5 pt-2">
                {[
                  'Explore the campus',
                  'Meet our mentors',
                  'Attend a live session',
                  'Interact with the admissions team',
                ].map((item, idx) => (
                  <motion.div key={idx} {...fadeUp(0.06 * idx)} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FFF0EB] border border-[#F8E3D8] text-[#F15A29] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="font-sora text-[15px] font-[600] text-[#111111]">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => (onEnquireClick ? onEnquireClick('Book Campus Visit') : scrollToForm())}
                  className="px-8 py-4 rounded-full bg-[#F15A29] hover:bg-[#D8420F] text-white font-sora font-[700] text-[15px] transition-all duration-300 shadow-md shadow-[#F15A29]/25 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <span>Book Campus Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ────────────────────────────────────────
            SECTION 05 - CONTACT FORM
            ──────────────────────────────────────── */}
        <section id="contact-form-section" className="scroll-mt-32">
          {/* Center aligned heading */}
          <motion.div {...fadeUp(0)} className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-sora text-[32px] sm:text-[44px] font-[800] text-[#111111] leading-[1.15] tracking-tight">
              Send Us a Message
            </h2>
          </motion.div>

          {/* Premium Minimal Container */}
          <motion.div {...fadeUp(0.12)} className="card-premium bg-white rounded-3xl border border-[#EFEFEF] p-8 sm:p-12 shadow-xl max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F15A29]/5 rounded-bl-full pointer-events-none" />

            {submitted ? (
              <div className="py-12 text-center space-y-5">
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                  className="w-20 h-20 rounded-full bg-[#FFF0EB] border border-[#F8E3D8] text-[#F15A29] flex items-center justify-center mx-auto shadow-xs"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>
                <h3 className="font-sora text-2xl sm:text-3xl font-[800] text-[#111111]">
                  Message Received!
                </h3>
                <p className="font-inter text-[16px] text-[#666666] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to TEONOX. Our admissions team will get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setError('');
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      city: '',
                      program: 'Executive PG Program in AI & Performance Marketing',
                      message: '',
                    });
                  }}
                  className="mt-6 px-8 py-3.5 rounded-full bg-[#111111] hover:bg-[#F15A29] text-white font-sora font-[600] text-sm transition-all duration-300 cursor-pointer shadow-xs"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Field 1: Full Name */}
                <div className="space-y-1.5">
                  <label className="block font-sora text-[13px] font-[600] text-[#111111]">
                    Full Name <span className="text-[#F15A29]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#A0A0A0] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-[#EFEFEF] font-inter text-[15px] text-[#111111] placeholder-[#A8A8A8] focus:outline-none focus:border-[#F15A29] focus:ring-4 focus:ring-[#F15A29]/10 transition-all bg-[#FAF8F5]/40 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Grid Row: Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Field 2: Email Address */}
                  <div className="space-y-1.5">
                    <label className="block font-sora text-[13px] font-[600] text-[#111111]">
                      Email Address <span className="text-[#F15A29]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#A0A0A0] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        required
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-[#EFEFEF] font-inter text-[15px] text-[#111111] placeholder-[#A8A8A8] focus:outline-none focus:border-[#F15A29] focus:ring-4 focus:ring-[#F15A29]/10 transition-all bg-[#FAF8F5]/40 focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Field 3: Phone Number */}
                  <div className="space-y-1.5">
                    <label className="block font-sora text-[13px] font-[600] text-[#111111]">
                      Phone Number <span className="text-[#F15A29]">*</span>
                    </label>
                    <div className="relative">
                      <Smartphone className="w-4 h-4 text-[#A0A0A0] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-[#EFEFEF] font-inter text-[15px] text-[#111111] placeholder-[#A8A8A8] focus:outline-none focus:border-[#F15A29] focus:ring-4 focus:ring-[#F15A29]/10 transition-all bg-[#FAF8F5]/40 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Field 4: City */}
                <div className="space-y-1.5">
                  <label className="block font-sora text-[13px] font-[600] text-[#111111]">
                    City
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-[#A0A0A0] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="e.g. Pune, Mumbai, Bangalore"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-[#EFEFEF] font-inter text-[15px] text-[#111111] placeholder-[#A8A8A8] focus:outline-none focus:border-[#F15A29] focus:ring-4 focus:ring-[#F15A29]/10 transition-all bg-[#FAF8F5]/40 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Field 5: Program Interested In (Dropdown) */}
                <div className="space-y-1.5">
                  <label className="block font-sora text-[13px] font-[600] text-[#111111]">
                    Program Interested In
                  </label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl border border-[#EFEFEF] font-inter text-[15px] text-[#111111] focus:outline-none focus:border-[#F15A29] focus:ring-4 focus:ring-[#F15A29]/10 transition-all bg-[#FAF8F5]/40 focus:bg-white cursor-pointer"
                  >
                    {programOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Field 6: Message (Textarea) */}
                <div className="space-y-1.5">
                  <label className="block font-sora text-[13px] font-[600] text-[#111111]">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-[#A0A0A0] absolute left-4 top-4 pointer-events-none" />
                    <textarea
                      rows={4}
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-[#EFEFEF] font-inter text-[15px] text-[#111111] placeholder-[#A8A8A8] focus:outline-none focus:border-[#F15A29] focus:ring-4 focus:ring-[#F15A29]/10 transition-all resize-none bg-[#FAF8F5]/40 focus:bg-white"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px] font-medium">
                    {error}
                  </div>
                )}

                {/* Primary Button: Send Message */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-full bg-[#F15A29] hover:bg-[#D8420F] text-white font-sora font-[700] text-[15px] tracking-wide shadow-md shadow-[#F15A29]/25 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75 group"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </motion.div>
        </section>

        {/* ────────────────────────────────────────
            SECTION 06 - MAP
            ──────────────────────────────────────── */}
        <section id="campus-map-section" className="scroll-mt-32 space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-sora text-[32px] sm:text-[40px] font-[800] text-[#111111] leading-[1.18] tracking-tight">
              Visit Our Campus
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Side Location Info Card */}
            <motion.div {...fadeUp(0)} className="lg:col-span-5 bg-white rounded-3xl border border-[#EFEFEF] p-6 sm:p-8 shadow-lg flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-5">
                {/* Header Badge & Rating */}
                <div className="flex items-center justify-end gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-[#FFF8E7] px-3 py-1 rounded-full border border-[#FDE3A7]">
                    <span className="text-amber-500 text-xs">★</span>
                    <span className="font-sora text-xs font-bold text-[#111111]">4.9</span>
                    <span className="font-inter text-[11px] text-[#666666]">(550+ Reviews)</span>
                  </div>
                </div>

                {/* Location Title & Address */}
                <div>
                  <h3 className="font-sora text-[22px] sm:text-[26px] font-[800] text-[#111111] mb-2">
                    TEONOX Campus
                  </h3>
                  <p className="font-inter text-[14.5px] text-[#444444] leading-relaxed">
                    Office No. 13, 4th Floor, Revolution Mall, Paschimanagri, Near City Pride Multiplex, Kothrud, Pune, Maharashtra – 411038
                  </p>
                </div>

                {/* Quick Info Items */}
                <div className="space-y-3 pt-2 border-t border-[#F5F5F5]">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FFF0EB] border border-[#F8E3D8] text-[#F15A29] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-sora text-xs font-bold text-[#111111]">Landmark</p>
                      <p className="font-inter text-xs text-[#666666]">Near City Pride Multiplex, Kothrud</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FFF0EB] border border-[#F8E3D8] text-[#F15A29] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-sora text-xs font-bold text-[#111111]">Direct Line</p>
                      <a href="tel:+918087177760" className="font-inter text-xs text-[#F15A29] font-semibold hover:underline">
                        +91 80871 77760
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FFF0EB] border border-[#F8E3D8] text-[#F15A29] flex items-center justify-center shrink-0 mt-0.5">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-sora text-xs font-bold text-[#111111]">Campus Hours</p>
                      <p className="font-inter text-xs text-[#666666]">Monday – Saturday: 9:00 AM – 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 space-y-2.5 border-t border-[#F5F5F5] mt-6">
                <button
                  onClick={handleOpenGoogleMaps}
                  className="w-full py-3.5 px-6 rounded-full bg-[#F15A29] hover:bg-[#D8420F] text-white font-sora font-[700] text-[14px] transition-all duration-300 shadow-md shadow-[#F15A29]/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Get Directions on Google Maps</span>
                </button>

                <a
                  href="https://maps.app.goo.gl/1EPnX5kVCPbZsTP16"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-6 rounded-full bg-[#111111] hover:bg-[#201A17] text-white font-sora font-[600] text-[13px] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Map className="w-3.5 h-3.5 text-[#F15A29]" />
                  <span>Open maps.app.goo.gl Location</span>
                </a>
              </div>
            </motion.div>

            {/* Embedded Map Section */}
            <motion.div {...fadeUp(0.15)} className="lg:col-span-7 rounded-3xl border border-[#EFEFEF] overflow-hidden shadow-lg min-h-[420px] lg:min-h-[100%] bg-[#FAF8F5] relative group">
              {/* Floating Google Maps Style Card on top left of map */}
              <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 shadow-md max-w-[280px] hidden sm:block">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-sora text-sm font-bold text-[#111111]">Revolution Mall</h4>
                    <p className="font-inter text-[11px] text-[#666666]">Paschimanagri, Kothrud, Pune, 411038</p>
                    <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-500 font-bold">
                      <span>4.0 ★★★★★ (554)</span>
                    </div>
                  </div>
                  <a
                    href="https://maps.app.goo.gl/1EPnX5kVCPbZsTP16"
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-full bg-[#F15A29] text-white flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                    title="Get Directions"
                  >
                    <Compass className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <iframe
                title="TEONOX Campus Location - Revolution Mall Kothrud Pune"
                src="https://maps.google.com/maps?q=Revolution%20Mall,%20Paschimanagri,%20Kothrud,%20Pune,%20Maharashtra%20411038&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '420px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full transition-all duration-300"
              />
            </motion.div>
          </div>
        </section>

        </div>

      {/* ────────────────────────────────────────
          FOOTER CTA (FULL WIDTH)
          ──────────────────────────────────────── */}
      <motion.section {...scaleIn(0)} className="mt-12 sm:mt-16 bg-[#201A17] text-white px-6 sm:px-16 py-16 sm:py-24 text-center relative overflow-hidden">

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <h2 className="font-sora text-[32px] sm:text-[48px] font-[800] text-white leading-[1.15] tracking-tight">
            Ready to Build Your Future?
          </h2>

          <p className="font-inter text-[16px] sm:text-[18px] text-[#A79885] max-w-xl mx-auto leading-relaxed">
            Talk to our team today and take the first step toward your career.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => (onEnquireClick ? onEnquireClick('Book Counselling') : scrollToForm())}
              className="px-8 py-4 rounded-full bg-[#F15A29] hover:bg-[#D8420F] text-white font-sora font-[700] text-[15px] transition-all duration-300 shadow-lg shadow-[#F15A29]/30 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              Book Counselling
            </button>

            <button
              onClick={handleOpenWhatsApp}
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-sora font-[600] text-[15px] border border-white/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#10B981]" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
