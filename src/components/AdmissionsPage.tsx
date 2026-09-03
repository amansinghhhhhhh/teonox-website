import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView } from 'motion/react';
import admissionsHeroImg from '../assets/images/admissions/admissions_hero.webp';
import {
  CheckCircle2, ArrowUpRight, HelpCircle, Laptop, Globe, MessageSquare,
  Clock, Compass, FileCheck, GraduationCap, Award, Users, BookOpen,
  DollarSign, PhoneCall, ShieldCheck, ChevronRight, Lightbulb, Wallet,
} from 'lucide-react';
import { SEO } from './SEO';
import { BreadcrumbSchema } from './schema/BreadcrumbSchema';

interface AdmissionsPageProps {
  onEnquireClick: (topic?: string) => void;
  onExplorePrograms: () => void;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as any },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.88 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as any },
});

/* Count-up number that animates when scrolled into view - used for the stats strip */
function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const duration = 1400;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* Button that gently follows the cursor within its bounds - premium micro-interaction */
function MagneticButton({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

export function AdmissionsPage({ onEnquireClick, onExplorePrograms }: AdmissionsPageProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.4'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const prerequisites = [
    { title: 'Basic Computer & Internet Skills', desc: 'Comfortable navigating computers, standard operating systems, and basic digital tools.', icon: Laptop },
    { title: 'Digital & Web Literacy', desc: 'Ability to browse websites, search effectively, and use common online applications.', icon: Globe },
    { title: 'Communication Skills', desc: 'Basic written and verbal communication skills to participate in discussions and presentations.', icon: MessageSquare },
    { title: 'Hardware & Connectivity', desc: 'Access to a working laptop/desktop and a reliable high-speed internet connection.', icon: ShieldCheck },
    { title: 'Practice & Hands-On Effort', desc: 'Willingness to practice outside classroom sessions and build practical campaign projects.', icon: Clock },
    { title: 'Curiosity for Business & AI', desc: 'A genuine curiosity about Marketing, Business Strategy, Technology and Artificial Intelligence.', icon: Lightbulb },
    { title: 'Project Commitment', desc: 'Commitment to completing assignments, simulations, and real brand portfolio projects.', icon: FileCheck },
  ];

  const admissionSteps = [
    { num: '01', title: 'Explore', desc: 'Choose the program aligned with your career goals and interest areas.', icon: Compass, tag: 'Step 1' },
    { num: '02', title: 'Inquiry', desc: 'Connect with us to explore courses, specializations, fees and career opportunities.', icon: PhoneCall, tag: 'Step 2' },
    { num: '03', title: 'Counselling', desc: 'Get personalized guidance to choose the right program based on your goals and interests.', icon: Users, tag: 'Step 3' },
    { num: '04', title: 'Apply', desc: 'Complete the simple application and eligibility review process.', icon: FileCheck, tag: 'Step 4' },
    { num: '05', title: 'Assessment', desc: 'Understand your current skills, aptitude and learning needs through a basic assessment.', icon: HelpCircle, tag: 'Step 5' },
    { num: '06', title: 'Explore Scholarships', desc: 'Eligible students may apply for available scholarship options and financial aid.', icon: Award, tag: 'Step 6' },
    { num: '07', title: 'Admission', desc: 'Complete the application, documentation and enrolment formalities securely.', icon: ShieldCheck, tag: 'Step 7' },
    { num: '08', title: 'Orientation', desc: 'Meet your trainers, understand the curriculum, learning methodology and expectations.', icon: BookOpen, tag: 'Step 8' },
    { num: '09', title: 'Classes Begin', desc: 'Start your journey with practical learning, industry exposure and hands-on application.', icon: GraduationCap, tag: 'Final Step' },
  ];

  const valueBadges = [
    { icon: CheckCircle2, title: 'No Coding Needed', sub: 'Open for all streams' },
    { icon: Award, title: 'Scholarships', sub: 'Merit-based aid' },
    { icon: Users, title: '1-on-1 Guidance', sub: 'Personalized counselling' },
    { icon: GraduationCap, title: 'Practical Learning', sub: 'Live brand projects' },
  ];

  return (
    <div className="pt-20 pb-0 bg-white text-[#201A17] min-h-screen overflow-x-hidden">
      <SEO
        title="Admissions | TEONOX"
        description="Apply for TEONOX admissions — AI-integrated digital marketing courses in Pune with assured placement. Learn from 12+ year experience faculty, 50+ tools, and practical training."
        canonical="/admissions"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Admissions — TEONOX',
          url: 'https://teonox.com/admissions',
        }}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Admissions', path: '/admissions' },
      ]} />
      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#FFF8F5] via-white to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#F15A29_0.7px,transparent_0.7px)] [background-size:30px_30px] opacity-[0.03] pointer-events-none" />

        <div className="w-[88%] max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <h1 className="font-sora text-[28px] sm:text-[36px] lg:text-[46px] font-[900] text-[#111111] tracking-tight leading-[1.15]">
                Your Journey at TEONOX <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A2B] to-[#D8420F]">Starts Here</span>
              </h1>

              <p className="font-inter text-[15px] sm:text-[17px] text-[#444444] font-[450] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                From your first inquiry to your first class, we make every step clear, simple and focused on your future. Whether you are a student, working professional, or entrepreneur, TEONOX provides a structured admissions pathway to launch your career in the Digital & AI economy.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onEnquireClick('Admissions Counselling')}
                  className="group px-7 py-3.5 rounded-full bg-[#FF6A2B] hover:bg-[#D8420F] text-white font-sora text-sm sm:text-base font-semibold shadow-lg shadow-[#FF6A2B]/25 hover:shadow-xl hover:shadow-[#FF6A2B]/35 transition-all flex items-center gap-2 active:scale-95 hover:-translate-y-0.5"
                >
                  <span>Talk to TEONOX</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
                <button
                  onClick={onExplorePrograms}
                  className="px-7 py-3.5 rounded-full bg-white border border-[#F0DFCE] text-[#201A17] hover:border-[#FF6A2B] hover:bg-[#FFF6EE] font-sora text-sm sm:text-base font-semibold transition-all flex items-center gap-2 shadow-xs hover:-translate-y-0.5"
                >
                  <span>Explore Programs</span>
                  <ChevronRight className="w-5 h-5 text-[#FF6A2B]" />
                </button>
              </div>

              {/* Value Badges - pop in with stagger + subtle float on hover */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {valueBadges.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <motion.div key={b.title} {...scaleIn(0.15 + i * 0.08)}
                      className="p-4 rounded-2xl bg-white border border-[#F0DFCE] shadow-xs hover:border-[#FF6A2B]/50 hover:shadow-md transition-all duration-300 flex items-center gap-3.5 group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#FFF0EB] text-[#FF6A2B] flex items-center justify-center shrink-0 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg] transition-transform duration-300">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-sora text-sm font-bold text-[#111111] block leading-snug">{b.title}</span>
                        <span className="font-inter text-[11px] sm:text-xs text-[#666666] leading-snug">{b.sub}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#F0DFCE] shadow-2xl aspect-[4/3] max-h-[380px] sm:max-h-[420px]">
                <img
                  src={admissionsHeroImg}
                  alt="Students receiving admissions counselling at TEONOX"
                  className="w-full h-full object-cover object-[15%_center]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          COUNT-UP STATS STRIP (unique to this page)
      ═══════════════════════════════════════ */}
      <section className="py-8 sm:py-10 bg-[#201A17] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,106,43,0.06)_1px,transparent_1px)] [background-size:26px_26px] pointer-events-none" />
        <div className="w-[88%] max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 divide-x divide-white/10">
            {[
              { value: 12, suffix: '+', label: 'Years of Industry Legacy' },
              { value: 50, suffix: '+', label: 'AI & Business Tools Taught' },
              { value: 9, suffix: '', label: 'Simple Admission Steps' },
              { value: 100, suffix: '%', label: 'Practical, Execution-Led' },
            ].map((stat, i) => (
              <motion.div key={stat.label} {...fadeUp(i * 0.1)} className="text-center py-6 px-3">
                <div className="font-sora text-[32px] sm:text-[44px] font-[900] text-[#FF6A2B] leading-none mb-2">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-inter text-[12px] sm:text-[13px] text-[#B8ADA2] leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          SECTION 02 - PRE-REQUISITES (Checklist style)
      ═══════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-white border-t border-[#F0DFCE]">
        <div className="w-[88%] max-w-7xl mx-auto">
          <motion.div {...fadeUp(0)} className="max-w-3xl mb-10 space-y-3">
            <h2 className="font-sora text-[28px] sm:text-[40px] font-[900] leading-tight text-[#111111]">
              Course Pre-Requisites <span className="text-[#FF6A2B]">(Eligibility)</span>
            </h2>
            <p className="font-inter text-[15.5px] sm:text-[17px] text-[#444444]">
              No prior Digital Marketing experience is required. The program progresses from foundational concepts toward advanced applications.
            </p>
          </motion.div>

          {/* Highlight Box */}
          <motion.div {...scaleIn(0.1)} className="mb-10 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-[#FFF0EB] to-[#FFF9F5] border border-[#FFD8C0] flex items-center gap-4 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6A2B]/8 rounded-bl-full pointer-events-none" />
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#FF6A2B] flex items-center justify-center shrink-0 shadow-lg shadow-[#FF6A2B]/20"
            >
              <CheckCircle2 className="w-5 h-5" />
            </motion.div>
            <div className="relative z-10">
              <h3 className="font-sora text-[17px] sm:text-[19px] font-bold text-[#111111]">Zero Technical or Coding Background Required</h3>
              <p className="font-inter text-[14px] sm:text-[15px] text-[#555555]">A technical or coding background is not mandatory for joining the program. We teach you from the ground up, combining strategic business thinking with user-friendly modern AI tools.</p>
            </div>
          </motion.div>

          {/* Prerequisites Grid - left accent bar style, distinct from other pages' card treatments */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {prerequisites.map((req, index) => {
              const IconComponent = req.icon;
              return (
                <motion.div key={index} {...fadeUp(0.05 * index)}
                  className="relative pl-6 pr-6 py-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-400 group overflow-hidden hover:-translate-y-1"
                >
                  {/* animated left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FFE2CC] group-hover:bg-[#FF6A2B] transition-colors duration-400" />
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#FF6A2B] flex items-center justify-center shrink-0 group-hover:bg-[#FF6A2B] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-sora text-[15.5px] font-bold text-[#111111] mb-1.5 group-hover:text-[#FF6A2B] transition-colors">{req.title}</h3>
                      <p className="font-inter text-[13.5px] text-[#666666] leading-relaxed">{req.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          SECTION 03 - ADMISSION PROCESS (Scroll-Progress Vertical Timeline)
      ═══════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-[#FAFAFC] border-t border-[#F0DFCE] relative overflow-hidden">
        <div className="w-[88%] max-w-5xl mx-auto">

          <motion.div {...fadeUp(0)} className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="font-sora text-[28px] sm:text-[40px] font-[900] leading-tight text-[#111111]">Simple 9-Step Admission Roadmap</h2>
            <p className="font-inter text-[15.5px] sm:text-[17px] text-[#555555]">A transparent, step-by-step roadmap to guide you from your initial inquiry to your first class.</p>
          </motion.div>

          {/* Vertical scroll-progress timeline */}
          <div ref={timelineRef} className="relative">
            {/* Track (background line) — aligned to the center axis of the 56px node circles (28px) */}
            <div className="absolute left-[26.5px] sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-[3px] bg-[#EFEBE4] rounded-full" />
            {/* Animated fill line, grows with scroll */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-[26.5px] sm:left-1/2 sm:-translate-x-1/2 top-0 w-[3px] bg-gradient-to-b from-[#FF6A2B] to-[#FFB27A] rounded-full origin-top"
            />

            <div className="space-y-10 sm:space-y-14">
              {admissionSteps.map((step, idx) => {
                const IconComp = step.icon;
                const isLeft = idx % 2 === 0;
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative flex items-start sm:items-center gap-5 sm:gap-0 ${
                      isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    }`}
                  >
                    {/* Node */}
                    <div className="relative z-10 shrink-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                      <motion.div
                        initial={{ rotate: -20 }}
                        whileInView={{ scale: [0.6, 1.15, 1], rotate: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                        whileHover={{ rotate: [-4, 4, 0], transition: { duration: 0.4 } }}
                        className="w-14 h-14 rounded-2xl bg-white border-2 border-[#FF6A2B] shadow-lg shadow-[#FF6A2B]/20 flex items-center justify-center text-[#FF6A2B]"
                      >
                        <IconComp className="w-6 h-6" />
                      </motion.div>
                    </div>

                    {/* Card */}
                    <div className={`flex-1 sm:w-[calc(50%-3rem)] ${isLeft ? 'sm:pr-4' : 'sm:pl-4'}`}>
                      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:border-[#FF6A2B] hover:shadow-xl transition-all duration-400 group relative overflow-hidden">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-sora font-extrabold text-2xl text-[#FF6A2B]/70 group-hover:text-[#FF6A2B] transition-colors">{step.num}</span>
                          <span className="font-mono text-[11px] font-semibold text-[#888888] px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-slate-100">{step.tag}</span>
                        </div>
                        <h3 className="font-sora text-[18px] sm:text-[19px] font-bold text-[#111111] mb-1.5 group-hover:text-[#FF6A2B] transition-colors">{step.title}</h3>
                        <p className="font-inter text-[14px] text-[#555555] leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Summary Box */}
          <motion.div {...fadeUp(0.2)} className="mt-14 p-8 sm:p-10 rounded-3xl bg-[#201A17] text-white text-center space-y-4 shadow-xl relative overflow-hidden">
            <p className="font-sora text-[17px] sm:text-[19px] font-semibold text-amber-100 max-w-3xl mx-auto leading-relaxed relative z-10">
              "From your first inquiry to your first class, we make every step clear, simple and focused on your future."
            </p>
            <div className="inline-block px-5 py-2 rounded-full bg-[#FF6A2B] text-white font-sora text-sm font-bold tracking-wider uppercase relative z-10">
              TEONOX | Learn. Apply. Lead.
            </div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          SECTION 04 - FEES STRUCTURE
      ═══════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-white border-t border-[#F0DFCE]">
        <div className="w-[88%] max-w-7xl mx-auto">
          <motion.div {...fadeUp(0)} className="card-premium p-8 sm:p-12 rounded-[32px] bg-[#FFF9F5] border border-[#FFE8D6] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-56 h-56 bg-[#FF6A2B]/5 rounded-bl-full pointer-events-none" />

            <div className="lg:col-span-8 space-y-5 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF0EB] text-[#FF6A2B] flex items-center justify-center shadow-sm">
                <Wallet className="w-7 h-7" />
              </div>
              <h2 className="font-sora text-[26px] sm:text-[36px] font-[900] text-[#111111]">Transparent Course Investment</h2>
              <p className="font-inter text-[15.5px] sm:text-[17px] text-[#444444] leading-relaxed">
                Fees vary by course, duration and learning format. Contact our admissions team for current fee details, available scholarships, and flexible payment plans.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Flexible installment options available',
                  'Merit & need-based scholarship options',
                  'Includes live sessions, projects & AI tools',
                  'Full career counselling & interview prep',
                ].map((text, i) => (
                  <motion.div key={i} {...fadeUp(0.06 * i)} className="flex items-center gap-2.5 text-sm font-inter text-[#333333]">
                    <CheckCircle2 className="w-5 h-5 text-[#FF6A2B] shrink-0" />
                    <span>{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div {...fadeUp(0.2)} className="mt-6 lg:mt-0 lg:col-span-4 flex flex-col gap-3 justify-center relative z-10">
              <button
                onClick={() => onEnquireClick('Fee Structure Enquiry')}
                className="group w-full py-4 px-6 rounded-2xl bg-[#FF6A2B] hover:bg-[#D8420F] text-white font-sora font-semibold text-base shadow-lg shadow-[#FF6A2B]/25 hover:shadow-xl transition-all text-center flex items-center justify-center gap-2 active:scale-95 hover:-translate-y-0.5"
              >
                <span>Request Fee Details</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={() => onEnquireClick('Scholarship Enquiry')}
                className="w-full py-3.5 px-6 rounded-2xl bg-white border border-[#F0DFCE] hover:border-[#FF6A2B] hover:bg-[#FFF6EE] text-[#201A17] font-sora font-semibold text-sm transition-all text-center shadow-xs hover:-translate-y-0.5"
              >
                Explore Scholarship Eligibility
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          SECTION 05 - CTA
      ═══════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-[#201A17] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,106,43,0.04)_1px,transparent_1px)] [background-size:26px_26px] pointer-events-none" />

        <div className="w-[88%] max-w-7xl mx-auto text-center space-y-6 relative z-10">
          <motion.h2 {...fadeUp(0.08)} className="font-sora text-[30px] sm:text-[44px] font-[900] text-white max-w-3xl mx-auto leading-tight">
            Ready to Take the Next Step in Your Career?
          </motion.h2>

          <motion.p {...fadeUp(0.15)} className="font-inter text-[15.5px] sm:text-[17px] text-[#C5BCB3] max-w-2xl mx-auto">
            Connect with our admissions counsellors today to choose the right program, explore scholarship options, and start your practical learning journey.
          </motion.p>

          <motion.div {...fadeUp(0.22)} className="flex flex-wrap items-center justify-center gap-5 pt-4">
            <MagneticButton
              onClick={onExplorePrograms}
              className="group px-8 py-4 rounded-full bg-[#FF6A2B] hover:bg-[#D8420F] text-white font-sora font-semibold text-base shadow-xl shadow-[#FF6A2B]/30 hover:shadow-2xl transition-colors flex items-center gap-2 active:scale-95"
            >
              <span>Explore Programs</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </MagneticButton>
            <MagneticButton
              onClick={() => onEnquireClick('Talk to TEONOX Admissions')}
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sora font-semibold text-base transition-colors flex items-center gap-2 backdrop-blur-md"
            >
              <span>Talk to TEONOX</span>
              <PhoneCall className="w-5 h-5 text-[#FF8A50]" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
