import { Reveal } from './Reveal';

import unileverLogo from '../assets/partners/unilever.svg';
import boatLogo from '../assets/partners/boat.svg';
import swiggyLogo from '../assets/partners/swiggy.svg';
import uberLogo from '../assets/partners/uber.svg';
import zomatoLogo from '../assets/partners/zomato.svg';
import ogilvyLogo from '../assets/partners/ogilvy.svg';
import starcomLogo from '../assets/partners/starcom.svg';
import godrejLogo from '../assets/partners/godrej.svg';
import groupmLogo from '../assets/partners/groupm.svg';
import blackcabLogo from '../assets/partners/blackcab.svg';
import googleLogo from '../assets/partners/google.png';
import schbangLogo from '../assets/partners/schbang.png';
import naukriLogo from '../assets/partners/naukri.png';
import wavemakerLogo from '../assets/partners/wavemaker.png';
import nykaaLogo from '../assets/partners/nykaa.png';
import dentsuLogo from '../assets/partners/dentsu.png';

interface Partner {
  id: string;
  name: string;
  image: string;
}

export function PartnerLogos() {
  const partnersRow1: Partner[] = [
    { id: 'schbang', name: 'Schbang', image: schbangLogo },
    { id: 'unilever', name: 'Unilever', image: unileverLogo },
    { id: 'wavemaker', name: 'Wavemaker', image: wavemakerLogo },
    { id: 'naukri', name: 'Naukri', image: naukriLogo },
    { id: 'starcom', name: 'Starcom', image: starcomLogo },
    { id: 'nykaa', name: 'Nykaa', image: nykaaLogo },
    { id: 'google', name: 'Google', image: googleLogo },
    { id: 'godrej', name: 'Godrej', image: godrejLogo },
  ];

  const partnersRow2: Partner[] = [
    { id: 'dentsu', name: 'Dentsu', image: dentsuLogo },
    { id: 'blackcab', name: 'Black Cab', image: blackcabLogo },
    { id: 'boat', name: 'boAt', image: boatLogo },
    { id: 'uber', name: 'Uber', image: uberLogo },
    { id: 'swiggy', name: 'Swiggy', image: swiggyLogo },
    { id: 'zomato', name: 'Zomato', image: zomatoLogo },
    { id: 'ogilvy', name: 'Ogilvy', image: ogilvyLogo },
    { id: 'groupm', name: 'GroupM', image: groupmLogo },
  ];

  const doubleRow1 = [...partnersRow1, ...partnersRow1, ...partnersRow1];
  const doubleRow2 = [...partnersRow2, ...partnersRow2, ...partnersRow2];

  const renderRow = (partners: Partner[]) => (
    <>
      {partners.map((partner, idx) => (
        <div
          key={`${partner.id}-${idx}`}
          className="flex items-center justify-center min-w-[160px] sm:min-w-[185px] h-[72px] px-7 rounded-2xl bg-white border border-[#EDE4DA] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#F15A29]/50 hover:shadow-[0_6px_20px_rgba(241,90,41,0.12)] hover:-translate-y-1 transition-all duration-300 group cursor-default shrink-0 select-none"
        >
          <img
            src={partner.image}
            alt={partner.name}
            loading="lazy"
            className="h-8 sm:h-9 w-auto object-contain shrink-0"
          />
        </div>
      ))}
    </>
  );

  return (
    <section className="py-10 sm:py-14 bg-[#FAF8F5] border-y border-[#F0DFCE] overflow-hidden relative">
      <div className="w-[80%] mx-auto mb-5 text-center sm:text-left">
        <Reveal className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] tracking-tight leading-[1.18]">
              Our Hiring Partners
            </h2>
          </div>
          <p className="font-sora text-[15px] sm:text-[17px] font-[600] text-[#555555] leading-relaxed max-w-md">
            TEONOX learners build careers across top performance agencies, global tech platforms, and high-growth consumer brands.
          </p>
        </Reveal>
      </div>

      {/* Row 1 - Marquee Left */}
      <div className="relative mb-5 flex overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max gap-4 sm:gap-6 animate-[scroll_35s_linear_infinite] hover:[animation-play-state:paused]">
          {renderRow(doubleRow1)}
        </div>
      </div>

      {/* Row 2 - Marquee Right */}
      <div className="relative flex overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max gap-4 sm:gap-6 animate-[scroll-reverse_40s_linear_infinite] hover:[animation-play-state:paused]">
          {renderRow(doubleRow2)}
        </div>
      </div>
    </section>
  );
}