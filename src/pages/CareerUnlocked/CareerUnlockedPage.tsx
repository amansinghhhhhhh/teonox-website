import React, { useEffect, useRef } from 'react';
import { SEO } from '../../components/SEO';
import { submitForm } from '../../services/formService';
import { initMetaPixel } from '../../utils/metaPixel';
import { redirectToThankYou } from '../../utils/thankYou';
import { rawHtmlBody } from './rawHtml';
import { initializeCareerUnlocked } from './careerUnlockedScript';
import './career-unlocked.css';

export function CareerUnlockedPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.remove('modal-open');
    initMetaPixel();

    const fontHref =
      'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap';
    let googleFonts = document.getElementById('career-unlocked-fonts') as HTMLLinkElement | null;
    if (!googleFonts) {
      googleFonts = document.createElement('link');
      googleFonts.rel = 'stylesheet';
      googleFonts.id = 'career-unlocked-fonts';
      googleFonts.href = fontHref;
      document.head.appendChild(googleFonts);
    }

    initializeCareerUnlocked(
      (formName, fields) => submitForm(formName, fields),
      (formType) => redirectToThankYou(formType),
    );
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <>
      <SEO
        title="Career Unlocked: Business, Digital Marketing & AI Workshop in Pune | Teonox"
        description="90-minute live career workshop for students, graduates, and aspiring marketers. Backed by A2 Digital, 12+ years of industry experience."
        canonical="/career-unlocked"
      />
      <div
        ref={rootRef}
        className="career-unlocked-lp min-h-screen bg-[#FAF6EF] text-[#1E1611] antialiased overflow-x-hidden pb-24 sm:pb-28"
        dangerouslySetInnerHTML={{ __html: rawHtmlBody }}
      />
    </>
  );
}
