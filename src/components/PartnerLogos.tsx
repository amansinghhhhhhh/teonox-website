import { Reveal } from './Reveal';

import adityaBirlaLogo from '../assets/partners/aditya-birla.webp';
import adobeLogo from '../assets/partners/adobe.webp';
import amazonLogo from '../assets/partners/amazon.webp';
import boatLogo from '../assets/partners/boat.webp';
import colgateLogo from '../assets/partners/colgate.webp';
import godrejLogo from '../assets/partners/godrej.webp';
import googleLogo from '../assets/partners/google.webp';
import groupmLogo from '../assets/partners/groupm.webp';
import iciciLogo from '../assets/partners/icici.webp';
import indeedLogo from '../assets/partners/indeed.webp';
import kinnectLogo from '../assets/partners/kinnect.webp';
import lifeboyLogo from '../assets/partners/lifeboy.webp';
import linkedinLogo from '../assets/partners/linkedin.webp';
import medianetLogo from '../assets/partners/medianet.webp';
import microsoftLogo from '../assets/partners/microsoft.webp';
import naukriLogo from '../assets/partners/naukri.webp';
import pupleLogo from '../assets/partners/puple.webp';
import samsungLogo from '../assets/partners/samsung.webp';
import schbangLogo from '../assets/partners/schbang.webp';
import uberLogo from '../assets/partners/uber.webp';
import webLogo from '../assets/partners/web.webp';

interface Partner {
  id: string;
  name: string;
  image: string;
}

export function PartnerLogos() {
  const partnersRow1: Partner[] = [
    { id: 'aditya-birla', name: 'Aditya Birla', image: adityaBirlaLogo },
    { id: 'adobe', name: 'Adobe', image: adobeLogo },
    { id: 'amazon', name: 'Amazon', image: amazonLogo },
    { id: 'boat', name: 'boAt', image: boatLogo },
    { id: 'colgate', name: 'Colgate', image: colgateLogo },
    { id: 'godrej', name: 'Godrej', image: godrejLogo },
    { id: 'google', name: 'Google', image: googleLogo },
    { id: 'groupm', name: 'GroupM', image: groupmLogo },
    { id: 'icici', name: 'ICICI', image: iciciLogo },
    { id: 'indeed', name: 'Indeed', image: indeedLogo },
    { id: 'kinnect', name: 'Kinnect', image: kinnectLogo },
  ];

  const partnersRow2: Partner[] = [
    { id: 'lifeboy', name: 'Lifebuoy', image: lifeboyLogo },
    { id: 'linkedin', name: 'LinkedIn', image: linkedinLogo },
    { id: 'medianet', name: 'Media.net', image: medianetLogo },
    { id: 'microsoft', name: 'Microsoft', image: microsoftLogo },
    { id: 'naukri', name: 'Naukri', image: naukriLogo },
    { id: 'puple', name: 'Puple', image: pupleLogo },
    { id: 'samsung', name: 'Samsung', image: samsungLogo },
    { id: 'schbang', name: 'Schbang', image: schbangLogo },
    { id: 'uber', name: 'Uber', image: uberLogo },
    { id: 'web', name: 'Web', image: webLogo },
  ];

  const doubleRow1 = [...partnersRow1, ...partnersRow1, ...partnersRow1];
  const doubleRow2 = [...partnersRow2, ...partnersRow2, ...partnersRow2];

  const renderRow = (partners: Partner[]) => (
    <>
      {partners.map((partner, idx) => (
        <div
          key={`${partner.id}-${idx}`}
          className="flex items-center justify-center min-w-[200px] sm:min-w-[230px] h-[96px] sm:h-[104px] px-5 py-2 rounded-2xl bg-white border border-[#EDE4DA] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-[#F15A29]/50 hover:shadow-[0_6px_20px_rgba(241,90,41,0.12)] hover:-translate-y-1 transition-all duration-300 group cursor-default shrink-0 select-none"
        >
          <img
            src={partner.image}
            alt={partner.name}
            loading="lazy"
            className="h-[80%] w-[90%] object-contain mx-auto shrink-0"
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
          TEONOX learners, trained in Pune, build careers across top performance agencies, global tech platforms, and high-growth consumer brands.
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