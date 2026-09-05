import { useState, useRef } from 'react';
import { Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Reveal } from '../Reveal';
import { CULTURE_GALLERY } from '../../data/cultureData';

export function LifeAtTeonoxSection() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [slide, setSlide] = useState(0);
  const carouselTouchX = useRef<number | null>(null);
  const lightboxTouchX = useRef<number | null>(null);

  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  const galleryGo = (dir: number) => {
    setGalleryIndex((i) => (i + dir + CULTURE_GALLERY.length) % CULTURE_GALLERY.length);
  };

  const slideGo = (dir: number) => {
    setSlide((i) => (i + dir + CULTURE_GALLERY.length) % CULTURE_GALLERY.length);
  };

  // Swipe support for the carousel.
  const onCarouselTouchStart = (e: React.TouchEvent) => {
    carouselTouchX.current = e.touches[0].clientX;
  };
  const onCarouselTouchEnd = (e: React.TouchEvent) => {
    if (carouselTouchX.current === null) return;
    const dx = e.changedTouches[0].clientX - carouselTouchX.current;
    if (Math.abs(dx) > 48) slideGo(dx < 0 ? 1 : -1);
    carouselTouchX.current = null;
  };

  // Swipe support for the lightbox carousel.
  const onLightboxTouchStart = (e: React.TouchEvent) => {
    lightboxTouchX.current = e.touches[0].clientX;
  };
  const onLightboxTouchEnd = (e: React.TouchEvent) => {
    if (lightboxTouchX.current === null) return;
    const dx = e.changedTouches[0].clientX - lightboxTouchX.current;
    if (Math.abs(dx) > 48) galleryGo(dx < 0 ? 1 : -1);
    lightboxTouchX.current = null;
  };

  return (
    <section
      id="life-at-teonox"
      className="relative w-full bg-[#F9F8F6] text-[#111111] py-14 sm:py-20 overflow-hidden border-t border-[#EFEBE4]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Life at TEONOX: Full-Width Photo Carousel ─── */}
        <Reveal className="mb-12 sm:mb-16">
          {/* Header row: copy left, CTA right */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-7 sm:mb-9">
            <div className="max-w-xl">
              <h3 className="font-sora text-[24px] sm:text-[32px] font-[800] leading-tight tracking-tight">
                Life at <span className="text-[#F15A29] heading-accent">TEONOX</span>
              </h3>
              <p className="font-inter text-[14.5px] sm:text-[15.5px] text-[#665A4E] mt-3 leading-relaxed">
                Campus life, team collaborations and events — in pictures.
              </p>
            </div>
            <button type="button"
              onClick={() => openGallery(0)}
              className="inline-flex items-center justify-center gap-2 bg-[#F15A29] hover:bg-[#D8481A] text-white font-sora text-[13.5px] font-[700] uppercase tracking-wider px-6 py-3 rounded-full shadow-[0_10px_25px_-8px_rgba(241,90,41,0.5)] transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            >
              <Camera className="w-4 h-4" />
              Explore Gallery
            </button>
          </div>

          {/* Full-width hero carousel — relative wrapper bounds ONLY the image,
              so the absolute counter chip + arrows anchor to the media itself.
              Dots live in their own inline-flow block below, outside this context. */}
          <div
            className="relative rounded-3xl overflow-hidden"
            onTouchStart={onCarouselTouchStart}
            onTouchEnd={onCarouselTouchEnd}
          >
            <div className="overflow-hidden rounded-3xl shadow-[0_25px_60px_-25px_rgba(0,0,0,0.45)]">
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `translateX(-${slide * 100}%)` }}
              >
                {CULTURE_GALLERY.map((img, i) => (
                  <div
                    key={img.alt}
                    className="w-full shrink-0 aspect-[16/9] sm:aspect-[21/9] cursor-pointer group"
                    onClick={() => openGallery(i)}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>

              {/* Soft gradient edges for control legibility */}
              <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-black/35 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-black/35 to-transparent pointer-events-none" />
            </div>

            {/* Counter chip */}
            <span className="absolute top-4 right-4 font-mono text-[11px] font-[700] text-white bg-black/45 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1.5">
              {String(slide + 1).padStart(2, '0')} / {String(CULTURE_GALLERY.length).padStart(2, '0')}
            </span>

            {/* Arrows: polished backdrop-blur overlay controls */}
            <button type="button"
              onClick={() => slideGo(-1)}
              aria-label="Previous photo"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-[#F15A29] hover:border-[#F15A29] flex items-center justify-center shadow-lg transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button type="button"
              onClick={() => slideGo(1)}
              aria-label="Next photo"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white hover:bg-[#F15A29] hover:border-[#F15A29] flex items-center justify-center shadow-lg transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots — separate inline-flow block directly under the slider card */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {CULTURE_GALLERY.map((img, i) => (
              <button type="button"
                key={img.alt}
                onClick={() => setSlide(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === slide ? 'w-8 bg-[#F15A29]' : 'w-2.5 bg-[#111111]/20 hover:bg-[#111111]/40'
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>

      {/* ─── Gallery Lightbox (full-screen carousel of all images) ─── */}
      {galleryOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-sm p-4 sm:p-8 animate-fadeIn"
          onTouchStart={onLightboxTouchStart}
          onTouchEnd={onLightboxTouchEnd}
        >
          {/* Close */}
          <button type="button"
            onClick={() => setGalleryOpen(false)}
            aria-label="Close gallery"
            className="fixed top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-[#F15A29] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <span className="fixed top-6 left-1/2 -translate-x-1/2 z-20 font-mono text-[13px] font-[700] text-white/80 bg-white/10 border border-white/15 rounded-full px-4 py-1.5">
            {String(galleryIndex + 1).padStart(2, '0')} /{' '}
            {String(CULTURE_GALLERY.length).padStart(2, '0')}
          </span>

          {/* Prev / Next */}
          <button type="button"
            onClick={() => galleryGo(-1)}
            aria-label="Previous image"
            className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-[#F15A29] border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button type="button"
            onClick={() => galleryGo(1)}
            aria-label="Next image"
            className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-[#F15A29] border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Active image */}
          <div className="h-full flex flex-col items-center justify-center">
            <div className="relative w-full max-w-4xl">
              <div className="relative overflow-hidden rounded-[20px] aspect-[4/3]">
                {CULTURE_GALLERY.map((img, i) => (
                  <img
                    key={img.alt}
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      i === galleryIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-5 font-inter text-[14px] sm:text-[15px] text-white/85 text-center max-w-md leading-relaxed">
              {CULTURE_GALLERY[galleryIndex].alt}
            </p>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-5">
              {CULTURE_GALLERY.map((img, i) => (
                <button type="button"
                  key={img.alt}
                  onClick={() => setGalleryIndex(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === galleryIndex ? 'w-8 bg-[#F15A29]' : 'w-2.5 bg-white/25 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}