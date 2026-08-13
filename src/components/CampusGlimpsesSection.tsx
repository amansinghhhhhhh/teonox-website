import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

// Real photo assets for TEONOX campus & center glimpses
import mentorImg from '../assets/images/teonox_mentor_teaching_1785245942577.webp';

interface CampusImage {
  id: number;
  title: string;
  category: string;
  src: string;
  aspectRatio: string; // Tailwind class
  sizeSpan: string; // Grid col/row span
}

const CAMPUS_IMAGES: CampusImage[] = [
  {
    id: 1,
    title: 'Modern Interactive Classroom',
    category: 'Classrooms',
    src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: 'aspect-[4/3]',
    sizeSpan: 'col-span-12 md:col-span-4',
  },
  {
    id: 2,
    title: 'Practical Workstations & AI Lab',
    category: 'Computer Lab',
    src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=900&q=80',
    aspectRatio: 'aspect-[4/3]',
    sizeSpan: 'col-span-12 md:col-span-4',
  },
  {
    id: 3,
    title: 'Faculty Mentorship & Strategy',
    category: 'Faculty Interaction',
    src: mentorImg,
    aspectRatio: 'aspect-[4/3]',
    sizeSpan: 'col-span-12 md:col-span-4',
  },
];

export function CampusGlimpsesSection() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Classrooms', 'Computer Lab', 'Faculty Interaction'];

  const filteredImages = activeCategory === 'All' 
    ? CAMPUS_IMAGES 
    : CAMPUS_IMAGES.filter(img => img.category === activeCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === 0 ? filteredImages.length - 1 : selectedImageIndex - 1);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(selectedImageIndex === filteredImages.length - 1 ? 0 : selectedImageIndex + 1);
    }
  };

  return (
    <section 
      id="campus-glimpses" 
      className="relative w-full bg-[#FAF8F5] text-[#111111] py-10 sm:py-14 overflow-hidden border-b border-[#EFEBE4]"
    >
      {/* Background */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] leading-[1.18] tracking-tight">
              CAMPUS <span className="text-[#F15A29] heading-accent">GLIMPSES</span>
            </h2>
            <p className="font-sora text-[15px] sm:text-[17px] font-[600] text-[#555555] mt-2">
              A look inside our learning environment
            </p>
          </div>
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-sora text-[13px] font-[600] transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#F15A29] text-white shadow-md shadow-[#F15A29]/25 scale-105'
                    : 'bg-white text-[#555555] border border-[#EFEBE4] hover:bg-[#F2EDE6] hover:text-[#111111]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-fr gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => {
              // First image is hero (wide, spans full height), rest are smaller
              const isHero = idx === 0;
              const spanClass = isHero
                ? 'md:col-span-7 md:row-span-2'
                : 'md:col-span-5';
              const heightClass = isHero
                ? 'min-h-[340px] sm:min-h-[460px]'
                : 'min-h-[210px] sm:min-h-[220px]';

              return (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: 20 }}
                  transition={{ duration: 0.55, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className={`${spanClass} ${heightClass} group relative rounded-[24px] sm:rounded-[28px] overflow-hidden bg-white border border-[#EFEBE4] shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-1.5 hover:border-[#F15A29]/40`}
                  onClick={() => setSelectedImageIndex(idx)}
                >
                  {/* Image absolutely fills its grid cell so tiles never leave gaps */}
                  <div className="absolute inset-0">
                    <img
                      src={img.src}
                      alt={img.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700 ease-out" loading="lazy" decoding="async" />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-400" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#111111] font-sora text-[12px] font-[700] border border-white/30 shadow-sm">
                        {img.category}
                      </span>
                    </div>

                    {/* Expand Icon */}
                    <div className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                      <Maximize2 className="w-4 h-4" />
                    </div>

                    {/* Title at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                      <h3 className="font-sora text-white font-[700] text-[16px] sm:text-[18px] leading-snug drop-shadow-lg">
                        {img.title}
                      </h3>
                      {isHero && (
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#FF8A50] fill-[#FF8A50]/30" />
                          <span className="font-inter text-white/80 text-[12px]">Featured Space</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Modal on Image Click */}
      <AnimatePresence>
        {selectedImageIndex !== null && filteredImages[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedImageIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-105"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[85vh] rounded-[28px] overflow-hidden bg-[#161616] border border-white/15 shadow-2xl flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[selectedImageIndex].src}
                alt={filteredImages[selectedImageIndex].title}
                className="max-h-[70vh] w-full object-contain bg-black/50" loading="lazy" decoding="async" />

              <div className="w-full p-5 sm:p-6 bg-[#1A1A1A] border-t border-white/10 flex items-center justify-between text-white">
                <div>
                  <span className="text-[#F15A29] font-mono text-[12px] font-bold uppercase tracking-wider block mb-1">
                    {filteredImages[selectedImageIndex].category}
                  </span>
                  <h3 className="font-sora text-[18px] sm:text-[22px] font-[700]">
                    {filteredImages[selectedImageIndex].title}
                  </h3>
                </div>

                <div className="font-mono text-[13px] text-white/60 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                  {selectedImageIndex + 1} / {filteredImages.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
