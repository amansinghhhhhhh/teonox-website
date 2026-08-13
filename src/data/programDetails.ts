import imgDigitalMarketingAi from '../assets/images/uploaded_digital_marketing_ai.webp';
import imgPerformanceMktg from '../assets/images/uploaded_performance.webp';
import imgSeoSpecialization from '../assets/images/uploaded_seo.webp';
import imgSocialMediaMktg from '../assets/images/uploaded_social_media.webp';

import {
  GraduationCap,
  Building2,
  Briefcase,
  TrendingUp,
  Zap,
  Target,
  Sparkles,
  Users,
  Search,
  Share2,
  Megaphone,
  Laptop,
  FileText,
  LineChart,
  UserPlus,
  Bot,
  PenTool,
  Code,
  Layout,
  Workflow,
  Mail,
  Lightbulb,
  Wand2,
  PieChart,
  UserCheck,
  Video,
  Award,
  BarChart3,
  MessageSquare,
  Globe,
  Flame,
  Layers,
  HeartHandshake,
  Rocket
} from 'lucide-react';

export interface ProgramDetailData {
  id: string;
  programTitle: string;
  badge: string;
  subHeading: string;
  duration: string;
  mode: string;
  heroIntro: string;
  heroImage: string;
  designedForImage?: string;
  designedForIntro?: string;
  overview: {
    highlight: string;
    main: string;
    expanded: string[];
  };
  designedFor: {
    title: string;
    icon: any;
    text: string;
  }[];
  keyReasons: Array<{ title: string; text: string } | string>;
  keyReasonsFootnote?: string;
  benefits: {
    students: {
      title: string;
      intro: string;
      heading: string;
      bullets: string[];
    };
    business: {
      title: string;
      intro: string;
      heading: string;
      bullets: string[];
    };
    corporate: {
      title: string;
      intro: string;
      heading: string;
      bullets: string[];
    };
  };
  prerequisites: {
    intro: string;
    bullets: string[];
    note: string;
  };
  outcomes: {
    intro?: string;
    leadInBold?: string;
    bullets: string[];
    projectsNote: string;
  };
  valueSequence?: string[];
  valueProposition?: string;
  valueBodyParagraph?: string;
  valueBoldParagraph2?: string;
  valueGreyParagraph?: string;
  valueHighlightOrangeBold?: string;
  certifications: {
    title: string;
    badge: string;
    bgGradient: string;
    borderColor: string;
    type: 'teonox' | 'meta' | 'hubspot' | 'youtube' | 'linkedin' | 'semrush' | 'google' | 'analytics' | 'other';
  }[];
  certificationsIntro?: string;
  certificationsPathwaysLeadIn?: string;
  certificationsImportantTitle?: string;
  certificationsImportantText?: string;
  placementAssistance: {
    intro: string;
    bullets: string[];
    careerPaths: string[];
  };
  opportunities: {
    internships: {
      title: string;
      intro?: string;
      leadInBold?: string;
      note: string;
      items: { title: string; iconName: string }[];
    };
    freelancing: {
      title: string;
      intro?: string;
      leadInBold?: string;
      note: string;
      items: { title: string; iconName: string }[];
    };
  };
  faqs: {
    q: string;
    a: string;
  }[];
  cta?: {
    title?: string;
    description?: string;
    image?: string;
    primaryButtonText?: string;
    primaryButtonUrl?: string;
    secondaryButtonText?: string;
    secondaryButtonUrl?: string;
    brandTagline?: string;
  };
}

