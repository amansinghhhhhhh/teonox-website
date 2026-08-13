import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  BarChart,
  BarChart3,
  Bot,
  Briefcase,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  Code,
  Compass,
  DollarSign,
  Download,
  ExternalLink,
  FileText,
  Flame,
  Globe,
  GraduationCap,
  HeartHandshake,
  Laptop,
  Layers,
  Layout,
  Lightbulb,
  LineChart,
  Mail,
  MapPin,
  Megaphone,
  MessageSquare,
  PenTool,
  PieChart,
  Rocket,
  Search,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
  Video,
  Wand2,
  Workflow,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ProgramDetailData } from '../../data/programDetails';
import { TeonoxLogo } from '../TeonoxLogo';
import imgCounsellor from '../../assets/images/counsellor_modal_img_1785398242839.webp';
import certGoogleLogo from '../../assets/tools/google.svg';
import certGoogleAnalyticsLogo from '../../assets/tools/googleanalytics.svg';
import certHubspotLogo from '../../assets/tools/hubspot.svg';
import certSemrushLogo from '../../assets/tools/semrush.svg';
import certMetaLogo from '../../assets/tools/meta.svg';
import certLinkedinLogo from '../../assets/tools/linkedin.png';
import certOpenaiLogo from '../../assets/tools/openai.png';

interface ProgramV2LayoutProps {
  detail: ProgramDetailData;
  onEnquire?: (label: string) => void;
  heroLoading?: boolean;
}

type BenefitKey = 'students' | 'business' | 'corporate';
type OppKey = 'internships' | 'freelancing';

const DESIGNED_ICONS: Array<{ test: RegExp; Icon: LucideIcon }> = [
  { test: /digital marketing student|student|fresh graduate|learner/i, Icon: GraduationCap },
  { test: /e-commerce|ecommerce|website|shop|store owner/i, Icon: ShoppingBag },
  { test: /entrepreneur|founder|business owner/i, Icon: Target },
  { test: /freelanc|consult/i, Icon: UserCheck },
  { test: /ai search|generative|ai enthusiast/i, Icon: Sparkles },
  { test: /agency/i, Icon: Briefcase },
  { test: /seo executive|seo specialist|seo manager|search specialist/i, Icon: Briefcase },
  { test: /content & growth|content strateg|content specialist|organic growth/i, Icon: TrendingUp },
  { test: /digital marketing professional|marketing professional|marketing generalist/i, Icon: Megaphone },
  { test: /executive|manager|lead|specialist/i, Icon: Briefcase },
  { test: /growth/i, Icon: TrendingUp },
];

const DESIGNED_FALLBACK: LucideIcon[] = [GraduationCap, Briefcase, TrendingUp, Target, UserCheck, Sparkles];

function designedForIcon(title: string, text: string, idx: number): LucideIcon {
  const fromTitle = DESIGNED_ICONS.find((entry) => entry.test.test(title));
  if (fromTitle) return fromTitle.Icon;
  const fromText = DESIGNED_ICONS.find((entry) => entry.test.test(text));
  if (fromText) return fromText.Icon;
  return DESIGNED_FALLBACK[idx % DESIGNED_FALLBACK.length];
}

const ICON_COMPONENTS: Record<string, LucideIcon> = {
  GraduationCap,
  Building2,
  Briefcase,
  TrendingUp,
  Zap,
  Target,
  Sparkles,
  Users,
  Search,
  Share2,
  Megaphone,
  Laptop,
  FileText,
  LineChart,
  UserPlus,
  Bot,
  PenTool,
  Code,
  Layout,
  Workflow,
  Mail,
  Lightbulb,
  Wand2,
  PieChart,
  UserCheck,
  Video,
  Award,
  BarChart3,
  MessageSquare,
  Globe,
  Flame,
  Layers,
  HeartHandshake,
  Rocket,
  DollarSign,
  BarChart,
  Compass,
  ShieldCheck,
};

function oppIcon(name: string): LucideIcon {
  return ICON_COMPONENTS[name] || Rocket;
}

const CERT_LOGO: Record<string, { logo: React.ReactNode; accent: string; height: string }> = {
  teonox: { logo: null, accent: '#F15A29', height: 'h-7' },
  google: { logo: <img src={certGoogleLogo} alt="Google Logo" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = 'none'; }} className="h-6 w-auto object-contain" />, accent: '#4285F4', height: 'h-6' },
  analytics: { logo: <img src={certGoogleAnalyticsLogo} alt="Google Analytics Logo" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = 'none'; }} className="h-7 w-auto object-contain" />, accent: '#E37400', height: 'h-7' },
  hubspot: { logo: <img src={certHubspotLogo} alt="HubSpot Logo" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = 'none'; }} className="h-7 w-auto object-contain" />, accent: '#FF7A59', height: 'h-7' },
  semrush: { logo: <img src={certSemrushLogo} alt="SEMrush Logo" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = 'none'; }} className="h-7 w-auto object-contain" />, accent: '#EC5028', height: 'h-7' },
  meta: { logo: <img src={certMetaLogo} alt="Meta Logo" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = 'none'; }} className="h-5 w-auto object-contain" />, accent: '#E11D48', height: 'h-5' },
  linkedin: { logo: <img src={certLinkedinLogo} alt="LinkedIn Logo" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = 'none'; }} className="h-5 w-auto object-contain" />, accent: '#0A66C2', height: 'h-5' },
  other: { logo: <img src={certOpenaiLogo} alt="OpenAI Logo" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = 'none'; }} className="h-5 w-auto object-contain" />, accent: '#E11D48', height: 'h-5' },
  youtube: { logo: null, accent: '#FF0000', height: 'h-7' },
};

