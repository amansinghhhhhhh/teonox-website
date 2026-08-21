import { GraduationCap, Users, Lightbulb, Handshake, Compass, TrendingUp } from 'lucide-react';
import galleryImg1 from '../assets/images/life-at-teonox/svl05960.webp';
import galleryImg2 from '../assets/images/life-at-teonox/svl05964.webp';
import galleryImg3 from '../assets/images/life-at-teonox/svl05970.webp';
import galleryImg4 from '../assets/images/life-at-teonox/svl05973.webp';
import galleryImg5 from '../assets/images/life-at-teonox/svl05977.webp';
import galleryImg6 from '../assets/images/life-at-teonox/svl05980.webp';
import galleryImg7 from '../assets/images/life-at-teonox/svl05981.webp';
import pillarLearnImg from '../assets/images/culture-initiatives/learn.webp';
import pillarConnectImg from '../assets/images/culture-initiatives/connect.webp';
import pillarCreateImg from '../assets/images/culture-initiatives/create.webp';
import pillarCollaborateImg from '../assets/images/culture-initiatives/collaborate.webp';
import pillarExperienceImg from '../assets/images/culture-initiatives/experience.webp';
import pillarGrowImg from '../assets/images/culture-initiatives/grow.webp';


/* ---------- TEONOX Culture section data ---------- */

/* All initiative names + descriptions verbatim from "section for teonox culture.docx" */
export const CULTURE_PILLARS = [
  {
    icon: GraduationCap,
    title: 'LEARN',
    step: '01',
    banner: pillarLearnImg,
    desc: 'High-energy masterclasses, expert sessions and real challenges that keep you industry-ready.',
    initiatives: [
      {
        name: 'TEONOX Supersessions',
        desc: 'High-energy masterclasses and special sessions around trending industry topics, tools, careers and business.',
      },
      {
        name: 'Industry Experts at TEONOX',
        desc: 'Regular sessions where marketers, founders, creators, entrepreneurs and business leaders share real-world experiences.',
      },
      {
        name: 'Problem of the Week',
        desc: 'A real-world business problem is given to students to solve, discuss and present.',
      },
      {
        name: 'Behind the Brand',
        desc: 'Students learn how real brands build campaigns, products, communities and businesses.',
      },
      {
        name: 'Mentor Office Hours',
        desc: 'Dedicated time for informal one-on-one conversations with mentors.',
      },
    ],
  },
  {
    icon: Users,
    title: 'CONNECT',
    step: '02',
    banner: pillarConnectImg,
    desc: 'Coffee chats, open Q&As and founder conversations that grow your network.',
    initiatives: [
      {
        name: 'Coffee with TEONOX',
        desc: 'Informal conversations over coffee with founders, mentors, industry experts and interesting professionals.',
        priority: true,
      },
      {
        name: 'Ask Me Anything',
        desc: 'Open Q&A sessions where students can directly ask industry professionals about careers, business, marketing, AI and more.',
      },
      {
        name: 'Founder Fridays',
        desc: 'Conversations with startup founders about building businesses, failures, growth and decision-making.',
      },
    ],
  },
  {
    icon: Lightbulb,
    title: 'CREATE',
    step: '03',
    banner: pillarCreateImg,
    desc: 'Pitch ideas, ship campaigns and showcase your work to mentors and the industry.',
    initiatives: [
      {
        name: 'Idea Room',
        desc: 'Students pitch ideas, campaigns, businesses or solutions and receive feedback from mentors and peers.',
      },
      {
        name: 'TEONOX Challenge',
        desc: 'Short challenges where students compete individually or in teams to solve real business or marketing problems.',
      },
      {
        name: 'Creator Sessions',
        desc: 'Sessions with content creators, designers, influencers and personal-brand builders.',
      },
      {
        name: 'TEONOX Showcase',
        desc: 'Students present projects, campaigns, portfolios and ideas to mentors and industry professionals.',
      },
    ],
  },
  {
    icon: Handshake,
    title: 'COLLABORATE',
    step: '04',
    banner: pillarCollaborateImg,
    desc: 'Build with your batch, mentor each other and celebrate wins together.',
    initiatives: [
      {
        name: 'Build With Your Batch',
        desc: 'Collaborative activities where students from different skill areas work together and learn from each other.',
      },
      {
        name: 'TEONOX Community',
        desc: 'Celebrations, student activities, networking, achievements and informal campus moments.',
      },
      {
        name: 'TEONOX Unplugged',
        desc: 'Non-academic activities designed to help students connect, relax and build relationships.',
      },
    ],
  },
  {
    icon: Compass,
    title: 'EXPERIENCE',
    step: '05',
    banner: pillarExperienceImg,
    desc: 'Talks, industry visits and campus moments that make TEONOX feel like home.',
    initiatives: [
      {
        name: 'TEONOX Talks',
        desc: 'Short, engaging talks from people with interesting career journeys, ideas and experiences.',
      },
      {
        name: 'Industry Visits',
        desc: 'Visits to agencies, startups, companies and relevant workplaces to understand how the industry operates.',
      },
      {
        name: 'After-Hours TEONOX',
        desc: 'Casual evening activities, discussions, games, networking and community events outside regular classes.',
      },
    ],
  },
  {
    icon: TrendingUp,
    title: 'GROW',
    step: '06',
    banner: pillarGrowImg,
    desc: 'Career connections, mentor hours and spotlights that move you forward.',
    initiatives: [
      {
        name: 'Career Connect',
        desc: 'Informal interactions with recruiters and professionals around careers, interviews, skills and opportunities.',
      },
      {
        name: 'Student Spotlight',
        desc: 'Regularly feature students, their projects, achievements, journeys and ideas across TEONOX platforms.',
      },
    ],
  },
];

