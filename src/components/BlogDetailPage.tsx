import React, { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark, CheckCircle2, ArrowRight, Sparkles, MessageSquare, CornerUpRight } from 'lucide-react';
import { BlogPost } from '../types';
import { fetchLiveBlogDetail, fetchLiveBlogs } from '../services/blogService';
import { SEO } from './SEO';
import { BreadcrumbSchema } from './schema/BreadcrumbSchema';

interface BlogDetailPageProps {
  post: BlogPost;
  onBack: () => void;
  onSelectPost: (post: BlogPost) => void;
  onEnquireClick: (topic?: string) => void;
  onExplorePrograms: () => void;
}

export function BlogDetailPage({
  post: initialPost,
  onBack,
  onSelectPost,
  onEnquireClick,
  onExplorePrograms,
}: BlogDetailPageProps) {
  const [post, setPost] = useState<BlogPost>(initialPost);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPost(initialPost);

    // Fetch full post details if contentHtml is missing
    if (!initialPost.contentHtml && initialPost.id) {
      fetchLiveBlogDetail(initialPost.id).then(
        (fullPost) => {
          if (fullPost) {
            setPost(fullPost);
          }
        },
        () => {},
      );
    }

    // Fetch related articles
    fetchLiveBlogs().then(
      ({ blogs }) => {
        const filtered = blogs.filter((b) => b.id !== initialPost.id).slice(0, 3);
        setRelatedPosts(filtered);
      },
      () => {},
    );
  }, [initialPost]);

  const handleCopyLink = () => {
    const url = post.link || window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#FFFFFF] text-[#201A17] min-h-screen pt-28 sm:pt-32 pb-24 font-['Sora',sans-serif]">
      <SEO
        title={post.title}
        description={post.excerpt || post.title}
        canonical={`/blog/${post.slug || post.id}`}
        ogType="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt || post.title,
          url: `https://teonox.com/blog/${post.slug || post.id}`,
          author: post.author ? { '@type': 'Person', name: post.author } : undefined,
          datePublished: post.date,
        }}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path: `/blog/${post.slug || post.id}` },
      ]} />
      <div className="border-b border-[#F0DFCE]/70 bg-[#FFF6EE]/60 backdrop-blur-md py-3.5">
        <div className="w-[85%] max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-[14px] font-[700] text-[#736657] hover:text-[#FF6A2B] transition-colors py-1 px-3 rounded-full hover:bg-white/80 border border-transparent hover:border-[#F0DFCE]"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Blogs</span>
          </button>

          <div className="flex items-center gap-2 text-[13px] font-mono text-[#A79885]">
            <span className="hidden sm:inline">TEONOX Insights</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#FF6A2B] font-semibold truncate max-w-[180px] sm:max-w-[280px]">
              {post.category || 'Blog'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="w-[85%] max-w-4xl mx-auto pt-8 sm:pt-12">
        {/* Category Pill & Date Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="font-mono text-[12px] font-[700] uppercase tracking-[0.15em] text-[#FF6A2B] px-3.5 py-1 rounded-full bg-[#FFE4CF] border border-[#FF6A2B]/20">
            {post.category || 'Career & Skills'}
          </span>
          <span className="text-[#A79885]">•</span>
          <div className="flex items-center gap-1.5 text-[13.5px] text-[#736657] font-inter">
            <Calendar className="w-4 h-4 text-[#FF6A2B]" />
            <span>{post.date}</span>
          </div>
          {post.readTime && (
            <>
              <span className="text-[#A79885]">•</span>
              <div className="flex items-center gap-1.5 text-[13.5px] text-[#736657] font-inter">
                <Clock className="w-4 h-4 text-[#FF6A2B]" />
                <span>{post.readTime}</span>
              </div>
            </>
          )}
        </div>

        {/* Article Headline */}
        <h1 className="font-sora text-[30px] sm:text-[42px] md:text-[48px] font-[800] text-[#201A17] leading-[1.18] tracking-tight mb-6">
          {post.title}
        </h1>

        {/* Author & Share Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#F0DFCE] mb-8">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#FF6A2B] text-white flex items-center justify-center font-extrabold text-base shadow-sm">
              T
            </div>
            <div>
              <p className="font-sora text-[15px] font-[700] text-[#201A17]">
                {post.author || 'By TEONOX Team'}
              </p>
              <p className="font-inter text-[12.5px] text-[#736657]">Industry Experts & Educators</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 text-[13px] font-sora font-semibold text-[#736657] hover:text-[#201A17] bg-[#FFF6EE] hover:bg-[#FFE4CF] px-3.5 py-2 rounded-full border border-[#F0DFCE] transition-all"
            >
              <Share2 className="w-4 h-4 text-[#FF6A2B]" />
              <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>
        </div>

        {/* Featured Cover Image */}
        {post.image && (
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#F0DFCE] mb-10 group">
            <img
              src={post.image}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full max-h-[520px] object-fill transition-transform duration-700 group-hover:scale-102"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80';
              }}
            />
          </div>
        )}

        {/* Main Article Content Body */}
        <div className="prose-container max-w-none">
          {post.contentHtml ? (
            <div
              className="font-inter text-[#3A312A] text-[16.5px] sm:text-[18px] leading-[1.8] space-y-6 [&_h2]:font-sora [&_h2]:text-[24px] [&_h2]:sm:text-[28px] [&_h2]:font-[800] [&_h2]:text-[#201A17] [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pt-4 [&_h2]:border-t [&_h2]:border-[#F0DFCE] [&_h3]:font-sora [&_h3]:text-[20px] [&_h3]:font-[700] [&_h3]:text-[#201A17] [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:pl-1 [&_strong]:text-[#201A17] [&_strong]:font-[700] [&_a]:text-[#FF6A2B] [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-[#FF6A2B] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:bg-[#FFF6EE] [&_blockquote]:py-2 [&_blockquote]:rounded-r"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          ) : post.content && post.content.length > 0 ? (
            <div className="font-inter text-[#3A312A] text-[16.5px] sm:text-[18px] leading-[1.8] space-y-6">
              {post.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <p className="font-inter text-[#3A312A] text-[17px] leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Inline Next Steps Banner */}
        <div className="my-14 p-8 sm:p-10 rounded-3xl bg-[#201A17] text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 space-y-4 max-w-2xl">
            <h3 className="font-sora text-[24px] sm:text-[30px] font-[800] leading-tight text-white">
              Want to master these skills in real brand environments?
            </h3>
            <p className="font-inter text-[#A79885] text-[15.5px]">
              TEONOX offers practitioner-led cohort programs in Digital Marketing, AI Automation, Analytics, and Performance Growth.
            </p>
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onEnquireClick(post.title)}
                className="px-6 py-3.5 rounded-full bg-[#FF6A2B] text-white font-sora font-[700] text-[15px] hover:bg-[#D8420F] transition-all shadow-lg shadow-[#FF6A2B]/30 flex items-center gap-2"
              >
                <span>Talk to a Counsellor</span>
                <CornerUpRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExplorePrograms}
                className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-sora font-[600] text-[15px] border border-white/15 transition-all"
              >
                Explore Cohorts
              </button>
            </div>
          </div>
        </div>

        {/* Related Articles Grid */}
        {relatedPosts.length > 0 && (
          <div className="pt-10 border-t border-[#F0DFCE]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-sora text-[22px] sm:text-[26px] font-[800] text-[#201A17]">
                More Articles You Might Like
              </h3>
              <button
                onClick={onBack}
                className="text-[#FF6A2B] font-sora font-bold text-[14px] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectPost(rel)}
                  className="group cursor-pointer bg-white rounded-2xl border border-[#F0DFCE] p-4 hover:border-[#FF6A2B] transition-all duration-300 hover:shadow-lg flex flex-col justify-between"
                >
                  <div>
                    {rel.image && (
                      <div className="aspect-video rounded-xl overflow-hidden mb-3 bg-[#FFF6EE]">
                        <img
                          src={rel.image}
                          alt={rel.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <span className="font-mono text-[11px] font-bold text-[#FF6A2B] uppercase tracking-wider block mb-1">
                      {rel.category}
                    </span>
                    <h4 className="font-sora text-[15px] font-[700] text-[#201A17] line-clamp-2 group-hover:text-[#FF6A2B] transition-colors mb-2">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="pt-3 border-t border-[#F0DFCE]/60 flex items-center justify-between text-[12.5px] text-[#A79885] font-inter">
                    <span>{rel.date}</span>
                    <span className="text-[#FF6A2B] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