export function ProgramV2Layout({ detail, onEnquire, heroLoading = false }: ProgramV2LayoutProps) {
  const [isOverviewExpanded, setIsOverviewExpanded] = useState(false);
  const [activeDesignedIndex, setActiveDesignedIndex] = useState<number>(0);
  const [activeBenefitTab, setActiveBenefitTab] = useState<BenefitKey>('students');
  const [activeOppTab, setActiveOppTab] = useState<OppKey>('internships');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [designedImgFailed, setDesignedImgFailed] = useState(false);

  const enquire = (label: string) => onEnquire?.(label);

  // Reset the hero/designed-for image error states whenever the program (or its
  // resolved image) changes so a failed image on one program doesn't leak to
  // the next.
  const heroImageKey = detail?.heroImage || detail?.id || '';
  const designedImageKey = detail?.designedForImage || detail?.id || '';
  React.useEffect(() => {
    setHeroImgFailed(false);
    setDesignedImgFailed(false);
  }, [heroImageKey, designedImageKey]);

  const benefitTabs = detail.benefits;
  const oppData = detail.opportunities[activeOppTab];

  const teonoxCert = detail.certifications.find((c) => c.type === 'teonox') || null;
  const partnerCerts = detail.certifications.filter((c) => c.type !== 'teonox');
  const certVisual = (type: string) => CERT_LOGO[type] || CERT_LOGO.teonox;

  // Dynamic hero image from WordPress ACF. While the live detail is still
  // loading we show a neutral skeleton; when no WP image is uploaded we render
  // an empty container (no static placeholder graphic).
  const showHeroImage = !!detail.heroImage && !heroImgFailed && !heroLoading;

  return (
    <div className="space-y-16 sm:space-y-24 pt-2">
      {/* ────────────────────────────────────────
          SECTION 01: COURSE HERO
          ──────────────────────────────────────── */}
      <section className="bg-white rounded-[28px] border border-[#ECECEC] p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-sora text-[30px] sm:text-[42px] lg:text-[48px] font-[800] text-[#111111] leading-[1.15] tracking-tight">
              {detail.programTitle}
            </h1>

            <p className="font-sora text-[16px] sm:text-[18px] font-[700] text-[#F15A29]">
              {detail.subHeading}
            </p>

            <p className="font-inter text-[15px] sm:text-[16px] text-[#555555] leading-[1.7]">
              {detail.heroIntro}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-[16px] bg-[#FAF8F5] border border-[#EFEBE4] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#FFF0EB] text-[#F15A29] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-inter text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
                    Duration
                  </span>
                  <span className="font-sora text-[15px] font-bold text-[#111111]">
                    {detail.duration}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-[16px] bg-[#FAF8F5] border border-[#EFEBE4] flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#FFF0EB] text-[#F15A29] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-inter text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
                    Mode
                  </span>
                  <span className="font-sora text-[15px] font-bold text-[#111111]">
                    {detail.mode}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={() => enquire('Apply Now - ' + detail.programTitle)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#F15A29] hover:bg-[#D8420F] text-white font-sora font-[700] text-[15px] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>

              <button
                onClick={() => enquire('Download Brochure - ' + detail.programTitle)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-[#FFF0EB] text-[#111111] font-sora font-[700] text-[15px] border border-[#ECECEC] hover:border-[#F8E3D8] transition-all duration-300 shadow-2xs hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4.5 h-4.5 text-[#F15A29]" />
                <span>Download Brochure</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/3] lg:aspect-[16/14] w-full rounded-[24px] overflow-hidden border border-[#ECECEC] shadow-md relative group bg-[#FAF8F5]">
              {heroLoading ? (
                <div className="w-full h-full bg-[#F3EDE6] animate-pulse" />
              ) : showHeroImage ? (
                <img
                  src={detail.heroImage}
                  alt={detail.programTitle}
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgFailed(true)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          SECTION 02: COURSE OVERVIEW
          ──────────────────────────────────────── */}
      <section className="bg-white rounded-[28px] border border-[#ECECEC] p-6 sm:p-10 shadow-sm space-y-6">
        <h2 className="font-sora text-[26px] sm:text-[34px] font-[800] text-[#111111] tracking-tight">
          COURSE OVERVIEW
        </h2>

        <div className="prose prose-slate max-w-none font-inter text-[15.5px] text-[#333333] leading-[1.8] space-y-5">
          <p className="text-[17px] font-semibold text-[#111111] border-l-4 border-[#F15A29] pl-4 py-1 bg-[#FFF0EB]/40 rounded-r-lg">
            {detail.overview.highlight}
          </p>

          <p>
            {detail.overview.main}
          </p>

          {isOverviewExpanded && (
            <div className="space-y-5 animate-in fade-in duration-300 pt-2">
              {detail.overview.expanded.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          )}

          {detail.overview.expanded.length > 0 && (
            <div>
              <button
                onClick={() => setIsOverviewExpanded(!isOverviewExpanded)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FAF8F5] hover:bg-[#FFF0EB] text-[#F15A29] font-sora font-[700] text-[13.5px] border border-[#ECECEC] hover:border-[#F8E3D8] transition-all cursor-pointer shadow-2xs"
              >
                <span>{isOverviewExpanded ? 'Show Less Overview' : 'Read More Overview'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOverviewExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────
          SECTION 03: THIS COURSE IS DESIGNED FOR
          ──────────────────────────────────────── */}
      {detail.designedFor.length > 0 || detail.designedForIntro ? (
        <section className="bg-white rounded-[28px] border border-[#ECECEC] p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[24px] overflow-hidden border border-[#F8E3D8] bg-gradient-to-br from-[#FFF6EE] via-[#FFEEDD]/50 to-white p-2 shadow-lg group">
                <div className="relative rounded-[20px] overflow-hidden aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] w-full bg-[#111111]">
                  {detail.designedForImage && !designedImgFailed ? (
                    <img
                      src={detail.designedForImage}
                      alt="This Course Is Designed For"
                      referrerPolicy="no-referrer"
                      onError={() => setDesignedImgFailed(true)}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h2 className="font-sora text-[28px] sm:text-[36px] font-[800] text-[#111111] tracking-tight leading-[1.18]">
                  THIS COURSE IS DESIGNED FOR
                </h2>
                {detail.designedForIntro && (
                  <p className="font-inter text-[15.5px] text-[#555555] leading-relaxed">
                    {detail.designedForIntro}
                  </p>
                )}
              </div>

              <div className="relative pl-3 space-y-1 pt-1">
                <div className="absolute left-[22px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-[#F15A29] via-[#F15A29]/40 to-[#F8E3D8]" />

                {detail.designedFor.map((item, idx) => {
                  const Icon = designedForIcon(item.title, item.text, idx);
                  const isExpanded = activeDesignedIndex === idx;

                  return (
                    <div
                      key={idx}
                      className={`relative rounded-[18px] transition-all duration-300 border ${
                        isExpanded
                          ? 'bg-[#FFF9F6] border-[#F8E3D8] shadow-2xs'
                          : 'bg-white border-transparent hover:border-[#F0DFCE] hover:bg-[#FFF6EE]/60'
                      }`}
                    >
                      <button
                        onClick={() => setActiveDesignedIndex(isExpanded ? -1 : idx)}
                        className="w-full text-left p-3.5 sm:p-4 flex items-center gap-4 cursor-pointer group"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 relative z-10 ${
                            isExpanded
                              ? 'bg-[#F15A29] text-white shadow-md shadow-[#F15A29]/25 scale-105 ring-4 ring-[#FFF0EB]'
                              : 'bg-[#FFF0EB] text-[#F15A29] border border-[#F8E3D8] group-hover:bg-[#F15A29] group-hover:text-white'
                          }`}
                        >
                          <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                        </div>

                        <span
                          className={`font-sora text-[15.5px] sm:text-[16.5px] font-[700] flex-1 transition-colors ${
                            isExpanded ? 'text-[#F15A29]' : 'text-[#111111] group-hover:text-[#F15A29]'
                          }`}
                        >
                          {item.title}
                        </span>

                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                            isExpanded
                              ? 'rotate-180 bg-[#FFF0EB] text-[#F15A29]'
                              : 'text-[#888888] group-hover:text-[#F15A29] group-hover:bg-[#FFF0EB]'
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="pl-18 pr-4 pb-4 pt-0 animate-in fade-in slide-in-from-top-1 duration-200">
                          <div className="p-4 rounded-[14px] bg-white border-l-3 border-[#F15A29] shadow-2xs">
                            <p className="font-inter text-[14.5px] text-[#444444] leading-[1.7]">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      )}

                      {idx < detail.designedFor.length - 1 && (
                        <div className="mx-4 border-b border-[#F0DFCE]/50" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* ────────────────────────────────────────
          SECTION 04: KEY REASONS TO TAKE THIS COURSE
          ──────────────────────────────────────── */}
      {detail.keyReasons.length > 0 || detail.keyReasonsFootnote ? (
        <section className="bg-[#111111] text-white rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-xl space-y-8 relative overflow-hidden">
          <h2 className="font-sora text-[26px] sm:text-[36px] font-[800] text-white tracking-tight relative z-10">
            KEY REASONS TO TAKE THIS COURSE
          </h2>

          {detail.keyReasons.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative z-10">
            {detail.keyReasons.map((reason, idx) => {
              const item = typeof reason === 'string' ? { title: '', text: reason } : reason;
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-[20px] bg-white/5 border border-white/10 hover:border-[#F15A29]/50 hover:bg-white/10 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-[#F15A29] text-white flex items-center justify-center shrink-0 font-mono text-xs font-bold mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="font-inter text-[14.5px] text-gray-300 leading-relaxed">
                    {item.title && <strong className="font-sora font-[700] text-white">{item.title}</strong>}
                    {item.title && item.text ? ' ' : ''}
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
          )}

          {detail.keyReasonsFootnote && (
            <p className="font-inter text-[14.5px] text-gray-400 leading-relaxed relative z-10 border-t border-white/10 pt-5">
              {detail.keyReasonsFootnote}
            </p>
          )}
        </section>
      ) : null}

      {/* ────────────────────────────────────────
          SECTION 05: HOW THIS COURSE WILL BENEFIT YOU
          ──────────────────────────────────────── */}
      {(detail.benefits.students.title ||
        detail.benefits.students.intro ||
        detail.benefits.students.heading ||
        detail.benefits.students.bullets.length > 0 ||
        detail.benefits.business.title ||
        detail.benefits.business.intro ||
        detail.benefits.business.heading ||
        detail.benefits.business.bullets.length > 0 ||
        detail.benefits.corporate.title ||
        detail.benefits.corporate.intro ||
        detail.benefits.corporate.heading ||
        detail.benefits.corporate.bullets.length > 0) && (
      <section className="bg-white rounded-[28px] border border-[#ECECEC] p-6 sm:p-10 shadow-sm space-y-8">
        <h2 className="font-sora text-[26px] sm:text-[34px] font-[800] text-[#111111] tracking-tight">
          HOW THIS COURSE WILL BENEFIT YOU
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 p-1.5 bg-[#FAF8F5] rounded-[20px] border border-[#EFEBE4]">
          {(['students', 'business', 'corporate'] as BenefitKey[]).map((key) => {
            const isActive = activeBenefitTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveBenefitTab(key)}
                className={`flex-1 py-3.5 px-6 rounded-[16px] font-sora text-[14.5px] font-[800] transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-[#F15A29] text-white shadow-md'
                    : 'text-[#666666] hover:text-[#111111] hover:bg-white/60'
                }`}
              >
                {benefitTabs[key].title}
              </button>
            );
          })}
        </div>

        <div className="p-6 sm:p-8 rounded-[24px] bg-[#FAF8F5] border border-[#EFEBE4] space-y-6 animate-in fade-in duration-300">
          {benefitTabs[activeBenefitTab].intro && (
            <p className="font-inter text-[16px] text-[#333333] font-medium leading-relaxed">
              {benefitTabs[activeBenefitTab].intro}
            </p>
          )}

          {benefitTabs[activeBenefitTab].heading && (
            <h3 className="font-sora text-[17px] font-[800] text-[#111111]">
              {benefitTabs[activeBenefitTab].heading}
            </h3>
          )}

          {benefitTabs[activeBenefitTab].bullets.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {benefitTabs[activeBenefitTab].bullets.map((bullet, idx) => (
                <div key={idx} className="p-4 rounded-[16px] bg-white border border-[#ECECEC] flex items-center gap-3 shadow-2xs">
                  <CheckCircle2 className="w-5 h-5 text-[#F15A29] shrink-0" />
                  <span className="font-inter text-[14px] text-[#444444] leading-snug">{bullet}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      )}

      {/* ────────────────────────────────────────
          SECTION 06: COURSE PRE-REQUISITES
          ──────────────────────────────────────── */}
      <section className="bg-white rounded-[28px] sm:rounded-[32px] border border-[#ECECEC] p-6 sm:p-10 lg:p-12 shadow-sm space-y-8 relative overflow-hidden">
        <div className="space-y-4 relative z-10">
          <h2 className="font-sora text-[28px] sm:text-[36px] font-[800] text-[#111111] tracking-tight leading-[1.18]">
            COURSE PRE-REQUISITES
          </h2>

          <div className="p-4 sm:p-5 rounded-[20px] bg-gradient-to-r from-[#FFF6EE] via-[#FFF0EB]/80 to-[#FFF6EE] border border-[#F8E3D8] shadow-2xs flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-[#F15A29] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <p className="font-inter text-[15px] sm:text-[15.5px] text-[#333333] font-medium leading-relaxed self-center">
              {detail.prerequisites.intro}
            </p>
          </div>

          {detail.prerequisites.bullets.length > 0 && (
            <>
              <p className="font-sora text-[15.5px] font-[700] text-[#111111] pt-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F15A29]" />
                <span>Learners should ideally have:</span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                {detail.prerequisites.bullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="p-4.5 rounded-[20px] bg-[#FAF8F5] border border-[#EFEBE4] hover:border-[#F8E3D8] hover:bg-[#FFF9F6] transition-all duration-300 flex items-start gap-3.5 shadow-2xs hover:shadow-md group"
                  >
<div className="w-8 h-8 rounded-xl bg-[#FFF0EB] border border-[#F8E3D8] text-[#F15A29] group-hover:bg-[#F15A29] group-hover:border-[#F15A29] group-hover:text-white transition-all duration-300 flex items-center justify-center shrink-0 [&_svg]:group-hover:text-white">
                      <Check className="w-4 h-4 text-[#F15A29]" />
                    </div>
                    <span className="font-inter text-[14.5px] text-[#333333] font-medium leading-snug self-center">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {detail.prerequisites.note && (
            <div className="p-5 sm:p-6 rounded-[22px] bg-gradient-to-r from-[#FFF0EB] via-white to-[#FFF0EB] border border-[#F8E3D8] text-[#F15A29] font-sora font-[700] text-[15px] text-center shadow-2xs relative z-10 flex items-center justify-center gap-3">
              <Sparkles className="w-5 h-5 text-[#F15A29] shrink-0 hidden sm:block" />
              <span>{detail.prerequisites.note}</span>
              <Sparkles className="w-5 h-5 text-[#F15A29] shrink-0 hidden sm:block" />
            </div>
          )}
        </div>
      </section>

      {/* ────────────────────────────────────────
          SECTION 07: COURSE OUTCOME
          ──────────────────────────────────────── */}
      {(detail.outcomes.intro ||
        detail.outcomes.leadInBold ||
        detail.outcomes.bullets.length > 0 ||
        detail.outcomes.projectsNote) && (
      <section className="bg-white rounded-[28px] border border-[#ECECEC] p-6 sm:p-10 shadow-sm space-y-8">
        <div className="space-y-3">
          <h2 className="font-sora text-[26px] sm:text-[34px] font-[800] text-[#111111] tracking-tight">
            COURSE OUTCOME
          </h2>
          {detail.outcomes.intro && (
            <p className="font-inter text-[15px] text-[#555555] leading-relaxed">
              {detail.outcomes.intro}
            </p>
          )}
          {detail.outcomes.leadInBold && (
            <p className="font-sora text-[15px] font-[700] text-[#111111]">
              {detail.outcomes.leadInBold}
            </p>
          )}
        </div>

        {detail.outcomes.bullets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {detail.outcomes.bullets.map((outcome, idx) => (
            <div
              key={idx}
              className="p-5 rounded-[20px] bg-[#FAF8F5] border border-[#EFEBE4] hover:border-[#F8E3D8] hover:bg-white transition-all duration-300 flex items-center gap-4 shadow-2xs group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#FFF0EB] border border-[#F8E3D8] text-[#F15A29] group-hover:bg-[#F15A29] group-hover:border-[#F15A29] group-hover:text-white transition-all duration-300 flex items-center justify-center shrink-0 mt-0.5 [&_svg]:group-hover:text-white">
                <CheckCircle2 className="w-4 h-4 text-[#F15A29]" />
              </div>
              <p className="font-inter text-[14.5px] text-[#333333] font-medium leading-relaxed">
                {outcome}
              </p>
            </div>
          ))}
          </div>
        )}

        {detail.outcomes.projectsNote && (
          <div className="p-6 rounded-[22px] bg-[#111111] text-white space-y-2">
            <span className="font-mono text-[11px] font-bold text-[#F15A29] uppercase tracking-wider">
              CURRICULUM SPAN
            </span>
            <p className="font-inter text-[14.5px] text-gray-300 leading-relaxed">
              {detail.outcomes.projectsNote}
            </p>
          </div>
        )}
      </section>
      )}

      {/* ────────────────────────────────────────
          SECTION 08: VALUE OF THIS COURSE
          ──────────────────────────────────────── */}
      {(detail.valueSequence?.length ||
        detail.valueProposition ||
        detail.valueBodyParagraph ||
        detail.valueBoldParagraph2 ||
        detail.valueGreyParagraph ||
        detail.valueHighlightOrangeBold) && (
        <section className="bg-white rounded-[28px] border border-[#ECECEC] p-6 sm:p-10 shadow-sm space-y-8">
          <h2 className="font-sora text-[26px] sm:text-[34px] font-[800] text-[#111111] tracking-tight">
            VALUE OF THIS COURSE
          </h2>

          <div className="space-y-4 font-inter text-[15.5px] text-[#444444] leading-relaxed">
            {detail.valueProposition && (
              <p className="font-semibold text-[#111111]">
                {detail.valueProposition}
              </p>
            )}
            {detail.valueBodyParagraph && <p>{detail.valueBodyParagraph}</p>}
            {detail.valueBoldParagraph2 && (
              <p className="font-sora font-bold text-[#111111]">
                {detail.valueBoldParagraph2}
              </p>
            )}
          </div>

          {detail.valueSequence && detail.valueSequence.length > 0 && (
            <div className="p-6 sm:p-8 rounded-[24px] bg-[#FAF8F5] border border-[#EFEBE4] space-y-6">
              <h3 className="font-sora text-[13px] font-[800] uppercase tracking-widest text-[#888888] text-center sm:text-left">
                CONNECTING MARKETING DISCIPLINES (EXACT SEQUENCE)
              </h3>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                {detail.valueSequence.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className="px-4 py-2.5 rounded-full bg-white text-[#111111] font-sora font-[700] text-[13.5px] border border-[#ECECEC] shadow-2xs hover:border-[#F15A29] hover:text-[#F15A29] transition-all cursor-default">
                      {step}
                    </div>
                    {idx < detail.valueSequence!.length - 1 && (
                      <span className="text-[#F15A29] font-bold text-base">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {(detail.valueGreyParagraph || detail.valueHighlightOrangeBold) && (
            <div className="space-y-2 pt-2 border-t border-[#ECECEC]">
              {detail.valueGreyParagraph && (
                <p className="font-inter text-[15px] text-[#555555]">
                  {detail.valueGreyParagraph}
                </p>
              )}
              {detail.valueHighlightOrangeBold && (
                <p className="font-sora text-[16px] font-[800] text-[#F15A29]">
                  {detail.valueHighlightOrangeBold}
                </p>
              )}
            </div>
          )}
        </section>
      )}

      {/* ────────────────────────────────────────
          SECTION 09: CERTIFICATIONS INCLUDED
          ──────────────────────────────────────── */}
      {(detail.certifications.length > 0 ||
        detail.certificationsIntro ||
        detail.certificationsPathwaysLeadIn ||
        detail.certificationsImportantTitle ||
        detail.certificationsImportantText) && (
        <section className="bg-white rounded-[28px] border border-[#ECECEC] p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-sora text-[28px] sm:text-[36px] font-[800] text-[#111111] tracking-tight leading-[1.15]">
                CERTIFICATIONS INCLUDED
              </h2>

              {detail.certificationsIntro && (
                <p className="font-inter text-[15.5px] text-[#444444] leading-[1.7]">
                  {detail.certificationsIntro}
                </p>
              )}

              {detail.certificationsPathwaysLeadIn && (
                <p className="font-sora text-[15px] sm:text-[16px] font-[700] text-[#111111] leading-relaxed">
                  {detail.certificationsPathwaysLeadIn}
                </p>
              )}

              <ul className="space-y-3 font-inter text-[14.5px] text-[#333333]">
                {detail.certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#F15A29] font-bold text-base leading-none mt-0.5">•</span>
                    <span className={idx === 0 ? 'font-semibold text-[#111111]' : ''}>{cert.title}</span>
                  </li>
                ))}
              </ul>

              {(detail.certificationsImportantTitle || detail.certificationsImportantText) && (
                <div className="p-4 sm:p-5 rounded-[18px] bg-[#FFF9F5] border border-[#FDE6D2] text-[#555555] font-inter text-[13px] leading-relaxed pt-3">
                  <p>
                    {detail.certificationsImportantTitle && (
                      <strong className="font-sora text-[#111111] font-bold">{detail.certificationsImportantTitle}</strong>
                    )}
                    {detail.certificationsImportantText && (
                      <span> {detail.certificationsImportantText}</span>
                    )}
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                {teonoxCert && (
                  <div className="sm:col-span-2 rounded-[22px] bg-gradient-to-br from-[#FFF0EB]/90 via-white to-[#FAF8F5] border-2 border-[#F8E3D8] p-5 shadow-sm hover:border-[#F15A29] hover:shadow-[0_12px_30px_rgba(241,90,41,0.15)] hover:scale-[1.01] hover:-translate-y-1 transition-all duration-300 relative group cursor-pointer overflow-hidden">
                    <div className="border border-[#F8E3D8] p-5 rounded-[16px] bg-white relative space-y-3">
                      <div className="flex items-center justify-between border-b border-[#F5ECE5] pb-3">
                        <TeonoxLogo variant="light" size="sm" />
                        <Award className="w-5 h-5 text-[#F15A29]" />
                      </div>
                      <div className="py-2 space-y-1">
                        <h3 className="font-sora text-[16px] sm:text-[17px] font-[800] text-[#111111] leading-snug">
                          {teonoxCert.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                )}

                {partnerCerts.map((cert, idx) => {
                  const visual = certVisual(cert.type);
                  return (
                    <div
                      key={idx}
                      className="rounded-[20px] bg-white border border-[#ECECEC] p-4 shadow-sm hover:border-[#F15A29] hover:shadow-[0_10px_25px_rgba(241,90,41,0.15)] hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between space-y-3"
                    >
                      <div className={`border border-[#F0ECE6] p-4 rounded-[14px] bg-gradient-to-b ${cert.bgGradient} space-y-3`}>
                        <div className="flex items-center justify-between">
                          {visual.logo || <Award className={`${visual.height} w-auto text-[${visual.accent}]`} />}
                          <Award className="w-4 h-4" style={{ color: visual.accent }} />
                        </div>
                        <h4 className="font-sora text-[14px] font-[800] text-[#111111] leading-snug pt-1">
                          {cert.title}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────
          SECTION 10: PLACEMENT ASSISTANCE
          ──────────────────────────────────────── */}
      <section className="bg-[#111111] text-white rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-xl space-y-8 relative overflow-hidden">
        <div className="space-y-3 relative z-10">
          <h2 className="font-sora text-[26px] sm:text-[36px] font-[800] text-white tracking-tight">
            PLACEMENT ASSISTANCE
          </h2>
          <p className="font-inter text-[15.5px] text-gray-300 leading-relaxed">
            {detail.placementAssistance.intro}
          </p>
          {detail.placementAssistance.bullets.length > 0 && (
            <p className="font-sora text-[15px] font-[700] text-white pt-2">
              Support can include:
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
          {detail.placementAssistance.bullets.map((bullet, idx) => (
            <div key={idx} className="p-4 rounded-[18px] bg-white/5 border border-white/10 hover:border-[#F15A29]/50 hover:bg-white/10 transition-all flex items-center gap-3">
              <CheckCircle2 className="w-4.5 h-4.5 text-[#F15A29] shrink-0" />
              <span className="font-inter text-[14px] text-gray-200">{bullet}</span>
            </div>
          ))}
        </div>

        {detail.placementAssistance.careerPaths.length > 0 && (
          <div className="p-6 rounded-[24px] bg-gradient-to-r from-[#F15A29]/20 via-white/5 to-white/5 border border-[#F15A29]/30 relative z-10 space-y-3">
            <h3 className="font-sora text-[16px] font-[800] text-white">
              Possible career paths include roles across:
            </h3>
            <p className="font-inter text-[15px] text-[#F15A29] font-bold tracking-wide">
              {detail.placementAssistance.careerPaths.join(' | ')}
            </p>
          </div>
        )}
      </section>

      {/* ────────────────────────────────────────
          SECTION 11: INTERNSHIP & FREELANCING OPPORTUNITIES
          ──────────────────────────────────────── */}
      {(detail.opportunities.internships.title ||
        detail.opportunities.internships.intro ||
        detail.opportunities.internships.leadInBold ||
        detail.opportunities.internships.items.length > 0 ||
        detail.opportunities.freelancing.title ||
        detail.opportunities.freelancing.intro ||
        detail.opportunities.freelancing.leadInBold ||
        detail.opportunities.freelancing.items.length > 0) && (
      <section className="bg-white rounded-[28px] border border-[#ECECEC] p-6 sm:p-10 shadow-sm space-y-8">
        <h2 className="font-sora text-[26px] sm:text-[34px] font-[800] text-[#111111] tracking-tight">
          INTERNSHIP & FREELANCING OPPORTUNITIES
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 p-1.5 bg-[#FAF8F5] rounded-[20px] border border-[#EFEBE4]">
          <button
            onClick={() => setActiveOppTab('internships')}
            className={`flex-1 py-3.5 px-6 rounded-[16px] font-sora text-[14.5px] font-[800] transition-all duration-300 cursor-pointer ${
              activeOppTab === 'internships'
                ? 'bg-[#F15A29] text-white shadow-md'
                : 'text-[#666666] hover:text-[#111111] hover:bg-white/60'
            }`}
          >
            Internship Opportunities
          </button>
          <button
            onClick={() => setActiveOppTab('freelancing')}
            className={`flex-1 py-3.5 px-6 rounded-[16px] font-sora text-[14.5px] font-[800] transition-all duration-300 cursor-pointer ${
              activeOppTab === 'freelancing'
                ? 'bg-[#F15A29] text-white shadow-md'
                : 'text-[#666666] hover:text-[#111111] hover:bg-white/60'
            }`}
          >
            Freelancing Opportunities
          </button>
        </div>

        {activeOppTab === 'internships' ? (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              {oppData.title && (
                <h3 className="font-sora text-[22px] sm:text-[26px] font-[800] text-[#111111] tracking-tight">
                  {oppData.title}
                </h3>
              )}
              {oppData.intro && (
                <p className="font-inter text-[15px] text-[#555555] leading-relaxed">
                  {oppData.intro}
                </p>
              )}
              {oppData.leadInBold && (
                <p className="font-sora text-[15px] font-[700] text-[#111111]">
                  {oppData.leadInBold}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {oppData.items.map((item, idx) => {
                const Icon = oppIcon(item.iconName);
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-[20px] bg-[#FAF8F5] border border-[#EFEBE4] hover:border-[#F15A29] hover:bg-white transition-all space-y-3 shadow-2xs group flex flex-col justify-between"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-[#FFF0EB] border border-[#F8E3D8] group-hover:bg-[#F15A29] group-hover:border-[#F15A29] transition-all duration-300 flex items-center justify-center shrink-0 [&_svg]:group-hover:text-white">
                      <Icon className="w-5 h-5 text-[#F15A29]" />
                    </div>
                    <h4 className="font-sora text-[14.5px] font-[800] text-[#111111] leading-snug">
                      {item.title}
                    </h4>
                  </div>
                );
              })}
            </div>

            {oppData.note && (
              <p className="font-inter text-[14.5px] text-[#666666] italic border-l-2 border-[#F15A29] pl-4">
                {oppData.note}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              {oppData.title && (
                <h3 className="font-sora text-[22px] sm:text-[26px] font-[800] text-[#111111] tracking-tight">
                  {oppData.title}
                </h3>
              )}
              {oppData.intro && (
                <p className="font-inter text-[15px] text-[#555555]">
                  {oppData.intro}
                </p>
              )}
              {oppData.leadInBold && (
                <p className="font-sora text-[15px] font-[700] text-[#111111]">
                  {oppData.leadInBold}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {oppData.items.map((item, idx) => {
                const Icon = oppIcon(item.iconName);
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-[20px] bg-[#FAF8F5] border border-[#EFEBE4] hover:border-[#F15A29] hover:bg-white transition-all duration-300 flex items-center gap-3.5 shadow-2xs group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#FFF0EB] border border-[#F8E3D8] group-hover:bg-[#F15A29] group-hover:border-[#F15A29] transition-all duration-300 flex items-center justify-center shrink-0 [&_svg]:group-hover:text-white">
                      <Icon className="w-4 h-4 text-[#F15A29]" />
                    </div>
                    <span className="font-sora text-[14px] font-[700] text-[#111111] leading-snug">
                        {item.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ────────────────────────────────────────
          SECTION 13: FREQUENTLY ASKED QUESTIONS
          ──────────────────────────────────────── */}
      {detail.faqs.length > 0 && (
        <section className="bg-white rounded-[28px] border border-[#ECECEC] p-6 sm:p-10 shadow-sm space-y-8">
          <h2 className="font-sora text-[26px] sm:text-[34px] font-[800] text-[#111111] tracking-tight">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <div className="space-y-3">
            {detail.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-[20px] border border-[#ECECEC] bg-[#FAFAFA] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FFF0EB]/40 transition-colors"
                  >
                    <span className="font-sora text-[15.5px] font-[700] text-[#111111]">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-[#F15A29] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-[#ECECEC] bg-white font-inter text-[14.5px] text-[#444444] leading-relaxed whitespace-pre-line">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ────────────────────────────────────────
          FINAL CTA
          ──────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#F15A29] via-[#E04B1A] to-[#C83808] text-white rounded-[32px] p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          <div className="lg:col-span-5 flex justify-center lg:justify-start items-end h-full">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px] flex items-end justify-center">
              <img
                src={detail.cta?.image || imgCounsellor}
                alt="Career Counsellor & Support Advisor"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  if (t.src !== imgCounsellor) {
                    t.src = imgCounsellor;
                  } else {
                    t.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';
                  }
                }}
                className="relative z-10 w-full h-auto max-h-[380px] sm:max-h-[420px] object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          <div className="lg:col-span-7 text-left space-y-6">
            <h2 className="font-sora text-[28px] sm:text-[38px] lg:text-[44px] font-[800] text-white tracking-tight leading-[1.15]">
              {detail.cta?.title || 'Ready to Start Your Digital Marketing Journey?'}
            </h2>

            <p className="font-inter text-[15px] sm:text-[16.5px] text-white/90 leading-relaxed max-w-xl">
              {detail.cta?.description ||
                'Get personalized guidance from our senior career counsellor. We will help you select the ideal specialization, explain the course structure, and plan your career transition.'}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 pt-2">
              {detail.cta?.primaryButtonUrl ? (
                <a
                  href={detail.cta.primaryButtonUrl}
                  className="px-8 py-4 rounded-full bg-white hover:bg-[#FAF8F5] text-[#111111] font-sora font-[700] text-[15px] no-underline transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{detail.cta?.primaryButtonText || 'Apply Now'}</span>
                  <ArrowRight className="w-4.5 h-4.5 text-[#F15A29]" />
                </a>
              ) : (
                <button
                  onClick={() => enquire('Apply Now - Final CTA ' + detail.programTitle)}
                  className="px-8 py-4 rounded-full bg-white hover:bg-[#FAF8F5] text-[#111111] font-sora font-[700] text-[15px] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{detail.cta?.primaryButtonText || 'Apply Now'}</span>
                  <ArrowRight className="w-4.5 h-4.5 text-[#F15A29]" />
                </button>
              )}

              {detail.cta?.secondaryButtonUrl ? (
                <a
                  href={detail.cta.secondaryButtonUrl}
                  className="px-8 py-4 rounded-full bg-black/20 hover:bg-black/35 text-white font-sora font-[700] text-[15px] no-underline border border-white/35 hover:border-white/60 transition-all duration-300 shadow-2xs hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{detail.cta?.secondaryButtonText || 'Talk to Career Advisor'}</span>
                </a>
              ) : (
                <button
                  onClick={() => enquire('Talk to Career Advisor - Final CTA ' + detail.programTitle)}
                  className="px-8 py-4 rounded-full bg-black/20 hover:bg-black/35 text-white font-sora font-[700] text-[15px] border border-white/35 hover:border-white/60 transition-all duration-300 shadow-2xs hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{detail.cta?.secondaryButtonText || 'Talk to Career Advisor'}</span>
                </button>
              )}
            </div>

            <div className="pt-4 border-t border-white/20 font-sora text-[13.5px] font-[800] tracking-wider uppercase text-white/90">
              {detail.cta?.brandTagline || 'TEONOX | Learn. Apply. Lead.'}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
