import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

import momentThumb1 from '../../assets/images/about/moments/moment-1.webp';
import momentThumb2 from '../../assets/images/about/moments/moment-2.webp';
import momentThumb3 from '../../assets/images/about/moments/moment-3.webp';
import momentThumb4 from '../../assets/images/about/moments/moment-4.webp';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as any },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as any },
});

const TEONOX_VIDEOS = [
  { id: 'v1', title: 'Live AI Campaign Build & Performance Strategy', videoUrl: 'https://www.instagram.com/reel/DV_KQluArs_/embed', thumbnail: momentThumb1 },
  { id: 'v2', title: 'Real Brand Pitch & Student Case Presentation', videoUrl: 'https://www.instagram.com/reel/DWN5rOAjMts/embed', thumbnail: momentThumb2 },
  { id: 'v3', title: 'Mentorship & 1-on-1 Growth Guidance Session', videoUrl: 'https://www.instagram.com/reel/DWf3dceghLh/embed', thumbnail: momentThumb3 },
  { id: 'v4', title: 'Analytics Breakdown & Funnel Optimization', videoUrl: 'https://www.instagram.com/reel/DYWhSgig_gL/embed', thumbnail: momentThumb4 },
];

export function MomentsSection() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -340 : 340, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-[#F0DFCE] relative overflow-hidden">
      <div className="w-[88%] max-w-7xl mx-auto">
        <motion.div {...fadeUp(0)} className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="font-sora text-[28px] sm:text-[38px] font-[900] text-[#111111] tracking-tight mb-2">
              Moments That <span className="text-[#FF6A2B]">Define Us</span>
            </h2>
            <p className="font-inter text-[15px] text-[#555555]">A glimpse into our world: real sessions, real energy, real growth.</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => scrollSlider('left')} className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-[#FFF0EB] hover:border-[#FF6A2B] text-[#111111] hover:text-[#FF6A2B] flex items-center justify-center transition-all shadow-xs" aria-label="Scroll left">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scrollSlider('right')} className="w-11 h-11 rounded-full border border-slate-200 bg-white hover:bg-[#FFF0EB] hover:border-[#FF6A2B] text-[#111111] hover:text-[#FF6A2B] flex items-center justify-center transition-all shadow-xs" aria-label="Scroll right">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {TEONOX_VIDEOS.map((video, vi) => (
            <motion.div key={video.id} {...scaleIn(vi * 0.1)}
              className="w-[280px] sm:w-[320px] shrink-0 aspect-[9/16] rounded-3xl overflow-hidden relative group cursor-pointer border border-slate-200 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 snap-start bg-black"
            >
              {playingId === video.id ? (
                <iframe
                  src={`${video.videoUrl}?autoplay=1`}
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen
                  allow="autoplay; encrypted-media; fullscreen"
                  title={video.title}
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300" />
                  <div onClick={() => setPlayingId(video.id)} className="absolute inset-x-0 top-[70%] -translate-y-1/2 flex items-center justify-center">
                    <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 shadow-xl flex items-center justify-center text-[#111111] group-hover:bg-[#FF6A2B] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1" fill="currentColor" />
                    </span>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
