import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TeonoxStorySections } from './components/TeonoxStorySections';
import { LearningMethodologySection } from './components/LearningMethodologySection';
import { ToolsSection } from './components/ToolsSection';
import { ProgramsSection } from './components/ProgramsSection';
import { LearningExperienceSection } from './components/LearningExperienceSection';
import { AboutSection } from './components/AboutSection';
import { CareerPathsSection } from './components/CareerPathsSection';
import { WorkWithUsSection } from './components/WorkWithUsSection';
import { HireFromUsSection } from './components/HireFromUsSection';
import { InsightsSection } from './components/InsightsSection';
import { ContactSection } from './components/ContactSection';
import { HomepageFAQ } from './components/HomepageFAQ';
import { Footer } from './components/Footer';
import { EnquireModal } from './components/EnquireModal';
import { BrochureModal } from './components/BrochureModal';
import { BrochureCTABanner } from './components/BrochureCTABanner';
import { TeonoxCultureSection } from './components/sections/TeonoxCultureSection';
import { LifeAtTeonoxSection } from './components/sections/LifeAtTeonoxSection';
import { CertificationsSection } from './components/CertificationsSection';
import { Program, BlogPost } from './types';
import { PROGRAMS_DATA, INSIGHTS_DATA } from './data';
import { fetchLiveBlogDetail } from './services/blogService';
import { SEO } from './components/SEO';
import { resolveStaticProgramId } from './services/programService';

