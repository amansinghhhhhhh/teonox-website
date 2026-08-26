import React from 'react';
import { ScrollText, Phone, Mail, MapPin } from 'lucide-react';
import { LegalShell, LegalSection, LegalBullets } from './LegalPageShell';
import { SEO } from './SEO';

const TOC = [
  { id: 'tc-1', title: 'Acceptance of Terms' },
  { id: 'tc-2', title: 'Use of the Website' },
  { id: 'tc-3', title: 'Intellectual Property' },
  { id: 'tc-4', title: 'Program Information & Admissions' },
  { id: 'tc-5', title: 'Payments, Fees & Refunds' },
  { id: 'tc-6', title: 'User Responsibilities' },
  { id: 'tc-7', title: 'Privacy' },
  { id: 'tc-8', title: 'Third-Party Links' },
  { id: 'tc-9', title: 'Limitation of Liability' },
  { id: 'tc-10', title: 'Indemnification' },
  { id: 'tc-11', title: 'Termination' },
  { id: 'tc-12', title: 'Governing Law & Dispute Resolution' },
  { id: 'tc-13', title: 'Changes to These Terms' },
  { id: 'tc-14', title: 'Contact Us' },
];

interface TermsAndConditionsPageProps {
  onNavigate?: (href: string, label: string) => void;
}

