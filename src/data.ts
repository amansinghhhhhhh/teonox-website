import { Program, ApproachPillar, ExperienceCard, Pillar5, WhyHirePoint, BlogPost } from './types';
import strategyImg from './assets/images/pillar_strategy_indian_1785390499539.webp';
import executionImg from './assets/images/pillar_execution_indian_1785390519555.webp';
import analyticsImg from './assets/images/pillar_analytics_indian_1785390534694.webp';
import aiImg from './assets/images/pillar_ai_indian_1785390549780.webp';
import salesImg from './assets/images/pillar_sales_indian_1785390566755.webp';
import top25SkillsImg from './assets/Top-25-High-Income-Skills-to-Learn-in-2026.webp';
import digitalMarketingRoadmapImg from './assets/Digital-Marketing-Roadmap-for-Beginners-2026.webp';
import aiSkillsImg from './assets/AI-Skills-Everyone-Should-Learn-in-2026-Before-They-Become-Essential.webp';

export const HERO_DATA = {
  headline: "Build the Skills Businesses Actually Hire For.",
  subtitle: "Master in-demand business skills like Digital Marketing, AI, Automation, Data Analytics & Digital Sales to get hired or get promoted."
};

export const PROGRAMS_DATA = {
  sectionTag: "Our Programs",
  sectionHeader: "Explore Our Programs",
  sectionDescription: "Practical, immersive programs designed to help you build skills that businesses actually hire for.",
  programs: [
    {
      id: "business-digital-marketing-ai",
      title: "Business Digital Marketing With AI",
      repeatedTitle: "Business Digital Marketing With AI",
      description: "Become a complete digital marketer, trained across AI, SEO, paid ads, analytics, and business growth.",
      duration: "6 Months",
      durationText: "6 Months | 4 Capstone Projects",
      certText: "Official Certification from TEONOX & Google",
      targetText: "Designed for Graduates, Career Switchers & Founders",
      durationLabel: "Duration",
      eligibility: "12th Passed, Graduates & Working Professionals",
      eligibilityLabel: "Eligibility",
      mode: "On Campus, Pune",
      modeLabel: "Mode",
      buttonText: "View Program"
    },
    {
      id: "performance-marketing",
      title: "Specialization in Performance Marketing",
      repeatedTitle: "Specialization in Performance Marketing",
      description: "Advanced Paid Media, Tracking, Attribution, Experimentation, Analytics & Scaling.",
      duration: "45 Days",
      durationText: "45 Days | 2 Live Ad Campaigns",
      certText: "Google Ads & Meta Certified Partner Credential",
      targetText: "Designed for Working Professionals & Marketers",
      durationLabel: "Duration",
      eligibility: "12th Passed, Graduates & Working Professionals",
      eligibilityLabel: "Eligibility",
      mode: "On Campus, Pune",
      modeLabel: "Mode",
      buttonText: "View Program"
    },
    {
      id: "seo-specialization",
      title: "Specialization in Search Engine Optimization",
      repeatedTitle: "Specialization in Search Engine Optimization",
      description: "Advanced SEO, AI Search, Technical SEO, Digital Authority & Organic Growth.",
      duration: "45 Days",
      durationText: "45 Days | 2 Technical Audits",
      certText: "SEMrush & TEONOX SEO Specialist Certification",
      targetText: "Designed for Content Creators & Web Managers",
      durationLabel: "Duration",
      eligibility: "12th Passed, Graduates & Working Professionals",
      eligibilityLabel: "Eligibility",
      mode: "On Campus, Pune",
      modeLabel: "Mode",
      buttonText: "View Program"
    },
    {
      id: "social-media-marketing",
      title: "Specialization in Social Media Marketing",
      repeatedTitle: "Specialization in Social Media Marketing",
      description: "Social Media Strategy, Content Creation, Community Management, Analytics & Paid Social.",
      duration: "45 Days",
      durationText: "45 Days | 2 Live Campaigns",
      certText: "Meta & TEONOX Social Media Certification",
      targetText: "Designed for Content Creators & Marketers",
      durationLabel: "Duration",
      eligibility: "12th Passed, Graduates & Working Professionals",
      eligibilityLabel: "Eligibility",
      mode: "On Campus, Pune",
      modeLabel: "Mode",
      buttonText: "View Program"
    }
  ] as Program[],
  viewAllText: "View All Programs →"
};

