import React from 'react';

// High-quality stock covers (Unsplash, auto-WebP)
const dmAiImg = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80';
const perfImg = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80';
const seoImg = 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80';
const socialImg = 'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=900&q=80';
const execBizImg = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80';

interface ProgramCardGraphicProps {
  programId: string;
  variant?: 'card' | 'hero';
  className?: string;
}

export const ProgramCardGraphic: React.FC<ProgramCardGraphicProps> = ({
  programId,
  className = '',
}) => {
  // Get default image for program
  const getDefaultImage = (id: string) => {
    switch (id) {
      case 'digital-marketing-ai':
      case 'business-digital-marketing-with-ai':
        return dmAiImg;
      case 'performance-marketing':
        return perfImg;
      case 'seo-specialization':
        return seoImg;
      case 'social-media-marketing':
        return socialImg;
      case 'executive-business-growth':
        return execBizImg;
      default:
        return dmAiImg;
    }
  };

  const defaultImage = getDefaultImage(programId);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-slate-900 select-none ${className}`}>
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={defaultImage}
          alt={`${programId} program cover image`}
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== defaultImage) {
              target.src = defaultImage;
            }
          }}
          className="w-full h-full object-cover transition-transform duration-700 ease-out" loading="lazy" decoding="async" />
      </div>
    </div>
  );
};

