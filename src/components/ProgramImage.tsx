import { useState } from 'react';
import defaultProgramImg from '../assets/images/uploaded_digital_marketing_ai.webp';

interface ProgramImageProps {
  src?: string;
  alt: string;
  className?: string;
}

/**
 * Program card banner image with a guaranteed local placeholder. Shows the
 * bundled default banner whenever `src` is missing or fails to load (e.g. a
 * CMS image that is temporarily unreachable). `no-referrer` prevents referrer
 * based hotlink protection from blocking cross-origin CMS images.
 */
export function ProgramImage({ src, alt, className }: ProgramImageProps) {
  const [failed, setFailed] = useState(false);
  const activeSrc = src && !failed ? src : defaultProgramImg;
  return (
    <img
      src={activeSrc}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