export const APPROACH_DATA = {
  sectionTag: "The Teonox Approach",
  heading: "Learn. Apply. Lead",
  subtext: "Brands see what you have built, solved and delivered. Companies don't ask \"What did you study?\" They ask \"Can you execute & create impact?\"",
  pillars: [
    {
      badge: "Learning",
      title: "Learn",
      subtitle: "With Purpose",
      content: "We believe learning should be intentional and meaningful. By connecting knowledge with aspirations and real-world impact, we empower learners to build skills that matter, stay curious, and grow continuously. At TEONOX, learning is driven by purpose, not just by passing exams."
    },
    {
      badge: "Applying skills",
      title: "Apply",
      subtitle: "With Mindset",
      content: "Knowledge creates value only when put into action. We cultivate a growth mindset that encourages experimentation, resilience, and continuous improvement. Through hands-on learning and real-world practice, our learners develop the confidence to turn ideas into outcomes."
    },
    {
      badge: "Leadership",
      title: "Lead",
      subtitle: "With Ownership",
      content: "Leadership begins with accountability. We foster an ownership mindset where individuals take responsibility, embrace challenges, and act with integrity. By thinking long-term and leading with purpose, our learners create impact, inspire others, and drive meaningful change."
    }
  ] as ApproachPillar[]
};

export const LEARNING_EXPERIENCE_DATA = {
  sectionTag: "The Learning Experience",
  heading: "The TEONOX Learning Experience",
  subheading: "No lectures. No theory dumps. Just real work, real tools, real feedback.",
  cards: [
    {
      tag: "Live Brand ProjectsLive Projects",
      title: "Live Brand Projects",
      description: "Work on real business challenges, campaigns, and growth initiatives that build practical experience."
    },
    {
      tag: "AI & Future LabsAI & Future",
      title: "AI & Future Labs",
      description: "Learn how to use AI tools, automation platforms, and emerging technologies that modern businesses rely on."
    },
    {
      tag: "Industry MentorshipMentorship",
      title: "Industry Mentorship",
      description: "Learn from professionals, founders, and practitioners who bring real-world insights into the classroom."
    },
    {
      tag: "Business SimulationsSimulations",
      title: "Business Simulations",
      description: "Solve realistic business scenarios, make decisions, and experience how companies operate."
    },
    {
      tag: "Agency ExposureAgency",
      title: "Agency & Industry Exposure",
      description: "Gain first-hand exposure to agencies, startups, and growth-focused organizations through visits and interactions."
    },
    {
      tag: "Portfolio & Career DevelopmentPortfolio",
      title: "Portfolio & Career Development",
      description: "Build projects, presentations, and case studies that showcase your skills to future employers."
    }
  ] as ExperienceCard[]
};

export const ABOUT_DATA = {
  sectionTag: "About TEONOX",
  heading: "12+ Years in Industry Led Us Here.",
  intro: "TEONOX wasn't created in a classroom.",
  paragraphs: [
    "For over 12 years, A2 Digital has partnered with businesses to help them grow in an increasingly digital world. Along the way, we hired fresh graduates, trained teams, worked with ambitious professionals, and helped organizations scale.",
    "And we kept noticing the same pattern.",
    "Many candidates had qualifications. Few had practical business exposure.",
    "Most understood concepts. Very few understood execution.",
    "TEONOX is our response to that challenge.",
    "A learning ecosystem designed by practitioners who have spent years building businesses, solving growth problems, and developing teams."
  ],
  imageLabel: "Team at work"
};

