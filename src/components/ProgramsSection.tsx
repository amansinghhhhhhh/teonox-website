import { useState, useEffect } from 'react';
import { Program } from '../types';
import {
  Calendar,
  Award,
  Briefcase,
  ArrowRight,
  Brain,
  Search,
  Share2,
  Target,
  Sparkles,
  Flame,
  Download,
  MapPin,
} from 'lucide-react';
import { Reveal } from './Reveal';
import { ProgramImage } from './ProgramImage';
import { fetchLivePrograms, LiveProgramCard } from '../services/programService';

interface ProgramsSectionProps {
  onSelectProgram: (program: Program) => void;
  onEnquireProgram: (programName: string) => void;
}

interface ProgramCardData {
  id: string;
  categoryIds: string[];
  title: string;
  description: string;
  brandBadge: string;
  durationText: string;
  certText: string;
  targetText: string;
  mode: string;
  image?: string;
}

export function ProgramsSection({
  onSelectProgram,
  onEnquireProgram,
}: ProgramsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [liveCards, setLiveCards] = useState<LiveProgramCard[] | null>(null);

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

  const categories = [
    { id: 'all', name: 'All Programs', icon: Flame },
    { id: 'genai', name: 'GEN AI & Marketing', icon: Brain, isNew: true },
    { id: 'performance', name: 'Performance & Paid Ads', icon: Target },
    { id: 'seo', name: 'SEO & Organic Growth', icon: Search },
    { id: 'social', name: 'Social Media', icon: Share2 },
  ];

  // Strictly live V2 programs from WordPress — no static fallback cards. When the
  // CMS has no published V2 content yet, this renders the "coming soon" state.
  const displayedPrograms: ProgramCardData[] = (liveCards ?? [])
    .map((c) => ({
      id: c.id,
      categoryIds: c.categories,
      title: c.title,
      description: c.description,
      brandBadge: c.brandBadge,
      durationText: c.durationText,
      certText: c.certText,
      targetText: c.targetText,
      mode: c.mode,
      image: c.image || '',
    }))
    .filter((p) => activeTab === 'all' || p.categoryIds.includes(activeTab));

  const isLoading = liveCards === null;

  const handleProgramSelect = (prog: ProgramCardData) => {
    onSelectProgram({
      id: prog.id,
      title: prog.title,
      repeatedTitle: prog.title,
      description: prog.description,
      duration: prog.durationText.split('|')[0].trim(),
      durationLabel: 'Duration',
      eligibility: '12th Passed, Graduates & Working Professionals',
      eligibilityLabel: 'Eligibility',
      mode: 'On Campus, Pune',
      modeLabel: 'Mode',
      buttonText: 'View Program',
      image: prog.image,
    });
  };

  return (
    <section id="programs" className="py-10 sm:py-14 bg-[#FAFAFA] relative border-t border-[#ECECEC]">

      <div className="w-[88%] max-w-7xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <Reveal className="text-left space-y-3 max-w-3xl">
          <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] tracking-tight leading-[1.18]">
            Explore Upskill <span className="text-[#F15A29] heading-accent">Gen AI Programs</span>
          </h2>
          <p className="font-sora text-[15px] sm:text-[17px] font-[600] text-[#555555] leading-relaxed max-w-2xl">
            Digital Marketing Courses in Pune, Designed for Students, Working Professionals, entrepreneurs, and business leaders. School of Digital Marketing Provides Top Digital Marketing Courses in Pune Integrated with AI and GenAI Tools, 100% Placement, Practical and Google Certifications, at Affordable Fees.
          </p>
        </Reveal>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-full font-sora text-[13.5px] font-[700] transition-all duration-300 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#111111] text-white shadow-md'
                    : 'bg-white text-[#444444] border border-[#ECECEC] hover:border-[#F8E3D8] hover:bg-[#FFF0EB] hover:text-[#F15A29]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#F15A29]' : 'text-[#888888]'}`} />
                <span>{cat.name}</span>
                {cat.isNew && (
                  <span className="font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#F15A29] text-white">
                    NEW
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Programs Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-[#F15A29] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : displayedPrograms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedPrograms.map((prog, i) => (
            <Reveal key={prog.id} delay={i * 0.1} y={36}>
            <div
              onClick={() => handleProgramSelect(prog)}
              className="card-premium bg-white rounded-[24px] border border-[#ECECEC] shadow-2xs hover:border-[#F15A29] flex flex-col justify-between overflow-hidden cursor-pointer group relative h-full"
            >
              <div>
                {/* Header Image — strictly WP hero image; local placeholder when missing/failed */}
                <div className="aspect-[16/10] w-full overflow-hidden relative bg-[#FAF8F5] rounded-t-[24px]">
                  <div className="img-zoom w-full h-full">
                    <ProgramImage
                      src={prog.image}
                      alt={prog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Campus Tag */}
                  <div className="absolute top-3.5 right-3.5 z-20">
                    <span className="font-mono text-[10.5px] font-[700] px-2.5 py-1 rounded-full bg-[#111111]/90 text-white backdrop-blur-md border border-white/20 flex items-center gap-1 shadow-2xs">
                      <MapPin className="w-3 h-3 text-[#F15A29]" />
                      <span>{prog.mode}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-3.5">
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

                    <div className="flex items-start gap-2.5">
                      <Award className="w-4 h-4 text-[#F15A29] shrink-0 mt-0.5" />
                      <span className="font-medium text-[#222222]">
                        {prog.certText}
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Briefcase className="w-4 h-4 text-[#F15A29] shrink-0 mt-0.5" />
                      <span className="font-medium text-[#555555]">
                        {prog.targetText}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 sm:p-6 pt-0 flex items-center gap-2.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnquireProgram(prog.title);
                  }}
                  className="flex-1 py-3 px-4 rounded-full bg-[#111111] hover:bg-[#F15A29] text-white font-sora font-[700] text-[13px] transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-[#F15A29]/20 flex items-center justify-center gap-2 cursor-pointer group/btn active:scale-95"
                >
                  <Download className="w-3.5 h-3.5 text-[#FF8A50] group-hover/btn:text-white group-hover/btn:-translate-y-0.5 transition-all duration-300" />
                  <span>Brochure</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProgramSelect(prog);
                  }}
                  className="flex-1 py-3 px-4 rounded-full bg-white hover:bg-[#FFF2EC] text-[#111111] hover:text-[#F15A29] font-sora font-[700] text-[13px] border border-[#ECECEC] hover:border-[#F15A29]/40 transition-all duration-300 shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer group/btn2 active:scale-95"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn2:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
            </Reveal>
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
              We&apos;re preparing new course content. Register your interest and our counsellor will notify you the moment it goes live.
            </p>
            <button
              onClick={() => onEnquireProgram('Program coming soon enquiry')}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#F15A29] hover:bg-[#D94A1F] text-white font-sora font-[700] text-[13px] px-6 py-3 transition-all duration-300 shadow-2xs cursor-pointer"
            >
              Notify Me
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
