export interface Program {
  id: string;
  title: string;
  repeatedTitle: string;
  description: string;
  duration: string;
  durationLabel: string;
  eligibility: string;
  eligibilityLabel: string;
  mode: string;
  modeLabel: string;
  enrolledCount?: number;
  buttonText: string;
  image?: string;
  highlights?: string[];
  categories?: string[];
  durationText?: string;
  certText?: string;
  targetText?: string;
}

export interface ApproachPillar {
  badge: string;
  title: string;
  subtitle: string;
  content: string;
}

export interface ExperienceCard {
  tag: string;
  title: string;
  description: string;
}

export interface Pillar5 {
  title: string;
  description: string;
  image?: string;
}

export interface WhyHirePoint {
  title: string;
  description: string;
}

export interface BlogPost {
  id: string;
  slug?: string;
  category: string;
  categories?: string[];
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime?: string;
  image?: string;
  content?: string[];
  contentHtml?: string;
  link?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}
