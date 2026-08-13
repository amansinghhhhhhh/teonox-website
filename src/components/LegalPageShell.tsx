import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Globe, ArrowRight, Check, ShieldCheck } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as any },
});

export interface LegalTocItem {
  id: string;
  title: string;
}

interface LegalShellProps {
  icon?: React.ElementType;
  label: string;
  title: string;
  subtitle: React.ReactNode;
  effectiveDate: string;
  appliesTo: string;
  toc: LegalTocItem[];
  onNavigate?: (href: string, label: string) => void;
  children: React.ReactNode;
}

interface LegalSectionProps {
  id?: string;
  number?: number;
  title: string;
  children: React.ReactNode;
}

export function LegalSection({ id, number, title, children }: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="flex items-start gap-4 sm:gap-5">
        {number !== undefined && (
          <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-2xl bg-[#FFF0EB] border border-[#F8E3D8] text-[#F15A29] font-sora text-[15px] font-[800]">
            {number}
          </div>
        )}
        <div className="flex-1">
          <h2 className="font-sora text-[22px] sm:text-[26px] font-[800] text-[#111111] tracking-tight leading-[1.2] mb-4">
            {title}
          </h2>
          <div className="space-y-4 font-inter text-[15px] sm:text-[16px] leading-[1.8] text-[#555555]">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LegalBullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="flex items-center justify-center w-5 h-5 shrink-0 rounded-full bg-[#FFF0EB] text-[#F15A29] mt-0.5">
            <Check className="w-3 h-3" strokeWidth={3} />
          </span>
          <span className="leading-[1.75]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LegalShell({
  icon: Icon = ShieldCheck,
  label,
  title,
  subtitle,
  effectiveDate,
  appliesTo,
  toc,
  onNavigate,
  children,
}: LegalShellProps) {
  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-white text-[#111111] min-h-screen pt-20 sm:pt-24 pb-20 font-['Sora',sans-serif] relative">
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#FFF8F5] via-white to-white border-b border-[#F0DFCE]/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#F15A29_0.7px,transparent_0.7px)] [background-size:28px_28px] opacity-[0.03] pointer-events-none" />
        <div className="w-[88%] max-w-7xl mx-auto relative z-10">
          <motion.div {...fadeUp(0.05)} className="flex flex-col items-start gap-5">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0EB] border border-[#F8E3D8] text-[#F15A29] font-mono text-[12px] font-[700] uppercase tracking-[0.1em]">
              <Icon className="w-4 h-4" />
              {label}
            </span>
            <h1 className="font-sora text-[32px] sm:text-[44px] md:text-[52px] font-[900] text-[#111111] tracking-tight leading-[1.12] max-w-3xl">
              {title}
            </h1>
            <div className="space-y-3 font-inter text-[15.5px] sm:text-[17px] leading-[1.75] text-[#555555]">
              {subtitle}
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#EFEBE4] text-[#111111] text-[13px] font-semibold shadow-sm">
                <Calendar className="w-4 h-4 text-[#F15A29]" />
                Effective Date:
                <span className="text-[#F15A29]">{effectiveDate}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#EFEBE4] text-[#111111] text-[13px] font-semibold shadow-sm">
                <Globe className="w-4 h-4 text-[#F15A29]" />
                Applies to:
                <span className="text-[#F15A29]">{appliesTo}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TOC + CONTENT ────────────────────────────── */}
      <section className="py-12 sm:py-16">
        <div className="w-[88%] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 items-start gap-10 lg:gap-14">
          {/* Sticky Table of Contents */}
          <aside className="md:col-span-4">
            <motion.div
              {...fadeUp(0.1)}
              className="md:sticky md:top-28 bg-white border border-[#EFEBE4] rounded-3xl p-6 sm:p-7 shadow-lg shadow-[#201A17]/5"
            >
              <p className="font-mono text-[12px] font-[700] uppercase tracking-[0.1em] text-[#9E9082] mb-5">
                On This Page
              </p>
              <nav className="space-y-1">
                {toc.map((item, i) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={scrollToSection(item.id)}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14.5px] font-medium text-[#555555] hover:text-[#111111] hover:bg-[#FFF6EE] transition-colors"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#FFF0EB] text-[#F15A29] text-[12px] font-bold shrink-0 group-hover:bg-[#F15A29] group-hover:text-white transition-colors">
                      {i + 1}
                    </span>
                    <span className="leading-snug">{item.title}</span>
                  </a>
                ))}
              </nav>
            </motion.div>
          </aside>

          {/* Sections */}
          <div className="md:col-span-8 space-y-12 sm:space-y-14">{children}</div>
        </div>
      </section>

      {/* ── CONSENT CTA ──────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#FAF8F5] border-t border-[#F0DFCE]/60">
        <div className="w-[88%] max-w-7xl mx-auto">
          <motion.div
            {...fadeUp(0.1)}
            className="bg-[#17110D] text-[#EDE4DB] rounded-[28px] p-8 sm:p-12 relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#F15A29]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl">
                <p className="font-mono text-[12px] font-[700] uppercase tracking-[0.1em] text-[#FF8A50] mb-3">
                  Consent
                </p>
                <h2 className="font-sora text-[24px] sm:text-[30px] font-[800] text-white tracking-tight mb-3">
                  By using TEONOX, you agree to the above
                </h2>
                <p className="font-inter text-[15px] leading-[1.7] text-[#B8A99A]">
                  If you have any questions about this policy or how your information is handled, our team is here to help.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <button
                  onClick={() => onNavigate?.('/contact', 'Contact')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#F15A29] hover:bg-[#D8420F] text-white font-sora font-[700] text-[14px] transition-all duration-300 shadow-md shadow-[#F15A29]/25 cursor-pointer"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate?.('/', 'Home')}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-sora font-[600] text-[14px] transition-all duration-300 border border-white/15 cursor-pointer"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
