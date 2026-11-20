import os

content = '''import React, { useEffect } from 'react';
import { ArrowRight, Briefcase, CalendarDays, Check, Clock, Compass, GraduationCap, MapPin, Monitor, UserPlus } from 'lucide-react';
import { SEO } from '../../components/SEO';
import '../CareerUnlocked/career-unlocked.css';
import './marketing-uncovered.css';

// Single source of truth for every CTA on this page.
const PAYMENT_URL = 'https://tagmango.com/your-payment-link';

const CAREER_PATHS = [
  'Performance Marketing',
  'Search Engine Optimisation (SEO)',
  'Social Media Marketing',
  'Content & Brand Strategy',
  'Marketing Analytics',
  'AI-Powered Marketing',
];

const WORKSHOP_DETAILS = [
  { label: 'Duration', value: '90 Minutes', Icon: Clock, hot: true },
  { label: 'Days', value: 'Every Wednesday & Saturday', Icon: CalendarDays, hot: true },
  { label: 'Mode', value: '[Online / Offline]', Icon: Monitor, hot: false },
  { label: 'Venue', value: '[TEONOX, Kothrud, Pune – for offline sessions]', Icon: MapPin, hot: false },
];

type UncoverItem = {
  number: string;
  title: string;
  body: string;
  paths?: string[];
};

const UNCOVER_ITEMS: UncoverItem[] = [
  {
    number: '01.',
    title: 'The World of Marketing',
    body:
      "Go beyond social media posts and advertisements. Understand what marketing really is, how businesses use it and why it plays a crucial role in today's economy.",
  },
  {
    number: '02.',
    title: "Career Opportunities You Didn't Know Existed",
    body: 'Explore different career paths, including:',
    paths: CAREER_PATHS,
  },
  {
    number: '03.',
    title: 'Is Marketing Right for You?',
    body:
      'Are you creative? Analytical? Curious about consumer behaviour? Interested in business and technology? Understand the mindset and skills required to succeed in marketing and discover whether your interests align with this industry.',
  },
  {
    number: '04.',
    title: 'What Companies Actually Look For',
    body:
      'Discover what businesses expect from marketing professionals, why practical skills matter and what makes someone employable in this competitive industry.',
  },
  {
    number: '05.',
    title: 'Your Roadmap Into Marketing',
    body:
      'Understand how beginners can get started, which skills to develop, how to gain practical experience and how to prepare for real-world opportunities.',
  },
];

const AUDIENCE = [
  {
    title: 'College Students',
    body:
      'Wondering what to do after graduation? Explore a career option that combines creativity, technology and business.',
    Icon: GraduationCap,
  },
  {
    title: 'Freshers',
    body:
      'Looking to enter a growing industry? Understand the skills and opportunities available to beginners.',
    Icon: UserPlus,
  },
  {
    title: 'Working Professionals',
    body:
      'Thinking about switching careers? Explore what transitioning into marketing could look like.',
    Icon: Briefcase,
  },
  {
    title: 'Curious Explorers',
    body:
      'Interested in marketing, AI, brands and business? Start by understanding how the industry works.',
    Icon: Compass,
  },
];

const WHY_ATTEND_POINTS = [
  'Understand the reality of the marketing industry.',
  'Explore different career possibilities.',
  'Identify the skills required.',
  'Understand industry expectations.',
  'Make a more informed career decision.',
];

const FAQS = [
  {
    question: 'Do I need prior knowledge of Digital Marketing?',
    answer:
      "No. This workshop is designed for beginners. You don't need any prior experience or technical knowledge.",
  },
  {
    question: 'How long is the workshop?',
    answer: 'The workshop is 90 minutes long.',
  },
  {
    question: 'When are the workshops conducted?',
    answer: 'Every Wednesday and Saturday.',
  },
  {
    question: 'Is this a course or a workshop?',
    answer:
      'Marketing Uncovered is a career discovery workshop. Its purpose is to help you understand the marketing industry and decide whether it interests you as a career.',
  },
  {
    question: 'Will I learn practical things about marketing?',
    answer:
      "Yes. You'll explore how marketing works, the different specialisations, the skills involved and how businesses use marketing in the real world.",
  },
  {
    question: 'Who can register?',
    answer:
      'College students, freshers, working professionals and anyone curious about exploring a career in marketing.',
  },
];

const CTA_CLASS =
  'mu-cta relative inline-flex items-center justify-center gap-2 overflow-hidden text-center rounded-2xl bg-gradient-to-r from-[#FF6B1A] to-[#E24A0B] text-white font-bold uppercase tracking-wide shadow-[0_18px_36px_-14px_rgba(226,74,11,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_48px_-14px_rgba(226,74,11,0.85)]';

function SectionHeading({
  children,
  center = false,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? 'text-center' : ''}>
      <div
        aria-hidden="true"
        className={`h-1.5 w-14 rounded-full bg-gradient-to-r from-[#FF6B1A] to-[#FFC93C] ${
          center ? 'mx-auto' : ''
        }`}
      />
      <h2 className="mt-4 text-2xl sm:text-4xl lg:text-[42px] font-extrabold font-display tracking-tight leading-[1.08]">
        {children}
      </h2>
    </div>
  );
}

/**
 * CSS-transition scroll reveals.
 *
 * Content is visible by default; this only hides blocks that are still below
 * the fold when the page mounts. If JS is unavailable, nothing is ever hidden.
 * A rAF-throttled scroll sweep (instead of IntersectionObserver alone) makes
 * sure fast flicks and anchor jumps can never leave a block invisible.
 */
function useSectionReveals() {
  useEffect(() => {
    const root = document.querySelector('.marketing-uncovered-lp');
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (items.length === 0) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      items.forEach((el) => el.classList.add('mu-reveal', 'is-in'));
      return;
    }

    let pending: HTMLElement[] = [];
    const viewport = window.innerHeight || 0;

    items.forEach((el) => {
      el.classList.add('mu-reveal');
      const rect = el.getBoundingClientRect();
      if (rect.top < viewport * 0.92 && rect.bottom > 0) {
        el.classList.add('is-in');
      } else {
        el.classList.add('is-primed');
        pending.push(el);
      }
    });

    if (pending.length === 0) return;

    let frame = 0;
    const sweep = () => {
      frame = 0;
      const vh = window.innerHeight || viewport;
      pending = pending.filter((el) => {
        if (el.classList.contains('is-in')) return false;
        const rect = el.getBoundingClientRect();
        if (rect.top < vh * 0.92) {
          el.classList.add('is-in');
          return false;
        }
        return true;
      });
      if (pending.length === 0) {
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
      }
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(sweep);
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
}

export function MarketingUncoveredPage() {
  useSectionReveals();

  useEffect(() => {
    document.body.classList.remove('modal-open');

    // Match the Career Unlocked typography. Reuse the same link id so the
    // stylesheet is injected only once across both landing pages.
    const fontHref =
      'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap';
    if (!document.getElementById('career-unlocked-fonts')) {
      const googleFonts = document.createElement('link');
      googleFonts.rel = 'stylesheet';
      googleFonts.id = 'career-unlocked-fonts';
      googleFonts.href = fontHref;
      document.head.appendChild(googleFonts);
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <>
      <SEO
        title="Marketing Uncovered: Career Discovery Workshop by TEONOX"
        description="A 90-minute career discovery workshop to explore the world of marketing, AI, and business."
        canonical="/marketing-uncovered"
      />

      <div className="career-unlocked-lp marketing-uncovered-lp min-h-screen bg-[#FAF6EF] text-[#1E1611] antialiased">
        {/* Sticky header */}
        <header className="sticky top-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#EADFD0]">
          <div className="wrap h-14 sm:h-16 flex items-center justify-between gap-3 sm:gap-4">
            <a href="/" aria-label="Teonox home" className="flex-none">
              <img
                src="/career-unlocked/media/logo-on-light.webp"
                alt="Teonox"
                width="835"
                height="323"
                className="h-9 sm:h-11 w-auto"
              />
            </a>
            <a
              href={PAYMENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${CTA_CLASS} group flex-none min-h-[42px] px-4 sm:px-6 py-2.5 text-[11px] sm:text-sm whitespace-nowrap`}
            >
              RESERVE YOUR SPOT
              <ArrowRight
                aria-hidden="true"
                className="hidden sm:block h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </a>
          </div>
          <div
            aria-hidden="true"
            className="h-0.5 w-full bg-gradient-to-r from-[#FF6B1A] via-[#FFC93C] to-[#FF6B1A]"
          />
        </header>

        {/* Hero — full-bleed banner */}
        <section className="relative isolate overflow-hidden bg-[#FAF6EF] hero-bg">
          <div className="wrap relative min-h-[520px] items-center py-12 sm:min-h-[560px] sm:py-16 lg:min-h-[640px] lg:py-20">
            <div className="mu-hero-copy max-w-[38rem] space-y-5">
              <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase bg-[#1E1611] text-white px-4 py-2 rounded-full shadow-md">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#FF9A3D]" />
                MARKETING UNCOVERED
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[54px] xl:text-[62px] font-extrabold font-display leading-[1.02] sm:leading-[0.98] tracking-[-0.04em]">
                Is{' '}
                <span className="inline-block rounded-lg bg-gradient-to-r from-[#FF6B1A] to-[#E24A0B] px-2.5 py-0.5 -rotate-1 text-white shadow-[0_12px_30px_-12px_rgba(226,74,11,0.8)]">
                  Marketing
                </span>{' '}
                the Career You've Been Looking For?
              </h1>

              <p className="border-l-[3px] border-[#FF6B1A] pl-4 text-base sm:text-xl font-bold text-[#E24A0B] leading-snug">
                A 90-minute Career Discovery Workshop by TEONOX – School of Marketing, AI & Business.
              </p>

              <div className="pt-1">
                <a
                  href={PAYMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${CTA_CLASS} group w-full sm:w-auto min-h-[56px] px-7 py-4 text-sm sm:text-base`}
                >
                  <span className="relative z-10">RESERVE YOUR SPOT</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Opening narrative — moved out of the hero */}
        <section
          aria-label="Workshop introduction"
          className="relative overflow-hidden border-y border-[#EADFD0] bg-[#FFFDF9]"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-grid-dots opacity-25 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[#FFC93C]/10 blur-3xl pointer-events-none"
          />

          <div className="relative wrap max-w-5xl py-12 sm:py-16 lg:py-20">
            <div className="grid gap-6 sm:gap-7 lg:grid-cols-[40px_minmax(0,1fr)] lg:gap-8">
              {/* Compact quote rail — keeps the editorial accent without eating a full column. */}
              <div data-reveal className="hidden lg:flex lg:flex-col">
                <span
                  aria-hidden="true"
                  className="select-none font-display text-[64px] font-extrabold leading-[0.55] text-[#FF6B1A]/25"
                >
                  &ldquo;
                </span>
                <span
                  aria-hidden="true"
                  className="mt-3 w-px flex-1 bg-gradient-to-b from-[#FF6B1A]/50 via-[#E2D5C2] to-transparent"
                />
              </div>

              <div className="min-w-0">
                <span
                  aria-hidden="true"
                  className="mb-5 block h-0.5 w-12 rounded-full bg-gradient-to-r from-[#FF6B1A] to-[#FFC93C] lg:hidden"
                />
                <p
                  data-reveal
                  className="text-pretty text-lg sm:text-xl lg:text-2xl font-medium text-[#1E1611] leading-relaxed"
                >
                  You've probably heard about Digital Marketing. You've seen Instagram ads, influencers,
                  brands going viral and businesses growing online.
                </p>

                <div className="mt-7 grid gap-6 sm:mt-8 sm:grid-cols-2 sm:gap-8 lg:mt-9 lg:gap-10">
                  <p data-reveal className="text-pretty text-sm sm:text-base text-[#6B5E53] leading-relaxed">
                    But have you ever wondered what actually happens behind all of it? Who creates these
                    strategies? Who runs campaigns? Who understands customer behaviour? And what does it
                    really take to build a career in this industry?
                  </p>
                  <p
                    data-reveal
                    className="text-pretty text-sm sm:text-base text-[#6B5E53] leading-relaxed sm:border-l sm:border-[#E2D5C2] sm:pl-8 lg:pl-10"
                  >
                    Marketing Uncovered is a 90-minute interactive workshop designed to help you explore the
                    world of marketing, understand its career opportunities and discover whether this
                    industry is the right fit for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workshop details — full-width ink band */}
        <section className="relative overflow-hidden bg-[#1E1611] py-12 sm:py-16 lg:py-20 text-white">
          <div
            aria-hidden="true"
            className="absolute inset-0 mu-dot-grid-light opacity-60 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -top-28 right-0 h-72 w-72 rounded-full bg-[#FF6B1A]/20 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[#FFC93C]/10 blur-3xl pointer-events-none"
          />

          <div className="relative wrap max-w-6xl">
            <div data-reveal className="flex items-center gap-4 sm:gap-6">
              <p className="flex-none text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-[#FF9A3D]">
                WORKSHOP DETAILS
              </p>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-gradient-to-r from-white/25 via-white/10 to-transparent"
              />
            </div>

            <div className="mt-7 sm:mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {WORKSHOP_DETAILS.map((detail, index) => (
                <div
                  key={detail.label}
                  data-reveal
                  style={{ transitionDelay: `${index * 80}ms` }}
                  className="h-full"
                >
                  <div
                    className={`mu-sheen group relative flex h-full min-h-[188px] flex-col overflow-hidden rounded-[24px] border p-5 text-[#1E1611] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF6B1A] hover:shadow-[0_24px_50px_-22px_rgba(255,107,26,0.6)] sm:min-h-[192px] ${detail.hot ? 'border-[#FFC79A] bg-gradient-to-b from-[#FFF3E8] to-[#FFFDF9]' : 'border-white/10 bg-[#FFFDF9]'}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-5 top-0 h-[3px] rounded-b-full ${detail.hot ? 'bg-gradient-to-r from-[#FF6B1A] to-[#FFC93C]' : 'bg-gradient-to-r from-[#1E1611]/70 to-[#1E1611]/10'}`}
                    />

                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`flex h-11 w-11 flex-none items-center justify-center rounded-2xl ring-1 ring-black/5 transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3 ${detail.hot ? 'bg-gradient-to-br from-[#FF6B1A] to-[#E24A0B] text-white shadow-[0_10px_20px_-10px_rgba(226,74,11,0.85)]' : 'bg-[#1E1611] text-[#FF9A3D] shadow-[0_10px_20px_-12px_rgba(30,22,17,0.8)]'}`}
                      >
                        <detail.Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${detail.hot ? 'bg-[#E24A0B]' : 'bg-[#C9B8A6]'}`}
                      />
                    </div>

                    <div className="mt-5">
                      <span className="block text-[10px] font-bold uppercase leading-tight tracking-[0.18em] text-[#6B5E53]">
                        {detail.label}
                      </span>
                      <span aria-hidden="true" className="mt-3 block h-px w-full bg-[#E2D5C2]" />
                      <p className="mt-3 text-pretty font-display font-extrabold text-[15px] sm:text-base lg:text-[16px] xl:text-[17px] text-[#1E1611] leading-snug break-words">
                        {detail.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What will you uncover — editorial timeline */}
        <section className="relative overflow-hidden bg-[#F4ECE0] py-14 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#FFC93C]/15 blur-3xl pointer-events-none"
          />
          <div className="relative wrap max-w-5xl">
            <div data-reveal>
              <SectionHeading>WHAT WILL YOU UNCOVER?</SectionHeading>
            </div>

            <div className="relative mt-9 sm:mt-11">
              <span
                aria-hidden="true"
                className="absolute bottom-4 left-6 top-4 hidden w-px bg-gradient-to-b from-[#FF6B1A] via-[#E2D5C2] to-transparent sm:block"
              />

              <div className="space-y-5 sm:space-y-6">
                {UNCOVER_ITEMS.map((item, index) => (
                  <div
                    key={item.number}
                    data-reveal
                    style={{ transitionDelay: `${index * 70}ms` }}
                    className="group/row relative sm:pl-[4.75rem]"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-6 z-10 hidden h-12 w-12 items-center justify-center rounded-2xl border border-[#FF6B1A]/30 bg-gradient-to-br from-[#FF6B1A] to-[#E24A0B] font-display text-base font-extrabold text-white shadow-[0_12px_24px_-12px_rgba(226,74,11,0.8)] transition-transform duration-300 group-hover/row:scale-105 sm:flex"
                    >
                      {item.number}
                    </span>

                    <article
                      className={`relative overflow-hidden rounded-[28px] border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_54px_-28px_rgba(226,74,11,0.55)] sm:p-7 ${item.paths ? 'border-[#FF6B1A]/50 bg-gradient-to-br from-[#FFF7EF] via-[#FFFDF9] to-[#FFE9D6]' : 'border-[#EADFD0] bg-[#FFFDF9] hover:border-[#FF6B1A]/50'}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute -right-2 -top-8 select-none font-display text-[104px] font-extrabold leading-none transition-colors duration-500 ${item.paths ? 'text-[#FF6B1A]/10 group-hover/row:text-[#FF6B1A]/20' : 'text-[#1E1611]/[0.04] group-hover/row:text-[#FF6B1A]/10'}`}
                      >
                        {item.number}
                      </span>

                      <div className="relative">
                        <span
                          aria-hidden="true"
                          className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B1A] to-[#E24A0B] font-display text-sm font-extrabold text-white shadow-[0_10px_20px_-10px_rgba(226,74,11,0.8)] sm:hidden"
                        >
                          {item.number}
                        </span>

                        <h3 className="text-lg font-bold font-display leading-snug sm:text-2xl">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-[#6B5E53] leading-relaxed sm:text-base">
                          {item.body}
                        </p>

                        {item.paths && (
                          <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                            {item.paths.map((path) => (
                              <li
                                key={path}
                                className="group/chip flex min-w-0 items-center justify-between gap-2 rounded-xl border border-[#FFC79A] bg-[#FFFDF9]/80 px-3.5 py-2.5 text-[13px] font-bold text-[#1E1611] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#FF6B1A] hover:bg-[#FF6B1A] hover:text-white hover:shadow-[0_12px_22px_-12px_rgba(226,74,11,0.85)] sm:text-sm"
                              >
                                <span className="flex min-w-0 items-center gap-2">
                                  <span
                                    aria-hidden="true"
                                    className="h-1.5 w-1.5 flex-none rounded-full bg-[#E24A0B] transition-colors duration-300 group-hover/chip:bg-white"
                                  />
                                  <span className="min-w-0 break-words">{path}</span>
                                </span>
                                <ArrowRight
                                  aria-hidden="true"
                                  className="h-3.5 w-3.5 flex-none -translate-x-1 opacity-0 transition-all duration-300 group-hover/chip:translate-x-0 group-hover/chip:opacity-100"
                                />
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who should attend — dark role cards */}
        <section className="relative overflow-hidden bg-[#1E1611] py-14 sm:py-20 text-white">
          <div
            aria-hidden="true"
            className="absolute inset-0 mu-dot-grid-light opacity-70 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -top-32 -right-16 h-80 w-80 rounded-full bg-[#FF6B1A]/20 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-[#FFC93C]/10 blur-3xl pointer-events-none"
          />

          <div className="relative wrap max-w-6xl">
            <div data-reveal>
              <SectionHeading>WHO SHOULD ATTEND?</SectionHeading>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {AUDIENCE.map((person, index) => (
                <div
                  key={person.title}
                  data-reveal
                  style={{ transitionDelay: `${index * 80}ms` }}
                  className="h-full"
                >
                  <div className="mu-spotlight group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-[#3B2A20] bg-[#241A14] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#FF9A3D]/60 hover:bg-[#2B1F18] hover:shadow-[0_26px_50px_-26px_rgba(255,107,26,0.55)] sm:p-6">
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-5 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-[#FF9A3D] to-[#FF6B1A] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                    />
                    <person.Icon
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-4 -right-4 h-28 w-28 text-white/[0.04] transition-all duration-500 group-hover:-rotate-6 group-hover:text-[#FF6B1A]/10"
                      strokeWidth={1.25}
                    />

                    <h3 className="relative mt-5 font-display text-lg font-extrabold leading-snug text-[#FF9A3D] sm:text-xl">
                      {person.title}
                    </h3>
                    <p className="relative mt-3 text-sm leading-relaxed text-[#CDBFB1]">
                      {person.body}
                    </p>

                    <span aria-hidden="true" className="relative mt-auto block pt-6">
                      <span className="block h-px w-full bg-gradient-to-r from-white/15 to-transparent" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why attend + urgency banner */}
        <section className="py-14 sm:py-20 bg-[#FAF6EF]">
          <div className="wrap max-w-5xl">
            <div
              data-reveal
              className="rounded-[32px] border border-[#EADFD0] bg-[#FFFDF9] p-6 sm:p-10 shadow-[0_24px_60px_-40px_rgba(30,22,17,0.5)]"
            >
              <SectionHeading>WHY ATTEND MARKETING UNCOVERED?</SectionHeading>

              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-9 items-start">
                <div className="lg:col-span-7 space-y-5">
                  <p className="relative font-display font-extrabold text-2xl sm:text-3xl text-[#1E1611] leading-snug">
                    <span
                      aria-hidden="true"
                      className="absolute -top-6 -left-1 font-display text-7xl leading-none text-[#FF6B1A]/15 select-none"
                    >
                      &ldquo;
                    </span>
                    <span className="relative">Because choosing a career is a big decision.</span>
                  </p>
                  <p className="text-base sm:text-lg text-[#6B5E53] leading-relaxed">
                    You shouldn't have to invest months of learning or thousands of rupees just to find out
                    whether an industry interests you.
                  </p>
                  <p className="text-base sm:text-lg font-bold text-[#1E1611]">
                    This workshop gives you an opportunity to:
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <ul className="rounded-2xl border border-[#EADFD0] bg-[#FAF6EF] p-5 space-y-3">
                    {WHY_ATTEND_POINTS.map((point) => (
                      <li
                        key={point}
                        className="group/point flex items-start gap-3 text-sm sm:text-base text-[#4A4038]"
                      >
                        <span className="mt-0.5 flex-none inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#FFE9D6] text-[#E24A0B] transition-all duration-300 group-hover/point:scale-110 group-hover/point:bg-[#FF6B1A] group-hover/point:text-white">
                          <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        <span className="min-w-0">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-7 border-t border-dashed border-[#E2D5C2] pt-5 text-sm sm:text-base text-[#6B5E53]">
                No prior marketing knowledge required. Just curiosity and an open mind.
              </p>

              <div className="relative mt-6 overflow-hidden rounded-2xl border-l-4 border-[#FF6B1A] bg-[#1E1611] p-5 sm:p-6 shadow-[0_20px_40px_-24px_rgba(30,22,17,0.8)]">
                <span
                  aria-hidden="true"
                  className="absolute -top-10 right-0 h-32 w-32 rounded-full bg-[#FF6B1A]/20 blur-2xl"
                />
                <p className="relative font-display font-extrabold text-lg sm:text-2xl text-white leading-snug">
                  Don't choose a career because it's trending. Understand it first.
                </p>
              </div>

              <div className="mt-6">
                <a
                  href={PAYMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full sm:w-auto min-h-[54px] items-center justify-center gap-2 rounded-2xl bg-[#1E1611] px-7 py-3.5 text-sm sm:text-base font-bold uppercase tracking-wide text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2B1F18] hover:shadow-xl"
                >
                  RESERVE YOUR SPOT
                  <ArrowRight
                    aria-hidden="true"
                    className="h-5 w-5 text-[#FF9A3D] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Urgency banner */}
          <div
            data-reveal
            style={{ transitionDelay: '80ms' }}
            className="relative mt-7 sm:mt-9 overflow-hidden rounded-[32px] border border-white/15 bg-[linear-gradient(135deg,#FF6B1A_0%,#E24A0B_58%,#B83408_100%)] p-6 sm:p-10 lg:p-12 text-center text-white shadow-[0_30px_80px_-30px_rgba(226,74,11,0.8)]"
          >
            <div
              aria-hidden="true"
              className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-[#FFC93C]/20 blur-3xl"
            />
            <h2 className="relative text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-[1.05] tracking-tight">
              90 MINUTES THAT COULD CHANGE HOW YOU SEE YOUR FUTURE.
            </h2>
            <div className="relative mt-5 space-y-2 text-sm sm:text-base lg:text-lg text-[#FFE9D6] max-w-2xl mx-auto leading-relaxed">
              <p>Before you choose marketing, uncover what it really takes.</p>
              <p>Join Marketing Uncovered, an interactive career discovery experience by TEONOX.</p>
            </div>
            <div className="relative mt-6 flex justify-center">
              <span className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/15 px-5 py-2 text-xs sm:text-sm font-extrabold tracking-wide backdrop-blur-sm">
                Every Wednesday & Saturday | 90 Minutes
              </span>
            </div>
            <div className="relative mt-7">
              <a
                href={PAYMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full sm:w-auto min-h-[56px] items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm sm:text-base font-extrabold uppercase tracking-wide text-[#E24A0B] shadow-[0_18px_40px_-16px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_26px_50px_-16px_rgba(0,0,0,0.55)]"
              >
                BOOK YOUR WORKSHOP SEAT
                <ArrowRight
                  aria-hidden="true"
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </section>

        {/* About TEONOX */}
        <section className="relative overflow-hidden py-14 sm:py-20 bg-[#FFFDF9] border-y border-[#EADFD0]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-grid-dots opacity-30 pointer-events-none"
          />
          <div className="relative wrap max-w-4xl">
            <div
              data-reveal
              className="rounded-[32px] border border-[#EADFD0] bg-gradient-to-b from-white to-[#FFF6EE] p-6 sm:p-10 text-center shadow-sm"
            >
              <img
                src="/career-unlocked/media/logo-on-light.webp"
                alt="Teonox"
                width="835"
                height="323"
                loading="lazy"
                className="mx-auto h-9 w-auto"
              />
              <h2 className="mt-6 text-[11px] sm:text-xs font-extrabold font-display uppercase tracking-[0.22em] text-[#6B5E53]">
                ABOUT TEONOX
              </h2>
              <h3 className="mt-3 text-xl sm:text-3xl font-bold font-display text-[#1E1611] leading-snug">
                TEONOX – School of Marketing, AI & Business
              </h3>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 text-left text-sm sm:text-base text-[#6B5E53] leading-relaxed">
                <p>
                  The world of business is changing. Technology, artificial intelligence and digital
                  platforms are transforming how brands operate and grow.
                </p>
                <p>
                  At TEONOX, we believe in preparing people for this evolving world through practical
                  learning, industry-relevant skills and real-world application.
                </p>
              </div>
              <div className="mt-8 flex items-center justify-center gap-4">
                <span
                  aria-hidden="true"
                  className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#FFC79A]"
                />
                <p className="font-display font-extrabold text-2xl sm:text-4xl bg-gradient-to-r from-[#FF6B1A] to-[#E24A0B] bg-clip-text text-transparent">
                  Learn. Apply. Lead.
                </p>
                <span
                  aria-hidden="true"
                  className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#FFC79A]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-14 sm:py-20 bg-[#F4ECE0]">
          <div className="wrap max-w-3xl">
            <div data-reveal>
              <SectionHeading center>FREQUENTLY ASKED QUESTIONS</SectionHeading>
            </div>

            <div className="mt-8 sm:mt-10 space-y-3">
              {FAQS.map((faq, index) => (
                <div
                  key={faq.question}
                  data-reveal
                  style={{ transitionDelay: `${Math.min(index, 4) * 60}ms` }}
                >
                  <details
                    className="faq group rounded-2xl border border-[#EADFD0] bg-[#FFFDF9] shadow-sm transition-all duration-300 hover:border-[#FF6B1A]/50 hover:bg-[#FFFBF6] hover:shadow-[0_14px_30px_-24px_rgba(226,74,11,0.5)]"
                  >
                    <summary className="flex items-start justify-between gap-4 p-5 sm:p-6 cursor-pointer select-none">
                      <span className="flex min-w-0 items-start gap-3">
                        <span className="mt-0.5 flex-none inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFE9D6] text-[11px] font-black text-[#E24A0B] transition-colors duration-300 group-open:bg-[#FF6B1A] group-open:text-white">
                          {index + 1}
                        </span>
                        <span className="min-w-0 font-bold text-base sm:text-lg font-display leading-snug">
                          {faq.question}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex-none inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#EADFD0] text-lg leading-none font-mono text-[#E24A0B] transition-all duration-300 group-open:rotate-45 group-open:border-[#FF6B1A] group-open:bg-[#FF6B1A] group-open:text-white"
                      >
                        +
                      </span>
                    </summary>
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                      <p className="border-t border-dashed border-[#E2D5C2] pt-4 text-sm sm:text-base text-[#6B5E53] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#1E1611] text-white py-10 border-t border-white/10">
          <div className="wrap flex flex-col items-center gap-4 text-center">
            <img
              src="/career-unlocked/media/logo-on-dark.webp"
              alt="Teonox"
              width="835"
              height="323"
              loading="lazy"
              className="h-9 w-auto"
            />
            <p className="text-sm text-[#CDBFB1]">
              © 2026 Teonox · Backed by A2 Digital. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
'''

output_path = r'C:\Users\A2DIGI\Downloads\teonox-website-main\teonox-website-main\src\pages\MarketingUncovered\MarketingUncoveredPage.tsx'
os.makedirs(os.path.dirname(output_path), exist_ok=True)
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f'Written {output_path}')