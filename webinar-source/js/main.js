// ─── Global functions (called from HTML onclick attributes) ───

function selectAnswer(index) {
    window._quizState.currentQuestion++;
    var questionEl = document.getElementById('quizQuestion');
    var optionsEl = document.getElementById('quizOptions');
    var dots = document.querySelectorAll('.quiz-dot');

    if (window._quizState.currentQuestion >= window._quizState.questions.length) {
        document.getElementById('quizCard').querySelector('.quiz-options').style.display = 'none';
        document.getElementById('quizCard').querySelector('.quiz-question').style.display = 'none';
        document.getElementById('quizResult').classList.add('show');
        return;
    }

    questionEl.textContent = window._quizState.questions[window._quizState.currentQuestion].question;
    optionsEl.innerHTML = '';
    window._quizState.questions[window._quizState.currentQuestion].options.forEach(function(opt, i) {
        var btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = opt;
        btn.onclick = function() { selectAnswer(i); };
        optionsEl.appendChild(btn);
    });

    dots.forEach(function(dot, i) {
        dot.classList.remove('active', 'completed');
        if (i < window._quizState.currentQuestion) dot.classList.add('completed');
        if (i === window._quizState.currentQuestion) dot.classList.add('active');
    });
}

function playSliderVideo(btn) {
    var wrapper = btn.closest('.video-slider-wrapper');
    var video = wrapper.querySelector('video');

    document.querySelectorAll('.video-slider-wrapper video').forEach(function(v) {
        if (v !== video) {
            v.pause();
            v.closest('.video-slider-wrapper').classList.remove('playing');
        }
    });

    video.play();
    wrapper.classList.add('playing');
}

function togglePhoneVideo(overlay) {
    var phoneScreen = overlay.closest('.phone-screen');
    var video = phoneScreen.querySelector('.phone-video');
    var icon = overlay.querySelector('.phone-play-btn i');

    if (video.paused) {
        video.play();
        overlay.classList.add('playing');
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        clearTimeout(overlay._fadeTimer);
        overlay._fadeTimer = setTimeout(function() {
            overlay.classList.add('faded');
        }, 2000);
    } else {
        video.pause();
        overlay.classList.remove('playing', 'faded');
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        clearTimeout(overlay._fadeTimer);
    }
}

function initPhoneVideoHover() {
    var screens = document.querySelectorAll('.phone-screen');
    screens.forEach(function(screen) {
        var overlay = screen.querySelector('.phone-video-overlay');
        if (!overlay) return;
        screen.addEventListener('mouseenter', function() {
            overlay.classList.remove('faded');
        });
        screen.addEventListener('mouseleave', function() {
            var video = screen.querySelector('.phone-video');
            if (video && !video.paused) {
                clearTimeout(overlay._fadeTimer);
                overlay._fadeTimer = setTimeout(function() {
                    overlay.classList.add('faded');
                }, 1500);
            }
        });
    });
}

function toggleTopic(card) {
    card.classList.toggle('expanded');
}

function toggleGet(card) {
    card.classList.toggle('expanded');
}

function showCareerInfo(card, career) {
    document.querySelectorAll('.career-card').forEach(function(c) { c.classList.remove('active'); });
    card.classList.add('active');

    var info = document.getElementById('careerInfo');
    var title = document.getElementById('careerTitle');
    var desc = document.getElementById('careerDescription');

    var careerData = {
        'AI Marketing': 'Combine artificial intelligence with marketing strategies to create data-driven campaigns, automate processes, and deliver personalized customer experiences at scale.',
        'Digital Marketing': 'Master social media marketing, SEO, content marketing, email campaigns, and analytics to grow businesses online.',
        'Content Creation': 'Create compelling videos, reels, blogs, and social media content that captures attention and builds audiences.',
        'Creator Economy': 'Build your personal brand, grow your following, and monetize your content across platforms like Instagram, YouTube, and TikTok.',
        'Freelancing': 'Offer your AI and marketing skills to clients worldwide, working on your own terms and schedule.',
        'Business': 'Launch your own venture using AI-powered tools and digital marketing strategies to reach customers globally.'
    };

    title.textContent = career;
    desc.textContent = careerData[career] || 'Explore this exciting career path.';
    info.classList.add('show');
}