export function TermsAndConditionsPage({ onNavigate }: TermsAndConditionsPageProps) {
  return (
    <>
      <SEO
        title="Terms & Conditions | TEONOX"
        description="Read the TEONOX Terms & Conditions — governing your access to and use of our website, programs, and services."
        canonical="/terms-and-conditions"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Terms & Conditions — TEONOX',
          url: 'https://teonox.com/terms-and-conditions',
        }}
      />
    <LegalShell
      icon={ScrollText}
      label="Legal"
      title="Terms & Conditions"
      subtitle={
        <>
          <p>
            Welcome to <strong className="text-[#F15A29]">TEONOX</strong>. These Terms &amp; Conditions ("Terms") govern
            your access to and use of{' '}
            <a href="https://teonox.com" target="_blank" rel="noreferrer" className="text-[#F15A29] hover:underline font-medium">
              https://teonox.com
            </a>{' '}
            and the services offered by TEONOX, including our programs, enquiries, and related communications.
          </p>
          <p>
            Please read these Terms carefully. By accessing or using our website and services, you agree to be bound by
            these Terms. If you do not agree, please do not use our website or services.
          </p>
        </>
      }
      effectiveDate="1 January 2025"
      appliesTo="teonox.com"
      toc={TOC}
      onNavigate={onNavigate}
    >
      <LegalSection id="tc-1" number={1} title="Acceptance of Terms">
        <p>
          By accessing, browsing, or using this website, submitting an enquiry, or enrolling in any TEONOX program, you
          acknowledge that you have read, understood, and agree to be bound by these Terms and all applicable laws and
          regulations.
        </p>
        <p>
          If you are accepting these Terms on behalf of an organisation or another person, you represent that you have
          the authority to do so.
        </p>
      </LegalSection>

      <LegalSection id="tc-2" number={2} title="Use of the Website">
        <p>You agree to use this website only for lawful purposes in a manner consistent with these Terms. You agree not to:</p>
        <LegalBullets
          items={[
            'Use the website in any way that could damage, disable, overburden, or impair the website or interfere with other users.',
            'Attempt to gain unauthorised access to any part of the website, servers, or systems connected to it.',
            'Use automated tools such as scrapers, spiders, or bots without our prior written consent.',
            'Upload, transmit, or distribute any harmful, offensive, or unlawful content.',
            'Misrepresent your identity, qualifications, or background in any enquiry or application.',
            'Engage in any activity that infringes the rights of TEONOX or third parties.',
          ]}
        />
        <p>We reserve the right to restrict or terminate access to the website at our sole discretion.</p>
      </LegalSection>

      <LegalSection id="tc-3" number={3} title="Intellectual Property">
        <p>
          All content on this website, including text, graphics, logos, images, videos, course materials, design,
          structure, and software, is the property of TEONOX or its licensors and is protected by applicable
          intellectual property laws.
        </p>
        <LegalBullets
          items={[
            'You may not copy, reproduce, republish, upload, post, transmit, or distribute any content without our prior written permission.',
            'You may not use our name, logos, or branding without explicit authorisation.',
            'You may not decompile, reverse engineer, or modify any software or code underlying the website.',
            'Course materials provided during programs are for your personal educational use only.',
          ]}
        />
      </LegalSection>

      <LegalSection id="tc-4" number={4} title="Program Information & Admissions">
        <p>
          TEONOX reserves the right to modify, suspend, or discontinue any program, course, schedule, curriculum,
          faculty, or offering at any time without prior notice.
        </p>
        <LegalBullets
          items={[
            "Admission decisions are made at TEONOX's sole discretion.",
            'Program details, durations, fees, and outcomes are subject to change.',
            'Placement or career outcome statistics are indicative and not guaranteed.',
            'Any representations regarding outcomes are aspirational and depend on individual effort and market conditions.',
          ]}
        />
      </LegalSection>

      <LegalSection id="tc-5" number={5} title="Payments, Fees & Refunds">
        <p>Where applicable, fees for our services and programs are communicated at the time of enrolment.</p>
        <LegalBullets
          items={[
            'All payments must be completed by the due dates communicated to you.',
            'Fees are non-transferable unless agreed in writing.',
            'Refund policies, if any, are as communicated at the time of purchase and may vary by program.',
            'Requested refunds must be submitted in writing as per the applicable policy.',
          ]}
        />
      </LegalSection>

      <LegalSection id="tc-6" number={6} title="User Responsibilities">
        <p>When you provide information to TEONOX, you agree that:</p>
        <LegalBullets
          items={[
            'The information you provide is accurate, current, and complete.',
            'You will promptly update any information that changes.',
            'You are responsible for maintaining the confidentiality of any account credentials provided to you.',
            'You accept full responsibility for activities conducted using your credentials.',
          ]}
        />
      </LegalSection>

      <LegalSection id="tc-7" number={7} title="Privacy">
        <p>
          Your use of the website is also governed by our{' '}
          <button
            onClick={() => onNavigate?.('/privacy-policy', 'Privacy Policy')}
            className="text-[#F15A29] hover:underline font-medium cursor-pointer"
          >
            Privacy Policy
          </button>
          , which explains how we collect and use your personal information.
        </p>
      </LegalSection>

      <LegalSection id="tc-8" number={8} title="Third-Party Links">
        <p>
          Our website may contain links to third-party websites, platforms, or services (such as analytics, social
          media, payment providers, or external resources) that are not operated or controlled by TEONOX.
        </p>
        <p>
          We are not responsible for the content, accuracy, or practices of any third-party websites. Accessing any
          third-party website is at your own risk.
        </p>
      </LegalSection>

      <LegalSection id="tc-9" number={9} title="Limitation of Liability">
        <p>
          To the fullest extent permitted by law, TEONOX and its directors, employees, agents, and affiliates shall not
          be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or
          in connection with:
        </p>
        <LegalBullets
          items={[
            'Your access to or use of, or inability to access or use, the website.',
            'Any errors or omissions in the content provided.',
            'Any third-party products or services accessed through the website.',
            'Any interruption or cessation of transmission to or from the website.',
          ]}
        />
        <p>
          Nothing in these Terms limits liability that cannot be excluded or limited under applicable law.
        </p>
      </LegalSection>

      <LegalSection id="tc-10" number={10} title="Indemnification">
        <p>
          You agree to indemnify, defend, and hold harmless TEONOX and its officers, directors, employees, agents, and
          affiliates from and against any claims, liabilities, damages, losses, costs, or expenses (including
          reasonable lawyers' fees) arising out of or in connection with:
        </p>
        <LegalBullets
          items={[
            'Your use of the website.',
            'Your violation of these Terms.',
            'Your violation of any rights of a third party.',
            'Any content or information you submit to the website.',
          ]}
        />
      </LegalSection>

      <LegalSection id="tc-11" number={11} title="Termination">
        <p>
          TEONOX may terminate or suspend your access to the website or any of our services, in whole or in part, at any
          time and without notice, for any reason, including if you breach these Terms.
        </p>
        <p>
          Upon termination, your right to use the website will immediately cease. Sections of these Terms that by their
          nature should survive termination (including, but not limited to, intellectual property, limitation of
          liability, and indemnification) will survive.
        </p>
      </LegalSection>

      <LegalSection id="tc-12" number={12} title="Governing Law & Dispute Resolution">
        <p>
          These Terms shall be governed by and construed in accordance with the laws of India, without regard to its
          conflict of law provisions.
        </p>
        <p>
          Any dispute arising out of or relating to these Terms or the use of this website shall be subject to the
          exclusive jurisdiction of the courts located in Pune, Maharashtra, India.
        </p>
      </LegalSection>

      <LegalSection id="tc-13" number={13} title="Changes to These Terms">
        <p>
          We may update these Terms from time to time to reflect changes in our practices, services, or legal
          requirements.
        </p>
        <p>
          The revised Terms will be posted on this page with an updated Effective Date. Your continued use of the
          website after changes are posted constitutes your acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection id="tc-14" number={14} title="Contact Us">
        <p>If you have any questions about these Terms &amp; Conditions, please contact us:</p>
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
            </ul>
          </div>
          <div className="bg-[#FAF8F5] border border-[#EFEBE4] rounded-2xl p-5 flex flex-col justify-center gap-3">
            <p className="font-sora font-[700] text-[#111111] text-[16px]">Have a Question?</p>
            <p className="font-inter text-[14px] leading-relaxed text-[#555555]">
              Our support team is available to answer any questions about your enquiry or our programs.
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