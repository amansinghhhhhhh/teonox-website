// Section-by-section validation for the /enquiry-form page.
//
// Everything here is plain JS validation driven by the form element's
// `noValidate` attribute — native constraint validation is intentionally
// disabled because it fires on `required` fields inside collapsed
// (display:none) sections, producing invisible errors.

import {
  validateEmail,
  validatePhone,
  validateRequired,
} from '../../utils/validation';
import { validateImageFile } from '../../utils/image';
import {
  EnquiryErrors,
  EnquiryFormData,
  PROFESSIONAL_STATUSES,
  SectionId,
} from './enquiryTypes';
import { KNOWLEDGE_SPECIFY_REQUIRED_FOR } from './enquiryFields';

export const SECTION_ORDER: SectionId[] = [
  'personal',
  'education',
  'professional',
  'training',
  'career',
  'knowledge',
  'discovery',
];

export const SECTION_LABELS: Record<SectionId, string> = {
  personal: 'Personal Information',
  education: 'Educational Information',
  professional: 'Professional Information',
  training: 'Training Preference',
  career: 'Career Goals',
  knowledge: 'Digital Marketing Knowledge',
  discovery: 'Discovery',
};

/** True when the professional block (Company/Experience/Designation) shows. */
export const showProfessionalFields = (status: string): boolean =>
  PROFESSIONAL_STATUSES.includes(status);

/** True when the knowledge "specify" field is visible (Yes / Basic Knowledge). */
export const showKnowledgeSpecification = (status: string): boolean =>
  KNOWLEDGE_SPECIFY_REQUIRED_FOR.includes(status);

/** "Other" options across the form that reveal a free-text follow-up. */
const showOtherText = (value: string): boolean => value === 'Other';

/**
 * validatePhone rejects a `+91`/`0` prefixed number (it strips separators but
 * keeps the country code, producing 12 digits), while ContactPage's own
 * placeholder advertises `+91 98765 43210`. Normalize before delegating so
 * both formats pass.
 */
const isValidPhone = (raw: string): boolean => {
  let digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return validatePhone(digits);
};

/** Indian pin code: 6 digits, no leading zero. Kept as a string (leading zeros). */
const isValidPinCode = (raw: string): boolean => /^[1-9][0-9]{5}$/.test(raw.trim());

/** Minimum eligible age for the programmes. */
const MIN_AGE_YEARS = 16;

