import { ArrowRight, MessageCircle } from 'lucide-react';
import contactImg from '../assets/images/regenerated_image_1785580101348.webp';
import { Reveal } from './Reveal';

interface ContactSectionProps {
  initialInterest?: string;
  onExplorePrograms?: () => void;
  onEnquireClick?: (topic?: string) => void;
}

export function ContactSection({
  onExplorePrograms,
  onEnquireClick,
}: ContactSectionProps) {
  const handleExplore = () => {
    if (onExplorePrograms) {
      onExplorePrograms();
    } else {
      window.location.href = '/programs';
    }
  };

  const handleTalk = () => {
    if (onEnquireClick) {
      onEnquireClick('Talk to TEONOX - Growth CTA');
    } else {
      window.open('https://wa.me/918087177760?text=Hello%20TEONOX%20Team%2C%20I%20would%20like%20to%20talk%20about%20programs.', '_blank');
    }
  };

  return (
    <section id="contact" className="py-10 sm:py-14 bg-[#FAF8F5] text-[#111111] relative overflow-hidden border-t border-[#EBE4DC]">
      {/* Background Soft Ambient Glow */}

      <div className="w-[88%] max-w-6xl mx-auto relative z-10">
        <Reveal y={40} className="bg-white border border-[#EBE4DC] rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-[0_15px_45px_-10px_rgba(241,90,41,0.08)] relative overflow-hidden group">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[radial-gradient(#F15A29_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-left space-y-5">
              {/* Heading */}
              <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] leading-[1.18] tracking-tight">
                Build Your Future with <span className="text-[#F15A29]">TEONOX.</span>
              </h2>

              {/* Subheading */}
              <p className="font-sora text-[15px] sm:text-[17px] font-[600] text-[#555555] leading-relaxed tracking-tight">
                Think like a Marketer.<span className="text-[#F15A29] px-2">•</span>Execute like a Professional.<span className="text-[#F15A29] px-2">•</span>Grow like a Leader.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
                <button
                  onClick={handleExplore}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#F15A29] hover:bg-[#D8420F] text-white font-sora text-[14.5px] font-[700] transition-all duration-300 shadow-md shadow-[#F15A29]/25 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group/btn"
                >
                  <span>Explore Programs</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleTalk}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#111111] hover:bg-[#F15A29] text-white font-sora text-[14.5px] font-[700] border border-[#111111] hover:border-[#F15A29] transition-all duration-300 shadow-sm hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>Talk to TEONOX</span>
                </button>
              </div>
            </div>

            {/* Right Side Image Column */}
            <div className="lg:col-span-5 relative flex items-stretch">
              <div className="relative w-full min-h-[300px] sm:min-h-[360px] lg:min-h-[400px] rounded-[24px] overflow-hidden group/img">
                <img
                  src={contactImg}
                  alt="TEONOX Students Collaborating at Campus"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out" loading="lazy" decoding="async" />
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}


