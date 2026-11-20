/* ============================================================
   TEONOX — Marketing Uncovered | vanilla JS interactions
   ============================================================ */
(function () {
  'use strict';

  var CTA = 'Reserve Your Spot — Free';
  var WHATSAPP = '919890004828';
  var VENUE = 'TEONOX, Kothrud, Pune';
  var NEXT_DATE = 'Every Wednesday & Saturday';
  var STORAGE_KEY = 'teonox_marketing_uncovered_pass';

  function wa(msg) {
    return 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg);
  }
  function $(s, root) { return (root || document).querySelector(s); }
  function $$(s, root) { return Array.prototype.slice.call((root || document).querySelectorAll(s)); }

  /* ---------------- WhatsApp links ---------------- */
  ['#wa-fab'].forEach(function (sel) {
    var el = $(sel);
    if (el) el.href = wa("Hi Teonox, I'd like to know more about Marketing Uncovered.");
  });
  var waF = $('#wa-final');
  var waQ = $('#wa-question');
  if (waQ) waQ.href = wa('Hi TEONOX, I have a question about the Marketing Uncovered workshop (' + NEXT_DATE + ', ' + VENUE + ').');
  if (waF) waF.href = wa('Hi Teonox, I want to book a seat for Marketing Uncovered (' + NEXT_DATE + ', ' + VENUE + ').');
  /* ---------------- Scroll UI ---------------- */
  var progress = $('#progress');
  var sticky = $('#sticky-bar');
  var toTop = $('#to-top');

  function onScroll() {
    var el = document.documentElement;
    var total = el.scrollHeight - el.clientHeight;
    progress.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
    sticky.classList.toggle('show', window.scrollY > 480);
    toTop.classList.toggle('show', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------- Offline indicator ---------------- */
  var offline = $('#offline');
  function setOnline() { offline.classList.toggle('show', !navigator.onLine); }
  window.addEventListener('online', setOnline);
  window.addEventListener('offline', setOnline);
  setOnline();

  /* ---------------- Reveal on scroll ---------------- */
  var reveals = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reveals.forEach(function (s) { s.classList.add('reveal'); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (s) { io.observe(s); });
  }

  /* ---------------- Accordions ---------------- */
  $$('[data-accordion]').forEach(function (group) {
    var items = $$('.acc-item, .faq-item', group);

    function setIcon(item, name) {
      var t = $('.acc-toggle', item);
      if (t && t.firstElementChild) t.firstElementChild.setAttribute('href', '#' + name);
    }
    function setExpanded(item, expanded) {
      if (!item.classList.contains('faq-item')) return;
      var btn = $('.faq-btn', item);
      if (btn) btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }

    items.forEach(function (item) {
      var btn = $('.acc-btn, .faq-btn', item);
      if (!btn) return;
      setExpanded(item, item.classList.contains('open'));
      btn.addEventListener('click', function () {
        var wasOpen = item.classList.contains('open');
        items.forEach(function (other) {
          other.classList.remove('open');
          setExpanded(other, false);
          setIcon(other, 'i-plus');
        });
        if (!wasOpen) {
          item.classList.add('open');
          setExpanded(item, true);
          setIcon(item, 'i-minus');
        }
      });
    });
    // sync initial icon state
    items.forEach(function (item) {
      if (item.classList.contains('open')) setIcon(item, 'i-minus');
    });
  });

  /* ---------------- Sliders ---------------- */
  function perViewFor(track) {
    var rules = (track.dataset.perview || '0:1').split(',').map(function (r) {
      var p = r.split(':');
      return { min: parseInt(p[0], 10), count: parseInt(p[1], 10) };
    }).sort(function (a, b) { return b.min - a.min; });
    for (var i = 0; i < rules.length; i++) {
      if (window.innerWidth >= rules[i].min) return rules[i].count;
    }
    return 1;
  }

  $$('.slider').forEach(function (slider) {
    var viewport = $('.slider-viewport', slider);
    var track = $('.slider-track', slider);
    var cards = $$(':scope > *', track);
    var dotsBox = $('[data-dots]', slider);
    var prev = $('[data-prev]', slider);
    var next = $('[data-next]', slider);
    var index = 0;
    var perView = 1;
    var timer = null;

    function layout() {
      perView = perViewFor(track);
      var gap = parseFloat(getComputedStyle(track).columnGap) || 20;
      cards.forEach(function (c) {
        c.style.flexBasis = 'calc((100% - ' + ((perView - 1) * gap) + 'px) / ' + perView + ')';
      });
      if (dotsBox) {
        var pages = Math.max(1, Math.ceil(cards.length / perView));
        dotsBox.innerHTML = '';
        for (var i = 0; i < pages; i++) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'dot' + (i === 0 ? ' active' : '');
          b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
          (function (n) {
            b.addEventListener('click', function () { go(n); });
          })(i);
          dotsBox.appendChild(b);
        }
      }
      go(0);
    }

    function step() {
      var first = cards[0];
      if (!first) return viewport.clientWidth;
      var gap = parseFloat(getComputedStyle(track).columnGap) || 20;
      return first.getBoundingClientRect().width + gap;
    }
    function maxIndex() { return Math.max(0, cards.length - perView); }
    function go(i) {
      index = Math.max(0, Math.min(i, maxIndex()));
      viewport.scrollTo({ left: index * step(), behavior: 'smooth' });
      if (dotsBox) {
        $$('.dot', dotsBox).forEach(function (d, n) {
          d.classList.toggle('active', n === Math.round(index / perView));
        });
      }
    }
    function page(dir) { go(index + dir * perView); }

    if (prev) prev.addEventListener('click', function () { page(-1); });
    if (next) next.addEventListener('click', function () { page(1); });

    viewport.addEventListener('scroll', function () {
      var i = Math.round(viewport.scrollLeft / (step() || 1));
      index = Math.max(0, Math.min(i, maxIndex()));
      if (dotsBox) {
        $$('.dot', dotsBox).forEach(function (d, n) {
          d.classList.toggle('active', n === Math.round(index / perView));
        });
      }
    }, { passive: true });

    // drag to scroll (mouse)
    var dragging = false, startX = 0, startLeft = 0;
    viewport.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      dragging = true; startX = e.clientX; startLeft = viewport.scrollLeft;
      viewport.classList.add('dragging');
    });
    window.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      viewport.scrollLeft = startLeft - (e.clientX - startX);
    });
    window.addEventListener('pointerup', function () { dragging = false; viewport.classList.remove('dragging'); });

    // autoplay
    var autoplay = parseInt(slider.dataset.autoplay || '0', 10);
    function startAuto() {
      if (!autoplay) return;
      stopAuto();
      timer = window.setInterval(function () {
        if (document.hidden) return;
        var m = maxIndex();
        go(index >= m ? 0 : index + perView);
      }, autoplay);
    }
    function stopAuto() { if (timer) { clearInterval(timer); timer = null; } }
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);
    slider.addEventListener('focusin', stopAuto);
    slider.addEventListener('focusout', startAuto);

    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { layout(); startAuto(); }, 150);
    });

    layout();
    startAuto();
  });

  /* ---------------- Video play buttons ---------------- */
  $$('.js-play').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wrap = btn.closest('.video-wrap');
      var video = $('video', wrap);
      if (!video) return;
      $$('.video-wrap video').forEach(function (v) { if (v !== video) v.pause(); });
      $$('.video-wrap').forEach(function (w) { if (w !== wrap) w.classList.remove('playing'); });
      if (video.paused) {
        video.play().then(function () { wrap.classList.add('playing'); }).catch(function () {});
      } else {
        video.pause();
        wrap.classList.remove('playing');
      }
    });
  });
  $$('.video-wrap video').forEach(function (v) {
    v.addEventListener('pause', function () { v.closest('.video-wrap').classList.remove('playing'); });
    v.addEventListener('ended', function () { v.closest('.video-wrap').classList.remove('playing'); });
  });

  /* ---------------- Video thumbnails (frames from the videos) ---------------- */
  $$('.video-wrap video').forEach(function (video) {
    var src = video.getAttribute('src');
    if (!src) return;
    var probe = document.createElement('video');
    probe.preload = 'metadata';
    probe.muted = true;
    probe.playsInline = true;
    var finished = false;
    function done(url) {
      if (finished) return;
      finished = true;
      if (url) video.poster = url;
    }
    probe.addEventListener('loadedmetadata', function () {
      try { probe.currentTime = Math.min(0.5, Math.max(0.1, (probe.duration || 1) / 3)); }
      catch (e) { done(''); }
    }, { once: true });
    probe.addEventListener('seeked', function () {
      try {
        var c = document.createElement('canvas');
        c.width = probe.videoWidth;
        c.height = probe.videoHeight;
        var ctx = c.getContext('2d');
        if (!ctx || !c.width || !c.height) return done('');
        ctx.drawImage(probe, 0, 0, c.width, c.height);
        done(c.toDataURL('image/jpeg', 0.72));
      } catch (e) { done(''); }
    }, { once: true });
    probe.addEventListener('error', function () { done(''); }, { once: true });
    window.setTimeout(function () { done(''); }, 8000);
    probe.src = src;
  });

  /* ---------------- Booking modal ---------------- */
  var modal = $('#modal');
  var stepsBox = $('#steps');
  var modalTitle = $('#modal-title');
  var modalSub = $('#modal-sub');
  var stepEls = {
    details: $('#step-details'),
    profile: $('#step-profile'),
    pass: $('#step-pass')
  };
  var currentStep = 'details';
  var interest = 'Marketing';

  function readPass() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null'); }
    catch (e) { return null; }
  }
  function writePass(pass) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(pass)); } catch (e) {}
  }
  function sessionLabel(id) {
    return id === 'saturday'
      ? 'Saturday · 90-minute session'
      : 'Wednesday · 90-minute session';
  }
  function showStep(name) {
    currentStep = name;
    Object.keys(stepEls).forEach(function (k) {
      if (stepEls[k]) stepEls[k].classList.toggle('active', k === name);
    });
    stepsBox.style.display = name === 'pass' ? 'none' : 'flex';
    var pass = readPass();
    if (name === 'pass' && pass) fillPass(pass);
    modalTitle.textContent = pass ? 'Your Workshop Pass' : 'Reserve your spot — Free';
    modalSub.textContent = pass ? 'Seat confirmed • Saved offline on this device' : 'Instant confirmation on WhatsApp and email';
    if (name === 'pass') {
      modalTitle.textContent = 'Your Workshop Pass';
      modalSub.textContent = 'Seat confirmed • Saved offline on this device';
    }
    $('.modal-body').scrollTop = 0;
  }
  function fillPass(p) {
    $('#pass-name').textContent = p.name;
    $('#pass-phone').textContent = p.phone;
    $('#pass-id').textContent = p.passId;
    $('#pass-status').textContent = p.currentStatus;
    $('#pass-session').textContent = p.sessionLabel;
    $('#pass-mode').textContent = p.mode || 'Online / Offline';
    $('#pass-date').textContent = p.registeredAt;
  }
  function openModal() {
    var pass = readPass();
    showStep(pass ? 'pass' : 'details');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    updateProgress();
  }
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function updateProgress() {
    var map = { details: 1, profile: 2 };
    $$('.step', stepsBox).forEach(function (s, i) {
      s.classList.toggle('active', map[currentStep] > i);
    });
  }

  $$('.js-book').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });
  $('#modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  $('#step-details').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = $('#f-name').value.trim();
    var phone = $('#f-phone').value.trim();
    var consent = $('#f-consent').checked;
    if (!name || !phone || !consent) return;
    showStep('profile');
  });

  $$('#interests .pill-choice').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('#interests .pill-choice').forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      interest = b.textContent.trim();
    });
  });

  $('#step-profile').addEventListener('submit', function (e) {
    e.preventDefault();
    var email = $('#f-email').value.trim();
    if (!email) return;
    var btn = $('#confirm-btn');
    btn.disabled = true;
    btn.textContent = 'Confirming seat…';
    setTimeout(function () {
      var num = Math.floor(1000 + Math.random() * 9000);
      var sessionId = $('#f-session').value;
      var pass = {
        name: $('#f-name').value.trim(),
        phone: $('#f-phone').value.trim(),
        email: email,
        currentStatus: $('#f-stage').value + ' · ' + $('#f-stream').value + ' · ' + interest,
        sessionId: sessionId,
        sessionLabel: sessionLabel(sessionId),
        mode: $('#f-mode').value,
        passId: 'TNX-CU-' + num,
        registeredAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      };
      writePass(pass);
      btn.disabled = false;
      btn.innerHTML = 'Confirm my seat <svg><use href="#i-arrow-right"/></svg>';
      showStep('pass');
      var banner = $('.success-banner', stepEls.pass);
      if (banner) banner.style.display = 'flex';
    }, 600);
  });

  $('#cancel-pass').addEventListener('click', function () {
    if (!window.confirm('Do you want to cancel your reserved pass? Your seat will be released.')) return;
    localStorage.removeItem(STORAGE_KEY);
    ['#f-name', '#f-phone', '#f-email', '#f-college'].forEach(function (s) { $(s).value = ''; });
    showStep('details');
  });

  // hide the "just registered" banner whenever an existing pass is re-opened
  var passOnOpen = readPass();
  if (passOnOpen) {
    var b = $('.success-banner', stepEls.pass);
    if (b) b.style.display = 'none';
  }
})();
