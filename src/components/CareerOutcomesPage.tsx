import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import careersGoogleLogo from '../assets/careers/google.svg';
import careersMetaLogo from '../assets/careers/meta.svg';
import careersAmazonLogo from '../assets/careers/amazon.png';
import careersMicrosoftLogo from '../assets/careers/microsoft.png';
import careersAdobeLogo from '../assets/careers/adobe.png';
import careersHubspotLogo from '../assets/careers/hubspot.svg';
import careersShopifyLogo from '../assets/careers/shopify.svg';
import careersFlipkartLogo from '../assets/careers/flipkart.png';
import careersZomatoLogo from '../assets/careers/zomato.svg';
import careersSwiggyLogo from '../assets/careers/swiggy.svg';
import careersRazorpayLogo from '../assets/careers/razorpay.svg';
import careersPaytmLogo from '../assets/careers/paytm.svg';
import digitalMarketingExecutiveImg from '../assets/images/job-roles/digital-marketing-executive.webp';
import seoSpecialistImg from '../assets/images/job-roles/seo-specialist.webp';
import performanceMarketerImg from '../assets/images/job-roles/performance-marketer.webp';
import socialMediaSpecialistImg from '../assets/images/job-roles/social-media-specialist.webp';
import googleAdsSpecialistImg from '../assets/images/job-roles/google-ads-specialist.webp';
import contentMarketerImg from '../assets/images/job-roles/content-marketer.webp';
import dataAnalystImg from '../assets/images/job-roles/data-analyst.webp';
import marketingAnalystImg from '../assets/images/job-roles/marketing-analyst.webp';
import eCommerceMarketerImg from '../assets/images/job-roles/e-commerce-marketer.webp';
import aiMarketingSpecialistImg from '../assets/images/job-roles/ai-marketing-specialist.webp';
import growthMarketerImg from '../assets/images/job-roles/growth-marketer.webp';
import growthStrategistImg from '../assets/images/job-roles/growth-strategist.webp';
import portfolioSeoAuditsImg from '../assets/images/portfolio-interview/seo-audits.webp';
import portfolioCampaignStrategiesImg from '../assets/images/portfolio-interview/campaign-strategies.webp';
import portfolioWebsitesImg from '../assets/images/portfolio-interview/websites.webp';
import portfolioContentPlansImg from '../assets/images/portfolio-interview/content-plans.webp';
import portfolioSocialMediaImg from '../assets/images/portfolio-interview/social-media-strategies.webp';
import portfolioAdvertisingImg from '../assets/images/portfolio-interview/advertising-campaigns.webp';
import portfolioAnalyticsImg from '../assets/images/portfolio-interview/analytics-reports.webp';
import portfolioAiWorkflowsImg from '../assets/images/portfolio-interview/ai-powered-marketing-workflows.webp';
import interviewPreparationImg from '../assets/images/portfolio-interview/interview-preparation.webp';
import placementTrainingImg from '../assets/images/placement-process/training.webp';
import placementProjectsImg from '../assets/images/placement-process/projects.webp';
import placementPortfolioImg from '../assets/images/placement-process/portfolio.webp';
import placementResumeImg from '../assets/images/placement-process/resume.webp';
import placementMockInterviewImg from '../assets/images/placement-process/mock-interview.webp';
import placementAssistanceImg from '../assets/images/placement-process/placement-assistance.webp';
import internshipLiveProjectsImg from '../assets/images/internship-process/live-projects-campaign-tools.webp';
import internshipClientMeetingsImg from '../assets/images/internship-process/client-meetings-strategy.webp';
import internshipAnalyticsImg from '../assets/images/internship-process/analytics-dashboards.webp';
import {
  ArrowUpRight,
  Play,
  Linkedin,
  FileText,
  Sparkles,
  X,
  CheckCircle2,
  TrendingUp,
  Briefcase,
  Users,
  Target,
  BarChart3,
  Search,
  Zap,
  Globe,
  Award,
  ChevronRight,
  ChevronLeft,
  Monitor,
  Building2,
  CheckSquare,
  Layers,
  Compass,
  ArrowRight,
  Cpu,
  GraduationCap
} from 'lucide-react';

import heroImg from '../assets/images/career-outcomes/career_outcomes_hero.webp';
import { SEO } from './SEO';

interface CareerOutcomesPageProps {
  onEnquireClick: (topic?: string) => void;
  onExplorePrograms: () => void;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as any },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as any },
});

/* Animated horizontal capability bar for the Salary & Growth section */
function GrowthBar({ percent, delay = 0 }: { percent: number; delay?: number }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-[#2B2B2B] overflow-hidden mt-3">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-full bg-gradient-to-r from-[#F15A29] to-[#FFB27A]"
      />
    </div>
  );
}

