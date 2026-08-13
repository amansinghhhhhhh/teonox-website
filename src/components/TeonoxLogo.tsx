import teonoxLogoHeader from '../assets/images/teonox_logo_header.svg';
import teonoxLogoFooter from '../assets/images/teonox_logo_footer.svg';

interface TeonoxLogoProps {
  variant?: 'light' | 'dark' | 'header';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export function TeonoxLogo({
  variant = 'light',
  size = 'md',
  className = '',
}: TeonoxLogoProps) {
  const logoSrc = variant === 'dark' ? teonoxLogoFooter : teonoxLogoHeader;

  // Exact height scaling to maintain aspect ratio
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-14',
    lg: 'h-16 sm:h-20',
  };

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src={logoSrc}
        alt="TEONOX - Learn. Apply. Lead."
        referrerPolicy="no-referrer"
        className={`${heightClasses[size]} w-auto object-contain transition-all`}
      />
    </div>
  );
}

