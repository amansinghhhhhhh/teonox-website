// Navigation scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav
function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('active');
}
function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('active');
}

// FAQ accordion
function toggleFaq(btn) {
  const item = btn.parentElement;
  const answer = item.querySelector('.faq-answer');
  const isActive = item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(i => {
    i.classList.remove('active');
    i.querySelector('.faq-answer').style.maxHeight = null;
  });
  if (!isActive) {
    item.classList.add('active');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// Auto-scroll using requestAnimationFrame
// NOTE: all movement (autoplay, arrow nav, drag) is done by translating
// the inner .slider-track, and always wraps modulo half the track width
// (the track's content is duplicated once) so the loop is seamless in
// both directions with no blank space at the ends.
var scrollOffsets = {};
var scrollAnimations = {};

function getSliderTrack(id) {
  var viewport = document.getElementById(id);
  return viewport ? viewport.querySelector('.slider-track') : null;
}

function applyOffset(id, offset) {
  var track = getSliderTrack(id);
  if (!track) return;
  var half = track.scrollWidth / 2;
  if (half > 0) {
    offset = offset % half;
    if (offset < 0) offset += half;
  }
  scrollOffsets[id] = offset;
  track.style.transform = 'translateX(-' + offset + 'px)';
}

function startAutoScroll(id, speed) {
  speed = speed || 0.4;
  var track = getSliderTrack(id);
  if (!track) return;
  stopAutoScroll(id);
  function tick() {
    applyOffset(id, (scrollOffsets[id] || 0) + speed);
    scrollAnimations[id] = requestAnimationFrame(tick);
  }
  scrollAnimations[id] = requestAnimationFrame(tick);
}
function stopAutoScroll(id) {
  if (scrollAnimations[id]) {
    cancelAnimationFrame(scrollAnimations[id]);
    delete scrollAnimations[id];
  }
}

// Start auto-scroll for all sliders
document.querySelectorAll('.slider-wrap').forEach(function(wrap) {
  var viewport = wrap.querySelector('.slider-viewport');
  var id = viewport ? viewport.id : null;
  if (!id) return;
  scrollOffsets[id] = 0;
  startAutoScroll(id, 0.4);
  wrap.addEventListener('mouseenter', function() {
    stopAutoScroll(id);
  });
  wrap.addEventListener('mouseleave', function() {
    startAutoScroll(id, 0.4);
  });
});

// Slider Arrows & Touch/Swipe
function slideScroll(id, dir) {
  var viewport = document.getElementById(id);
  if (!viewport) return;
  stopAutoScroll(id);
  var scrollAmount = viewport.offsetWidth * 0.6;
  var currentOffset = scrollOffsets[id] || 0;
  applyOffset(id, currentOffset + dir * scrollAmount);
  setTimeout(function() {
    startAutoScroll(id, 0.4);
  }, 1000);
}

// Touch/Swipe Support (drag also moves the track via the same offset
// system as autoplay/arrows, so it wraps the same seamless way)
document.querySelectorAll('.slider-viewport').forEach(function(viewport) {
  var startX, startOffset, isDragging = false;
  var viewportId = viewport.id;

  function dragStart(x) {
    isDragging = true;
    stopAutoScroll(viewportId);
    startX = x;
    startOffset = scrollOffsets[viewportId] || 0;
    viewport.style.cursor = 'grabbing';
  }
  function dragMove(x) {
    if (!isDragging) return;
    var walk = (startX - x) * 1.2;
    applyOffset(viewportId, startOffset + walk);
  }
  function dragEnd(resumeSpeed) {
    if (!isDragging) return;
    isDragging = false;
    viewport.style.cursor = 'grab';
    startAutoScroll(viewportId, resumeSpeed || 0.4);
  }

  viewport.addEventListener('mousedown', function(e) {
    dragStart(e.pageX);
    e.preventDefault();
  });
  viewport.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    dragMove(e.pageX);
    e.preventDefault();
  });
  viewport.addEventListener('mouseup', function() {
    dragEnd(1.0);
  });
  viewport.addEventListener('mouseleave', function() {
    dragEnd(0.4);
  });
  viewport.addEventListener('touchstart', function(e) {
    dragStart(e.touches[0].pageX);
  });
  viewport.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    dragMove(e.touches[0].pageX);
    e.preventDefault();
  });
  viewport.addEventListener('touchend', function() {
    dragEnd(0.4);
  });
});

// Reel card hover — pause/resume parent slider-track
document.querySelectorAll('.reel-card').forEach(function(card) {
  var viewport = card.closest('.slider-viewport');
  if (!viewport) return;
  card.addEventListener('mouseenter', function() {
    stopAutoScroll(viewport.id);
  });
  card.addEventListener('mouseleave', function() {
    startAutoScroll(viewport.id, 0.4);
  });
});

// Form Submit
function submitForm(e) {
  e.preventDefault();
  alert('Thank you! Your application has been submitted. Our team will contact you soon.');
  e.target.reset();
}

// Video Controls
function playReel(overlay) {
  var card = overlay.closest('.reel-card');
  var video = card.querySelector('video');
  var allVideos = document.querySelectorAll('.reel-card video');
  allVideos.forEach(function(v) {
    if (v !== video) { v.pause(); v.currentTime = 0; }
  });
  video.muted = false;
  video.play();
  overlay.style.display = 'none';
}

function togglePause(btn) {
  var card = btn.closest('.reel-card');
  var video = card.querySelector('video');
  var icon = btn.querySelector('i');
  if (video.paused) {
    video.play();
    icon.className = 'fas fa-pause';
    btn.classList.remove('active');
  } else {
    video.pause();
    icon.className = 'fas fa-play';
    btn.classList.add('active');
  }
}

function toggleMute(btn) {
  var card = btn.closest('.reel-card');
  var video = card.querySelector('video');
  var icon = btn.querySelector('i');
  video.muted = !video.muted;
  if (video.muted) {
    icon.className = 'fas fa-volume-xmark';
    btn.classList.add('active');
  } else {
    icon.className = 'fas fa-volume-high';
    btn.classList.remove('active');
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


function openApplyModal() {
  document.getElementById('applyModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeApplyModal() {
  document.getElementById('applyModal').classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('applyModal').addEventListener('click', function(e) {
    if (e.target === this) closeApplyModal();
  });
});
