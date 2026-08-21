import { useEffect, useState } from 'react';
import { Award, BadgeCheck } from 'lucide-react';
import { Reveal } from './Reveal';
import { TeonoxLogo } from './TeonoxLogo';
import { fetchCertificationStats } from '../services/programService';

const PARTNER_CERTS = ['Google', 'Meta', 'HubSpot', 'SEMrush', 'Google Analytics (GA4)'];

export function CertificationsSection() {
  const [stats, setStats] = useState<{ total: number; programs: number; isLive: boolean }>({
    total: 0,
    programs: 0,
    isLive: false,
  });

  useEffect(() => {
    let mounted = true;
    fetchCertificationStats().then((result) => {
      if (mounted) setStats(result);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Only render numeric figures when real CMS data is available — nothing is
  // ever hardcoded so future programs/certifications reflect automatically.
  const showStats = stats.isLive && stats.total > 0;

  return (
    <section
      id="certifications"
      className="relative w-full bg-white text-[#111111] py-14 sm:py-20 overflow-hidden border-t border-[#EFEBE4]"
    >
      {/* Dot pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(#F15A29_0.75px,transparent_0.75px)] [background-size:32px_32px] opacity-[0.035] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left: stats + copy */}
        <div className="lg:col-span-6 space-y-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-[700] uppercase tracking-[0.16em] text-[#F15A29] border border-[#F3DCC9] bg-[#FFF6EE] rounded-full px-4 py-2">
              <Award className="w-3.5 h-3.5" />
              Certifications
            </span>
          </Reveal>

          <Reveal>
            <h2 className="font-sora text-[30px] sm:text-[40px] lg:text-[46px] font-[800] leading-[1.12] tracking-tight">
              Earn Credentials That{' '}
              <span className="text-[#F15A29] heading-accent">Matter</span> on the Job
            </h2>
          </Reveal>

          <Reveal>
            {showStats ? (
              <div className="flex items-end gap-4">
                <span className="font-sora text-[clamp(64px,10vw,120px)] font-[800] leading-none text-[#111111] tracking-tight">
                  {stats.total}
                </span>
                <span className="font-inter text-[16px] sm:text-[18px] text-[#665A4E] leading-snug pb-2">
                  certifications & certificates
                  <br />
                  and growing with every new program we launch
                </span>
              </div>
            ) : (
              <p className="font-sora text-[22px] sm:text-[26px] font-[800] text-[#111111] leading-snug tracking-tight">
                Industry-recognized credentials for every program you complete.
              </p>
            )}
          </Reveal>

          <Reveal>
            <p className="font-inter text-[15.5px] sm:text-[16.5px] text-[#665A4E] leading-relaxed max-w-lg">
              Every program combines an official TEONOX certification with
              preparation support for industry-recognized platform certifications —
              so you graduate with proof, not just knowledge.
            </p>
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap items-center gap-2.5">
              {PARTNER_CERTS.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] px-3.5 py-1.5 font-inter text-[13px] font-[600] text-[#444444]"
                >
                  <BadgeCheck className="w-4 h-4 text-[#F15A29]" />
                  {name}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: certificate mockup */}
        <Reveal className="lg:col-span-6" delay={0.1}>
          <div className="relative mx-auto max-w-[560px]">
            {/* Glow */}
            <div className="absolute -inset-4 bg-[#F15A29]/10 blur-2xl rounded-[32px] pointer-events-none" />

            {/* Certificate paper */}
            <div className="relative bg-[#FFFEFC] rounded-[24px] border border-[#E5E0D8] shadow-2xl p-5 sm:p-7">
              {/* Double border frame */}
              <div className="border-2 border-[#D9A75B]/70 rounded-[16px] p-5 sm:p-7 relative overflow-hidden">
                {/* Corner ornaments */}
                <span className="absolute top-0 left-0 w-6 h-6 border-t-[3px] border-l-[3px] border-[#D9A75B] rounded-tl-[12px]" />
                <span className="absolute top-0 right-0 w-6 h-6 border-t-[3px] border-r-[3px] border-[#D9A75B] rounded-tr-[12px]" />
                <span className="absolute bottom-0 left-0 w-6 h-6 border-b-[3px] border-l-[3px] border-[#D9A75B] rounded-bl-[12px]" />
                <span className="absolute bottom-0 right-0 w-6 h-6 border-b-[3px] border-r-[3px] border-[#D9A75B] rounded-br-[12px]" />

                <div className="text-center space-y-3">
                  {/* Logo */}
                  <div className="flex justify-center mb-1">
                    <TeonoxLogo size="sm" />
                  </div>

                  <div className="h-px w-24 mx-auto bg-[#E0D5C8]" />

                  <p className="font-mono text-[10px] sm:text-[11px] font-[700] uppercase tracking-[0.24em] text-[#D9A75B]">
                    Certificate of Completion
                  </p>

                  <p className="font-inter text-[13px] sm:text-[14px] text-[#8A7C6E]">
                    This certifies that
                  </p>

                  <p className="font-sora text-[24px] sm:text-[32px] font-[800] text-[#111111] tracking-tight">
                    Student Name
                  </p>

                  <p className="font-inter text-[13px] sm:text-[14px] text-[#8A7C6E] max-w-sm mx-auto leading-relaxed">
                    has successfully completed the hands-on, project-based program
                    in <span className="font-[700] text-[#111111]">Business Digital Marketing with AI</span>{' '}
                    at TEONOX.
                  </p>

                  <p className="font-inter text-[12px] text-[#F15A29] font-[700] uppercase tracking-[0.2em]">
                    Learn. Apply. Lead.
                  </p>

                  {/* Seal + signatures */}
                  <div className="flex items-center justify-between gap-2 pt-3">
                    <div className="text-left min-w-0">
                      <p className="font-inter text-[10.5px] sm:text-[12px] text-[#111111] font-[700] leading-tight">Authorized Signatory</p>
                      <div className="h-px w-16 sm:w-28 bg-[#C9BDB2] mt-3 sm:mt-4" />
                    </div>
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#F15A29] to-[#D8481A] flex items-center justify-center shadow-lg shadow-[#F15A29]/30 shrink-0">
                      <Award className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <div className="text-right min-w-0">
                      <p className="font-inter text-[10.5px] sm:text-[12px] text-[#111111] font-[700] leading-tight">TEONOX Certification</p>
                      <div className="h-px w-16 sm:w-28 bg-[#C9BDB2] mt-3 sm:mt-4 ml-auto" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating chip */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full bg-[#111111] text-white px-4 py-2 shadow-lg">
              <BadgeCheck className="w-4 h-4 text-[#FF8A50]" />
              <span className="font-inter text-[12.5px] font-[600]">Verifiable industry credential</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}