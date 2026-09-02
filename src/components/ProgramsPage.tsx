import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Target,
  Brain,
  Search,
  Share2,
  Award,
  ChevronLeft,
  ChevronRight,
  Download,
  Flame,
  CheckCircle2,
  Briefcase,
  Phone,
  Headphones,
  Send,
  Sparkles,
  Mail,
  LayoutGrid,
  TrendingUp,
} from 'lucide-react';
import { Program } from '../types';
import { PROGRAMS_DATA } from '../data';
import { ProgramImage } from './ProgramImage';
import {
  fetchLivePrograms,
  fetchProgramCategories,
  LiveProgramCard,
} from '../services/programService';
import imgCounsellor from '../assets/images/counsellor_support_1785420263109.webp';
import { SEO } from './SEO';

interface ProgramsPageProps {
  onSelectProgram: (program: Program) => void;
  onEnquireProgram: (programTitle: string) => void;
}

interface ProgramCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  isNew?: boolean;
}

/**
 * Fallback tabs shown only when the WP `program-category` taxonomy fetch fails.
 * When the CMS is reachable, tabs are built live from the taxonomy terms — the
 * names/icons come straight from WordPress, not from hardcoded strings.
 */
const FALLBACK_CATEGORIES: ProgramCategory[] = [
  { id: 'all', name: 'All Programs', icon: LayoutGrid },
  { id: 'popular', name: 'Popular Programs', icon: Flame },
  { id: 'genai', name: 'GEN AI & Marketing', icon: Brain, isNew: true },
  { id: 'performance', name: 'Performance & Paid Ads', icon: Target },
  { id: 'seo', name: 'SEO & Search Growth', icon: Search },
  { id: 'social', name: 'Social Media & Content', icon: Share2 },
  { id: 'master', name: 'Master Certification', icon: Award },
];

/** Icons assigned to dynamic WP `program-category` term slugs. */
const TERM_ICONS: Record<string, React.ElementType> = {
  'popular-programs': Flame,
  'gen-ai-marketing': Brain,
  'performance-paid-ads': Target,
  'seo-search-growth': Search,
  'social-media-content': Share2,
  'master-certification': Award,
  ai: Brain,
  marketing: TrendingUp,
  business: Briefcase,
};

/** WP term slugs that should carry the "NEW" badge. */
const NEW_TERM_SLUGS = new Set(['gen-ai-marketing']);

