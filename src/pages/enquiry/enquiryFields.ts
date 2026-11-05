// Single source of truth for every option list on the /enquiry-form page.
// Keep these in lockstep with the Google Sheet columns documented in the
// submission contract (human-readable keys are written verbatim).

export interface FieldOption {
  value: string;
  label: string;
}

const opt = (value: string): FieldOption => ({ value, label: value });

// ── Section 1 · Personal Information ────────────────────────────────────────

export const GENDER_OPTIONS: FieldOption[] = ['Male', 'Female', 'Other'].map(opt);

/** 28 states + 8 union territories. */
export const STATE_OPTIONS: FieldOption[] = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
].map(opt);

// ── Section 2 · Educational Information ─────────────────────────────────────

export const QUALIFICATION_OPTIONS: FieldOption[] = [
  '10th',
  '12th',
  'Diploma',
  'Graduate',
  'Post Graduate',
  'Others',
].map(opt);

// ── Section 3 · Professional Information ────────────────────────────────────

export const CURRENT_STATUS_OPTIONS: FieldOption[] = [
  'Student',
  'Job Seeker',
  'Working Professional',
  'Business Owner',
  'Freelancer',
  'Homemaker',
  'Other',
].map(opt);

export const WORK_EXPERIENCE_OPTIONS: FieldOption[] = [
  '0-1 Years',
  '1-3 Years',
  '3-5 Years',
  '5+ Years',
].map(opt);

// ── Section 4 · Training Preference ─────────────────────────────────────────

export const PREFERRED_MODE_OPTIONS: FieldOption[] = [
  'Classroom',
  'Online Live',
  'Self-Paced',
].map(opt);

export const PREFERRED_BATCH_OPTIONS: FieldOption[] = [
  'Morning',
  'Afternoon',
  'Evening',
  'Weekend',
].map(opt);

export const TIMELINE_OPTIONS: FieldOption[] = [
  'Immediately',
  'Within 1 month',
  '1-3 months',
  '3-6 months',
  'Just Exploring',
].map(opt);

// ── Section 5 · Career Goals ────────────────────────────────────────────────

/**
 * Exact product list. `Select` is the placeholder entry (empty value) so the
 * dropdown reads correctly and validation still treats it as "nothing chosen".
 */
export const CAREER_GOAL_OPTIONS: FieldOption[] = [
  { value: '', label: 'Select' },
  { value: 'Get a Job in Digital Marketing', label: 'Get a Job in Digital Marketing' },
  { value: 'Career Change', label: 'Career Change' },
  { value: 'Salary Growth', label: 'Salary Growth' },
  { value: 'Start Freelancing', label: 'Start Freelancing' },
  { value: 'Start a Digital Marketing Agency', label: 'Start a Digital Marketing Agency' },
  { value: 'Grow Existing Business', label: 'Grow Existing Business' },
  { value: 'Learn New Skills', label: 'Learn New Skills' },
  { value: 'Personal Branding', label: 'Personal Branding' },
  { value: 'Become a consultant', label: 'Become a consultant' },
  { value: 'Other', label: 'Other' },
];

// ── Section 6 · Digital Marketing Knowledge ─────────────────────────────────

export const KNOWLEDGE_STATUS_OPTIONS: FieldOption[] = [
  'Yes',
  'No',
  'Basic Knowledge',
].map(opt);

/** Knowledge statuses that make the "specify" field visible + required. */
export const KNOWLEDGE_SPECIFY_REQUIRED_FOR = ['Yes', 'Basic Knowledge'];

// ── Section 7 · Discovery ───────────────────────────────────────────────────

export const DISCOVERY_SOURCE_OPTIONS: FieldOption[] = [
  'Google Search/Ads',
  'Google Maps',
  'Website',
  'Facebook',
  'Instagram',
  'LinkedIn',
  'YouTube',
  'WhatsApp',
  'Friend/Referral',
  'Seminar',
  'Flyer',
  'Auto Branding',
  'College/Seminar',
  'Existing Student',
  'Other',
].map(opt);

export const OTHER_FREE_TEXT_LABEL = 'Please specify';
