document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Carousel functionality
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        if (slides[index]) {
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
        }
    }

    function changeSlide(direction) {
        currentSlideIndex += direction;
        
        if (currentSlideIndex >= totalSlides) {
            currentSlideIndex = 0;
        } else if (currentSlideIndex < 0) {
            currentSlideIndex = totalSlides - 1;
        }
        
        showSlide(currentSlideIndex);
    }

    function currentSlide(index) {
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
    }

    // Make functions global for onclick handlers
    window.changeSlide = changeSlide;
    window.currentSlide = currentSlide;

    // Fallback for non-JS users
    if (!slides.length) {
        document.querySelector('.carousel-controls')?.remove();
        document.querySelectorAll('.testimonial-slide').forEach(slide => {
            slide.style.display = 'block';
            slide.classList.add('active');
        });
    }

    // Auto-advance carousel every 8 seconds
    if (totalSlides > 1) {
        setInterval(() => {
            changeSlide(1);
        }, 8000);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Nav link clicked:', this.getAttribute('href')); // Debug navigation
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Skill tag filtering (only for testimonial strengths)
    function resetFilter() {
        document.querySelectorAll('.content-card.experience-card, .content-section').forEach(card => {
            card.style.display = 'block';
        });
        document.querySelectorAll('.testimonial-slide').forEach(slide => {
            slide.style.display = 'none';
            slide.classList.remove('active');
        });
        showSlide(currentSlideIndex);
    }

    document.querySelectorAll('.strength-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            resetFilter();
            const skill = this.textContent.toLowerCase();
            document.querySelectorAll('.testimonial-slide').forEach(slide => {
                const slideText = slide.textContent.toLowerCase();
                slide.style.display = slideText.includes(skill) ? 'block' : 'none';
                if (slideText.includes(skill)) {
                    slide.classList.add('active');
                }
            });
        });
    });

    // Reset filter button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Filter';
    resetButton.className = 'btn btn-outline';
    resetButton.addEventListener('click', resetFilter);
    document.querySelector('.titanium-story#testimonials')?.appendChild(resetButton);

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card, .content-card').forEach(card => {
        observer.observe(card);
    });

    // Header scroll effect
    let lastScrollY = window.scrollY;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScrollY = window.scrollY;
    });

    // Enhanced button interactions
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Print functionality enhancement
    window.addEventListener('beforeprint', function() {
        document.querySelectorAll('.carousel-controls').forEach(control => {
            control.style.display = 'none';
        });
        
        document.querySelectorAll('.testimonial-slide').forEach(slide => {
            slide.style.display = 'block';
            slide.classList.add('active');
        });

        document.querySelectorAll('.content-card.experience-card, .content-section').forEach(card => {
            card.style.display = 'block';
        });
    });

    window.addEventListener('afterprint', function() {
        document.querySelectorAll('.carousel-controls').forEach(control => {
            control.style.display = 'flex';
        });
        
        showSlide(currentSlideIndex);
        resetFilter();
    });

    // Keyboard navigation for carousel
    document.addEventListener('keydown', function(e) {
        if (totalSlides > 1) {
            switch(e.key) {
                case 'ArrowLeft':
                    changeSlide(-1);
                    break;
                case 'ArrowRight':
                    changeSlide(1);
                    break;
                case 'Home':
                    currentSlide(0);
                    break;
                case 'End':
                    currentSlide(totalSlides - 1);
                    break;
            }
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        carousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        carousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                changeSlide(1);
            } else {
                changeSlide(-1);
            }
        }
    }

    // Pause carousel on hover
    const carouselContainer = document.querySelector('.carousel-container');
    let autoAdvanceInterval;
    
    function startAutoAdvance() {
        if (totalSlides > 1) {
            autoAdvanceInterval = setInterval(() => {
                changeSlide(1);
            }, 8000);
        }
    }
    
    function stopAutoAdvance() {
        if (autoAdvanceInterval) {
            clearInterval(autoAdvanceInterval);
        }
    }
    
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoAdvance);
        carouselContainer.addEventListener('mouseleave', startAutoAdvance);
        startAutoAdvance();
    }
});