export const CURRICULUM_PILLARS_DATA = {
  sectionTag: "Curriculum Pillars",
  heading: "The 5 Pillars of the Program",
  pillars: [
    {
      title: "Strategy",
      description: "How businesses think, position, grow, and decide",
      image: strategyImg
    },
    {
      title: "Execution",
      description: "Campaigns, projects, and operational workflows",
      image: executionImg
    },
    {
      title: "Analytics",
      description: "Data, reporting, and decision-making insights",
      image: analyticsImg
    },
    {
      title: "AI",
      description: "Modern AI for productivity and automation",
      image: aiImg
    },
    {
      title: "Sales Mindset",
      description: "Communication, persuasion, and influence",
      image: salesImg
    }
  ] as Pillar5[]
};

export const CAREER_PATHS_DATA = {
  sectionTag: "Career Paths",
  heading: "Where You'll Go From Here",
  rolesHeading: "Career Roles",
  roles: [
    "Digital Marketing Executive",
    "Growth Associate",
    "Performance Marketer",
    "Business Analyst",
    "Sales & Growth Associate",
    "AI Operations Associate",
    "Content Strategist"
  ],
  industriesHeading: "Industries",
  industries: [
    "Startups",
    "Agencies",
    "SaaS Companies",
    "E-commerce",
    "Consulting",
    "Media & Technology"
  ],
  bottomTagline: "You don't just become job-ready. You become business-ready."
};

export const WORK_WITH_US_DATA = {
  sectionTag: "Work With Us",
  heading: "Work With TEONOX. Shape the Next Generation of Business Leaders.",
  subheading: "We collaborate with industry professionals who believe education should create impact, not just certificates.",
  points: [
    "Business-first learning environment",
    "Premium learner audience",
    "Long-term collaboration mindset",
    "Freedom to teach real-world thinking"
  ],
  trainerLabel: "Trainer speaking"
};

export const HIRE_FROM_US_DATA = {
  sectionTag: "Hire From Us",
  heading: "Hire Business-Ready Talent in Pune.",
  subheading: "Not Just Certified Candidates.",
  description: "TEONOX, Pune's practical Corporate AI automation training institute, prepares learners through hands-on projects, real industry exposure, AI-powered workflows, and live business challenges so you hire execution-ready professionals in Digital Marketing, AI & Automation, Data Analytics, and Sales, right here in Pune.",
  btn1: "Request Talent",
  btn2: "Speak to Our Team",
  whoTag: "Who You Can Hire From TEONOX",
  whoHeading: "Trained for Impact. Ready to Contribute.",
  hireableRoles: [
    "Digital Marketing & Growth Professionals",
    "AI & Business Analytics Talent",
    "Sales & Revenue Operations Professionals",
    "Full-Stack Business Growth Professionals"
  ],
  whyTag: "Why Hire From TEONOX",
  whyPoints: [
    {
      title: "Trained on real business scenarios",
      description: "Learners work on actual brand projects, live campaigns, and business challenges, not textbook theory."
    },
    {
      title: "AI & data-first mindset",
      description: "Every professional is trained to leverage AI tools, analytics platforms, and data-driven decision making."
    },
    {
      title: "Strong communication & sales",
      description: "Built with soft skills, confidence, and business acumen needed to thrive in client-facing roles."
    },
    {
      title: "Outcome-driven execution",
      description: "Hire people who think in terms of impact, metrics, and results, not just task completion."
    }
  ] as WhyHirePoint[]
};

