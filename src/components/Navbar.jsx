import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
export default function Navbar() {
  const { pathname } = useLocation();
  useEffect(() => {
    const handler = () => {
      const n = document.getElementById('nav');
      if (n) { window.scrollY > 60 ? n.classList.add('scrolled') : n.classList.remove('scrolled'); }
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  const is = (p) => pathname === p ? 'active' : '';
  const openNav = () => { document.getElementById('navLinks')?.classList.add('open'); document.getElementById('navOverlay')?.classList.add('show'); };
  const closeNav = () => { document.getElementById('navLinks')?.classList.remove('open'); document.getElementById('navOverlay')?.classList.remove('show'); };
  return (
    <>
    <nav className="nav" id="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo"><img src="/assets/asset-002.png" alt="TEONOX" style={{height:44,width:'auto'}} /></Link>
        <ul className="nav-links" id="navLinks">
          <li><Link to="/" className={is('/')} onClick={closeNav}>Home</Link></li>
          <li><Link to="/about" className={is('/about')} onClick={closeNav}>About</Link></li>
          <li><Link to="/hire" className={is('/hire')} onClick={closeNav}>Hire</Link></li>
          <li><Link to="/careers" className={is('/careers')} onClick={closeNav}>Careers</Link></li>
          <li><Link to="/blog" className={is('/blog')} onClick={closeNav}>Insights</Link></li>
          <li><Link to="/programs" className={'nav-cta '+is('/programs')} onClick={closeNav}>Programs</Link></li>
          <li><button className="nav-close" id="navClose" aria-label="Close menu" onClick={closeNav}><i data-lucide="x"></i></button></li>
        </ul>
        <button className="nav-toggle" onClick={openNav}>
          <i data-lucide="menu"></i>
        </button>
      </div>
    </nav>
    <div className="nav-overlay" id="navOverlay" onClick={closeNav}></div>
    </>
  );
}