export const CULTURE_STATS = [
  { value: '1000+', label: 'Students Trained' },
  { value: '250+', label: 'Live Projects' },
  { value: '50+', label: 'Industry Mentors' },
  { value: '15+', label: 'Certifications' },
];

/* Placeholder speaker data — replace photos + names with real TEONOX guest speakers. */
export const CULTURE_EXPERTS = [
  {
    name: 'Aarav Mehta',
    role: 'Founder, GrowthLabs',
    topic: 'Start-up Mindset',
    image: 'https://cdn.pixabay.com/photo/2023/01/06/23/04/indian-businessman-7702279_1280.jpg',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Marketing, D2C Brands',
    topic: 'Personal Branding',
    image: '/images/experts/Priya Sharma.jpg',
  },
  {
    name: 'Rohan Kapoor',
    role: 'Performance Lead, MediaX',
    topic: 'Performance Marketing',
    image: 'https://cdn.pixabay.com/photo/2019/07/13/11/41/business-4334643_1280.jpg',
  },
  {
    name: 'Sneha Iyer',
    role: 'Content Director, StoryLabs',
    topic: 'Content Strategy',
    image: '/images/experts/Sneha Iyer.jpg',
  },
  {
    name: 'Karan Patel',
    role: 'AI Consultant & Educator',
    topic: 'AI in Marketing',
    image: 'https://cdn.pixabay.com/photo/2020/11/30/17/21/businessman-5791566_1280.jpg',
  },
  {
    name: 'Neha Gupta',
    role: 'Brand Strategist, AdAgency',
    topic: 'Business Storytelling',
    image: '/images/experts/Neha Gupta.jpg',
  },
];

/* Campus life, team collaborations and events at TEONOX. */
export const CULTURE_GALLERY = [
  {
    src: galleryImg1,
    alt: 'TEONOX students collaborating on a group project',
  },
  {
    src: galleryImg2,
    alt: 'Team collaboration during a TEONOX workshop',
  },
  {
    src: galleryImg3,
    alt: 'Students engaged in a live session at TEONOX',
  },
  {
    src: galleryImg4,
    alt: 'Campus life at TEONOX in Kothrud, Pune',
  },
  {
    src: galleryImg5,
    alt: 'Group discussion among TEONOX students',
  },
  {
    src: galleryImg6,
    alt: 'TEONOX students working together on real projects',
  },
  {
    src: galleryImg7,
    alt: 'An event at TEONOX with students and mentors',
  },
];