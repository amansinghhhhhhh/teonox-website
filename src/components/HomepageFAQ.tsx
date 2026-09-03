import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Reveal } from './Reveal';
import { FAQSchema } from './schema/FAQSchema';

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    q: 'Which AI course in Pune offers placement assistance?',
    a: "Teonox in Pune offers an AI & Automation training program with placement support, covering practical AI tools, automation workflows, and job-readiness training. The course is designed for freshers and working professionals looking to enter AI-driven roles.",
  },
  {
    q: 'Do AI courses in Pune guarantee a job after completion?',
    a: "Most reputable AI courses, including Teonox's program, offer placement assistance, resume building, interview prep, and hiring partner connections, rather than a guaranteed job, since final hiring depends on the candidate's performance and the employer's requirements.",
  },
  {
    q: 'What is included in an AI course with placement support in Pune?',
    a: "A placement-oriented AI course typically includes hands-on projects, tool training (like AI automation platforms), mock interviews, resume reviews, and access to a hiring network. Teonox structures its AI & Automation track around these components.",
  },
  {
    q: 'Who can join an AI course with placement in Pune?',
    a: "Students, fresh graduates, working professionals looking to upskill, and career switchers can join, these programs are usually built for multiple experience levels with no strict prerequisite of a technical background.",
  },
  {
    q: 'What is the best course to do after graduation in Pune?',
    a: "For graduates in Pune, courses in AI & Automation, Digital Marketing, and Data Analytics are among the most in-demand right now, since they align with current hiring trends across IT, ed-tech, and service industries in the city.",
  },
  {
    q: 'Which skill is most valuable to learn right after graduation?',
    a: "AI and automation skills are increasingly valuable post-graduation because they apply across almost every industry, marketing, sales, operations, and analytics, making graduates more employable regardless of their degree background.",
  },
  {
    q: 'Should I do a certification course or a job immediately after graduation?',
    a: "It depends on the graduate's field: if their degree doesn't include job-ready technical or digital skills, a short-term certification (3\u20136 months) in AI, digital marketing, or data analytics before job hunting is often a stronger route.",
  },
  {
    q: 'What courses in Pune help fresh graduates get hired faster?',
    a: "Courses combining practical training with placement support, such as Teonox's programs in AI & Automation, Digital Marketing, and Data Analytics, help fresh graduates get hired faster than purely theoretical courses.",
  },
  {
    q: 'Where can I upskill in AI and automation in Pune?',
    a: "Teonox in Pune offers an AI & Automation upskilling program covering practical tools and workflows for professionals who want to add AI skills to their existing career without switching fields entirely.",
  },
  {
    q: 'Is AI and automation training useful for non-tech professionals?',
    a: "Yes, AI and automation upskilling is not limited to developers. Marketing, sales, HR, and operations professionals use AI automation tools to save time on repetitive tasks, making this training relevant across roles.",
  },
  {
    q: 'How long does it take to upskill in AI and automation?',
    a: "Most AI & Automation upskilling programs in Pune run for a few weeks to a few months, depending on depth, short programs cover tool usage and prompt-based automation, while longer ones include hands-on project work.",
  },
  {
    q: 'What topics are covered in an AI and automation upskilling course?',
    a: "Typical topics include AI tools for productivity, workflow automation platforms, prompt engineering basics, and applying AI to real business tasks like marketing, sales, or data reporting.",
  },
  {
    q: 'Does Teonox offer corporate AI automation training in Pune?',
    a: "Yes, Teonox provides AI & Automation training designed for business and corporate clients in Pune, helping teams adopt AI tools and automate repetitive workflows within their existing operations.",
  },
  {
    q: 'What does corporate AI automation training typically cover?',
    a: "Corporate AI automation training usually covers identifying automatable tasks, using AI tools for workflow automation, integrating AI into existing business processes, and measuring productivity gains.",
  },
  {
    q: 'Why are companies in Pune investing in AI automation training for employees?',
    a: "Companies are investing in this training to reduce manual workload, speed up repetitive processes, and keep teams competitive as AI adoption becomes standard across marketing, sales, and operations functions.",
  },
  {
    q: 'Can corporate AI training be customized for a specific team?',
    a: "Yes, corporate AI automation training is typically customized based on the team's function (marketing, sales, operations, etc.) and the specific tools or workflows the business already uses.",
  },
  {
    q: 'What is a Gen AI school of marketing in Pune?',
    a: "A Gen AI school of marketing trains marketing professionals and students to use generative AI tools for content creation, campaign planning, and marketing automation combining traditional digital marketing skills with AI tool proficiency.",
  },
  {
    q: 'Does Teonox offer Generative AI training for marketing in Pune?',
    a: "Teonox combines its Digital Marketing training with AI & Automation skills, giving learners exposure to generative AI tools used in modern marketing workflows such as content generation and campaign automation.",
  },
  {
    q: 'Who should join a Gen AI marketing course?',
    a: "Digital marketing students, working marketing professionals, and career switchers looking to combine marketing fundamentals with generative AI tool skills should consider this kind of course.",
  },
  {
    q: 'How is Gen AI marketing training different from a regular digital marketing course?',
    a: "A regular digital marketing course focuses on channels and strategy (SEO, social, ads), while Gen AI marketing training adds AI tool usage on top, for tasks like content generation, ad copy creation, and automated campaign workflows.",
  },
];

export function HomepageFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-10 sm:py-14 bg-[#FAF8F5] text-[#111111] relative overflow-hidden border-b border-[#EFEBE4]">
      <FAQSchema faqs={FAQ_DATA.map((f) => ({ question: f.q, answer: f.a }))} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="mb-8 sm:mb-10 text-left">
          <h2 className="font-sora text-[28px] sm:text-[36px] lg:text-[42px] font-[800] text-[#111111] leading-[1.18] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="font-inter text-[15px] sm:text-[16px] text-[#665A4E] leading-relaxed mt-3">
            Choosing the right digital marketing course near me can be challenging, especially with so many options available. Our Frequently Asked Questions section answers common queries about course eligibility, curriculum, certifications, placements, fees, batch timings, online and classroom training, and career opportunities. Whether you're looking for an AI course with placement in Pune, searching for the best course after graduation in Pune, or planning to upskill in AI and automation in Pune, our FAQs provide useful information to help you choose the right career-focused program. You can also explore options for corporate AI automation training in Pune and discover how Teonox is building a Gen AI School of Marketing in Pune with practical, industry-relevant learning.
          </p>
        </Reveal>

        <div className="space-y-3">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-[20px] border border-[#ECECEC] bg-white overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FFF0EB]/40 transition-colors"
                >
                  <span className="font-sora text-[15.5px] font-[700] text-[#111111]">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#F15A29] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 border-t border-[#ECECEC] bg-white font-inter text-[14.5px] text-[#444444] leading-relaxed whitespace-pre-line">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
