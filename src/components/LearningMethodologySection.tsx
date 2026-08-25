import { useState } from 'react';
import {
  Play,
  BookOpen,
  Target,
  CheckCircle2,
  MousePointerClick,
  FolderKanban,
  Lightbulb,
  RefreshCcw,
  FolderOpen,
  TrendingUp,
  Users,
  Rocket,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from './Reveal';

import learnImg from '../assets/images/learn-updated.webp';
import applyImg from '../assets/images/apply.webp';
import leadImg from '../assets/images/Lead.webp';

interface PhasePoint {
  icon: LucideIcon;
  text: string;
  desc: string;
}

interface Phase {
  id: string;
  number: string;
  label: string;
  heading: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  badge: string;
  points: PhasePoint[];
  outcome: string;
  tools: string[];
}

const PHASES: Phase[] = [
  {
    id: 'learn',
    number: '01',
    label: 'LEARN',
    heading: 'Build Industry-Ready AI & Digital Marketing Skills',
    subtitle: 'Learn from industry-driven curriculum.',
    image: learnImg,
    imageAlt: 'Indian student learning digital skills',
    badge: 'Phase 01 · LEARN',
    points: [
      {
        icon: Play,
        text: 'Live Masterclasses',
        desc: 'Learn directly from industry experts in live, interactive masterclasses.',
      },
      {
        icon: BookOpen,
        text: 'Fundamentals First',
        desc: 'Master SEO, social media, content and performance basics across every channel.',
      },
      {
        icon: Target,
        text: 'Industry-Ready Curriculum',
        desc: 'Modules shaped around what brands actually need today.',
      },
      {
        icon: CheckCircle2,
        text: 'Clear Outcomes',
        desc: 'Every module maps to a skill you can use the very next day.',
      },
    ],
    outcome: 'Walk away with a strong, well-rounded foundation across all core digital marketing channels.',
    tools: ['SEO', 'Social Media', 'Content', 'Email Marketing', 'Analytics Basics'],
  },
  {
    id: 'apply',
    number: '02',
    label: 'APPLY',
    heading: 'Apply Skills Through Practical Projects',
    subtitle: 'Apply through practical projects and real-world execution.',
    image: applyImg,
    imageAlt: 'Indian students working on practical projects',
    badge: 'Phase 02 · APPLY',
    points: [
      {
        icon: MousePointerClick,
        text: 'Real-Budget Ad Campaigns',
        desc: 'Run live paid campaigns with real ad budgets on Meta and Google.',
      },
      {
        icon: FolderKanban,
        text: 'Live Client Projects',
        desc: 'Work on real brand briefs and deliverable-driven projects.',
      },
      {
        icon: Lightbulb,
        text: 'Creative Delivery & Design',
        desc: 'Produce content and campaigns that look as good as they perform.',
      },
      {
        icon: RefreshCcw,
        text: 'Test, Measure & Iterate',
        desc: 'Optimise like a real marketer with data, feedback and quick iteration.',
      },
    ],
    outcome: 'Hands-on proof that you can run real campaigns and deliver measurable results.',
    tools: ['Meta Ads', 'Google Ads', 'Meta Business Suite', 'Canva'],
  },
  {
    id: 'lead',
    number: '03',
    label: 'LEAD',
    heading: 'Lead With AI, Automation & Business Skills',
    subtitle: 'Lead with skills, confidence and business thinking.',
    image: leadImg,
    imageAlt: 'Indian student leading with confidence',
    badge: 'Phase 03 · LEAD',
    points: [
      {
        icon: FolderOpen,
        text: 'Portfolio Case Studies',
        desc: 'Build polished case studies that showcase measurable impact.',
      },
      {
        icon: TrendingUp,
        text: 'Business & ROI Thinking',
        desc: 'Learn to connect marketing spend directly to business outcomes.',
      },
      {
        icon: Users,
        text: 'Ownership & Leadership',
        desc: 'Own projects end-to-end and present confidently to stakeholders.',
      },
      {
        icon: Rocket,
        text: 'Career Readiness',
        desc: 'Exit ready for jobs, internships and freelancing — on your terms.',
      },
    ],
    outcome: 'A portfolio and business mindset that makes you job-ready and business-ready.',
    tools: ['Google Analytics', 'Reporting', 'Pitch Decks', 'Portfolio'],
  },
];

/**
 * SECTION 03: LEARNING METHODOLOGY (LEARN. APPLY. LEAD.)
 * Interactive 3-phase stepper: tabs switch a 2-column content panel with the
 * phase image on the left and a detailed breakdown on the right.
 */
export function LearningMethodologySection() {
  const [activePhase, setActivePhase] = useState<Phase>(PHASES[0]);

  return (
    <section
      id="learn-apply-lead"
      className="py-10 sm:py-14 bg-[#FAF8F5] text-[#111111] relative overflow-hidden border-b border-[#EFEBE4]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <Reveal className="mb-8 sm:mb-10 text-left">
          <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] leading-[1.18] tracking-tight">
            Learning Methodology for <span className="text-[#F15A29] heading-accent">AI, Digital Marketing & Automation</span>
          </h2>
          <p className="font-inter text-[15px] sm:text-[16px] text-[#665A4E] leading-relaxed mt-3">
            At Teonox, we believe learning should be practical, interactive, and career-focused. Our Business Digital Marketing Classes in Pune combine industry-driven learning with live projects, real-world case studies, AI-powered tools, and hands-on campaign execution. Whether you're looking for a Digital Marketing Course in Pune, Digital Marketing Classes Online, or Offline Digital Marketing Courses in Pune, our flexible learning options help you build practical, industry-relevant skills with guidance from experienced professionals. If you're searching for a Digital Marketing Course Near Me, Teonox provides a hands-on learning experience designed to help you gain confidence, develop job-ready expertise, and build a successful career in digital marketing.
          </p>
        </Reveal>

        {/* ─── 3-Step Interactive Tab Bar ─── */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-10 sm:mb-12">
          {PHASES.map((phase) => {
            const active = activePhase.id === phase.id;
            return (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase)}
                aria-pressed={active}
                className={`relative text-left rounded-2xl px-3 sm:px-6 py-4 sm:py-5 border transition-all duration-300 cursor-pointer overflow-hidden ${
                  active
                    ? 'bg-[#FFF3EC] border-[#F15A29]/60 shadow-[0_12px_30px_-14px_rgba(241,90,41,0.45)]'
                    : 'bg-white border-[#E5E0D8] hover:border-[#F15A29]/40 hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-baseline gap-2.5">
                  <span
                    className={`font-mono text-[12px] sm:text-[13px] font-[800] ${
                      active ? 'text-[#F15A29]' : 'text-[#B0A69A]'
                    }`}
                  >
                    {phase.number}
                  </span>
                  <span
                    className={`font-sora text-[14px] sm:text-[17px] font-[800] tracking-wide ${
                      active ? 'text-[#111111]' : 'text-[#665A4E]'
                    }`}
                  >
                    {phase.label}
                  </span>
                </div>
                {/* Animated active indicator */}
                <span
                  className={`absolute bottom-0 left-0 h-[3px] rounded-full bg-gradient-to-r from-[#F15A29] to-[#FF8A50] transition-all duration-500 ${
                    active ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* ─── Dynamic Content Panel (2-Column) ─── */}
        <div key={activePhase.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left: Visual element */}
          <div className="relative h-[280px] sm:h-[360px] lg:h-full animate-zoom-in-soft">
            {/* Ambient glow */}
            <div className="absolute -inset-6 bg-[#F15A29]/15 blur-3xl rounded-full pointer-events-none" />
            <div className="relative h-full overflow-hidden rounded-2xl shadow-[0_30px_70px_-30px_rgba(0,0,0,0.4)]">
              <img
                src={activePhase.image}
                alt={activePhase.imageAlt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
              {/* Active phase badge */}
              <span className="absolute top-4 left-4 font-mono text-[11px] font-[800] text-white bg-[#F15A29] rounded-full px-3.5 py-1.5 shadow-md">
                {activePhase.badge}
              </span>
            </div>
          </div>

          {/* Right: Detailed breakdown */}
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[13px] font-[800] text-[#F15A29] bg-[#FFF0EB] border border-[#F3DCC9] rounded-full px-3 py-1">
                {activePhase.number}
              </span>
              <h3 className="font-sora text-[28px] sm:text-[34px] font-[800] leading-tight tracking-tight">
                {activePhase.heading}
              </h3>
            </div>
            <p className="font-inter text-[16px] sm:text-[17px] text-[#555555] leading-relaxed mt-2">
              {activePhase.subtitle}
            </p>

            {/* Key Focus Highlights */}
            <ul className="mt-6 space-y-3">
              {activePhase.points.map((point) => (
                <li
                  key={point.text}
                  className="flex gap-4 items-start bg-white border border-[#E5E0D8] rounded-2xl p-4 hover:border-[#F15A29]/50 transition-colors"
                >
                  <span className="w-10 h-10 rounded-xl bg-[#FFF0EB] text-[#F15A29] flex items-center justify-center shrink-0">
                    <point.icon className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-sora text-[15px] font-[700] text-[#111111]">{point.text}</p>
                    <p className="font-inter text-[13px] text-[#665A4E] mt-0.5 leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Outcome badge + Tool pill stack */}
            <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-[#111111] text-white">
              <span className="font-mono text-[10.5px] font-[700] uppercase tracking-[0.14em] text-[#FF8A50]">
                Key Takeaway
              </span>
              <p className="font-inter text-[14px] sm:text-[14.5px] text-white/85 leading-relaxed mt-1.5">
                {activePhase.outcome}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {activePhase.tools.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1 font-inter text-[12px] font-[600] text-white/90"
                  >
                    <Wrench className="w-3.5 h-3.5 text-[#FF8A50]" />
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}