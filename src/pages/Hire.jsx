import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useLucide from '../hooks/useLucide.js';
import useScrollReveal from '../hooks/useScrollReveal.js';

const WEBHOOK = "https://script.google.com/macros/s/AKfycbwD25H1aTA5MzUXZvNjVOEPoBXNUl-QzFCNxwqwytC9_ysq1RUaLxHUwfWFAXO6jt4Mpw/exec";

export default function Hire() {
  useLucide();
  useScrollReveal();
  const [submitted, setSubmitted] = useState(false);

  const submitForm = async (formName, formEl) => {
    const fd = new FormData(formEl);
    const fields = {};
    fd.forEach((value, key) => { fields[key] = value; });
    try {
      await fetch(WEBHOOK, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formName, fields }),
      });
    } catch {}
    formEl.reset();
    setSubmitted(true);
  };
  

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
    <div className="about-grid reveal" style={{marginBottom:'56px'}}>
      <div>
        <span className="section-label">Hire From Us</span>
        <h2 className="section-title">Hire Business-Ready Talent.<br />Not Just Certified Candidates.</h2>
        <p className="section-sub" style={{maxWidth:'100%'}}>TEONOX learners are trained through practical projects, industry exposure, AI-powered workflows, and real business challenges — helping them bring confidence, adaptability, and execution-focused thinking to modern workplaces.</p>
        <div className="hero-actions" style={{marginTop:'20px'}}>
          <a href="#" className="btn btn-primary btn-sm">Speak to Our Team <i data-lucide="arrow-right" style={{width:'14px',height:'14px'}}></i></a>
        </div>
      </div>
      <div className="about-img-wrap" style={{aspectRatio:'16/10'}}>
        <img src="assets/asset-024.jpg" alt="" />
      </div>
    </div>

    <div className="reveal" style={{marginBottom:'24px'}}>
      <span className="section-label">Why Teonox Talent</span>
      <h2 className="section-title" style={{fontSize:'clamp(1.4rem,2.5vw,2rem)'}}>Built Through Experience, Not Just Theory.</h2>
      <p className="section-sub">At TEONOX, learners gain exposure to real-world projects, business scenarios, industry tools, and collaborative environments that help them develop practical skills before stepping into professional roles.</p>
    </div>

    <div className="hire-why reveal" style={{marginBottom:'56px'}}>
      <h3 className="hire-why-title">What Makes TEONOX Professionals Different?</h3>
      <div className="hire-why-grid">
        <div className="hire-why-item"><div className="hire-why-icon"><i data-lucide="zap" style={{width:'16px',height:'16px'}}></i></div><div><h5>Practical Exposure</h5><p>Worked on projects, campaigns, simulations, and business challenges.</p></div></div>
        <div className="hire-why-item"><div className="hire-why-icon"><i data-lucide="cpu" style={{width:'16px',height:'16px'}}></i></div><div><h5>AI-Ready</h5><p>Trained to use modern AI tools and workflows for productivity and decision-making.</p></div></div>
        <div className="hire-why-item"><div className="hire-why-icon"><i data-lucide="message-circle" style={{width:'16px',height:'16px'}}></i></div><div><h5>Strong Communication</h5><p>Experienced in presentations, collaboration, and professional communication.</p></div></div>
        <div className="hire-why-item"><div className="hire-why-icon"><i data-lucide="briefcase" style={{width:'16px',height:'16px'}}></i></div><div><h5>Business Understanding</h5><p>Exposure to marketing, analytics, sales, and business growth fundamentals.</p></div></div>
        <div className="hire-why-item"><div className="hire-why-icon"><i data-lucide="trending-up" style={{width:'16px',height:'16px'}}></i></div><div><h5>Growth Mindset</h5><p>Prepared to learn quickly, adapt, and contribute in fast-moving environments.</p></div></div>
      </div>
    </div>

    <div className="reveal" style={{marginBottom:'28px'}}>
      <span className="section-label">Who You Can Hire From TEONOX</span>
      <h2 className="section-title" style={{fontSize:'clamp(1.4rem,2.5vw,2rem)'}}>Trained for Impact. Ready to Contribute.</h2>
    </div>
    <div className="hire-grid">
      <div className="hire-card reveal reveal-d1">
        <div className="hire-card-icon"><i data-lucide="trending-up" style={{width:'22px',height:'22px'}}></i></div>
        <h4>Digital Marketing & Growth Professionals</h4>
      </div>
      <div className="hire-card reveal reveal-d2">
        <div className="hire-card-icon"><i data-lucide="bar-chart-3" style={{width:'22px',height:'22px'}}></i></div>
        <h4>AI & Business Analytics Talent</h4>
      </div>
      <div className="hire-card reveal reveal-d3">
        <div className="hire-card-icon"><i data-lucide="users" style={{width:'22px',height:'22px'}}></i></div>
        <h4>Sales & Revenue Operations Professionals</h4>
      </div>
      <div className="hire-card reveal reveal-d4">
        <div className="hire-card-icon"><i data-lucide="layers" style={{width:'22px',height:'22px'}}></i></div>
        <h4>Full-Stack Business Growth Professionals</h4>
      </div>
    </div>

    <div className="reveal" style={{marginTop:'56px'}}>
      <span className="section-label">Industry Collaboration</span>
      <h2 className="section-title" style={{fontSize:'clamp(1.4rem,2.5vw,2rem)'}}>Looking To Build The Next Generation Of Talent?</h2>
      <p className="section-sub" style={{maxWidth:'100%'}}>We welcome partnerships with organizations interested in campus hiring, internships, live projects, industry workshops, guest sessions, and mentorship initiatives.</p>
    </div>

    <div className="contact-wrap reveal" style={{marginTop:'32px',gridTemplateColumns:'1fr 1fr'}}>
      <div className="form-wrap">
        <h3 style={{fontFamily:'var(--font-head)',fontSize:'1.2rem',fontWeight:'700',marginBottom:'24px'}}>Let's Find The Right Talent For Your Team.</h3>
        {submitted ? (
          <div style={{ textAlign:"center", padding:"24px 0" }}>
            <div style={{ width:"48px",height:"48px",borderRadius:"50%",background:"var(--orange-grad)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <p style={{ color:"var(--text)",fontWeight:"600",fontSize:"1rem" }}>Thank you! We'll get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); submitForm("Hire Talent", e.target); }}>
            <div className="form-row"><div className="field"><label>Company Name</label><input type="text" name="Company Name" placeholder="Enter company name"  /></div><div className="field"><label>Contact Person</label><input type="text" name="Contact Person" placeholder="Full name"  /></div></div>
            <div className="form-row"><div className="field"><label>Email Address</label><input type="email" name="Email Address" placeholder="your@email.com"  /></div><div className="field"><label>Phone Number</label><input type="tel" name="Phone Number" placeholder="8087177760"  /></div></div>
            <div className="form-row"><div className="field"><label>Hiring Requirement</label><input type="text" name="Hiring Requirement" placeholder="e.g. Digital Marketing Executive"  /></div><div className="field"><label>Open Positions</label><input type="number" name="Open Positions" placeholder="Number of hires"  /></div></div>
            <div className="field"><label>Message</label><textarea name="Message" placeholder="Tell us about your requirements..."></textarea></div>
            <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>Request Talent <i data-lucide="arrow-right" style={{width:'16px',height:'16px'}}></i></button>
          </form>
        )}
      </div>
      <div className="contact-sidebar" style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <h3 className="contact-sidebar-title">Great Teams Are Built With Great People.</h3>
        <p>Let's work together to create meaningful opportunities for the next generation of professionals.</p>
        <div className="hero-actions" style={{marginTop:'24px'}}>
          <a href="#" className="btn btn-outline btn-sm" style={{borderColor:'var(--border2)',color:'var(--text)'}}>Partner With TEONOX <i data-lucide="arrow-right" style={{width:'14px',height:'14px'}}></i></a>
        </div>
      </div>
    </div>
  </div>
</section>

</div>
  );
}
