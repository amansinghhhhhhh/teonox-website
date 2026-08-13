import { motion } from 'motion/react';

export function CareerPathsSection() {
  const careerRoles = [
    'Digital Marketing Executive',
    'Growth Associate',
    'Performance Marketer',
    'Business Analyst',
    'Sales & Growth Associate',
    'AI Operations Associate',
    'Content Strategist',
  ];

  const industries = [
    'Startups',
    'Agencies',
    'SaaS Companies',
    'E-commerce',
    'Consulting',
    'Media & Technology',
  ];

  return (
    <section id="careers" className="py-10 sm:py-14 bg-white relative overflow-hidden border-t border-[#F0DFCE]">
      {/* Background Soft Orange Ambient Glows */}

      {/* Dotted Architectural Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#F15A29_0.75px,transparent_0.75px)] [background-size:32px_32px] opacity-[0.035] pointer-events-none -z-0" />

      <div className="w-[80%] mx-auto relative z-10">

        {/* ────────────────────────────────────────
            SECTION HEADER
            ──────────────────────────────────────── */}
        <div className="text-left max-w-3xl mb-8">
          <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] tracking-tight leading-[1.18]">
            Where You'll Go From Here
          </h2>
        </div>

        {/* ────────────────────────────────────────
            INFOGRAPHIC CAREER ECOSYSTEM
            ──────────────────────────────────────── */}
        <div className="relative mb-20">
          
          {/* Curved SVG Connector Lines Background (Desktop & Tablet) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F15A29" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#F15A29" stopOpacity="0.75" />
                </linearGradient>
                <linearGradient id="lineGradRight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F15A29" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#F15A29" stopOpacity="0.15" />
                </linearGradient>
              </defs>

              {/* Left Role Cards connecting to Center Node (500, 300) */}
              <path d="M 320 60 C 400 60, 420 300, 500 300" stroke="url(#lineGradLeft)" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M 320 140 C 410 140, 430 300, 500 300" stroke="url(#lineGradLeft)" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M 320 220 C 420 220, 440 300, 500 300" stroke="url(#lineGradLeft)" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M 320 300 L 500 300" stroke="url(#lineGradLeft)" strokeWidth="2.5" />
              <path d="M 320 380 C 420 380, 440 300, 500 300" stroke="url(#lineGradLeft)" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M 320 460 C 410 460, 430 300, 500 300" stroke="url(#lineGradLeft)" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M 320 540 C 400 540, 420 300, 500 300" stroke="url(#lineGradLeft)" strokeWidth="2" strokeDasharray="6 6" />

              {/* Center Node connecting to Right Industry Nodes (500, 300) */}
              <path d="M 500 300 C 580 300, 600 80, 680 80" stroke="url(#lineGradRight)" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M 500 300 C 580 300, 600 160, 680 160" stroke="url(#lineGradRight)" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M 500 300 C 580 300, 600 250, 680 250" stroke="url(#lineGradRight)" strokeWidth="2.5" />
              <path d="M 500 300 C 580 300, 600 350, 680 350" stroke="url(#lineGradRight)" strokeWidth="2.5" />
              <path d="M 500 300 C 580 300, 600 440, 680 440" stroke="url(#lineGradRight)" strokeWidth="2" strokeDasharray="6 6" />
              <path d="M 500 300 C 580 300, 600 520, 680 520" stroke="url(#lineGradRight)" strokeWidth="2" strokeDasharray="6 6" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center relative z-10">
            
            {/* ────────────────────────────────────────
                LEFT SIDE - Career Roles
                ──────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4"
            >
              <div className="mb-6">
                <h3 className="font-sora text-[22px] font-[800] text-[#201A17] tracking-tight">
                  Career Roles
                </h3>
              </div>

              <div className="space-y-3">
                {careerRoles.map((role, idx) => (
                  <motion.div
                    key={role}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.07 }}
                    className="group relative px-5 py-3.5 rounded-[20px] bg-white/90 backdrop-blur-xl border border-[#F2E6DC] hover:border-[#F15A29] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_28px_rgba(241,90,41,0.14)] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-sora text-[15px] sm:text-[16px] font-[600] text-[#201A17] group-hover:text-[#F15A29] transition-colors">
                        {role}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#F15A29]/30 group-hover:bg-[#F15A29] group-hover:scale-125 transition-all" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ────────────────────────────────────────
                CENTER ELEMENT - Large Circular Glass Node
                ──────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:col-span-4 flex items-center justify-center my-8 lg:my-0"
            >
              <div className="relative group">
                {/* Glowing Background Rings */}
                <div className="absolute -inset-4 rounded-full border border-[#F15A29]/20 animate-spin-slow pointer-events-none" />

                {/* Central Glassmorphism Sphere */}
                <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-full bg-white/80 backdrop-blur-2xl border-2 border-[#F8E3D8] group-hover:border-[#F15A29] shadow-[0_20px_50px_rgba(241,90,41,0.2)] flex items-center justify-center text-center p-6 transition-all duration-500">
                  <div className="flex flex-col items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-[#F15A29] animate-ping mb-4" />
                    <h4 className="font-sora text-[26px] sm:text-[32px] font-[800] text-[#201A17] tracking-tight leading-tight">
                      Business Ready
                    </h4>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ────────────────────────────────────────
                RIGHT SIDE - Industries
                ──────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4"
            >
              <div className="mb-6 text-left">
                <h3 className="font-sora text-[22px] font-[800] text-[#201A17] tracking-tight">
                  Industries
                </h3>
              </div>

              <div className="space-y-3">
                {industries.map((ind, idx) => (
                  <motion.div
                    key={ind}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group relative px-6 py-4 rounded-full bg-white/90 backdrop-blur-xl border border-[#F2E6DC] hover:border-[#F15A29] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_28px_rgba(241,90,41,0.14)] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-between gap-3"
                  >
                    <span className="font-sora text-[15px] sm:text-[16px] font-[700] text-[#201A17] group-hover:text-[#F15A29] transition-colors">
                      {ind}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#F15A29]/30 group-hover:bg-[#F15A29] group-hover:scale-125 transition-all" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* ────────────────────────────────────────
            BOTTOM CENTER - Floating Glass Banner
            ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[28px] bg-gradient-to-r from-[#FFF2EB] via-white to-[#FFF6F0] border border-[#F3E6DC] p-8 sm:p-12 text-center shadow-[0_16px_40px_rgba(241,90,41,0.08)] backdrop-blur-xl overflow-hidden max-w-4xl mx-auto"
        >
          {/* Ambient Glow Accents */}

          <div className="relative z-10">
            <p className="font-sora text-[22px] sm:text-[30px] font-[700] text-[#665A4E] mb-2 leading-snug">
              You don't just become job-ready.
            </p>
            <p className="font-sora text-[26px] sm:text-[36px] font-[800] text-[#201A17] leading-snug">
              You become{' '}
              <span className="text-[#F15A29] relative">
                business-ready.
                <svg className="absolute -bottom-1 left-0 w-full h-2.5 text-[#F15A29]/30" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,15 C30,5 70,20 100,8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