export function ProgramsPage({ onSelectProgram, onEnquireProgram }: ProgramsPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [liveCards, setLiveCards] = useState<LiveProgramCard[] | null>(null);
  const [categories, setCategories] = useState<ProgramCategory[]>(FALLBACK_CATEGORIES);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const scrollCategoryBar = (direction: 'left' | 'right') => {
    const el = categoryScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === 'left' ? -150 : 150, behavior: 'smooth' });
  };

  // Build the sidebar tabs live from the WP `program-category` taxonomy (fully
  // dynamic — names come from WordPress, not hardcoded). "All Programs" always
  // comes first, then categories with programs before the empties.
  useEffect(() => {
    let cancelled = false;
    fetchProgramCategories().then(
      (terms) => {
        if (cancelled || terms.length === 0) return;
        const tabs: ProgramCategory[] = [
          { id: 'all', name: 'All Programs', icon: LayoutGrid },
          ...terms
            .slice()
            .sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
            .map((t) => ({
              id: String(t.slug || t.id),
              name: t.name,
              icon: TERM_ICONS[String(t.slug)] || Sparkles,
              isNew: NEW_TERM_SLUGS.has(String(t.slug)) || undefined,
            })),
        ];
        setCategories(tabs);
      },
      () => {},
    );
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchLivePrograms().then(
      (res) => {
        if (!cancelled) {
          setLiveCards(res.programs);
        }
      },
      () => {},
    );
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPrograms = (liveCards ?? []).filter((p) => {
    if (activeCategory === 'all') return true;
    // Match the selected category tab against the program's assigned
    // `program-category` slugs OR term IDs (plus the curated ids used by the
    // static fallback tabs when the taxonomy fetch fails).
    return (
      p.categorySlugs?.includes(activeCategory) ||
      p.categoryIds?.includes(activeCategory) ||
      p.categories?.includes(activeCategory)
    );
  });

  const isLoading = liveCards === null;

  const handleProgramClick = (progOrTitle: any) => {
    if (typeof progOrTitle === 'object' && progOrTitle.id) {
      onSelectProgram({
        id: progOrTitle.id,
        title: progOrTitle.title,
        repeatedTitle: progOrTitle.title,
        description: progOrTitle.description,
        duration: progOrTitle.durationText ? progOrTitle.durationText.split('|')[0].trim() : '',
        durationLabel: 'Duration',
        eligibility: '12th Passed, Graduates & Working Professionals',
        eligibilityLabel: 'Eligibility',
mode: progOrTitle.mode || 'On Campus, Pune',
        modeLabel: 'Mode',
        buttonText: 'View Program',
        image: progOrTitle.image
      });
      return;
    }
    const titleStr = typeof progOrTitle === 'string' ? progOrTitle : (progOrTitle?.title || '');
    const fullProgData =
      PROGRAMS_DATA.programs.find((p) =>
        p.title.toLowerCase().includes(titleStr.toLowerCase().slice(0, 8)) ||
        p.id.toLowerCase().includes(titleStr.toLowerCase().slice(0, 8))
      ) || PROGRAMS_DATA.programs[0];
    onSelectProgram(fullProgData);
  };

  return (
    <div className="bg-[#FAFAFA] text-[#111111] min-h-screen pt-20 sm:pt-24 pb-0 font-['Sora',sans-serif] relative overflow-hidden">
      <SEO
        title="Programs & Courses | TEONOX"
        description="Explore TEONOX programs — AI-integrated digital marketing courses in Pune with assured placement, 12+ years faculty experience, and 50+ tools training."
        canonical="/programs"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'TEONOX Programs',
          url: 'https://teonox.com/programs',
        }}
      />

      <div className="w-[90%] max-w-7xl mx-auto relative z-10 space-y-12 sm:space-y-16">
        {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
            SECTION HEADER
            â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <section id="programs-grid-section" className="space-y-8">
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <h1 className="font-sora text-[32px] sm:text-[44px] md:text-[50px] font-[800] text-[#111111] tracking-tight leading-[1.15]">
              Kickstart your career with our programs
            </h1>

            <p className="font-inter text-[16px] sm:text-[18px] text-[#555555] leading-relaxed">
              Our programs have helped thousands launch careers in tech
            </p>

            {/* Program Key Highlights */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 font-sora text-[13px] sm:text-[14px] font-[700] text-[#222222]">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#ECECEC] shadow-2xs">
                <Clock className="w-4 h-4 text-[#F15A29]" />
                <span>200-400 hours of learning</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#ECECEC] shadow-2xs">
                <Users className="w-4 h-4 text-[#F15A29]" />
                <span>Live, interactive sessions</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#ECECEC] shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#F15A29]" />
                <span>Hybrid training mode</span>
              </div>
            </div>
          </div>

          {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
              TWO-COLUMN LAYOUT: CATEGORY SIDEBAR + PROGRAMS GRID
              â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDEBAR: Program Category Selector */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-2.5 bg-white p-3 sm:p-4 rounded-[24px] border border-[#ECECEC] shadow-xs sticky top-28 z-20">
              <div className="px-3 py-2 text-xs font-mono font-bold text-[#888888] uppercase tracking-wider">
                Select Category
              </div>

              <div className="relative">
                {/* Left scroll arrow */}
                <button
                  onClick={() => scrollCategoryBar('left')}
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 border border-[#ECECEC] shadow-sm items-center justify-center text-[#666] hover:bg-[#F15A29] hover:text-white hover:border-[#F15A29] transition-all cursor-pointer"
                  aria-label="Scroll categories left"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Scrollable category track */}
                <div
                  ref={categoryScrollRef}
                  className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 py-1 px-1 lg:px-0 scroll-px-4 snap-x snap-mandatory scrollbar-none"
                >
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.id;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-[16px] font-sora text-[14px] font-[700] transition-all duration-300 text-left shrink-0 snap-start cursor-pointer min-w-[220px] lg:min-w-0 whitespace-nowrap ${
                          isActive
                            ? 'bg-[#111111] text-white shadow-md border border-[#111111]'
                            : 'bg-white text-[#333333] hover:bg-[#FFF0EB] hover:text-[#F15A29] border border-transparent hover:border-[#F8E3D8]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                              isActive
                                ? 'bg-white/15 text-[#F15A29]'
                                : 'bg-[#FAF8F5] text-[#F15A29]'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span>{cat.name}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {cat.isNew && (
                            <span
                              className={`font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                                isActive
                                  ? 'bg-[#F15A29] text-white'
                                  : 'bg-[#F15A29] text-white'
                              }`}
                            >
                              NEW
                            </span>
                          )}
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              isActive ? 'text-[#F15A29] translate-x-0.5' : 'text-[#CCCCCC]'
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Right scroll arrow */}
                <button
                  onClick={() => scrollCategoryBar('right')}
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white/90 border border-[#ECECEC] shadow-sm items-center justify-center text-[#666] hover:bg-[#F15A29] hover:text-white hover:border-[#F15A29] transition-all cursor-pointer"
                  aria-label="Scroll categories right"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Mobile right-side fade gradient */}
                <div className="md:hidden pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10" />
              </div>
            </div>

            {/* RIGHT COLUMN: Programs Cards Grid */}
            <div className="lg:col-span-8 xl:col-span-9">
              {isLoading ? (
                <div className="flex items-center justify-center py-24">
                  <div className="w-8 h-8 border-2 border-[#F15A29] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : filteredPrograms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPrograms.map((prog) => (
                  <div
                    key={prog.id}
                    onClick={() => handleProgramClick(prog)}
                    className="bg-white rounded-[24px] border border-[#ECECEC] shadow-2xs hover:shadow-xl hover:border-[#F15A29] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden cursor-pointer group relative"
                  >
                    <div>
                      {/* Top Image Frame — strictly WP hero image; local placeholder when missing/failed */}
                      <div className="aspect-[16/10] w-full overflow-hidden relative bg-[#FAF8F5] rounded-t-[24px]">
                        <ProgramImage
                          src={prog.image}
                          alt={prog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />

                        {/* Top Right: Campus Badge */}
                        <div className="absolute top-3 right-3 z-20">
                          <span className="font-mono text-[10.5px] font-[700] px-2.5 py-1 rounded-full bg-[#111111]/90 text-white backdrop-blur-md border border-white/20 flex items-center gap-1 shadow-2xs">
                            <MapPin className="w-3 h-3 text-[#F15A29]" />
                            <span>{prog.mode}</span>
                          </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-5 sm:p-6 space-y-3.5">
                        {/* Title */}
                        <h3 className="font-sora text-[19px] sm:text-[21px] font-[800] text-[#111111] leading-snug group-hover:text-[#F15A29] transition-colors line-clamp-2">
                          {prog.title}
                        </h3>

                        {/* 3 Bullet Points with Icons */}
                        <div className="space-y-2.5 pt-1 font-sora text-[13px] text-[#444444]">
                          <div className="flex items-start gap-2.5">
                            <Calendar className="w-4 h-4 text-[#F15A29] shrink-0 mt-0.5" />
                            <span className="font-medium text-[#222222]">
                              {prog.durationText}
                            </span>
                          </div>

                          {prog.certText && (
                          <div className="flex items-start gap-2.5">
                            <Award className="w-4 h-4 text-[#F15A29] shrink-0 mt-0.5" />
                            <span className="font-medium text-[#222222]">
                              {prog.certText}
                            </span>
                          </div>
                        )}

                        {prog.targetText && (
                          <div className="flex items-start gap-2.5">
                            <Briefcase className="w-4 h-4 text-[#F15A29] shrink-0 mt-0.5" />
                            <span className="font-medium text-[#555555]">
                              {prog.targetText}
                            </span>
                          </div>
                        )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Buttons (Brochure / Enquire + View Details) */}
                    <div className="p-4 sm:p-6 pt-0 flex flex-row items-center justify-between gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (prog.brochureUrl) {
                            window.open(prog.brochureUrl, '_blank', 'noopener,noreferrer');
                          } else {
                            onEnquireProgram(prog.title);
                          }
                        }}
                        className="flex-1 py-3 px-4 rounded-full bg-[#111111] hover:bg-[#F15A29] text-white font-sora font-[700] text-[13px] transition-all duration-300 shadow-2xs flex items-center justify-center gap-2 cursor-pointer group/btn"
                      >
                        <Download className="w-3.5 h-3.5 text-[#F15A29] group-hover/btn:text-white transition-colors" />
                        <span>Brochure</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProgramClick(prog);
                        }}
                        className="flex-1 py-3 px-4 rounded-full bg-white hover:bg-[#FFF0EB] text-[#111111] hover:text-[#F15A29] font-sora font-[700] text-[13px] border border-[#ECECEC] hover:border-[#F8E3D8] transition-all duration-300 shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              ) : (
                <div className="border border-dashed border-[#D9C9BC] rounded-[24px] bg-white/70 p-10 sm:p-14 text-center">
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-[#FFF0EB] flex items-center justify-center mb-5">
                    <Sparkles className="w-7 h-7 text-[#F15A29]" />
                  </div>
                  <h4 className="font-sora text-[22px] sm:text-[26px] font-[800] text-[#111111]">
                    Programs coming soon
                  </h4>
                  <p className="mt-2.5 font-inter text-[14.5px] text-[#6B625A] max-w-md mx-auto leading-relaxed">
                    We&apos;re preparing new course content in this category. Register your interest and our counsellor will notify you the moment it goes live.
                  </p>
                  <button
                    onClick={() => onEnquireProgram('Program coming soon enquiry')}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F15A29] hover:bg-[#D94A1F] text-white font-sora font-[700] text-[13px] px-6 py-3 transition-all duration-300 shadow-2xs cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    Notify Me
                  </button>
                </div>
              )}
            </div>

          </div>
        </section>



        {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
            SECTION 04: Talk To Our Team CTA (TEONOX UI Theme Redesign)
            â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        </div>

      <section className="mt-8 sm:mt-16 relative w-full bg-[#111111] text-white overflow-hidden py-8 sm:py-10 lg:py-14">
          {/* Ambient Orange Glow Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
          </div>

          <div className="w-[90%] max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="space-y-2.5">
                <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[40px] font-[800] text-white leading-[1.1] tracking-tight">
                  Talk to our team <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A50] to-[#F15A29]">directly</span>
                </h2>
                <p className="font-inter text-[14.5px] sm:text-[16px] text-[#C4B8AD] leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Contact us and our academic counsellor will get in touch with you shortly to answer your questions.
                </p>
              </div>

              {/* Action Buttons styled with Sassriver Theme Animations */}
              <div className="pt-1 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                <button
                  onClick={() => onEnquireProgram('Academic Counsellor Callback')}
                  className="btn-sassriver-primary py-3.5 px-5 sm:px-7 text-[13.5px] sm:text-[14.5px] uppercase tracking-wider group cursor-pointer"
                >
                  <Send className="w-4 h-4 shrink-0 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  <span className="whitespace-nowrap">Enquire Now</span>
                </button>

                <a
                  href="tel:+919890004828"
                  className="btn-sassriver-secondary px-5 py-3.5 text-[14.5px] sm:text-[15.5px] group cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-[#F15A29] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:bg-[#FF6B38] transition-all duration-300">
                    <Phone className="w-3.5 h-3.5 fill-white text-white" />
                  </div>
                  <span className="whitespace-nowrap tracking-tight text-white group-hover:text-[#FF8A50] transition-colors duration-300">+91 989-000-4828</span>
                </a>
              </div>

              {/* Quick Info Badges */}
              <div className="pt-3.5 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-white/[0.07] text-white/80 font-inter text-[12px] sm:text-[12.5px]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F15A29] shrink-0" />
                  <span>1-on-1 Guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#F15A29] shrink-0" />
                  <span>Instant Call Back</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Headphones className="w-3.5 h-3.5 text-[#F15A29] shrink-0" />
                  <span>Pune Campus Team</span>
                </div>
              </div>
            </div>

            {/* Right Support Girl Image (Compact & Proportional Size) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end items-center h-full">
              <div className="relative w-full max-w-[260px] sm:max-w-[280px] lg:max-w-[270px] xl:max-w-[290px] h-[280px] sm:h-[320px] lg:h-[310px] overflow-hidden rounded-[22px] shadow-2xl border border-white/15 bg-[#1A1816] group">
                <img
                  src={imgCounsellor}
                  alt="Academic Counsellor Support"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
          </div>
        </section>
    </div>
  );
}