export function CareerOutcomesPage({ onEnquireClick, onExplorePrograms }: CareerOutcomesPageProps) {
  // Video Modal State for Testimonials (Section 11)
  const [activeVideo, setActiveVideo] = useState<{
    name: string;
    role: string;
    title: string;
    videoUrl: string;
    thumbnail: string;
  } | null>(null);

  // Active Step for Placement Process (Section 02)
  const [activePlacementStep, setActivePlacementStep] = useState<number>(0);

  // Active Stage for Career Roadmap (Section 04)
  const [activeRoadmapIndex, setActiveRoadmapIndex] = useState<number>(0);

  // Active Portfolio Preview (Section 08)
  const [activePortfolioTab, setActivePortfolioTab] = useState<number>(0);

  // Active Industry Category Filter for Hiring Companies (Section 07)
  const [activeSector, setActiveSector] = useState<string>('All Industries');

  // Horizontal scroll refs for mobile step/tab rows
  const placementTabsRef = useRef<HTMLDivElement>(null);
  const roadmapPillsRef = useRef<HTMLDivElement>(null);
  const scrollStepRow = (
    ref: React.RefObject<HTMLDivElement | null>,
    dir: number
  ) => ref.current?.scrollBy({ left: dir * 240, behavior: 'smooth' });

  // Placement Process Steps
  const placementSteps = [
    {
      title: "Training",
      code: "01",
      focus: "Hands-on execution of core channels, tools & strategy",
      detail: "Deep dive into real-world tools, consumer psychology, data analytics, and generative AI frameworks under expert guidance.",
      icon: GraduationCap,
      image: placementTrainingImg
    },
    {
      title: "Projects",
      code: "02",
      focus: "Live campaign briefs & real budget handling",
      detail: "Translating concepts into active marketing campaigns with real client constraints, audience personas, and spend allocation.",
      icon: Target,
      image: placementProjectsImg
    },
    {
      title: "Portfolio",
      code: "03",
      focus: "Verified campaign reports & technical audits",
      detail: "Building a bulletproof digital showcase of SEO audits, ROAS reports, content strategies, and AI workflows.",
      icon: Briefcase,
      image: placementPortfolioImg
    },
    {
      title: "Resume",
      code: "04",
      focus: "ATS-optimized executive profile & metrics formatting",
      detail: "Structuring your experience with quantifiable business outcomes, commercial math, and tool stack highlights.",
      icon: FileText,
      image: placementResumeImg
    },
    {
      title: "Mock Interview",
      code: "05",
      focus: "1-on-1 strategy defense with industry HR heads",
      detail: "Defending campaign choices, handling stress scenarios, and answering high-stakes commercial growth questions.",
      icon: Users,
      image: placementMockInterviewImg
    },
    {
      title: "Placement Assistance",
      code: "06",
      focus: "Direct referral access to top agency & corporate teams",
      detail: "Connecting verified student portfolios with hiring managers across startups, agencies, and global enterprises.",
      icon: Award,
      image: placementAssistanceImg
    }
  ];

  // Career Roadmap Stages
  const roadmapStages = [
    { name: "Learn", code: "01", detail: "Foundational marketing principles, consumer math & AI tools", highlight: "Core Competency" },
    { name: "Specialize", code: "02", detail: "Deep channel mastery in SEO, PPC, Analytics or Content", highlight: "Channel Authority" },
    { name: "Gain Experience", code: "03", detail: "Executing real client budgets & live optimization loops", highlight: "Real-World Practice" },
    { name: "Apply", code: "04", detail: "Solving complex commercial growth & acquisition problems", highlight: "Strategic Thinking" },
    { name: "Build Expertise", code: "05", detail: "Developing custom attribution & CRO growth frameworks", highlight: "Advanced Mastery" },
    { name: "Grow", code: "06", detail: "Scaling campaigns, managing team budgets & cross-functional strategy", highlight: "Leadership Scaling" },
    { name: "Lead", code: "07", detail: "Head of Marketing, Agency Director, Founder or Senior Consultant", highlight: "Executive Impact" }
  ];

  // Job Roles List with Real Indian Working Professionals Photography
  const jobRolesList = [
    {
      title: "Digital Marketing Executive",
      image: digitalMarketingExecutiveImg,
      tag: "Execution & Campaigns"
    },
    {
      title: "SEO Specialist",
      image: seoSpecialistImg,
      tag: "Search & Technical Audit"
    },
    {
      title: "Performance Marketer",
      image: performanceMarketerImg,
      tag: "Paid Ads & ROAS"
    },
    {
      title: "Social Media Specialist",
      image: socialMediaSpecialistImg,
      tag: "Brand & Engagement"
    },
    {
      title: "Google Ads Specialist",
      image: googleAdsSpecialistImg,
      tag: "PPC & Conversion Funnels"
    },
    {
      title: "Content Marketer",
      image: contentMarketerImg,
      tag: "Copywriting & Storytelling"
    },
    {
      title: "Data Analyst",
      image: dataAnalystImg,
      tag: "Traffic & User Behavior"
    },
    {
      title: "Marketing Analyst",
      image: marketingAnalystImg,
      tag: "Attribution & Metrics"
    },
    {
      title: "E-Commerce Marketer",
      image: eCommerceMarketerImg,
      tag: "Store Sales & Retention"
    },
    {
      title: "AI Marketing Specialist",
      image: aiMarketingSpecialistImg,
      tag: "Generative AI & Automation"
    },
    {
      title: "Growth Marketer",
      image: growthMarketerImg,
      tag: "A/B Testing & Scaling"
    },
    {
      title: "Growth Strategist",
      image: growthStrategistImg,
      tag: "Go-To-Market Leadership"
    }
  ];

  // Official Hiring Brands List with Real Logos (local assets)
  const officialBrands = [
    { name: "Google", logo: careersGoogleLogo },
    { name: "Meta", logo: careersMetaLogo },
    { name: "Amazon", logo: careersAmazonLogo },
    { name: "Microsoft", logo: careersMicrosoftLogo },
    { name: "Adobe", logo: careersAdobeLogo },
    { name: "HubSpot", logo: careersHubspotLogo },
    { name: "Shopify", logo: careersShopifyLogo },
    { name: "Flipkart", logo: careersFlipkartLogo },
    { name: "Zomato", logo: careersZomatoLogo },
    { name: "Swiggy", logo: careersSwiggyLogo },
    { name: "Razorpay", logo: careersRazorpayLogo },
    { name: "Paytm", logo: careersPaytmLogo }
  ];

  // Portfolio Previews Data
  const portfolioPreviews = [
    {
      title: "SEO Audits",
      icon: Search,
      desc: "Comprehensive technical crawler reports, Core Web Vitals diagnostic, keyword positioning & backlink profile indexing.",
      img: portfolioSeoAuditsImg,
      bullets: ["Technical Site Architecture", "On-Page Content Gaps", "Keyword Intent Mapping", "Backlink Risk Audit"]
    },
    {
      title: "Campaign Strategies",
      icon: Target,
      desc: "Omnichannel customer journey maps, audience segmentation personas, offer strategy & full budget allocation plans.",
      img: portfolioCampaignStrategiesImg,
      bullets: ["Funnel Architecture", "Creative Briefs", "CAC & LTV Modeling", "Budget Scaling Matrix"]
    },
    {
      title: "Websites",
      icon: Globe,
      desc: "Responsive conversion-optimized landings, UX wireframes, lead magnet triggers & analytics pixel mapping.",
      img: portfolioWebsitesImg,
      bullets: ["High-Converting Wireframes", "Custom CTA Placements", "Tag Manager Integration", "Speed & Accessibility"]
    },
    {
      title: "Content Plans",
      icon: FileText,
      desc: "Editorial calendars, viral short-form video hooks, thought leadership pillars & pillar-cluster blog strategies.",
      img: portfolioContentPlansImg,
      bullets: ["Content Pillars Matrix", "Social Distribution Grid", "Copywriting Frameworks", "SEO Cluster Strategy"]
    },
    {
      title: "Social Media Strategies",
      icon: Users,
      desc: "Brand voice positioning, community growth playbooks, influencer brief templates & organic reach optimization.",
      img: portfolioSocialMediaImg,
      bullets: ["Audience Growth Playbooks", "Creative Asset Specs", "Engagement Funnel", "Influencer ROI Tracker"]
    },
    {
      title: "Advertising Campaigns",
      icon: Zap,
      desc: "Meta & Google Ad account structures, dynamic ad copy variations, landing page alignment & bid strategy rules.",
      img: portfolioAdvertisingImg,
      bullets: ["Account Structure Blueprints", "A/B Creative Test Matrix", "Custom Audience Audiences", "ROAS Benchmark System"]
    },
    {
      title: "Analytics Reports",
      icon: BarChart3,
      desc: "Custom Google Analytics 4 dashboards, multi-touch attribution modeling, funnel drop-off audit & ROAS reports.",
      img: portfolioAnalyticsImg,
      bullets: ["GA4 Custom Explorations", "Looker Studio Dashboards", "Conversion Drop-Off Audit", "Multi-Touch Attribution"]
    },
    {
      title: "AI-Powered Marketing Workflows",
      icon: Cpu,
      desc: "Custom prompt engineering libraries, automated keyword clustering scripts, generative ad variant engines.",
      img: portfolioAiWorkflowsImg,
      bullets: ["Custom AI Prompt Library", "Automated Content Pipeline", "AI Ad Copy Generator", "Workflow Automation"]
    }
  ];

  // Testimonial Videos List
  const testimonialVideos = [
    {
      name: "Ananya Sharma",
      role: "Performance Marketer @ Growth Agency",
      title: "Transitioning from Non-Tech to Performance Marketing",
      thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      name: "Rohan Verma",
      role: "SEO Strategist @ E-Commerce Brand",
      title: "How Live Projects Helped Me Land My First SEO Specialist Role",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      name: "Priya Nair",
      role: "AI Marketing Specialist @ SaaS Enterprise",
      title: "Combining Marketing Strategy with Generative AI Workflows",
      thumbnail: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];

  return (
    <div className="w-full bg-[#FAF8F5] text-[#111111] font-['Sora',sans-serif] selection:bg-[#F15A29] selection:text-white overflow-x-hidden pt-20 sm:pt-24">
      <SEO
        title="Job Guarantee Digital Marketing Course in Pune | Teonox"
        description="Career-oriented digital marketing course in Pune with 100% job guarantee. Placement-focused training for freshers, graduates & career switchers."
        canonical="/careers"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Career Outcomes — TEONOX',
          url: 'https://teonox.com/careers',
        }}
      />

      {/* ─────────────────────────────────────────────────────────────────
          SECTION 01: HERO (Editorial White & High Contrast Luxury Layout)
          ───────────────────────────────────────────────────────────────── */}
      <section className="relative w-full bg-white py-12 sm:py-16 border-b border-[#EBE4DC] overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `radial-gradient(#111111 1.2px, transparent 1.2px)`, backgroundSize: '24px 24px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Hero Editorial Headings & Exact Locked Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <div className="space-y-3">
                <h1 className="text-[32px] sm:text-[46px] lg:text-[54px] font-[800] leading-[1.08] tracking-tight text-[#111111]">
                  CAREER OUTCOMES
                </h1>

                <p className="text-[18px] sm:text-[24px] font-[800] text-[#F15A29] leading-tight">
                  Learn Skills. Build Experience. Create Opportunities.
                </p>
              </div>

              <p className="font-inter text-base sm:text-lg text-[#444444] leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                At TEONOX, career preparation goes beyond completing a course. Our approach focuses on building the skills, practical experience, portfolio, confidence and professional readiness needed to pursue opportunities in the Digital Marketing and AI-Driven World.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => onEnquireClick("Career Advisory")}
                  className="px-7 py-3.5 rounded-full bg-[#F15A29] hover:bg-[#D9491D] text-white font-sora text-sm sm:text-base font-extrabold uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span>Talk to a Career Advisor</span>
                  <ArrowUpRight className="w-5 h-5" />
                </button>
                <button
                  onClick={onExplorePrograms}
                  className="px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF8F5] text-[#111111] font-sora text-sm sm:text-base font-bold border border-[#EBE4DC] hover:border-[#111111] transition-all cursor-pointer shadow-xs"
                >
                  <span>Explore Programs</span>
                </button>
              </div>
            </motion.div>

            {/* Right Column: Premium Photography Composition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-[#EBE4DC] shadow-xl group">
                <img
                  src={heroImg}
                  alt="Successful TEONOX graduate in digital marketing career"
                  className="w-full h-[320px] sm:h-[420px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────
          SECTION 02: PLACEMENT PROCESS (Dark Interactive Animated Roadmap)
          ───────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#0A0A0A] text-white relative overflow-hidden">
        {/* Background Radial Lights */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-white tracking-tight leading-[1.18]">
              PLACEMENT PROCESS
            </h2>
            <p className="text-xl sm:text-2xl font-extrabold text-[#F15A29]">
              From Training to Career Readiness
            </p>
            <p className="font-inter text-base sm:text-lg text-[#CCCCCC] leading-relaxed max-w-2xl mx-auto font-medium">
              Students’ progress through skill development, practical projects, portfolio building, resume preparation, mock interviews and placement assistance, helping them approach opportunities with greater confidence.
            </p>
          </div>

          {/* Step Selector Tabs & Detailed Cards Display */}
          <div className="space-y-12">
            {/* Interactive Timeline Tabs — single scrollable row on mobile */}
            <div className="flex items-center gap-2 lg:block">
              <button
                onClick={() => scrollStepRow(placementTabsRef, -1)}
                aria-label="Scroll steps left"
                className="shrink-0 lg:hidden w-9 h-9 rounded-full bg-[#141414] border border-[#2A2A2A] text-[#AAAAAA] hover:text-white hover:border-[#F15A29] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div
                ref={placementTabsRef}
                className="flex min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-2 py-1 pr-4 sm:pr-2 lg:grid lg:grid-cols-6 lg:gap-3 lg:py-0 lg:pr-0"
              >
              {placementSteps.map((step, idx) => {
                const isActive = activePlacementStep === idx;
                const IconComp = step.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => setActivePlacementStep(idx)}
                    className={`shrink-0 min-w-[170px] lg:min-w-0 p-3 sm:p-5 rounded-2xl font-sora text-left transition-all cursor-pointer border flex flex-col justify-between space-y-3 ${
                      isActive
                        ? 'bg-[#F15A29] text-white border-[#F15A29] shadow-xl scale-[1.03]'
                        : 'bg-[#141414] text-[#AAAAAA] border-[#262626] hover:border-[#F15A29]/50 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-xs font-extrabold px-2 py-0.5 rounded ${
                        isActive ? 'bg-white text-[#F15A29]' : 'bg-[#222222] text-[#888888]'
                      }`}>
                        {step.code}
                      </span>
                      <IconComp className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#F15A29]'}`} />
                    </div>
                    <p className="text-[13px] sm:text-base font-extrabold leading-snug">{step.title}</p>
                  </button>
                );
              })}
              </div>
              <button
                onClick={() => scrollStepRow(placementTabsRef, 1)}
                aria-label="Scroll steps right"
                className="shrink-0 lg:hidden w-9 h-9 rounded-full bg-[#141414] border border-[#2A2A2A] text-[#AAAAAA] hover:text-white hover:border-[#F15A29] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Active Milestone Card Showcase */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlacementStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 rounded-3xl bg-[#141414] border border-[#2B2B2B] shadow-2xl relative overflow-hidden"
              >
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F15A29]/20 border border-[#F15A29]/30 text-[#F15A29] font-mono text-xs font-bold uppercase">
                    <span>STEP {placementSteps[activePlacementStep].code} OF 06</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold font-sora text-white leading-tight">
                    {placementSteps[activePlacementStep].title}
                  </h3>

                  <p className="font-sora text-lg sm:text-xl font-bold text-[#F15A29]">
                    {placementSteps[activePlacementStep].focus}
                  </p>

                  <p className="font-inter text-base text-[#CCCCCC] leading-relaxed">
                    {placementSteps[activePlacementStep].detail}
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => setActivePlacementStep((prev) => (prev + 1) % placementSteps.length)}
                      className="px-6 py-3 rounded-full bg-white text-[#111111] font-sora text-sm font-extrabold flex items-center gap-2 hover:bg-[#F15A29] hover:text-white transition-all cursor-pointer"
                    >
                      <span>Next Phase</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 relative">
                  <div className="rounded-2xl overflow-hidden border border-[#333333] shadow-2xl h-[280px] sm:h-[340px]">
                    <img
                      src={placementSteps[activePlacementStep].image}
                      alt={placementSteps[activePlacementStep].title}
                      className="w-full h-full object-cover object-center transition-opacity duration-300"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────
          SECTION 03: INTERNSHIP PROCESS (Curved Visual Cards & Dashboard)
          ───────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Section Header */}
          <motion.div {...fadeUp(0)} className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] tracking-tight leading-[1.18]">
              INTERNSHIP PROCESS
            </h2>
            <p className="text-xl sm:text-2xl font-extrabold text-[#F15A29]">
              Turn Learning into Experience
            </p>
            <p className="font-inter text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl mx-auto font-medium">
              Eligible students get opportunities to apply their learning through internships, live projects and practical assignments, experiencing how Digital Marketing works in real business environments.
            </p>
          </motion.div>

          {/* Visual Showcase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Live Projects & Campaign Tools",
                tag: "Practical Execution",
                img: internshipLiveProjectsImg
              },
              {
                title: "Real Client Meetings & Strategy",
                tag: "Business Communication",
                img: internshipClientMeetingsImg
              },
              {
                title: "Marketing Analytics & Dashboards",
                tag: "Data & Performance",
                img: internshipAnalyticsImg
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                {...fadeUp(idx * 0.12)}
                whileHover={{ y: -8 }}
                className="card-premium p-6 rounded-3xl bg-white border border-[#EBE4DC] shadow-sm hover:shadow-xl hover:border-[#F15A29]/50 transition-all space-y-5 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="h-56 rounded-2xl overflow-hidden border border-[#EBE4DC] relative">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500" loading="lazy" decoding="async" />
                  </div>
                  <h3 className="font-sora text-xl font-extrabold text-[#111111] group-hover:text-[#F15A29] transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────
          SECTION 04: CAREER ROADMAP (Interactive Node Journey Path)
          ───────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#0F0F0F] text-white relative overflow-hidden">
        {/* Glow Effects */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

          {/* Section Header */}
          <motion.div {...fadeUp(0)} className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-white tracking-tight leading-[1.18]">
              CAREER ROADMAP
            </h2>
            <p className="text-xl sm:text-2xl font-extrabold text-[#F15A29]">
              Your Skills. Multiple Career Paths.
            </p>
            <p className="font-inter text-base sm:text-lg text-[#CCCCCC] leading-relaxed max-w-2xl mx-auto font-medium">
              Start your journey as a specialist, grow into a strategist, and progress toward leadership, consulting, freelancing, entrepreneurship or agency opportunities.
            </p>
          </motion.div>

          {/* Interactive Horizontal Node Navigation */}
          <div className="space-y-10">
            <div className="flex items-center gap-2 md:block">
              <button
                onClick={() => scrollStepRow(roadmapPillsRef, -1)}
                aria-label="Scroll stages left"
                className="shrink-0 md:hidden w-9 h-9 rounded-full bg-[#1C1C1C] border border-[#2A2A2A] text-[#888888] hover:text-white hover:border-[#F15A29] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div
                ref={roadmapPillsRef}
                className="flex min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden items-center justify-start sm:justify-center gap-2 py-1 pr-4 sm:pr-2"
              >
              {roadmapStages.map((stage, idx) => {
                const isActive = activeRoadmapIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveRoadmapIndex(idx)}
                    className={`shrink-0 whitespace-nowrap px-4 py-2.5 rounded-full font-sora text-[13px] font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#F15A29] text-white shadow-xl shadow-[#F15A29]/30 scale-105'
                        : 'bg-[#1C1C1C] text-[#888888] hover:text-white border border-[#2A2A2A]'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono ${
                      isActive ? 'bg-white text-[#F15A29]' : 'bg-[#333333] text-white'
                    }`}>
                      {stage.code}
                    </span>
                    <span>{stage.name}</span>
                  </button>
                );
              })}
              </div>
              <button
                onClick={() => scrollStepRow(roadmapPillsRef, 1)}
                aria-label="Scroll stages right"
                className="shrink-0 md:hidden w-9 h-9 rounded-full bg-[#1C1C1C] border border-[#2A2A2A] text-[#888888] hover:text-white hover:border-[#F15A29] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stage Detail Highlight Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRoadmapIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto p-8 sm:p-10 rounded-3xl bg-[#181818] border border-[#2E2E2E] shadow-2xl text-center space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F15A29]/20 text-[#F15A29] font-mono text-xs font-bold uppercase">
                  <span>STAGE {roadmapStages[activeRoadmapIndex].code} • {roadmapStages[activeRoadmapIndex].highlight}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold font-sora text-white leading-tight">
                  {roadmapStages[activeRoadmapIndex].name}
                </h3>

                <p className="font-inter text-base sm:text-lg text-[#EBE4DC] leading-relaxed max-w-xl mx-auto">
                  {roadmapStages[activeRoadmapIndex].detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────
          SECTION 05: JOB ROLES (Floating Professional Showcase)
          ───────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Section Header */}
          <motion.div {...fadeUp(0)} className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] tracking-tight leading-[1.18]">
              JOB ROLES
            </h2>
            <p className="text-xl sm:text-2xl font-extrabold text-[#F15A29]">
              One Industry. Multiple Career Opportunities.
            </p>
            <p className="font-inter text-base sm:text-lg text-[#555555] font-semibold">
              Build capabilities for roles such as:
            </p>
          </motion.div>

          {/* Professional Role Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {jobRolesList.map((role, idx) => (
              <motion.div
                key={idx}
                {...fadeUp((idx % 4) * 0.08)}
                whileHover={{ y: -6 }}
                className="card-premium p-5 rounded-3xl bg-[#FAF8F5] border border-[#EBE4DC] shadow-xs hover:shadow-xl hover:border-[#F15A29]/50 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="h-48 sm:h-52 rounded-2xl overflow-hidden border border-[#EBE4DC] relative">
                  <img src={role.image} alt={role.title} className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-500" loading="lazy" decoding="async" />
                </div>
                <div>
                  <h3 className="font-sora text-base sm:text-lg font-extrabold text-[#111111] group-hover:text-[#F15A29] transition-colors">
                    {role.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────
          SECTION 06: SALARY & GROWTH POTENTIAL (Business Growth Matrix)
          ───────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#0A0A0A] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Exact Locked Content */}
            <motion.div {...fadeUp(0)} className="lg:col-span-6 space-y-6">
              <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-white tracking-tight leading-[1.18]">
                SALARY & GROWTH POTENTIAL
              </h2>

              <p className="text-xl sm:text-2xl font-extrabold text-[#F15A29]">
                Your Career Can Grow with Your Skills.
              </p>

              <p className="font-inter text-base sm:text-lg text-[#CCCCCC] leading-relaxed font-medium">
                Compensation in Digital Marketing varies significantly based on skills, specialization, experience, city, company, portfolio and demonstrated performance.
              </p>

              <p className="font-inter text-base sm:text-lg text-[#CCCCCC] leading-relaxed font-medium">
                Rather than promising a fixed salary, TEONOX focuses on developing capabilities that can help learners compete for better opportunities as their expertise grows.
              </p>
            </motion.div>

            {/* Right Column: Premium Interactive Growth Matrix */}
            <motion.div {...fadeUp(0.15)} className="lg:col-span-6">
              <div className="card-premium p-8 rounded-3xl bg-[#141414] border border-[#2B2B2B] shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2A]">
                  <span className="font-sora text-sm font-bold text-white">Skill Capability & Value Scale</span>
                  <span className="font-mono text-xs text-[#F15A29] font-bold">Demonstrated ROI</span>
                </div>

                <div className="space-y-4">
                  {[
                    { tier: "Foundational Specialist", focus: "Tool execution & channel campaigns", growth: "Core Entry Level", bar: 40 },
                    { tier: "Performance Strategist", focus: "ROAS optimization & funnel math", growth: "Accelerated Growth", bar: 70 },
                    { tier: "Growth Lead & Consultant", focus: "Commercial strategy & team leadership", growth: "High Impact", bar: 95 }
                  ].map((item, idx) => (
                    <motion.div key={idx} {...fadeUp(0.1 * idx)} className="p-5 rounded-2xl bg-[#1A1A1A] border border-[#2B2B2B] hover:border-[#F15A29]/50 transition-colors">
                      <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                        <div className="min-w-0">
                          <p className="font-sora text-base font-extrabold text-white">{item.tier}</p>
                          <p className="font-inter text-xs text-[#AAAAAA] mt-0.5">{item.focus}</p>
                        </div>
                        <span className="shrink-0 px-2 py-0.5 rounded-full bg-[#F15A29]/15 text-[#F15A29] font-mono text-[10px] font-bold whitespace-nowrap">
                          {item.growth}
                        </span>
                      </div>
                      <GrowthBar percent={item.bar} delay={0.2 + idx * 0.15} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────
          SECTION 07: COMPANIES HIRING (Official Logo Ecosystem)
          ───────────────────────────────────────────────────────────────── */}
      <section className="py-8 sm:py-16 bg-[#FAF8F5] border-b border-[#EBE4DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">

          {/* Section Header */}
          <motion.div {...fadeUp(0)} className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] tracking-tight leading-[1.18]">
              COMPANIES HIRING
            </h2>
            <p className="text-xl sm:text-2xl font-extrabold text-[#F15A29]">
              Digital Skills Are Needed Across Industries.
            </p>
          </motion.div>

          {/* Official Brands Grid with Real Company Logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5 max-w-6xl mx-auto">
            {officialBrands.map((brand, idx) => (
              <motion.div
                key={idx}
                {...scaleIn((idx % 6) * 0.06)}
                whileHover={{ y: -4, scale: 1.03 }}
                className="p-4 sm:p-6 rounded-2xl bg-white border border-[#EBE4DC] shadow-sm hover:border-[#F15A29] hover:shadow-xl transition-all duration-300 flex items-center justify-center h-24 sm:h-28 group"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                  className="h-11 sm:h-12 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────
          SECTION 08: PORTFOLIO DEVELOPMENT (Visual Project Showcase Cards)
          ───────────────────────────────────────────────────────────────── */}
      <section className="pt-14 sm:pt-20 pb-12 sm:pb-16 bg-[#0A0A0A] text-white relative overflow-hidden">
        {/* Ambient Glowing Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">

          {/* Section Header with EXACT Locked Content */}
          <motion.div {...fadeUp(0)} className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-white tracking-tight leading-[1.18]">
              PORTFOLIO DEVELOPMENT
            </h2>
            <p className="text-xl sm:text-2xl font-extrabold text-[#F15A29]">
              Don&apos;t Just Say What You Know. Show What You Can Do.
            </p>
          </motion.div>

          {/* 8 Image Showcase Grid (Only High-Res Images & Project Titles) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioPreviews.map((item, idx) => {
              return (
                <motion.div
                  key={idx}
                  {...fadeUp((idx % 4) * 0.1)}
                  whileHover={{ y: -8 }}
                  className="card-premium rounded-2xl bg-[#141414] border border-[#2B2B2B] hover:border-[#F15A29] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group"
                >
                  {/* Clean High Quality Project Image */}
                  <div className="h-56 sm:h-60 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Clean Project Title Below Image */}
                  <div className="p-5 border-t border-[#262626] bg-[#141414]">
                    <h3 className="font-sora text-base sm:text-lg font-extrabold text-white group-hover:text-[#F15A29] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────
          SECTION 09: RESUME & LINKEDIN SUPPORT (Editorial Layout)
          ───────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Exact Locked Content */}
            <motion.div {...fadeUp(0)} className="lg:col-span-6 space-y-6">
              <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] tracking-tight leading-[1.18]">
                RESUME & LINKEDIN SUPPORT
              </h2>

              <p className="text-xl sm:text-2xl font-extrabold text-[#F15A29]">
                Position Yourself for the Opportunity You Want.
              </p>

              <p className="font-inter text-base sm:text-lg text-[#555555] leading-relaxed font-medium">
                Get guidance to build a professional resume, LinkedIn profile and digital presence that communicates your skills, projects, certifications and capabilities effectively.
              </p>
            </motion.div>

            {/* Right Column: Previews */}
            <div className="lg:col-span-6 space-y-6">
              <motion.div {...fadeUp(0.1)} className="card-premium p-8 rounded-3xl bg-[#FAF8F5] border border-[#EBE4DC] space-y-4 shadow-md hover:border-[#F15A29] transition-colors">
                <div className="flex items-center gap-3 text-[#0A66C2]">
                  <Linkedin className="w-7 h-7" />
                  <span className="font-sora text-lg font-extrabold text-[#111111]">LinkedIn Profile Optimization</span>
                </div>
                <p className="font-inter text-sm text-[#555555] leading-relaxed">
                  Positioning headline, keyword optimization for recruiter searchability, and project portfolio attachments.
                </p>
              </motion.div>

              <motion.div {...fadeUp(0.2)} className="card-premium p-8 rounded-3xl bg-[#FAF8F5] border border-[#EBE4DC] space-y-4 shadow-md hover:border-[#F15A29] transition-colors">
                <div className="flex items-center gap-3 text-[#F15A29]">
                  <FileText className="w-7 h-7" />
                  <span className="font-sora text-lg font-extrabold text-[#111111]">ATS-Friendly Resume Structuring</span>
                </div>
                <p className="font-inter text-sm text-[#555555] leading-relaxed">
                  Formatting real campaign metrics, ROI outcomes, tool stack proficiency and verified client project credentials.
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────
          SECTION 10: INTERVIEW PREPARATION (Premium Interview Room Scene)
          ───────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#0A0A0A] text-white border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Exact Locked Content */}
            <motion.div {...fadeUp(0)} className="lg:col-span-6 space-y-6">
              <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-white tracking-tight leading-[1.18]">
                INTERVIEW PREPARATION
              </h2>

              <p className="text-xl sm:text-2xl font-extrabold text-[#F15A29]">
                Knowledge Gets Tested. Confidence Gets Noticed.
              </p>

              <p className="font-inter text-base sm:text-lg text-[#CCCCCC] leading-relaxed font-medium">
                Prepare through interview guidance, mock interviews, practical questions, campaign scenarios and role-specific preparation designed to improve professional readiness.
              </p>
            </motion.div>

            {/* Right Column: Real HR Interview Scene */}
            <motion.div {...fadeUp(0.15)} className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
                <img
                  src={interviewPreparationImg}
                  alt="Real HR interview scene"
                  className="w-full h-[380px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />

              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────────
          SECTION 12: CLOSING CTA (Cinematic Minimal Dark Section)
          ───────────────────────────────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#0A0A0A] text-white relative overflow-hidden">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-10">


          <motion.p {...fadeUp(0)} className="font-inter text-lg sm:text-2xl text-[#CCCCCC] max-w-2xl mx-auto leading-relaxed font-medium">
            Develop the skills, experience, portfolio and confidence to take your next step in the Digital &amp; AI economy.
          </motion.p>

          <motion.div {...fadeUp(0.15)} className="pt-4 flex flex-wrap items-center justify-center gap-5">
            <button
              onClick={onExplorePrograms}
              className="px-9 py-5 rounded-full bg-[#F15A29] hover:bg-[#D9491D] text-white font-sora text-base font-extrabold uppercase tracking-wider transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onEnquireClick('Career Advisory')}
              className="px-9 py-5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#111111] font-sora text-base font-bold border border-white/20 transition-all cursor-pointer backdrop-blur-md"
            >
              <span>Talk to a Career Advisor</span>
            </button>
          </motion.div>
        </div>
      </section>


      {/* Video Modal Popup */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-[#181818] border border-[#333333] rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-4 flex items-center justify-between border-b border-[#333333] text-white">
                <div>
                  <h4 className="font-sora font-extrabold text-base">{activeVideo.name}</h4>
                  <p className="font-mono text-xs text-[#F15A29]">{activeVideo.role}</p>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative pt-[56.25%] bg-black">
                <iframe
                  src={activeVideo.videoUrl}
                  title={activeVideo.name}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
