import React from 'react';
import { Sparkles, Wrench } from 'lucide-react';
import { Reveal } from './Reveal';

import heygenLogo from '../assets/tools/heygen.png';
import elevenlabsLogo from '../assets/tools/elevenlabs.svg';
import openaiLogo from '../assets/tools/openai.png';
import anthropicLogo from '../assets/tools/anthropic.svg';
import midjourneyLogo from '../assets/tools/midjourney.png';
import gammaLogo from '../assets/tools/gamma.png';
import capcutLogo from '../assets/tools/capcut.png';
import figmaLogo from '../assets/tools/figma.svg';
import notionLogo from '../assets/tools/notion.svg';
import zapierLogo from '../assets/tools/zapier.svg';
import canvaLogo from '../assets/tools/canva.png';
import metaLogo from '../assets/tools/meta.svg';
import googleadsLogo from '../assets/tools/googleads.svg';
import semrushLogo from '../assets/tools/semrush.svg';
import ahrefsLogo from '../assets/tools/ahrefs.png';
import surferLogo from '../assets/tools/surfer.png';
import googleanalyticsLogo from '../assets/tools/googleanalytics.svg';
import hubspotLogo from '../assets/tools/hubspot.svg';
import mailchimpLogo from '../assets/tools/mailchimp.svg';
import shopifyLogo from '../assets/tools/shopify.svg';
import davinciresolveLogo from '../assets/tools/davinciresolve.svg';
import amazonSellerLogo from '../assets/careers/amazon.png';

interface ToolItem {
  name: string;
  image?: string;
  isAi?: boolean;
  category: 'ai' | 'marketing' | 'analytics' | 'ecom' | 'creation';
  fallbackText?: string;
  fallbackBg?: string;
}

const ROW_1: ToolItem[] = [
  { name: 'HeyGen', image: heygenLogo, isAi: true, category: 'ai', fallbackText: 'HG', fallbackBg: 'bg-orange-600 text-white' },
  { name: 'ElevenLabs', image: elevenlabsLogo, isAi: true, category: 'ai', fallbackText: '11L', fallbackBg: 'bg-slate-900 text-white' },
  { name: 'ChatGPT 4o', image: openaiLogo, isAi: true, category: 'ai', fallbackText: 'GPT', fallbackBg: 'bg-emerald-600 text-white' },
  { name: 'Claude 3.5', image: anthropicLogo, isAi: true, category: 'ai', fallbackText: 'CL', fallbackBg: 'bg-amber-600 text-white' },
  { name: 'Midjourney v6', image: midjourneyLogo, isAi: true, category: 'ai', fallbackText: 'MJ', fallbackBg: 'bg-indigo-600 text-white' },
  { name: 'Gamma', image: gammaLogo, isAi: true, category: 'ai', fallbackText: 'GMA', fallbackBg: 'bg-purple-600 text-white' },
  { name: 'CapCut', image: capcutLogo, isAi: true, category: 'creation', fallbackText: 'CC', fallbackBg: 'bg-slate-900 text-white' },
  { name: 'Figma AI', image: figmaLogo, isAi: true, category: 'creation', fallbackText: 'FIG', fallbackBg: 'bg-rose-600 text-white' },
  { name: 'Notion AI', image: notionLogo, isAi: true, category: 'ai', fallbackText: 'NTN', fallbackBg: 'bg-stone-800 text-white' },
  { name: 'Zapier', image: zapierLogo, isAi: false, category: 'analytics', fallbackText: 'ZAP', fallbackBg: 'bg-orange-500 text-white' },
  { name: 'Canva Pro', image: canvaLogo, isAi: true, category: 'creation', fallbackText: 'CNV', fallbackBg: 'bg-cyan-600 text-white' },
  { name: 'Meta Business', image: metaLogo, isAi: false, category: 'marketing', fallbackText: 'META', fallbackBg: 'bg-blue-600 text-white' },
];

