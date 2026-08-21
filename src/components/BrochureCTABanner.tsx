import { Download, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

interface BrochureCTABannerProps {
  onBrochureClick: () => void;
  heading?: string;
  subcopy?: string;
  buttonLabel?: string;
  yellow?: boolean;
}

const PERKS = ['Curriculum & modules', 'Fees & duration', 'Certifications & placements'];

/**
 * Reusable "Download Brochure" conversion banner used on the homepage between
 * major content sections. Styled to match TEONOX branding (dark card, orange
 * accent glow) and fully responsive. Pass `yellow` for a high-contrast yellow
 * CTA button (as in the Culture section reference design).
 */
export function BrochureCTABanner({
  onBrochureClick,
  heading = 'Get the Full Program Brochure',
  subcopy = 'Modules, fees, eligibility and certification details — download everything you need to make an informed decision.',
  buttonLabel = 'Download Brochure',
  yellow = false,
}: BrochureCTABannerProps) {
  return (
    <section className="w-[88%] max-w-7xl mx-auto my-6 sm:my-10" aria-label="Download brochure">
      <div className="relative w-full bg-[#111111] text-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 lg:p-10 overflow-hidden shadow-2xl border border-white/10">
        {/* Ambient Orange Glow + Dot Grid */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#F15A29]/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#F15A29]/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          {/* Left copy */}
          <div className="lg:col-span-8 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-[700] uppercase tracking-[0.14em] text-[#FF8A50] bg-white/5 border border-white/10 rounded-full px-3.5 py-1.5">
              <FileText className="w-3.5 h-3.5" />
              Free Download
            </div>

            <h2 className="font-sora text-[24px] sm:text-[30px] lg:text-[34px] font-[800] leading-[1.15] tracking-tight text-white">
              {heading}
            </h2>

            <p className="font-inter text-[14.5px] sm:text-[16px] text-[#C4B8AD] leading-relaxed max-w-xl">
              {subcopy}
            </p>

            {/* Perks */}
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-2 font-inter text-[12.5px] sm:text-[13px] font-[500] text-[#E8DED4]">
                  <CheckCircle2 className="w-4 h-4 text-[#F15A29] shrink-0" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA button */}
          <div className="lg:col-span-4 flex lg:justify-end">
            <button
              onClick={onBrochureClick}
              className={`${
                yellow
                  ? 'inline-flex items-center justify-center gap-2.5 font-sora font-[700] bg-gradient-to-r from-[#FACC15] to-[#F59E0B] text-[#111111] rounded-full shadow-[0_10px_25px_-5px_rgba(250,204,21,0.5)]'
                  : 'btn-sassriver-primary'
              } w-full sm:w-auto px-7 py-4 text-[14.5px] sm:text-[15.5px] uppercase tracking-wider group cursor-pointer active:scale-95 transition-all`}
            >
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
              <span>{buttonLabel}</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}