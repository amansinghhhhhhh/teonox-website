// Shared types + default state for the /enquiry-form page.

export type SectionId =
  | 'personal'
  | 'education'
  | 'professional'
  | 'training'
  | 'career'
  | 'knowledge'
  | 'discovery';

export interface EnquiryFormData {
  // ── Personal Information ─────────────────────────────
  photo: File | null;
  fullName: string;
  fatherName: string;
  fatherOccupation: string;
  phone: string;
  whatsapp: string;
  whatsappSameAsPhone: boolean;
  email: string;
  dateOfBirth: string;
  gender: string;
  placeOfBirth: string;
  city: string;
  state: string;
  pinCode: string;

  // ── Educational Information ──────────────────────────
  highestQualification: string;
  fieldOfStudy: string;
  collegeUniversity: string;

  // ── Professional Information (conditional) ───────────
  currentStatus: string;
  currentStatusOther: string;
  companyName: string;
  workExperience: string;
  designation: string;

  // ── Training Preference ──────────────────────────────
  preferredMode: string;
  preferredBatch: string;
  timelineToStart: string;

  // ── Career Goals ─────────────────────────────────────
  careerGoal: string;
  careerGoalOther: string;

  // ── Digital Marketing Knowledge ──────────────────────
  knowledgeStatus: string;
  knowledgeSpecification: string;

  // ── Discovery ────────────────────────────────────────
  discoverySource: string;
  discoverySourceOther: string;

  // ── Consent ──────────────────────────────────────────
  consent: boolean;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryFormData, string>>;

/** Statuses that reveal Company Name / Work Experience / Designation. */
export const PROFESSIONAL_STATUSES = ['Working Professional', 'Business Owner', 'Freelancer'];

export const DEFAULT_ENQUIRY_VALUES: EnquiryFormData = {
  photo: null,
  fullName: '',
  fatherName: '',
  fatherOccupation: '',
  phone: '',
  whatsapp: '',
  whatsappSameAsPhone: false,
  email: '',
  dateOfBirth: '',
  gender: '',
  placeOfBirth: '',
  city: '',
  state: '',
  pinCode: '',

  highestQualification: '',
  fieldOfStudy: '',
  collegeUniversity: '',

  currentStatus: '',
  currentStatusOther: '',
  companyName: '',
  workExperience: '',
  designation: '',

  preferredMode: '',
  preferredBatch: '',
  timelineToStart: '',

  careerGoal: '',
  careerGoalOther: '',

  knowledgeStatus: '',
  knowledgeSpecification: '',

  discoverySource: '',
  discoverySourceOther: '',

  consent: false,
};
