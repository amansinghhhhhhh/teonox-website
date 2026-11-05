import React, { useId, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { EASE_OUT } from '../../utils/easing';

interface CollapsibleSectionProps {
  sectionId: string;
  step: number;
  title: string;
  /** Short summary of what's inside, shown when collapsed. */
  summary?: string;
  /** Number of failed fields in this section — drives the header badge. */
  errorCount?: number;
  defaultOpen?: boolean;
  /** Controlled open state (used to auto-expand on failed submit). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

/**
 * Rounded white card with a numbered header that toggles its body.
 * Header stays clickable when collapsed; body height animates smoothly.
 */
export function CollapsibleSection({
  sectionId,
  step,
  title,
  summary,
  errorCount = 0,
  defaultOpen = true,
  open,
  onOpenChange,
  children,
}: CollapsibleSectionProps) {
  const generatedId = useId();
  const id = sectionId || generatedId;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;

  const toggle = () => {
    const next = !isOpen;
    if (onOpenChange) onOpenChange(next);
    else setUncontrolledOpen(next);
  };

  return (
    <section
      id={`section-${id}`}
      className="rounded-2xl border border-[#F4EBE6] bg-white shadow-sm scroll-mt-32"
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={`section-body-${id}`}
        className="w-full flex items-center gap-4 px-5 sm:px-7 py-5 text-left cursor-pointer group"
      >
        <span className="shrink-0 w-9 h-9 rounded-full bg-[#F15A29]/10 text-[#F15A29] font-mono text-[13px] font-bold flex items-center justify-center">
          {String(step).padStart(2, '0')}
        </span>

        <span className="flex-1 min-w-0">
          <span className="block font-sora font-[700] text-[15px] sm:text-[17px] text-[#111111] group-hover:text-[#F15A29] transition-colors">
            {title}
          </span>
          {summary ? (
            <span className="block font-inter text-[12px] text-[#888888] mt-0.5 truncate">
              {summary}
            </span>
          ) : null}
        </span>

        {errorCount > 0 ? (
          <span className="shrink-0 font-mono text-[11px] font-bold text-white bg-[#DC2626] rounded-full px-2 py-0.5">
            {errorCount}
          </span>
        ) : null}

        <ChevronDown
          size={18}
          className={`shrink-0 text-[#888888] group-hover:text-[#F15A29] transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <motion.div
        id={`section-body-${id}`}
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        className="overflow-hidden"
      >
        <div className="px-5 sm:px-7 pb-6 pt-1">{children}</div>
      </motion.div>
    </section>
  );
}
