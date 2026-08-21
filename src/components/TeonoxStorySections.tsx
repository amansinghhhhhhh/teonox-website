import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import {
  BookOpen,
  Target,
  ShieldCheck,
  Compass,
  Sparkles,
  Zap,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  ArrowUpRight,
  Brain,
  Rocket
} from 'lucide-react';

import whatIsTeonoxImg from '../assets/images/what_is_teonox_1787218678580.webp';
import whyTeonoxImg from '../assets/images/regenerated_image_1785582895360.webp';

interface TeonoxStorySectionsProps {
  onNavigate?: (href: string, label: string) => void;
}

export function TeonoxStorySections({ onNavigate }: TeonoxStorySectionsProps) {
  // Refs for scroll-driven animations per section
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  // Mouse movement parallax state for 3D card tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 90 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Section 01 scroll watermark
  const { scrollYProgress: s1Progress } = useScroll({
    target: section1Ref,
    offset: ['start end', 'end start'],
  });

  return (
    <div
      className="w-full font-['Sora',sans-serif] text-[#111111]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      
      {/* ─────────────────────────────────────────────────────────────────
          SECTION 01: WHAT IS TEONOX? (Light Theme Redesign)
          ───────────────────────────────────────────────────────────────── */}
      <section
        ref={section1Ref}
        id="what-is-teonox"
        className="relative w-full bg-[#FAF8F5] text-[#111111] py-10 sm:py-14 overflow-hidden border-b border-[#EBE4DC]"
      >
        {/* Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(#111111 1px, transparent 1px)`,
              backgroundSize: '28px 28px',
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* LEFT SIDE: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] leading-[1.18] tracking-tight"
              >
                WHAT IS <span className="text-[#F15A29]">TEONOX?</span>
              </motion.h2>

              {/* Highlight Tagline Card */}
              <div className="p-6 sm:p-7 rounded-[22px] bg-white border-l-4 border-l-[#F15A29] border border-[#EBE4DC] shadow-[0_10px_30px_-10px_rgba(241,90,41,0.12)] space-y-2">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="font-sora text-[20px] sm:text-[23px] font-[800] text-[#111111] leading-snug tracking-tight"
                >
                  A School of Marketing, AI and Business for the AI Era.
                </motion.p>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-inter text-[16px] sm:text-[17.5px] text-[#444444] leading-[1.7] font-normal max-w-2xl"
              >
                Build future-ready skills in Marketing, Digital, Business &amp; AI to create careers, grow businesses and lead in the digital economy.
              </motion.p>

              {/* Feature Micro Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { title: "AI Era Education", icon: Brain },
                  { title: "Business Strategy", icon: TrendingUp },
                  { title: "Practical Execution", icon: Zap },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#EAE3DA] shadow-xs text-[#111111] font-sora text-[13.5px] font-[700]">
                    <div className="w-8 h-8 rounded-lg bg-[#FFF0EB] border border-[#F8E3D8] text-[#F15A29] flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="pt-2"
              >
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) {
                      onNavigate('/contact', 'Contact');
                    } else {
                      window.location.href = '/contact';
                    }
                  }}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#111111] hover:bg-[#F15A29] text-white font-sora text-[15px] font-[700] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
                >
                  <span>Talk to a career expert</span>
                  <ArrowUpRight className="w-4.5 h-4.5 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </motion.div>
            </motion.div>

            {/* RIGHT SIDE: Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-5 relative flex justify-center"
            >
              <div className="relative w-full max-w-[420px] lg:max-w-none rounded-[28px] overflow-hidden bg-white border border-[#EBE4DC] p-2.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] group/img">
                <div className="overflow-hidden rounded-[20px]">
                  <img
                    src={whatIsTeonoxImg}
                    alt="Young tech and marketing professionals at TEONOX campus"
                    className="w-full h-[340px] sm:h-[420px] object-cover group-hover/img:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────
          SECTION 02: WHY TEONOX? (Light Theme Redesign)
          ─────────────────────────────────────────────────────────────────
          HIDDEN per request (old "WHY TEONOX?" fox section). Kept as reference —
          wrapped in {false && (...)} so it still type-checks but never renders.
      */}
      {false && (
      <section
        ref={section2Ref}
        id="why-teonox"
        className="relative w-full bg-[#F5F2ED] text-[#111111] py-10 sm:py-14 overflow-hidden border-b border-[#E5DFD7]"
      >
        {/* Background Atmospheric Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(#111111 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* LEFT SIDE: Image Composition */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-5 order-2 lg:order-1 relative flex justify-center"
            >
              <div className="relative w-full max-w-[420px] lg:max-w-none rounded-[28px] overflow-hidden bg-white border border-[#E5DFD7] p-2.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)]">
                <div className="relative overflow-hidden rounded-[20px]">
                  <img
                    src={whyTeonoxImg}
                    alt="Business leader and marketing mentor"
                    className="w-full h-[340px] sm:h-[420px] object-cover hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE: Text Content & Core Statement */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 order-1 lg:order-2 space-y-6"
            >

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] leading-[1.18] tracking-tight"
              >
                WHY <span className="text-[#F15A29]">TEONOX?</span>
              </motion.h2>

              {/* Exact Requested Content Block */}
              <div className="p-7 sm:p-9 rounded-[24px] bg-white border border-[#E5DFD7] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] space-y-5">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="font-sora text-[20px] sm:text-[24px] font-[800] text-[#F15A29] leading-snug tracking-tight"
                >
                  Learning Digital Marketing is Easy, becoming Industry-Ready is Not.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-sora text-[17px] sm:text-[19px] font-[700] text-[#111111] leading-relaxed"
                >
                  And because knowing tools isn&apos;t enough. You need to know how to create growth.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="font-inter text-[15.5px] sm:text-[17px] text-[#555555] leading-[1.75] pt-4 border-t border-[#EAE3DA]"
                >
                  Go beyond theory and certifications. Develop the mindset, business thinking, practical skills and execution capabilities the industry demands.
                </motion.p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      )}

    </div>
  );
}

