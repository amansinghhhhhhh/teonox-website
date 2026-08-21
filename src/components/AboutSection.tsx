import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
const leaderImage = '/images/Amit-Teonox.webp';

interface AboutSectionProps {
  onConnect?: () => void;
}

export function AboutSection({ onConnect }: AboutSectionProps) {
  return (
    <section id="about" className="bg-white text-[#111111] py-10 sm:py-14 relative overflow-hidden font-inter border-t border-[#EFEBE4]">

      <div className="w-[85%] sm:w-[80%] max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT COLUMN (7 of 12 cols) */}
          <div className="lg:col-span-7">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] leading-[1.18] tracking-tight mb-5"
            >
              12+ Years in Industry Led Us Here.
            </motion.h2>

            {/* Body Text Stack */}
            <div className="space-y-4 font-sora text-[14px] sm:text-[15px] text-[#555555] leading-relaxed font-normal">
              
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="font-sora font-bold text-[#111111] text-[16px] sm:text-[17px]"
              >
                TEONOX wasn&apos;t created in a classroom.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                For over 12 years, A2 Digital has partnered with businesses to help them grow in an increasingly digital world. Along the way, we hired fresh graduates, trained teams, worked with ambitious professionals, and helped organizations scale.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="font-semibold text-[#111111]"
              >
                And we kept noticing the same pattern.
              </motion.p>

              {/* Orange Left Border Highlighted Block */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="border-l-4 border-[#F15A29] pl-5 py-4 my-6 space-y-2 bg-[#FFF6F2] border border-[#F8E3D8] rounded-r-2xl shadow-xs"
              >
                <p className="text-[#222222] font-semibold text-[16px] sm:text-[17.5px]">
                  Many candidates had qualifications. Few had practical business exposure.
                </p>
                <p className="text-[#222222] font-semibold text-[16px] sm:text-[17.5px]">
                  Most understood concepts. Very few understood execution.
                </p>
                <p className="text-[#F15A29] font-bold font-sora text-[17px] sm:text-[18.5px]">
                  TEONOX is our response to that challenge.
                </p>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                A learning ecosystem designed by practitioners who have spent years building businesses, solving growth problems, and developing teams.
              </motion.p>

            </div>
          </div>

          {/* RIGHT COLUMN (5 of 12 cols) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-[24px] overflow-hidden bg-white p-2 border border-[#E5E0D8] shadow-2xl group"
            >
              {/* Soft Ambient Glow behind frame */}
              
              <img
                src={leaderImage}
                alt="TEONOX Executive Leader"
                className="w-full h-[360px] sm:h-[420px] lg:h-[460px] object-cover object-top rounded-[18px] transition-transform duration-700 group-hover:scale-[1.02]"
                referrerPolicy="no-referrer" loading="lazy" decoding="async" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}






