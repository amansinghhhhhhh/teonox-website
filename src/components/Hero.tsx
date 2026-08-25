import { useState, useEffect } from 'react';
import { Sparkles, Play, ArrowRight, Download, PenTool } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onEnquireClick: () => void;
  onBrochureClick: () => void;
}

const phrases = [
  '12+ Year Experience Faculty',
  'Integrated with AI and GenAI Tools',
  'Upskill in AI and automation',
  'Corporate AI automation training',
];

const LONGEST_PHRASE = 'Corporate AI automation training';

export function Hero({ onExploreClick, onEnquireClick, onBrochureClick }: HeroProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    } else {
      const speed = isDeleting ? 45 : 85;
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? currentPhrase.substring(0, displayText.length - 1)
            : currentPhrase.substring(0, displayText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section id="home" className="pt-24 pb-16 md:pt-28 md:pb-24 bg-[#F9F8F6] relative overflow-hidden">
      {/* Background Radial Glow */}
      
      {/* Soft Ambient Light Spheres */}
      <div className="absolute inset-0 bg-grid-dots opacity-[0.35] pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,#000_10%,transparent_75%)]" />

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center animate-fade-in-up">
        
        {/* Main Display Headline */}
        <div className="relative mx-auto mb-6">
          {/* Floating Sparkle on Left */}
          <div className="hidden sm:flex absolute -top-4 left-2 md:left-8 text-[#F15A29] items-center justify-center animate-float-slow">
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 fill-[#F15A29]/20" />
          </div>

          <h1 className="font-sora text-[clamp(24px,3.8vw,52px)] font-[800] text-[#201A17] tracking-tight leading-[1.12]">
            Gen AI Course in Pune
            <br />
            <span className="inline-flex flex-wrap items-center justify-center gap-2 mt-2">
              <span>with Assured Placement</span>
              
              {/* Highlighted Rounded Pill Box with Typewriter Animation */}
              <span className="relative inline-grid max-w-[90vw] w-auto items-center justify-items-center px-3 py-1 sm:px-6 sm:py-2 rounded-2xl bg-white border-2 border-[#EADAD0] text-[#F15A29] shadow-[0_8px_30px_rgba(241,90,41,0.12)] min-h-[42px] sm:min-h-[52px]">
                {/* Invisible placeholder pins the pill width to the longest phrase so typing never resizes the container */}
                <span aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">
                  {LONGEST_PHRASE}
                  <span className="inline-block w-[3px]" />
                </span>
                {/* Visible typewriter text + blinking cursor (overlaid on the same grid cell) */}
                <span className="flex items-center whitespace-nowrap col-start-1 row-start-1">
                  {displayText}
                  <span className="w-[3px] h-[0.85em] bg-[#F15A29] ml-1.5 translate-y-[2px] animate-pulse inline-flex" />
                </span>
                
                {/* Decorative Pill Handles Corner Dots */}
                <span className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-[#F15A29] rounded-full" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#F15A29] rounded-full" />
                <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-[#F15A29] rounded-full" />
                <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#F15A29] rounded-full" />
              </span>

              {/* Vector Scribble / Pen Icon on Right */}
              <span className="text-[#201A17] -rotate-12 translate-y-1 inline-block animate-float-slow">
                <PenTool className="w-5 h-5 sm:w-7 sm:h-7 text-[#201A17]" />
              </span>
            </span>
          </h1>
        </div>

        {/* Supporting Paragraph */}
        <p className="font-inter text-[17.5px] sm:text-[20px] font-[400] text-[#665A4E] leading-relaxed mx-auto mb-10 max-w-4xl animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
        Best Business Digital Marketing Courses in Pune with 100% Job Placement & affordable fees. Choose from Offline / Online learning options with classes integrated with AI and GenAI tools. With a 6-8 month duration and industry-recognized certification, it is one of the Best courses after graduation in Pune for students and professionals looking to build a career in digital marketing. Join weTeonox, the Gen AI School of Marketing in Pune, and master AI-powered, performance-driven, and practical digital marketing skills.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={onExploreClick}
            className="btn-sassriver-primary py-3.5 px-5 sm:px-8 text-sm sm:text-[16px] group cursor-pointer"
          >
            <Sparkles className="w-5 h-5 shrink-0 fill-white/20 group-hover:rotate-12 transition-transform duration-300" />
            <span className="whitespace-nowrap">Explore Programs</span>
            <ArrowRight className="w-4 h-4 ml-1 shrink-0 group-hover:translate-x-1.5 transition-transform duration-300" />
          </button>

          <button
            onClick={onBrochureClick}
            className="inline-flex items-center justify-center gap-2.5 py-3.5 px-5 sm:px-8 rounded-full bg-white hover:bg-[#FFF6F2] text-[#201A17] font-sora text-sm sm:text-[16px] font-[700] border border-[#E0D5C8] hover:border-[#F15A29] shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer group"
          >
            <div className="w-7 h-7 shrink-0 rounded-full bg-[#FFF0EB] group-hover:bg-[#F15A29] group-hover:text-white flex items-center justify-center text-[#F15A29] transition-all duration-300 shadow-sm">
              <Download className="w-3.5 h-3.5" />
            </div>
            <span className="whitespace-nowrap group-hover:text-[#F15A29] transition-colors duration-300">Download Brochure</span>
          </button>

          <button
            onClick={onEnquireClick}
            className="inline-flex items-center justify-center gap-2.5 py-3.5 px-5 sm:px-8 rounded-full bg-white hover:bg-[#FFF6F2] text-[#201A17] font-sora text-sm sm:text-[16px] font-[700] border border-[#E0D5C8] hover:border-[#F15A29] shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:scale-95 cursor-pointer group"
          >
            <div className="w-7 h-7 shrink-0 rounded-full bg-[#FFF0EB] group-hover:bg-[#F15A29] group-hover:text-white flex items-center justify-center text-[#F15A29] transition-all duration-300 shadow-sm">
              <Play className="w-3 h-3 fill-current ml-0.5" />
            </div>
            <span className="whitespace-nowrap group-hover:text-[#F15A29] transition-colors duration-300">Talk To Our Team</span>
          </button>
        </div>

      </div>
    </section>
  );
}

