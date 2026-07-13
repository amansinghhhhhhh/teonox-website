document.addEventListener('DOMContentLoaded', function () {

  // Preloader & Loader
  var preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(function () { preloader.classList.add('hidden'); }, 500);
  }
  var loader = document.getElementById('loader');
  if (loader) {
    setTimeout(function () { loader.classList.add('hide'); }, 600);
  }

  // Nav toggle
  var navToggle = document.getElementById('navToggle');
  var navClose = document.getElementById('navClose');
  var navLinks = document.getElementById('navLinks');
  var navOverlay = document.getElementById('navOverlay');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.add('open');
      if (navOverlay) navOverlay.classList.add('show');
    });
  }
  if (navClose && navLinks) {
    navClose.addEventListener('click', function () {
      navLinks.classList.remove('open');
      if (navOverlay) navOverlay.classList.remove('show');
    });
  }
  if (navOverlay && navLinks) {
    navOverlay.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navOverlay.classList.remove('show');
    });
  }

  // Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Scroll reveal
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(function (el) {
    observer.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href && href.length > 1) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    item.addEventListener('click', function () {
      this.classList.toggle('open');
    });
  });

  // Nav scroll effect
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // Guarantee particles
  var guaranteeParticles = document.getElementById('guaranteeParticles');
  if (guaranteeParticles) {
    for (var i = 0; i < 18; i++) {
      var p = document.createElement('div');
      p.className = 'guarantee-particle';
      var s = Math.random() * 6 + 2;
      p.style.cssText =
        'width:' + s + 'px;height:' + s + 'px;left:' +
        Math.random() * 100 + '%;animation-duration:' +
        (Math.random() * 10 + 8) + 's;animation-delay:' +
        Math.random() * 8 + 's;';
      guaranteeParticles.appendChild(p);
    }
  }

});
