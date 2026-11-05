import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, Loader2, Send } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { BreadcrumbSchema } from '../../components/schema/BreadcrumbSchema';
import { CollapsibleSection } from '../../components/enquiry/CollapsibleSection';
import { FormField, SelectControl, inputClass } from '../../components/enquiry/FormField';
import { OptionPills } from '../../components/enquiry/OptionPills';
import { PhotoUploadField } from '../../components/enquiry/PhotoUploadField';
import { PhoneOtpInline } from '../../components/PhoneOtpInline';
import { submitForm } from '../../services/formService';
import { redirectToThankYou } from '../../utils/thankYou';
import { shouldVerifyOtp } from '../../hooks/usePhoneOtp';
import { ORG, BASE_URL } from '../../utils/schema';
import { EASE_OUT } from '../../utils/easing';
import { gtag } from '../../utils/analytics';
import { compressImage } from '../../utils/image';
import {
  CAREER_GOAL_OPTIONS,
  CURRENT_STATUS_OPTIONS,
  DISCOVERY_SOURCE_OPTIONS,
  GENDER_OPTIONS,
  KNOWLEDGE_STATUS_OPTIONS,
  PREFERRED_BATCH_OPTIONS,
  PREFERRED_MODE_OPTIONS,
  QUALIFICATION_OPTIONS,
  STATE_OPTIONS,
  TIMELINE_OPTIONS,
  WORK_EXPERIENCE_OPTIONS,
} from './enquiryFields';
import {
  DEFAULT_ENQUIRY_VALUES,
  EnquiryErrors,
  EnquiryFormData,
  SectionId,
} from './enquiryTypes';
import {
  SECTION_LABELS,
  SECTION_ORDER,
  firstErrorSection,
  sectionForField,
  showKnowledgeSpecification,
  showProfessionalFields,
  validateEnquiryForm,
} from './enquiryValidation';
import { clearEnquiryDraft, loadEnquiryDraft, useEnquiryDraft } from './useEnquiryDraft';

const SECTION_SUMMARIES: Record<SectionId, string> = {
  personal: 'Live selfie, contact details and address',
  education: 'Qualification and college details',
  professional: 'Your current status and work details',
  training: 'Mode, batch timing and start date',
  career: 'What you want to achieve',
  knowledge: 'Your current digital marketing exposure',
  discovery: 'Where you heard about TEONOX',
};

/** "Other" selections append their free-text answer into the same column. */
const withOther = (value: string, other: string): string =>
  value === 'Other' && other.trim() ? `${value} - ${other.trim()}` : value;

