import { useState, useRef } from 'react';
import {
  Sparkles,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Quote,
  ArrowRight,
  Star,
} from 'lucide-react';
import { Reveal } from '../Reveal';
import { MomentsSection } from './MomentsSection';
import { CULTURE_PILLARS, CULTURE_EXPERTS } from '../../data/cultureData';
import studentBannerImg from '../../assets/images/student_culture_banner.webp';

interface TeonoxCultureSectionProps {
  onVisitCampus: () => void;
}

/* Alternating accent themes per pillar (orange / dark neutral). */
const ACCENTS = [
  { text: 'text-[#F15A29]', bg: 'bg-[#FFF0EB]' },
  { text: 'text-[#111111]', bg: 'bg-[#F0EFEC]' },
];

/* Banner photo per pillar (hard-coded on each pillar object in cultureData.ts). */

function scrollRow(ref: React.RefObject<HTMLDivElement | null>, dir: number) {
  ref.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
}

/* Infinite loop for the pillars row: content is rendered twice (copy A + copy B).
   When the scroll position crosses into copy B, snap back into copy A instantly —
   the two copies are pixel-identical, so the wrap is invisible and continuous. */
const PILLAR_STEP = 320; // desktop fallback: one card (300px) + gap (20px)
const PILLAR_GAP = 20; // gap-5 between cards

/* Actual per-card step (card width + gap), measured at runtime so the
   arrows scroll exactly one card on every breakpoint (280px mobile / 300px sm+). */
function measureStep(el: HTMLDivElement): number {
  const first = el.firstElementChild as HTMLElement | null;
  return first ? first.offsetWidth + PILLAR_GAP : PILLAR_STEP;
}

function scrollPillarsLoop(ref: React.RefObject<HTMLDivElement | null>, dir: number) {
  const el = ref.current;
  if (!el) return;
  const step = measureStep(el);
  const N = CULTURE_PILLARS.length;
  if (dir < 0 && el.scrollLeft <= 48) {
    el.scrollLeft = N * step; // jump to copy B start (visually identical to 0)
  }
  el.scrollBy({ left: dir * step, behavior: 'smooth' });
}

function onPillarsScroll(ref: React.RefObject<HTMLDivElement | null>) {
  const el = ref.current;
  if (!el) return;
  const step = measureStep(el);
  const N = CULTURE_PILLARS.length;
  if (el.scrollLeft >= N * step) {
    el.scrollLeft -= N * step; // seamless loop back into copy A
  }
}

function ScrollArrow({ dir, onClick }: { dir: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 'left' ? 'Scroll left' : 'Scroll right'}
      className="flex w-8 h-8 md:w-10 md:h-10 shrink-0 items-center justify-center rounded-full bg-white border border-[#E5E0D8] text-[#111111] hover:bg-[#F15A29] hover:text-white hover:border-[#F15A29] transition-colors cursor-pointer shadow-sm"
    >
      {dir === 'left' ? (
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      ) : (
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      )}
    </button>
  );
}

