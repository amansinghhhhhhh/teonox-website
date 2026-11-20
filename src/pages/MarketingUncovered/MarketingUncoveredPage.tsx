import React, { useEffect, useRef } from 'react';
import { SEO } from '../../components/SEO';
import { rawHtmlBody } from './rawHtml';
import { initializeMarketingUncovered } from './marketingUncoveredScript';
import './marketing-uncovered.css';

export function MarketingUncoveredPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.remove('modal-open');

    const fontHref =
      'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap';
    let googleFonts = document.getElementById('marketing-uncovered-fonts') as HTMLLinkElement | null;
    if (!googleFonts) {
      googleFonts = document.createElement('link');
      googleFonts.rel = 'stylesheet';
      googleFonts.id = 'marketing-uncovered-fonts';
      googleFonts.href = fontHref;
      document.head.appendChild(googleFonts);
    }

    initializeMarketingUncovered();
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <>
      <SEO
        title="Marketing Uncovered: Career Discovery Workshop | Teonox"
        description="Explore the world of marketing, AI, and business in this 90-minute career discovery workshop by TEONOX."
        canonical="/marketing-uncovered"
      />
      <div
        ref={rootRef}
        className="career-unlocked-lp marketing-uncovered-lp min-h-screen bg-[#FAF6EF] text-[#1E1611] antialiased overflow-x-hidden pb-24 sm:pb-28"
        dangerouslySetInnerHTML={{ __html: rawHtmlBody }}
      />
    </>
  );
}
