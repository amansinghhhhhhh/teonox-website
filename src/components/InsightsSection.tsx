import { ArrowUpRight, BookOpen } from 'lucide-react';
import { INSIGHTS_DATA } from '../data';
import { BlogPost } from '../types';
import { Reveal } from './Reveal';

interface InsightsSectionProps {
  onSelectPost?: (post: BlogPost) => void;
  onViewAll?: () => void;
}

export function InsightsSection({ onSelectPost, onViewAll }: InsightsSectionProps) {
  return (
    <section id="insights" className="py-10 sm:py-14 bg-white relative border-t border-[#F0DFCE]">
      <div className="w-[80%] mx-auto">
        {/* Section Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="text-center md:text-left max-w-2xl mx-auto md:mx-0">
            <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] tracking-tight leading-[1.18] mb-3">
              {INSIGHTS_DATA.heading}
            </h2>
            <p className="font-sora text-[15px] sm:text-[17px] font-[600] text-[#555555] leading-relaxed max-w-2xl">
              {INSIGHTS_DATA.subheading}
            </p>
          </div>

          {onViewAll && (
            <button type="button"
              onClick={onViewAll}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#F15A29] hover:bg-[#D8420F] text-white font-sora text-sm sm:text-[14.5px] font-[700] transition-all duration-300 shadow-md shadow-[#F15A29]/25 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 cursor-pointer shrink-0"
            >
              <span className="whitespace-nowrap">Explore TEONOX Blog</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </button>
          )}
        </Reveal>

        {/* 3 Column Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INSIGHTS_DATA.posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.1} y={32}>
            <article
              onClick={() => onSelectPost?.(post)}
              className="card-premium bg-[#FFF6EE] border border-[#F0DFCE] rounded-[24px] overflow-hidden flex flex-col justify-between hover:border-[#FF6A2B] group cursor-pointer h-full"
            >
              <div>
                {/* Blog Image Header */}
                {post.image && (
                  <div className="w-full h-52 overflow-hidden relative bg-[#F0DFCE]/30 border-b border-[#F0DFCE]">
                    <img
                      src={post.image}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-fill object-top group-hover:scale-105 transition-transform duration-500 ease-out" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}

                <div className="p-6 sm:p-7">
                  {/* Category & Read Time */}
                  <div className="flex items-center justify-between text-[13px] font-mono font-semibold text-[#A79885] mb-3">
                    <span className="text-[#D8420F] bg-[#FFEEDD] px-3 py-1 rounded-full border border-[#F0DFCE]">
                      {post.category}
                    </span>
                    {post.readTime && <span>{post.readTime}</span>}
                  </div>

                  {/* Title */}
                  <h3 className="font-sora text-[18px] sm:text-[19px] font-[700] text-[#201A17] mb-3 group-hover:text-[#D8420F] transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="font-inter text-[14px] font-[400] text-[#736657] leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-[#F0DFCE]/70 flex items-center justify-between mt-auto">
                <span className="font-inter text-[12.5px] text-[#A79885] font-medium">{post.date}</span>
                <span className="inline-flex items-center gap-1.5 font-sora text-[13.5px] font-[700] text-[#D8420F] group-hover:text-[#FF6A2B] transition-colors">
                  <span>Read Article</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