export function EnquiryFormPage() {
  // Restored draft (text fields only — the photo is never persisted).
  const [restoredValues] = useState<EnquiryFormData | null>(() => {
    const draft = loadEnquiryDraft();
    return draft ? { ...DEFAULT_ENQUIRY_VALUES, ...draft } : null;
  });
  const [values, setValues] = useState<EnquiryFormData>(restoredValues || DEFAULT_ENQUIRY_VALUES);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [collapsed, setCollapsed] = useState<Record<SectionId, boolean>>(
    () => Object.fromEntries(SECTION_ORDER.map((id) => [id, true])) as Record<SectionId, boolean>,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [verifiedPhone, setVerifiedPhone] = useState<string | null>(null);
  const [draftNotice, setDraftNotice] = useState(Boolean(restoredValues));

  const phoneDigits = values.phone.replace(/\D/g, '');
  const phoneVerified = verifiedPhone !== null && verifiedPhone === phoneDigits;

  // Company / Experience / Designation exist ONLY for working statuses.
  // Derived once here so the render guard and the validator can never drift.
  const showProfessional = showProfessionalFields(values.currentStatus);

  const setField = useCallback(<K extends keyof EnquiryFormData>(
    key: K,
    value: EnquiryFormData[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  /**
   * Switching away from a conditional choice clears its dependent answers so
   * hidden values never leak into the submitted payload.
   */
  const setCurrentStatus = (status: string) => {
    setValues((prev) => ({
      ...prev,
      currentStatus: status,
      ...(showProfessionalFields(status)
        ? {}
        : { companyName: '', workExperience: '', designation: '' }),
      ...(status === 'Other' ? {} : { currentStatusOther: '' }),
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.currentStatus;
      delete next.currentStatusOther;
      delete next.companyName;
      delete next.workExperience;
      delete next.designation;
      return next;
    });
  };

  const setKnowledgeStatus = (status: string) => {
    setValues((prev) => ({
      ...prev,
      knowledgeStatus: status,
      ...(showKnowledgeSpecification(status) ? {} : { knowledgeSpecification: '' }),
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.knowledgeStatus;
      delete next.knowledgeSpecification;
      return next;
    });
  };

  const setCareerGoal = (goal: string) => {
    setValues((prev) => ({
      ...prev,
      careerGoal: goal,
      ...(goal === 'Other' ? {} : { careerGoalOther: '' }),
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.careerGoal;
      delete next.careerGoalOther;
      return next;
    });
  };

  const setDiscoverySource = (source: string) => {
    setValues((prev) => ({
      ...prev,
      discoverySource: source,
      ...(source === 'Other' ? {} : { discoverySourceOther: '' }),
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.discoverySource;
      delete next.discoverySourceOther;
      return next;
    });
  };

  // Debounced draft autosave, flushed before the page unloads.
  const flushDraft = useEnquiryDraft(values);
  useEffect(() => {
    const onHide = () => flushDraft();
    window.addEventListener('pagehide', onHide);
    return () => window.removeEventListener('pagehide', onHide);
  }, [flushDraft]);

  /** Expands every erroring section and scrolls the first one into view. */
  const revealFirstError = (nextErrors: EnquiryErrors) => {
    const failing = new Set(
      Object.keys(nextErrors).map((field) => sectionForField(field)),
    );
    setCollapsed((prev) => {
      const next = { ...prev };
      failing.forEach((id) => {
        next[id] = true;
      });
      return next;
    });

    const first = firstErrorSection(nextErrors);
    if (!first) return;

    // Let the sections expand before measuring the scroll target.
    window.setTimeout(() => {
      const section = document.getElementById(`section-${first}`);
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setFormError('');

    const nextErrors = validateEnquiryForm(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      revealFirstError(nextErrors);
      return;
    }

    if (shouldVerifyOtp('Enquiry Form', values.phone) && !phoneVerified) {
      setFormError('Please verify your Phone Number with OTP to submit.');
      setCollapsed((prev) => ({ ...prev, personal: true }));
      window.setTimeout(() => {
        document.getElementById('section-personal')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 120);
      return;
    }

    setIsSubmitting(true);
    try {
      // Compress locally first — the webhook base64-encodes whatever we send.
      const photo = values.photo ? await compressImage(values.photo) : null;
      const whatsappValue = values.whatsappSameAsPhone
        ? values.phone
        : values.whatsapp.trim();

      const fields: Record<string, string | File> = {
        // Keys match the Sheet columns verbatim.
        Photo: photo || '',
        'Full Name': values.fullName.trim(),
        "Father's Name": values.fatherName.trim(),
        "Father's Occupation": values.fatherOccupation.trim(),
        'Phone Number': values.phone.trim(),
        'WhatsApp Number': whatsappValue,
        'Email Address': values.email.trim(),
        'Date of Birth': values.dateOfBirth,
        Gender: values.gender,
        'Place of Birth': values.placeOfBirth.trim(),
        City: values.city.trim(),
        State: values.state,
        'Pin Code': values.pinCode.trim(),
        'Highest Qualification': values.highestQualification,
        'Field of Study': values.fieldOfStudy.trim(),
        'College / University Name': values.collegeUniversity.trim(),
        'Current Status': withOther(values.currentStatus, values.currentStatusOther),
        'Company Name': values.companyName.trim(),
        'Work Experience': values.workExperience,
        Designation: values.designation.trim(),
        'Preferred Mode': values.preferredMode,
        'Preferred Batch': values.preferredBatch,
        'Timeline to Start': values.timelineToStart,
        'Career Goal': withOther(values.careerGoal, values.careerGoalOther),
        'Digital Marketing Knowledge': values.knowledgeStatus,
        'Knowledge Specification': values.knowledgeSpecification.trim(),
        'Discovery Source': withOther(values.discoverySource, values.discoverySourceOther),
        // Final Sheet column. ISO-8601 so it sorts correctly as text; ignored
        // by the Apps Script if it appends its own timestamp instead.
        'Submission Date/Timestamp': new Date().toISOString(),

        // Top-level aliases consumed by formService's payload mapping.
        // Deliberately no `whatsapp` key: it would override `phone`
        // via `textFields.whatsapp || textFields.phone`.
        name: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),

        form_type: 'Enquiry Form',
        section_name: 'Enquiry Form Page',
        page_url: window.location.href,
      };

      await submitForm('Enquiry Form', fields);
      clearEnquiryDraft();
      gtag('event', 'generate_lead', { form_name: 'Enquiry Form' });
      redirectToThankYou('Enquiry Form', 'enquiry-form');
    } catch {
      setIsSubmitting(false);
      setFormError('Something went wrong. Please try again.');
    }
  };

  // Error count per section drives the header badge.
  const errorCounts = useMemo(() => {
    const counts = Object.fromEntries(SECTION_ORDER.map((id) => [id, 0])) as Record<
      SectionId,
      number
    >;
    Object.keys(errors).forEach((field) => {
      counts[sectionForField(field)] += 1;
    });
    return counts;
  }, [errors]);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="bg-[#FBF9F7] min-h-screen pt-24 sm:pt-28 pb-24 text-[#111111]">
      <SEO
        title="Enquiry Form | TEONOX"
        description="Fill out the TEONOX enquiry form for digital marketing and AI course admissions in Pune. Get callback support for classroom and online programmes."
        canonical="/enquiry-form"
        robots="noindex, nofollow"
        jsonLd={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'ContactPage',
              '@id': `${BASE_URL}/enquiry-form/#webpage`,
              url: `${BASE_URL}/enquiry-form`,
              name: 'TEONOX Enquiry Form',
              description:
                'Enquiry form for digital marketing and AI course admissions in Pune.',
              isPartOf: { '@id': `${BASE_URL}/#website` },
              about: { '@id': ORG['@id'] },
            },
            ORG,
          ],
        }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Enquiry Form', path: '/enquiry-form' },
        ]}
      />

      <div className="w-[88%] max-w-3xl mx-auto">
        {/* ── Header ─────────────────────────────────────────── */}
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#F15A29]">
            Admissions Enquiry
          </span>
          <h1 className="font-sora text-base sm:text-lg font-bold text-[#201A17] leading-[1.15] tracking-tight mb-3">
            Tell us about yourself
          </h1>
          <p className="font-inter text-sm sm:text-base text-[#201A17] mt-2 max-w-xl mx-auto leading-relaxed">
            Fill in the details below and our admissions team will call you back
            with the right programme, batch and career path.
          </p>
        </motion.header>

        {draftNotice ? (
          <div className="mb-6 flex items-start gap-3 p-5 rounded-2xl border border-[#F1EAE4] bg-[#FEFAF8] shadow-sm">
            <AlertCircle size={16} className="text-[#F15A29] shrink-0 mt-0.5" />
            <p className="font-inter text-sm text-[#201A17] flex-1">
              We restored your saved draft. Please capture your photo again — it
              isn't saved between visits.
            </p>
            <button
              type="button"
              onClick={() => setDraftNotice(false)}
              className="font-sora text-sm font-semibold text-[#201A17] hover:text-[#F15A29] cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        ) : null}

        {/* ── Form ───────────────────────────────────────────── */}
        <form noValidate onSubmit={handleSubmit} className="space-y-5">
          {/* 1 · Personal Information */}
          <CollapsibleSection
            sectionId="personal"
            step={1}
            title={SECTION_LABELS.personal}
            summary={SECTION_SUMMARIES.personal}
            errorCount={errorCounts.personal}
            open={collapsed.personal}
            onOpenChange={(open) => setCollapsed((p) => ({ ...p, personal: open }))}
          >
            <div className="space-y-5">
              <PhotoUploadField
                file={values.photo}
                onChange={(file) => setField('photo', file)}
                error={errors.photo}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Full Name" required error={errors.fullName}>
                  {({ id }) => (
                    <input
                      id={id}
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Rahul Sharma"
                      value={values.fullName}
                      aria-invalid={Boolean(errors.fullName)}
                      onChange={(e) => setField('fullName', e.target.value)}
                      className={inputClass(Boolean(errors.fullName))}
                    />
                  )}
                </FormField>

                <FormField label="Father's Name" required error={errors.fatherName}>
                  {({ id }) => (
                    <input
                      id={id}
                      type="text"
                      placeholder="e.g. Suresh Sharma"
                      value={values.fatherName}
                      aria-invalid={Boolean(errors.fatherName)}
                      onChange={(e) => setField('fatherName', e.target.value)}
                      className={inputClass(Boolean(errors.fatherName))}
                    />
                  )}
                </FormField>

                <FormField
                  label="Father's Occupation"
                  required
                  error={errors.fatherOccupation}
                >
                  {({ id }) => (
                    <input
                      id={id}
                      type="text"
                      placeholder="e.g. Teacher, Business Owner"
                      value={values.fatherOccupation}
                      aria-invalid={Boolean(errors.fatherOccupation)}
                      onChange={(e) => setField('fatherOccupation', e.target.value)}
                      className={inputClass(Boolean(errors.fatherOccupation))}
                    />
                  )}
                </FormField>

                <FormField
                  label="Email Address"
                  required
                  error={errors.email}
                  hint="We'll send your programme details here."
                >
                  {({ id }) => (
                    <input
                      id={id}
                      type="email"
                      autoComplete="email"
                      placeholder="rahul@example.com"
                      value={values.email}
                      aria-invalid={Boolean(errors.email)}
                      onChange={(e) => setField('email', e.target.value)}
                      className={inputClass(Boolean(errors.email))}
                    />
                  )}
                </FormField>
              </div>

              {/* Phone + OTP */}
              <FormField
                label="Phone Number"
                required
                error={errors.phone}
                hint="Verify with OTP so we can call you back."
              >
                {({ id }) => (
                  <input
                    id={id}
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="+91 98765 43210"
                    value={values.phone}
                    aria-invalid={Boolean(errors.phone)}
                    onChange={(e) => {
                      setField('phone', e.target.value);
                      setVerifiedPhone(null);
                    }}
                    className={inputClass(Boolean(errors.phone))}
                  />
                )}
              </FormField>
              <PhoneOtpInline phone={values.phone} onVerifiedChange={setVerifiedPhone} />

              {/* WhatsApp */}
              <FormField
                label="WhatsApp Number"
                error={errors.whatsapp}
                hint="Leave empty if you don't use WhatsApp separately."
              >
                {({ id }) => (
                  <input
                    id={id}
                    type="tel"
                    inputMode="tel"
                    placeholder="+91 98765 43210"
                    value={values.whatsappSameAsPhone ? values.phone : values.whatsapp}
                    disabled={values.whatsappSameAsPhone}
                    aria-invalid={Boolean(errors.whatsapp)}
                    onChange={(e) => setField('whatsapp', e.target.value)}
                    className={`${inputClass(Boolean(errors.whatsapp))} disabled:opacity-60 disabled:cursor-not-allowed`}
                  />
                )}
              </FormField>
              <label className="flex items-center gap-2.5 -mt-2 cursor-pointer w-fit">
                <input
                  type="checkbox"
                  checked={values.whatsappSameAsPhone}
                  onChange={(e) => {
                    const same = e.target.checked;
                    setValues((prev) => ({
                      ...prev,
                      whatsappSameAsPhone: same,
                      whatsapp: same ? '' : prev.whatsapp,
                    }));
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.whatsapp;
                      return next;
                    });
                  }}
                  className="w-4 h-4 text-[#F15A29] rounded border-gray-300 focus:ring-[#F15A29] cursor-pointer"
                />
                <span className="font-inter text-sm text-[#201A17]">
                  WhatsApp same as Phone Number
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Date of Birth" required error={errors.dateOfBirth}>
                  {({ id }) => (
                    <input
                      id={id}
                      type="date"
                      max={today}
                      value={values.dateOfBirth}
                      aria-invalid={Boolean(errors.dateOfBirth)}
                      onChange={(e) => setField('dateOfBirth', e.target.value)}
                      className={`${inputClass(Boolean(errors.dateOfBirth))} cursor-pointer`}
                    />
                  )}
                </FormField>

                <FormField label="Place of Birth" required error={errors.placeOfBirth}>
                  {({ id }) => (
                    <input
                      id={id}
                      type="text"
                      placeholder="e.g. Pune"
                      value={values.placeOfBirth}
                      aria-invalid={Boolean(errors.placeOfBirth)}
                      onChange={(e) => setField('placeOfBirth', e.target.value)}
                      className={inputClass(Boolean(errors.placeOfBirth))}
                    />
                  )}
                </FormField>
              </div>

              <OptionPills
                legend="Gender"
                required
                options={GENDER_OPTIONS}
                value={values.gender}
                onChange={(v) => setField('gender', v)}
                error={errors.gender}
                columns="grid grid-cols-3 gap-2.5"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="City" required error={errors.city}>
                  {({ id }) => (
                    <input
                      id={id}
                      type="text"
                      autoComplete="address-level2"
                      placeholder="e.g. Pune"
                      value={values.city}
                      aria-invalid={Boolean(errors.city)}
                      onChange={(e) => setField('city', e.target.value)}
                      className={inputClass(Boolean(errors.city))}
                    />
                  )}
                </FormField>

                <FormField label="Pin Code" required error={errors.pinCode}>
                  {({ id }) => (
                    <input
                      id={id}
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      autoComplete="postal-code"
                      placeholder="e.g. 411038"
                      value={values.pinCode}
                      aria-invalid={Boolean(errors.pinCode)}
                      onChange={(e) =>
                        setField('pinCode', e.target.value.replace(/\D/g, '').slice(0, 6))
                      }
                      className={inputClass(Boolean(errors.pinCode))}
                    />
                  )}
                </FormField>
              </div>

              <FormField label="State" required error={errors.state}>
                {({ id }) => (
                  <SelectControl
                    id={id}
                    value={values.state}
                    aria-invalid={Boolean(errors.state)}
                    hasError={Boolean(errors.state)}
                    onChange={(e) => setField('state', e.target.value)}
                  >
                    <option value="">Select your state</option>
                    {STATE_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </SelectControl>
                )}
              </FormField>
            </div>
          </CollapsibleSection>

          {/* 2 · Educational Information */}
          <CollapsibleSection
            sectionId="education"
            step={2}
            title={SECTION_LABELS.education}
            summary={SECTION_SUMMARIES.education}
            errorCount={errorCounts.education}
            open={collapsed.education}
            onOpenChange={(open) => setCollapsed((p) => ({ ...p, education: open }))}
          >
            <div className="space-y-4">
              <FormField
                label="Highest Qualification"
                required
                error={errors.highestQualification}
              >
                {({ id }) => (
                  <SelectControl
                    id={id}
                    value={values.highestQualification}
                    aria-invalid={Boolean(errors.highestQualification)}
                    hasError={Boolean(errors.highestQualification)}
                    onChange={(e) => setField('highestQualification', e.target.value)}
                  >
                    <option value="">Select qualification</option>
                    {QUALIFICATION_OPTIONS.map((q) => (
                      <option key={q.value} value={q.value}>
                        {q.label}
                      </option>
                    ))}
                  </SelectControl>
                )}
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Field of Study" required error={errors.fieldOfStudy}>
                  {({ id }) => (
                    <input
                      id={id}
                      type="text"
                      placeholder="e.g. Commerce, Computer Science"
                      value={values.fieldOfStudy}
                      aria-invalid={Boolean(errors.fieldOfStudy)}
                      onChange={(e) => setField('fieldOfStudy', e.target.value)}
                      className={inputClass(Boolean(errors.fieldOfStudy))}
                    />
                  )}
                </FormField>

                <FormField
                  label="College / University Name"
                  required
                  error={errors.collegeUniversity}
                >
                  {({ id }) => (
                    <input
                      id={id}
                      type="text"
                      placeholder="e.g. Symbiosis University"
                      value={values.collegeUniversity}
                      aria-invalid={Boolean(errors.collegeUniversity)}
                      onChange={(e) => setField('collegeUniversity', e.target.value)}
                      className={inputClass(Boolean(errors.collegeUniversity))}
                    />
                  )}
                </FormField>
              </div>
            </div>
          </CollapsibleSection>

          {/* 3 · Professional Information */}
          <CollapsibleSection
            sectionId="professional"
            step={3}
            title={SECTION_LABELS.professional}
            summary={SECTION_SUMMARIES.professional}
            errorCount={errorCounts.professional}
            open={collapsed.professional}
            onOpenChange={(open) => setCollapsed((p) => ({ ...p, professional: open }))}
          >
            <div className="space-y-4">
              <OptionPills
                legend="Current Status"
                required
                options={CURRENT_STATUS_OPTIONS}
                value={values.currentStatus}
                onChange={setCurrentStatus}
                error={errors.currentStatus}
                columns="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
              />

              {values.currentStatus === 'Other' ? (
                <FormField label="Please specify" required error={errors.currentStatusOther}>
                  {({ id }) => (
                    <input
                      id={id}
                      type="text"
                      placeholder="Describe your current status"
                      value={values.currentStatusOther}
                      aria-invalid={Boolean(errors.currentStatusOther)}
                      onChange={(e) => setField('currentStatusOther', e.target.value)}
                      className={inputClass(Boolean(errors.currentStatusOther))}
                    />
                  )}
                </FormField>
              ) : null}

              {/* Strictly conditional: rendered only for Working Professional /
                  Business Owner / Freelancer. `showProfessional` is derived from
                  the same PROFESSIONAL_STATUSES list the validator uses, so the
                  inputs cannot render (or be required) for any other status. */}
              {showProfessional ? (
                <motion.div
                  key="professional-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Company Name" required error={errors.companyName}>
                      {({ id }) => (
                        <input
                          id={id}
                          type="text"
                          placeholder="e.g. Infosys"
                          value={values.companyName}
                          aria-invalid={Boolean(errors.companyName)}
                          onChange={(e) => setField('companyName', e.target.value)}
                          className={inputClass(Boolean(errors.companyName))}
                        />
                      )}
                    </FormField>

                    <FormField label="Designation" required error={errors.designation}>
                      {({ id }) => (
                        <input
                          id={id}
                          type="text"
                          placeholder="e.g. Marketing Executive"
                          value={values.designation}
                          aria-invalid={Boolean(errors.designation)}
                          onChange={(e) => setField('designation', e.target.value)}
                          className={inputClass(Boolean(errors.designation))}
                        />
                      )}
                    </FormField>
                  </div>

                  <FormField label="Work Experience" required error={errors.workExperience}>
                    {({ id }) => (
                      <SelectControl
                        id={id}
                        value={values.workExperience}
                        aria-invalid={Boolean(errors.workExperience)}
                        hasError={Boolean(errors.workExperience)}
                        onChange={(e) => setField('workExperience', e.target.value)}
                      >
                        <option value="">Select experience</option>
                        {WORK_EXPERIENCE_OPTIONS.map((w) => (
                          <option key={w.value} value={w.value}>
                            {w.label}
                          </option>
                        ))}
                      </SelectControl>
                    )}
                  </FormField>
                </motion.div>
              ) : null}
            </div>
          </CollapsibleSection>

          {/* 4 · Training Preference */}
          <CollapsibleSection
            sectionId="training"
            step={4}
            title={SECTION_LABELS.training}
            summary={SECTION_SUMMARIES.training}
            errorCount={errorCounts.training}
            open={collapsed.training}
            onOpenChange={(open) => setCollapsed((p) => ({ ...p, training: open }))}
          >
            <div className="space-y-4">
              <OptionPills
                legend="Preferred Mode"
                required
                options={PREFERRED_MODE_OPTIONS}
                value={values.preferredMode}
                onChange={(v) => setField('preferredMode', v)}
                error={errors.preferredMode}
              />
              <OptionPills
                legend="Preferred Batch"
                required
                options={PREFERRED_BATCH_OPTIONS}
                value={values.preferredBatch}
                onChange={(v) => setField('preferredBatch', v)}
                error={errors.preferredBatch}
              />
              <OptionPills
                legend="Timeline to Start"
                required
                options={TIMELINE_OPTIONS}
                value={values.timelineToStart}
                onChange={(v) => setField('timelineToStart', v)}
                error={errors.timelineToStart}
                columns="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
              />
            </div>
          </CollapsibleSection>

          {/* 5 · Career Goals */}
          <CollapsibleSection
            sectionId="career"
            step={5}
            title={SECTION_LABELS.career}
            summary={SECTION_SUMMARIES.career}
            errorCount={errorCounts.career}
            open={collapsed.career}
            onOpenChange={(open) => setCollapsed((p) => ({ ...p, career: open }))}
          >
            <div className="space-y-4">
              <FormField label="Career Goal" required error={errors.careerGoal}>
                {({ id }) => (
                  <SelectControl
                    id={id}
                    value={values.careerGoal}
                    aria-invalid={Boolean(errors.careerGoal)}
                    hasError={Boolean(errors.careerGoal)}
                    onChange={(e) => setCareerGoal(e.target.value)}
                  >
                    {CAREER_GOAL_OPTIONS.map((goal) => (
                      <option key={goal.value} value={goal.value}>
                        {goal.label}
                      </option>
                    ))}
                  </SelectControl>
                )}
              </FormField>

              {values.careerGoal === 'Other' ? (
                <FormField label="Please specify" required error={errors.careerGoalOther}>
                  {({ id }) => (
                    <input
                      id={id}
                      type="text"
                      placeholder="Describe your career goal"
                      value={values.careerGoalOther}
                      aria-invalid={Boolean(errors.careerGoalOther)}
                      onChange={(e) => setField('careerGoalOther', e.target.value)}
                      className={inputClass(Boolean(errors.careerGoalOther))}
                    />
                  )}
                </FormField>
              ) : null}
            </div>
          </CollapsibleSection>

          {/* 6 · Digital Marketing Knowledge */}
          <CollapsibleSection
            sectionId="knowledge"
            step={6}
            title={SECTION_LABELS.knowledge}
            summary={SECTION_SUMMARIES.knowledge}
            errorCount={errorCounts.knowledge}
            open={collapsed.knowledge}
            onOpenChange={(open) => setCollapsed((p) => ({ ...p, knowledge: open }))}
          >
            <div className="space-y-4">
              <FormField
                label="Digital Marketing Knowledge"
                required
                error={errors.knowledgeStatus}
              >
                {({ id }) => (
                  <SelectControl
                    id={id}
                    value={values.knowledgeStatus}
                    aria-invalid={Boolean(errors.knowledgeStatus)}
                    hasError={Boolean(errors.knowledgeStatus)}
                    onChange={(e) => setKnowledgeStatus(e.target.value)}
                  >
                    <option value="">Select your knowledge level</option>
                    {KNOWLEDGE_STATUS_OPTIONS.map((k) => (
                      <option key={k.value} value={k.value}>
                        {k.label}
                      </option>
                    ))}
                  </SelectControl>
                )}
              </FormField>

              {showKnowledgeSpecification(values.knowledgeStatus) ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <FormField
                    label="If Yes, Please Specify"
                    required
                    error={errors.knowledgeSpecification}
                    hint="Tools, channels or experience you already know."
                  >
                    {({ id }) => (
                      <input
                        id={id}
                        type="text"
                        placeholder="e.g. SEO, Meta Ads, Google Analytics"
                        value={values.knowledgeSpecification}
                        aria-invalid={Boolean(errors.knowledgeSpecification)}
                        onChange={(e) => setField('knowledgeSpecification', e.target.value)}
                        className={inputClass(Boolean(errors.knowledgeSpecification))}
                      />
                    )}
                  </FormField>
                </motion.div>
              ) : null}
            </div>
          </CollapsibleSection>

          {/* 7 · Discovery */}
          <CollapsibleSection
            sectionId="discovery"
            step={7}
            title={SECTION_LABELS.discovery}
            summary={SECTION_SUMMARIES.discovery}
            errorCount={errorCounts.discovery}
            open={collapsed.discovery}
            onOpenChange={(open) => setCollapsed((p) => ({ ...p, discovery: open }))}
          >
            <div className="space-y-4">
              <OptionPills
                legend="How did you discover us?"
                required
                options={DISCOVERY_SOURCE_OPTIONS}
                value={values.discoverySource}
                onChange={setDiscoverySource}
                error={errors.discoverySource}
                columns="grid grid-cols-2 sm:grid-cols-3 gap-2.5"
              />

              {values.discoverySource === 'Other' ? (
                <FormField label="Please specify" required error={errors.discoverySourceOther}>
                  {({ id }) => (
                    <input
                      id={id}
                      type="text"
                      placeholder="Tell us where you found us"
                      value={values.discoverySourceOther}
                      aria-invalid={Boolean(errors.discoverySourceOther)}
                      onChange={(e) => setField('discoverySourceOther', e.target.value)}
                      className={inputClass(Boolean(errors.discoverySourceOther))}
                    />
                  )}
                </FormField>
              ) : null}
            </div>
          </CollapsibleSection>

          {/* ── Consent + submit ─────────────────────────────── */}
          <div className="rounded-2xl border border-[#EFE9E3] bg-white p-5 shadow-[0_1px_3px_rgba(16,24,40,0.04)] space-y-4 sm:p-6">
            {formError ? (
              <div
                role="alert"
                className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[13px] font-medium"
              >
                {formError}
              </div>
            ) : null}

            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id="enquiry-consent"
                checked={values.consent}
                aria-invalid={Boolean(errors.consent)}
                onChange={(e) => setField('consent', e.target.checked)}
                className="mt-0.5 w-4 h-4 text-[#F15A29] rounded border-gray-300 focus:ring-[#F15A29] cursor-pointer"
              />
              <label
                htmlFor="enquiry-consent"
                className="text-sm sm:text-base text-[#201A17] cursor-pointer"
              >
                I agree to TEONOX's{' '}
                <a
                  href="/terms-and-conditions"
                  className="text-[#0066FF] hover:underline font-semibold"
                >
                  T&C
                </a>{' '}
                and{' '}
                <a
                  href="/privacy-policy"
                  className="text-[#0066FF] hover:underline font-semibold"
                >
                  Privacy Policy
                </a>
                . This consent overrides any DNC/NDNC registrations.
              </label>
            </div>
            {errors.consent ? (
              <p role="alert" className="font-inter text-[11.5px] text-[#DC2626] -mt-2">
                {errors.consent}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#F15A29] px-8 py-3.5 font-sora text-[15px] font-[700] tracking-[0.01em] text-white shadow-[0_4px_14px_rgba(241,90,41,0.28)] transition duration-200 ease-out hover:bg-[#D8420F] hover:shadow-[0_6px_18px_rgba(241,90,41,0.34)] flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 group"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Enquiry</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {!phoneVerified ? (
              <p className="text-center font-inter text-sm text-[#201A17]">
                Please verify your Phone Number with OTP to submit.
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
