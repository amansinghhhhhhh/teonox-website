import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, Target, Compass,
  Lightbulb, CheckCircle2, Zap, GraduationCap, TrendingUp, Users, Briefcase,
  Rocket, Building2, ShieldCheck, Award, Layers, Brain, MessageSquareText,
  BarChart3, Search, Share2, Bot, UserCheck, Quote, Globe, Cpu
} from 'lucide-react';
import { SEO } from './SEO';
import { BreadcrumbSchema } from './schema/BreadcrumbSchema';

import heroImg from '../assets/images/about/about_hero.webp';
import imgLeader from '../assets/images/about/sir.webp';
import imgAbstractSphere from '../assets/images/about_abstract_sphere_1785405313900.webp';
import imgStudentPromise from '../assets/images/about/promise.webp';
import imgGallery1 from '../assets/images/about_gallery_collaboration_1785405341342.webp';
import imgGallery2 from '../assets/images/about_gallery_workshop_1785405360873.webp';
import imgGallery3 from '../assets/images/about_gallery_working_1785405378588.webp';
import { MomentsSection } from './sections/MomentsSection';

interface AboutUsPageProps {
  onEnquireClick: (topic?: string) => void;
}

/* ─── tiny helper so we don't need framer-motion's stagger util ─── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as any },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -36 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as any },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 36 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as any },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as any },
});

export function AboutUsPage({ onEnquireClick }: AboutUsPageProps) {
  const stats = [
    { value: '12+', label: 'Years Industry Experience' },
    { value: '50+', label: 'AI & Business Tools' },
    { value: '100%', label: 'Practical Learning' },
    { value: '5+', label: 'Industry Programs' },
  ];

  const differentiators = [
    { num: '01', contrast: 'Most institutes teach platforms.', title: 'We teach business.', desc: 'Understanding consumer behavior, business revenue models, and strategy behind every digital dollar spent.' },
    { num: '02', contrast: 'Most courses explain features.', title: 'We explain why they matter.', desc: 'Focusing on market impact, funnel dynamics, and business ROI rather than just clicking buttons in a dashboard.' },
    { num: '03', contrast: 'Most programs stop at knowledge.', title: 'We focus on application & outcomes.', desc: 'Every module builds tangible portfolio artifacts, live campaign execution, and practical problem-solving.' },
  ];

  const philosophy = [
    { num: '1', label: 'LEARN', color: 'from-[#FF6A2B] to-[#FF9A5C]', desc: 'Build strong foundations in Marketing, Business, Consumer Psychology, Technology, Data and Artificial Intelligence.' },
    { num: '2', label: 'APPLY', color: 'from-[#D8420F] to-[#FF6A2B]', desc: 'Transform knowledge into capability through practical assignments, live brand projects, simulations, case studies and execution.' },
    { num: '3', label: 'LEAD',  color: 'from-[#201A17] to-[#3D2B1F]', desc: 'Develop the confidence, communication, ownership and leadership skills required to create meaningful business impact.' },
  ];

  const pillars = [
    { icon: Building2, title: 'Business-First Curriculum', desc: 'Rooted in real corporate strategy' },
    { icon: Rocket, title: 'Practical Assignments & Live Projects', desc: 'Hands-on execution on real brands' },
    { icon: Bot, title: 'AI-Integrated Learning', desc: 'Modern prompt engineering & automation' },
    { icon: Layers, title: 'Industry Case Studies', desc: 'Breakdowns of top global campaigns' },
    { icon: Zap, title: 'Marketing Simulations', desc: 'Risk-free budget allocation labs' },
    { icon: Briefcase, title: 'Portfolio Development', desc: 'Showcaseable work for hiring managers' },
    { icon: UserCheck, title: 'Career Coaching', desc: 'Personalized guidance & pathway planning' },
    { icon: Users, title: 'Industry Mentorship', desc: 'Sessions with seasoned leaders' },
    { icon: Award, title: 'Interview Preparation', desc: 'Mock interviews, scenarios & confidence' },
    { icon: MessageSquareText, title: 'Continuous Feedback', desc: 'Constructive evaluation on every output' },
  ];

  const learners = [
    { icon: GraduationCap, title: 'Students', desc: 'Preparing for your first high-impact career in digital business' },
    { icon: TrendingUp, title: 'Working Professionals', desc: 'Looking to upskill, master AI, and accelerate career promotion' },
    { icon: Building2, title: 'Business Owners', desc: 'Seeking sustainable growth, revenue scale, and digital transformation' },
    { icon: Lightbulb, title: 'Entrepreneurs', desc: 'Building a startup with clear market strategy and growth funnel' },
    { icon: Globe, title: 'Freelancers', desc: 'Expanding your high-ticket client services and agency offerings' },
    { icon: Cpu, title: 'Corporate Teams', desc: 'Embracing digital transformation and AI integration at scale' },
  ];

  const skills = [
    'Marketing & Consumer Psychology', 'Artificial Intelligence', 'Performance Marketing',
    'Search & Organic Growth', 'Social Media Growth', 'Data & Analytics',
    'Business Strategy', 'Automation', 'Sales Psychology',
    'Personal Branding', 'Communication Skills', 'Growth Mindset', 'Entrepreneurship',
  ];

  return (
    <div className="pt-20 sm:pt-24 pb-0 bg-white min-h-screen text-[#201A17] font-['Sora',sans-serif] overflow-x-hidden">
      <SEO
        title="Business Digital Marketing Classes in Pune | Teonox"
        description="Learn business digital marketing classes in Pune at Teonox, a trusted digital marketing training institute with practical, placement-focused courses."
        canonical="/about"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About TEONOX',
          url: 'https://teonox.com/about',
        }}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ]} />

      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#FFF8F5] via-white to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#F15A29_0.7px,transparent_0.7px)] [background-size:28px_28px] opacity-[0.03] pointer-events-none" />

        <div className="w-[88%] max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-14">

            {/* Left */}
            <motion.div {...fadeLeft(0)} className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.h1 {...fadeUp(0.1)} className="font-sora text-[28px] sm:text-[38px] lg:text-[46px] font-[900] text-[#111111] tracking-tight leading-[1.12]">
                Building Future-Ready Professionals for the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6A2B] to-[#D8420F]">
                  Digital & AI Economy
                </span>
              </motion.h1>

              <motion.div {...fadeUp(0.15)} className="space-y-4 font-inter text-[15.5px] sm:text-[17px] leading-[1.75] text-[#444444]">
                <p>
                  The world of business is changing faster than ever. Artificial Intelligence is transforming industries. Digital technologies are redefining customer behavior. Companies are no longer looking for people who simply hold degrees, they are looking for professionals who can think strategically, solve business problems, embrace technology, and create measurable impact.
                </p>
                <p className="font-semibold text-[#111111]">
                  TEONOX was created to bridge that gap. We are a School of Marketing, AI and Business dedicated to preparing students, professionals, entrepreneurs, and business leaders for the opportunities of the Digital & AI era.
                </p>
              </motion.div>

              {/* Stat row */}
              <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {stats.map((s, i) => (
                  <motion.div key={s.label} {...scaleIn(0.22 + i * 0.07)}
                    className="bg-white border border-[#FFE8D6] rounded-2xl p-4 text-center shadow-sm hover:border-[#FF6A2B] hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="font-sora text-[26px] font-[900] text-[#FF6A2B] leading-none mb-1 group-hover:scale-105 transition-transform">{s.value}</div>
                    <div className="font-inter text-[11px] text-[#777777] leading-tight">{s.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right hero image */}
            <motion.div {...fadeRight(0.1)} className="lg:col-span-5 relative">
              <div className="relative rounded-[28px] overflow-hidden border-2 border-[#F0DFCE] shadow-2xl group p-2.5 bg-white">
                <div className="rounded-[20px] overflow-hidden">
                  <img
                    src={heroImg}
                    alt="TEONOX team"
                    className="w-full h-[320px] sm:h-[420px] object-cover object-center group-hover:scale-[1.05] transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Core Mission Banner */}
          <motion.div {...fadeUp(0.25)}>
            <div className="p-7 sm:p-10 rounded-3xl bg-white border border-[#FFE8D6] shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF6A2B]/5 rounded-bl-full pointer-events-none" />
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-[#FFF0EB] flex items-center justify-center text-[#FF6A2B] shrink-0 shadow-sm">
                  <Target className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FF6A2B] font-bold">OUR CORE MISSION</span>
                  <h2 className="font-sora text-[20px] sm:text-[26px] font-[800] text-[#111111] mt-1">To transform learning into real-world capability.</h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
                {[
                  'Not just through theory, but through <strong>execution</strong>.',
                  'Not just through certifications, but through <strong>competence</strong>.',
                  'Not just by teaching tools, but by developing <strong>business thinkers</strong>.',
                ].map((text, i) => (
                  <motion.div key={i} {...scaleIn(0.3 + i * 0.08)}
                    className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#FFE8D6] flex items-start gap-3 group hover:border-[#FF6A2B] hover:bg-[#FFF4EE] transition-all"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#FF6A2B] shrink-0 mt-0.5" />
                    <span className="font-inter text-[14.5px] font-medium text-[#222222]" dangerouslySetInnerHTML={{ __html: text }} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          SECTION 02 - OUR STORY
      ═══════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-white relative border-t border-[#F0DFCE]">
        <div className="w-[88%] max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            <motion.div {...fadeLeft(0)} className="lg:col-span-7 space-y-6">
              <h2 className="font-sora text-[30px] sm:text-[40px] font-[900] leading-tight text-[#111111] tracking-tight leading-[1.15]">
                Built on <span className="text-[#FF6A2B]">12+ Years</span> of Real Agency Experience at A2 Digital
              </h2>
              <div className="space-y-4 font-inter text-[15.5px] sm:text-[16.5px] leading-[1.75] text-[#444444]">
                <p>TEONOX is built on over 12 years of industry experience gained through A2 Digital, a company that has partnered with businesses across industries to solve marketing, technology, growth, analytics, automation, and digital transformation challenges.</p>
                <p>Over the years, one pattern became impossible to ignore: Thousands of graduates entered the job market every year with qualifications, but many struggled when faced with real business challenges.</p>
                <p className="font-semibold text-[#111111]">TEONOX was created to change that. Our programs are designed by industry practitioners who understand what businesses actually expect from modern professionals.</p>
              </div>
            </motion.div>

            <motion.div {...fadeRight(0.1)} className="lg:col-span-5 relative">
              <div className="relative rounded-[28px] overflow-hidden border border-slate-200 shadow-2xl bg-slate-50 group p-2 bg-white">
                <div className="rounded-[20px] overflow-hidden">
                  <img
                    src={imgLeader}
                    alt="A2 Digital Founder & Mentors at TEONOX"
                    className="w-full h-[480px] sm:h-[560px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          SECTION 03 - VISION & MISSION
      ═══════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-[#FAFAFC] border-t border-[#F0DFCE]">
        <div className="w-[88%] max-w-7xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <h2 className="font-sora text-[30px] sm:text-[40px] font-[900] leading-tight text-[#111111]">Vision & Mission</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { icon: Compass, label: 'OUR VISION', title: "India's Most Trusted Digital Marketing Business School", texts: ["To become India's most trusted Digital Marketing Business School by developing professionals who can create value through Marketing, Business, Technology and Artificial Intelligence.", "We envision a future where education is measured not by classroom hours or certificates, but by the ability to solve problems, create opportunities and drive business growth."] },
              { icon: Target, label: 'OUR MISSION', title: 'Bridging Education & Industry Execution', texts: ['Our mission is to bridge the gap between education and industry by delivering practical, business-first learning that combines Digital Marketing, Artificial Intelligence, Business Strategy and real-world execution.', 'We strive to empower every learner with the confidence to think independently, execute professionally and lead responsibly.'] },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.label} {...fadeUp(i * 0.12)}
                  className="p-9 sm:p-11 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-[#FF6A2B]/50 transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6A2B]/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="w-14 h-14 rounded-2xl bg-[#FFF0EB] text-[#FF6A2B] flex items-center justify-center mb-6 group-hover:bg-[#FF6A2B] group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FF6A2B] font-bold">{card.label}</span>
                  <h3 className="font-sora text-[22px] sm:text-[26px] font-[800] text-[#111111] mt-2 mb-5 leading-snug">{card.title}</h3>
                  {card.texts.map((t, ti) => (
                    <p key={ti} className={`font-inter text-[15.5px] leading-relaxed ${ti === 0 ? 'text-[#555555]' : 'text-[#222222] font-medium mt-3'}`}>{t}</p>
                  ))}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          SECTION 04 - WHAT MAKES TEONOX DIFFERENT
      ═══════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-white border-t border-[#F0DFCE]">
        <div className="w-[88%] max-w-7xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="font-sora text-[30px] sm:text-[42px] font-[900] leading-[1.15] text-[#111111]">
              What Makes TEONOX <span className="text-[#FF6A2B]">Different?</span>
            </h2>
            <p className="font-inter text-[16px] text-[#555555]">At TEONOX, learning extends beyond software and certifications into true business capability.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-8">
            {differentiators.map((d, i) => (
              <motion.div key={d.num} {...fadeUp(i * 0.12)}
                className="relative p-8 sm:p-10 rounded-3xl bg-[#FFF9F5] border border-[#FFE8D6] overflow-hidden group hover:border-[#FF6A2B] hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
              >
                {/* big number watermark — pinned top-right, faded on mobile so it never overlaps copy */}
                <div className="absolute -top-4 -right-2 font-mono text-[52px] sm:text-[80px] font-extrabold text-[#FFD8C0] opacity-60 sm:opacity-100 group-hover:text-[#FF6A2B]/20 transition-colors leading-none select-none pointer-events-none">{d.num}</div>
                <p className="font-inter text-[13px] text-[#999999] mb-2 italic relative z-10">{d.contrast}</p>
                <h3 className="font-sora text-[22px] sm:text-[24px] font-[800] text-[#111111] mb-4 relative z-10 group-hover:text-[#FF6A2B] transition-colors">{d.title}</h3>
                <div className="border-t border-[#FFE2CC] pt-4 relative z-10">
                  <p className="font-inter text-[14.5px] text-[#444444] leading-relaxed">{d.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quote banner */}
          <motion.div {...fadeUp(0.3)}
            className="p-8 sm:p-10 rounded-3xl bg-[#201A17] text-white text-center relative overflow-hidden"
          >
            <Quote className="w-10 h-10 text-[#FF6A2B]/40 mx-auto mb-4 fill-[#FF6A2B]/10" />
            <p className="font-sora text-[17px] sm:text-[21px] font-semibold text-amber-100 max-w-4xl mx-auto leading-relaxed relative z-10">
              "At TEONOX, learning extends beyond software and certifications. We develop professionals who understand customers, marketing, communication, technology, analytics, AI and business growth as an interconnected system."
            </p>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          SECTION 05 - TEONOX PHILOSOPHY
      ═══════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-[#111111] text-white relative overflow-hidden border-t border-[#F0DFCE]">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="w-[88%] max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeUp(0)} className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="font-sora text-[30px] sm:text-[42px] font-[900] leading-[1.15] text-white">The TEONOX <span className="text-[#FF6A2B]">Philosophy</span></h2>
            <p className="font-inter text-[16px] text-[#A79885]">Education should prepare you not only for your first job, but for an entire career.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {philosophy.map((p, i) => (
              <motion.div key={p.label} {...fadeUp(i * 0.14)}
                className="relative p-9 rounded-3xl bg-[#1A1816] border border-white/10 hover:border-[#FF6A2B]/60 group hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6A2B]/8 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center font-sora font-extrabold text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {p.num}
                </div>
                <h3 className="font-sora text-[28px] font-[900] text-white mb-4 tracking-wide">{p.label}</h3>
                <p className="font-inter text-[15px] leading-relaxed text-[#C5BCB3] group-hover:text-white/90 transition-colors">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          SECTION 06 - LEARNING EXPERIENCE 10 PILLARS
      ═══════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-white border-t border-[#F0DFCE]">
        <div className="w-[88%] max-w-7xl mx-auto">
          <motion.div {...fadeUp(0)} className="max-w-3xl mb-14 space-y-3">
            <h2 className="font-sora text-[30px] sm:text-[42px] font-[900] leading-[1.15] text-[#111111]">
              The TEONOX <span className="text-[#FF6A2B]">Learning Experience</span>
            </h2>
            <p className="font-inter text-[16px] text-[#555555]">Every TEONOX program is designed around experiential learning. Our learners don't just watch demonstrations, they actively participate in solving real business challenges.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pillars.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div key={idx} {...fadeUp(0.04 + Math.floor(idx / 5) * 0.1 + (idx % 5) * 0.06)}
                  className="p-6 rounded-2xl bg-[#FFF9F5] border border-[#FFE8D6] hover:border-[#FF6A2B] hover:shadow-lg hover:-translate-y-1.5 transition-all duration-400 flex flex-col gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#FFF0EB] text-[#FF6A2B] flex items-center justify-center group-hover:bg-[#FF6A2B] group-hover:text-white transition-all duration-300 shadow-sm">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sora text-[14.5px] font-[700] text-[#111111] leading-snug mb-1.5 group-hover:text-[#FF6A2B] transition-colors">{item.title}</h3>
                    <p className="font-inter text-[12px] text-[#777777]">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div {...fadeUp(0.4)} className="mt-8 p-7 rounded-2xl bg-gradient-to-r from-[#FFF9F5] to-[#FAFAFC] border border-[#FFE8D6] text-center">
            <p className="font-sora font-semibold text-[#222222] text-[15.5px] sm:text-[17px]">Our goal is to help learners understand not only <em>how</em> something works, but <em>why</em> it works and <em>when</em> to apply it.</p>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          SECTION 07 - BEYOND DIGITAL MARKETING
      ═══════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-[#FAFAFC] border-t border-[#F0DFCE]">
        <div className="w-[88%] max-w-7xl mx-auto">
          <motion.div {...fadeUp(0)} className="max-w-3xl mb-10 space-y-3">
            <h2 className="font-sora text-[30px] sm:text-[40px] font-[900] leading-tight text-[#111111]">Beyond <span className="text-[#FF6A2B]">Digital Marketing</span></h2>
            <p className="font-inter text-[16px] text-[#555555]">While Digital Marketing remains one of our core strengths, TEONOX believes that modern professionals require a broader understanding of business. Our curriculum integrates:</p>
          </motion.div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap w-full gap-2.5">
            {skills.map((skill, index) => (
              <motion.div key={index} {...scaleIn(0.03 * index)}
                className="w-full sm:w-auto self-start px-3.5 py-2 sm:px-5 sm:py-3 rounded-2xl bg-white border border-slate-200 shadow-xs text-[#201A17] font-sora text-[13px] sm:text-[14.5px] font-semibold hover:border-[#FF6A2B] hover:bg-[#FFF8F5] hover:text-[#D8420F] hover:-translate-y-0.5 transition-all inline-flex items-center gap-2 cursor-default whitespace-nowrap"
              >
                <div className="w-2 h-2 rounded-full bg-[#FF6A2B]" />
                {skill}
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeUp(0.3)} className="font-inter text-[15px] font-medium text-[#444444] mt-8 italic">
            Because successful careers are built through the combination of technical skills, business thinking and continuous learning.
          </motion.p>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          SECTION 08 - BUILT FOR EVERY LEARNER
      ═══════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-white border-t border-[#F0DFCE]">
        <div className="w-[88%] max-w-7xl mx-auto">
          <motion.div {...fadeUp(0)} className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="font-sora text-[30px] sm:text-[42px] font-[900] leading-[1.15] text-[#111111]">Built for <span className="text-[#FF6A2B]">Every Learner</span></h2>
            <p className="font-inter text-[16px] text-[#555555]">TEONOX provides structured learning pathways designed to support your specific professional goals.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {learners.map((l, idx) => {
              const Icon = l.icon;
              return (
                <motion.div key={idx} {...fadeUp(0.06 * idx)}
                  className="p-7 rounded-3xl bg-[#FFF9F5] border border-[#FFE8D6] hover:border-[#FF6A2B] hover:shadow-xl hover:-translate-y-2 transition-all duration-400 group flex items-start gap-5"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF0EB] text-[#FF6A2B] flex items-center justify-center shrink-0 group-hover:bg-[#FF6A2B] group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-sora text-[19px] font-[800] text-[#111111] mb-2 group-hover:text-[#FF6A2B] transition-colors">{l.title}</h3>
                    <p className="font-inter text-[14px] text-[#555555] leading-relaxed">{l.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          SECTION 09 - INDUSTRY ALIGNED FUTURE FOCUSED
      ═══════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-[#201A17] text-white border-t border-[#F0DFCE] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
        <div className="w-[88%] max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div {...fadeLeft(0)} className="lg:col-span-8 space-y-5">
              <h2 className="font-sora text-[28px] sm:text-[40px] font-[900] text-white leading-[1.15]">
                Industry-Aligned. <span className="text-[#FF6A2B]">Future-Focused.</span>
              </h2>
              <p className="font-inter text-[16px] sm:text-[17.5px] leading-relaxed text-[#D0C5B8]">Technology continues to evolve. AI continues to redefine industries. Consumer expectations continue to change. Businesses need professionals who can adapt, innovate and lead through change.</p>
              <p className="font-inter text-[16px] leading-relaxed text-amber-100 font-medium">That is why our curriculum is continuously aligned with emerging trends, evolving technologies and industry requirements, ensuring learners remain relevant in a rapidly changing digital landscape.</p>
            </motion.div>

            <motion.div {...fadeRight(0.15)} className="lg:col-span-4 flex justify-center">
              <div className="w-full p-8 pb-10 rounded-3xl bg-[#2B231F] border border-white/10 hover:border-[#FF6A2B]/50 transition-all duration-400 text-center space-y-4 group">
                <div className="w-16 h-16 rounded-2xl bg-[#FF6A2B]/15 flex items-center justify-center mx-auto group-hover:bg-[#FF6A2B] transition-all duration-300">
                  <ShieldCheck className="w-8 h-8 text-[#FF6A2B] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-sora text-xl font-bold text-white">Always Up-To-Date</h3>
                <p className="font-inter text-[13.5px] text-[#A79885] leading-relaxed">Curriculum refreshed quarterly with real industry input</p>
                <div className="flex flex-wrap gap-2 justify-center pt-4">
                  {['AI', 'Marketing', 'Data', 'Sales'].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-white/10 border border-white/15 font-sora text-[11px] font-[600] text-white/80">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          SECTION 10 - LIFE AT TEONOX (Video Reel)
      ═══════════════════════════════════════ */}
      <MomentsSection />


      {/* ═══════════════════════════════════════
          SECTION 11 - MORE THAN EDUCATION + PROMISE
      ═══════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-[#FFF9F5] border-t border-[#F0DFCE]">
        <div className="w-[88%] max-w-7xl mx-auto space-y-10">

          {/* More Than Education */}
          <motion.div {...fadeUp(0)} className="bg-white p-9 sm:p-12 rounded-3xl border border-[#FFE8D6] shadow-sm space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF6A2B]/5 rounded-bl-full pointer-events-none" />
            <h2 className="font-sora text-[28px] sm:text-[38px] font-[900] leading-tight text-[#111111]">
              More Than <span className="text-[#FF6A2B]">Education</span>
            </h2>
            <p className="font-inter text-[16px] sm:text-[17px] leading-relaxed text-[#444444]">
              TEONOX is not simply a place to attend classes, it's a learning ecosystem where knowledge, technology, mentorship and practical experience come together to build capable professionals.
            </p>
            <div className="p-7 sm:p-9 rounded-2xl bg-gradient-to-br from-[#FFF0EB] to-[#FFF8F5] border border-[#FFD8C0] text-center relative overflow-hidden">
              <Quote className="w-8 h-8 text-[#FF6A2B]/30 mx-auto mb-4 fill-[#FF6A2B]/15" />
              <p className="font-sora text-[17px] sm:text-[21px] font-extrabold text-[#D8420F] leading-snug max-w-3xl mx-auto">
                "We believe education should create confidence. Confidence should create capability. Capability should create opportunity. And opportunity should create leaders."
              </p>
            </div>
          </motion.div>

          {/* Our Promise */}
          <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-9 sm:p-12 rounded-3xl border border-[#FFE8D6] shadow-sm">
            <div className="lg:col-span-7 space-y-5">
              <h2 className="font-sora text-[28px] sm:text-[38px] font-[900] leading-tight text-[#111111]">Our <span className="text-[#FF6A2B]">Promise</span></h2>
              <div className="space-y-4 font-inter text-[16px] text-[#444444] leading-relaxed">
                <p className="font-semibold text-rose-600">We cannot promise instant success. We cannot promise shortcuts.</p>
                <p>What we do promise is an environment where motivated learners can build the skills, mindset and practical experience required to compete confidently in the Digital & AI economy.</p>
                <p className="font-medium text-[#111111]">Because real success comes from consistent learning, purposeful execution and continuous improvement.</p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative rounded-[24px] overflow-hidden border border-[#FFE8D6] shadow-lg group">
                <img src={imgStudentPromise} alt="TEONOX Student" className="rounded-2xl w-full h-auto min-h-[280px] object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════
          SECTION 12 - JOIN THE MOVEMENT CTA
      ═══════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#201A17] via-[#2A211D] to-[#17110D] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,106,43,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="w-[88%] max-w-5xl mx-auto text-center space-y-7 relative z-10">
          <motion.h2 {...fadeUp(0.08)} className="font-sora text-[34px] sm:text-[50px] font-[900] text-white leading-[1.1] tracking-tight">
            Join the TEONOX <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A50] to-[#FF6A2B]">Movement</span>
          </motion.h2>

          <motion.p {...fadeUp(0.15)} className="font-inter text-[16px] sm:text-[18px] text-[#D0C5B8] max-w-2xl mx-auto leading-relaxed">
            The future belongs to individuals who are willing to learn continuously, adapt fearlessly and lead with purpose. Whether your goal is to build a rewarding career, grow your business, or make a meaningful impact in the digital world, TEONOX is committed to helping you take that next step.
          </motion.p>

          <motion.div {...fadeUp(0.22)} className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onEnquireClick('About Us CTA - Join Movement')}
              className="group inline-flex items-center gap-2.5 px-9 py-4.5 rounded-full bg-[#FF6A2B] text-white hover:bg-[#D8420F] font-sora text-[15px] font-[700] transition-all shadow-[0_14px_32px_rgba(255,106,43,0.35)] hover:shadow-[0_20px_44px_rgba(255,106,43,0.5)] hover:-translate-y-0.5 active:scale-95"
            >
              <span>Speak with a Career Counsellor</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
