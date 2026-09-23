import React, { useEffect } from 'react';
import { rawHtmlBody } from './rawHtml';
import '../../pages/programmes/online-programme.css';

export function OnlineProgrammePage() {
  useEffect(() => {
    (window as any).toggleFaq = (button: HTMLElement) => {
      const faqItem = button.closest('.tl-landing-page-faq-item');
      if (faqItem) {
        faqItem.classList.toggle('active');
      }
    };
  }, []);

  return (
    <div className="tl-landing-page">
      <div dangerouslySetInnerHTML={{ __html: rawHtmlBody }} />
    </div>
  );
}
