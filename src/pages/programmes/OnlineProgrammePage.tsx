// Static online programme page - no WordPress fetch, fully self-contained
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Clock, Video, Laptop, Bot, Users, ArrowRight, Phone,
  BookOpen, Wrench, MessageSquare, RefreshCw, Trophy, Star, CheckCircle2,
  Briefcase, Mail, Calendar, Award, Search, Share2,
  Download, Target, Brain, Sparkles, ChevronLeft, ChevronRight,
  Play, Pause, Volume2, VolumeX, Flag, Rocket,
} from 'lucide-react';
import { submitForm } from '../../services/formService';
import { SEO } from '../../components/SEO';
import { BreadcrumbSchema } from '../../components/schema/BreadcrumbSchema';
import '../../pages/programmes/online-programme.css';

interface OnlineProgrammePageProps {
  onBack?: () => void;
  onEnquireClick?: (topic?: string) => void;
  onBrochureClick?: (title: string) => void;
  onNavigate?: (href: string, label: string) => void;
}

export function OnlineProgrammePage({
  onEnquireClick,
  onBrochureClick,
  onNavigate,
}: OnlineProgrammePageProps) {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [sliderOffset, setSliderOffset] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(0);

  const trustSliderRef = useRef<HTMLDivElement>(null);
  const videoSliderRef = useRef<HTMLDivElement>(null);
  const gallerySliderRef = useRef<HTMLDivElement>(null);

  const trustSliderAutoScroll = useCallback(() => {
    const el = trustSliderRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (sliderOffset >= maxScroll) {
      setSliderOffset(0);
    } else {
      setSliderOffset(prev => prev + 1);
    }
  }, [sliderOffset]);

  useEffect(() => {
    const interval = setInterval(trustSliderAutoScroll, 30);
    return () => clearInterval(interval);
  }, [trustSliderAutoScroll]);

  const slideScroll = (sliderId: string, direction: number) => {
    const el = document.getElementById(sliderId);
    if (!el) return;
    const scrollAmount = 300 * direction;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const playReel = (card: HTMLElement) => {
    const video = card.querySelector('video');
    if (video) {
      video.play();
      setVideoPlaying(true);
    }
  };

  const togglePause = (btn: HTMLElement) => {
    const card = btn.closest('.reel-card');
    const video = card?.querySelector('video');
    if (video) {
      if (video.paused) { video.play(); } else { video.pause(); }
    }
  };

  const toggleMute = (btn: HTMLElement) => {
    const card = btn.closest('.reel-card');
    const video = card?.querySelector('video');
    if (video) {
      video.muted = !video.muted;
      setMuted(video.muted);
    }
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) return;
    setIsSubmitting(true);
    try {
      await submitForm('Online Programme Application', {
        'Full Name': fullName,
        'Email Address': email,
        'Phone Number': phone,
        'Interested In': 'Business Digital Marketing + AI (Online)',
        'source': 'Online programme',
      });
      setIsSubmitted(true);
      setTimeout(() => { setIsSubmitted(false); setShowApplyModal(false); }, 3000);
    } catch {
      console.error('[OnlineProgrammePage] Form submission failed');
    }
    setIsSubmitting(false);
  };

  return (
    <div id="online-programme-landing" className="online-programme-root">
      <SEO
        title="Business Digital Marketing + AI | 6-Month Live Program | TEONOX"
        description="TEONOX — 6-Month Business Digital Marketing + AI Programme. Live instructor-led classes, practical projects, AI-powered learning. Apply now."
        canonical="/programmes/build-digital-marketing-skills-with-ai"
        ogType="website"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'Programmes', path: '/programmes' },
        { name: 'Business Digital Marketing + AI (Online)', path: '/programmes/build-digital-marketing-skills-with-ai' },
      ]} />

      {/* Hero Section */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="dot" /> LIVE BATCH + 2-MONTH INTERNSHIP
              </div>
              <h1>Build Digital Marketing Skills. Master AI. Build Your <span>Career.</span></h1>
              <p className="hero-subtitle">TEONOX — 6-Month Business Digital Marketing + AI Programme</p>
              <div className="hero-highlights">
                <span className="hero-chip"><Clock /> 6 Months</span>
                <span className="hero-chip"><Video /> Live Classes</span>
                <span className="hero-chip"><Laptop /> Practical Projects</span>
                <span className="hero-chip"><Bot /> AI-Powered Learning</span>
                <span className="hero-chip hero-chip-urgent"><Users /> Batch Size: 30-35</span>
              </div>
              <div className="hero-ctas">
                <button type="button" className="btn btn-primary" onClick={() => setShowApplyModal(true)}>
                  <ArrowRight /> Apply Now
                </button>
                <a href="#masterclass" className="btn btn-outline"><Phone /> Book a Counselling Call</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <div className="trust-strip">
        <div className="slider-wrap">
          <div className="slider-viewport" ref={trustSliderRef} id="trustSlider">
            <div className="slider-track" style={{ transform: `translateX(-${sliderOffset}px)` }}>
              {[
                '5 Live Classes/Week', 'Recordings', 'Mentorship', 'Community', 'Certificate',
                'Practical Projects', 'AI Wrench', '5 Live Classes/Week', 'Recordings', 'Mentorship',
                'Community', 'Certificate', 'Practical Projects', 'AI Wrench',
              ].map((item, i) => (
                <div key={i} className="slider-slide">
                  <span className="trust-item">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Learning Experience */}
      <section className="learning-section section-padding" id="learning">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="section-label">LEARNING EXPERIENCE</div>
            <h2 className="section-title">How You'll <span style={{ color: 'var(--orange)' }}>Learn & Grow</span></h2>
          </div>
          <div className="learning-flow">
            {[
              { icon: BookOpen, label: 'Learn' },
              { icon: Wrench, label: 'Implement' },
              { icon: MessageSquare, label: 'Feedback' },
              { icon: RefreshCw, label: 'Improve' },
              { icon: Trophy, label: 'Present' },
            ].map((step, i) => (
              <React.Fragment key={i}>
                <div className="learning-step">
                  <div className="learning-step-icon"><step.icon /></div>
                  <span>{step.label}</span>
                </div>
                {i < 4 && <span className="learning-arrow"><ArrowRight /></span>}
              </React.Fragment>
            ))}
          </div>
          <div className="learning-features">
            {[
              { icon: Video, label: '5 Live Classes / Week' },
              { icon: Target, label: 'Practical Assignments' },
              { icon: Search, label: 'Weekly Doubt Support' },
              { icon: CheckCircle2, label: 'Project Reviews' },
              { icon: Play, label: 'Recordings' },
              { icon: Users, label: 'Student Community' },
              { icon: BarChart3, label: 'Monthly Performance Reviews' },
              { icon: Mic, label: 'Guest Industry Sessions' },
              { icon: Trophy, label: 'Final Demo Day' },
              { icon: Clock, label: 'Attendance Tracking' },
              { icon: Laptop, label: 'Tool & Software Access' },
            ].map((feature, i) => (
              <div key={i} className="learning-feature">
                <feature.icon />
                <span>{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section className="who-section section-padding" id="who">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="section-label">WHO IS THIS FOR</div>
            <h2 className="section-title">Built for People Who Want to <span style={{ color: 'var(--orange)' }}>Do</span>, Not Just Learn.</h2>
          </div>
          <div className="who-grid">
            {[
              { icon: GraduationCap, title: 'Students & Graduates', desc: 'Start your career with real skills and a portfolio that stands out.' },
              { icon: Briefcase, title: 'Working Professionals', desc: 'Upskill and transition into marketing roles with confidence.' },
              { icon: ArrowRightLeft, title: 'Career Switchers', desc: 'Move into digital marketing with structured, practical training.' },
              { icon: Laptop, title: 'Freelancers', desc: 'Build service offerings and attract better clients with proven skills.' },
              { icon: Rocket, title: 'Founders & Business Owners', desc: 'Learn to manage your own marketing and reduce dependency on agencies.' },
            ].map((card, i) => (
              <div key={i} className="who-card">
                <div className="who-card-icon"><card.icon /></div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="promise-section section-padding" id="promise">
        <div className="container">
          <div className="section-label">THE TEONOX PROMISE</div>
          <div className="promise-statement">
            By the end of 6 months, you won't just understand digital marketing. You'll have <span>proof that you can do it.</span>
          </div>
          <div className="promise-flow">
            {[
              { num: '01', title: 'Learn', desc: 'Marketing & AI' },
              { num: '02', title: 'Apply', desc: 'Practical Execution' },
              { num: '03', title: 'Lead', desc: 'Business Leadership' },
            ].map((step, i) => (
              <div key={i} className="promise-step">
                <div className="promise-step-num">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Teonox Online */}
      <section className="why-section section-padding" id="why">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="section-label">WHY TEONOX</div>
            <h2 className="section-title">Everything You Need to <span style={{ color: 'var(--orange)' }}>Learn & Grow</span></h2>
            <p className="section-subtitle">A structured programme designed for serious learners who want real outcomes.</p>
          </div>
          <div className="why-grid">
            {[
              { title: 'Live Instructor-Led Classes', desc: 'Learn directly from industry experts in real-time interactive sessions.', img: '/online-programme/images/why-teonox/Live-Instructor-Led-Classes.webp' },
              { title: '5 Classes Every Week', desc: 'Consistent learning rhythm with structured sessions throughout the week.', img: '/online-programme/images/why-teonox/5-Classes-Every-Week.webp' },
              { title: 'Real Practical Projects', desc: 'Work on live projects that build your portfolio and real-world experience.', img: '/online-programme/images/why-teonox/Real-Practical-Projects.webp' },
              { title: 'AI Wrench & Workflows', desc: 'Learn to use AI across research, strategy, content, analytics and automation.', img: '/online-programme/images/why-teonox/AI-Tools-&-Workflows.webp' },
              { title: 'Mentor & Doubt Support', desc: 'Get your questions answered with dedicated mentor support throughout.', img: '/online-programme/images/why-teonox/Mentor-&-Doubt-Support.webp' },
              { title: 'Portfolio-Based Learning', desc: 'Every module contributes to a professional portfolio you can show employers.', img: '/online-programme/images/why-teonox/Portfolio-Based-Learning.webp' },
            ].map((card, i) => (
              <div key={i} className="why-card">
                <div className="why-card-img">
                  <img src={card.img} alt={card.title} loading="lazy" decoding="async" />
                </div>
                <div className="why-card-body">
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Six-Month Curriculum */}
      <section className="curriculum-section section-padding" id="curriculum">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="section-label">SIX-MONTH LEARNING JOURNEY</div>
            <h2 className="section-title">Your Path from <span style={{ color: 'var(--orange)' }}>Fundamentals to Mastery</span></h2>
            <p className="section-subtitle">A carefully designed curriculum that takes you from foundation to career readiness.</p>
          </div>
          <div className="timeline">
            {[
              { month: 'Month 01', title: 'Foundation + AI', desc: 'Marketing fundamentals, research, positioning, funnels, AI and prompting.', tags: ['Marketing Fundamentals', 'Research', 'Positioning', 'Funnels', 'Prompt Engineering'], output: 'Output: Marketing Strategy + AI Workflow' },
              { month: 'Month 02', title: 'Website + Conversion', desc: 'WordPress, website planning, landing pages, copywriting, CTAs and CRO.', tags: ['WordPress', 'Landing Pages', 'Copywriting', 'CTAs', 'CRO'], output: 'Output: Business Website / Landing Page' },
              { month: 'Month 03', title: 'SEO + Content + Social', desc: 'Keyword research, SEO, Search Console, GA4, content and social media.', tags: ['Keyword Research', 'SEO', 'Search Console', 'GA4', 'Content', 'Social Media'], output: 'Output: SEO & Content Growth Project' },
              { month: 'Month 04', title: 'Meta Performance Marketing', desc: 'Meta Ads, audiences, creatives, lead generation, retargeting and optimisation.', tags: ['Meta Ads', 'Audiences', 'Creatives', 'Lead Generation', 'Retargeting'], output: 'Output: Meta Ads Project' },
              { month: 'Month 05', title: 'Google Ads + Analytics', desc: 'Search Ads, keywords, conversion tracking, GA4, reporting and optimisation.', tags: ['Search Ads', 'Keywords', 'Conversion Tracking', 'GA4', 'Reporting'], output: 'Output: Google Ads + Analytics Project' },
              { month: 'Month 06', title: 'Growth + Career + Business', desc: 'AI automation, capstone, portfolio, freelancing, personal branding and career roadmap.', tags: ['AI Automation', 'Capstone', 'Portfolio', 'Freelancing', 'Personal Branding'], output: 'Output: Capstone + Portfolio + Career Roadmap' },
            ].map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-month">{item.month}</div>
                  <div className="timeline-title">{item.title}</div>
                  <p className="timeline-desc">{item.desc}</p>
                  <div className="timeline-tags">
                    {item.tags.map((tag, ti) => <span key={ti} className="timeline-tag">{tag}</span>)}
                  </div>
                  <div className="timeline-output">
                    <Flag />
                    <span>{item.output}</span>
                  </div>
                </div>
                <div className="timeline-dot" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="portfolio-section section-padding" id="portfolio">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="section-label">BUILD YOUR PORTFOLIO</div>
            <h2 className="section-title">5 Projects. Real Skills. <span style={{ color: 'var(--orange)' }}>Portfolio-Ready Proof.</span></h2>
          </div>
          <div className="portfolio-grid">
            {[
              { num: '01', title: 'Website', desc: 'Business website + conversion flow', img: '/online-programme/images/gallery/portfolio-website.webp' },
              { num: '02', title: 'SEO & Content', desc: 'Keyword strategy + optimised content + reporting', img: '/online-programme/images/gallery/portfolio-seo.webp' },
              { num: '03', title: 'Meta Ads', desc: 'Campaign structure + creatives + targeting + optimisation', img: '/online-programme/images/gallery/portfolio-meta-ads.webp' },
              { num: '04', title: 'Google Ads & Analytics', desc: 'Search campaign + tracking + performance report', img: '/online-programme/images/gallery/portfolio-google-ads.webp' },
              { num: '05', title: 'Capstone Growth Project', desc: 'Complete business growth strategy using all modules + AI', img: '/online-programme/images/gallery/portfolio-capstone.webp' },
            ].map((card, i) => (
              <div key={i} className="portfolio-card">
                <div className="portfolio-card-img">
                  <img src={card.img} alt={card.title} loading="lazy" decoding="async" />
                </div>
                <div className="portfolio-card-header"><span className="portfolio-num">{card.num}</span></div>
                <div className="portfolio-card-body">
                  <h4>{card.title}</h4>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="ai-section section-padding" id="ai">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="section-label">AI-FIRST LEARNING</div>
            <h2 className="section-title" style={{ color: 'var(--white)' }}>AI Isn't a Separate Module. It's Part of <span style={{ color: 'var(--orange)' }}>How You Learn.</span></h2>
          </div>
          <div className="ai-grid">
            {[
              { title: 'Research', desc: 'AI-assisted market & competitor research' },
              { title: 'Strategy', desc: 'AI-assisted planning & positioning' },
              { title: 'Content', desc: 'Ideation & production' },
              { title: 'Analytics', desc: 'Analysis & insights' },
              { title: 'Automation', desc: 'AI-powered workflows' },
            ].map((card, i) => (
              <div key={i} className="ai-card">
                <div className="ai-card-img">
                  <img src={`/online-programme/images/ai-learning/${card.title}.webp`} alt={card.title} loading="lazy" decoding="async" />
                </div>
                <div className="ai-card-body">
                  <h4>{card.title}</h4>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="ai-bottom">
            <span className="quote-icon"><Quote /></span>
            <p className="quote-text">Learn how marketers use AI to work faster, think better and execute smarter.</p>
            <div className="quote-accent"><span /><span /><span /></div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="video-section section-padding" id="life">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="section-label">LIFE AT TEONOX</div>
            <h2 className="section-title">A Glimpse Into <span style={{ color: 'var(--orange)' }}>Our World</span></h2>
            <p className="section-subtitle">From classrooms to real-world projects — see what makes TEONOX different.</p>
          </div>
          <div className="slider-wrap" style={{ marginTop: 40 }}>
            <button type="button" className="slider-btn slider-btn-left" onClick={() => slideScroll('videoSlider', -1)}><ChevronLeft /></button>
            <div className="slider-viewport" id="videoSlider" ref={videoSliderRef}>
              <div className="slider-track">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <div key={n} className="slider-slide" style={{ minWidth: 200, maxWidth: 200 }}>
                    <div className="reel-card">
                      <div className="reel-placeholder">
                        <img src={`/online-programme/images/gallery/poster-video-${n}.jpg`} alt={`Video ${n}`} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} />
                        <div className="reel-overlay" onClick={(e) => playReel(e.currentTarget.closest('.reel-card') || e.currentTarget)}><Play /></div>
                        <div className="reel-controls">
                          <button type="button" className="reel-ctrl-btn" onClick={(e) => togglePause(e.currentTarget)}><Pause /></button>
                          <button type="button" className="reel-ctrl-btn" onClick={(e) => toggleMute(e.currentTarget)}>{muted ? <VolumeX /> : <Volume2 />}</button>
                        </div>
                        <div className="reel-badge"><Play /> Watch</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button type="button" className="slider-btn slider-btn-right" onClick={() => slideScroll('videoSlider', 1)}><ChevronRight /></button>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="whatyouget-section section-padding" id="whatyouget">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="section-label">WHAT YOU GET</div>
            <h2 className="section-title">Everything Included in <span style={{ color: 'var(--orange)' }}>Your Programme</span></h2>
            <p className="section-subtitle">Beyond just classes — you get a complete learning ecosystem.</p>
          </div>
          <div className="whatyouget-grid">
            {[
              { title: 'Business AI + Digital Marketing', desc: 'Complete programme access', img: '/online-programme/images/what-you-get/Business-AI-+-Digital-Marketing.webp' },
              { title: 'TEONOX Certificate', desc: 'Verified completion certificate', img: '/online-programme/images/what-you-get/TEONOX-Certificate.webp' },
              { title: 'Portfolio Projects', desc: '5 real project outputs', img: '/online-programme/images/what-you-get/Portfolio-Projects.webp' },
              { title: 'Career Direction', desc: 'Personalised career roadmap', img: '/online-programme/images/what-you-get/Career-Direction.webp' },
              { title: '30-Day Creator Guide', desc: 'Launch your content journey', img: '/online-programme/images/what-you-get/30-Day-Creator-Guide.webp' },
              { title: 'Growth Strategy', desc: 'Business growth frameworks', img: '/online-programme/images/what-you-get/Growth-Strategy.webp' },
              { title: 'Reel Competition', desc: 'Creative content challenges', img: '/online-programme/images/what-you-get/Reel-Competition.webp' },
              { title: 'Surprise Gift', desc: 'Special welcome kit', img: '/online-programme/images/what-you-get/Surprise-Gift.webp' },
            ].map((card, i) => (
              <div key={i} className="whatyouget-card">
                <img src={card.img} alt={card.title} className="whatyouget-card-img" loading="lazy" decoding="async" />
                <div className="whatyouget-card-body">
                  <h4>{card.title}</h4>
                  <p>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Section */}
      <section className="career-section section-padding" id="career">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="section-label">CAREER + BUSINESS OUTCOMES</div>
            <h2 className="section-title">Multiple Paths. <span style={{ color: 'var(--orange)' }}>One Strong Foundation.</span></h2>
            <p className="section-subtitle">Possible career directions after completing the programme.</p>
          </div>
          <div className="career-grid">
            <div className="career-col">
              <h3><Briefcase /> Career Paths</h3>
              <ul className="career-roles">
                <li>Digital Marketing Executive</li>
                <li>SEO Executive</li>
                <li>Performance Marketing Executive</li>
                <li>Social Media Specialist</li>
                <li>Growth Associate</li>
                <li>Content Strategist</li>
                <li>Marketing Analyst</li>
                <li>AI Marketing Operations</li>
              </ul>
            </div>
            <div className="career-col">
              <div className="career-independent">
                <h3><UserCheck /> For Independent Professionals</h3>
                <div className="career-tags">
                  <span className="career-tag">Freelancing</span>
                  <span className="career-tag">Client Acquisition</span>
                  <span className="career-tag">Proposals & Pitching</span>
                  <span className="career-tag">Personal Branding</span>
                  <span className="career-tag">Business Growth Fundamentals</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="faculty-section section-padding" id="faculty">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="section-label">OUR MENTORS</div>
            <h2 className="section-title">Learn From People Who Actually <span style={{ color: 'var(--orange)' }}>Work in the Field.</span></h2>
            <p className="section-subtitle">Our mentors are industry practitioners, not just theorists.</p>
          </div>
          <div className="faculty-grid">
            {[
              { name: 'Amit Manglani', role: 'Founder', desc: 'Leading TEONOX and A2 Digital with hands-on expertise in digital marketing, business growth, and AI-driven marketing strategy.', img: '/online-programme/images/mentors/amit.jpg', tags: ['Digital Marketing', 'Business Growth', 'Strategy'] },
              { name: 'Hitesh Chhtralia', role: 'Centre Operations Leadership', desc: 'Driving academics and marketing operations with a focus on practical, outcome-driven education delivery.', img: '/online-programme/images/mentors/hitesh.jpg', tags: ['Academics', 'Marketing', 'Operations'] },
              { name: 'Ayush Tandon', role: 'Academics & Marketing', desc: 'Specialising in marketing strategy and practical skill development for the next generation of digital marketers.', img: '/online-programme/images/mentors/ayush.jpg', tags: ['Marketing Strategy', 'Academics'] },
            ].map((fac, i) => (
              <div key={i} className="faculty-card">
                <div className="faculty-photo">
                  <img src={fac.img} alt={fac.name} loading="lazy" decoding="async" />
                </div>
                <div className="faculty-info">
                  <h3>{fac.name}</h3>
                  <div className="faculty-role">{fac.role}</div>
                  <p className="faculty-desc">{fac.desc}</p>
                  <div className="faculty-expertise">
                    {fac.tags.map((tag, ti) => <span key={ti} className="faculty-expertise-tag">{tag}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section section-padding" id="faq">
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <div className="section-label">FREQUENTLY ASKED QUESTIONS</div>
            <h2 className="section-title">Got Questions? <span style={{ color: 'var(--orange)' }}>We've Got Answers.</span></h2>
          </div>
          <div className="faq-list">
            {[
              { q: 'What is TEONOX?', a: 'TEONOX is a School of Marketing, AI & Business focused on helping learners build practical skills for the modern business environment. Our programmes combine marketing, technology, AI and business thinking with hands-on learning.' },
              { q: 'Who can join TEONOX?', a: 'TEONOX is designed for students, graduates, aspiring marketers, working professionals, entrepreneurs and anyone looking to build practical skills in digital marketing, AI and business.' },
              { q: 'Does TEONOX offer online and offline learning?', a: 'Yes. TEONOX offers both online and offline learning options, depending on the programme. This gives learners the flexibility to choose a format that works best for them.' },
              { q: 'What does TEONOX focus on?', a: 'TEONOX focuses on the intersection of Digital Marketing, AI and Business. Our programmes cover areas such as performance marketing, Meta Ads, Google Ads, SEO, analytics, content, AI tools and business thinking.' },
              { q: 'Is TEONOX only about learning tools?', a: 'No. Wrench are only one part of the learning process. We focus on helping learners understand how to apply those tools, think through marketing problems and connect their work with real business objectives.' },
              { q: 'Do I need prior experience?', a: 'No. Most programmes are designed to accommodate beginners and progressively build knowledge and practical skills. Specific eligibility requirements may vary depending on the programme.' },
              { q: 'Can I join while studying or working?', a: 'Yes. TEONOX has learning options designed for different learner profiles, including students and working professionals. Programme schedules and formats may vary.' },
            ].map((faq, i) => (
              <div key={i} className={`faq-item ${activeFaq === i ? 'active' : ''}`}>
                <button className="faq-question" onClick={() => toggleFaq(i)}>
                  {faq.q} <ChevronDown style={{ width: '24px', height: '24px', minWidth: '24px', minHeight: '24px' }} className="faq-chevron-icon" />
                </button>
                <div className="faq-answer" style={{ maxHeight: activeFaq === i ? '500px' : '0' }}>
                  <div className="faq-answer-inner">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section section-padding" id="final-cta">
        <div className="container">
          <h2 className="final-cta-title">Your Next Career Move Starts With What You Can <span style={{ textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.4)', textUnderlineOffset: 6 }}>Actually Do.</span></h2>
          <p className="final-cta-sub">6 Months. Live Learning. Real Projects. AI-Powered Skills.</p>
          <div className="final-cta-buttons">
            <button type="button" className="btn btn-white" onClick={() => setShowApplyModal(true)}><ArrowRight /> Apply Now</button>
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="sticky-cta">
        <button type="button" className="btn btn-primary" onClick={() => setShowApplyModal(true)}>Apply for the Next Cohort</button>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="apply-modal-overlay" onClick={() => { setShowApplyModal(false); setIsSubmitted(false); }}>
          <div className="apply-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="apply-modal-close" onClick={() => { setShowApplyModal(false); setIsSubmitted(false); }}><X /></button>
            <div className="apply-modal-grid">
              <div className="apply-modal-image">
                <img src="/online-programme/images/apply-modal.png" alt="Apply at TEONOX" />
              </div>
              <div className="apply-modal-form">
                <div className="section-label">APPLY NOW</div>
                <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Ready to <span style={{ color: 'var(--orange)' }}>Get Started?</span></h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: 24, fontSize: 14 }}>Fill in your details and our team will reach out within 24 hours.</p>
                {!isSubmitted ? (
                  <form onSubmit={handleApplySubmit} className="apply-form">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" placeholder="Enter your full name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" placeholder="Enter your phone number" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" placeholder="Enter your email address" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>I am a</label>
                      <select required>
                        <option value="" disabled selected>Select your profile</option>
                        <option>Student</option>
                        <option>Fresher / Graduate</option>
                        <option>Working Professional</option>
                        <option>Business Owner</option>
                        <option>Freelancer</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Preferred Batch Timing</label>
                      <select required>
                        <option value="" disabled selected>Select batch timing</option>
                        <option>Morning (9 AM - 12 PM)</option>
                        <option>Afternoon (1 PM - 4 PM)</option>
                        <option>Evening (6 PM - 9 PM)</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 14, fontSize: 15 }} disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : <><ArrowRight /> Submit Application</>}
                    </button>
                    <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', marginTop: 10 }}>
                      <Lock size={10} /> Your information is secure. We will never share your data.
                    </p>
                  </form>
                ) : (
                  <div className="success-state">
                    <CheckCircle2 size={48} />
                    <h3>Thank you, {fullName}!</h3>
                    <p>We've received your request! Our team will contact you shortly.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper icons (lucide-react doesn't have all the ones needed)
function GraduationCap(props: any) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>; }
function BarChart3(props: any) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>; }
function Mic(props: any) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>; }
function UserCheck(props: any) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>; }
function Quote(props: any) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25 0 4-2 4 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"></path></svg>; }
function ChevronDown(props: any) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 12 15 18 9"></polyline></svg>; }
function Lock(props: any) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>; }
function X(props: any) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>; }
function ArrowRightLeft(props: any) { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>; }



