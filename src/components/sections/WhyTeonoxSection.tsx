import { Users, HeartHandshake, Building2, Sparkles, ArrowRight, Quote } from 'lucide-react';
import { Reveal } from '../Reveal';
import whyTeonoxImg from '../../assets/images/whyteonox_hero_img_1785591499511.webp';

interface WhyTeonoxSectionProps {
  onExplorePrograms?: () => void;
}

/**
 * REWORKED "WHY TEONOX" SECTION
 * Showcases the TEONOX culture, student experience and community — instead of a
 * generic institutional presence. The original "Why TEONOX?" section still lives
 * inside TeonoxStorySections and is kept as-is for now (to be removed later once
 * this replacement is approved).
 */
const EXPERIENCE_CARDS = [
  {
    icon: Users,
    title: 'Belong to a Real Community',
    desc: 'Small cohorts, big networks. Learn beside ambitious peers who push you, celebrate your wins, and stay connected long after the program ends.',
  },
  {
    icon: HeartHandshake,
    title: 'Mentors Who Stay Around',
    desc: 'No recorded lectures. Practitioners who review your work, answer your questions and genuinely bet on your growth.',
  },
  {
    icon: Building2,
    title: 'A Campus You Experience',
    desc: 'Live classes, labs and collaboration spaces in the heart of Pune — where learning happens in the room, not just on a screen.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'TEONOX felt less like a course and more like joining a team that wanted me to win.',
    name: 'Aditi K.',
    role: 'Digital Marketing Learner',
  },
  {
    quote: 'My mentor reviewed my campaigns every single week. That is what actually changed how I work.',
    name: 'Rahul J.',
    role: 'Performance Marketing Learner',
  },
  {
    quote: 'I found my people here — a community of creators and founders who still push me forward.',
    name: 'Sara M.',
    role: 'Content & Social Media Learner',
  },
];

const COMMUNITY_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
];

export function WhyTeonoxSection({ onExplorePrograms }: WhyTeonoxSectionProps) {
  return (
    <section
      id="why-teonox-experience"
      className="relative w-full bg-white text-[#111111] py-14 sm:py-20 overflow-hidden border-t border-[#EFEBE4]"
    >
      {/* Ambient glow + dot pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#F15A29]/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#F15A29]/8 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#F15A29_0.75px,transparent_0.75px)] [background-size:32px_32px] opacity-[0.03]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-[700] uppercase tracking-[0.16em] text-[#F15A29] border border-[#F3DCC9] bg-[#FFF6EE] rounded-full px-4 py-2">
            <Sparkles className="w-3.5 h-3.5" />
            Why TEONOX
          </span>
          <h2 className="font-sora text-[30px] sm:text-[40px] lg:text-[46px] font-[800] leading-[1.12] tracking-tight mt-5">
            More Than a Course. <span className="text-[#F15A29] heading-accent">A Community That Builds You.</span>
          </h2>
          <p className="font-inter text-[15.5px] sm:text-[17px] text-[#665A4E] leading-relaxed mt-4">
            TEONOX is where culture meets capability — a tight-knit community of
            ambitious learners, practitioners and founders who grow together.
          </p>
        </Reveal>

        {/* Experience cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 sm:mb-16">
          {EXPERIENCE_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              <div className="h-full bg-[#FAF8F5] border border-[#E5E0D8] rounded-[22px] p-6 sm:p-7 hover:border-[#F15A29]/50 hover:-translate-y-1 transition-all duration-300">
                <div className="w-11 h-11 rounded-2xl bg-[#FFF0EB] text-[#F15A29] flex items-center justify-center mb-4">
                  <card.icon className="w-5 h-5" />
                </div>
                <h3 className="font-sora text-[19px] font-[800] tracking-tight mb-2">{card.title}</h3>
                <p className="font-inter text-[14.5px] text-[#665A4E] leading-relaxed">{card.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Image + testimonials band */}
        <Reveal className="mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Image */}
            <div className="lg:col-span-5">
              <div className="relative h-full min-h-[300px] rounded-[24px] overflow-hidden">
                <img
                  src={whyTeonoxImg}
                  alt="TEONOX student community and mentors collaborating"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-[700] uppercase tracking-[0.14em] text-[#FF8A50] bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Student Community
                  </span>
                  <p className="font-sora text-[18px] sm:text-[20px] font-[700] text-white leading-snug">
                    Learn beside peers who become your lifelong network.
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.1}>
                  <div className="h-full bg-white border border-[#E5E0D8] rounded-[20px] p-5 flex flex-col">
                    <Quote className="w-6 h-6 text-[#F15A29] mb-3" />
                    <p className="font-inter text-[14px] text-[#444444] leading-relaxed flex-1">
                      {t.quote}
                    </p>
                    <div className="mt-4 pt-4 border-t border-[#F0EBE3]">
                      <p className="font-sora text-[14px] font-[800] text-[#111111]">{t.name}</p>
                      <p className="font-inter text-[12.5px] text-[#8A7C6E]">{t.role}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Community + CTA strip */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-[#111111] text-white rounded-[24px] p-6 sm:p-8 overflow-hidden relative">
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#F15A29]/20 blur-3xl pointer-events-none" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 relative">
              {/* Avatars */}
              <div className="flex -space-x-3 shrink-0">
                {COMMUNITY_AVATARS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-11 h-11 rounded-full border-2 border-[#111111] object-cover"
                  />
                ))}
                <span className="w-11 h-11 rounded-full border-2 border-[#111111] bg-[#F15A29] text-white flex items-center justify-center font-sora text-[12px] font-[800]">
                  +500
                </span>
              </div>
              <div>
                <h3 className="font-sora text-[20px] sm:text-[24px] font-[800] tracking-tight">
                  Join the TEONOX Community
                </h3>
                <p className="font-inter text-[14px] text-[#C4B8AD] mt-1 leading-relaxed">
                  A growing network of learners, creators and founders — built to grow together.
                </p>
              </div>
            </div>
            <div className="relative">
              <button type="button"
                onClick={onExplorePrograms}
                className="inline-flex items-center justify-center gap-2 bg-[#F15A29] hover:bg-[#D8481A] text-white font-sora text-[14.5px] font-[700] px-7 py-3.5 rounded-xl transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
              >
                Explore Programs
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}