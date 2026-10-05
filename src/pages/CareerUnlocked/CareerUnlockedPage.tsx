import React, { useEffect, useRef } from 'react';
import { SEO } from '../../components/SEO';
import { submitForm } from '../../services/formService';
import { redirectToThankYou } from '../../utils/thankYou';
import { rawHtmlBody } from './rawHtml';
import { initializeCareerUnlocked } from './careerUnlockedScript';
import './career-unlocked.css';

export function CareerUnlockedPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.remove('modal-open');
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