export function TeonoxCultureSection({ onVisitCampus }: TeonoxCultureSectionProps) {
  const pillarsRef = useRef<HTMLDivElement>(null);
  const expertsRef = useRef<HTMLDivElement>(null);
  const [expandedPillar, setExpandedPillar] = useState<number | null>(null);

  const togglePillar = (i: number) => {
    setExpandedPillar((cur) => (cur === i ? null : i));
  };

  return (
    <section
      id="teonox-culture"
      className="relative w-full overflow-hidden py-14 sm:py-20 text-[#111111] bg-gradient-to-b from-[#F3F5F8] via-[#FBFAF9] to-[#F3F5F8]"
    >
      {/* Ambient gradient glows + dot pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#F15A29]/10 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-[#F15A29]/8 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-[#F15A29]/8 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#111111_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Hero Header ─── */}
        <Reveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-[700] uppercase tracking-[0.16em] text-[#F15A29] border border-[#F3DCC9] bg-[#FFF6EE] rounded-full px-4 py-2">
            <Sparkles className="w-3.5 h-3.5" />
            The TEONOX Culture
          </span>
          <h2 className="font-sora text-[30px] sm:text-[40px] lg:text-[46px] font-[800] leading-[1.12] tracking-tight mt-6">
            More Than a Course.{' '}
            <span className="text-[#F15A29] heading-accent">This Is TEONOX.</span>
          </h2>
          <p className="font-inter text-[16px] sm:text-[17.5px] text-[#665A4E] leading-relaxed mt-4">
            At TEONOX, you don't just learn. You experience. A culture built on real-world learning,
            industry connections and a community that grows together.
          </p>
        </Reveal>

        {/* ─── 6 Core Pillar Cards (Interactive Slider) ─── */}
        <Reveal className="mb-12 sm:mb-16">
          <div className="flex flex-col items-center gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-sora text-[20px] sm:text-[24px] font-[800] tracking-tight text-center sm:text-left">
              Culture Initiatives to <span className="text-[#F15A29]">Showcase</span>
            </h3>
            <div className="flex items-center gap-2.5">
              <ScrollArrow dir="left" onClick={() => scrollPillarsLoop(pillarsRef, -1)} />
              <ScrollArrow dir="right" onClick={() => scrollPillarsLoop(pillarsRef, 1)} />
            </div>
          </div>

          <div
            ref={pillarsRef}
            onScroll={() => onPillarsScroll(pillarsRef)}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {[...CULTURE_PILLARS, ...CULTURE_PILLARS].map((pillar, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              const expanded = expandedPillar === i;
              return (
                <div
                  key={`${pillar.title}-${i}`}
                  className={`snap-start shrink-0 w-[280px] sm:w-[300px] rounded-[22px] overflow-hidden bg-white border border-[#E9E6E1] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.15)] transition-all duration-300 ${
                    expanded ? '' : 'hover:-translate-y-1 hover:shadow-[0_20px_45px_-18px_rgba(0,0,0,0.25)]'
                  }`}
                >
                  {/* Top image banner (cropped only for the image itself) */}
                  <div className="relative">
                    <div
                      className="relative h-[200px] overflow-hidden rounded-t-[22px] cursor-pointer"
                      onClick={() => togglePillar(i)}
                    >
                      <img
                        src={pillar.banner}
                        alt={pillar.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
                      {/* Step badge */}
                      <span className="absolute top-3 left-3 font-mono text-[11px] font-[800] text-white bg-black/40 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1">
                        {pillar.step}
                      </span>
                    </div>

                    {/* Circular icon badge — floats relative to the card, overlaps the image edge */}
                    <div
                      className={`absolute -bottom-6 left-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full ${accent.bg} ${accent.text} border-4 border-white flex items-center justify-center shadow-lg`}
                    >
                      <pillar.icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 pt-10">
                    <h4 className={`font-sora text-[18px] font-[800] uppercase tracking-wide ${accent.text}`}>
                      {pillar.title}
                    </h4>
                    <p className="font-inter text-[13px] text-[#665A4E] leading-relaxed mt-1.5">
                      {pillar.desc}
                    </p>

                    {/* Expandable initiatives drawer */}
                    <button
                      onClick={() => togglePillar(i)}
                      className="mt-4 w-full inline-flex items-center justify-between gap-2 font-sora text-[12.5px] font-[700] uppercase tracking-wider text-[#111111] hover:text-[#F15A29] transition-colors cursor-pointer"
                    >
                      <span>Initiatives</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expanded ? 'max-h-[560px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pt-4 mt-3 border-t border-[#F0EBE3] space-y-3.5">
                        {pillar.initiatives.map((ini) => (
                          <div key={ini.name} className="flex gap-2.5">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${accent.bg} ${accent.text} shrink-0`}>
                              <span className="block w-full h-full rounded-full bg-current" />
                            </span>
                            <div>
                              <p className="font-inter text-[12.5px] font-[700] text-[#111111] flex items-center gap-2 flex-wrap">
                                {ini.name}
                                {ini.priority && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#FACC15] to-[#F59E0B] px-2 py-0.5 font-mono text-[8.5px] font-[800] uppercase tracking-[0.1em] text-[#111111]">
                                    <Star className="w-2.5 h-2.5 fill-current" />
                                    Recommended
                                  </span>
                                )}
                              </p>
                              <p className="font-inter text-[12px] text-[#8A7C6E] leading-relaxed mt-0.5">
                                {ini.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* ─── Feature Block: image feature + quote card ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 mb-12 sm:mb-16">
          {/* Left (~60%): dark "THIS IS TEONOX" card */}
          <Reveal className="lg:col-span-7">
            <div className="relative h-full min-h-[320px] rounded-[26px] bg-[#111111] overflow-hidden group">
              <img
                src={studentBannerImg}
                alt="Business leader and marketing mentor"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-col items-start gap-2.5">
                <h3 className="font-sora text-[26px] sm:text-[32px] font-[800] text-white leading-tight">
                  This Is TEONOX
                </h3>
                <p className="font-inter text-[13.5px] sm:text-[14.5px] text-white/80">
                  Real people. Real projects. Real impact.
                </p>
                <a
                  href="#life-at-teonox"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('life-at-teonox')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="group/link inline-flex items-center gap-2 font-sora text-[11.5px] sm:text-[12.5px] font-[700] uppercase tracking-[0.16em] text-[#FF8A50] hover:text-white transition-colors duration-300"
                >
                  Explore Life at TEONOX
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right (~40%): light quote card */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="relative h-full min-h-[220px] rounded-[26px] bg-[#F5F2ED] border border-[#E5DFD7] p-7 sm:p-10 flex flex-col justify-between overflow-hidden">
              <div className="relative">
                <Quote className="w-7 h-7 text-[#F15A29]" />
                <p className="font-sora text-[20px] sm:text-[24px] font-[700] leading-snug text-[#111111] mt-3">
                  Culture doesn't happen on a screen. It happens when people come together.
                </p>
                <span className="inline-flex items-center gap-1.5 font-inter text-[13.5px] font-[600] text-[#665A4E] mt-4">
                  <MapPin className="w-4 h-4 text-[#F15A29]" />
                  Kothrud, Pune
                </span>
              </div>
              <button
                onClick={onVisitCampus}
                className="relative mt-6 inline-flex items-center justify-center gap-2 bg-[#F15A29] hover:bg-[#D8481A] text-white font-sora text-[13.5px] font-[700] uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-[0_10px_25px_-8px_rgba(241,90,41,0.5)] transition-all active:scale-95 cursor-pointer w-full whitespace-nowrap"
              >
                Visit Our Campus
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ─── Moments That Define Us (shared with About page) ─── */}
      <MomentsSection />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Industry Comes to TEONOX: Speaker Cards Row ─── */}
        <Reveal className="mb-12 sm:mb-16">
          <div className="text-center mb-8">
            <h3 className="font-sora text-[24px] sm:text-[32px] font-[800] leading-tight uppercase tracking-tight">
              Industry Comes to <span className="text-[#F15A29] heading-accent">TEONOX</span>
            </h3>
            <div className="mx-auto mt-3.5 w-16 h-1.5 rounded-full bg-gradient-to-r from-[#FACC15] to-[#F59E0B]" />
            <p className="font-inter text-[15px] sm:text-[16px] text-[#665A4E] mt-4 max-w-xl mx-auto">
              Learn from the best. Get inspired. Build real connections.
            </p>
          </div>

          <div className="flex justify-end mb-3">
            <div className="flex items-center gap-2.5">
              <ScrollArrow dir="left" onClick={() => scrollRow(expertsRef, -1)} />
              <ScrollArrow dir="right" onClick={() => scrollRow(expertsRef, 1)} />
            </div>
          </div>

          <div
            ref={expertsRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {CULTURE_EXPERTS.map((expert) => (
              <div
                key={expert.name}
                className="snap-start shrink-0 w-[230px] sm:w-[250px] bg-white rounded-[22px] overflow-hidden border border-[#E9E6E1] shadow-sm hover:shadow-[0_20px_45px_-18px_rgba(0,0,0,0.22)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <img
                    src={expert.image}
                    alt={expert.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-[50%_20%] hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-sora text-[15px] font-[800] text-[#111111]">{expert.name}</h4>
                  <p className="font-inter text-[12.5px] font-[500] text-[#8A7C6E] mt-0.5 leading-snug">
                    {expert.role}
                  </p>
                  <span className="inline-flex items-center mt-3 rounded-full bg-[#FFF0EB] border border-[#F3DCC9] px-3 py-1 font-inter text-[11px] font-[700] text-[#F15A29]">
                    {expert.topic}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}