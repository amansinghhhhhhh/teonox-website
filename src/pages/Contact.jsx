import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useLucide from '../hooks/useLucide.js';
import useScrollReveal from '../hooks/useScrollReveal.js';

const WEBHOOK = "https://script.google.com/macros/s/AKfycbwD25H1aTA5MzUXZvNjVOEPoBXNUl-QzFCNxwqwytC9_ysq1RUaLxHUwfWFAXO6jt4Mpw/exec";

export default function Contact() {
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
    <div className="section-center reveal">
      <span className="section-label">Contact</span>
      <h2 className="section-title">Let's Talk About Your Future.</h2>
      <p className="section-sub" style={{maxWidth:'600px'}}>Whether you're exploring career opportunities, looking to build new skills, interested in partnering with us, or simply have questions — we're here to help.</p>
    </div>

    <div className="contact-wrap reveal" style={{marginTop:'48px'}}>
      <div className="contact-sidebar">
        <h3 className="contact-sidebar-title">Get In Touch</h3>
        <p>Tell us a little about yourself. We'd love to learn more about your goals and how we can help.</p>
        <ul className="contact-info">
          <li><div className="contact-info-icon"><i data-lucide="map-pin" style={{width:'18px',height:'18px'}}></i></div><div><strong>Visit Us</strong><span>TEONOX Campus, Pune</span></div></li>
          <li><div className="contact-info-icon"><i data-lucide="phone" style={{width:'18px',height:'18px'}}></i></div><div><strong>Call Us</strong><span>8087177760</span></div></li>
          <li><div className="contact-info-icon"><i data-lucide="mail" style={{width:'18px',height:'18px'}}></i></div><div><strong>Email Us</strong><span>info@teonox.com</span></div></li>
        </ul>
      </div>
      <div className="form-wrap">
        <h3 style={{fontFamily:'var(--font-head)',fontSize:'1.1rem',fontWeight:'700',marginBottom:'24px'}}>Tell Us A Little About Yourself</h3>
        {submitted ? (
          <div style={{ textAlign:"center", padding:"24px 0" }}>
            <div style={{ width:"48px",height:"48px",borderRadius:"50%",background:"var(--orange-grad)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <p style={{ color:"var(--text)",fontWeight:"600",fontSize:"1rem" }}>Thank you! We'll get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); submitForm("Contact Page", e.target); }}>
            <div className="field"><label>Full Name</label><input type="text" name="Full Name" placeholder="Enter your full name"  /></div>
            <div className="form-row"><div className="field"><label>Email Address</label><input type="email" name="Email Address" placeholder="your@email.com"  /></div><div className="field"><label>Phone Number</label><input type="tel" name="Phone Number" placeholder="8087177760"  /></div></div>
            <div className="form-row"><div className="field"><label>City</label><input type="text" name="City" placeholder="Your city"  /></div><div className="field"><label>Current Status</label><select name="Current Status"><option value="">Select</option><option value="Student">Student</option><option value="Fresh Graduate">Fresh Graduate</option><option value="Working Professional">Working Professional</option><option value="Entrepreneur">Entrepreneur</option><option value="Parent">Parent</option><option value="Other">Other</option></select></div></div>
            <div className="field"><label>Interested In</label><select name="Interested In"><option value="">Select</option><option value="TEONOX Business Growth Program">TEONOX Business Growth Program</option><option value="Career Guidance">Career Guidance</option><option value="Partnership Opportunities">Partnership Opportunities</option><option value="Corporate Training">Corporate Training</option><option value="Hiring from TEONOX">Hiring from TEONOX</option><option value="General Enquiry">General Enquiry</option></select></div>
            <div className="field"><label>Your Message</label><textarea name="Your Message" placeholder="Tell us about your goals, questions, or how we can help..."></textarea></div>
            <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>Let's Connect <i data-lucide="arrow-right" style={{width:'16px',height:'16px'}}></i></button>
          </form>
        )}
      </div>
    </div>

    <div className="reveal" style={{marginTop:'56px'}}>
      <div className="about-grid" style={{alignItems:'start'}}>
        <div>
          <span className="section-label">Not Sure Where To Start?</span>
          <h2 className="section-title" style={{fontSize:'clamp(1.4rem,2.5vw,2rem)'}}>Book a Career Conversation</h2>
          <p className="section-sub" style={{maxWidth:'100%'}}>Choosing the right path can feel overwhelming. Whether you're exploring career options, trying to understand industry trends, or simply want guidance on your next step, our team is happy to help.</p>
          
        </div>
        <div>
          <span className="section-label">For Students</span>
          <h2 className="section-title" style={{fontSize:'clamp(1.4rem,2.5vw,2rem)'}}>Have Questions About The Program?</h2>
          <p className="section-sub" style={{maxWidth:'100%'}}>You can reach out to us regarding curriculum & learning experience, fees & admissions, career opportunities, industry exposure, projects & practical learning, and program eligibility. No question is too small.</p>
        </div>
      </div>
      <div className="outcome-box reveal" style={{marginTop:'24px',textAlign:'center'}}>
        <p style={{fontSize:'1rem'}}>For Businesses: <a href="hire.html" style={{color:'var(--orange)',fontWeight:'600'}}>Hire From TEONOX</a> — <a href="#" style={{color:'var(--orange)',fontWeight:'600'}}>Partner With Us</a></p>
      </div>
    </div>

    <div className="reveal" style={{marginTop:'56px'}}>
      <div className="section-center" style={{marginBottom:'36px'}}>
        <span className="section-label">FAQ</span>
        <h2 className="section-title" style={{fontSize:'clamp(1.4rem,2.5vw,2rem)'}}>Frequently Asked Questions</h2>
      </div>
      <div className="faq-grid">
        <div className="faq-item reveal reveal-d1">
          <div className="faq-q">Do I need prior experience to join? <i data-lucide="chevron-down"></i></div>
          <div className="faq-a">No. The program is designed for students, fresh graduates, and individuals looking to build practical business skills.</div>
        </div>
        <div className="faq-item reveal reveal-d2">
          <div className="faq-q">Is this only for marketing careers? <i data-lucide="chevron-down"></i></div>
          <div className="faq-a">No. While marketing is a key focus area, the program also covers AI, analytics, sales, communication, and business growth skills that are valuable across industries.</div>
        </div>
        <div className="faq-item reveal reveal-d3">
          <div className="faq-q">Will I work on real projects? <i data-lucide="chevron-down"></i></div>
          <div className="faq-a">Yes. Practical exposure, projects, workshops, and industry-oriented learning are core parts of the TEONOX experience.</div>
        </div>
        <div className="faq-item reveal reveal-d4">
          <div className="faq-q">Who will teach me? <i data-lucide="chevron-down"></i></div>
          <div className="faq-a">You'll learn from industry practitioners, business leaders, and professionals with real-world experience.</div>
        </div>
      </div>
    </div>

    <div className="section-center reveal" style={{marginTop:'56px',padding:'48px 0'}}>
      <span className="section-label">Take The Next Step</span>
      <h2 className="section-title" style={{fontSize:'clamp(1.5rem,3vw,2.6rem)'}}>Every Great Career Starts With A Conversation.</h2>
      <p className="section-sub" style={{maxWidth:'500px'}}>The future belongs to people who keep learning, adapting, and taking action. Let's explore what's possible together.</p>
      <div className="hero-actions" style={{justifyContent:'center',marginTop:'24px'}}>
        
        <a href="programs.html" className="btn btn-outline">Apply as Trainer</a>
      </div>
    </div>
  </div>
</section>

</div>
  );
}