const AboutUsPage = lazy(() => import('./components/AboutUsPage').then((m) => ({ default: m.AboutUsPage })));
const BlogPage = lazy(() => import('./components/BlogPage').then((m) => ({ default: m.BlogPage })));
const BlogDetailPage = lazy(() => import('./components/BlogDetailPage').then((m) => ({ default: m.BlogDetailPage })));
const ContactPage = lazy(() => import('./components/ContactPage').then((m) => ({ default: m.ContactPage })));
const ProgramsPage = lazy(() => import('./components/ProgramsPage').then((m) => ({ default: m.ProgramsPage })));
const CareerOutcomesPage = lazy(() => import('./components/CareerOutcomesPage').then((m) => ({ default: m.CareerOutcomesPage })));
const WhyTeonoxPage = lazy(() => import('./components/WhyTeonoxPage').then((m) => ({ default: m.WhyTeonoxPage })));
const AdmissionsPage = lazy(() => import('./components/AdmissionsPage').then((m) => ({ default: m.AdmissionsPage })));
const ProgramDetailPage = lazy(() => import('./components/ProgramDetailPage').then((m) => ({ default: m.ProgramDetailPage })));
const PrivacyPolicyPage = lazy(() => import('./components/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsAndConditionsPage = lazy(() => import('./components/TermsAndConditionsPage').then((m) => ({ default: m.TermsAndConditionsPage })));

export type Page = 'home' | 'about' | 'blog' | 'contact' | 'programs' | 'careers' | 'why-teonox' | 'admissions' | 'privacy-policy' | 'terms-and-conditions';

interface Route {
  page: Page;
  programId?: string;
  postId?: string;
}

// Clean URL paths for each top-level page (no hashes - SEO friendly)
const PAGE_PATHS: Record<Page, string> = {
  home: '/',
  about: '/about',
  blog: '/blog',
  contact: '/contact',
  programs: '/programs',
  careers: '/careers',
  'why-teonox': '/why-teonox',
  admissions: '/admissions',
  'privacy-policy': '/privacy-policy',
  'terms-and-conditions': '/terms-and-conditions',
};

// Parse a window.location.pathname into a Route
function parsePath(pathname: string): Route {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const segments = clean.split('/').filter(Boolean);
  if (segments.length === 0) return { page: 'home' };

  const [first, second] = segments;
  switch (first) {
    case 'about':
      return { page: 'about' };
    case 'contact':
      return { page: 'contact' };
    case 'careers':
      return { page: 'careers' };
    case 'why-teonox':
      return { page: 'why-teonox' };
    case 'admissions':
      return { page: 'admissions' };
    case 'privacy-policy':
      return { page: 'privacy-policy' };
    case 'terms-and-conditions':
      return { page: 'terms-and-conditions' };
    // /program/<slug> -> single program detail page (singular)
    case 'program':
      return { page: 'programs', programId: second };
    // /programs (plural) -> strictly the program list page
    case 'programs':
      return { page: 'programs' };
    case 'blog':
      return second ? { page: 'blog', postId: second } : { page: 'blog' };
    default:
      return { page: 'home' };
  }
}

// Split a link href like "/why-teonox" or "/#hire-from-us" into path + optional in-page anchor
function parseHref(href: string): { path: string; anchor?: string } {
  const [path, anchor] = href.split('#');
  return { path: path || '/', anchor };
}

// Normalize an internal path (ensure leading slash, no trailing slash)
function normalizePath(path: string): string {
  const trimmed = path.trim();
  const withSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return withSlash.length > 1 ? withSlash.replace(/\/+$/, '') : '/';
}

// Humanize a URL slug into a fallback title for live-only programs.
function humanizeSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

// Resolve a program route segment to a Program. Known static programs resolve
// normally; CMS slugs from live WordPress posts are mapped back to their static
// IDs so PROGRAMS_DATA and PROGRAM_DETAILS_MAP lookups succeed. Unknown slugs
// (truly live-only CMS programs) get a light stub whose id is used to fetch
// the real content from WordPress.
function resolveProgram(slug: string): Program {
  // 1. Direct static ID match (e.g. "business-digital-marketing-ai")
  const found = PROGRAMS_DATA.programs.find((p) => p.id === slug);
  if (found) return found;

  // 2. CMS slug / WP Post ID -> static ID reverse mapping
  const staticId = resolveStaticProgramId(slug);
  if (staticId) {
    const mapped = PROGRAMS_DATA.programs.find((p) => p.id === staticId);
    if (mapped) return mapped;
  }

  // 3. Unknown slug — create a stub for live CMS content
  const title = humanizeSlug(slug);
  return {
    id: slug,
    title,
    repeatedTitle: title,
    description: '',
    duration: '',
    durationLabel: 'Duration',
    eligibility: '',
    eligibilityLabel: 'Eligibility',
    mode: '',
    modeLabel: 'Mode',
    buttonText: 'View Program',
  };
}

// Resolve the full route state synchronously from the URL on first render.
// Initializing from window.location.pathname here (instead of a post-mount
// effect) prevents a flash of the Home page when hard-refreshing subpages.
function getInitialRouteState(): {
  page: Page;
  program: Program | null;
  post: BlogPost | null;
  blogLoading: boolean;
} {
  const route = parsePath(window.location.pathname);

  if (route.programId) {
    return { page: 'programs', program: resolveProgram(route.programId), post: null, blogLoading: false };
  }

  if (route.postId) {
    const cached = INSIGHTS_DATA.posts.find((p) => p.id === route.postId || p.slug === route.postId);
    if (cached) {
      return { page: 'blog', program: null, post: cached, blogLoading: false };
    }
    // Directly-linked article not in cache - show skeleton while the live API resolves it
    return { page: 'blog', program: null, post: null, blogLoading: true };
  }

  return { page: route.page, program: null, post: null, blogLoading: false };
}

// Clean skeleton shown while a lazy-loaded page chunk is still downloading
function PageSkeleton() {
  return (
    <div className="bg-white pt-20 sm:pt-24 pb-16">
      <div className="w-[88%] max-w-7xl mx-auto">
        <div className="py-12 sm:py-16">
          <div className="h-6 w-40 rounded-full bg-[#F3EDE6] mb-6 animate-pulse" />
          <div className="h-12 sm:h-16 w-3/4 max-w-2xl rounded-2xl bg-[#F3EDE6] animate-pulse mb-5" />
          <div className="h-4 w-full max-w-3xl rounded-full bg-[#F3EDE6] animate-pulse mb-3" />
          <div className="h-4 w-2/3 max-w-xl rounded-full bg-[#F3EDE6] animate-pulse" />
        </div>
        <div className="py-12 sm:py-16 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="md:col-span-4 hidden md:block space-y-4">
            <div className="h-4 w-28 rounded-full bg-[#F3EDE6] animate-pulse mb-6" />
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-10 rounded-xl bg-[#F3EDE6] animate-pulse" />
            ))}
          </div>
          <div className="md:col-span-8 space-y-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-6 w-1/2 rounded-full bg-[#F3EDE6] animate-pulse" />
                <div className="h-4 w-full rounded-full bg-[#F3EDE6] animate-pulse" />
                <div className="h-4 w-5/6 rounded-full bg-[#F3EDE6] animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const initialRoute = useRef(getInitialRouteState()).current;
  const [currentPage, setCurrentPage] = useState<Page>(initialRoute.page);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(initialRoute.program);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(initialRoute.post);
  const [selectedInterest, setSelectedInterest] = useState<string>('');
  const [isEnquireModalOpen, setIsEnquireModalOpen] = useState<boolean>(false);
  const [enquireDefaultCourse, setEnquireDefaultCourse] = useState<string>('');
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState<boolean>(false);
  const [brochureDefaultCourse, setBrochureDefaultCourse] = useState<string>('');
  const [blogLoading, setBlogLoading] = useState<boolean>(initialRoute.blogLoading);
  const requestedPostIdRef = useRef<string | null>(null);

  // Load a blog post for the detail view (from cache/fallback first, then live API)
  const loadBlogPost = useCallback(async (idOrSlug: string, knownPost?: BlogPost | null) => {
    if (knownPost) {
      setSelectedPost(knownPost);
      return;
    }
    const cached = INSIGHTS_DATA.posts.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
    if (cached) {
      setSelectedPost(cached);
      return;
    }
    requestedPostIdRef.current = idOrSlug;
    setBlogLoading(true);
    try {
      const post = await fetchLiveBlogDetail(idOrSlug);
      if (requestedPostIdRef.current === idOrSlug) {
        if (post) {
          setSelectedPost(post);
        } else {
          setCurrentPage('blog');
        }
      }
    } finally {
      if (requestedPostIdRef.current === idOrSlug) {
        setBlogLoading(false);
        requestedPostIdRef.current = null;
      }
    }
  }, []);

  // Central navigation: update React state, push a clean URL, and scroll
  const navigate = useCallback(
    (href: string, opts?: { replace?: boolean; noScroll?: boolean }) => {
      const { path, anchor } = parseHref(href);
      const route = parsePath(path);
      const url = normalizePath(path);

      // Reset detail/loading state before switching routes
      setSelectedPost(null);
      setSelectedProgram(null);
      setBlogLoading(false);
      requestedPostIdRef.current = null;
      setCurrentPage(route.page);

      if (route.programId) {
        setSelectedProgram(resolveProgram(route.programId));
      } else if (route.postId) {
        loadBlogPost(route.postId);
      }

      try {
        if (opts?.replace) {
          window.history.replaceState({ type: 'page', page: route.page }, '', url);
        } else {
          window.history.pushState({ type: 'page', page: route.page }, '', url);
        }
      } catch {
        // Ignore security errors in sandboxed iframes
      }

      if (anchor) {
        setTimeout(() => {
          try {
            const element = document.getElementById(anchor);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          } catch {
            // Fallback
          }
        }, 80);
      } else if (!opts?.noScroll) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [loadBlogPost],
  );

  // Sync component state from the current URL (initial load + back/forward)
  const syncFromUrl = useCallback(
    (opts?: { scroll?: boolean }) => {
      const route = parsePath(window.location.pathname);
      setSelectedPost(null);
      setSelectedProgram(null);
      setBlogLoading(false);
      requestedPostIdRef.current = null;
      setCurrentPage(route.page);

      if (route.programId) {
        setSelectedProgram(resolveProgram(route.programId));
      } else if (route.postId) {
        loadBlogPost(route.postId);
      }

      if (opts?.scroll !== false) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [loadBlogPost],
  );

  useEffect(() => {
    // Match the initial URL on mount
    syncFromUrl({ scroll: false });

    const handlePopState = () => {
      syncFromUrl();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [syncFromUrl]);

  const handleSelectProgram = (program: Program) => {
    navigate(`/program/${program.id}`);
  };

  const handleSelectPost = (post: BlogPost) => {
    navigate(`/blog/${post.slug || post.id}`);
  };

  const handleEnquireClick = (interestTopic: string = '') => {
    setSelectedInterest(interestTopic);
    setEnquireDefaultCourse(interestTopic);
    setIsEnquireModalOpen(true);
  };

  const handleBrochureClick = (interestTopic: string = '') => {
    setBrochureDefaultCourse(interestTopic);
    setIsBrochureModalOpen(true);
  };

  const handleNavClick = (href: string, _label: string) => {
    navigate(href);
  };

  // Active nav label used by the Header/Mobile menu highlight
  const getActiveNavLabel = (): string => {
    if (selectedPost) return 'Blog';
    if (selectedProgram) return 'Programs';
    switch (currentPage) {
      case 'why-teonox':
        return 'Why TEONOX';
      case 'careers':
        return 'Career Outcomes';
      case 'admissions':
        return 'Admissions';
      case 'programs':
        return 'Programs';
      case 'contact':
        return 'Contact';
      case 'about':
        return 'About';
      case 'blog':
        return 'Blog';
      default:
        return 'Home';
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#201A17] flex flex-col font-['Sora',sans-serif]">
      {/* Navigation */}
      <Navbar
        onEnquireClick={() => handleEnquireClick()}
        activeSection={getActiveNavLabel()}
        onNavigate={(href, label) => handleNavClick(href, label)}
      />

      {/* Main Page Layout */}
      <main className="flex-grow">
          <Suspense fallback={<PageSkeleton />}>
          {selectedProgram ? (
          /* Dedicated Course Details Page */
          <ProgramDetailPage
            program={selectedProgram}
            onBack={() => navigate('/programs')}
            onEnquire={(topic) => handleEnquireClick(topic)}
          />
        ) : selectedPost ? (
          /* Full Page Blog Detail View */
          <BlogDetailPage
            post={selectedPost}
            onBack={() => navigate('/blog')}
            onSelectPost={(post) => handleSelectPost(post)}
            onEnquireClick={(topic) => handleEnquireClick(topic)}
            onExplorePrograms={() => navigate('/programs')}
          />
        ) : blogLoading ? (
          /* Loading state while resolving a directly-linked blog article */
          <PageSkeleton />
        ) : currentPage === 'why-teonox' ? (
          /* Dedicated Why TEONOX Page */
          <WhyTeonoxPage
            onEnquireClick={(topic) => handleEnquireClick(topic || 'Why TEONOX Advisory')}
            onExplorePrograms={() => navigate('/programs')}
          />
        ) : currentPage === 'careers' ? (
          /* Dedicated Career Outcomes Page */
          <CareerOutcomesPage
            onEnquireClick={(topic) => handleEnquireClick(topic || 'Career Advisory')}
            onExplorePrograms={() => navigate('/programs')}
          />
        ) : currentPage === 'admissions' ? (
          /* Dedicated Admissions Page */
          <AdmissionsPage
            onEnquireClick={(topic) => handleEnquireClick(topic || 'Admissions Enquiry')}
            onExplorePrograms={() => navigate('/programs')}
          />
        ) : currentPage === 'programs' ? (
          /* Dedicated Programs Page */
          <ProgramsPage
            onSelectProgram={(program) => handleSelectProgram(program)}
            onEnquireProgram={(programTitle) => handleEnquireClick(programTitle)}
          />
        ) : currentPage === 'contact' ? (
          /* Dedicated Contact Page */
          <ContactPage onEnquireClick={(topic) => handleEnquireClick(topic || 'Contact Page Enquiry')} />
        ) : currentPage === 'about' ? (
          /* Dedicated About Us Brand Storytelling Page */
          <AboutUsPage onEnquireClick={(topic) => handleEnquireClick(topic || 'About TEONOX')} />
        ) : currentPage === 'privacy-policy' ? (
          /* Privacy Policy Legal Page */
          <PrivacyPolicyPage onNavigate={(href, label) => handleNavClick(href, label)} />
        ) : currentPage === 'terms-and-conditions' ? (
          /* Terms & Conditions Legal Page */
          <TermsAndConditionsPage onNavigate={(href, label) => handleNavClick(href, label)} />
        ) : currentPage === 'blog' ? (
          /* Premium Editorial Blog Page */
          <BlogPage
            onSelectPost={(post) => handleSelectPost(post)}
            onEnquireClick={(topic) => handleEnquireClick(topic || 'Blog Subscription')}
            onExplorePrograms={() => navigate('/programs')}
          />
        ) : (
          /* Home Page Layout */
          <>
            <SEO
              title="Gen AI Course in Pune with Placement | TEONOX"
              description="Gen AI Course in Pune with Assured Placement. Master Digital Marketing, AI & Automation with 12+ Year Experience Faculty. 100% Placement Assistance, Practical Training."
              canonical="/"
              jsonLd={{
                '@context': 'https://schema.org',
                '@type': 'EducationalOrganization',
                name: 'TEONOX',
                url: 'https://teonox.com',
                description: 'Gen AI School of Marketing & Business — AI-integrated digital marketing courses in Pune with assured placement.',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Pune',
                  addressRegion: 'Maharashtra',
                  addressCountry: 'IN',
                },
                sameAs: [
                  'https://www.instagram.com/teonoxofficial',
                  'https://www.facebook.com/teonoxofficial',
                  'https://www.youtube.com/@teonoxofficial',
                  'https://www.linkedin.com/company/teonox',
                ],
              }}
            />
            {/* Hero Section */}
            <Hero
              onExploreClick={() => navigate('/programs')}
              onEnquireClick={() => handleEnquireClick()}
              onBrochureClick={() => handleBrochureClick()}
            />

            {/* Premium Story Sections (What is TEONOX?, Why TEONOX?) */}
            <TeonoxStorySections onNavigate={(href, label) => handleNavClick(href, label)} />

            {/* Reworked Why TEONOX - "More Than a Course. A Community That Builds You."
                COMMENTED OUT per request. Restore by uncommenting the line below.
            {false && <WhyTeonoxSection onExplorePrograms={() => handleNavClick('/programs', 'Programs')} />} */}

            {/* Our Programs - directly after the Why TEONOX section and before Learning Methodology */}
            <ProgramsSection
              onSelectProgram={(program) => handleSelectProgram(program)}
              onEnquireProgram={(programName) => handleEnquireClick(programName)}
            />

            {/* Learning Methodology */}
            <LearningMethodologySection />

            {/* Industry Standard Tools Section */}
            <ToolsSection />

            {/* Download Brochure Conversion Banner */}
            <BrochureCTABanner onBrochureClick={() => handleBrochureClick()} />

            {/* The Learning Experience */}
            <LearningExperienceSection />

            {/* Certifications Showcase */}
            <CertificationsSection />

            {/* About TEONOX */}
            <AboutSection onConnect={() => navigate('/about')} />

            {/* Career Paths */}
            <CareerPathsSection />

            {/* Download Brochure Conversion Banner */}
            <BrochureCTABanner onBrochureClick={() => handleBrochureClick()} />

            {/* Work With Us */}
            <WorkWithUsSection
              onEnquire={(interest) => handleEnquireClick(interest)}
            />

            {/* Why Hire From TEONOX - Value Proposition */}
            <HireFromUsSection
              onEnquireHire={() => handleEnquireClick('Hire Talent from TEONOX')}
            />

            {/* TEONOX Culture — hero, pillars, feature block, industry experts */}
            <TeonoxCultureSection
              onVisitCampus={() => handleEnquireClick('Visit Campus / Campus Tour')}
            />

            {/* Life at TEONOX gallery */}
            <LifeAtTeonoxSection />

            {/* Download Brochure conversion banner (same as the one below Career Paths) */}
            <BrochureCTABanner onBrochureClick={() => handleBrochureClick()} />

            {/* Blog / Insights */}
            <InsightsSection
              onSelectPost={(post) => handleSelectPost(post)}
              onViewAll={() => navigate('/blog')}
            />
            {/* Contact CTA */}
            <ContactSection
              onExplorePrograms={() => navigate('/programs')}
              onEnquireClick={(topic) => handleEnquireClick(topic || 'Talk to TEONOX')}
            />
            {/* FAQ Section */}
            <HomepageFAQ />
          </>
        )}
        </Suspense>
      </main>

      {/* Footer */}
      <Footer
        onEnquireClick={() => handleEnquireClick()}
        onNavigate={(href, label) => handleNavClick(href, label)}
      />

      {/* Enquire Now Popup Form Modal */}
      <EnquireModal
        isOpen={isEnquireModalOpen}
        onClose={() => setIsEnquireModalOpen(false)}
        onNavigate={(href, label) => handleNavClick(href, label)}
        defaultCourse={enquireDefaultCourse}
      />

      {/* Download Brochure Popup Form Modal */}
      <BrochureModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
        defaultCourse={brochureDefaultCourse}
      />
    </div>
  );
}