const isValidDateOfBirth = (raw: string): boolean => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) return false;
  const dob = new Date(`${raw}T00:00:00`);
  if (Number.isNaN(dob.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (dob > today) return false;

  const min = new Date(today);
  min.setFullYear(today.getFullYear() - MIN_AGE_YEARS);
  return dob <= min;
};

const required = (value: string, message: string): string | undefined =>
  validateRequired(value) ? undefined : message;

/**
 * Validates every section. Returns errors keyed by field name; a section is
 * considered failing when any of its fields appear in the result.
 */
export function validateEnquiryForm(values: EnquiryFormData): EnquiryErrors {
  const errors: EnquiryErrors = {};

  // ── Personal ──────────────────────────────────────────────────────────────
  const photoCheck = validateImageFile(values.photo);
  if (!photoCheck.valid && photoCheck.message) errors.photo = photoCheck.message;

  errors.fullName = required(values.fullName.trim(), 'Full Name is required.');
  errors.fatherName = required(values.fatherName.trim(), "Father's Name is required.");
  errors.fatherOccupation = required(
    values.fatherOccupation.trim(),
    "Father's Occupation is required.",
  );

  if (!values.phone.trim()) {
    errors.phone = 'Phone Number is required.';
  } else if (!isValidPhone(values.phone)) {
    errors.phone = 'Enter a valid 10-digit mobile number.';
  }

  // WhatsApp is optional, but when manually filled it must be a real number.
  // When "same as phone" is on it mirrors the phone value, so no check here.
  if (!values.whatsappSameAsPhone && values.whatsapp.trim() && !isValidPhone(values.whatsapp)) {
    errors.whatsapp = 'Enter a valid 10-digit WhatsApp number.';
  }

  errors.email = required(values.email.trim(), 'Email Address is required.');
  if (!errors.email && !validateEmail(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  errors.dateOfBirth = required(values.dateOfBirth, 'Date of Birth is required.');
  if (!errors.dateOfBirth && !isValidDateOfBirth(values.dateOfBirth)) {
    errors.dateOfBirth = `Enter a valid date (minimum age ${MIN_AGE_YEARS}).`;
  }

  errors.gender = required(values.gender, 'Gender is required.');
  errors.placeOfBirth = required(values.placeOfBirth.trim(), 'Place of Birth is required.');
  errors.city = required(values.city.trim(), 'City is required.');
  errors.state = required(values.state, 'State is required.');

  if (!values.pinCode.trim()) {
    errors.pinCode = 'Pin Code is required.';
  } else if (!isValidPinCode(values.pinCode)) {
    errors.pinCode = 'Enter a valid 6-digit pin code.';
  }

  // ── Education ─────────────────────────────────────────────────────────────
  errors.highestQualification = required(
    values.highestQualification,
    'Highest Qualification is required.',
  );
  errors.fieldOfStudy = required(values.fieldOfStudy.trim(), 'Field of Study is required.');
  errors.collegeUniversity = required(
    values.collegeUniversity.trim(),
    'College / University Name is required.',
  );

  // ── Professional (conditional) ────────────────────────────────────────────
  errors.currentStatus = required(values.currentStatus, 'Current Status is required.');
  if (showOtherText(values.currentStatus)) {
    errors.currentStatusOther = required(
      values.currentStatusOther.trim(),
      'Please specify your current status.',
    );
  }
  if (showProfessionalFields(values.currentStatus)) {
    errors.companyName = required(values.companyName.trim(), 'Company Name is required.');
    errors.workExperience = required(values.workExperience, 'Work Experience is required.');
    errors.designation = required(values.designation.trim(), 'Designation is required.');
  }

  // ── Training ──────────────────────────────────────────────────────────────
  errors.preferredMode = required(values.preferredMode, 'Preferred Mode is required.');
  errors.preferredBatch = required(values.preferredBatch, 'Preferred Batch is required.');
  errors.timelineToStart = required(values.timelineToStart, 'Timeline to Start is required.');

  // ── Career ────────────────────────────────────────────────────────────────
  errors.careerGoal = required(values.careerGoal, 'Career Goal is required.');
  if (showOtherText(values.careerGoal)) {
    errors.careerGoalOther = required(
      values.careerGoalOther.trim(),
      'Please specify your career goal.',
    );
  }

  // ── Knowledge ─────────────────────────────────────────────────────────────
  errors.knowledgeStatus = required(
    values.knowledgeStatus,
    'Digital Marketing Knowledge is required.',
  );
  if (showKnowledgeSpecification(values.knowledgeStatus)) {
    errors.knowledgeSpecification = required(
      values.knowledgeSpecification.trim(),
      'Please specify your knowledge.',
    );
  }

  // ── Discovery ─────────────────────────────────────────────────────────────
  errors.discoverySource = required(values.discoverySource, 'Please select how you discovered us.');
  if (showOtherText(values.discoverySource)) {
    errors.discoverySourceOther = required(
      values.discoverySourceOther.trim(),
      'Please specify how you discovered us.',
    );
  }

  // ── Consent ───────────────────────────────────────────────────────────────
  if (!values.consent) {
    errors.consent = 'Please accept the terms to continue.';
  }

  // Drop undefined entries so `Object.keys(errors)` only contains real failures.
  (Object.keys(errors) as (keyof EnquiryErrors)[]).forEach((key) => {
    if (errors[key] === undefined) delete errors[key];
  });

  return errors;
}

/** Maps field names to the section that owns them, for auto-expand + scroll. */
const FIELD_SECTIONS: Record<string, SectionId> = {
  photo: 'personal',
  fullName: 'personal',
  fatherName: 'personal',
  fatherOccupation: 'personal',
  phone: 'personal',
  whatsapp: 'personal',
  email: 'personal',
  dateOfBirth: 'personal',
  gender: 'personal',
  placeOfBirth: 'personal',
  city: 'personal',
  state: 'personal',
  pinCode: 'personal',

  highestQualification: 'education',
  fieldOfStudy: 'education',
  collegeUniversity: 'education',

  currentStatus: 'professional',
  currentStatusOther: 'professional',
  companyName: 'professional',
  workExperience: 'professional',
  designation: 'professional',

  preferredMode: 'training',
  preferredBatch: 'training',
  timelineToStart: 'training',

  careerGoal: 'career',
  careerGoalOther: 'career',

  knowledgeStatus: 'knowledge',
  knowledgeSpecification: 'knowledge',

  discoverySource: 'discovery',
  discoverySourceOther: 'discovery',

  consent: 'discovery',
};

/** Section owning a given field, defaulting to Personal. */
export function sectionForField(field: string): SectionId {
  return FIELD_SECTIONS[field] ?? 'personal';
}

/** Section owning a given error key, in document order. */
export function firstErrorSection(errors: EnquiryErrors): SectionId | null {
  for (const section of SECTION_ORDER) {
    const hasError = Object.keys(errors).some(
      (field) => sectionForField(field) === section,
    );
    if (hasError) return section;
  }
  return null;
}
