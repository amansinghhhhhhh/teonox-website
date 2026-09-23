// FAQ accordion
function toggleFaq(btn) {
  const item = btn.parentElement;
  const answer = item.querySelector('.teonox-online-faq-answer');
  const isActive = item.classList.contains('teonox-online-active');
  document.querySelectorAll('.teonox-online-faq-item').forEach(i => {
    i.classList.remove('teonox-online-active');
    i.querySelector('.teonox-online-faq-answer').style.maxHeight = null;
  });
  if (!isActive) {
    item.classList.add('teonox-online-active');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('teonox-online-visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.teonox-online-reveal').forEach(el => observer.observe(el));


// Auto-scroll using requestAnimationFrame
// NOTE: all movement (autoplay, arrow nav, drag) is done by translating
// the inner .teonox-online-slider-track, and always wraps modulo half the track width
// (the track's content is duplicated once) so the loop is seamless in
// both directions with no blank space at the ends.
var scrollOffsets = {};
var scrollAnimations = {};

function getSliderTrack(id) {
  var viewport = document.getElementById(id);
  return viewport ? viewport.querySelector('.teonox-online-slider-track') : null;
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
document.querySelectorAll('.teonox-online-slider-wrap').forEach(function(wrap) {
  var viewport = wrap.querySelector('.teonox-online-slider-viewport');
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
document.querySelectorAll('.teonox-online-slider-viewport').forEach(function(viewport) {
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
document.querySelectorAll('.teonox-online-reel-card').forEach(function(card) {
  var viewport = card.closest('.teonox-online-slider-viewport');
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
  var card = overlay.closest('.teonox-online-reel-card');
  var video = card.querySelector('video');
  var allVideos = document.querySelectorAll('.teonox-online-reel-card video');
  allVideos.forEach(function(v) {
    if (v !== video) { v.pause(); v.currentTime = 0; }
  });
  video.muted = false;
  video.play();
  overlay.style.display = 'none';
}

function togglePause(btn) {
  var card = btn.closest('.teonox-online-reel-card');
  var video = card.querySelector('video');
  var icon = btn.querySelector('i');
  if (video.paused) {
    video.play();
    icon.className = 'teonox-online-fas teonox-online-fa-pause';
    btn.classList.remove('teonox-online-active');
  } else {
    video.pause();
    icon.className = 'teonox-online-fas teonox-online-fa-play';
    btn.classList.add('teonox-online-active');
  }
}

function toggleMute(btn) {
  var card = btn.closest('.teonox-online-reel-card');
  var video = card.querySelector('video');
  var icon = btn.querySelector('i');
  video.muted = !video.muted;
  if (video.muted) {
    icon.className = 'teonox-online-fas fa-volume-xmark';
    btn.classList.add('teonox-online-active');
  } else {
    icon.className = 'teonox-online-fas teonox-online-fa-volume-high';
    btn.classList.remove('teonox-online-active');
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
  document.getElementById('teonox-online-applyModal').classList.add('teonox-online-active');
  document.body.style.overflow = 'hidden';
}
function closeApplyModal() {
  document.getElementById('teonox-online-applyModal').classList.remove('teonox-online-active');
  document.body.style.overflow = '';
}
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('teonox-online-applyModal').addEventListener('click', function(e) {
    if (e.target === this) closeApplyModal();
  });
});