export const INSIGHTS_DATA = {
  sectionTag: "Insights",
  heading: "Blog / Insights",
  subheading: "Business growth, AI in decision making, marketing & sales psychology, and career advice.",
  viewAllBtn: "View All",
  posts: [
    {
      id: "post-1",
      category: "Career Development",
      title: "Top 25 High-Income Skills to Learn in 2026",
      excerpt: "The work environment is changing faster than it has ever been. Innovations in artificial intelligence, automation, and cloud technology are redefining high-income skill sets.",
      author: "By TEONOX Team",
      date: "08/07/2026",
      readTime: "6 min read",
      image: top25SkillsImg,
      content: [
        "The work environment is changing faster than it has ever been. Innovations in artificial intelligence, automation, and cloud technology are redefining what high-income skills look like across modern industries.",
        "To stay competitive, professionals need to cultivate skills that blend technical execution with business strategy, performance marketing, data analysis, and AI-driven workflows.",
        "At TEONOX, our curriculum equips learners with these exact high-demand capabilities through practical, practitioner-led projects and real-world brand challenges."
      ]
    },
    {
      id: "post-2",
      category: "Digital Marketing",
      title: "Digital Marketing Roadmap for Beginners (2026): A Complete Step-by-Step Guide",
      excerpt: "Marketing in the digital age is one of the fastest-growing professions around the world. Discover the complete step-by-step roadmap to build a successful growth career.",
      author: "By TEONOX Team",
      date: "08/07/2026",
      readTime: "8 min read",
      image: digitalMarketingRoadmapImg,
      content: [
        "Marketing in the digital age is one of the fastest-growing professions around the world. From startups to multi-national enterprises, companies require growth marketers who can drive measurable business results.",
        "A successful roadmap begins with understanding foundational marketing psychology, mastering paid media algorithms across Google and Meta, optimizing organic search through technical SEO, and utilizing AI for rapid content & campaign scaling.",
        "Follow this structured pathway to transition from absolute beginner to an execution-focused digital marketing specialist."
      ]
    },
    {
      id: "post-3",
      category: "AI & Future Work",
      title: "AI Skills Everyone Should Learn in 2026 (Before They Become Essential)",
      excerpt: "Artificial Intelligence (AI) is no longer reserved for software engineers. Discover the essential AI tools, prompt engineering, and workflow automation skills you need today.",
      author: "By TEONOX Team",
      date: "08/07/2026",
      readTime: "5 min read",
      image: aiSkillsImg,
      content: [
        "Artificial Intelligence (AI) is not just for software engineers or large tech conglomerates. In 2026, AI Literacy has become a baseline requirement for professionals across marketing, sales, strategy, and operations.",
        "Mastering prompt engineering, workflow automation, autonomous AI agents, and data synthesis will set you apart in any modern organization.",
        "Discover how learning these essential AI skills today prepares you to lead growth initiatives and maximize your daily output."
      ]
    }
  ] as BlogPost[]
};

export const CONTACT_DATA = {
  sectionTag: "Contact",
  heading: "Let's Talk About Your Growth",
  subheading: "Ready to build skills that matter? Fill out the form and our team will reach out shortly.",
  labels: {
    fullName: "Full Name",
    fullNamePlaceholder: "Your full name",
    email: "Email Address",
    emailPlaceholder: "you@example.com",
    phone: "Phone Number",
    phonePlaceholder: "+91 98765 43210",
    interest: "I'm interested in",
    interestPlaceholder: "Select an option",
    message: "Your Message",
    messagePlaceholder: "Tell us about yourself or what you're looking for...",
    sendBtn: "Send Message"
  }
};

export const FOOTER_DATA = {
  brand: "TEONOX",
  brandDesc: "Building industry-ready professionals through experiential, practitioner-led learning. Bridging the gap between education and execution.",
  ctaBtn: "Enquire Now",
  quickLinksTag: "Quick Links",
  links: [
    "Home",
    "About",
    "Program",
    "Hire From Us",
    "More",
    "Careers",
    "Insights",
    "Contact",
    "Privacy Policy"
  ],
  contactTag: "Contact",
  address: "Office No. 13, 4th Floor, Revolution Mall, Near City Pride Multiplex, Kothrud, Pune - 411038",
  email: "info@teonox.com",
  phone: "+91-808-717-7760",
  copyright: "© 2026 TEONOX. All rights reserved. Powered by A2 Digital."
};