function revealGift() {
    document.getElementById('giftRevealModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeGiftReveal() {
    document.getElementById('giftRevealModal').classList.remove('show');
    document.body.style.overflow = '';
}

function toggleFaq(question) {
    var item = question.parentElement;
    var wasActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach(function(i) { i.classList.remove('active'); });

    if (!wasActive) {
        item.classList.add('active');
    }
}

// ─── Quiz state ───

window._quizState = {
    currentQuestion: 0,
    questions: [
        { question: "Do you enjoy creating content?", options: ["Yes, I love it!", "Sometimes, it depends", "Not really"] },
        { question: "Do you like understanding people?", options: ["Yes, I'm curious about behavior", "Sometimes", "Not particularly"] },
        { question: "Do you enjoy selling or convincing others?", options: ["Yes, it's thrilling", "I'm okay at it", "Not my thing"] },
        { question: "Do you like experimenting with new tools?", options: ["Yes, especially AI tools", "I try when I have to", "I prefer what I know"] },
        { question: "Do you enjoy solving business problems?", options: ["Yes, it's like a puzzle", "Sometimes", "Not really"] }
    ]
};

// ─── Modal open/close (global for inline onclick) ───

function openRegisterModal() {
    document.getElementById('registerModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeRegisterModal() {
    document.getElementById('registerModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ─── DOMContentLoaded — ALL event listeners and DOM manipulation ───

document.addEventListener('DOMContentLoaded', function() {

    // Google Apps Script webhook URL
    var WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwD25H1aTA5MzUXZvNjVOEPoBXNUl-QzFCNxwqwytC9_ysq1RUaLxHUwfWFAXO6jt4Mpw/exec';

    // ─── Form validation helper ───

    function clearErrors(form) {
        form.querySelectorAll('.field-error').forEach(function(el) { el.remove(); });
        form.querySelectorAll('.form-group').forEach(function(g) { g.classList.remove('error'); });
    }

    function showError(form, fieldId, message) {
        var group = form.querySelector('#' + fieldId);
        if (!group) return;
        var formGroup = group.closest('.form-group');
        if (!formGroup) return;
        formGroup.classList.add('error');
        var err = document.createElement('div');
        err.className = 'field-error';
        err.textContent = message;
        err.style.display = 'block';
        formGroup.appendChild(err);
    }

    function validateForm(form) {
        clearErrors(form);
        var valid = true;

        // Full Name: required, min 3 chars, text only (letters, spaces, hyphens, apostrophes)
        var fullName = form.querySelector('[name="fullName"]');
        if (fullName) {
            var nameVal = fullName.value.trim();
            if (!nameVal) {
                showError(form, fullName.id, 'Full name is required.');
                valid = false;
            } else if (!/^[a-zA-Z\s'-]{3,}$/.test(nameVal)) {
                showError(form, fullName.id, 'Name must be at least 3 characters (letters, spaces, hyphens only).');
                valid = false;
            }
        }

        // Email: required, valid pattern
        var email = form.querySelector('[name="email"]');
        if (email) {
            var emailVal = email.value.trim();
            if (!emailVal) {
                showError(form, email.id, 'Email address is required.');
                valid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
                showError(form, email.id, 'Please enter a valid email address.');
                valid = false;
            }
        }

        // WhatsApp: required, exactly 10-15 digits
        var whatsapp = form.querySelector('[name="whatsapp"]');
        if (whatsapp) {
            var digits = whatsapp.value.replace(/\D/g, '');
            if (!digits) {
                showError(form, whatsapp.id, 'WhatsApp number is required.');
                valid = false;
            } else if (!/^\d{10,15}$/.test(digits)) {
                showError(form, whatsapp.id, 'Please enter 10 to 15 digits.');
                valid = false;
            }
        }

        // Location: required, letters and spaces only, min 2 chars
        var location = form.querySelector('[name="location"]');
        if (location) {
            var locVal = location.value.trim();
            if (!locVal) {
                showError(form, location.id, 'City / location is required.');
                valid = false;
            } else if (!/^[a-zA-Z\s'-]{2,}$/.test(locVal)) {
                showError(form, location.id, 'Please enter a valid city name (letters only, min 2 characters).');
                valid = false;
            }
        }

        // Dropdowns: required selection (value must not be empty)
        var dropdowns = ['qualification', 'profile', 'reason', 'source'];
        dropdowns.forEach(function(name) {
            var sel = form.querySelector('[name="' + name + '"]');
            if (sel && !sel.value) {
                var label = name.charAt(0).toUpperCase() + name.slice(1);
                showError(form, sel.id, 'Please select a ' + label.toLowerCase() + '.');
                valid = false;
            }
        });

        // Referral: optional — no validation

        return valid;
    }

    // ─── Submit handler (shared logic) ───

    function submitForm(form, successId, errorId) {
        var btn = form.querySelector('button[type="submit"]');
        var originalText = btn.textContent;
        var successEl = document.getElementById(successId);
        var errorEl = document.getElementById(errorId);
        btn.textContent = 'Submitting...';
        btn.disabled = true;
        successEl.style.display = 'none';
        errorEl.style.display = 'none';

        var formData = new FormData(form);
        var data = {};
        formData.forEach(function(value, key) { data[key] = value; });
        data.traffic_channel = data.source;
        data.source = 'webinar';
        data.submittedAt = new Date().toISOString();

        fetch(WEBHOOK_URL, {
            method: 'POST',
            body: JSON.stringify(data),
        })
        .then(function(res) { return res.json(); })
        .then(function(result) {
            if (result.success) {
                form.reset();
                successEl.style.display = 'block';
            } else {
                errorEl.style.display = 'block';
            }
        })
        .catch(function() {
            errorEl.style.display = 'block';
        })
        .finally(function() {
            btn.textContent = originalText;
            btn.disabled = false;
        });
    }

    // ─── Popup form submission ───

    var popupForm = document.getElementById('popupRegistrationForm');
    if (popupForm) {
        popupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (!validateForm(popupForm)) return;
            submitForm(popupForm, 'popupFormSuccessMessage', 'popupFormErrorMessage');
        });
    }

    // ─── Inline form submission ───

    var inlineForm = document.getElementById('registrationForm');
    if (inlineForm) {
        inlineForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (!validateForm(inlineForm)) return;
            submitForm(inlineForm, 'formSuccessMessage', 'formErrorMessage');
        });
    }

    // ─── Strip non-numeric characters from WhatsApp inputs ───

    document.querySelectorAll('input[name="whatsapp"]').forEach(function(input) {
        input.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    });

    // ─── Open modal on register buttons ───

    document.querySelectorAll('a[href="#register"]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openRegisterModal();
        });
    });

    // ─── Close modal on escape key ───

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeRegisterModal();
    });

    // ─── Close gift modal on outside click ───

    var giftModal = document.getElementById('giftRevealModal');
    if (giftModal) {
        giftModal.addEventListener('click', function(e) {
            if (e.target === giftModal) {
                closeGiftReveal();
            }
        });
    }

    // ─── Close gift modal on escape key ───

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeGiftReveal();
        }
    });

    // ─── Sticky CTA scroll effect ───

    window.addEventListener('scroll', function() {
        var stickyCta = document.getElementById('stickyCta');
        if (stickyCta) {
            if (window.scrollY > 500) {
                stickyCta.classList.add('visible');
            } else {
                stickyCta.classList.remove('visible');
            }
        }
    });

    // ─── Video Gallery Slider ───

    var videoSliderTrack = document.getElementById('videoSliderTrack');
    var videoSliderCards = videoSliderTrack ? videoSliderTrack.querySelectorAll('.video-slider-card') : [];
    var videoSliderDotsContainer = document.getElementById('videoSliderDots');
    var videoSliderState = { pos: 0, cardsPerView: 4, totalSlides: 0, autoplayInterval: null };

    function initVideoSlider() {
        if (!videoSliderTrack || !videoSliderDotsContainer) return;

        var width = window.innerWidth;
        if (width <= 480) videoSliderState.cardsPerView = 1;
        else if (width <= 768) videoSliderState.cardsPerView = 2;
        else if (width <= 1024) videoSliderState.cardsPerView = 3;
        else videoSliderState.cardsPerView = 4;

        videoSliderState.totalSlides = Math.ceil(videoSliderCards.length / videoSliderState.cardsPerView);
        videoSliderDotsContainer.innerHTML = '';

        for (var i = 0; i < videoSliderState.totalSlides; i++) {
            var dot = document.createElement('button');
            dot.className = 'video-slider-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('data-idx', i);
            dot.addEventListener('click', function() {
                goToVideoSlide(parseInt(this.getAttribute('data-idx')));
            });
            videoSliderDotsContainer.appendChild(dot);
        }

        updateVideoSlider();
    }

    function updateVideoSlider() {
        if (!videoSliderTrack || videoSliderCards.length === 0) return;
        var cardWidth = videoSliderCards[0].offsetWidth + 24;
        var offset = videoSliderState.pos * cardWidth * videoSliderState.cardsPerView;
        videoSliderTrack.style.transform = 'translateX(-' + offset + 'px)';

        document.querySelectorAll('.video-slider-dot').forEach(function(dot, i) {
            dot.classList.toggle('active', i === videoSliderState.pos);
        });
    }

    function slideVideos(dir) {
        videoSliderState.pos += dir;
        if (videoSliderState.pos < 0) videoSliderState.pos = videoSliderState.totalSlides - 1;
        if (videoSliderState.pos >= videoSliderState.totalSlides) videoSliderState.pos = 0;
        updateVideoSlider();
        resetVideoAutoplay();
    }

    function goToVideoSlide(index) {
        videoSliderState.pos = index;
        updateVideoSlider();
        resetVideoAutoplay();
    }

    function startVideoAutoplay() {
        videoSliderState.autoplayInterval = setInterval(function() { slideVideos(1); }, 4000);
    }

    function resetVideoAutoplay() {
        clearInterval(videoSliderState.autoplayInterval);
        startVideoAutoplay();
    }

    if (videoSliderTrack) {
        var videoDragStart = 0;
        var videoDragging = false;

        videoSliderTrack.addEventListener('mousedown', function(e) {
            videoDragStart = e.clientX;
            videoDragging = true;
            videoSliderTrack.style.transition = 'none';
        });

        document.addEventListener('mousemove', function(e) {
            if (!videoDragging) return;
            var diff = e.clientX - videoDragStart;
            if (Math.abs(diff) > 50) {
                slideVideos(diff > 0 ? -1 : 1);
                videoDragging = false;
            }
        });

        document.addEventListener('mouseup', function() {
            videoDragging = false;
            if (videoSliderTrack) videoSliderTrack.style.transition = '';
        });
    }

    initVideoSlider();
    startVideoAutoplay();
    window.addEventListener('resize', initVideoSlider);

    // ─── Video click play/pause ───

    document.querySelectorAll('.video-slider-wrapper video').forEach(function(video) {
        video.addEventListener('click', function() {
            var wrapper = this.closest('.video-slider-wrapper');
            if (this.paused) {
                document.querySelectorAll('.video-slider-wrapper video').forEach(function(v) {
                    if (v !== video) {
                        v.pause();
                        v.closest('.video-slider-wrapper').classList.remove('playing');
                    }
                });
                this.play();
                wrapper.classList.add('playing');
            } else {
                this.pause();
                wrapper.classList.remove('playing');
            }
        });

        video.addEventListener('ended', function() {
            this.closest('.video-slider-wrapper').classList.remove('playing');
        });
    });

    // ─── Countdown Timer ───

    var TARGET_DATE = new Date('2026-09-16T10:00:00+05:30');

    function updateCountdown() {
        var now = new Date();
        var diff = TARGET_DATE - now;

        if (diff <= 0) {
            var ids = ['days', 'hours', 'minutes', 'seconds'];
            ids.forEach(function(id) {
                var el = document.getElementById(id);
                if (el) el.textContent = '00';
            });
            return;
        }

        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((diff % (1000 * 60)) / 1000);

        var daysEl = document.getElementById('days');
        var hoursEl = document.getElementById('hours');
        var minutesEl = document.getElementById('minutes');
        var secondsEl = document.getElementById('seconds');
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ─── Offer Countdown ───

    function startOfferCountdown() {
        var daysEl = document.getElementById('offerDays');
        var hoursEl = document.getElementById('offerHours');
        var minutesEl = document.getElementById('offerMinutes');
        var secondsEl = document.getElementById('offerSeconds');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        var maxDays = 7;

        function tick() {
            var now = new Date();
            var diff = TARGET_DATE - now;

            if (diff <= 0) {
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                return;
            }

            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((diff % (1000 * 60)) / 1000);

            daysEl.textContent = days < 10 ? '0' + days : days;
            hoursEl.textContent = hours < 10 ? '0' + hours : hours;
            minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
            secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;

            var ring = document.getElementById('countdownRing');
            var ringHours = document.getElementById('countdownRingHours');
            var ringMins = document.getElementById('countdownRingMins');
            var ringSecs = document.getElementById('countdownRingSecs');

            if (ring) ring.style.strokeDashoffset = 283 - (days / maxDays) * 283;
            if (ringHours) ringHours.style.strokeDashoffset = 283 - (hours / 24) * 283;
            if (ringMins) ringMins.style.strokeDashoffset = 283 - (minutes / 60) * 283;
            if (ringSecs) ringSecs.style.strokeDashoffset = 283 - (seconds / 60) * 283;
        }

        tick();
        setInterval(tick, 1000);
    }

    startOfferCountdown();

    // ─── Animated counter for urgency ───

    var registeredEl = document.getElementById('registeredCount');
    var seatsEl = document.getElementById('seatsLeft');

    if (registeredEl && seatsEl) {
        var registered = 19;
        var seats = 6;

        setInterval(function() {
            if (Math.random() > 0.7 && registered < 24) {
                registered++;
                seats--;

                registeredEl.style.transform = 'scale(1.2)';
                seatsEl.style.transform = 'scale(1.2)';
                registeredEl.style.color = '#FF6A2B';
                seatsEl.style.color = '#FF6A2B';

                setTimeout(function() {
                    registeredEl.style.transform = 'scale(1)';
                    seatsEl.style.transform = 'scale(1)';
                    registeredEl.style.color = '';
                    seatsEl.style.color = '';
                }, 300);

                registeredEl.textContent = registered;
                seatsEl.textContent = seats;
            }
        }, 3000);
    }

    // ─── Testimonials Slider ───

    var testTrack = document.getElementById('testimonialsTrack');
    var testPrevBtn = document.getElementById('testPrevBtn');
    var testNextBtn = document.getElementById('testNextBtn');
    var testDotsContainer = document.getElementById('testDots');
    var testCards = testTrack ? testTrack.querySelectorAll('.testimonial-card') : [];
    var testIndex = 0;
    var testTimer;

    function updateTestSlider() {
        if (!testTrack || testCards.length === 0) return;
        var cardWidth = testCards[0].offsetWidth + 24;
        var moveAmount = testIndex * cardWidth * 3;
        testTrack.style.transform = 'translateX(-' + moveAmount + 'px)';

        var dots = document.querySelectorAll('.testimonials-dot');
        dots.forEach(function(d, i) {
            d.classList.toggle('active', i === testIndex);
        });
    }

    function nextTestimonial() {
        var maxIndex = Math.ceil(testCards.length / 3) - 1;
        testIndex++;
        if (testIndex > maxIndex) testIndex = 0;
        updateTestSlider();
    }

    function prevTestimonial() {
        var maxIndex = Math.ceil(testCards.length / 3) - 1;
        testIndex--;
        if (testIndex < 0) testIndex = maxIndex;
        updateTestSlider();
    }

    function startTestTimer() { testTimer = setInterval(nextTestimonial, 4000); }
    function stopTestTimer() { clearInterval(testTimer); }

    if (testPrevBtn) {
        testPrevBtn.addEventListener('click', function() {
            prevTestimonial();
            stopTestTimer();
            startTestTimer();
        });
    }

    if (testNextBtn) {
        testNextBtn.addEventListener('click', function() {
            nextTestimonial();
            stopTestTimer();
            startTestTimer();
        });
    }

    if (testDotsContainer && testCards.length > 0) {
        var numDots = Math.ceil(testCards.length / 3);
        testDotsContainer.innerHTML = '';
        for (var i = 0; i < numDots; i++) {
            var dot = document.createElement('button');
            dot.className = 'testimonials-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('data-idx', i);
            dot.addEventListener('click', function() {
                testIndex = parseInt(this.getAttribute('data-idx'));
                updateTestSlider();
                stopTestTimer();
                startTestTimer();
            });
            testDotsContainer.appendChild(dot);
        }
    }

    if (testCards.length > 0) startTestTimer();

    // ─── Gallery Slider ───

    var galleryTrack = document.getElementById('gallerySliderTrack');
    var galleryPrevBtn = document.getElementById('galleryPrevBtn');
    var galleryNextBtn = document.getElementById('galleryNextBtn');
    var galleryIndex = 0;
    var galleryTimer;

    function slideGallery(dir) {
        if (!galleryTrack) return;
        var slides = galleryTrack.querySelectorAll('.gallery-slide');
        var totalSlides = Math.ceil(slides.length / 3);
        galleryIndex += dir;
        if (galleryIndex < 0) galleryIndex = totalSlides - 1;
        if (galleryIndex >= totalSlides) galleryIndex = 0;

        var slideWidth = slides[0].offsetWidth + 20;
        galleryTrack.style.transform = 'translateX(-' + (galleryIndex * slideWidth * 3) + 'px)';
    }

    function startGalleryTimer() { galleryTimer = setInterval(function() { slideGallery(1); }, 4000); }
    function stopGalleryTimer() { clearInterval(galleryTimer); }

    if (galleryPrevBtn) {
        galleryPrevBtn.addEventListener('click', function() {
            slideGallery(-1);
            stopGalleryTimer();
            startGalleryTimer();
        });
    }

    if (galleryNextBtn) {
        galleryNextBtn.addEventListener('click', function() {
            slideGallery(1);
            stopGalleryTimer();
            startGalleryTimer();
        });
    }

    if (galleryTrack) startGalleryTimer();

    // ─── Journey Slider Navigation ───

    var journeyWrapper = document.querySelector('.journey-cards-wrapper');
    var journeyPrev = document.getElementById('journeyPrev');
    var journeyNext = document.getElementById('journeyNext');

    if (journeyWrapper && journeyPrev && journeyNext) {
        var scrollAmount = 344;

        journeyPrev.addEventListener('click', function() {
            journeyWrapper.scrollLeft -= scrollAmount;
        });

        journeyNext.addEventListener('click', function() {
            journeyWrapper.scrollLeft += scrollAmount;
        });
    }

    // ─── Gift particles ───

    var particlesContainer = document.getElementById('giftParticles');
    if (particlesContainer) {
        for (var i = 0; i < 20; i++) {
            var particle = document.createElement('div');
            particle.className = 'gift-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 4 + 's';
            particle.style.animationDuration = (3 + Math.random() * 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // ─── Scroll animations ───

    var observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
        observer.observe(el);
    });

    // ─── Smooth scroll for anchor links ───

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    initPhoneVideoHover();

});
