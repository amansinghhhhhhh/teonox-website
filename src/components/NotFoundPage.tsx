import React from 'react';
import { motion } from 'motion/react';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { SEO } from './SEO';

interface NotFoundPageProps {
  onNavigate: (href: string, label?: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <>
      <SEO
        title="Page Not Found | TEONOX"
        description="The page you're looking for doesn't exist or has been moved."
        canonical={window.location.pathname}
      />
      <div className="bg-white pt-20 sm:pt-24 pb-16 min-h-[70vh] flex items-center">
        <div className="w-[88%] max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-[120px] sm:text-[180px] font-bold leading-none tracking-tight text-[#F3EDE6] select-none">
              404
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-[#201A17] -mt-6 sm:-mt-10 mb-4">
              Page Not Found
            </h1>
            <p className="text-lg text-[#6B6560] max-w-lg mx-auto mb-10">
              The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button type="button"
              onClick={() => onNavigate('/', 'Home')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#F15A29] text-white rounded-full font-semibold text-sm hover:bg-[#d94e22] transition-colors cursor-pointer"
            >
              <Home size={18} />
              Go to Homepage
            </button>
            <button type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-[#E5DDD5] text-[#201A17] rounded-full font-semibold text-sm hover:border-[#F15A29] hover:text-[#F15A29] transition-colors cursor-pointer"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-14 pt-10 border-t border-[#F3EDE6]"
          >
            <p className="text-sm text-[#6B6560] mb-4">Quick Links</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { label: 'Programs', href: '/programs' },
                { label: 'Blog', href: '/blog' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Admissions', href: '/admissions' },
              ].map((link) => (
                <button type="button"
                  key={link.href}
                  onClick={() => onNavigate(link.href, link.label)}
                  className="px-5 py-2 rounded-full bg-[#F3EDE6] text-[#201A17] text-sm font-medium hover:bg-[#F15A29] hover:text-white transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
