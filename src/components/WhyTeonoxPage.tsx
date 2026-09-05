import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  Zap, 
  Briefcase, 
  MessageSquare, 
  Rocket, 
  GraduationCap,
  Award,
  Flame,
  CheckSquare,
  ShieldCheck,
  Compass,
  ChevronRight,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import heroImg from '../assets/images/why-teonox/why_teonox_hero.webp';
import stage1Img from '../assets/images/learn-updated.webp';
import stage2Img from '../assets/images/apply.webp';
import stage3Img from '../assets/images/Lead.webp';
import { SEO } from './SEO';
import { BreadcrumbSchema } from './schema/BreadcrumbSchema';

interface WhyTeonoxPageProps {
  onEnquireClick: (topic?: string) => void;
  onExplorePrograms: () => void;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as any },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -34 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as any },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 34 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as any },
});

/* Thin reading-progress bar fixed to the top of the viewport - unique to this page */
function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#F15A29] via-[#FF8A50] to-[#F15A29] origin-left z-[60]"
    />
  );
}

export function WhyTeonoxPage({ onEnquireClick, onExplorePrograms }: WhyTeonoxPageProps) {
  // State for active tab in Philosophy (Learn / Apply / Lead)
  const [activePhilosophy, setActivePhilosophy] = useState<'learn' | 'apply' | 'lead'>('learn');

  // State for active Pillar filter in the 11 Pillars grid
  const [activePillarFilter, setActivePillarFilter] = useState<'all' | 'skills' | 'career' | 'network'>('all');

  // State for active Question in "The Value of Education" section
  const [openQuestionIdx, setOpenQuestionIdx] = useState<number | null>(0);

  // Real value questions list
  const valueQuestions = [
    { q: "Can you understand it?", detail: "Moving beyond surface definitions to deep conceptual mastery." },
    { q: "Can you apply it?", detail: "Translating theoretical frameworks into live campaigns with actual budgets." },
    { q: "Can you solve a business problem with it?", detail: "Identifying root causes for performance drops and executing turnarounds." },
    { q: "Can you execute independently?", detail: "Taking complete ownership of digital channels without constant supervision." },
    { q: "Can you communicate your strategy?", detail: "Pitching complex growth strategies to founders and executive leaders." },
    { q: "Can you analyze why something failed?", detail: "Conducting data audits and conversion rate optimization experiments." },
    { q: "Can you improve it?", detail: "Iterating on ad creatives, funnels, and keywords for continuous ROI gains." },
    { q: "Can you use AI without becoming dependent on AI?", detail: "Combining human strategy with generative tools for exponential productivity." },
    { q: "Can you walk into an interview, client meeting or business discussion and demonstrate that you understand Marketing, not merely marketing tools?", detail: "Demonstrating commercial acumen, commercial funnel math, and leadership capability." }
  ];

  return (
    <div className="w-full bg-[#FAF8F5] text-[#111111] font-['Sora',sans-serif] selection:bg-[#F15A29] selection:text-white pt-20 sm:pt-24 overflow-x-hidden">
      <SEO
        title="Why Teonox? AI-Digital Marketing School in Pune"
        description="Discover why Teonox is Pune's leading AI marketing school. Learn business digital marketing with AI-driven, industry-relevant training. Know more."
        canonical="/why-teonox"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Why TEONOX',
          url: 'https://teonox.com/why-teonox',
        }}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Why Teonox', path: '/why-teonox' },
      ]} />
      
      {/* ─────────────────────────────────────────────────────────────────
          SECTION 01: HERO HEADER
          ───────────────────────────────────────────────────────────────── */}
      <section className="relative w-full bg-[#FAF8F5] py-12 sm:py-16 border-b border-[#EBE4DC] overflow-hidden">
        {/* Ambient Radial Mesh Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: `radial-gradient(#111111 1.2px, transparent 1.2px)`, backgroundSize: '24px 24px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left">
            
            {/* Left Column: Eyebrow & Headline */}
            <div className="lg:col-span-7 space-y-6">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[28px] sm:text-[38px] lg:text-[46px] font-[800] leading-[1.12] tracking-tight text-[#111111]"
              >
                Learning Digital Marketing is Easy.{' '}
                <span className="text-[#F15A29] relative inline-block">
                  Becoming Industry-Ready is Not.
                  <span className="absolute bottom-1 left-0 w-full h-[5px] bg-[#F15A29]/25 rounded-full" />
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-inter text-base sm:text-lg text-[#444444] leading-relaxed font-medium max-w-2xl"
              >
                There are hundreds of Digital Marketing Courses today, but TEONOX focuses on agency-grade strategy, practical execution, and real business outcomes.
              </motion.p>

              {/* Hero CTAs */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <button type="button"
                  onClick={() => onEnquireClick('Why TEONOX Admissions')}
                  className="px-7 py-3.5 rounded-full bg-[#F15A29] hover:bg-[#D9491D] text-white font-sora text-sm font-extrabold uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span>Enquire For Program</span>
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
                <button type="button"
                  onClick={onExplorePrograms}
                  className="px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF8F5] text-[#111111] font-sora text-sm font-bold border border-[#EBE4DC] hover:border-[#111111] transition-all cursor-pointer shadow-xs"
                >
                  <span>Explore All Programs</span>
                </button>
              </motion.div>
            </div>

            {/* Right Hero Image Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-[#EBE4DC] shadow-xl group aspect-[16/10]">
                <img
                  src={heroImg}
                  alt="Young marketer mastering digital strategy & AI execution at TEONOX"
                  className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 01-B: THE CURRENT MARKET LANDSCAPE
          ───────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#EBE4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <p className="font-inter text-base sm:text-lg font-semibold text-[#555555] text-center max-w-3xl mx-auto leading-relaxed">
            There are hundreds of Digital Marketing Courses today.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {[
              { num: "01", text: "Some promise certifications" },
              { num: "02", text: "Some teach tools" },
              { num: "03", text: "Some provide recorded videos" },
              { num: "04", text: "Some compete primarily on price" }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                {...fadeUp(idx * 0.1)}
                whileHover={{ y: -5 }}
                className="card-premium p-7 rounded-2xl bg-[#FAF8F5] border border-[#EBE4DC] shadow-xs hover:shadow-lg hover:border-[#F15A29]/50 hover:bg-white transition-all space-y-4 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#F15A29]/5 rounded-bl-full pointer-events-none group-hover:bg-[#F15A29]/10 transition-colors" />
                <div className="space-y-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF0EB] text-[#F15A29] font-extrabold text-base font-sora flex items-center justify-center group-hover:bg-[#F15A29] group-hover:text-white transition-colors shadow-xs">
                    {item.num}
                  </div>
                  <h3 className="font-sora text-base sm:text-lg font-extrabold text-[#111111] leading-snug">
                    {item.text}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 01-C: THE MINDSET SHIFT (ORDINARY VS TEONOX)
          ───────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#FAF8F5] border-b border-[#EBE4DC] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">

          {/* Side by Side Mindset Comparison Grid */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* Ordinary Mindset Card */}
            <motion.div {...fadeLeft(0)} className="p-8 sm:p-9 rounded-3xl bg-white border border-[#EBE4DC] shadow-sm relative overflow-hidden flex flex-col justify-between space-y-6 group">
              <div className="space-y-4">
                <p className="font-sora text-base sm:text-lg text-[#555555] font-semibold leading-relaxed">
                  But choosing a Professional Program should not begin with:
                </p>
              </div>
              <div className="p-6 sm:p-7 rounded-2xl bg-[#FAF8F5] border border-[#EBE4DC] space-y-2 flex items-center justify-center min-h-[104px]">
                <p className="text-xl sm:text-2xl font-extrabold font-sora text-[#666666] line-through decoration-[#F15A29] decoration-2 text-center leading-snug m-0">
                  How much does the course cost?
                </p>
              </div>
            </motion.div>

            {/* The TEONOX Mindset Card */}
            <motion.div {...fadeRight(0.15)} className="p-8 sm:p-9 rounded-3xl bg-white border-2 border-[#F15A29] shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6 group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F15A29]/10 rounded-bl-full pointer-events-none" />
              <div className="space-y-4">
                <p className="font-sora text-base sm:text-lg text-[#111111] font-bold leading-relaxed">
                  It should begin with:
                </p>
              </div>
              <div className="p-6 sm:p-7 rounded-2xl bg-[#FFF0EB] border border-[#F8E3D8] space-y-2">
                <p className="text-xl sm:text-2xl font-extrabold font-sora text-[#111111] leading-snug">
                  What will I be capable of doing after completing it?
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 01-D: THE TEONOX CORE PURPOSE & MISSION
          ───────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#111111] text-white relative overflow-hidden border-b border-white/10">
        {/* Background Ambient Lights */}

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 sm:p-12 rounded-3xl bg-white/[0.03] border border-white/12 backdrop-blur-2xl shadow-2xl relative overflow-hidden space-y-8"
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#F15A29] to-transparent" />

            {/* Paragraph 1 */}
            <p className="font-inter text-base sm:text-xl text-[#D0C3B6] leading-relaxed max-w-3xl mx-auto text-center font-medium">
              At TEONOX, we believe Digital Marketing education must go beyond knowing how Google Ads works, how to post on Instagram, or how to optimize a webpage.
            </p>

            {/* Core Box Paragraph 2 */}
            <div className="p-8 sm:p-11 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/15 shadow-2xl relative overflow-hidden text-center group hover:border-[#F15A29]/50 transition-all">
              <p className="font-sora text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug tracking-tight relative z-10">
                The industry needs people who can think, communicate, execute, analyze, solve problems, understand customers, use AI intelligently and contribute to business growth.
              </p>
            </div>

            {/* Statement 3 */}
            <p className="font-inter text-base sm:text-lg text-[#EBE4DC] leading-relaxed max-w-3xl mx-auto text-center font-bold">
              That is what TEONOX is designed to build.
            </p>

            {/* Banner Statement 4 */}
            <div className="pt-2 flex justify-center">
              <div className="px-6 py-4 sm:px-10 sm:py-5 rounded-full bg-gradient-to-r from-[#F15A29] to-[#FF6B35] text-white font-sora text-sm sm:text-base font-extrabold uppercase tracking-wider shadow-lg shadow-[#F15A29]/25 text-center">
                Not just Digital Marketers. Business-ready Digital Professionals.
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 02: THE LEARNING PHILOSOPHY (LEARN. APPLY. LEAD.)
          ───────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-white border-b border-[#EBE4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-[32px] sm:text-[48px] font-[900] text-[#111111] leading-[1.1] tracking-tight">
              Learn. Apply. Lead.
            </h2>
            <p className="text-lg sm:text-xl font-bold text-[#F15A29]">
              More than a tagline. It&apos;s Our Learning Philosophy.
            </p>
          </div>

          {/* Interactive Switcher */}
          <div className="flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-[#FAF8F5] border border-[#EBE4DC] shadow-xs gap-1.5">
              {(['learn', 'apply', 'lead'] as const).map((tab, idx) => (
                <button type="button"
                  key={tab}
                  onClick={() => setActivePhilosophy(tab)}
                  className={`px-6 py-3.5 rounded-xl font-sora text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2.5 ${
                    activePhilosophy === tab
                      ? 'bg-[#F15A29] text-white shadow-md'
                      : 'text-[#666666] hover:text-[#111111] hover:bg-white'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    activePhilosophy === tab ? 'bg-white/25 text-white' : 'bg-[#EBE4DC] text-[#555555]'
                  }`}>
                    0{idx + 1}
                  </span>
                  <span>{tab}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Display Card */}
          <AnimatePresence mode="wait">
            {activePhilosophy === 'learn' && (
              <motion.div
                key="learn"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-[#EBE4DC] shadow-lg"
              >
                <div className="lg:col-span-7 space-y-6">
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-sora text-[#111111]">
                    Build Strong Foundations
                  </h3>
                  <p className="font-inter text-base sm:text-lg text-[#444444] leading-relaxed">
                    Build strong foundations in Marketing, Consumer Psychology, Business, Digital Marketing, Data, Technology and Artificial Intelligence.
                  </p>
                  <div className="p-6 rounded-2xl bg-white border border-[#EBE4DC] space-y-2 shadow-xs">
                    <p className="font-sora font-bold text-[#111111] text-base sm:text-lg leading-relaxed">
                      We don&apos;t want students to simply know what button to click. They should understand why they are clicking it, what business objective it serves and how success will be measured.
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden border border-[#EBE4DC] shadow-md h-[320px] relative group">
                    <img src={stage1Img} alt="Students building strong marketing foundations in a live masterclass at TEONOX" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                  </div>
                </div>
              </motion.div>
            )}

            {activePhilosophy === 'apply' && (
              <motion.div
                key="apply"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-[#EBE4DC] shadow-lg"
              >
                <div className="lg:col-span-7 space-y-6">
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-sora text-[#111111]">
                    Knowledge Becomes Valuable When You Can Use It
                  </h3>
                  <p className="font-inter text-base sm:text-lg text-[#444444] leading-relaxed">
                    Knowledge becomes valuable when you can use it.
                  </p>
                  <p className="font-inter text-base sm:text-lg text-[#444444] leading-relaxed">
                    Students move from concepts to projects, campaigns, strategies, audits, analysis, content, websites, advertising and problem-solving exercises designed around practical business situations.
                  </p>
                  <div className="p-6 rounded-2xl bg-[#FFF0EB] border border-[#F8E3D8] space-y-2 shadow-xs">
                    <p className="font-sora font-bold text-[#F15A29] text-base sm:text-lg leading-relaxed">
                      Because watching someone run a campaign and being able to run one yourself are two very different things.
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden border border-[#EBE4DC] shadow-md h-[320px] relative group">
                    <img src={stage2Img} alt="Learners running real-budget ad campaigns on live analytics dashboards" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                  </div>
                </div>
              </motion.div>
            )}

            {activePhilosophy === 'lead' && (
              <motion.div
                key="lead"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-[#EBE4DC] shadow-lg"
              >
                <div className="lg:col-span-7 space-y-6">
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-sora text-[#111111]">
                    The Final Goal Isn&apos;t Tool Proficiency
                  </h3>
                  <p className="font-inter text-base sm:text-lg text-[#444444] leading-relaxed">
                    The final goal isn&apos;t tool proficiency.
                  </p>
                  <p className="font-inter text-base sm:text-lg text-[#444444] leading-relaxed">
                    It is developing the confidence to take ownership, make decisions, communicate ideas, solve business problems and eventually lead campaigns, clients, teams or businesses.
                  </p>
                  <div className="p-6 rounded-2xl bg-white border border-[#EBE4DC] space-y-2 shadow-xs">
                    <p className="font-sora font-bold text-[#111111] text-base sm:text-lg leading-relaxed">
                      Learn the skill. Apply the skill. Lead with the skill.
                    </p>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="rounded-2xl overflow-hidden border border-[#EBE4DC] shadow-md h-[320px] relative group">
                    <img src={stage3Img} alt="TEONOX student confidently presenting a growth strategy to a team" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 03: THE 11 CORE PILLARS OF TEONOX
          ───────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#FAF8F5] border-b border-[#EBE4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <h2 className="text-[32px] sm:text-[48px] font-[900] text-[#111111] leading-[1.1] tracking-tight">
                Every Dimension Needed for Excellence
              </h2>
              <p className="font-inter text-base sm:text-lg text-[#555555]">
                Discover how TEONOX integrates AI, live projects, commercial thinking, mindset, and career coaching into one unified standard.
              </p>
            </div>

            {/* Filter Pills — single scrollable row on mobile */}
            <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-2 py-1 pr-4 md:pr-0 w-full min-w-0 md:w-auto">
              {[
                { id: 'all', label: 'All Pillars' },
                { id: 'skills', label: 'Skills & AI' },
                { id: 'career', label: 'Career & Mindset' },
                { id: 'network', label: 'Network & Mentors' }
              ].map(tab => (
                <button type="button"
                  key={tab.id}
                  onClick={() => setActivePillarFilter(tab.id as any)}
                  className={`shrink-0 whitespace-nowrap px-4 py-2.5 rounded-xl font-sora text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activePillarFilter === tab.id
                      ? 'bg-[#111111] text-white shadow-sm'
                      : 'bg-white border border-[#EBE4DC] text-[#666666] hover:text-[#111111] hover:border-[#111111]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Pillars Cards Grid */}
          <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* PILLAR 1: AI-FIRST EDUCATION */}
            {(activePillarFilter === 'all' || activePillarFilter === 'skills') && (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="p-8 sm:p-9 rounded-3xl bg-white border border-[#EBE4DC] shadow-xs space-y-6 hover:border-[#F15A29]/60 hover:shadow-[0_20px_40px_-15px_rgba(241,90,41,0.12)] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="w-10 h-10 rounded-xl bg-[#F15A29]/10 text-[#F15A29] flex items-center justify-center shrink-0 group-hover:bg-[#F15A29] group-hover:text-white transition-colors">
                    <Brain className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-extrabold font-sora text-[#F15A29] uppercase tracking-wider">AI-FIRST EDUCATION</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-sora text-[#111111]">Don&apos;t Learn for Yesterday&apos;s Industry.</h3>
                  </div>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Artificial Intelligence is not an additional chapter at TEONOX.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    It is becoming part of how modern marketing works.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Students learn to use AI across research, strategy, content, SEO, advertising, analytics, automation, ideation and productivity.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    But AI education cannot stop at learning prompts.
                  </p>
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EBE4DC] space-y-2">
                    <p className="font-sora text-sm font-bold text-[#111111]">The real competitive advantage is knowing:</p>
                    <p className="font-sora text-sm font-semibold text-[#F15A29]">What to ask. Why to ask it. How to evaluate the answer. And how to turn it into business action.</p>
                  </div>
                  <p className="font-inter text-base text-[#111111] font-bold">
                    Our approach combines Human Intelligence + Marketing Intelligence + Artificial Intelligence.
                  </p>
                </div>
                <div className="pt-5 border-t border-[#EBE4DC]">
                  <p className="text-sm font-sora font-extrabold text-[#F15A29] leading-snug">
                    Because the future will not belong simply to people who use AI. It will belong to people who know what to do with it.
                  </p>
                </div>
              </motion.div>
            )}

            {/* PILLAR 2: REAL CLIENT PROJECTS */}
            {(activePillarFilter === 'all' || activePillarFilter === 'skills') && (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="p-8 sm:p-9 rounded-3xl bg-white border border-[#EBE4DC] shadow-xs space-y-6 hover:border-[#F15A29]/60 hover:shadow-[0_20px_40px_-15px_rgba(241,90,41,0.12)] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="w-10 h-10 rounded-xl bg-[#F15A29]/10 text-[#F15A29] flex items-center justify-center shrink-0 group-hover:bg-[#F15A29] group-hover:text-white transition-colors">
                    <Target className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-extrabold font-sora text-[#F15A29] uppercase tracking-wider">REAL CLIENT PROJECTS</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-sora text-[#111111]">Move Beyond Assignments. Work on Business Problems.</h3>
                  </div>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    A classroom can teach concepts.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    A real project teaches responsibility.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    TEONOX aims to expose learners to practical projects and business scenarios where they need to understand:
                  </p>
                  <ul className="space-y-2 font-sora text-sm text-[#222222]">
                    {[
                      "What does the business want?", 
                      "Who is the customer?", 
                      "What is the actual problem?", 
                      "Which strategy should we use?", 
                      "What should we measure?", 
                      "What happens when results aren't as expected?", 
                      "How do we optimize?"
                    ].map((q, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#F15A29] shrink-0 mt-0.5" />
                        <span className="font-medium">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-5 border-t border-[#EBE4DC] space-y-1">
                  <p className="text-sm font-sora font-extrabold text-[#111111]">
                    This is where learning becomes execution.
                  </p>
                  <p className="text-sm font-sora font-extrabold text-[#F15A29]">
                    And execution becomes experience.
                  </p>
                </div>
              </motion.div>
            )}

            {/* PILLAR 3: CAREER COACHING */}
            {(activePillarFilter === 'all' || activePillarFilter === 'career') && (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="p-8 sm:p-9 rounded-3xl bg-white border border-[#EBE4DC] shadow-xs space-y-6 hover:border-[#F15A29]/60 hover:shadow-[0_20px_40px_-15px_rgba(241,90,41,0.12)] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="w-10 h-10 rounded-xl bg-[#F15A29]/10 text-[#F15A29] flex items-center justify-center shrink-0 group-hover:bg-[#F15A29] group-hover:text-white transition-colors">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-extrabold font-sora text-[#F15A29] uppercase tracking-wider">CAREER COACHING</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-sora text-[#111111]">A Course Should Prepare You for More Than an Examination.</h3>
                  </div>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Knowing Digital Marketing and building a career in Digital Marketing require different skills.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Career readiness can include career-path identification, resume development, LinkedIn optimization, portfolio building, interview preparation, mock interviews and professional positioning.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Whether a learner wants to pursue employment, freelancing, consulting or entrepreneurship, the objective is to help them understand:
                  </p>
                </div>
                <div className="pt-5 border-t border-[#EBE4DC]">
                  <p className="text-base sm:text-lg font-sora font-extrabold text-[#F15A29]">
                    Where am I going, and how do I get there?
                  </p>
                </div>
              </motion.div>
            )}

            {/* PILLAR 4: MINDSET TRAINING */}
            {(activePillarFilter === 'all' || activePillarFilter === 'career') && (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="p-8 sm:p-9 rounded-3xl bg-white border border-[#EBE4DC] shadow-xs space-y-6 hover:border-[#F15A29]/60 hover:shadow-[0_20px_40px_-15px_rgba(241,90,41,0.12)] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="w-10 h-10 rounded-xl bg-[#F15A29]/10 text-[#F15A29] flex items-center justify-center shrink-0 group-hover:bg-[#F15A29] group-hover:text-white transition-colors">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-extrabold font-sora text-[#F15A29] uppercase tracking-wider">MINDSET TRAINING</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-sora text-[#111111]">Your Skills Determine What You Can Do. Your Mindset Determines How Far You Go.</h3>
                  </div>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Two people can learn the same skill.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    One remains average.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Another builds an extraordinary career.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    The difference is often not access to information.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    It is mindset, initiative, discipline, consistency, adaptability and willingness to execute.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    TEONOX believes professional education should develop how learners think, not merely what they know.
                  </p>
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EBE4DC] space-y-2">
                    <p className="font-sora text-xs font-bold text-[#666666] uppercase tracking-wider">Students are encouraged to develop:</p>
                    <p className="font-sora text-sm font-extrabold text-[#111111]">
                      Growth Mindset | Ownership | Problem Solving | Accountability | Adaptability | Curiosity | Continuous Learning
                    </p>
                  </div>
                </div>
                <div className="pt-5 border-t border-[#EBE4DC] space-y-1">
                  <p className="text-sm font-sora font-semibold text-[#555555]">
                    Technology will continue changing.
                  </p>
                  <p className="text-sm font-sora font-extrabold text-[#F15A29]">
                    A powerful mindset helps you change with it.
                  </p>
                </div>
              </motion.div>
            )}

            {/* PILLAR 5: COMMUNICATION SKILLS */}
            {(activePillarFilter === 'all' || activePillarFilter === 'career') && (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="p-8 sm:p-9 rounded-3xl bg-white border border-[#EBE4DC] shadow-xs space-y-6 hover:border-[#F15A29]/60 hover:shadow-[0_20px_40px_-15px_rgba(241,90,41,0.12)] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="w-10 h-10 rounded-xl bg-[#F15A29]/10 text-[#F15A29] flex items-center justify-center shrink-0 group-hover:bg-[#F15A29] group-hover:text-white transition-colors">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-extrabold font-sora text-[#F15A29] uppercase tracking-wider">COMMUNICATION SKILLS</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-sora text-[#111111]">Great Ideas Have Little Value If You Cannot Communicate Them.</h3>
                  </div>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    A Digital Marketer communicates constantly.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    With clients. Customers. Managers. Teams. Designers. Developers. Salespeople. Business owners. And sometimes thousands or millions of consumers.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    That is why communication is not a &ldquo;soft extra.&rdquo;
                  </p>
                  <div className="p-4 rounded-xl bg-[#FFF0EB] border border-[#F8E3D8]">
                    <p className="font-sora text-sm font-extrabold text-[#F15A29]">It is a professional advantage.</p>
                  </div>
                </div>
                <div className="pt-5 border-t border-[#EBE4DC]">
                  <p className="text-sm font-sora font-semibold text-[#333333] leading-relaxed">
                    TEONOX focuses on helping learners become better at presenting ideas, explaining strategies, understanding briefs, communicating professionally and expressing their thinking with clarity and confidence.
                  </p>
                </div>
              </motion.div>
            )}

            {/* PILLAR 6: BUSINESS THINKING */}
            {(activePillarFilter === 'all' || activePillarFilter === 'skills') && (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="p-8 sm:p-9 rounded-3xl bg-white border border-[#EBE4DC] shadow-xs space-y-6 hover:border-[#F15A29]/60 hover:shadow-[0_20px_40px_-15px_rgba(241,90,41,0.12)] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="w-10 h-10 rounded-xl bg-[#F15A29]/10 text-[#F15A29] flex items-center justify-center shrink-0 group-hover:bg-[#F15A29] group-hover:text-white transition-colors">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-extrabold font-sora text-[#F15A29] uppercase tracking-wider">BUSINESS THINKING</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-sora text-[#111111]">We Don&apos;t Want You to Ask Only &ldquo;How Do I Run This Campaign?&rdquo;</h3>
                  </div>
                  <p className="font-sora text-base font-bold text-[#111111]">We want you to ask:</p>
                  <p className="font-sora text-lg font-extrabold text-[#F15A29]">Why are we running it?</p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Marketing ultimately exists to create business value.
                  </p>
                  <div className="space-y-2">
                    <p className="font-sora text-xs font-bold text-[#666666] uppercase tracking-wider">That means understanding:</p>
                    <div className="p-4 rounded-xl bg-[#111111] text-white font-sora text-xs sm:text-sm font-bold leading-relaxed shadow-sm">
                      Customer → Problem → Product → Positioning → Marketing → Acquisition → Conversion → Retention → Revenue → Growth
                    </div>
                  </div>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    A campaign can generate impressive clicks and still fail the business.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    A social media post can get thousands of likes and generate zero revenue.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    A marketer needs to understand the difference.
                  </p>
                </div>
                <div className="pt-5 border-t border-[#EBE4DC]">
                  <p className="text-sm font-sora font-extrabold text-[#111111] leading-snug">
                    TEONOX develops a business-first approach to Digital Marketing so learners understand the commercial purpose behind marketing decisions.
                  </p>
                </div>
              </motion.div>
            )}

            {/* PILLAR 7: PERSONAL BRANDING */}
            {(activePillarFilter === 'all' || activePillarFilter === 'network') && (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="p-8 sm:p-9 rounded-3xl bg-white border border-[#EBE4DC] shadow-xs space-y-6 hover:border-[#F15A29]/60 hover:shadow-[0_20px_40px_-15px_rgba(241,90,41,0.12)] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="w-10 h-10 rounded-xl bg-[#F15A29]/10 text-[#F15A29] flex items-center justify-center shrink-0 group-hover:bg-[#F15A29] group-hover:text-white transition-colors">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-extrabold font-sora text-[#F15A29] uppercase tracking-wider">PERSONAL BRANDING</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-sora text-[#111111]">Before You Market Businesses, Learn to Market Yourself.</h3>
                  </div>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    In today&apos;s digital economy, your online presence often speaks before you do.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Recruiters search. Clients search. Businesses search. Customers search.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Your digital footprint has become part of your professional identity.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Students can learn how to develop their professional positioning, LinkedIn presence, portfolio, authority, content and personal brand so that their capabilities are not only developed but also visible.
                  </p>
                </div>
                <div className="pt-5 border-t border-[#EBE4DC]">
                  <p className="text-base font-sora font-extrabold text-[#F15A29]">
                    Learn to create value. Then learn to communicate that value.
                  </p>
                </div>
              </motion.div>
            )}

            {/* PILLAR 8: INDUSTRY MENTORS */}
            {(activePillarFilter === 'all' || activePillarFilter === 'network') && (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="p-8 sm:p-9 rounded-3xl bg-white border border-[#EBE4DC] shadow-xs space-y-6 hover:border-[#F15A29]/60 hover:shadow-[0_20px_40px_-15px_rgba(241,90,41,0.12)] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="w-10 h-10 rounded-xl bg-[#F15A29]/10 text-[#F15A29] flex items-center justify-center shrink-0 group-hover:bg-[#F15A29] group-hover:text-white transition-colors">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-extrabold font-sora text-[#F15A29] uppercase tracking-wider">INDUSTRY MENTORS</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-sora text-[#111111]">Learn From People Who Understand Execution.</h3>
                  </div>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Marketing evolves too quickly for education to remain disconnected from industry.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Industry interaction can expose learners to real campaigns, business situations, challenges, mistakes, decisions and changing market practices that textbooks alone cannot replicate.
                  </p>
                </div>
                <div className="pt-5 border-t border-[#EBE4DC] space-y-2">
                  <p className="text-xs font-sora font-bold text-[#666666] uppercase tracking-wider">The objective is to reduce the distance between:</p>
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EBE4DC] text-sm font-sora font-bold text-[#111111]">
                    What the classroom teaches and What the industry expects.
                  </div>
                </div>
              </motion.div>
            )}

            {/* PILLAR 9: PLACEMENT ASSISTANCE */}
            {(activePillarFilter === 'all' || activePillarFilter === 'career') && (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="p-8 sm:p-9 rounded-3xl bg-white border border-[#EBE4DC] shadow-xs space-y-6 hover:border-[#F15A29]/60 hover:shadow-[0_20px_40px_-15px_rgba(241,90,41,0.12)] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="w-10 h-10 rounded-xl bg-[#F15A29]/10 text-[#F15A29] flex items-center justify-center shrink-0 group-hover:bg-[#F15A29] group-hover:text-white transition-colors">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-extrabold font-sora text-[#F15A29] uppercase tracking-wider">PLACEMENT ASSISTANCE</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-sora text-[#111111]">From Learning Skills to finding Opportunities.</h3>
                  </div>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Getting trained is one milestone.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Becoming employable is another.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    TEONOX&apos;s placement assistance can support eligible learners with areas such as:
                  </p>
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EBE4DC] text-xs sm:text-sm font-sora font-extrabold text-[#111111] leading-relaxed">
                    Resume Building | LinkedIn Optimization | Portfolio Development | Interview Preparation | Mock Interviews | Career Guidance | Opportunity Assistance
                  </div>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    The objective isn&apos;t simply to send students to interviews.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    It is to help them become better prepared for those interviews and the roles that follow.
                  </p>
                  <p className="font-inter text-xs text-[#666666] leading-relaxed">
                    Placement assistance should be presented according to TEONOX&apos;s applicable eligibility criteria and placement policy rather than as an employment guarantee.
                  </p>
                </div>
                <div className="pt-5 border-t border-[#EBE4DC] space-y-1">
                  <p className="text-sm font-sora font-semibold text-[#555555]">We don&apos;t produce Certificate Holders.</p>
                  <p className="text-base font-sora font-extrabold text-[#F15A29]">
                    We produce Professionals who can Create Opportunities.
                  </p>
                </div>
              </motion.div>
            )}

            {/* PILLAR 10: INTERNSHIP MODEL */}
            {(activePillarFilter === 'all' || activePillarFilter === 'career') && (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="p-8 sm:p-9 rounded-3xl bg-white border border-[#EBE4DC] shadow-xs space-y-6 hover:border-[#F15A29]/60 hover:shadow-[0_20px_40px_-15px_rgba(241,90,41,0.12)] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="w-10 h-10 rounded-xl bg-[#F15A29]/10 text-[#F15A29] flex items-center justify-center shrink-0 group-hover:bg-[#F15A29] group-hover:text-white transition-colors">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-extrabold font-sora text-[#F15A29] uppercase tracking-wider">INTERNSHIP MODEL</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-sora text-[#111111]">Experience the Difference between Knowing and Doing.</h3>
                  </div>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Internships and live-project exposure can help learners experience how professional Digital Marketing actually operates.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Real environments introduce factors that classroom exercises cannot fully reproduce:
                  </p>
                  <ul className="grid grid-cols-2 gap-2 font-sora text-xs sm:text-sm font-bold text-[#111111]">
                    {["Deadlines.", "Budgets.", "Client Expectations.", "KPIs.", "Competition.", "Reporting.", "Optimization.", "Accountability."].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 p-2 rounded-lg bg-[#FAF8F5] border border-[#EBE4DC]">
                        <span className="w-2 h-2 rounded-full bg-[#F15A29]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Depending on the program, eligibility and availability, learners may receive opportunities to work on practical projects across areas such as Digital Marketing, SEO, Social Media, Advertising, Content, Websites, Analytics and AI-enabled marketing.
                  </p>
                </div>
                <div className="pt-5 border-t border-[#EBE4DC]">
                  <p className="text-base font-sora font-extrabold text-[#F15A29]">
                    The objective is straightforward: Reduce the gap between education and execution.
                  </p>
                </div>
              </motion.div>
            )}

            {/* PILLAR 11: LIFETIME ALUMNI COMMUNITY */}
            {(activePillarFilter === 'all' || activePillarFilter === 'network') && (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="p-8 sm:p-9 rounded-3xl bg-white border border-[#EBE4DC] shadow-xs space-y-6 hover:border-[#F15A29]/60 hover:shadow-[0_20px_40px_-15px_rgba(241,90,41,0.12)] transition-all flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="w-10 h-10 rounded-xl bg-[#F15A29]/10 text-[#F15A29] flex items-center justify-center shrink-0 group-hover:bg-[#F15A29] group-hover:text-white transition-colors">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-extrabold font-sora text-[#F15A29] uppercase tracking-wider">LIFETIME ALUMNI COMMUNITY</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-sora text-[#111111]">Your Course May End. Your Network Shouldn&apos;t.</h3>
                  </div>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Learning doesn&apos;t stop when a program ends.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    Neither should professional relationships.
                  </p>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    TEONOX envisions its alumni ecosystem as a growing network of Digital Marketers, professionals, entrepreneurs, freelancers, creators and future business leaders.
                  </p>
                  <div className="space-y-2">
                    <p className="font-sora text-xs font-bold text-[#666666] uppercase tracking-wider">A strong alumni community can create long-term opportunities for:</p>
                    <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EBE4DC] text-xs sm:text-sm font-sora font-extrabold text-[#111111] leading-relaxed">
                      Networking | Knowledge Sharing | Collaboration | Referrals | Career Opportunities | Business Opportunities | Continuous Learning
                    </div>
                  </div>
                  <p className="font-inter text-base text-[#444444] leading-relaxed">
                    You may join TEONOX as a student.
                  </p>
                </div>
                <div className="pt-5 border-t border-[#EBE4DC]">
                  <p className="text-base font-sora font-extrabold text-[#F15A29]">
                    But the ambition is for you to remain part of the ecosystem as you grow, contribute and lead.
                  </p>
                </div>
              </motion.div>
            )}

          </div>
          </AnimatePresence>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 04: VALUE COMPARISON ("So, Why TEONOX?")
          ───────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#111111] text-white relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          <div className="max-w-3xl space-y-4">
            <h2 className="text-[32px] sm:text-[48px] font-[900] text-white leading-[1.08] tracking-tight">
              So, Why TEONOX?
            </h2>
            <p className="font-sora text-lg sm:text-xl font-bold text-[#FF8A50] leading-relaxed">
              If two institutes teach Google Ads, SEO, Social Media and AI, why should one program cost significantly more than another?
            </p>
          </div>

          <div className="p-8 sm:p-11 rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl">
            <div className="space-y-5">
              <h3 className="text-2xl sm:text-3xl font-bold font-sora text-white">Because the number of modules is not the value of education.</h3>
              <p className="font-sora text-xl font-extrabold text-[#FF8A50]">
                You are not paying for information.
              </p>
              <p className="font-inter text-base text-[#C9BDB2] leading-relaxed">
                Information is everywhere.
              </p>
              <ul className="space-y-3 font-sora text-sm sm:text-base text-[#EBE4DC]">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#FF8A50]" />
                  <span>YouTube has information.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#FF8A50]" />
                  <span>Google has information.</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#FF8A50]" />
                  <span>AI can explain almost any concept within seconds.</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/15 space-y-4 shadow-md">
              <p className="text-lg sm:text-xl font-bold font-sora text-white leading-snug">
                The real value lies in what happens after information is available.
              </p>
              <p className="text-sm font-inter text-[#D0C3B6] leading-relaxed">
                That is the difference TEONOX intends to create.
              </p>
            </div>
          </div>

          {/* Real Value Questions */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold font-sora text-white flex items-center gap-3">
              <CheckSquare className="w-6 h-6 text-[#FF8A50]" />
              <span>The 9 Core Capability Questions:</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {valueQuestions.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.01 }}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer font-sora flex flex-col justify-between ${
                    openQuestionIdx === idx
                      ? 'bg-white/10 border-[#F15A29]/70 text-white shadow-lg ring-1 ring-[#F15A29]/40'
                      : 'bg-white/5 border-white/10 text-white/90 hover:bg-white/10 hover:border-white/20'
                  }`}
                  onClick={() => setOpenQuestionIdx(openQuestionIdx === idx ? null : idx)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-extrabold uppercase tracking-widest opacity-80">QUESTION 0{idx + 1}</span>
                      <CheckSquare className="w-5 h-5 shrink-0 text-[#FF8A50]" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold leading-snug">{item.q}</h4>
                  </div>
                  {openQuestionIdx === idx && (
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: 'auto' }} 
                      className="mt-4 text-sm opacity-95 font-inter border-t border-white/20 pt-3 leading-relaxed"
                    >
                      {item.detail}
                    </motion.p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 05: OUTCOME COMPARISON ("Don't Compare Course Fees. Compare Outcomes.")
          ───────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#FAF8F5] border-b border-[#EBE4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-[32px] sm:text-[48px] font-[900] text-[#111111] leading-[1.1] tracking-tight">
              Don&apos;t Compare Course Fees. Compare Outcomes.
            </h2>
            <p className="font-sora text-base sm:text-xl font-bold text-[#F15A29] leading-relaxed">
              A ₹20,000 course that gives you information can ultimately be expensive if it doesn&apos;t make you capable.
            </p>
            <p className="font-inter text-base sm:text-lg text-[#555555]">
              A premium program must justify its investment by developing something substantially more valuable:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Capability.", desc: "Not just certificates.", detail: "Build hands-on execution power that employers respect on day one." },
              { title: "Competence.", desc: "Not just tools.", detail: "Master the strategy, analytics, and business purpose behind every tool." },
              { title: "Thinking.", desc: "Not just classroom learning.", detail: "Develop commercial acumen, customer intent understanding, and CRO focus." },
              { title: "Execution.", desc: "Not just getting your first opportunity.", detail: "Building the ability to create opportunities throughout your career." }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="p-7 rounded-3xl bg-white border border-[#EBE4DC] shadow-xs space-y-4 hover:border-[#F15A29]/50 transition-all group relative overflow-hidden"
              >
                <div className="h-1 bg-gradient-to-r from-[#F15A29] to-[#FF8A50] w-full absolute top-0 left-0" />
                <div className="w-12 h-12 rounded-xl bg-[#FFF0EB] text-[#F15A29] flex items-center justify-center font-sora font-extrabold text-base group-hover:bg-[#F15A29] group-hover:text-white transition-colors">
                  0{idx + 1}
                </div>
                <h3 className="text-2xl font-extrabold font-sora text-[#111111]">{item.title}</h3>
                <p className="font-sora text-sm sm:text-base font-bold text-[#F15A29]">{item.desc}</p>
                <p className="font-inter text-sm text-[#555555] leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 06: THE TEONOX DIFFERENCE (FORMULA & SUMMARY)
          ───────────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#111111] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-10">
          
          <div className="space-y-4">
            <h2 className="text-[36px] sm:text-[56px] font-[900] text-white leading-[1.05] tracking-tight">
              THE TEONOX DIFFERENCE
            </h2>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-2xl space-y-6">
            <p className="font-sora text-base sm:text-xl font-extrabold text-[#FF8A50] leading-relaxed tracking-wide">
              Marketing Mindset + Business Thinking + Digital Skills + AI + Real-World Application + Communication + Career Readiness + Personal Branding + Professional Network
            </p>
            <div className="h-px bg-white/10 w-full" />
            <p className="font-inter text-base sm:text-lg text-[#D0C3B6] max-w-3xl mx-auto leading-relaxed">
              That is why TEONOX is not designed to be another Digital Marketing institute competing on how cheaply information can be delivered.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <p className="font-sora text-base sm:text-lg font-bold text-center text-white">It is designed to bridge the gap between:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Learning and doing" },
                { label: "Knowledge and Capability" },
                { label: "Education and Industry" },
                { label: "Potential and Performance" }
              ].map((box, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -2 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2 hover:bg-white/10 transition-all flex items-center gap-3"
                >
                  <span className="w-3 h-3 rounded-full bg-[#F15A29] shrink-0" />
                  <p className="font-sora text-base sm:text-lg font-extrabold text-white">{box.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-2 flex flex-wrap items-center justify-center gap-4">
            <button type="button"
              onClick={() => onEnquireClick('Why TEONOX Final CTA')}
              className="px-10 py-5 rounded-full bg-[#F15A29] hover:bg-[#D9491D] text-white font-sora text-sm sm:text-base font-extrabold uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Enquire For Admissions</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button type="button"
              onClick={onExplorePrograms}
              className="px-9 py-5 rounded-full bg-white hover:bg-[#FAF8F5] text-[#111111] font-sora text-sm sm:text-base font-bold border border-white/20 transition-all cursor-pointer shadow-md"
            >
              <span>Explore All Programs</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
