import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { TeonoxLogo } from './TeonoxLogo';

interface NavbarProps {
  onEnquireClick: () => void;
  activeSection: string;
  onNavigate: (href: string, label: string) => void;
}

export function Navbar({ onEnquireClick, activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Programs", href: "/programs" },
    { label: "Why TEONOX", href: "/why-teonox" },
    { label: "Career Outcomes", href: "/careers" },
    { label: "Admissions", href: "/admissions" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const handleNavClick = (href: string, label: string) => {
    setMobileMenuOpen(false);
    onNavigate(href, label);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#F0DFCE] py-2.5 sm:py-3 shadow-md shadow-black/5'
          : 'bg-white/60 backdrop-blur-sm py-3.5 sm:py-4 border-b border-[#F0DFCE]/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Header Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/', 'Home');
            }}
            className="group flex items-center hover:opacity-90 transition-all duration-300 hover:scale-105"
            aria-label="TEONOX Home"
          >
            <TeonoxLogo size="sm" />
          </a>

          {/* Desktop Nav Pill */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 bg-[#FFF6EE]/90 p-1 rounded-full border border-[#F0DFCE]/80 backdrop-blur-md shadow-sm">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, item.label);
                }}
                className={`px-2.5 xl:px-3.5 py-1.5 rounded-full font-sora text-[12.5px] xl:text-[13px] font-[600] transition-all duration-200 whitespace-nowrap ${
                  activeSection === item.label
                    ? 'bg-[#FF6A2B] text-white shadow-sm shadow-[#FF6A2B]/25'
                    : 'text-[#736657] hover:text-[#201A17] hover:bg-white/80'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Menu Button */}
          <div className="flex items-center gap-2.5">
            <button type="button"
              onClick={onEnquireClick}
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#FF6A2B] text-white hover:bg-[#D8420F] font-sora text-[13.5px] font-[600] transition-all shadow-sm shadow-[#FF6A2B]/20 active:scale-95 cursor-pointer"
            >
              <span>Enquire Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white border border-[#F0DFCE] text-[#201A17] hover:text-[#FF6A2B] shadow-sm"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#F0DFCE] px-4 pt-3 pb-5 shadow-xl animate-fade-in-up">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href, item.label);
                }}
                className={`px-4 py-2.5 rounded-xl text-base font-sora font-semibold transition-colors ${
                  activeSection === item.label
                    ? 'bg-[#FFEEDD] text-[#FF6A2B] border-l-4 border-[#FF6A2B]'
                    : 'text-[#736657] hover:bg-[#FFF6EE] hover:text-[#201A17]'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2.5">
              <button type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onEnquireClick();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6A2B] text-white font-sora font-semibold text-base shadow-md shadow-[#FF6A2B]/20 cursor-pointer"
              >
                <span>Enquire Now</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