const ROW_2: ToolItem[] = [
  { name: 'Meta Ads', image: metaLogo, isAi: false, category: 'marketing', fallbackText: 'ADS', fallbackBg: 'bg-blue-600 text-white' },
  { name: 'Google Ads', image: googleadsLogo, isAi: false, category: 'marketing', fallbackText: 'GADS', fallbackBg: 'bg-amber-500 text-white' },
  { name: 'Semrush', image: semrushLogo, isAi: false, category: 'marketing', fallbackText: 'SMR', fallbackBg: 'bg-orange-600 text-white' },
  { name: 'Ahrefs', image: ahrefsLogo, isAi: false, category: 'marketing', fallbackText: 'AH', fallbackBg: 'bg-blue-700 text-white' },
  { name: 'SurferSEO', image: surferLogo, isAi: false, category: 'marketing', fallbackText: 'SURF', fallbackBg: 'bg-indigo-600 text-white' },
  { name: 'Looker Studio', image: googleanalyticsLogo, isAi: false, category: 'analytics', fallbackText: 'LKR', fallbackBg: 'bg-amber-600 text-white' },
  { name: 'HubSpot', image: hubspotLogo, isAi: false, category: 'marketing', fallbackText: 'HUB', fallbackBg: 'bg-orange-500 text-white' },
  { name: 'Mailchimp', image: mailchimpLogo, isAi: false, category: 'marketing', fallbackText: 'MC', fallbackBg: 'bg-amber-400 text-slate-900' },
  { name: 'Shopify', image: shopifyLogo, isAi: false, category: 'ecom', fallbackText: 'SHO', fallbackBg: 'bg-emerald-600 text-white' },
  { name: 'Amazon Seller', image: amazonSellerLogo, isAi: false, category: 'ecom', fallbackText: 'AMZ', fallbackBg: 'bg-slate-900 text-amber-400' },
  { name: 'DaVinci Resolve', image: davinciresolveLogo, isAi: false, category: 'creation', fallbackText: 'DVR', fallbackBg: 'bg-rose-700 text-white' },
];

const ToolCard: React.FC<{ tool: ToolItem }> = ({ tool }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="card-premium group relative shrink-0 w-[160px] sm:w-[180px] bg-[#F4F5F7] hover:bg-white border border-slate-200 hover:border-[#F15A29]/50 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[110px] sm:min-h-[120px] cursor-pointer">
      {/* AI Badge */}
      {tool.isAi && (
        <div className="absolute top-2 right-2 bg-[#0F172A] text-white text-[9px] font-sora font-extrabold px-1.5 py-0.5 rounded-md tracking-wider flex items-center gap-0.5 shadow-xs z-10">
          <Sparkles className="w-2.5 h-2.5 text-amber-300 fill-amber-300" />
          <span>AI</span>
        </div>
      )}

      {/* Tool Image or Custom Fallback Avatar */}
      <div className="icon-badge-float w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110">
        {tool.image && !imgError ? (
          <img
            src={tool.image}
            alt={tool.name}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain max-h-10 sm:max-h-12 drop-shadow-xs"
            loading="lazy"
          />
        ) : (
          <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-sora font-extrabold text-[13px] ${tool.fallbackBg || 'bg-[#F15A29] text-white'} shadow-xs`}>
            {tool.fallbackText || tool.name.slice(0, 3).toUpperCase()}
          </div>
        )}
      </div>

      {/* Tool Name */}
      <span className="font-sora text-[13px] font-[700] text-[#222222] group-hover:text-[#F15A29] text-center leading-tight line-clamp-1">
        {tool.name}
      </span>
    </div>
  );
};

export function ToolsSection() {
  return (
    <section id="tools" className="py-10 sm:py-14 bg-white relative border-t border-[#F0DFCE] overflow-hidden">
      {/* Background Radial Glow */}

      <div className="w-[85%] max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <Reveal className="text-left mb-8 w-full">
          <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] tracking-tight leading-[1.18]">
            Every Program Includes Training on <span className="text-[#F15A29] heading-accent">50+ AI, Marketing &amp; Business Tools</span>
          </h2>
        </Reveal>

        {/* Marquee Container with Gradient Fades - 2 Rows */}
        <div className="relative w-full overflow-hidden space-y-4 py-2">
          
          {/* Left / Right Fading Edge Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

          {/* Row 1 - Sliding Left */}
          <div className="flex gap-4 w-max animate-[scroll_28s_linear_infinite] hover:[animation-play-state:paused]">
            {[...ROW_1, ...ROW_1, ...ROW_1].map((tool, idx) => (
              <ToolCard key={`row1-${idx}`} tool={tool} />
            ))}
          </div>

          {/* Row 2 - Sliding Right */}
          <div className="flex gap-4 w-max animate-[scroll-reverse_32s_linear_infinite] hover:[animation-play-state:paused]">
            {[...ROW_2, ...ROW_2, ...ROW_2].map((tool, idx) => (
              <ToolCard key={`row2-${idx}`} tool={tool} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

