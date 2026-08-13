import { LEARNING_EXPERIENCE_DATA } from '../data';
import { Reveal } from './Reveal';

// Import 3D illustration assets generated for the 6 cards
import imgLiveBrand from '../assets/images/live_brand_projects_1785232152266.webp';
import imgAiFuture from '../assets/images/ai_future_labs_1785232175318.webp';
import imgMentorship from '../assets/images/industry_mentorship_1785232187438.webp';
import imgSimulations from '../assets/images/business_simulations_1785232203137.webp';
import imgAgency from '../assets/images/agency_exposure_1785232217114.webp';
import imgPortfolio from '../assets/images/portfolio_career_1785232229411.webp';

export function LearningExperienceSection() {
  const cardIllustrations = [
    imgLiveBrand,
    imgAiFuture,
    imgMentorship,
    imgSimulations,
    imgAgency,
    imgPortfolio
  ];

  return (
    <section className="py-10 sm:py-14 bg-[#201A17] text-white relative border-y border-white/10">
      <div className="w-[80%] mx-auto">
        {/* Section Header */}
        <Reveal className="text-left mb-8">
          <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-white tracking-tight leading-[1.18] mb-3">
            {LEARNING_EXPERIENCE_DATA.heading}
          </h2>
          <p className="font-sora text-[15px] sm:text-[17px] font-[500] text-[#B8ADA2] leading-relaxed max-w-2xl">
            {LEARNING_EXPERIENCE_DATA.subheading}
          </p>
        </Reveal>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {LEARNING_EXPERIENCE_DATA.cards.map((card, idx) => {
            const illustration = cardIllustrations[idx % cardIllustrations.length];

            return (
              <Reveal key={card.title} delay={(idx % 3) * 0.1} y={32}>
              <div
                className="card-premium bg-white border border-[#E8E4DF] rounded-[18px] p-7 sm:p-8 relative overflow-hidden min-h-[220px] sm:min-h-[240px] flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-[#F15A29] group cursor-pointer h-full"
              >
                {/* Content Left Aligned */}
                <div className="pr-12 sm:pr-16 z-10 relative">
                  <h4 className="font-sora text-[21px] font-[700] text-[#111111] mb-2.5 leading-snug tracking-tight">
                    {card.title}
                  </h4>
                  <p className="font-inter text-[16px] font-[400] text-[#555555] leading-relaxed max-w-[85%] sm:max-w-[78%]">
                    {card.description}
                  </p>
                </div>

                {/* Small Premium 3D Illustration in Bottom-Right Corner */}
                <div className="absolute -bottom-2 -right-2 w-28 h-28 sm:w-32 sm:h-32 pointer-events-none z-0 overflow-hidden rounded-br-[18px]">
                  <img
                    src={illustration}
                    alt={card.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-300 rounded-tl-2xl opacity-95" loading="lazy" decoding="async" />
                </div>
              </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
