import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Reveal } from './Reveal';
import { FAQ_DATA } from '../data/faqData';

export { FAQ_DATA };

export function HomepageFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-10 sm:py-14 bg-[#FAF8F5] text-[#111111] relative overflow-hidden border-b border-[#EFEBE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="mb-8 sm:mb-10 text-left">
          <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] leading-[1.18] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="font-inter text-[15px] sm:text-[16px] text-[#665A4E] leading-relaxed mt-3">
            Choosing the right digital marketing course near me can be challenging, especially with so many options available. Our Frequently Asked Questions section answers common queries about course eligibility, curriculum, certifications, placements, fees, batch timings, online and classroom training, and career opportunities. Whether you're looking for an AI course with placement in Pune, searching for the best course after graduation in Pune, or planning to upskill in AI and automation in Pune, our FAQs provide useful information to help you choose the right career-focused programme. You can also explore options for corporate AI automation training in Pune and discover how Teonox is building a Gen AI School of Marketing in Pune with practical, industry-relevant learning.
          </p>
        </Reveal>

        <div className="space-y-3">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-[20px] border border-[#ECECEC] bg-white overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left cursor-pointer"
                >
                  <span className="font-sora text-[15px] sm:text-[16px] font-[700] text-[#111111] leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#FF6A2B] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                    <p className="font-inter text-[14.5px] sm:text-[15px] text-[#555555] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}