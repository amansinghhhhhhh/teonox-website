import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useLucide from '../hooks/useLucide.js';
import useScrollReveal from '../hooks/useScrollReveal.js';


export default function About() {
  useLucide();
  useScrollReveal();
  

  useEffect(() => {
    const hdls = [];
    const dh = (sel, fn) => { document.querySelectorAll(sel).forEach(el => { el.addEventListener('click', fn); hdls.push(() => el.removeEventListener('click', fn)); }); };
    dh('.job-expandable-header', function() { const c = this.closest('.job-expandable'); const b = c.querySelector('.job-expandable-body'); const o = c.classList.contains('open'); c.classList.toggle('open'); if(b) b.style.display = o ? 'none' : ''; });
    dh('.faq-item', function() { this.classList.toggle('open'); });
    dh('.prog-filter', function() { document.querySelectorAll('.prog-filter').forEach(b => b.classList.remove('active')); this.classList.add('active'); const f = this.dataset.filter; document.querySelectorAll('.prog-card').forEach(c => { if(f === 'all') { c.style.display=''; return; } c.style.display = c.textContent.toLowerCase().includes(f) ? '' : 'none'; }); });
    dh('a[href^="#"]', function(e) { const h = this.getAttribute('href'); if(h && h.length>1) { const t = document.querySelector(h); if(t) { e.preventDefault(); t.scrollIntoView({behavior:'smooth'}); } } });
    return () => hdls.forEach(f => f());
  });

  return (
    <div className="page active">
<section className="section" style={{paddingTop:'140px'}}>
  <div className="container">
    <div className="about-grid">
      <div className="reveal">
        <span className="section-label">Our Story</span>
        <h2 className="section-title">We Started TEONOX Because We Saw a Gap.</h2>
        <p className="section-sub" style={{maxWidth:'100%'}}>For over a decade, A2 Digital has been helping businesses grow through digital marketing, technology, strategy, and performance-driven execution. Along the way, we worked with hundreds of professionals, hired fresh graduates, trained teams, and collaborated with businesses across industries — and we kept noticing the same challenge.</p>
        <div className="about-quote" style={{marginTop:'24px'}}>
          <p>"Every year, talented students graduate with degrees, certifications, and ambitions. But when it came to stepping into the workplace, many felt unprepared. Not because they lacked potential. Because they lacked exposure."</p>
        </div>
        <p style={{fontSize:'1.05rem',color:'var(--text2)',fontWeight:'300',lineHeight:'1.75',marginTop:'16px'}}>Exposure to real projects. Exposure to modern tools. Exposure to industry workflows. Exposure to how businesses actually operate. At the same time, businesses were facing a challenge of their own — they weren't struggling to find candidates. They were struggling to find people who could confidently contribute from day one. That's why TEONOX was created. A learning ecosystem designed to help students gain the skills, experience, confidence, and industry exposure needed to thrive.</p>
      </div>
      <div className="reveal reveal-d2">
        <div className="about-img-wrap">
          <img src="assets/asset-022.jpg" alt="" />
        </div>
      </div>
    </div>
  </div>
</section>

<section className="section section-alt">
  <div className="container">
    <div className="about-grid" style={{alignItems:'start'}}>
      <div className="reveal-left">
        <span className="section-label">Our Vision</span>
        <h2 className="section-title" style={{fontSize:'clamp(1.5rem,3vw,2.6rem)'}}>To Build a Generation of Industry-Ready Professionals.</h2>
        <p className="section-sub" style={{maxWidth:'100%',marginTop:'20px'}}>We envision a future where students graduate with more than academic knowledge. A future where they enter the workforce with confidence. Where businesses can find capable talent. Where young professionals understand how to solve problems, create value, and adapt to change. And where India develops not just graduates but future-ready professionals equipped for a global digital economy.</p>
      </div>
      <div className="reveal-right">
        <span className="section-label">Our Mission</span>
        <h2 className="section-title" style={{fontSize:'clamp(1.5rem,3vw,2.6rem)'}}>To Bridge the Gap Between Learning and Doing.</h2>
        <p className="section-sub" style={{maxWidth:'100%',marginTop:'20px'}}>We aim to help students become more confident, capable, and career-ready through practical learning experiences rooted in real industry needs. At TEONOX: We don't just teach concepts. We help you apply them. We don't focus on memorisation. We focus on capability. We don't prepare you only for exams. We prepare you for opportunities. We don't just help you learn skills. We help you build confidence in using them.</p>
      </div>
    </div>
  </div>
</section>

<section className="section">
  <div className="container">
    <div className="reveal">
      <span className="section-label">The Challenge</span>
      <h2 className="section-title">The World of Work Is Changing.<br />Learning Needs to Change Too.</h2>
      <p className="section-sub" style={{maxWidth:'100%'}}>Technology is evolving faster than ever. AI is transforming how businesses operate. Consumer behaviour changes constantly. But much of traditional education still struggles to keep pace. Today's employers increasingly look for people who can:</p>
    </div>
    <div className="about-stats" style={{marginTop:'32px',gridTemplateColumns:'repeat(2,1fr)'}}>
      <div className="hire-why-item"><div className="hire-why-icon"><i data-lucide="check" style={{width:'16px',height:'16px'}}></i></div><div><h5>Work with data</h5><p>Transform raw data into actionable business decisions</p></div></div>
      <div className="hire-why-item"><div className="hire-why-icon"><i data-lucide="check" style={{width:'16px',height:'16px'}}></i></div><div><h5>Use AI tools effectively</h5><p>Leverage modern AI for productivity and automation</p></div></div>
      <div className="hire-why-item"><div className="hire-why-icon"><i data-lucide="check" style={{width:'16px',height:'16px'}}></i></div><div><h5>Understand customer behaviour</h5><p>Analyze and predict consumer patterns</p></div></div>
      <div className="hire-why-item"><div className="hire-why-icon"><i data-lucide="check" style={{width:'16px',height:'16px'}}></i></div><div><h5>Execute campaigns and projects</h5><p>Drive outcomes from strategy to delivery</p></div></div>
      <div className="hire-why-item"><div className="hire-why-icon"><i data-lucide="check" style={{width:'16px',height:'16px'}}></i></div><div><h5>Communicate ideas clearly</h5><p>Present, persuade, and collaborate effectively</p></div></div>
      <div className="hire-why-item"><div className="hire-why-icon"><i data-lucide="check" style={{width:'16px',height:'16px'}}></i></div><div><h5>Adapt to new technologies</h5><p>Stay current in a rapidly evolving landscape</p></div></div>
    </div>
    <div className="outcome-box reveal" style={{marginTop:'32px',textAlign:'left'}}>
      <p style={{fontSize:'0.9rem',fontWeight:'400'}}>Yet these skills are often learned <em>after</em> entering the workforce rather than before. <strong>That's the gap we're working to close.</strong></p>
    </div>
  </div>
</section>

<section className="section section-alt">
  <div className="container section-center">
    <div className="reveal">
      <span className="section-label">Our Promise</span>
      <h2 className="section-title">The TEONOX Promise</h2>
      <p className="section-sub" style={{maxWidth:'600px'}}>We can't promise shortcuts. We can't promise overnight success. What we can promise is an environment where you'll learn by doing, gain meaningful exposure, build practical skills, and develop the confidence needed to take the next step in your career. <strong style={{color:'var(--text)'}}>Because your future deserves more than just knowledge. It deserves experience.</strong></p>
    </div>
  </div>
</section>

</div>
  );
}
