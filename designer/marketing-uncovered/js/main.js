
/* duplicate each mosaic track so the 50% translate loop is seamless */



const $=s=>document.querySelector(s),H=(i,h)=>$(i).innerHTML=h;
// typing

// text reveal
document.querySelectorAll('.tr').forEach(e=>{const w=e.dataset.t.split(' ');e.innerHTML=w.map(x=>x[0]=='~'?`<span class="sf">${x.slice(1)}</span>`:`<span>${x}</span>`).join(' ')});
// data
const sv=d=>`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;const IC=[sv('<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>'),sv('<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>'),sv('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>'),sv('<path d="M12 2c3 3 4 7 3 11l-3 3-3-3c-1-4 0-8 3-11z"/><circle cx="12" cy="9" r="1.5"/><path d="M6 18l-3 3M18 18l3 3"/>')];const CE=[["I’m confused about my career","Explore marketing roles, industry expectations and a five-year career framework."],["I want a career with growth","Discover practical skills and roles in performance, content, analytics and AI-assisted marketing."],["I want to freelance or earn independently","Learn what clients pay for and how skills become useful services."],["I want to grow my business","Explore customer behaviour, positioning and strategic marketing decisions."]];
const CEH=["Find your direction","Build skills that grow with you","Turn skills into income","Make smarter marketing decisions"];const CET=[40,150,90,36];const CEI=[sv('<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>'),sv('<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>'),sv('<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/><path d="M3 13h18"/>'),sv('<path d="M4 20V10l8-6 8 6v10"/><path d="M9 20v-6h6v6"/>')];
const TG=[["Roles","Expectations","5-yr framework"],["Performance","Analytics","AI"],["Client needs","Services","Skills"],["Customers","Positioning","Strategy"]];
H('#ceTabs',CE.map((c,i)=>`<button class="ce-tab" type="button" role="tab" id="ceTab${i}" aria-controls="ceCard" aria-selected="${i===0}" tabindex="${i===0?0:-1}">${c[0]}</button>`).join(''));
const ceTabs=$('#ceTabs'),ceStage=$('#ceStage'),ceCard=$('#ceCard'),ceBody=$('#ceBody'),ceIco=$('#ceIco'),ceNum=$('#ceNum'),ceH=$('#ceH'),ceP=$('#ceP');
let ceCur=-1,ceTimer=0;
const ceFill=k=>{ceH.textContent=CEH[k];ceP.textContent=CE[k][1];ceIco.innerHTML=CEI[k];ceNum.textContent='0'+(k+1)};
const cePick=k=>{if(k===ceCur)return;const first=ceCur<0;ceCur=k;[...ceTabs.children].forEach((el,j)=>{el.setAttribute('aria-selected',j===k?'true':'false');el.tabIndex=j===k?0:-1});ceCard.setAttribute('aria-labelledby','ceTab'+k);ceStage.style.setProperty('--ce-c',(k*25+12.5)+'%');ceCard.style.setProperty('--ce-t',CET[k]+'px');const sel=$('#int');if(sel)sel.selectedIndex=k;clearTimeout(ceTimer);if(first){ceFill(k);return}ceBody.classList.add('out');ceTimer=setTimeout(()=>{ceFill(k);ceBody.classList.remove('out')},220)};
const ceScroll=$('#ceScroll'),cePin=$('#cePin'),ceRM=matchMedia('(prefers-reduced-motion: reduce)');
const ceScrollOn=()=>!ceRM.matches;
let ceRaf=0;
const ceProgress=()=>{const r=ceScroll.getBoundingClientRect(),top=parseFloat(getComputedStyle(cePin).top)||84,travel=ceScroll.offsetHeight-cePin.offsetHeight;return travel>0?Math.min(1,Math.max(0,(top-r.top)/travel)):0};
const ceStep=()=>{if(!ceScrollOn())return;const k=Math.min(CE.length-1,Math.floor(ceProgress()*CE.length));if(k!==ceCur)cePick(k)};
const ceGo=k=>{if(!ceScrollOn()){cePick(k);return}const r=ceScroll.getBoundingClientRect(),top=parseFloat(getComputedStyle(cePin).top)||84,travel=ceScroll.offsetHeight-cePin.offsetHeight;if(travel<=0){cePick(k);return}scrollTo({top:scrollY+r.top-top+travel*((k+0.5)/CE.length),behavior:'smooth'})};
ceTabs.onclick=e=>{const b=e.target.closest('.ce-tab');if(b)ceGo([...ceTabs.children].indexOf(b))};
ceTabs.onkeydown=e=>{const b=e.target.closest('.ce-tab');if(!b)return;const k=[...ceTabs.children].indexOf(b);const d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(!d)return;e.preventDefault();const m=(k+d+CE.length)%CE.length;ceGo(m);ceTabs.children[m].focus()};
cePick(0);
const ceOnScroll=()=>{if(ceRaf)return;ceRaf=requestAnimationFrame(()=>{ceRaf=0;ceStep()})};
addEventListener('scroll',ceOnScroll,{passive:true});
addEventListener('resize',ceOnScroll);
ceStep();
// why now — draw the connector lines when the section comes into view
const wnSec=$('#whynow'),wnStage=$('.wn-stage'),wnStats=[...document.querySelectorAll('.wn-stat')].map(e=>({e:e,txt:e.textContent,nums:[...e.textContent.matchAll(/\d+/g)].map(m=>+m[0])}));
let wnDone=false;
const wnCount=()=>{if(wnDone||matchMedia('(prefers-reduced-motion: reduce)').matches)return;wnDone=true;const t0=performance.now();(function f(n){const p=Math.min(1,(n-t0)/1200),ease=1-Math.pow(1-p,3);wnStats.forEach(s=>{let k=0;s.e.textContent=s.txt.replace(/\d+/g,()=>String(Math.round(s.nums[k++]*ease)))});if(p<1)requestAnimationFrame(f)})(t0)};
const wnRun=()=>{wnSec.classList.add('go');wnCount()};
const wnObs=new IntersectionObserver(es=>{if(es[0].isIntersecting){wnRun();wnObs.disconnect()}},{threshold:.2});wnObs.observe(wnSec);
const vRestart=[...document.querySelectorAll('video')].filter(v=>!v.closest('.vglb'));
const vObs=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const v=e.target;try{v.currentTime=0}catch(_){}const p=v.play();if(p&&p.catch)p.catch(()=>{})}),{threshold:.25});vRestart.forEach(v=>vObs.observe(v));
// toolkit — rotating tools ring
const TK=[{n:'Google Ads',c:'linear-gradient(135deg,#4285f4,#1a56c8)',i:'media/tools/google-ads.png'},{n:'Meta Ads',c:'linear-gradient(135deg,#2f8cff,#0652d8)',i:'media/tools/meta.png'},{n:'Search Console',c:'linear-gradient(135deg,#3fbf68,#1a8a3e)',i:'media/tools/google%20search%20console.svg'},{n:'Google Analytics',c:'linear-gradient(135deg,#f9a825,#e65100)',i:'media/tools/google%20analytics.png'},{n:'Canva',c:'linear-gradient(135deg,#17d0d6,#7d2ae8)',i:'media/tools/Canva_Logo.svg.webp'},{n:'ChatGPT',c:'linear-gradient(135deg,#25b890,#0b8a69)',i:'media/tools/ChatGPT-Logo.png'},{n:'Claude',c:'linear-gradient(135deg,#e8906f,#c8603d)',i:'media/tools/claude-ai.svg'}];
const TKN=15,tkRing=$('#tkRing');
tkRing.innerHTML=Array.from({length:TKN},(_,k)=>{const t=TK[k%TK.length],a=(k*360/TKN).toFixed(2);return `<div class="tk-slot" style="--a:${a}deg"><div class="tk-un1"><div class="tk-un2"><div class="tk-bub" style="--c:${t.c}"><img src="${t.i}" alt=""><span>${t.n}</span></div></div></div></div>`}).join('');
const tkSlots=[...tkRing.querySelectorAll('.tk-slot')],tkUn=tkSlots.map(e=>e.querySelector('.tk-un2')),tkBub=tkSlots.map(e=>e.querySelector('.tk-bub'));
const tkFrame=th=>{tkRing.style.transform=`rotate(${th}deg)`;for(let k=0;k<TKN;k++){tkUn[k].style.transform=`rotate(${-th}deg)`;let f=(k*360/TKN+th+180)%360;if(f<0)f+=360;f=Math.abs(f-180);const d=Math.min(1,Math.max(0,(f-58)/22));tkBub[k].style.opacity=(1-.62*d).toFixed(3);tkBub[k].style.filter=d>0?`blur(${(d*1.6).toFixed(2)}px) saturate(${(1-.5*d).toFixed(2)})`:'none'}};
if(matchMedia('(prefers-reduced-motion: reduce)').matches)tkFrame(0);else{const tk0=performance.now();(function tkLoop(now){tkFrame(((now-tk0)/100000*360)%360);requestAnimationFrame(tkLoop)})(tk0)}
const Q=["“Everyone’s doing an MBA. Should I?”","“Is digital marketing just posting on Instagram?”","“Will AI take the job before I even get one?”","“I’m doing BCom, but what job does it actually lead to?”","“My parents want a safe job. I want one I’ll enjoy.”","“I’ve watched 50 career videos and I’m more confused.”"];const qr=a=>{const h=a.map(q=>`<div class="qp">${q}</div>`).join('');return h+h};H('#qw',`<div class="mq2"><div class="mt">${qr([Q[0],Q[2],Q[4]])}</div></div><div class="mq2"><div class="mt r">${qr([Q[1],Q[3],Q[5]])}</div></div>`);
const cu=n=>`<span class="cu" data-c="${n}">0</span>`;
const SIX=[["Marketing Uncovered","How brands attract, engage and convert customers."],["AI & Future Skills","How AI reshapes workflows and which skills still matter."],["Freelancing Blueprint","What clients need and how marketers develop services."],["Your 5-Year Roadmap","A framework for developing from beginner to professional."],["Industry Exposure","What agencies and businesses expect from marketers."],["Career Clarity","Explore jobs, freelancing, agencies and entrepreneurship."]];
const sx=(a,o)=>a.map((s,i)=>`<div class="sc2 rv"><em>0${i+o}</em><h3>${s[0]}</h3><p class="m" style="font-size:14px">${s[1]}</p></div>`).join('');
H('#s1',sx(SIX.slice(0,3),1));H('#s2',sx(SIX.slice(3),4));
const AG=[["The World of Marketing","Go beyond social media posts and ads.",["What marketing really is","How businesses use it","Role in today’s economy"],"◎"],["Career Opportunities You Didn’t Know Existed","Explore different career paths across the industry.",["Performance Marketing","SEO","Social Media Marketing","Content & Brand Strategy","Marketing Analytics","AI-Powered Marketing"],"✦"],["Is Marketing Right for You?","The mindset and skills required, and whether your interests align.",["Creative?","Analytical?","Curious about consumer behaviour?","Business & technology"],"?"],["What Companies Actually Look For","What companies look for in the people they hire.",["What businesses expect","Why practical skills matter","What makes you employable"],"◈"],["Your Roadmap Into Marketing","A beginner’s path into real-world work.",["How to get started","Skills to develop","Practical experience","Real-world readiness"],"➜"]];
const CHV=["media/ai-marketing-shift.jpg","media/global-tech-visionary.png","media/team.jpg","media/proof/gads-1.jpg","media/office/office-3.webp"];
// workshop agenda - pinned horizontal scroll (1:1 travel)
const pin=$('#agenda'),track=$('#agTrack'),clip=$('.ag-clip'),flower=$('#agFlower');
for(let k=0;k<9;k++){const p=document.createElement('i');p.style.transform=`rotate(${k*40-20}deg)`;flower.appendChild(p)}
const AGI=["◎","✦","?","◈","➜"];
H('#agTrack',AG.map((a,i)=>`<article class="ag-step rv"><div class="ag-step-h"><span class="ag-tab">Chapter: 0${i+1}</span><span class="ag-ico">${AGI[i]}</span></div><div class="ag-body"><div class="ag-meta">[ ${a[2].length} ] Topics <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2" y="3" width="12" height="11" rx="2"/><path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3"/></svg></div><h3>${a[0]}</h3><p class="ag-desc">${a[1]}</p><ol class="ag-ol">${a[2].map(t=>`<li>${t}</li>`).join('')}</ol></div></article>`).join(''));
const cards=[...track.children];let maxShift=0;const agReduce=matchMedia('(prefers-reduced-motion: reduce)').matches,agMobile=matchMedia('(max-width:768px)');
function measure(){if(agMobile.matches){maxShift=0;pin.style.height='';track.style.transform='';return}maxShift=Math.max(0,track.scrollWidth-clip.clientWidth);pin.style.height=(innerHeight+maxShift)+'px'}
function update(){if(agMobile.matches){track.style.transform='';return}const p=maxShift>0?Math.min(1,Math.max(0,-pin.getBoundingClientRect().top/maxShift)):0;track.style.transform=`translate3d(${-p*maxShift}px,0,0)`;const cr=clip.getBoundingClientRect();cards.forEach(c=>{const r=c.getBoundingClientRect();c.classList.toggle('in',r.right>cr.left&&r.left<cr.right)});if(!agReduce)flower.style.transform=`translate3d(0,${-scrollY*0.25}px,0) rotate(${scrollY*0.12}deg)`}
measure();update();
addEventListener('scroll',()=>requestAnimationFrame(update),{passive:true});
addEventListener('resize',()=>{measure();update()});
agMobile.addEventListener('change',()=>{measure();update()});
addEventListener('load',()=>{measure();update()});
document.fonts&&document.fonts.ready.then(()=>{measure();update()});
$('.ag-up').onclick=e=>{e.preventDefault();scrollTo({top:0,behavior:agReduce?'auto':'smooth'})};
const agUpBtn=$('.ag-up'),upVis=()=>agUpBtn.classList.toggle('on',scrollY>500);addEventListener('scroll',upVis,{passive:true});upVis();
const yn=(a,id)=>{H(id,a.map(t=>`<button type="button" class="uf-it" aria-pressed="false"><span class="uf-bx"></span><span class="uf-tx">${t}</span></button>`).join(''));const box=document.querySelector(id);box.querySelectorAll('.uf-it').forEach(b=>b.onclick=()=>{const on=b.classList.toggle('on');b.setAttribute('aria-pressed',on);const n=box.querySelectorAll('.uf-it.on').length,tot=box.querySelectorAll('.uf-it').length;if(id==='#yes'){document.querySelector('#yc').textContent=n;document.querySelector('#foryou .uf-yes').classList.toggle('hit',n>0)}else{const m=document.querySelector('#nc');m.textContent=n?n+' of '+tot+' sound like you — this workshop may not be the right fit.':'Nothing here sounds like you — good sign.';document.querySelector('#foryou .uf-no').classList.toggle('hit',n>0)}})};
yn(["You’ve finished Class 12 and are choosing a degree or course.","You’re in BBA, BCom, BMS, BA, BSc or BCA and want skills that earn alongside your degree.","You’re a fresh graduate weighing a job, an MBA, freelancing or a switch into marketing.","You want to work with clients in India and abroad."],'#yes');
yn(["You want to become an AI/ML engineer or software developer — this is applied AI for business.","You expect guaranteed income or a job from a 90-minute session.","You’re looking for a get-rich-quick shortcut — earning here takes skill and steady work.","You want to sit back and watch a lecture."],'#no');
document.querySelectorAll('.yn button').forEach(b=>b.onclick=()=>{b.parentNode.querySelectorAll('button').forEach(x=>x.classList.remove('s'));b.classList.add('s')});
const AUD=[["College Students","Wondering what to do after graduation? Explore a career option that combines creativity, technology and business."],["Freshers","Looking to enter a growing industry? Understand the skills and opportunities available to beginners."],["Working Professionals","Thinking about switching careers? Explore what transitioning into marketing could look like."],["Curious Explorers","Interested in marketing, AI, brands and business? Start by understanding how the industry works."]];
const ACI=['<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-5 9 5-9 5-9-5z"/><path d="M7 11v5c0 1.5 2.4 3 5 3s5-1.5 5-3v-5"/></svg>','<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18"/></svg>','<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3h4v4M21 3l-7 7M7 21l-4-4M3 17v4h4M3 21l7-7"/></svg>','<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>'];
const ACTEAS=["Not sure what to do after graduation?","Your first step into the industry.","Thinking of a career switch?","Marketing, AI, brands and business."];
H('#wh',AUD.map((w,i)=>`<div class="ac" tabindex="0" role="button" aria-label="${w[0]}"><div class="ac-in"><div class="ac-f"><div class="ac-top"><span class="ac-n">0${i+1}</span><span class="ac-ico">${ACI[i]}</span></div><div class="ac-mid"><span class="ac-watermark">0${i+1}</span><p class="ac-teaser">${ACTEAS[i]}</p></div><div class="ac-bot"><h3>${w[0]}</h3><span class="ac-hint"><span class="h">Hover to explore</span><span class="t">Tap to explore</span> <b>→</b></span></div></div><div class="ac-b"><span class="ac-ico ac-ico-light">${ACI[i]}</span><div><p>${w[1]}</p><a href="https://learn.teonox.com/web/checkout/6af840ffc14ddf1c3575796e">Book my seat →</a></div></div></div></div>`).join(''));
document.querySelectorAll('.ac').forEach(a=>{a.addEventListener('click',e=>{if(e.target.closest('a'))return;a.classList.toggle('flip')});a.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();a.classList.toggle('flip')}});a.addEventListener('mouseleave',()=>a.classList.remove('flip'))});
const PW=[
["meta","META ADS","30 ad sets","live — reach, frequency and cost per lead.","media/proof/gsc-2.jpg"],
["meta","META CAMPAIGNS","₹1.98L","spent across nine campaigns.","media/proof/gads-1.jpg"],
["meta","META PERFORMANCE","₹128","cost per lead from ₹1.77L spent.","media/proof/gsc-1.jpg"],
["gads","GOOGLE ADS","32,118","conversions, 1.26L clicks, ₹4.95L spent.","media/proof/ga-2.jpg"],
["gads","GOOGLE ADS","12.5 cr","impressions — ₹23.3L lifetime spend.","media/proof/meta-1.jpg"],
["gads","GOOGLE ADS","5,620","conversions at ₹2.79 CPC, ₹3.55L spent.","media/proof/meta-2.jpg"],
["seo","SEO","233K","impressions, 1.8K clicks in three months.","media/proof/meta-3.jpg"],
["seo","SEO","5.47K","clicks, 379K impressions, 1.7% CTR.","media/proof/gads-2.jpg"],
["seo","SEO","5.18K","clicks — average position 7.3.","media/proof/gads-3.jpg"],
["ga","ANALYTICS","28 days","traffic acquisition — sessions by channel.","media/proof/ga-1.jpg"]
];
H('#pwt',[["all","All work"],["meta","Meta Ads"],["gads","Google Ads"],["seo","SEO"],["ga","Analytics"]].map(([k,n])=>`<button type="button" role="tab" data-k="${k}" class="${k==='all'?'on':''}" aria-selected="${k==='all'}">${n}</button>`).join(''));
H('#pw',PW.map((p,i)=>`<div class="pw-card" data-k="${p[0]}" data-i="${i}" tabindex="0" role="button" aria-label="View ${p[1]} dashboard"><div class="pw-shot" style="background-image:url('${p[4]}')"></div><div class="pw-info"><span class="chip">${p[1]}</span><div class="pw-metric n gt">${p[2]}</div><p class="m">${p[3]}</p></div><button class="pw-view" tabindex="-1" aria-hidden="true">⤢</button></div>`).join(''));
const pwt=$('#pwt'),pwlb=$('#pwlb');
pwt.onclick=e=>{const b=e.target.closest('button');if(!b)return;[...pwt.children].forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-selected',x===b)});document.querySelectorAll('#pw .pw-card').forEach(c=>c.classList.toggle('hide',b.dataset.k!=='all'&&c.dataset.k!==b.dataset.k));pwTrack.scrollLeft=0;pwUpdate();pwStopAuto()};
const openPw=c=>{const p=PW[+c.dataset.i];if(!p)return;$('#pwlbimg').src=p[4];$('#pwlbimg').alt=p[1]+' dashboard';$('#pwlbcat').textContent=p[1];$('#pwlbmetric').textContent=p[2];$('#pwlbd').textContent=p[3];pwlb.classList.add('on');document.body.style.overflow='hidden';pwlb.querySelector('.pwlb-x').focus()};
const closePw=()=>{pwlb.classList.remove('on');document.body.style.overflow=''};
$('#pw').addEventListener('click',e=>{if(pwMoved){pwMoved=false;return}const c=e.target.closest('.pw-card');if(c)openPw(c)});
$('#pw').addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const c=e.target.closest('.pw-card');if(c){e.preventDefault();openPw(c)}});
/* slider controls: arrows, dots, drag/swipe, gentle autoplay */
const pwTrack=$('#pw'),pwPrev=document.querySelector('.pw-nav.prev'),pwNext=document.querySelector('.pw-nav.next'),pwd=$('#pwd');
let pwDrag=false,pwMoved=false,pwX=0,pwSL=0,pwAuto=0;
const pwVisible=()=>pwTrack.querySelectorAll('.pw-card:not(.hide)').length;
function pwStep(){const c=pwTrack.querySelector('.pw-card:not(.hide)');return c?c.getBoundingClientRect().width+18:340}
function pwIdx(){const n=pwVisible();return n?Math.min(n-1,Math.max(0,Math.round(pwTrack.scrollLeft/pwStep()))):0}
function pwUpdate(){const n=pwVisible();if(pwd.children.length!==n)pwd.innerHTML='<i></i>'.repeat(n);pwPrev.disabled=pwTrack.scrollLeft<=2;pwNext.disabled=pwTrack.scrollLeft+pwTrack.clientWidth>=pwTrack.scrollWidth-2;[...pwd.children].forEach((d,i)=>d.classList.toggle('on',i===pwIdx()))}
function pwGo(i){pwTrack.scrollTo({left:i*pwStep(),behavior:'smooth'})}
function pwStopAuto(){if(pwAuto){clearInterval(pwAuto);pwAuto=0}}
pwPrev.onclick=()=>{pwGo(pwIdx()-1);pwStopAuto()};
pwNext.onclick=()=>{pwGo(pwIdx()+1);pwStopAuto()};
pwd.onclick=e=>{if(e.target.tagName!=='I')return;pwGo([...pwd.children].indexOf(e.target));pwStopAuto()};
pwTrack.addEventListener('scroll',pwUpdate,{passive:true});
addEventListener('resize',pwUpdate);
pwTrack.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;pwDrag=true;pwMoved=false;pwX=e.clientX;pwSL=pwTrack.scrollLeft;pwTrack.style.scrollSnapType='none';pwStopAuto()});
pwTrack.addEventListener('pointermove',e=>{if(!pwDrag)return;const dx=e.clientX-pwX;if(Math.abs(dx)>6)pwMoved=true;pwTrack.scrollLeft=pwSL-dx});
const pwEnd=()=>{if(!pwDrag)return;pwDrag=false;pwTrack.style.scrollSnapType='';pwUpdate()};
pwTrack.addEventListener('pointerup',pwEnd);pwTrack.addEventListener('pointercancel',pwEnd);pwTrack.addEventListener('pointerleave',pwEnd);
pwUpdate();
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)pwAuto=setInterval(()=>{if(pwlb.classList.contains('on')||pwDrag||document.hidden||pwTrack.matches(':hover'))return;const n=pwVisible();if(n<2)return;pwGo(pwIdx()>=n-1?0:pwIdx()+1)},5000);
pwlb.onclick=e=>{if(e.target===pwlb||e.target.closest('.pwlb-x'))closePw()};
addEventListener('keydown',e=>{if(e.key==='Escape'&&pwlb.classList.contains('on'))closePw()});
const BL=[["Flipkart","flipkart"],["Reliance","reliace"],["DAMAC","damac"],["Gera","Gera"],["VTP","vtp"],["Kohinoor","kohinoor"],["BNI","bni"],["Kumar","Kumar"],["Mantra","mantra"],["Maccia","maccia"],["Vilas","vilas"],["AW","aw"],["A2 Digital","a2-digital"]];
const BRN=BL.length;
H('#lw',[...BL,...BL].map(([n,f])=>`<div class="lgt"><img src="media/brands/${f}.jpg" alt="${n}" loading="lazy"></div>`).join(''));
const brTrack=$('#lw'),brDots=$('#brDots'),brCards=[...brTrack.children];
let brI=0,brTimer=0;
const brMax=()=>Math.max(0,BRN-(matchMedia('(max-width:700px)').matches?2:5));
const brStep=()=>brCards[0]?brCards[0].getBoundingClientRect().width+16:216;
const brDotsRender=()=>{brDots.innerHTML=Array.from({length:brMax()+1},(_,i)=>`<i${i?'':' class="on"'}></i>`).join('')};
const brSet=(i,anim)=>{brTrack.style.transition=anim?'':'none';brTrack.style.transform=`translate3d(${-i*brStep()}px,0,0)`;if(!anim){void brTrack.offsetWidth;brTrack.style.transition=''}};
const brDotsUpdate=()=>{const m=brMax()+1;[...brDots.children].forEach((d,i)=>d.classList.toggle('on',i===(brI%m+m)%m))};
const brShow=n=>{brI=n;brSet(brI,true);brDotsUpdate();if(brI>brMax())setTimeout(()=>{brI=0;brSet(brI,false);brDotsUpdate()},650)};
const brPlay=()=>{clearInterval(brTimer);if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;brTimer=setInterval(()=>brShow(brI>=brMax()?brMax()+1:brI+1),4000)};
brDotsRender();brShow(0);brPlay();
$('.br-arrow.next').onclick=()=>{brShow(brI>=brMax()?brMax()+1:brI+1);brPlay()};
$('.br-arrow.prev').onclick=()=>{brShow(Math.max(0,brI-1));brPlay()};
brDots.onclick=e=>{const i=[...brDots.children].indexOf(e.target);if(i>=0){brShow(i);brPlay()}};
$('.br-slider').addEventListener('mouseenter',()=>clearInterval(brTimer));
$('.br-slider').addEventListener('mouseleave',brPlay);
addEventListener('resize',()=>{brDotsRender();brShow(brI)});
const CA=[["Session Hall","office-1.webp"],["Workspace","office-2.webp"],["Collaboration Area","office-3.webp"],["Learning Zone","office-4.webp"],["Studio Corner","office-5.webp"],["Reception","office-6.webp"]];
H('#caV','<div class="ca-track" id="caTrack">'+CA.map(c=>`<div class="ca-slide" style="background-image:url('media/office/${c[1]}')"></div>`).join('')+'</div><button class="ca-arrow prev" type="button" aria-label="Previous photo">‹</button><button class="ca-arrow next" type="button" aria-label="Next photo">›</button>');
const caMax=CA.length-2;
H('#caD',Array.from({length:caMax},(_,i)=>`<i${i?'':' class="on"'}></i>`).join(''));
H('#caT',CA.map((c,i)=>`<button type="button" class="${i?'':'on'}" style="background-image:url('media/office/${c[1]}')" aria-label="${c[0]}"></button>`).join(''));
const caV=$('#caV'),caTrack=$('#caTrack'),caD=$('#caD'),caT=$('#caT'),caN=$('#caN'),caSlides=[...caTrack.children];
let caI=0,caTimer=0;
const caStep=()=>{const s=caSlides[0];return s?s.getBoundingClientRect().width+(matchMedia('(max-width:700px)').matches?10:16):300};
const caShow=n=>{caI=((n%caMax)+caMax)%caMax;caTrack.style.transform=`translate3d(${-caI*caStep()}px,0,0)`;[...caD.children].forEach((d,i)=>d.classList.toggle('on',i===caI));[...caT.children].forEach((b,i)=>b.classList.toggle('on',i===caI||i===caI+1));caN.textContent=String(caI+1).padStart(2,'0')};
const caPlay=()=>{clearInterval(caTimer);if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;caTimer=setInterval(()=>caShow(caI+1),5000)};
$('.ca-arrow.next').onclick=()=>{caShow(caI+1);caPlay()};
$('.ca-arrow.prev').onclick=()=>{caShow(caI-1);caPlay()};
caD.onclick=e=>{const i=[...caD.children].indexOf(e.target);if(i>=0){caShow(i);caPlay()}};
caT.onclick=e=>{const b=e.target.closest('button');if(b){caShow(Math.min([...caT.children].indexOf(b),caMax));caPlay()}};
$('.ca-slider').addEventListener('mouseenter',()=>clearInterval(caTimer));
$('.ca-slider').addEventListener('mouseleave',caPlay);
addEventListener('resize',()=>caShow(caI));
caShow(0);caPlay();
const VG=[["After 12+ Years in Marketing","1:45"],["Can You Imagine?","0:49"],["Honestly, No One Tells You","0:52"],["Learning From YouTube?","0:37"],["Marketing Aaj Kya Hai?","0:56"],["ChatGPT Se Aage","1:06"]];
H('#vgTrack',VG.map((v,i)=>`<button class="vg-card" type="button" data-i="${i}" aria-label="Play video: ${v[0]}"><img src="media/video/poster-${i+1}.jpg" alt="${v[0]}" loading="lazy" draggable="false"><span class="vg-play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span><span class="vg-dur">${v[1]}</span><span class="vg-meta"><b>${v[0]}</b><small>Amit Manglani · Mentor</small></span></button>`).join(''));
const vgTrack=$('#vgTrack'),vgBar=$('#vgBar'),vglb=$('#vglb'),vgVideo=$('#vgVideo'),vglbCap=$('#vglbCap');
let vgActive=0,vgDown=false,vgStartX=0,vgStartL=0,vgMoved=false;
const vgStep=()=>{const c=vgTrack.querySelector('.vg-card');return c?c.getBoundingClientRect().width+16:260};
const vgScroll=()=>{const max=vgTrack.scrollWidth-vgTrack.clientWidth;const p=max>0?vgTrack.scrollLeft/max*100:0;vgBar.style.width=Math.max(8,p)+'%'};
vgTrack.addEventListener('scroll',vgScroll,{passive:true});
$('.vg-next').onclick=()=>vgTrack.scrollBy({left:vgStep(),behavior:'smooth'});
$('.vg-prev').onclick=()=>vgTrack.scrollBy({left:-vgStep(),behavior:'smooth'});
vgTrack.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;vgDown=true;vgMoved=false;vgStartX=e.clientX;vgStartL=vgTrack.scrollLeft;vgTrack.classList.add('drag')});
vgTrack.addEventListener('pointermove',e=>{if(!vgDown)return;const dx=e.clientX-vgStartX;if(Math.abs(dx)>6)vgMoved=true;if(vgMoved)vgTrack.scrollLeft=vgStartL-dx});
const vgEnd=()=>{if(!vgDown)return;vgDown=false;vgTrack.classList.remove('drag')};
addEventListener('pointerup',vgEnd);vgTrack.addEventListener('pointerleave',vgEnd);vgTrack.addEventListener('pointercancel',vgEnd);
vgTrack.addEventListener('click',e=>{if(vgMoved){vgMoved=false;return}const card=e.target.closest('.vg-card');if(card)vgOpen(+card.dataset.i)});
const vgOpen=i=>{vgActive=(i+VG.length)%VG.length;const v=VG[vgActive];vgVideo.poster=`media/video/poster-${vgActive+1}.jpg`;vgVideo.src=`media/video/video-${vgActive+1}.mp4`;vglbCap.textContent=`${v[0]} · ${v[1]}`;vglb.classList.add('on');document.body.style.overflow='hidden';const p=vgVideo.play();if(p&&p.catch)p.catch(()=>{})};
const vgClose=()=>{vglb.classList.remove('on');vgVideo.pause();document.body.style.overflow=''};
$('.vglb-x').onclick=vgClose;
vglb.addEventListener('click',e=>{if(e.target===vglb)vgClose()});
$('.vglb-prev').onclick=()=>vgOpen(vgActive-1);
$('.vglb-next').onclick=()=>vgOpen(vgActive+1);
addEventListener('keydown',e=>{if(!vglb.classList.contains('on'))return;if(e.key==='Escape')vgClose();if(e.key==='ArrowRight')vgOpen(vgActive+1);if(e.key==='ArrowLeft')vgOpen(vgActive-1)});
vgScroll();
H('#fq',[["Is it suitable for beginners?","Yes; no prior digital marketing or advertising software knowledge is required."],["Will I understand earning opportunities?","Explore jobs, freelancing, agency services and entrepreneurship, and the skills needed to pursue them."],["Will I get a career roadmap?","Explore a five-year development framework, not a guaranteed individual outcome."],["Is it complimentary?","Complimentary access is planned for eligible sessions, subject to availability; any charges will be disclosed."],["Can I attend online?","Online and offline options are planned; available sessions are shown during booking."],["Does it guarantee a job or income?","No. This is a career discovery experience."]].map(q=>`<div><button>${q[0]}<span>+</span></button><p>${q[1]}</p></div>`).join(''));
document.querySelectorAll('.faq button').forEach(b=>b.onclick=()=>{const d=b.parentNode,o=d.classList.contains('op');document.querySelectorAll('.faq>div').forEach(x=>x.classList.remove('op'));if(!o)d.classList.add('op')});
function nx(n){document.querySelectorAll('.stp').forEach((s,i)=>s.classList.toggle('on',i==n));document.querySelectorAll('.dots i').forEach((d,i)=>d.classList.toggle('on',i<=n))}
// observers + scroll
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('in')}),{threshold:.15});
document.querySelectorAll('.rv,.sl,.sr').forEach(e=>io.observe(e));
const orbs=[...document.querySelectorAll('.orb[data-p]')],trs=[...document.querySelectorAll('.tr')];
function sc(){const y=scrollY,vh=innerHeight;orbs.forEach(o=>{const r=o.parentNode.getBoundingClientRect();o.style.transform=`translateY(${(r.top-vh/2)*(o.dataset.p)}px)`});
trs.forEach(e=>{const r=e.getBoundingClientRect(),p=Math.min(1,Math.max(0,(vh*.9-r.top)/(vh*.55))),s=e.children,n=Math.round(p*s.length);for(let i=0;i<s.length;i++)s[i].classList.toggle('on',i<n)})}
addEventListener('scroll',sc,{passive:true});sc();

