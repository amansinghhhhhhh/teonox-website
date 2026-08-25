import React, { useState, useEffect, useRef } from 'react';
import { Camera, Trash2, Upload } from 'lucide-react';

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
  const [customImage, setCustomImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get default image for program
  const getDefaultImage = (id: string) => {
    switch (id) {
      case 'digital-marketing-ai':
      case 'business-digital-marketing-ai':
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

  // Load image from localStorage
  const loadStoredImage = () => {
    try {
      const saved = localStorage.getItem(`teonox_program_img_${programId}`);
      if (saved) {
        setCustomImage(saved);
      } else {
        setCustomImage(null);
      }
    } catch {
      setCustomImage(null);
    }
  };

  useEffect(() => {
    loadStoredImage();

    const handleUpdate = () => {
      loadStoredImage();
    };

    window.addEventListener('teonox_program_images_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('teonox_program_images_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [programId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert("Please upload an image smaller than 8MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        try {
          localStorage.setItem(`teonox_program_img_${programId}`, result);
          setCustomImage(result);
          window.dispatchEvent(new Event('teonox_program_images_updated'));
        } catch {
          alert("Image is too large for local storage. Try a compressed image.");
        }
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      localStorage.removeItem(`teonox_program_img_${programId}`);
      setCustomImage(null);
      window.dispatchEvent(new Event('teonox_program_images_updated'));
    } catch {
      // ignore
    }
  };

  const triggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const activeImage = customImage || defaultImage;

  return (
    <div className={`relative w-full h-full overflow-hidden bg-slate-900 select-none ${className}`}>
      <div className="relative w-full h-full flex items-center justify-center">
        <img 
          src={activeImage} 
          alt="Program Cover" 
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

