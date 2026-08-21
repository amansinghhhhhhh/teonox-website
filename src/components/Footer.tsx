import { Globe, Linkedin, Instagram, Facebook, Youtube } from 'lucide-react';
import { TeonoxLogo } from './TeonoxLogo';
import { Reveal } from './Reveal';

interface FooterProps {
  onEnquireClick: () => void;
  onNavigate: (href: string, label: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#17110D] text-[#EDE4DB] pt-20 pb-8 border-t border-[#2C241D]">
      <div className="w-[80%] mx-auto">
        
        {/* Top 4-Column Grid */}
        <Reveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#2C241D]">
          
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <div className="mb-4">
              <TeonoxLogo variant="dark" size="md" showTagline={true} />
            </div>

            <p className="font-inter text-[15.5px] font-[400] text-[#9E9082] leading-relaxed max-w-sm mb-6">
              Building industry-ready professionals through experiential, practitioner-led learning. Bridging the gap between education and execution.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://teonox.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TEONOX Website"
                title="Official Website"
                className="w-9 h-9 rounded-full bg-[#282019] hover:bg-[#F15A29] text-[#C9BDB2] hover:text-white flex items-center justify-center transition-all duration-300 border border-[#3A2E25] icon-badge-float hover:scale-105"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/teonox"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#282019] hover:bg-[#F15A29] text-[#C9BDB2] hover:text-white flex items-center justify-center transition-all duration-300 border border-[#3A2E25] icon-badge-float hover:scale-105"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/teonoxofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="w-9 h-9 rounded-full bg-[#282019] hover:bg-[#F15A29] text-[#C9BDB2] hover:text-white flex items-center justify-center transition-all duration-300 border border-[#3A2E25] icon-badge-float hover:scale-105"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                                href="https://www.facebook.com/teonoxofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="w-9 h-9 rounded-full bg-[#282019] hover:bg-[#F15A29] text-[#C9BDB2] hover:text-white flex items-center justify-center transition-all duration-300 border border-[#3A2E25] icon-badge-float hover:scale-105"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                                href="https://www.youtube.com/@teonoxofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="YouTube"
                className="w-9 h-9 rounded-full bg-[#282019] hover:bg-[#F15A29] text-[#C9BDB2] hover:text-white flex items-center justify-center transition-all duration-300 border border-[#3A2E25] icon-badge-float hover:scale-105"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h5 className="font-mono text-[14px] font-[700] uppercase tracking-[0.08em] text-[#9E9082] mb-5">
              Quick Links
            </h5>
            <ul className="space-y-3.5">
              <li>
                <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('/', 'Home'); }} className="font-inter text-[15.5px] font-[400] text-[#C9BDB2] hover:text-[#FF8A50] transition-colors link-underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => { e.preventDefault(); onNavigate('/about', 'About'); }} className="font-inter text-[15.5px] font-[400] text-[#C9BDB2] hover:text-[#FF8A50] transition-colors link-underline">
                  About
                </a>
              </li>
              <li>
                <a href="/programs" onClick={(e) => { e.preventDefault(); onNavigate('/programs', 'Programs'); }} className="font-inter text-[15.5px] font-[400] text-[#C9BDB2] hover:text-[#FF8A50] transition-colors link-underline">
                  Program
                </a>
              </li>
              <li>
                <a href="/admissions" onClick={(e) => { e.preventDefault(); onNavigate('/admissions', 'Admissions'); }} className="font-inter text-[15.5px] font-[400] text-[#C9BDB2] hover:text-[#FF8A50] transition-colors link-underline">
                  Admissions
                </a>
              </li>
              <li>
                <a href="/#hire-from-us" onClick={(e) => { e.preventDefault(); onNavigate('/#hire-from-us', 'Hire From Us'); }} className="font-inter text-[15.5px] font-[400] text-[#C9BDB2] hover:text-[#FF8A50] transition-colors link-underline">
                  Hire From Us
                </a>
              </li>
            </ul>
          </div>

          {/* More */}
          <div className="lg:col-span-2">
            <h5 className="font-mono text-[14px] font-[700] uppercase tracking-[0.08em] text-[#9E9082] mb-5">
              More
            </h5>
            <ul className="space-y-3.5">
              <li>
                <a href="/careers" onClick={(e) => { e.preventDefault(); onNavigate('/careers', 'Careers'); }} className="font-inter text-[15.5px] font-[400] text-[#C9BDB2] hover:text-[#FF8A50] transition-colors link-underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="/blog" onClick={(e) => { e.preventDefault(); onNavigate('/blog', 'Insights'); }} className="font-inter text-[15.5px] font-[400] text-[#C9BDB2] hover:text-[#FF8A50] transition-colors link-underline">
                  Insights
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => { e.preventDefault(); onNavigate('/contact', 'Contact'); }} className="font-inter text-[15.5px] font-[400] text-[#C9BDB2] hover:text-[#FF8A50] transition-colors link-underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); onNavigate('/privacy-policy', 'Privacy Policy'); }} className="font-inter text-[15.5px] font-[400] text-[#C9BDB2] hover:text-[#FF8A50] transition-colors link-underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-and-conditions" onClick={(e) => { e.preventDefault(); onNavigate('/terms-and-conditions', 'Terms & Conditions'); }} className="font-inter text-[15.5px] font-[400] text-[#C9BDB2] hover:text-[#FF8A50] transition-colors link-underline">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h5 className="font-mono text-[14px] font-[700] uppercase tracking-[0.08em] text-[#9E9082] mb-5">
              Contact
            </h5>
            <ul className="space-y-3.5 font-inter text-[15.5px] font-[400] text-[#C9BDB2]">
              <li className="leading-relaxed">
                Office No. 13, 4th Floor, Revolution Mall, Kothrud, Pune - 411038
              </li>
              <li>
                <a href="mailto:info@teonox.com" className="hover:text-[#FF8A50] transition-colors link-underline">
                  info@teonox.com
                </a>
              </li>
              <li>
                <a href="tel:+919890004828" className="hover:text-[#FF8A50] transition-colors link-underline">
                  +91 989-000-4828
                </a>
              </li>
            </ul>
          </div>

        </Reveal>

        {/* Bottom Copyright */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between font-inter text-[14px] font-[400] text-[#7A6E60] gap-3">
          <span>© 2026 TEONOX. All rights reserved.</span>
          <span>Powered by A2 Digital.</span>
        </div>

      </div>
    </footer>
  );
}
