import React from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LegalShell, LegalSection, LegalBullets } from './LegalPageShell';
import { SEO } from './SEO';

const TOC = [
  { id: 'pp-1', title: 'Information We Collect' },
  { id: 'pp-2', title: 'How We Use Your Information' },
  { id: 'pp-3', title: 'Cookies' },
  { id: 'pp-4', title: 'Sharing of Information' },
  { id: 'pp-5', title: 'Data Security' },
  { id: 'pp-6', title: 'Data Retention' },
  { id: 'pp-7', title: 'Third-Party Services' },
  { id: 'pp-8', title: 'Your Rights' },
  { id: 'pp-9', title: "Children's Privacy" },
  { id: 'pp-10', title: 'Changes to This Privacy Policy' },
  { id: 'pp-11', title: 'Contact Us' },
];

interface PrivacyPolicyPageProps {
  onNavigate?: (href: string, label: string) => void;
}

export function PrivacyPolicyPage({ onNavigate }: PrivacyPolicyPageProps) {
  return (
    <>
      <SEO
        title="Privacy Policy | TEONOX"
        description="Read the TEONOX Privacy Policy — how we collect, use, store, and protect your personal information."
        canonical="/privacy-policy"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Privacy Policy — TEONOX',
          url: 'https://teonox.com/privacy-policy',
        }}
      />
    <LegalShell
      icon={ShieldCheck}
      label="Legal"
      title="Privacy Policy"
      subtitle={
        <>
          <p>
            At <strong className="text-[#F15A29]">TEONOX</strong> ("TEONOX", "we", "our", or "us"), we value your privacy
            and are committed to protecting the personal information you share with us. This Privacy Policy explains how
            we collect, use, store, disclose, and protect your information when you visit{' '}
            <a href="https://teonox.com" target="_blank" rel="noreferrer" className="text-[#F15A29] hover:underline font-medium">
              https://teonox.com
            </a>
            , submit an enquiry, apply for a program, or interact with our services.
          </p>
          <p>By using our website, you agree to the practices described in this Privacy Policy.</p>
        </>
      }
      effectiveDate="1 January 2025"
      appliesTo="teonox.com"
      toc={TOC}
      onNavigate={onNavigate}
    >
      <LegalSection id="pp-1" number={1} title="Information We Collect">
        <p>We may collect the following categories of information:</p>
        <p className="font-sora font-[700] text-[#111111] text-[16px] pt-1">Personal Information</p>
        <p>
          When you submit an enquiry, register for a program, book a counselling session, or contact us, we may collect:
        </p>
        <LegalBullets
          items={[
            'Full Name',
            'Email Address',
            'Phone Number',
            'City/Location',
            'Educational Background',
            'Professional Experience',
            'Course or Program Interest',
            'Any information voluntarily shared through forms, emails, WhatsApp, or phone calls',
          ]}
        />
        <p className="font-sora font-[700] text-[#111111] text-[16px] pt-1">Technical Information</p>
        <p>When you browse our website, we may automatically collect:</p>
        <LegalBullets
          items={[
            'IP Address',
            'Browser Type',
            'Device Information',
            'Operating System',
            'Website Usage Data',
            'Referral Source',
            'Cookies and Similar Tracking Technologies',
          ]}
        />
      </LegalSection>

      <LegalSection id="pp-2" number={2} title="How We Use Your Information">
        <p>We use your information to:</p>
        <LegalBullets
          items={[
            'Respond to your enquiries.',
            'Provide information about our programs and services.',
            'Process applications and admissions.',
            'Schedule counselling sessions.',
            'Improve our website and user experience.',
            'Send important updates regarding admissions, events, webinars, or learning opportunities.',
            'Communicate promotional offers (only where permitted by applicable law).',
            'Maintain internal records.',
            'Comply with legal obligations.',
          ]}
        />
      </LegalSection>

      <LegalSection id="pp-3" number={3} title="Cookies">
        <p>Our website may use cookies and similar technologies to:</p>
        <LegalBullets
          items={[
            'Improve website functionality',
            'Remember user preferences',
            'Analyse visitor behaviour',
            'Measure website performance',
            'Support marketing and remarketing campaigns',
          ]}
        />
        <p>
          You can disable cookies through your browser settings. However, some features of the website may not function
          properly.
        </p>
      </LegalSection>

      <LegalSection id="pp-4" number={4} title="Sharing of Information">
        <p>We do not sell, rent, or trade your personal information.</p>
        <p>We may share information with trusted third-party service providers solely for purposes such as:</p>
        <LegalBullets
          items={[
            'Website hosting',
            'CRM and lead management',
            'Email communication',
            'Analytics',
            'Payment processing (where applicable)',
            'Marketing automation',
            'Customer support',
          ]}
        />
        <p>These partners are required to protect your information and use it only for authorized purposes.</p>
        <p>We may also disclose information if required by law or to protect our legal rights.</p>
      </LegalSection>

      <LegalSection id="pp-5" number={5} title="Data Security">
        <p>
          We implement reasonable administrative, technical, and organizational measures to safeguard your personal
          information against unauthorized access, misuse, alteration, disclosure, or destruction.
        </p>
        <p>
          While we strive to use commercially acceptable means to protect your information, no method of transmission
          over the Internet is completely secure.
        </p>
      </LegalSection>

      <LegalSection id="pp-6" number={6} title="Data Retention">
        <p>We retain your personal information only for as long as necessary to:</p>
        <LegalBullets
          items={[
            'Provide our services',
            'Fulfil legal obligations',
            'Resolve disputes',
            'Maintain business records',
          ]}
        />
        <p>Once information is no longer required, it is securely deleted or anonymized where reasonably practicable.</p>
      </LegalSection>

      <LegalSection id="pp-7" number={7} title="Third-Party Services">
        <p>Our website may contain links to third-party websites or use third-party platforms such as:</p>
        <LegalBullets
          items={[
            'Google Analytics',
            'Meta (Facebook & Instagram)',
            'LinkedIn',
            'YouTube',
            'Payment gateways',
            'Email service providers',
          ]}
        />
        <p>These services have their own privacy policies, and TEONOX is not responsible for their privacy practices.</p>
      </LegalSection>

      <LegalSection id="pp-8" number={8} title="Your Rights">
        <p>Subject to applicable laws, you may have the right to:</p>
        <LegalBullets
          items={[
            'Access your personal information',
            'Request correction of inaccurate information',
            'Request deletion of your information',
            'Withdraw consent where processing is based on consent',
            'Opt out of promotional communications',
          ]}
        />
        <p>To exercise these rights, please contact us using the details below.</p>
      </LegalSection>

      <LegalSection id="pp-9" number={9} title="Children's Privacy">
        <p>
          Our programs are generally intended for individuals aged 18 years and above. If we become aware that personal
          information has been collected from a minor without appropriate consent where required, we will take
          reasonable steps to delete such information.
        </p>
      </LegalSection>

      <LegalSection id="pp-10" number={10} title="Changes to This Privacy Policy">
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements,
          or services.
        </p>
        <p>The revised version will be posted on this page with an updated Effective Date.</p>
      </LegalSection>

      <LegalSection id="pp-11" number={11} title="Contact Us">
        <p>
          If you have any questions regarding this Privacy Policy or how your information is handled, please contact:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="bg-[#FAF8F5] border border-[#EFEBE4] rounded-2xl p-5">
            <p className="font-sora font-[800] text-[#111111] text-[16px] mb-3">TEONOX</p>
            <ul className="space-y-3 font-inter text-[14px] leading-relaxed text-[#555555]">
              <li className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-[#F15A29] shrink-0 mt-0.5" />
                <span>Office No. 13, 4th Floor, Revolution Mall, Near City Pride Multiplex, Kothrud, Pune – 411038</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4.5 h-4.5 text-[#F15A29] shrink-0" />
                <a href="mailto:info@teonox.com" className="hover:text-[#F15A29] transition-colors">
                  info@teonox.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4.5 h-4.5 text-[#F15A29] shrink-0" />
                <a href="tel:+919890004828" className="hover:text-[#F15A29] transition-colors">
                  +91 989-000-4828
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-4.5 h-4.5 text-[#F15A29] shrink-0" />
                <a href="https://teonox.com" target="_blank" rel="noreferrer" className="hover:text-[#F15A29] transition-colors">
                  https://teonox.com
                </a>
              </li>
            </ul>
          </div>
          <div className="bg-[#FAF8F5] border border-[#EFEBE4] rounded-2xl p-5 flex flex-col justify-center gap-3">
            <p className="font-sora font-[700] text-[#111111] text-[16px]">Have a Privacy Question?</p>
            <p className="font-inter text-[14px] leading-relaxed text-[#555555]">
              Our team is ready to answer any questions, no matter how small.
            </p>
            <button
              onClick={() => onNavigate?.('/contact', 'Contact')}
              className="inline-flex items-center justify-center gap-2 self-start px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#F15A29] text-white font-sora font-[700] text-[13px] transition-all duration-300 cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </LegalSection>
    </LegalShell>
    </>
  );
}
