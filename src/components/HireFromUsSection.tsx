import { motion } from 'motion/react';
import { ArrowRight, MessageSquare, Sparkles, CheckCircle2, TrendingUp, Cpu, Award, Target, Briefcase, Zap, Rocket } from 'lucide-react';
import { PartnerLogos } from './PartnerLogos';

// High-quality stock visuals (Unsplash, auto-WebP)
const imgRecruiterHero = '/images/hire-talent-handshake.webp';

interface HireFromUsSectionProps {
  onEnquireHire: () => void;
}

export function HireFromUsSection({ onEnquireHire }: HireFromUsSectionProps) {
  
  // Section 02 - Talent Pipeline Roles
  const talentPipeline = [
    {
      id: '01',
      title: 'Digital Marketing & Growth Professionals',
      subtitle: 'Performance Marketing & SEO',
      tags: ['Meta & Google Ads', 'SEO Optimization', 'Growth Loops'],
      icon: TrendingUp,
    },
    {
      id: '02',
      title: 'AI & Business Analytics Talent',
      subtitle: 'Automations & Data Dashboards',
      tags: ['AI Workflows', 'PowerBI / Tableau', 'Predictive Modeling'],
      icon: Cpu,
    },
    {
      id: '03',
      title: 'Sales & Revenue Operations Professionals',
      subtitle: 'CRM & High-Velocity Pipelines',
      tags: ['HubSpot / Salesforce', 'Outbound Strategy', 'Revenue Funnels'],
      icon: Briefcase,
    },
    {
      id: '04',
      title: 'Full-Stack Business Growth Professionals',
      subtitle: 'Cross-Functional Strategy',
      tags: ['Campaign Strategy', 'Product Growth', '360° Execution'],
      icon: Rocket,
    },
  ];

  // Section 03 - Why Hire Pillars
  const whyHirePillars = [
    {
      number: '01',
      title: 'Trained on real business scenarios',
      description: 'Learners work on actual brand projects, live campaigns, and business challenges, not textbook theory.',
      icon: Briefcase,
      highlight: 'Live Brand Projects',
    },
    {
      number: '02',
      title: 'AI & data-first mindset',
      description: 'Every professional is trained to leverage AI tools, analytics platforms, and data-driven decision making.',
      icon: Cpu,
      highlight: '10x AI Productivity',
    },
    {
      number: '03',
      title: 'Strong communication & sales',
      description: 'Built with soft skills, confidence, and business acumen needed to thrive in client-facing roles.',
      icon: Target,
      highlight: 'Client-Facing Ready',
    },
    {
      number: '04',
      title: 'Outcome-driven execution',
      description: 'Hire people who think in terms of impact, metrics, and results, not just task completion.',
      icon: Zap,
      highlight: 'Day-1 ROI Delivery',
    },
  ];

  return (
    <>
      {/* ────────────────────────────────────────
          SECTION 01 - HIRE FROM US (HERO)
          ──────────────────────────────────────── */}
      <section id="hire-from-us" className="py-10 sm:py-14 bg-white relative overflow-hidden border-t border-[#F0DFCE]">
        {/* Background Soft Ambient Glows */}
        
        {/* Subtle Dotted Architectural Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#F15A29_0.75px,transparent_0.75px)] [background-size:32px_32px] opacity-[0.035] pointer-events-none -z-0" />

        <div className="w-[80%] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Content (6 Columns on Desktop for balanced breathing space) */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 text-left"
            >
              {/* Large Heading */}
              <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] tracking-tight leading-[1.18] mb-4">
                Hire Business-Ready Talent in Pune.{' '}
                <span className="text-[#F15A29] mt-1 relative">
                  Not Just Certified Candidates.
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#F15A29]/25" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,15 C30,5 70,20 100,8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>

              {/* Description */}
              <p className="font-inter text-[17px] sm:text-[18px] font-[400] text-[#555555] leading-[1.7] mb-8 max-w-[580px]">
                TEONOX, Pune's practical Corporate AI automation training institute, prepares learners through hands-on projects, real industry exposure, AI-powered workflows, and live business challenges so you hire execution-ready professionals in Digital Marketing, AI & Automation, Data Analytics, and Sales, right here in Pune.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Primary CTA */}
                <button
                  onClick={onEnquireHire}
                  className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#F15A29] hover:bg-[#D9491B] text-white font-sora text-[15px] font-[700] shadow-[0_12px_28px_rgba(241,90,41,0.28)] hover:shadow-[0_18px_38px_rgba(241,90,41,0.4)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer overflow-hidden"
                >
                  <Sparkles className="w-4.5 h-4.5 fill-white/20 relative z-10" />
                  <span className="relative z-10">Request Talent</span>
                  <ArrowRight className="w-4.5 h-4.5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>

                {/* Secondary CTA */}
                <button
                  onClick={onEnquireHire}
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-white hover:bg-[#FAF6F2] text-[#111111] font-sora text-[15px] font-[600] border border-[#E0D5C8] hover:border-[#F15A29] shadow-xs transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <MessageSquare className="w-4.5 h-4.5 text-[#F15A29]" />
                  <span>Speak to Our Team</span>
                </button>
              </div>


            </motion.div>

            {/* Right Editorial Hero Image Visual (6 Columns on Desktop) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative"
            >
              {/* Outer Premium Frame with Soft Glassmorphism Layering */}
              <div className="relative rounded-[28px] p-3 sm:p-4 bg-gradient-to-b from-white via-[#FAF6F2] to-[#FFF4EE] border border-[#F3E6DC] shadow-[0_20px_50px_-15px_rgba(241,90,41,0.12)] backdrop-blur-xl group">
                
                {/* Ultra-realistic Editorial Image */}
                <div className="relative rounded-[20px] overflow-hidden border border-[#EDE1D6] aspect-[4/3] bg-[#FAF6F2]">
                  <img
                    src={imgRecruiterHero}
                    alt="TEONOX Recruiter Handshake with Business-Ready Indian Talent"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out" loading="lazy" decoding="async" />

                  {/* Subtle Ambient Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#201A17]/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Geometric Badges */}
                <div className="absolute -top-3 -left-3 w-11 h-11 bg-white rounded-2xl border border-[#F0E5DC] shadow-md flex items-center justify-center text-[#F15A29] -rotate-6 hidden sm:flex">
                  <Award className="w-5 h-5" />
                </div>

                <div className="absolute -bottom-3 -right-3 w-11 h-11 bg-white rounded-2xl border border-[#F0E5DC] shadow-md flex items-center justify-center text-[#F15A29] rotate-6 hidden sm:flex">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ────────────────────────────────────────
          SECTION 02 - TALENT PIPELINE
          ──────────────────────────────────────── */}
      <section id="talent-pipeline" className="py-10 sm:py-14 bg-[#FAF8F5] relative overflow-hidden border-t border-[#F0DFCE]">
        {/* Soft Background Accent */}

        <div className="w-[80%] mx-auto relative z-10">
          {/* Header */}
          <div className="text-left max-w-2xl mb-10">
            <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] tracking-tight leading-[1.18] mb-2">
              Who You Can Hire From TEONOX
            </h2>
            <p className="font-sora text-[15px] sm:text-[17px] font-[600] text-[#555555]">
              Trained for Impact. Ready to Contribute.
            </p>
          </div>

          {/* Connected Horizontal Timeline with Circular Image Cards */}
          <div className="relative">
            
            {/* Curved Connector Line across desktop cards */}
            <div className="hidden lg:block absolute top-[90px] left-[10%] right-[10%] h-16 pointer-events-none z-0">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 60" fill="none">
                <path
                  d="M 50 30 C 200 5, 300 55, 450 30 C 600 5, 700 55, 850 30"
                  stroke="#F15A29"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  opacity="0.35"
                  fill="none"
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {talentPipeline.map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="group relative bg-white/90 backdrop-blur-xl border border-[#F2E6DC] hover:border-[#F15A29] rounded-[28px] p-6 shadow-[0_8px_28px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_42px_rgba(241,90,41,0.14)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between items-center text-center"
                >
                  {/* Top Step Pill */}
                  <span className="font-mono text-[12px] font-[800] text-[#F15A29] px-3 py-0.5 rounded-full bg-[#FFF0EB] border border-[#F8E3D8] mb-5">
                    {role.id}
                  </span>

                  {/* Circular Realistic Image Avatar with Glowing Border */}
                  <div className="relative mb-6 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden p-1 bg-gradient-to-b from-[#F15A29] to-[#FF9E7D] shadow-[0_10px_25px_rgba(241,90,41,0.22)]">
                      <div className="w-full h-full rounded-full bg-[#FFF0EB] flex items-center justify-center">
                        <role.icon className="w-12 h-12 text-[#FF5722]" strokeWidth={1.75} />
                      </div>
                    </div>
                    {/* Floating mini badge */}
                    <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white border border-[#F0E3D8] shadow-md flex items-center justify-center text-[#F15A29]">
                      <CheckCircle2 className="w-4 h-4 fill-[#F15A29]/10" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h4 className="font-sora text-[17.5px] font-[700] text-[#201A17] leading-snug mb-2 group-hover:text-[#F15A29] transition-colors">
                      {role.title}
                    </h4>
                    <p className="font-inter text-[13.5px] font-[500] text-[#8C7E72]">
                      {role.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ────────────────────────────────────────
          CAREER OUTCOMES - HIRING PARTNERS
          ──────────────────────────────────────── */}
      <PartnerLogos />


      {/* ────────────────────────────────────────
          SECTION 03 - VALUE PROPOSITION
          ──────────────────────────────────────── */}
      <section id="value-proposition" className="py-10 sm:py-14 bg-white relative overflow-hidden border-t border-[#F0DFCE]">
        {/* Soft Background Accent */}

        <div className="w-[80%] mx-auto relative z-10">
          {/* Header */}
          <div className="text-left max-w-2xl mb-10">
            <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] tracking-tight leading-[1.18]">
              Why Hire From <span className="text-[#F15A29] heading-accent">TEONOX</span>
            </h2>
          </div>

          {/* Four Connected Glassmorphism Blocks with Flowing Journey Line */}
          <div className="relative">
            
            {/* Flowing Curved Journey Line */}
            <div className="hidden lg:block absolute top-[110px] left-[5%] right-[5%] h-24 pointer-events-none z-0">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 80" fill="none">
                <path
                  d="M 50 40 C 200 80, 300 0, 450 40 C 600 80, 700 0, 850 40 C 900 60, 950 40, 950 40"
                  stroke="#F15A29"
                  strokeWidth="2.5"
                  strokeDasharray="7 7"
                  opacity="0.3"
                  fill="none"
                />
              </svg>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {whyHirePillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.12 }}
                    className="group relative bg-white/90 backdrop-blur-xl border border-[#F2E6DC] hover:border-[#F15A29] rounded-[28px] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_22px_44px_rgba(241,90,41,0.12)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Top Right Accent Box */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#F15A29]/5 rounded-tr-[28px] rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <div>
                      {/* Top Step & Icon */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-mono text-[13px] font-[800] text-[#F15A29] px-3 py-1 rounded-full bg-[#FFF0EB] border border-[#F8E3D8]">
                          {pillar.number}
                        </span>

                        <div className="w-11 h-11 rounded-2xl bg-[#FAF4EF] group-hover:bg-[#FFF0EB] flex items-center justify-center text-[#201A17] group-hover:text-[#F15A29] transition-colors border border-[#F0E3D8]">
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Title */}
                      <h4 className="font-sora text-[19px] font-[700] text-[#201A17] mb-3 group-hover:text-[#F15A29] transition-colors leading-snug">
                        {pillar.title}
                      </h4>

                      {/* Description */}
                      <p className="font-inter text-[14.5px] font-[400] text-[#665A4E] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Highlight Chip at bottom */}
                    <div className="mt-5 pt-4 border-t border-[#F0E3D8]">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF0EB] border border-[#F8E3D8] font-sora text-[12px] font-[700] text-[#F15A29]">
                        <TrendingUp className="w-3 h-3" />
                        {pillar.highlight}
                      </span>
                    </div>

                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
