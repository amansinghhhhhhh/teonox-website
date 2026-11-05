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
 * Rounded card with a numbered header that toggles its body. The header stays
 * clickable when collapsed and the body height animates smoothly.
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
      className="scroll-mt-32 rounded-2xl border border-[#EFE9E3] bg-white shadow-[0_1px_3px_rgba(16,24,40,0.04)]"
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls={`section-body-${id}`}
        className="group flex w-full cursor-pointer items-center gap-4 rounded-2xl px-5 py-[18px] text-left transition-colors hover:bg-[#FDFCFA] sm:px-6"
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-mono text-[12.5px] font-bold transition-colors ${
            errorCount > 0
              ? 'bg-[#F04438] text-white'
              : 'bg-[#FFF1EB] text-[#F15A29]'
          }`}
        >
          {String(step).padStart(2, '0')}
        </span>

        <span className="min-w-0 flex-1">
          <span className="block font-sora text-[15px] font-[700] tracking-[-0.01em] text-[#111111] transition-colors group-hover:text-[#F15A29] sm:text-[16px]">
            {title}
          </span>
          {summary ? (
            <span className="mt-0.5 block truncate font-inter text-[12px] text-[#9A9490]">
              {summary}
            </span>
          ) : null}
        </span>

        {errorCount > 0 ? (
          <span className="shrink-0 rounded-full bg-[#F04438] px-2 py-0.5 font-mono text-[11px] font-bold text-white">
            {errorCount}
          </span>
        ) : null}

        <ChevronDown
          size={18}
          className={`shrink-0 text-[#9A9490] transition-transform duration-300 group-hover:text-[#F15A29] ${
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
        <div className="space-y-4 border-t border-[#F4F1ED] px-5 pt-5 pb-6 sm:px-6">
          {children}
        </div>
      </motion.div>
    </section>
  );
}
