/* ============================================================
   TEONOX — Marketing Uncovered | vanilla JS interactions
   ============================================================ */
(function () {
  'use strict';

  var CTA = 'Reserve Your Spot — Free';
  var WHATSAPP = '919890004828';
  var VENUE = 'TEONOX, Kothrud, Pune';
  var NEXT_DATE = 'Wednesday, 25 Nov · 6:00 PM';
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
  var topbar = $('.topbar');
  var hero = $('.hero');

  function onScroll() {
    var el = document.documentElement;
    var total = el.scrollHeight - el.clientHeight;
    progress.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
    sticky.classList.toggle('show', window.scrollY > 480);
    toTop.classList.toggle('show', window.scrollY > 500);
    if (topbar) {
      var heroBottom = hero ? hero.offsetTop + hero.offsetHeight - topbar.offsetHeight : 80;
      topbar.classList.toggle('is-scrolled', window.scrollY > heroBottom);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
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

  /* ---------------- Commitment pass + sticky countdown ---------------- */
  function initCommitmentCountdown() {
    var roots = $$('.ticket-countdown');
    if (!roots.length) return;

    var targetTime = new Date('2026-11-25T18:00:00+05:30').getTime();

    function setText(el, value) {
      if (!el || el.textContent === value) return;
      el.textContent = value;
      el.classList.remove('is-ticking');
      void el.offsetWidth;
      el.classList.add('is-ticking');
    }
    function pad(value) { return value < 10 ? '0' + value : String(value); }

    function renderRoot(root) {
      var fields = {
        days: $('[data-countdown-days]', root),
        hours: $('[data-countdown-hours]', root),
        minutes: $('[data-countdown-minutes]', root),
        seconds: $('[data-countdown-seconds]', root)
      };
      var remaining = targetTime - Date.now();
      if (!isFinite(remaining) || remaining <= 0) {
        root.classList.add('is-ended');
        root.setAttribute('aria-label', 'Marketing Uncovered session started');
        return false;
      }
      var totalSeconds = Math.floor(remaining / 1000);
      setText(fields.days, pad(Math.floor(totalSeconds / 86400)));
      setText(fields.hours, pad(Math.floor((totalSeconds % 86400) / 3600)));
      setText(fields.minutes, pad(Math.floor((totalSeconds % 3600) / 60)));
      setText(fields.seconds, pad(totalSeconds % 60));
      return true;
    }

    function renderAll() {
      var active = true;
      roots.forEach(function (root) {
        if (!renderRoot(root)) active = false;
      });
      return active;
    }

    if (!renderAll()) return;
    var timer = window.setInterval(function () {
      if (!renderAll()) window.clearInterval(timer);
    }, 1000);
  }
  initCommitmentCountdown();

  /* ---------------- Audience role cycler ---------------- */
  (function () {
    var items = $$('.role-cycler-item');
    if (items.length < 2) return;

    var index = 0;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var timer = null;

    function show(next) {
      index = next;
      items.forEach(function (item, i) {
        var active = i === next;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
    }
    function start() {
      if (!timer && !reduceMotion) {
        timer = window.setInterval(function () { show((index + 1) % items.length); }, 3200);
      }
    }
    function stop() {
      if (timer) { window.clearInterval(timer); timer = null; }
    }

    show(0);
    if (reduceMotion) return;

    var cycler = $('.role-cycler');
    if (cycler) {
      cycler.addEventListener('mouseenter', stop);
      cycler.addEventListener('mouseleave', start);
      cycler.addEventListener('focusin', stop);
      cycler.addEventListener('focusout', start);
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });
    start();
  })();

  /* ---------------- Hero video playback ---------------- */
  (function () {
    var videos = $$('.hero-video');
    if (!videos.length) return;

    var desktop = $('.hero-video-desktop');
    var mobile = $('.hero-video-mobile');
    var query = window.matchMedia ? window.matchMedia('(max-width: 768px)') : null;

    function prefersMobile() {
      return query ? query.matches : window.innerWidth <= 768;
    }
    function activeVideos() {
      if (desktop && mobile) return prefersMobile() ? [mobile] : [desktop];
      return videos;
    }
    function showFallback() {
      var fallback = $('.hero-fallback');
      if (fallback) fallback.style.opacity = '1';
    }
    function play(video) {
      video.muted = true;
      var promise = video.play();
      if (promise && typeof promise.catch === 'function') {
        promise.catch(function () { showFallback(); });
      }
    }
    function sync() {
      var active = activeVideos();
      videos.forEach(function (video) {
        video.muted = true;
        video.defaultMuted = true;
        video.loop = true;
        video.playsInline = true;
        video.setAttribute('muted', '');
        video.setAttribute('loop', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        if (active.indexOf(video) === -1) {
          video.pause();
        } else if (video.paused && !document.hidden) {
          play(video);
        }
      });
    }

    videos.forEach(function (video) {
      video.addEventListener('canplay', function () {
        if (activeVideos().indexOf(video) !== -1 && video.paused && !document.hidden) play(video);
      });
    });
    if (query) {
      if (typeof query.addEventListener === 'function') query.addEventListener('change', sync);
      else if (typeof query.addListener === 'function') query.addListener(sync);
    }
    window.addEventListener('resize', sync, { passive: true });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) videos.forEach(function (video) { video.pause(); });
      else sync();
    });
    sync();
  })();

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

  
})();
