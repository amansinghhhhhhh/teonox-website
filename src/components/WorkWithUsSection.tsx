import { motion } from 'motion/react';
import { CheckCircle2, Users, Star, Lightbulb, Globe } from 'lucide-react';

interface WorkWithUsSectionProps {
  onEnquire?: (interest: string) => void;
}

export function WorkWithUsSection({ onEnquire }: WorkWithUsSectionProps) {
  const points = [
    {
      num: '01',
      icon: Globe,
      title: 'Business-first learning environment',
      desc: 'Connect with driven professionals working on real-world projects, live campaigns, and strategy.',
    },
    {
      num: '02',
      icon: Users,
      title: 'Premium learner audience',
      desc: 'Engage with ambitious candidates looking for execution-focused mentorship and career growth.',
    },
    {
      num: '03',
      icon: Star,
      title: 'Long-term collaboration mindset',
      desc: 'Build lasting partnerships with practitioners, advisors, and scaling industry organizations.',
    },
    {
      num: '04',
      icon: Lightbulb,
      title: 'Freedom to teach real-world thinking',
      desc: 'Share genuine business insights, problem-solving frameworks, and practical growth tactics.',
    },
  ];

  return (
    <section
      id="work-with-us"
      className="py-10 sm:py-14 bg-[#201A17] text-white relative overflow-hidden border-t border-white/10"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="w-[88%] max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[44px] font-[800] text-white tracking-tight leading-[1.15]">
              Work With TEONOX.
              <span className="block text-[#FF8A50] mt-1">Shape the Next Generation of Leaders.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <p className="font-sora text-[16px] font-[400] text-[#B8ADA2] leading-relaxed">
              We collaborate with industry professionals who believe education should create impact, not just certificates.
            </p>
            <button type="button"
              onClick={() => onEnquire?.('Partner as Trainer / Mentor')}
              className="group self-start inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#F15A29] hover:bg-[#D9491B] text-white font-sora text-[15px] font-[700] shadow-[0_10px_28px_rgba(241,90,41,0.3)] hover:shadow-[0_16px_36px_rgba(241,90,41,0.45)] transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Apply as Mentor</span>
              <CheckCircle2 className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <motion.div
                key={pt.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.08 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white/[0.04] border border-white/10 rounded-[24px] p-7 flex flex-col gap-5 hover:bg-white/[0.09] hover:border-[#F15A29]/50 transition-all duration-400 hover:-translate-y-2 cursor-default overflow-hidden"
              >
                {/* Icon + Number row */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#F15A29]/15 border border-[#F15A29]/25 flex items-center justify-center group-hover:bg-[#F15A29]/25 transition-colors duration-300">
                    <Icon className="w-5.5 h-5.5 text-[#FF8A50]" />
                  </div>
                  <span className="font-mono text-[12px] font-[800] text-white/30 group-hover:text-[#FF8A50] transition-colors duration-300">
                    {pt.num}
                  </span>
                </div>

                {/* Text */}
                <div className="space-y-2.5 flex-1">
                  <h3 className="font-sora text-[17px] font-[700] text-white leading-snug group-hover:text-[#FF8A50] transition-colors duration-300">
                    {pt.title}
                  </h3>
                  <p className="font-inter text-[14.5px] font-[400] text-[#9E9089] leading-relaxed group-hover:text-[#B8ADA2] transition-colors duration-300">
                    {pt.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

