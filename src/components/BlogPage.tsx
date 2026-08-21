import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ArrowRight, CheckCircle2, Globe, Loader2 } from 'lucide-react';
import { BlogPost } from '../types';
import { fetchLiveBlogs, fetchLiveCategories } from '../services/blogService';
import { submitForm } from '../services/formService';
import heroImage from '../assets/images/regenerated_image_1785412705719.avif';

interface BlogPageProps {
  onSelectPost: (post: BlogPost) => void;
  onEnquireClick?: (topic?: string) => void;
  onExplorePrograms?: () => void;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as any },
});

// Category filter definitions
const CATEGORIES = [
  'All',
  'Marketing',
  'AI',
  'Business',
  'Career',
  'Digital Marketing',
  'SEO',
];

export function BlogPage({ onSelectPost, onExplorePrograms }: BlogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [email, setEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLiveConnection, setIsLiveConnection] = useState<boolean>(false);
  const [categoryTabs, setCategoryTabs] = useState<string[]>(['All', ...CATEGORIES]);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchLiveBlogs().then(
      ({ blogs: fetchedBlogs, isLive }) => {
        if (isMounted) {
          setBlogs(fetchedBlogs);
          setIsLiveConnection(isLive);
          setIsLoading(false);
        }
      },
      () => {
        if (isMounted) setIsLoading(false);
      },
    );

    fetchLiveCategories().then(
      ({ categories }) => {
        if (isMounted) {
          setCategoryTabs(['All', ...categories]);
          setSelectedCategory((current) =>
            current === 'All' || categories.includes(current) ? current : 'All'
          );
        }
      },
      () => {},
    );

    return () => {
      isMounted = false;
    };
  }, []);

  // Separate featured article (first post) and remaining articles
  const featuredArticle = useMemo(() => {
    return blogs.length > 0 ? blogs[0] : null;
  }, [blogs]);

  const latestArticles = useMemo(() => {
    return blogs.length > 1 ? blogs.slice(1) : blogs;
  }, [blogs]);

  // Helper to match article category against selected category
  const matchesCategory = (art: BlogPost, filter: string) => {
    if (filter === 'All') return true;
    const target = filter.toLowerCase();
    const artCat = (art.category || '').toLowerCase();
    const allCats = (art.categories || []).map((c) => c.toLowerCase()).join(' ');

    if (artCat.includes(target) || allCats.includes(target)) return true;
    if (target === 'marketing') return artCat.includes('marketing') || allCats.includes('marketing');
    if (target === 'ai') return artCat.includes('ai') || artCat.includes('artificial') || allCats.includes('ai');
    if (target === 'business') return artCat.includes('business') || allCats.includes('business');
    if (target === 'career') return artCat.includes('career') || allCats.includes('career');
    if (target === 'seo') return artCat.includes('seo') || allCats.includes('seo');
    if (target === 'digital marketing') return artCat.includes('digital') || allCats.includes('digital');

    return false;
  };

  // Filter latest articles
  const filteredLatest = useMemo(() => {
    if (selectedCategory === 'All') return latestArticles;
    return latestArticles.filter((art) => matchesCategory(art, selectedCategory));
  }, [selectedCategory, latestArticles]);

  const showFeatured = useMemo(() => {
    if (!featuredArticle) return false;
    if (selectedCategory === 'All') return true;
    return matchesCategory(featuredArticle, selectedCategory);
  }, [selectedCategory, featuredArticle]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (value && value.includes('@')) {
      // Fire-and-forget push to the Google Apps Script webhook (Sheet + email).
      submitForm('Blog Newsletter', { 'Email Address': value }).catch((err) => {
        console.warn('Newsletter subscription push failed:', err);
      });
      setIsSubscribed(true);
      setEmail('');
    }
  };

  const scrollToNewsletter = () => {
    const el = document.getElementById('newsletter-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-[#111111] pt-20 sm:pt-24 pb-0 min-h-screen overflow-x-hidden">
      
      {/* ────────────────────────────────────────
          SECTION 01 - HERO
          ──────────────────────────────────────── */}
      <section className="py-12 sm:py-16 border-b border-[#F0DFCE]/60">
        <div className="w-[85%] max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-7 space-y-6">
              <motion.h1 {...fadeUp(0.08)} className="font-sora text-[32px] sm:text-[44px] md:text-[50px] font-[800] text-[#111111] leading-[1.15] tracking-tight">
                Insights for the Future of Marketing
              </motion.h1>

              <motion.p {...fadeUp(0.15)} className="font-inter text-[16px] sm:text-[18px] text-[#555555] leading-relaxed max-w-2xl">
                Explore practical perspectives on AI, marketing, business growth, career development, and the skills shaping tomorrow's opportunities.
              </motion.p>

              {/* Primary & Secondary Buttons */}
              <motion.div {...fadeUp(0.22)} className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    if (onExplorePrograms) onExplorePrograms();
                    else {
                      const el = document.getElementById('programs');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-7 py-3.5 rounded-full bg-[#F15A29] hover:bg-[#D8420F] text-white font-sora text-[14.5px] font-[700] transition-all shadow-md shadow-[#F15A29]/20 flex items-center gap-2 active:scale-95"
                >
                  <span>Explore Programs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={scrollToNewsletter}
                  className="px-7 py-3.5 rounded-full bg-white hover:bg-[#F8F9FA] text-[#111111] border border-[#E2E8F0] hover:border-[#111111] font-sora text-[14.5px] font-[600] transition-all active:scale-95"
                >
                  Subscribe for Updates
                </button>
              </motion.div>
            </motion.div>

            {/* Right Column: Hero Showcase Image with Accents */}
            <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }} className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-[460px] rounded-3xl p-2.5 bg-gradient-to-b from-white to-[#FFF5F1] border border-[#F8E3D8] shadow-xl group">
                {/* Glow Orb Background behind image */}

                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#FFF0EB]">
                  <img
                    src={heroImage}
                    alt="TEONOX Insights & Learning"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80';
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          SECTION 02 - CATEGORY FILTER
          ──────────────────────────────────────── */}
      <section className="bg-white border-y border-[#F0DFCE]/80 py-4 shadow-xs transition-all">
        <div className="w-[85%] max-w-7xl mx-auto relative">
          
          {/* Scroll Gradient Mask Container */}
          <div className="relative group">
            <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {categoryTabs.map((cat, ci) => {
                const isActive = selectedCategory === cat;
                return (
                  <motion.button
                    key={cat}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: ci * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setSelectedCategory(cat)}
                    className={`shrink-0 px-4 sm:px-5 py-2.5 rounded-full font-sora text-[13px] font-[600] transition-all duration-250 ease-out select-none cursor-pointer flex items-center gap-2 ${
                      isActive
                        ? 'bg-[#F15A29] text-white shadow-md shadow-[#F15A29]/25 font-[700] scale-[1.02] ring-2 ring-[#F15A29]/20'
                        : 'bg-white hover:bg-[#FFF5F1] text-[#4A4A4A] border border-[#E2E8F0] hover:border-[#F15A29]/60 hover:text-[#111111] active:scale-95'
                    }`}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    )}
                    <span>{cat}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ────────────────────────────────────────
          SECTION 03 - FEATURED ARTICLE
          ──────────────────────────────────────── */}
      {isLoading ? (
        <section className="py-10 sm:py-14 border-b border-[#F0DFCE]/60">
          <div className="w-[85%] max-w-7xl mx-auto flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-[#F15A29] font-sora font-semibold">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Loading articles...</span>
            </div>
          </div>
        </section>
      ) : showFeatured && featuredArticle ? (
        <section className="py-10 sm:py-14 border-b border-[#F0DFCE]/60">
          <div className="w-[85%] max-w-7xl mx-auto">
            <motion.div
              {...fadeUp(0)}
              onClick={() => onSelectPost(featuredArticle)}
              className="card-premium group cursor-pointer bg-[#FDFBF7] border border-[#EBE2D9] rounded-3xl p-6 sm:p-8 md:p-10 hover:border-[#F15A29]/60 transition-all duration-300 hover:shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Large Cover Image on Left */}
              <div className="lg:col-span-6 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/11] w-full rounded-2xl overflow-hidden bg-[#F5EBE0] shadow-xs">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80';
                  }}
                  className="w-full h-full object-fill object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="font-mono text-[11px] font-[700] uppercase tracking-wider text-white px-3 py-1 rounded-full bg-[#111111]/85 backdrop-blur-md border border-white/20 shadow-xs">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>

              {/* Content on Right */}
              <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-4">
                <div>
                  <h2 className="font-sora text-[22px] sm:text-[28px] md:text-[32px] font-[800] text-[#111111] leading-[1.25] mb-3 group-hover:text-[#F15A29] transition-colors">
                    {featuredArticle.title}
                  </h2>

                  <p className="font-inter text-[15px] sm:text-[16px] leading-relaxed text-[#555555] mb-6 line-clamp-4">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#EBE2D9]">
                  <div className="font-inter text-[13px] text-[#777777] flex items-center gap-3">
                    <span className="font-sora font-semibold text-[#111111]">{featuredArticle.author}</span>
                    <span>•</span>
                    <span>{featuredArticle.date}</span>
                    {featuredArticle.readTime && (
                      <>
                        <span>•</span>
                        <span>{featuredArticle.readTime}</span>
                      </>
                    )}
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white border border-[#EBE2D9] group-hover:border-[#F15A29] group-hover:bg-[#F15A29] text-[#111111] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-xs">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      ) : null}

      {/* ────────────────────────────────────────
          SECTION 04 - LATEST ARTICLES
          ──────────────────────────────────────── */}
      <section className="py-10 sm:py-14 border-b border-[#F0DFCE]/60">
        <div className="w-[85%] max-w-7xl mx-auto">
          
          {/* Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
          {filteredLatest.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLatest.map((article, idx) => (
                <motion.div
                  key={article.id}
                  {...fadeUp((idx % 6) * 0.08)}
                  onClick={() => onSelectPost(article)}
                  className="card-premium group cursor-pointer bg-[#FDFBF7] border border-[#E2E8F0] rounded-[20px] p-6 hover:border-[#F15A29]/50 transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col justify-between"
                >
                  <div>
                    {/* Cover image */}
                    <div className="relative aspect-[16/10] w-full rounded-[16px] overflow-hidden mb-5 bg-[#F5EBE0] shadow-2xs">
                      <img
                        src={article.image}
                        alt={article.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80';
                        }}
                        className="w-full h-full object-fill object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="font-mono text-[10px] font-[700] uppercase tracking-wider text-white px-2.5 py-0.5 rounded-full bg-[#111111]/85 backdrop-blur-md border border-white/20 shadow-xs">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Title with move-up & orange underline hover effect */}
                    <h3 className="font-sora text-[18px] sm:text-[19px] font-[700] text-[#111111] leading-[1.35] mb-2.5 group-hover:text-[#F15A29] group-hover:-translate-y-0.5 transition-all duration-300 relative">
                      <span>{article.title}</span>
                      <span className="block h-0.5 bg-[#F15A29] w-0 group-hover:w-full transition-all duration-300 mt-1" />
                    </h3>

                    {/* Short excerpt */}
                    <p className="font-inter text-[14px] leading-relaxed text-[#555555] mb-5 line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Author & Date */}
                  <div className="pt-4 border-t border-[#EBE2D9] flex items-center justify-between font-inter text-[12px] text-[#777777]">
                    <span className="font-sora font-semibold text-[#111111]">{article.author}</span>
                    <span>{article.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#F8F9FA] rounded-[20px] border border-[#E2E8F0]">
              <p className="font-sora text-[16px] font-bold text-[#111111] mb-2">
                No articles found under "{selectedCategory}"
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-2 px-5 py-2 rounded-full bg-[#F15A29] text-white font-sora text-[13px] font-semibold"
              >
                View All Categories
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ────────────────────────────────────────
          SECTION 05 - NEWSLETTER
          ──────────────────────────────────────── */}
      <section id="newsletter-section" className="mt-12 py-16 sm:py-24 bg-gradient-to-b from-[#111111] via-[#1A1410] to-[#0E0C0A] text-white relative overflow-hidden">
        
        {/* Soft Orange Glow */}

        <div className="w-[85%] max-w-3xl mx-auto text-center relative z-10">
          
          <motion.h2 {...fadeUp(0)} className="font-sora text-[32px] sm:text-[40px] font-[800] text-white tracking-tight leading-tight mb-8">
            Subscribe for Updates
          </motion.h2>

          {!isSubscribed ? (
            <motion.form {...fadeUp(0.12)} onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1A1816] border border-white/20 focus:border-[#F15A29] text-white font-sora text-[15px] rounded-full px-5 py-3.5 outline-none transition-colors placeholder:text-[#777777]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto shrink-0 px-8 py-3.5 rounded-full bg-[#F15A29] hover:bg-[#D8420F] text-white font-sora text-[15px] font-[700] transition-all shadow-lg shadow-[#F15A29]/25 active:scale-95 hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#F15A29]/20 border border-[#F15A29]/40 text-[#FF8A50] font-sora text-[15px] font-bold"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Thank you for subscribing!</span>
            </motion.div>
          )}

        </div>
      </section>

    </div>
  );
}
