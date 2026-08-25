import { useState } from 'react';

const defaultProgramImg = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80';

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