const cio=new IntersectionObserver(es=>es.forEach(x=>{if(!x.isIntersecting)return;cio.unobserve(x.target);const e=x.target,T=+e.dataset.c,s=performance.now();(function f(n){const p=Math.min(1,(n-s)/1600);e.textContent=Math.round(T*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(s)}));
document.querySelectorAll('.cu').forEach(e=>cio.observe(e));
const clamp=(v)=>Math.min(1,Math.max(0,v));
function fx(){const vh=innerHeight,h=document.documentElement;$('#pg').style.width=scrollY/(h.scrollHeight-vh)*100+'%';$('#pbar').classList.add('on');
const rc=$('#rc'),q=clamp(-rc.getBoundingClientRect().top/(rc.offsetHeight-vh)),p=clamp((q-.2)/.5),a=$('#sh'),b=$('#sh2');rc.style.setProperty('--p',p);a.style.opacity=1-p;a.style.filter=`blur(${p*12}px)`;a.style.transform=`translateY(${-p*30}px)`;b.style.opacity=p;b.style.transform=`translateY(${(1-p)*40}px) scale(${.92+.08*p})`;$('#rc3').style.opacity=p>.9?1:0;
}
addEventListener('scroll',fx,{passive:true});addEventListener('resize',fx);fx();
const sp=$('#sp');let mx=innerWidth/2,my=innerHeight/2,spx=mx,spy=my;
if(matchMedia('(hover:hover)').matches){addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY});(function L(){spx+=(mx-spx)*.12;spy+=(my-spy)*.12;sp.style.transform=`translate(${spx-300}px,${spy-300}px)`;requestAnimationFrame(L)})()}else sp.remove();
const TS='.__none';
document.addEventListener('mousemove',e=>{const t=e.target.closest(TS);if(t){const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transition='transform .1s';t.style.transform=`perspective(800px) rotateX(${-y*8}deg) rotateY(${x*8}deg) translateY(-4px)`}
const b=e.target.closest('.btn');if(b){const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.3}px)`}});
document.addEventListener('mouseout',e=>{const t=e.target.closest(TS+',.btn');if(t&&!t.contains(e.relatedTarget)){t.style.transition='transform .6s';t.style.transform=''}});

(function(){const it=['90 MINUTES · FULLY INTERACTIVE','BACKED BY A2 DIGITAL · 12+ YEARS','INDIA + GLOBAL OPPORTUNITIES'];H('#track',Array(5).fill(it).flat().map(x=>`<span>${x}</span>`).join(''));$('#track').innerHTML+=$('#track').innerHTML;
const WS=new Date('2026-11-25T19:00:00+05:30'),pd=n=>String(n).padStart(2,'0');
const _w=$('#when');if(_w)_w.textContent=WS.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',timeZone:'Asia/Kolkata'})+' · 7:00 PM IST';
let left=Math.max(0,Math.floor((WS-Date.now())/1000)),tickN=0;function tick(){left=Math.max(0,left-(tickN&&tickN%5===0?1+Math.floor(Math.random()*5):1));tickN++;const x=left,v={d:pd(Math.floor(x/86400)),h:pd(Math.floor(x%86400/3600)),m:pd(Math.floor(x%3600/60)),s:pd(x%60)};
document.querySelectorAll('[data-u]').forEach(e=>e.textContent=v[e.dataset.u]);const sb=document.querySelector('.bx.bsec b');if(sb){sb.classList.remove('tk');void sb.offsetWidth;sb.classList.add('tk')}}
tick();setInterval(tick,1000)})();
document.querySelectorAll('.ph').forEach(e=>{const s=e.dataset.src,v=e.dataset.video;if(v){e.insertAdjacentHTML('afterbegin',`<video src="${v}" autoplay muted loop playsinline></video>`);e.classList.add('has')}else if(s){e.style.backgroundImage=`url(${s})`;e.classList.add('has')}});
document.querySelectorAll('.lb').forEach(e=>{e.textContent=e.textContent.replace(/^\d+(?:–\d+)?\.\s*/,'')});



(function(){const seen=new Set();document.querySelectorAll('section .lb').forEach(l=>{const w=l.closest('.w');if(!w||seen.has(w))return;seen.add(w);let t='';for(const x of l.textContent.replace(/[?]/g,'').split(' ')){if((t+' '+x).length>16&&t)break;t+=(t?' ':'')+x}const g=document.createElement('span');g.className='gh';g.setAttribute('aria-hidden','true');g.textContent=t;w.prepend(g)});
const G=[...document.querySelectorAll('.gh')];function pg(){const vh=innerHeight;G.forEach(e=>{const r=e.parentNode.getBoundingClientRect();e.style.transform=`translateX(${(r.top-vh/2)*.16}px)`})}addEventListener('scroll',pg,{passive:true});pg()})();



// tap-to-fill cards on touch devices
if(matchMedia('(hover:none)').matches){document.addEventListener('click',e=>{const c=e.target.closest('.pc,.sc2');document.querySelectorAll('.pc.tap,.sc2.tap').forEach(x=>{if(x!==c)x.classList.remove('tap')});if(c)c.classList.toggle('tap')})}



document.querySelectorAll('.btn,.bt').forEach(b=>{[...b.childNodes].forEach(n=>{if(n.nodeType===3&&n.textContent.trim()){const t=n.textContent.trim(),r=document.createElement('span');r.className='rt';r.innerHTML=`<span>${t}</span><span aria-hidden="true">${t}</span>`;n.replaceWith(r)}})});



(function(){
/* ---- edit these per session ---- */
const SEATS={total:null,left:null};   // set real numbers (e.g. total:100,left:23) to show a seat meter
const WS=new Date('2026-11-25T19:00:00+05:30');
const rem=()=>Math.max(0,Math.floor((WS-Date.now())/1000));
const fmt=x=>{if(x<=0)return'live now';const d=Math.floor(x/86400),h=Math.floor(x%86400/3600),m=Math.floor(x%3600/60);return(d?d+'d ':'')+h+'h '+m+'m'};
const meter=()=>SEATS.total&&SEATS.left!=null?`<div class="sm"><div class="sb"><i style="width:${Math.round((SEATS.total-SEATS.left)/SEATS.total*100)}%"></i></div><span><b>Only ${SEATS.left}</b> of ${SEATS.total} seats left</span></div>`:`<div class="sm"><span><b>Seats are limited</b> — book early to secure yours</span></div>`;
const w=document.querySelector('#when');if(w)w.insertAdjacentHTML('afterend',meter());
const dots=document.querySelector('#reg .dots');if(dots)dots.insertAdjacentHTML('beforebegin','<p class="regt">Live session starts in <b data-rem></b></p>'+meter());
const mo=document.createElement('div');mo.className='umo';
mo.innerHTML=`<div class="uc" role="dialog" aria-label="Reserve your seat"><button class="ux" aria-label="Close">×</button><h3>Your seat isn’t booked yet</h3><p>The live workshop starts in <b data-rem></b>. Seats are limited — book yours before the session begins.</p><a class="btn" href="https://learn.teonox.com/web/checkout/6af840ffc14ddf1c3575796e" target="_blank" rel="noopener"><i>→</i>Book My Seat</a></div>`;
document.body.appendChild(mo);
const close=()=>mo.classList.remove('on');
mo.onclick=e=>{if(e.target===mo||e.target.closest('.ux')||e.target.closest('a'))close()};
addEventListener('keydown',e=>{if(e.key==='Escape')close()});
let shown=false;try{shown=sessionStorage.getItem('uo')==='1'}catch(e){}
const pop=()=>{if(shown||rem()<=0)return;shown=true;try{sessionStorage.setItem('uo','1')}catch(e){}mo.classList.add('on')};
const t0=Date.now();
document.addEventListener('mouseout',e=>{if(!e.relatedTarget&&e.clientY<=0&&Date.now()-t0>8000)pop()});
setTimeout(pop,45000);
const live=document.querySelector('.live');
function up(){const x=rem();document.querySelectorAll('[data-rem]').forEach(e=>e.textContent=fmt(x));document.body.classList.toggle('hot',x>0&&x<86400);if(x<=0&&live&&!live.dataset.e){live.dataset.e=1;live.lastChild.textContent='WORKSHOP IS LIVE NOW'}}
up();setInterval(up,1000);
})();



(function(){
/* ---- real data only ---- */
const JOINED={count:32+Math.floor(Math.random()*12),url:null};   // count: number of real bookings (e.g. 128). url: optional endpoint returning {"count":128}, polled every 30s
const els=[];
const mk=(anchor,pos)=>{const a=document.querySelector(anchor);if(!a)return;a.insertAdjacentHTML(pos,'<div class="jn"><span><b data-j>0</b> people have already joined this workshop</span></div>');els.push(a[pos==='afterend'?'nextElementSibling':'previousElementSibling'])};
mk('.hero2 .cta','afterend');
let cur=0;
function show(n){if(typeof n!=='number'||n<=0)return;const from=cur;cur=n;const t0=performance.now();els.forEach(e=>e&&e.classList.add('on'));document.querySelectorAll('[data-j]').forEach(x=>{x.classList.remove('jump');void x.offsetWidth;x.classList.add('jump')});(function f(t){const p=Math.min(1,(t-t0)/900),v=Math.round(from+(n-from)*(1-Math.pow(1-p,3)));document.querySelectorAll('[data-j]').forEach(x=>x.textContent=v);if(p<1)requestAnimationFrame(f)})(t0)}
if(JOINED.count)show(JOINED.count);
setInterval(()=>show(30+Math.floor(Math.random()*19)),4500);
setInterval(()=>{const n=30+Math.floor(Math.random()*19),pj=document.querySelector('[data-pj]');if(pj)pj.textContent=n;$('#pbar').classList.toggle('show-joined')},5500);
const uvVid=$('.uncover-vid video');if(uvVid){uvVid.muted=true;const uvGo=()=>uvVid.play().catch(()=>{});uvGo();new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)uvGo()}),{threshold:.1}).observe(uvVid)}
if(JOINED.url){const pull=()=>fetch(JOINED.url,{cache:'no-store'}).then(r=>r.json()).then(d=>show(+d.count)).catch(()=>{});pull();setInterval(pull,30000)}
})();


document.querySelectorAll('.btn,.bt,.uf-go,.cc a.wcta').forEach((b,i)=>b.style.setProperty('--bd',((i*0.85)%3.2).toFixed(2)+'s'));

(function(){var l=document.querySelector('.top-logo'),tick=false;function u(){if(!l)return;l.classList.toggle('hid',scrollY>60);tick=false}addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(u)}},{passive:true});u()})();

(function(){var a=document.getElementById('amit');if(!a)return;var o=new IntersectionObserver(function(e){if(e[0].isIntersecting){a.classList.add('in');o.disconnect()}},{threshold:.2});o.observe(a)})();