export const PROGRAM_DETAILS_MAP: Record<string, ProgramDetailData> = {
  'business-digital-marketing-ai': {
    id: 'business-digital-marketing-ai',
    programTitle: 'BUSINESS DIGITAL MARKETING WITH AI',
    badge: 'FLAGSHIP CERTIFICATION PROGRAM',
    subHeading: 'Complete Digital Marketing Mastery Across AI, SEO, Paid Ads, Analytics & Business Growth',
    duration: '6 Months',
    mode: 'On Campus, Pune',
    heroIntro:
      'Business Digital Marketing With AI is the flagship 6-month certification program at TEONOX. It builds a complete digital marketer trained across AI, SEO, paid ads, social media, analytics and business growth — combining strategy, practical execution and career support so learners can get hired, get promoted, or grow a business.',
    heroImage: imgDigitalMarketingAi,
    overview: {
      highlight:
        'Business Digital Marketing With AI is the flagship 6-month certification program at TEONOX. It builds a complete digital marketer trained across AI, SEO, paid ads, social media, analytics and business growth — combining strategy, practical execution and career support so learners can get hired, get promoted, or grow a business.',
      main: 'The program covers the full digital marketing stack: marketing fundamentals and strategy, SEO and search, paid advertising across Google and Meta, social media and content, email and automation, web analytics, and AI-powered marketing workflows. Throughout, learners work on real projects, build portfolios and prepare for internships, jobs and freelancing.',
      expanded: [
        'AI is embedded throughout the curriculum — from content and creative generation to campaign optimization, analytics and reporting — so learners graduate ready for AI-augmented marketing roles.',
        'The final months focus on business growth: measurement, conversion optimization, customer journeys and growth strategy, followed by placement and career support.'
      ]
    },
    designedFor: [
      {
        title: 'Students & Graduates',
        icon: GraduationCap,
        text: '12th-pass students and graduates who want a complete, industry-ready digital marketing career.'
      },
      {
        title: 'Working Professionals',
        icon: Briefcase,
        text: 'Professionals from any field who want to transition into digital marketing and growth roles.'
      },
      {
        title: 'Business Owners & Entrepreneurs',
        icon: Zap,
        text: 'Founders and business owners who want to market and grow their own businesses.'
      },
      {
        title: 'Freelancers & Aspiring Consultants',
        icon: Users,
        text: 'Individuals who want to offer high-value digital marketing services to clients.'
      },
      {
        title: 'Marketing Beginners',
        icon: Sparkles,
        text: 'Complete beginners looking for one structured path from fundamentals to advanced marketing skills.'
      },
      {
        title: 'Career Switchers',
        icon: Rocket,
        text: 'Professionals seeking a practical, portfolio-driven path into the digital economy.'
      },
      {
        title: 'Job Seekers',
        icon: Target,
        text: 'Candidates who want placement support, interview preparation and a competitive portfolio.'
      },
      {
        title: 'Creators & Content Marketers',
        icon: PenTool,
        text: 'Creators who want to add strategy, analytics, paid promotion and AI workflows to their skills.'
      },
      {
        title: 'Anyone Building an Online Business',
        icon: Building2,
        text: 'Anyone launching a product, service or brand who needs end-to-end digital marketing skills.'
      }
    ],
    keyReasons: [
      'One complete curriculum covering the entire digital marketing stack in 6 months',
      'AI-powered marketing skills embedded throughout every module',
      'Learn SEO, Google Ads, Meta Ads, social media, email, analytics and business growth',
      'Hands-on projects and portfolio building from week one',
      'Industry-recognized TEONOX certification plus support for Google, Meta, HubSpot and other certifications',
      'Placement assistance, resume and LinkedIn optimization and interview preparation',
      'Internship and freelancing opportunities for eligible learners',
      'On-campus immersive training at TEONOX, Pune with mentors and community',
      'Eligible for 12th-pass students, graduates and working professionals',
      'Designed for career growth across agencies, startups, brands and businesses'
    ],
    keyReasonsFootnote:
      'The 6-month curriculum spans strategy, AI, SEO, paid ads, social, analytics and business growth with live projects and career support.',
    benefits: {
      students: {
        title: 'For Students',
        intro:
          'Students and graduates can build a complete, job-ready digital marketing skill set with a portfolio that makes them stand out.',
        heading: 'Build a Complete, Job-Ready Profile',
        bullets: [
          'Master the full digital marketing stack with AI workflows integrated throughout.',
          'Build a real portfolio across SEO, paid ads, social media, email and analytics.',
          'Get placement assistance, interview prep and guidance for entry-level marketing roles.'
        ]
      },
      business: {
        title: 'For Business Owners',
        intro:
          'Business owners can learn how to attract customers, build brands and grow revenue using digital marketing and AI.',
        heading: 'Market & Grow Your Business',
        bullets: [
          'Understand how to acquire and retain customers across search, social and paid channels.',
          'Use analytics and AI to make smarter marketing decisions and optimize spend.',
          'Build sustainable marketing systems instead of depending on agencies for everything.'
        ]
      },
      corporate: {
        title: 'For Working Professionals',
        intro:
          'Professionals can transition into or advance within digital marketing and growth roles.',
        heading: 'Fast-Track a Career in Digital Marketing',
        bullets: [
          'Upgrade from general roles to in-demand digital marketing and growth positions.',
          'Learn AI-augmented workflows used by modern marketing teams.',
          'Gain certification, portfolio and mentorship support to switch careers with confidence.'
        ]
      }
    },
    prerequisites: {
      intro:
        'The program is designed for 12th-pass students, graduates and working professionals. No prior marketing experience is required — beginners are welcome. Learners should be comfortable with:',
      bullets: [
        'Using a computer and browsing the internet',
        'Basic English communication and writing',
        'A willingness to learn tools, analytics and AI platforms',
        'Curiosity about business and how companies market themselves'
      ],
      note: 'Eligibility: 12th Passed, Graduates & Working Professionals.'
    },
    outcomes: {
      intro: 'After completing the program, learners should be able to:',
      bullets: [
        'Plan and execute complete digital marketing strategies',
        'Implement SEO and organic growth across search engines',
        'Run Google Ads and Meta Ads campaigns end to end',
        'Manage social media, content and community programs',
        'Set up email marketing and automation flows',
        'Use web analytics to measure and optimize performance',
        'Apply AI tools across content, creative, analytics and campaigns',
        'Design customer journeys and conversion-focused funnels',
        'Present data-backed recommendations to teams and clients',
        'Build a professional portfolio ready for jobs or freelancing'
      ],
      projectsNote:
        'The program culminates in capstone projects covering a full marketing plan, live campaign work, analytics reporting and an AI-powered marketing workflow portfolio.'
    },
    valueSequence: [
      'Marketing Strategy',
      'SEO & Search',
      'Paid Advertising',
      'Social Media',
      'Analytics & AI',
      'Business Growth'
    ],
    valueProposition:
      'The value of the flagship program lies in turning a beginner into a complete, AI-enabled digital marketer ready for real business impact.',
    certifications: [
      {
        title: 'TEONOX Certification in Business Digital Marketing With AI',
        badge: 'TEONOX ACADEMY',
        bgGradient: 'from-orange-50 to-amber-50',
        borderColor: '#FED7AA',
        type: 'teonox'
      },
      {
        title: 'Google Digital Marketing & Analytics Certification Support',
        badge: 'GOOGLE CERTIFIED',
        bgGradient: 'from-blue-50 to-indigo-50',
        borderColor: '#BFDBFE',
        type: 'google'
      },
      {
        title: 'Meta Certified Digital Marketing Associate Support',
        badge: 'META CERTIFIED',
        bgGradient: 'from-indigo-50 to-purple-50',
        borderColor: '#C7D2FE',
        type: 'meta'
      },
      {
        title: 'HubSpot & Google Analytics 4 (GA4) Certification Support',
        badge: 'PLATFORM CERTIFIED',
        bgGradient: 'from-emerald-50 to-teal-50',
        borderColor: '#A7F3D0',
        type: 'hubspot'
      }
    ],
    placementAssistance: {
      intro:
        'Eligible learners can receive career support for digital marketing and related roles through tailored career services:',
      bullets: [
        'Resume and LinkedIn optimization for marketing roles',
        'Portfolio preparation featuring live project case studies',
        'Interview preparation and marketing scenario practice',
        'Mock interviews with marketing and hiring professionals',
        'Career guidance and freelancing positioning',
        'Job opportunity assistance through TEONOX hiring networks'
      ],
      careerPaths: [
        'Digital Marketing Executive',
        'SEO Specialist',
        'Social Media Marketer',
        'Paid Ads Specialist',
        'Content Marketer',
        'Email & Automation Marketer',
        'Growth Analyst',
        'Freelance Digital Marketer'
      ]
    },
    opportunities: {
      internships: {
        title: 'Practical Internship Exposure',
        note: 'Internship opportunities are subject to availability and applicable eligibility criteria.',
        items: [
          { title: 'Real marketing projects', iconName: 'Target' },
          { title: 'SEO and content assignments', iconName: 'Search' },
          { title: 'Google and Meta ad campaigns', iconName: 'Zap' },
          { title: 'Social media management', iconName: 'Share2' },
          { title: 'Email and automation flows', iconName: 'Mail' },
          { title: 'Analytics and reporting', iconName: 'BarChart' }
        ]
      },
      freelancing: {
        title: 'Freelancing & Client Services',
        note: 'The program can prepare learners to offer high-demand services to clients, brands, and agencies.',
        items: [
          { title: 'Digital Marketing Strategy', iconName: 'Lightbulb' },
          { title: 'SEO Services', iconName: 'Search' },
          { title: 'Social Media Management', iconName: 'Share2' },
          { title: 'Google Ads Management', iconName: 'Megaphone' },
          { title: 'Meta Ads Management', iconName: 'Target' },
          { title: 'Content Marketing', iconName: 'FileText' },
          { title: 'Email Marketing', iconName: 'Mail' },
          { title: 'AI-Powered Marketing', iconName: 'Bot' },
          { title: 'Landing Page & Funnel Design', iconName: 'Layout' },
          { title: 'Analytics & Reporting', iconName: 'PieChart' }
        ]
      }
    },
    faqs: [
      {
        q: '1. What is the Business Digital Marketing With AI program?',
        a: 'It is the flagship 6-month certification program at TEONOX that builds a complete digital marketer trained across AI, SEO, paid ads, social media, analytics and business growth.'
      },
      {
        q: '2. Do I need prior marketing experience?',
        a: 'No. The program is designed for 12th-pass students, graduates and working professionals. Beginners start with fundamentals and progress to advanced, AI-powered marketing.'
      },
      {
        q: '3. What is the duration of the program?',
        a: 'The program duration is 6 months.'
      },
      {
        q: '4. What is the mode of delivery?',
        a: 'The program is delivered On Campus in Pune with hands-on projects, mentorship and a learning community.'
      },
      {
        q: '5. What topics are covered?',
        a: 'The curriculum covers marketing strategy, SEO and search, Google Ads, Meta Ads, social media and content, email and automation, web analytics, AI-powered marketing workflows and business growth.'
      },
      {
        q: '6. Will I learn AI?',
        a: 'Yes. AI is embedded throughout the program — content and creative generation, campaign optimization, analytics, reporting and marketing operations.'
      },
      {
        q: '7. Will I get a certification?',
        a: 'Yes. Learners earn the TEONOX Certification in Business Digital Marketing With AI, with support for Google, Meta, HubSpot and GA4 certifications.'
      },
      {
        q: '8. Does the program include practical projects?',
        a: 'Yes. Learners build a portfolio through live projects covering a full marketing plan, campaign work, analytics reporting and an AI-powered marketing workflow.'
      },
      {
        q: '9. Does the program offer placement support?',
        a: 'Eligible learners receive placement assistance including resume and LinkedIn optimization, interview preparation, mock interviews and job opportunity assistance through TEONOX hiring networks.'
      },
      {
        q: '10. Can I freelance after completing this program?',
        a: 'Yes. The skills are applicable to freelancing in SEO, social media, paid ads, content, email and AI-powered marketing services.'
      },
      {
        q: '11. Who is this program for?',
        a: 'It is for students and graduates, working professionals, career switchers, business owners, freelancers and job seekers who want a complete digital marketing skill set.'
      },
      {
        q: '12. Why choose the flagship program over a specialization?',
        a: 'The flagship program covers the entire digital marketing stack in one 6-month path, while specializations focus on one advanced area like SEO, Social Media or Performance Marketing.'
      }
    ]
  },
  'social-media-marketing': {
    id: 'social-media-marketing',
    programTitle: 'SPECIALIZATION IN SOCIAL MEDIA MARKETING',
    badge: '8-WEEK ADVANCED SPECIALIZATION PROGRAM',
    subHeading: 'Advanced Content Systems, Algorithms, Communities, Influence & Social Commerce',
    duration: '8 Weeks',
    mode: 'On Campus, Pune',
    heroIntro: 'Social Media Growth Engineering is an intensive 8-week advanced specialization program designed to transform social media knowledge into a structured system for audience growth, content performance, influence, community building, brand authority and revenue generation.',
    heroImage: imgSocialMediaMktg,
    overview: {
      highlight: 'Social Media Growth Engineering is an intensive 8-week advanced specialization program designed to transform social media knowledge into a structured system for audience growth, content performance, influence, community building, brand authority and revenue generation.',
      main: 'The program goes beyond routine posting and platform management. Learners explore social media algorithms, advanced audience intelligence, content engineering, short-form video growth, persuasion psychology, personal branding, influencer marketing, community-led growth, Social SEO, social commerce, analytics and growth experimentation across major platforms.',
      expanded: [
        'The program also integrates AI-powered content creation, social listening, automation, CRM workflows, chatbot integration and AI agents, helping learners build scalable and data-driven social media systems.',
        'The curriculum combines platform growth with content, influence, community, commerce, analytics and experimentation rather than treating social media purely as a publishing function.'
      ]
    },
    designedFor: [
      {
        title: 'Digital Marketing Students',
        icon: GraduationCap,
        text: 'Students seeking a Social Media specialization to build strategic careers in Content Strategy, Creator Marketing and Growth.'
      },
      {
        title: 'Social Media Executives & Managers',
        icon: Briefcase,
        text: 'Professionals upgrading from routine account posting to algorithm engineering, audience growth and social ROI.'
      },
      {
        title: 'Content Creators & Influencers',
        icon: Video,
        text: 'Creators looking to engineer viral reach, audience retention, brand partnerships and digital monetization.'
      },
      {
        title: 'Digital Marketing Professionals',
        icon: TrendingUp,
        text: 'Marketers expanding their skill set into Social SEO, AI content workflows, social listening and community management.'
      },
      {
        title: 'Brand & Content Professionals',
        icon: Sparkles,
        text: 'Brand strategists building long-term thought leadership, executive branding and organic authority.'
      },
      {
        title: 'Entrepreneurs & Business Owners',
        icon: Building2,
        text: 'Founders turning social platforms into predictable lead generation, customer acquisition and social selling channels.'
      },
      {
        title: 'Freelancers & Consultants',
        icon: Zap,
        text: 'Independent practitioners delivering high-value social media audits, growth strategies and content automation services.'
      },
      {
        title: 'Agency Professionals',
        icon: Target,
        text: 'Agency leads designing scalable client growth frameworks, creator campaigns and multi-platform distribution.'
      },
      {
        title: 'Personal Brands & Aspiring Creators',
        icon: Users,
        text: 'Individuals building niche authority, digital presence, audience trust and monetization systems.'
      }
    ],
    keyReasons: [
      'Understand how social media algorithms influence growth and recommendation engines',
      'Build advanced content and distribution systems across multi-platform networks',
      'Master short-form video, hooks, retention curves and viral rewatch engineering',
      'Develop personal brands, founder-led content and industry thought leadership',
      'Learn influencer and creator growth strategies, outreach and campaign attribution',
      'Build, engage and monetize active online brand communities',
      'Master Social SEO, keyword indexing and platform discovery optimization',
      'Understand social commerce, shoppable posts, conversational selling and revenue generation',
      'Use analytics, experimentation, social listening and brand intelligence for growth',
      'Integrate AI-powered content creation, chatbots and automation into social media operations'
    ],
    keyReasonsFootnote: 'The curriculum combines platform growth with content, influence, community, commerce, analytics and experimentation rather than treating social media purely as a publishing function.',
    benefits: {
      students: {
        title: 'For Students',
        intro: 'Develop an advanced specialization for careers in Social Media Marketing, Content Strategy, Influencer Marketing, Community Management and Creator Marketing.',
        heading: 'The program empowers students to:',
        bullets: [
          'Think strategically about audiences, algorithms, content, growth and analytics instead of simply operating social media accounts',
          'Develop an advanced specialization for high-demand digital careers',
          'Build scalable multi-platform content distribution pipelines',
          'Master short-form video production, viral hooks and retention pacing',
          'Build a portfolio of real social media growth campaigns and audits',
          'Learn creator positioning, influencer outreach and campaign management',
          'Optimize brand profiles and content for Social SEO and platform search',
          'Build and nurture active online communities across platforms',
          'Apply AI tools for scriptwriting, image/video generation and content repurposing',
          'Measure social media ROI, velocity, reach and conversion metrics'
        ]
      },
      business: {
        title: 'For Business Owners',
        intro: 'Learn how to turn social platforms into business growth channels for brand visibility, audience building, lead generation, customer engagement, social selling and revenue.',
        heading: 'Business owners will learn to:',
        bullets: [
          'Turn social platforms into predictable lead generation and revenue engines',
          'Evaluate content strategies, creators, agencies and social media performance effectively',
          'Build strong brand authority and niche thought leadership',
          'Harness social commerce, shoppable posts and conversational selling',
          'Implement automated social-to-CRM workflows and lead capture chatbots',
          'Leverage social listening to monitor brand sentiment and customer insights',
          'Monetize online brand communities and customer advocacy',
          'Use AI tools to scale content production without expanding headcount',
          'Drive organic discovery with Social SEO on Instagram, YouTube and TikTok',
          'Make informed marketing budget decisions across organic and creator channels'
        ]
      },
      corporate: {
        title: 'For Corporate Employees',
        intro: 'Upgrade from social media execution to strategy, intelligence and growth management.',
        heading: 'Corporate professionals can:',
        bullets: [
          'Upgrade from basic publishing to strategic growth and audience intelligence',
          'Master audience research, segmentation and interest graph mechanics',
          'Implement social listening, sentiment analysis and brand reputation management',
          'Design cross-platform content repurposing and distribution systems',
          'Lead influencer marketing campaigns from outreach to ROI attribution',
          'Integrate AI agents, Make/Zapier automations and comment-to-DM workflows',
          'Measure and present social media ROI and growth metrics to leadership',
          'Develop executive personal branding and founder-led content strategies',
          'Handle online crisis communications and reputation protection',
          'Stay ahead of algorithmic shifts across LinkedIn, YouTube, Meta and X'
        ]
      }
    },
    prerequisites: {
      intro: 'This is an advanced specialization program, so basic knowledge of Digital Marketing and Social Media Marketing is recommended.',
      bullets: [
        'Major social media platforms (Instagram, Facebook, LinkedIn, YouTube, X, TikTok, etc.)',
        'Basic content creation and publishing workflows',
        'Engagement and audience interaction concepts',
        'Basic marketing and branding principles',
        'Common social media metrics (reach, engagement, impressions, CTR)'
      ],
      note: 'Professional experience is beneficial but not mandatory.'
    },
    outcomes: {
      bullets: [
        'Develop advanced multi-platform social media strategies',
        'Understand algorithmic content distribution and recommendation systems',
        'Research and segment social audiences using interest graph data',
        'Build scalable, automated content creation and repurposing systems',
        'Engineer short-form video for maximum reach, watch time and retention',
        'Develop personal branding and executive thought leadership strategies',
        'Plan, execute and measure influencer and creator marketing campaigns',
        'Build and monetize community-led growth systems',
        'Optimize social content for Social SEO, hashtag architecture and search discovery',
        'Develop social commerce, shoppable content and conversational sales funnels',
        'Measure social media ROI, campaign velocity and growth metrics',
        'Use social listening tools for brand intelligence and market monitoring',
        'Manage online reputation, public relations and crisis communication',
        'Apply AI agents and automation to social media workflows',
        'Design and execute data-driven social media growth experiments'
      ],
      projectsNote: 'The program concludes with advanced projects covering multi-platform growth, creator brands, viral content experimentation, influencer campaigns, community growth, social commerce, AI content systems and automation.'
    },
    certifications: [
      {
        title: 'TEONOX Certification in Social Media Growth Engineering',
        badge: 'TEONOX OFFICIAL',
        bgGradient: 'from-[#F15A29]/10 to-[#FFF0EB]',
        borderColor: '#F8E3D8',
        type: 'teonox'
      },
      {
        title: 'Meta Certified Digital Marketing Associate / Community Manager',
        badge: 'META CERTIFIED',
        bgGradient: 'from-blue-50 to-indigo-50',
        borderColor: '#DBEFEA',
        type: 'meta'
      },
      {
        title: 'HubSpot Social Media Marketing Certification',
        badge: 'HUBSPOT ACADEMY',
        bgGradient: 'from-orange-50 to-amber-50',
        borderColor: '#FED7AA',
        type: 'hubspot'
      },
      {
        title: 'YouTube Content Ownership & Growth Certification',
        badge: 'YOUTUBE CREATOR',
        bgGradient: 'from-red-50 to-rose-50',
        borderColor: '#FECDD3',
        type: 'youtube'
      },
      {
        title: 'LinkedIn Marketing Strategy Credential',
        badge: 'LINKEDIN MARKETING',
        bgGradient: 'from-sky-50 to-blue-50',
        borderColor: '#BAE6FD',
        type: 'linkedin'
      },
      {
        title: 'SEMrush Social Media Toolkit Certification',
        badge: 'SEMRUSH SOCIAL',
        bgGradient: 'from-amber-50 to-orange-50',
        borderColor: '#FDE68A',
        type: 'semrush'
      }
    ],
    placementAssistance: {
      intro: 'Eligible learners receive career support and guidance to position themselves for high-growth roles in social media, creator economy, and brand management.',
      bullets: [
        'Resume and LinkedIn optimization tailored for social growth roles',
        'Social Media growth portfolio development and case study creation',
        'Interview preparation and campaign defense strategy',
        'Mock interviews with industry social leads',
        'Career guidance and personal branding positioning',
        'Job opportunity assistance through TEONOX hiring partner connections'
      ],
      careerPaths: [
        'Social Media Strategist',
        'Social Media Manager',
        'Content Strategist',
        'Community Manager',
        'Influencer Marketing Executive',
        'Creator Marketing Specialist',
        'Social Media Analyst'
      ]
    },
    opportunities: {
      internships: {
        title: 'Practical Internship Exposure',
        note: 'Opportunities are subject to availability and applicable eligibility criteria.',
        items: [
          { title: 'Social Media campaigns', iconName: 'Share2' },
          { title: 'Content strategy projects', iconName: 'FileText' },
          { title: 'Reels and short-form video projects', iconName: 'Video' },
          { title: 'Influencer campaigns', iconName: 'Megaphone' },
          { title: 'Community management', iconName: 'Users' },
          { title: 'Social listening and analytics', iconName: 'LineChart' },
          { title: 'AI-powered content workflows', iconName: 'Bot' }
        ]
      },
      freelancing: {
        title: 'Freelancing & Consulting Services',
        note: 'Advanced learners can progress toward freelancing, consulting, creator management or building a Social Media agency.',
        items: [
          { title: 'Social Media Management', iconName: 'Share2' },
          { title: 'Social Media Strategy', iconName: 'Target' },
          { title: 'Content Strategy', iconName: 'FileText' },
          { title: 'Reels & Short-Form Content Strategy', iconName: 'Video' },
          { title: 'Personal Branding', iconName: 'UserCheck' },
          { title: 'Influencer Marketing', iconName: 'Megaphone' },
          { title: 'Community Management', iconName: 'Users' },
          { title: 'Social Media Audits', iconName: 'Search' },
          { title: 'Social Media Analytics', iconName: 'PieChart' },
          { title: 'AI Content Systems', iconName: 'Bot' },
          { title: 'Social Media Automation', iconName: 'Workflow' }
        ]
      }
    },
    faqs: [
      {
        q: '1. What is Social Media Growth Engineering?',
        a: 'It is an 8-week advanced specialization focused on systematically growing audiences, brands, communities and business outcomes through content, algorithms, analytics, influence, AI and experimentation.'
      },
      {
        q: '2. How is Growth Engineering different from regular Social Media Marketing?',
        a: 'Traditional Social Media Marketing often focuses on content creation, publishing and account management.\n\nGrowth Engineering focuses on understanding why content grows, testing what drives growth and building repeatable systems to scale it.'
      },
      {
        q: '3. Is this course suitable for beginners?',
        a: 'It is designed as an advanced specialization. Basic knowledge of Digital Marketing and major social media platforms is recommended.'
      },
      {
        q: '4. Which platforms are covered?',
        a: 'The curriculum includes growth strategies across Instagram, Facebook, LinkedIn, YouTube, X, Pinterest, TikTok, Snapchat, Threads, Reddit, Quora and Telegram, along with evaluation of emerging platforms.'
      },
      {
        q: '5. Will I learn social media algorithms?',
        a: 'Yes. The program covers recommendation systems, content distribution, interest and social graphs, engagement prediction, watch time, retention, satisfaction signals, content velocity and algorithm testing.'
      },
      {
        q: '6. Does the course cover Reels and short-form video?',
        a: 'Yes. It includes viral video architecture, hooks, retention curves, pattern interrupts, open loops, rewatch engineering, visual pacing, captions, CTAs and growth systems for Reels, Shorts and TikTok.'
      },
      {
        q: '7. Will I learn Influencer Marketing?',
        a: 'Yes. The program covers creator positioning, influencer discovery and evaluation, brand-creator fit, outreach, negotiation, campaign management, attribution and monetization.'
      },
      {
        q: '8. Does the program cover monetization?',
        a: 'Yes. Social commerce includes shoppable content, creator and affiliate commerce, social selling, conversational commerce, lead generation, digital products, memberships and community monetization.'
      },
      {
        q: '9. Does the course include AI?',
        a: 'Yes. AI applications include audience research, content ideation, scriptwriting, image, video and voice generation, content repurposing, social listening, sentiment analysis, community management, personalization and AI agents.'
      },
      {
        q: '10. Will I learn Social Media Automation?',
        a: 'Yes. The curriculum includes content production workflows, scheduling, automated publishing, lead capture, social-to-CRM integration, comment-to-DM automation, chatbots, reporting and automation using Make, Zapier and APIs.'
      },
      {
        q: '11. Is Personal Branding included?',
        a: 'Yes. The program covers positioning, niche authority, thought leadership, founder-led content, executive branding, authority building, digital footprint management and monetization.'
      },
      {
        q: '12. Can business owners benefit from this program?',
        a: 'Yes. It can help business owners understand how to use social media for brand building, audience growth, community development, customer engagement, lead generation and social commerce.'
      },
      {
        q: '13. Can I freelance after completing the course?',
        a: 'Yes. The skills can be applied to Social Media Management, Content Strategy, Personal Branding, Influencer Marketing, Community Management, Analytics, AI content and automation services.'
      },
      {
        q: '14. Does the program include practical projects?',
        a: 'Yes. The curriculum concludes with projects covering multi-platform growth, creator brand development, viral content experimentation, influencer campaigns, community-led growth, social commerce, social listening, AI content production and automation.'
      },
      {
        q: '15. What makes this course different from a regular Social Media course?',
        a: 'A regular course teaches how to use social media platforms.\n\nSocial Media Growth Engineering teaches how to build systems that make audiences, content, communities, influence and business outcomes grow.'
      }
    ]
  },
  'seo-specialization': {
    id: 'seo-specialization',
    programTitle: 'SPECIALIZATION IN SEARCH ENGINE OPTIMIZATION',
    badge: '8-WEEK ADVANCED SPECIALIZATION PROGRAM',
    subHeading: 'Advanced SEO, AI Search, Technical SEO, Digital Authority & Organic Growth',
    duration: '45 Days',
    mode: 'On Campus, Pune',
    heroIntro: 'Search & Organic Growth Intelligence is an intensive 8-week advanced specialization program designed for learners who want to move beyond traditional SEO and master the rapidly evolving world of search, organic visibility, AI discovery and digital authority.',
    heroImage: imgSeoSpecialization,
    overview: {
      highlight: 'Search & Organic Growth Intelligence is an intensive 8-week advanced specialization program designed for learners who want to move beyond traditional SEO and master the rapidly evolving world of search, organic visibility, AI discovery and digital authority.',
      main: 'The program covers advanced search strategy, technical SEO, website architecture, Core Web Vitals, JavaScript SEO, Semantic SEO, Entity SEO, structured data, Programmatic SEO, advanced content engineering, off-page authority and Digital PR.',
      expanded: [
        'A major focus is placed on the future of search, including AI Search, AEO, GEO, AI citations and visibility across Google AI Overviews, ChatGPT, Gemini, Perplexity and Microsoft Copilot, along with Search Everywhere Optimization across social, video, marketplace and other discovery platforms.',
        'The curriculum spans the complete organic growth ecosystem, from search intelligence and technical infrastructure to AI visibility, authority building, analytics and business growth.'
      ]
    },
    designedFor: [
      {
        title: 'Digital Marketing Students',
        icon: GraduationCap,
        text: 'Students seeking an advanced SEO specialization to build high-value careers in Search, Organic Growth and AI Discovery.'
      },
      {
        title: 'SEO Executives & Specialists',
        icon: Search,
        text: 'SEO Executives, Specialists and Managers looking to level up to Technical SEO, AI Search and Organic Strategy.'
      },
      {
        title: 'Content & Growth Professionals',
        icon: TrendingUp,
        text: 'Content and Organic Growth professionals wanting to engineer search authority and scalable content systems.'
      },
      {
        title: 'Digital Marketing Professionals',
        icon: Briefcase,
        text: 'Marketing generalists expanding their domain into technical infrastructure, semantic search and search analytics.'
      },
      {
        title: 'Website & E-Commerce Owners',
        icon: Building2,
        text: 'E-Commerce and website professionals looking to build sustainable organic channels and product search visibility.'
      },
      {
        title: 'Business Owners & Entrepreneurs',
        icon: Zap,
        text: 'Entrepreneurs building long-term organic authority instead of depending entirely on paid ads.'
      },
      {
        title: 'Freelancers & Consultants',
        icon: UserCheck,
        text: 'SEO Consultants and freelancers looking to offer high-ticket technical, AI search and Digital PR services.'
      },
      {
        title: 'Agency Professionals',
        icon: Users,
        text: 'Agency leads preparing client portfolios for the future of AI-powered search, AEO and GEO.'
      },
      {
        title: 'AI Search Enthusiasts',
        icon: Bot,
        text: 'Professionals preparing for the future of AI-powered search across ChatGPT, Gemini, Perplexity and Copilot.'
      }
    ],
    keyReasons: [
      'Move beyond basic SEO into advanced organic growth strategy',
      'Master Technical SEO, JavaScript SEO and website architecture',
      'Build Semantic SEO, Entity SEO and Topical Authority',
      'Understand AEO, GEO and AI Search visibility',
      'Learn Programmatic SEO and scalable content systems',
      'Master advanced off-page SEO and Digital PR',
      'Learn Local, International and E-Commerce SEO at scale',
      'Use AI and automation for SEO operations',
      'Measure organic growth through advanced analytics and ROI',
      'Develop consulting, freelancing and agency-ready SEO capabilities'
    ],
    keyReasonsFootnote: 'The curriculum spans the complete organic growth ecosystem, from search intelligence and technical infrastructure to AI visibility, authority building, analytics and business growth.',
    benefits: {
      students: {
        title: 'For Students',
        intro: 'Develop a high-value specialization for careers in SEO, Technical SEO, Organic Growth, Content SEO and AI Search Optimization.',
        heading: 'Master Modern Search Ecosystems',
        bullets: [
          'Move beyond keyword-and-ranking-based SEO and develop a deeper understanding of how modern search engines, entities, content systems and AI discovery platforms work.',
          'Build strong fundamentals in Technical SEO, JavaScript SEO and website architecture.',
          'Learn to design Programmatic SEO and scalable content engines.',
          'Prepare for high-demand roles in enterprise SEO and AI search optimization.'
        ]
      },
      business: {
        title: 'For Business Owners',
        intro: 'Learn how to build sustainable organic visibility instead of depending entirely on paid advertising.',
        heading: 'Build Sustainable Organic Assets',
        bullets: [
          'Understand SEO strategy, website performance, content authority and local visibility.',
          'Establish brand presence across AI search engines like ChatGPT, Gemini and Perplexity.',
          'Reduce long-term customer acquisition costs by scaling organic lead generation.',
          'Evaluate the commercial value of organic growth and manage technical teams effectively.'
        ]
      },
      corporate: {
        title: 'For Corporate Employees',
        intro: 'Upgrade from routine SEO execution to search strategy and organic growth intelligence.',
        heading: 'Drive Strategic Enterprise Growth',
        bullets: [
          'Develop advanced capabilities in technical SEO, content strategy, search analytics, AI visibility, automation, Digital PR and enterprise SEO.',
          'Engineer topical authority and entity-based content systems for large sites.',
          'Implement automated SEO workflows and monitoring dashboards.',
          'Demonstrate clear organic ROI to executive stakeholders.'
        ]
      }
    },
    prerequisites: {
      intro: 'This is an advanced specialization program, so basic knowledge of SEO and Digital Marketing is recommended. Learners should ideally understand:',
      bullets: [
        'SEO fundamentals',
        'Keyword research',
        'Basic On-Page and Off-Page SEO',
        'Search engines and SERPs',
        'Websites and content fundamentals',
        'Basic Google Search Console and Analytics'
      ],
      note: 'Coding knowledge is not mandatory, although basic familiarity with HTML and website technology can be helpful for advanced Technical SEO topics.'
    },
    outcomes: {
      intro: 'After completing the program, learners should be able to:',
      bullets: [
        'Build advanced SEO and organic growth strategies',
        'Conduct search intent and competitor intelligence',
        'Design SEO-friendly website architecture',
        'Perform advanced Technical SEO audits',
        'Optimize Core Web Vitals and web performance',
        'Understand JavaScript SEO and modern web technologies',
        'Build Semantic SEO and Topical Authority systems',
        'Develop Entity SEO and Knowledge Graph strategies',
        'Implement advanced structured data',
        'Develop Programmatic SEO strategies',
        'Optimize for AI Search, AEO and GEO',
        'Build authority through advanced link acquisition and Digital PR',
        'Develop Local, International and E-Commerce SEO strategies',
        'Automate SEO workflows using AI and automation',
        'Measure SEO performance, conversions and ROI'
      ],
      projectsNote: 'The program concludes with advanced capstone work covering Technical SEO, Topical Authority, Programmatic SEO, AI Search Visibility, Digital PR, Local SEO, E-Commerce SEO, automation, analytics and complete organic growth strategy.'
    },
    valueSequence: [
      'Search Strategy',
      'Technical Audit',
      'Topical Authority',
      'AI Visibility',
      'Digital PR',
      'Organic Growth'
    ],
    valueProposition: 'The value of the program lies in moving beyond traditional SEO to master AI search, technical engineering, entity authority, and scalable organic growth.',
    certifications: [
      {
        title: 'TEONOX Certification in Search & Organic Growth Intelligence',
        badge: 'TEONOX ACADEMY',
        bgGradient: 'from-orange-50 to-amber-50',
        borderColor: '#FED7AA',
        type: 'teonox'
      },
      {
        title: 'Google Search Console & Analytics Assessment Support',
        badge: 'GOOGLE CERTIFIED',
        bgGradient: 'from-blue-50 to-indigo-50',
        borderColor: '#BFDBFE',
        type: 'google'
      },
      {
        title: 'SEMrush SEO Toolkit Professional Credential',
        badge: 'SEMRUSH ACADEMY',
        bgGradient: 'from-amber-50 to-orange-50',
        borderColor: '#FDE68A',
        type: 'semrush'
      },
      {
        title: 'HubSpot Inbound & Content Marketing Certification',
        badge: 'HUBSPOT ACADEMY',
        bgGradient: 'from-rose-50 to-orange-50',
        borderColor: '#FECDD3',
        type: 'hubspot'
      }
    ],
    placementAssistance: {
      intro: 'Eligible learners can receive career support and guidance to position themselves for specialized high-growth roles in search and organic marketing.',
      bullets: [
        'Resume and LinkedIn optimization tailored for Technical & Search roles',
        'SEO portfolio development and live technical audit case studies',
        'Interview preparation and technical defense strategy',
        'Mock interviews with enterprise search leads',
        'Career guidance and consulting positioning',
        'Job opportunity assistance through TEONOX hiring connections'
      ],
      careerPaths: [
        'SEO Specialist',
        'Technical SEO Specialist',
        'Organic Growth Specialist',
        'SEO Strategist',
        'Content SEO Specialist',
        'Search Analyst',
        'SEO Consultant'
      ]
    },
    opportunities: {
      internships: {
        title: 'Practical Internship Exposure',
        note: 'Internship opportunities are subject to availability and applicable eligibility criteria.',
        items: [
          { title: 'SEO audits', iconName: 'Search' },
          { title: 'Technical SEO projects', iconName: 'Code' },
          { title: 'Keyword and competitor research', iconName: 'LineChart' },
          { title: 'Content optimization', iconName: 'FileText' },
          { title: 'Local SEO projects', iconName: 'Globe' },
          { title: 'AI Search visibility projects', iconName: 'Bot' },
          { title: 'Link building and Digital PR', iconName: 'Share2' },
          { title: 'SEO analytics and reporting', iconName: 'PieChart' }
        ]
      },
      freelancing: {
        title: 'Freelancing & Consulting Services',
        note: 'Learners can develop skills applicable to high-value client services, retainers, and agency scaling.',
        items: [
          { title: 'SEO Audits', iconName: 'Search' },
          { title: 'Technical SEO', iconName: 'Code' },
          { title: 'Local SEO', iconName: 'Globe' },
          { title: 'E-Commerce SEO', iconName: 'Building2' },
          { title: 'Content SEO', iconName: 'FileText' },
          { title: 'On-Page SEO', iconName: 'Layout' },
          { title: 'AEO & GEO Consulting', iconName: 'Wand2' },
          { title: 'AI Search Optimization', iconName: 'Bot' },
          { title: 'Link Building & Digital PR', iconName: 'Megaphone' },
          { title: 'SEO Analytics', iconName: 'PieChart' },
          { title: 'SEO Strategy & Consulting', iconName: 'Target' }
        ]
      }
    },
    faqs: [
      {
        q: '1. What is Search & Organic Growth Intelligence?',
        a: 'It is an 8-week advanced specialization program focused on SEO, Technical SEO, content authority, AI Search, AEO, GEO, Digital PR, automation and sustainable organic growth.'
      },
      {
        q: '2. How is this different from a regular SEO course?',
        a: 'A regular SEO course typically teaches how to optimize websites for search engines.\n\nSearch & Organic Growth Intelligence goes further by teaching how to engineer visibility, authority and organic growth across traditional search engines, AI search platforms, social search and other discovery ecosystems.'
      },
      {
        q: '3. Is this course suitable for beginners?',
        a: 'It is designed as an advanced specialization. Basic knowledge of SEO and Digital Marketing is recommended.'
      },
      {
        q: '4. Does the course cover Technical SEO?',
        a: 'Yes. It covers crawling, indexation, crawl budgets, robots.txt, XML sitemaps, canonicalization, rendering, JavaScript SEO, log files, redirects, HTTP status codes and technical monitoring.'
      },
      {
        q: '5. Will I learn AEO and GEO?',
        a: 'Yes. A dedicated module covers: Answer Engine Optimization, Generative Engine Optimization, AI citation optimization, citation-worthy content, passage optimization, entity authority and AI search visibility measurement.'
      },
      {
        q: '6. Does the course cover ChatGPT and other AI search platforms?',
        a: 'Yes. The curriculum addresses visibility across ChatGPT, Google AI Overviews, Gemini, Perplexity and Microsoft Copilot as part of the evolving AI Search ecosystem.'
      },
      {
        q: '7. Will I learn Semantic SEO and Entity SEO?',
        a: 'Yes. The program covers Semantic Search, Topical Maps, Topical Authority, entities, Knowledge Graphs, entity associations, brand entities and structured data for entity reinforcement.'
      },
      {
        q: '8. Is Programmatic SEO included?',
        a: 'Yes. It covers template-based SEO systems, datasets, database-driven pages, dynamic landing pages, location and comparison pages, directories, marketplaces, automated internal linking and scaling Programmatic SEO.'
      },
      {
        q: '9. Does the course cover SEO beyond Google?',
        a: 'Yes. Search Everywhere Optimization includes YouTube, Instagram, LinkedIn, Pinterest, Reddit, Quora, marketplaces, Amazon, App Stores, podcasts and broader social search.'
      },
      {
        q: '10. Does the course cover Local and E-Commerce SEO?',
        a: 'Yes. Dedicated advanced modules cover Local SEO at scale, International SEO and E-Commerce SEO, including multi-location businesses, international websites, category and product optimization, product schema and marketplace SEO.'
      },
      {
        q: '11. Will I learn SEO automation and AI workflows?',
        a: 'Yes. The program covers automated keyword clustering, content briefs, topical maps, technical audits, internal linking, schema generation, monitoring, reporting, APIs, Google Sheets, Make, Zapier, Python applications and AI agents for SEO.'
      },
      {
        q: '12. Can business owners benefit from this course?',
        a: 'Yes. It can help business owners understand how to build long-term search visibility, strengthen digital authority, reduce excessive dependence on paid acquisition and evaluate SEO investments more effectively.'
      },
      {
        q: '13. Can I freelance after completing the course?',
        a: 'Yes. The skills can be applied to SEO audits, Technical SEO, Local SEO, E-Commerce SEO, Content SEO, AEO/GEO, AI Search Optimization, Digital PR, analytics and SEO consulting.'
      },
      {
        q: '14. Does the program include practical projects?',
        a: 'Yes. Capstone projects include an Enterprise Technical SEO Audit, Topical Authority Development, Programmatic SEO, AI Search Visibility, Digital PR, Multi-Location SEO, E-Commerce SEO, SEO Automation, Analytics Dashboard and Complete Organic Growth Strategy.'
      },
      {
        q: '15. What makes this course future-ready?',
        a: 'Search is expanding beyond traditional blue-link results into AI answers, generative engines, social search, video, marketplaces and multi-platform discovery.'
      }
    ]
  },
  'performance-marketing': {
    id: 'performance-marketing',
    programTitle: 'SPECIALIZATION IN PERFORMANCE MARKETING',
    badge: '8-WEEK ADVANCED SPECIALIZATION PROGRAM',
    subHeading: 'Advanced Paid Media, Tracking, Attribution, Experimentation, Analytics & Scaling',
    duration: '45 Days',
    mode: 'On Campus, Pune',
    heroIntro: 'Performance Marketing & Growth Strategy is an intensive 8-week advanced specialization program designed for learners who want to move beyond basic digital advertising and develop expertise in paid media, growth strategy, tracking, attribution, analytics, experimentation, conversion optimization and campaign scaling.',
    heroImage: imgPerformanceMktg,
    overview: {
      highlight: 'Performance Marketing & Growth Strategy is an intensive 8-week advanced specialization program designed for learners who want to move beyond basic digital advertising and develop expertise in paid media, growth strategy, tracking, attribution, analytics, experimentation, conversion optimization and campaign scaling.',
      main: 'The program takes a business and profitability-driven approach to performance marketing. Learners explore advanced Google Ads, Meta Ads, LinkedIn Advertising, YouTube, Microsoft Advertising, Programmatic and Native Advertising alongside media planning, creative strategy, CRO, funnel engineering and lifecycle advertising.',
      expanded: [
        'A major focus is placed on measurement and growth economics, including CAC, LTV, LTV:CAC ratio, contribution margin, payback period, marginal ROAS, server-side tracking, postback URLs, attribution and incrementality.',
        'The program also integrates AI, automation, first-party data and privacy-first advertising into modern performance marketing operations.'
      ]
    },
    designedFor: [
      {
        title: 'Digital Marketing Students',
        icon: GraduationCap,
        text: 'Students seeking an advanced specialization in performance marketing, growth, and media buying.'
      },
      {
        title: 'Performance Marketers & Media Buyers',
        icon: TrendingUp,
        text: 'Performance Marketers and Media Buyers looking to level up to advanced attribution, tracking, and scaling.'
      },
      {
        title: 'Google & Meta Ads Professionals',
        icon: Target,
        text: 'PPC and paid social specialists seeking cross-platform media strategy, CRO, and server-side measurement.'
      },
      {
        title: 'Digital Marketing Executives & Managers',
        icon: Briefcase,
        text: 'Marketing leads looking to manage advertising budgets with profitability and ROI economics.'
      },
      {
        title: 'Agency Professionals & Consultants',
        icon: Users,
        text: 'Agency media buyers scaling client spend profitably across D2C, B2B, SaaS, and lead generation.'
      },
      {
        title: 'Entrepreneurs & Business Owners',
        icon: Zap,
        text: 'Business owners managing or auditing paid media investments and scaling unit economics.'
      },
      {
        title: 'Growth Marketers & Acquisition Leads',
        icon: Rocket,
        text: 'Growth specialists focusing on full-funnel acquisition, experimentation, and conversion optimization.'
      },
      {
        title: 'Freelancers & Paid Media Consultants',
        icon: UserCheck,
        text: 'Freelancers offering high-value media buying, tracking, attribution, and campaign audit services.'
      },
      {
        title: 'Budget & ROI Decision Makers',
        icon: Building2,
        text: 'Professionals managing advertising budgets and accountable for CAC, LTV, and contribution margins.'
      }
    ],
    keyReasons: [
      'Master advanced paid media strategies across major advertising platforms',
      'Understand CAC, LTV, ROAS, profitability and growth economics',
      'Learn advanced tracking, attribution and server-side measurement',
      'Develop media planning and budget allocation capabilities',
      'Master CRO, funnels and performance creative',
      'Learn systematic A/B testing and experimentation',
      'Use AI and automation for campaign operations and optimization',
      'Learn how to scale campaigns profitably, not simply increase ad spend',
      'Develop strategies across E-Commerce, D2C, B2B, SaaS, Lead Generation and other business models',
      'Build advanced skills applicable to careers, agencies, consulting and freelancing'
    ],
    keyReasonsFootnote: 'The curriculum spans paid media, analytics, tracking, attribution, CRO, creative experimentation, and performance scaling.',
    benefits: {
      students: {
        title: 'For Students',
        intro: 'Students can build a specialization beyond general Digital Marketing and prepare for roles in Performance Marketing, Paid Media, Growth Marketing and Media Buying.',
        heading: 'Master Paid Media & Growth Engineering',
        bullets: [
          'They will develop practical understanding of campaign strategy, tracking, analytics, CRO, creative testing, attribution and scaling.',
          'Build high-value portfolio projects across Google Ads, Meta Ads, tracking setups, and multi-channel media plans.',
          'Prepare for high-paying roles in performance marketing agencies and growth teams.'
        ]
      },
      business: {
        title: 'For Business Owners',
        intro: 'Business owners can learn how to evaluate advertising beyond clicks and leads by understanding CAC, LTV, ROAS, contribution margin and profitability.',
        heading: 'Maximize Ad Spend ROI & Growth Economics',
        bullets: [
          'Business owners can learn how to evaluate advertising beyond clicks and leads by understanding CAC, LTV, ROAS, contribution margin and profitability.',
          'This helps them make better decisions about budgets, agencies, channels, funnels and growth.',
          'Establish scalable paid acquisition loops without wasting budget on unoptimized campaigns.'
        ]
      },
      corporate: {
        title: 'For Corporate Employees',
        intro: 'Marketing professionals can upgrade from campaign execution to strategic performance management.',
        heading: 'Drive Strategic Media Operations',
        bullets: [
          'The program can help professionals develop capabilities in media planning, attribution, analytics, experimentation, automation and cross-channel growth strategy.',
          'Upgrade from campaign execution to strategic performance management and cross-channel optimization.',
          'Master server-side tracking, postback integrations, and executive ROI dashboards.'
        ]
      }
    },
    prerequisites: {
      intro: 'This is an advanced specialization program, so basic knowledge of Digital Marketing and online advertising is recommended. Learners should ideally understand:',
      bullets: [
        'Digital Marketing fundamentals',
        'Basic Google Ads and Meta Ads',
        'Marketing funnels and conversions',
        'Basic analytics and marketing metrics',
        'Customer targeting and campaign concepts'
      ],
      note: 'Prior professional experience is useful but not mandatory.'
    },
    outcomes: {
      intro: 'After completing the program, learners should be able to:',
      bullets: [
        'Develop performance and growth marketing strategies',
        'Plan full-funnel paid media campaigns',
        'Work with advanced Google, Meta, LinkedIn, YouTube and other advertising ecosystems',
        'Evaluate CAC, LTV, ROAS and profitability',
        'Build advanced tracking and measurement frameworks',
        'Understand server-side and postback tracking',
        'Analyze attribution and incrementality',
        'Develop CRO and experimentation programs',
        'Build performance creative testing systems',
        'Optimize budgets and scale campaigns',
        'Use AI and automation in campaign operations',
        'Create multi-channel growth strategies'
      ],
      projectsNote: 'The program culminates in advanced capstone work covering Google Ads, Meta scaling, media planning, tracking, attribution, CRO, creative testing, dashboards and multi-channel growth strategy.'
    },
    valueSequence: [
      'Media Planning',
      'Campaign Setup',
      'Server-Side Tracking',
      'Attribution & CRO',
      'Creative Testing',
      'Profitable Scaling'
    ],
    valueProposition: 'The value of the program lies in uniting advertising, analytics, growth economics, and experimentation to scale profitable revenue.',
    certifications: [
      {
        title: 'TEONOX Certification in Performance Marketing & Growth Strategy',
        badge: 'TEONOX ACADEMY',
        bgGradient: 'from-orange-50 to-amber-50',
        borderColor: '#FED7AA',
        type: 'teonox'
      },
      {
        title: 'Google Ads Search, Display & Video Certifications Support',
        badge: 'GOOGLE CERTIFIED',
        bgGradient: 'from-blue-50 to-indigo-50',
        borderColor: '#BFDBFE',
        type: 'google'
      },
      {
        title: 'Meta Certified Digital Marketing Associate & Media Buying Support',
        badge: 'META CERTIFIED',
        bgGradient: 'from-indigo-50 to-purple-50',
        borderColor: '#C7D2FE',
        type: 'meta'
      },
      {
        title: 'Google Analytics 4 (GA4) Professional Certification Support',
        badge: 'GA4 CERTIFIED',
        bgGradient: 'from-emerald-50 to-teal-50',
        borderColor: '#A7F3D0',
        type: 'google'
      }
    ],
    placementAssistance: {
      intro: 'Eligible learners can receive career support for Performance Marketing and related roles through tailored career services:',
      bullets: [
        'Resume and LinkedIn optimization tailored for Performance & Growth roles',
        'Portfolio and project preparation featuring live audit and media plan case studies',
        'Interview preparation and campaign scenario strategy',
        'Mock interviews with performance marketing leads and media buyers',
        'Career guidance and freelancing positioning',
        'Job opportunity assistance through TEONOX hiring networks'
      ],
      careerPaths: [
        'Performance Marketer',
        'Paid Media Specialist',
        'PPC Specialist',
        'Media Buyer',
        'Growth Marketer',
        'Acquisition Specialist',
        'Performance Marketing Analyst'
      ]
    },
    opportunities: {
      internships: {
        title: 'Practical Internship Exposure',
        note: 'Internship opportunities are subject to availability and applicable eligibility criteria.',
        items: [
          { title: 'Live advertising projects', iconName: 'Target' },
          { title: 'Campaign planning', iconName: 'LineChart' },
          { title: 'Google and Meta Ads projects', iconName: 'Zap' },
          { title: 'Tracking and analytics assignments', iconName: 'PieChart' },
          { title: 'CRO and creative testing', iconName: 'TrendingUp' },
          { title: 'Campaign optimization and reporting', iconName: 'BarChart' }
        ]
      },
      freelancing: {
        title: 'Freelancing & Performance Agency Services',
        note: 'The specialization can prepare learners to offer high-demand services to clients, brands, and agencies.',
        items: [
          { title: 'Google Ads Management', iconName: 'Search' },
          { title: 'Meta Ads Management', iconName: 'Share2' },
          { title: 'Performance Marketing', iconName: 'TrendingUp' },
          { title: 'Media Buying', iconName: 'DollarSign' },
          { title: 'Campaign Audits', iconName: 'FileText' },
          { title: 'Conversion Tracking Setup', iconName: 'Code' },
          { title: 'Analytics & Attribution', iconName: 'PieChart' },
          { title: 'Landing Page & Funnel Optimization', iconName: 'Layout' },
          { title: 'CRO Consulting', iconName: 'Wand2' },
          { title: 'Performance Creative Strategy', iconName: 'Sparkles' }
        ]
      }
    },
    faqs: [
      {
        q: '1. What is Performance Marketing & Growth Strategy?',
        a: 'It is an 8-week advanced specialization program focused on measurable, ROI-driven marketing using paid media, analytics, tracking, attribution, experimentation, CRO and growth strategies.'
      },
      {
        q: '2. Is this a beginner-level course?',
        a: 'No. This is an advanced specialization. Basic knowledge of Digital Marketing and paid advertising is recommended.'
      },
      {
        q: '3. What is the duration of the program?',
        a: 'The course duration is 8 weeks.'
      },
      {
        q: '4. Which advertising platforms are covered?',
        a: 'The curriculum covers advanced applications across Google Ads, Meta Ads, LinkedIn Ads, YouTube, Microsoft Advertising, Programmatic Advertising, Native Advertising and mobile/in-app advertising.'
      },
      {
        q: '5. Does the course cover Google Ads and Meta Ads in depth?',
        a: 'Yes. Dedicated advanced sections cover campaign architecture, audiences, bidding, tracking, automation, experimentation, optimization and scaling across Google and Meta.'
      },
      {
        q: '6. Will I learn tracking and attribution?',
        a: 'Yes. Advanced tracking architecture, server-side tagging, postback URLs, conversion tracking, multi-touch attribution, view-through attribution, incrementality and related measurement concepts are included.'
      },
      {
        q: '7. Does the course include AI?',
        a: 'Yes. The curriculum includes AI for campaign research, audience intelligence, media planning, ad copy and creative generation, predictive analytics, budget allocation, reporting, optimization and campaign operations.'
      },
      {
        q: '8. Will I learn how to scale advertising campaigns?',
        a: 'Yes. The program covers vertical and horizontal scaling, budget, bid, audience, creative, geographic and channel scaling along with marginal CAC, marginal ROAS and diminishing returns.'
      },
      {
        q: '9. Is this course useful for business owners?',
        a: 'Yes. It is particularly useful for owners who invest significantly in paid advertising and want to understand performance, profitability, measurement and scaling.'
      },
      {
        q: '10. Can I freelance after completing this program?',
        a: 'Yes. The skills are applicable to paid media management, tracking, campaign audits, analytics, CRO, consulting and performance marketing services.'
      },
      {
        q: '11. Does the course include practical projects?',
        a: 'Yes. The curriculum includes advanced capstone projects across Google Ads, Meta Ads, media planning, server-side tracking, postback integration, attribution, CRO, creative testing, marketing intelligence and multi-channel growth strategy.'
      },
      {
        q: '12. What makes this different from a regular Google Ads or Meta Ads course?',
        a: 'A platform course teaches you how to operate an advertising platform.\n\nPerformance Marketing & Growth Strategy teaches you how to use advertising, data, economics, creative, experimentation and technology together to drive measurable business growth.'
      }
    ]
  }
};
