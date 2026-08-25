import { Sparkles, Play, ArrowRight, Download } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onEnquireClick: () => void;
  onBrochureClick: () => void;
}

export function Hero({ onExploreClick, onEnquireClick, onBrochureClick }: HeroProps) {

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

          <h1 className="font-sora text-[clamp(26px,5.2vw,72px)] font-[800] text-[#201A17] tracking-tight leading-[1.12]">
            Gen AI Course in Pune
            <br />
            <span className="text-[#F15A29]">with Assured Placement</span>
          </h1>
        </div>

        {/* Supporting Paragraph */}
        <p className="font-inter text-[17.5px] sm:text-[20px] font-[400] text-[#665A4E] leading-relaxed mx-auto mb-10 max-w-4xl animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          Master in-demand business skills like Digital Marketing, AI, Automation, Data Analytics &amp; Digital Sales to get hired, or get promoted. No lectures, no theory dumps.
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

