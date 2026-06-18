import Icon from '../components/Icon.jsx';
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
        <Link to="/" className="nav-logo"><img src="/assets/asset-002.png" alt="TEONOX" style={{height:50,width:'auto'}} /></Link>
        <ul className="nav-links" id="navLinks">
          <div className="nav-drawer-header">
            <button className="nav-close" id="navClose" aria-label="Close menu" onClick={closeNav}><Icon name="x" /></button>
          </div>
          <div className="nav-drawer-body">
            <li><Link to="/" className={is('/')} onClick={closeNav}><Icon name="home" /><span>Home</span></Link></li>
            <li><Link to="/about" className={is('/about')} onClick={closeNav}><Icon name="info" /><span>About</span></Link></li>
            <li><Link to="/hire" className={is('/hire')} onClick={closeNav}><Icon name="briefcase" /><span>Hire</span></Link></li>
            <li><Link to="/careers" className={is('/careers')} onClick={closeNav}><Icon name="heart" /><span>Careers</span></Link></li>
            <li><Link to="/blog" className={is('/blog')} onClick={closeNav}><Icon name="file-text" /><span>Insights</span></Link></li>
            <li><Link to="/programs" className={'nav-cta '+is('/programs')} onClick={closeNav}><Icon name="book-open" /><span>Programs</span></Link></li>
          </div>
        </ul>
        <button className="nav-toggle" onClick={openNav}>
          <Icon name="menu" />
        </button>
      </div>
    </nav>
    <div className="nav-overlay" id="navOverlay" onClick={closeNav}></div>
    </>
  );
}
