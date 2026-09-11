// Quiz functionality - MUST be first
        var currentQuestion = 0;
        var questions = [
            { question: "Do you enjoy creating content?", options: ["Yes, I love it!", "Sometimes, it depends", "Not really"] },
            { question: "Do you like understanding people?", options: ["Yes, I'm curious about behavior", "Sometimes", "Not particularly"] },
            { question: "Do you enjoy selling or convincing others?", options: ["Yes, it's thrilling", "I'm okay at it", "Not my thing"] },
            { question: "Do you like experimenting with new tools?", options: ["Yes, especially AI tools", "I try when I have to", "I prefer what I know"] },
            { question: "Do you enjoy solving business problems?", options: ["Yes, it's like a puzzle", "Sometimes", "Not really"] }
        ];

        function selectAnswer(index) {
            currentQuestion++;
            var questionEl = document.getElementById('quizQuestion');
            var optionsEl = document.getElementById('quizOptions');
            var dots = document.querySelectorAll('.quiz-dot');
            
            if (currentQuestion >= questions.length) {
                document.getElementById('quizCard').querySelector('.quiz-options').style.display = 'none';
                document.getElementById('quizCard').querySelector('.quiz-question').style.display = 'none';
                document.getElementById('quizResult').classList.add('show');
                return;
            }
            
            questionEl.textContent = questions[currentQuestion].question;
            optionsEl.innerHTML = '';
            questions[currentQuestion].options.forEach(function(opt, i) {
                var btn = document.createElement('button');
                btn.className = 'quiz-option';
                btn.textContent = opt;
                btn.onclick = function() { selectAnswer(i); };
                optionsEl.appendChild(btn);
            });
            
            dots.forEach(function(dot, i) {
                dot.classList.remove('active', 'completed');
                if (i < currentQuestion) dot.classList.add('completed');
                if (i === currentQuestion) dot.classList.add('active');
            });
        }

        // Sticky CTA scroll effect
        window.addEventListener('scroll', function() {
            const stickyCta = document.getElementById('stickyCta');
            
            if (window.scrollY > 500) {
                stickyCta.classList.add('visible');
            } else {
                stickyCta.classList.remove('visible');
            }
        });

        // Video Gallery Slider
        let videoSliderPos = 0;
        const videoSliderTrack = document.getElementById('videoSliderTrack');
        const videoSliderCards = videoSliderTrack ? videoSliderTrack.querySelectorAll('.video-slider-card') : [];
        const videoSliderDotsContainer = document.getElementById('videoSliderDots');
        let videoCardsPerView = 4;
        let videoTotalSlides = 0;
        let videoAutoplayInterval;

        function initVideoSlider() {
            if (!videoSliderTrack || !videoSliderDotsContainer) return;
            
            const width = window.innerWidth;
            if (width <= 480) videoCardsPerView = 1;
            else if (width <= 768) videoCardsPerView = 2;
            else if (width <= 1024) videoCardsPerView = 3;
            else videoCardsPerView = 4;

            videoTotalSlides = Math.ceil(videoSliderCards.length / videoCardsPerView);
            videoSliderDotsContainer.innerHTML = '';
            
            for (let i = 0; i < videoTotalSlides; i++) {
                const dot = document.createElement('button');
                dot.className = 'video-slider-dot' + (i === 0 ? ' active' : '');
                dot.onclick = () => goToVideoSlide(i);
                videoSliderDotsContainer.appendChild(dot);
            }
            
            updateVideoSlider();
        }

        function updateVideoSlider() {
            if (!videoSliderTrack) return;
            const cardWidth = videoSliderCards[0].offsetWidth + 24;
            const offset = videoSliderPos * cardWidth * videoCardsPerView;
            videoSliderTrack.style.transform = `translateX(-${offset}px)`;
            
            document.querySelectorAll('.video-slider-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === videoSliderPos);
            });
        }

        function slideVideos(dir) {
            videoSliderPos += dir;
            if (videoSliderPos < 0) videoSliderPos = videoTotalSlides - 1;
            if (videoSliderPos >= videoTotalSlides) videoSliderPos = 0;
            updateVideoSlider();
            resetVideoAutoplay();
        }

        function goToVideoSlide(index) {
            videoSliderPos = index;
            updateVideoSlider();
            resetVideoAutoplay();
        }

        function startVideoAutoplay() {
            videoAutoplayInterval = setInterval(() => slideVideos(1), 4000);
        }

        function resetVideoAutoplay() {
            clearInterval(videoAutoplayInterval);
            startVideoAutoplay();
        }

        // Drag support for video slider
        let videoDragStart = 0;
        let videoDragging = false;

        if (videoSliderTrack) {
            videoSliderTrack.addEventListener('mousedown', (e) => {
                videoDragStart = e.clientX;
                videoDragging = true;
                videoSliderTrack.style.transition = 'none';
            });

            document.addEventListener('mousemove', (e) => {
                if (!videoDragging) return;
                const diff = e.clientX - videoDragStart;
                if (Math.abs(diff) > 50) {
                    slideVideos(diff > 0 ? -1 : 1);
                    videoDragging = false;
                }
            });

            document.addEventListener('mouseup', () => {
                videoDragging = false;
                if (videoSliderTrack) videoSliderTrack.style.transition = '';
            });
        }

        initVideoSlider();
        startVideoAutoplay();
        window.addEventListener('resize', initVideoSlider);

        // Video Play/Pause
        function playSliderVideo(btn) {
            const wrapper = btn.closest('.video-slider-wrapper');
            const video = wrapper.querySelector('video');
            
            document.querySelectorAll('.video-slider-wrapper video').forEach(v => {
                if (v !== video) {
                    v.pause();
                    v.closest('.video-slider-wrapper').classList.remove('playing');
                }
            });
            
            video.play();
            wrapper.classList.add('playing');
        }

        // Phone Mockup Video
        function togglePhoneVideo(overlay) {
            const phoneScreen = overlay.closest('.phone-screen');
            const video = phoneScreen.querySelector('.phone-video');
            const playBtn = overlay.querySelector('.phone-play-btn');
            
            if (video.paused) {
                video.play();
                overlay.classList.add('hidden');
            } else {
                video.pause();
                overlay.classList.remove('hidden');
            }
        }

        document.querySelectorAll('.video-slider-wrapper video').forEach(video => {
            video.addEventListener('click', function() {
                const wrapper = this.closest('.video-slider-wrapper');
                if (this.paused) {
                    document.querySelectorAll('.video-slider-wrapper video').forEach(v => {
                        if (v !== this) {
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

        // Countdown Timer
        function updateCountdown() {
            const workshopDate = new Date('2026-09-15T10:00:00');
            const now = new Date();
            const diff = workshopDate - now;

            if (diff <= 0) {
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);

        // Registration Modal
        function openRegisterModal() {
            document.getElementById('registerModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeRegisterModal() {
            document.getElementById('registerModal').classList.remove('active');
            document.body.style.overflow = '';
        }

        // Open modal when clicking register buttons
        document.querySelectorAll('a[href="#register"]').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                openRegisterModal();
            });
        });

        // Close modal on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeRegisterModal();
        });

        // Google Apps Script webhook URL
        var WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwD25H1aTA5MzUXZvNjVOEPoBXNUl-QzFCNxwqwytC9_ysq1RUaLxHUwfWFAXO6jt4Mpw/exec';

        // Popup form submission
        var popupForm = document.getElementById('popupRegistrationForm');
        if (popupForm) {
            popupForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                e.stopPropagation();
                if (e.defaultPrevented === false) return;
                var btn = this.querySelector('button[type="submit"]');
                var originalText = btn.textContent;
                var successEl = document.getElementById('popupFormSuccessMessage');
                var errorEl = document.getElementById('popupFormErrorMessage');
                btn.textContent = 'Submitting...';
                btn.disabled = true;
                successEl.style.display = 'none';
                errorEl.style.display = 'none';

                try {
                    var formData = new FormData(this);
                    var data = Object.fromEntries(formData);
                    data.traffic_channel = data.source;
                    data.source = 'webinar';
                    data.submittedAt = new Date().toISOString();

                    var res = await fetch(WEBHOOK_URL, {
                        method: 'POST',
                        body: JSON.stringify(data),
                    });
                    var result = await res.json();

                    if (result.success) {
                        popupForm.reset();
                        successEl.style.display = 'block';
                        setTimeout(function() { closeRegisterModal(); }, 2500);
                    } else {
                        errorEl.style.display = 'block';
                    }
                } catch (err) {
                    errorEl.style.display = 'block';
                } finally {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }
            });
        }

        // Topic card toggle
        function toggleTopic(card) {
            card.classList.toggle('expanded');
        }

        // Get card toggle
        function toggleGet(card) {
            card.classList.toggle('expanded');
        }

        // Career info
        function showCareerInfo(card, career) {
            document.querySelectorAll('.career-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            const info = document.getElementById('careerInfo');
            const title = document.getElementById('careerTitle');
            const desc = document.getElementById('careerDescription');
            
            const careerData = {
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

        // Gift reveal
        function revealGift() {
            document.getElementById('giftRevealModal').classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        function closeGiftReveal() {
            document.getElementById('giftRevealModal').classList.remove('show');
            document.body.style.overflow = '';
        }

        // Close modal on outside click
        document.getElementById('giftRevealModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeGiftReveal();
            }
        });

        // Close modal on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeGiftReveal();
            }
        });

        document.addEventListener('DOMContentLoaded', function() {

            // Testimonials Slider - Fresh Start
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
                    if (i === testIndex) d.classList.add('active');
                    else d.classList.remove('active');
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
            
            function startTestTimer() {
                testTimer = setInterval(nextTestimonial, 4000);
            }
            
            function stopTestTimer() {
                clearInterval(testTimer);
            }
            
            if (testPrevBtn) {
                testPrevBtn.onclick = function() {
                    prevTestimonial();
                    stopTestTimer();
                    startTestTimer();
                };
            }
            
            if (testNextBtn) {
                testNextBtn.onclick = function() {
                    nextTestimonial();
                    stopTestTimer();
                    startTestTimer();
                };
            }
            
            // Create dots
            if (testDotsContainer && testCards.length > 0) {
                var numDots = Math.ceil(testCards.length / 3);
                testDotsContainer.innerHTML = '';
                for (var i = 0; i < numDots; i++) {
                    var dot = document.createElement('button');
                    dot.className = 'testimonials-dot' + (i === 0 ? ' active' : '');
                    dot.setAttribute('data-idx', i);
                    dot.onclick = function() {
                        testIndex = parseInt(this.getAttribute('data-idx'));
                        updateTestSlider();
                        stopTestTimer();
                        startTestTimer();
                    };
                    testDotsContainer.appendChild(dot);
                }
            }
            
            if (testCards.length > 0) {
                startTestTimer();
            }

            // Gallery Slider
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
            
            function startGalleryTimer() {
                galleryTimer = setInterval(function() { slideGallery(1); }, 4000);
            }
            
            function stopGalleryTimer() {
                clearInterval(galleryTimer);
            }
            
            if (galleryPrevBtn) {
                galleryPrevBtn.onclick = function() {
                    slideGallery(-1);
                    stopGalleryTimer();
                    startGalleryTimer();
                };
            }
            
            if (galleryNextBtn) {
                galleryNextBtn.onclick = function() {
                    slideGallery(1);
                    stopGalleryTimer();
                    startGalleryTimer();
                };
            }
            
            if (galleryTrack) {
                startGalleryTimer();
            }

            // Journey Slider Navigation
            var journeyWrapper = document.querySelector('.journey-cards-wrapper');
            var journeyPrev = document.getElementById('journeyPrev');
            var journeyNext = document.getElementById('journeyNext');
            
            if (journeyWrapper && journeyPrev && journeyNext) {
                var scrollAmount = 344;
                
                journeyPrev.addEventListener('click', function() {
                    journeyWrapper.scrollLeft = journeyWrapper.scrollLeft - scrollAmount;
                });
                
                journeyNext.addEventListener('click', function() {
                    journeyWrapper.scrollLeft = journeyWrapper.scrollLeft + scrollAmount;
                });
            }

            // Create gift particles
            const particlesContainer = document.getElementById('giftParticles');
            if (particlesContainer) {
                for (let i = 0; i < 20; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'gift-particle';
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.animationDelay = Math.random() * 4 + 's';
                    particle.style.animationDuration = (3 + Math.random() * 3) + 's';
                    particlesContainer.appendChild(particle);
                }
            }
        });

        // FAQ toggle
        function toggleFaq(question) {
            const item = question.parentElement;
            const wasActive = item.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            
            if (!wasActive) {
                item.classList.add('active');
            }
        }

        // Countdown Timer
        function startOfferCountdown() {
            var daysEl = document.getElementById('offerDays');
            var hoursEl = document.getElementById('offerHours');
            var minutesEl = document.getElementById('offerMinutes');
            var secondsEl = document.getElementById('offerSeconds');
            
            if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
            
            var endDate = new Date();
            endDate.setDate(endDate.getDate() + 6);
            endDate.setHours(23, 59, 59, 0);
            
            function updateCountdown() {
                var now = new Date();
                var diff = endDate - now;
                
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
                
                if (ring) ring.style.strokeDashoffset = 283 - (days / 6) * 283;
                if (ringHours) ringHours.style.strokeDashoffset = 283 - (hours / 24) * 283;
                if (ringMins) ringMins.style.strokeDashoffset = 283 - (minutes / 60) * 283;
                if (ringSecs) ringSecs.style.strokeDashoffset = 283 - (seconds / 60) * 283;
            }
            
            updateCountdown();
            setInterval(updateCountdown, 1000);
        }

        // Animated counter for urgency
        function animateCounter() {
            var registeredEl = document.getElementById('registeredCount');
            var seatsEl = document.getElementById('seatsLeft');
            
            if (!registeredEl || !seatsEl) return;
            
            var registered = 19;
            var seats = 6;
            
            setInterval(function() {
                // Randomly increase registered count
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

        // Initialize counters and countdown
        document.addEventListener('DOMContentLoaded', function() {
            animateCounter();
            startOfferCountdown();
        });

        // Form submission
        document.getElementById('registrationForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (e.defaultPrevented === false) return;
            var btn = this.querySelector('button[type="submit"]');
            var originalText = btn.textContent;
            var successEl = document.getElementById('formSuccessMessage');
            var errorEl = document.getElementById('formErrorMessage');
            btn.textContent = 'Submitting...';
            btn.disabled = true;
            successEl.style.display = 'none';
            errorEl.style.display = 'none';

            try {
                var formData = new FormData(this);
                var data = Object.fromEntries(formData);
                data.traffic_channel = data.source;
                data.source = 'webinar';
                data.submittedAt = new Date().toISOString();

                var res = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    body: JSON.stringify(data),
                });
                var result = await res.json();

                if (result.success) {
                    document.getElementById('registrationForm').reset();
                    successEl.style.display = 'block';
                } else {
                    errorEl.style.display = 'block';
                }
            } catch (err) {
                errorEl.style.display = 'block';
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });