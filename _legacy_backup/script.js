// ============================================
// PORTFOLIO - JAVASCRIPT INTERACTIONS
// Smooth scrolling, animations, and UI enhancements
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // NAVIGATION
    // ============================================
    
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect for navigation
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when page is scrolled
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for internal links
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed nav
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optional: stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateOnScrollElements.forEach(element => {
        observer.observe(element);
    });
    
    // ============================================
    // HERO PARALLAX EFFECT
    // ============================================
    
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                heroBackground.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }
    
    // ============================================
    // DYNAMIC TEXT ANIMATION (Hero Title)
    // ============================================
    
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        // Add subtle animation on load
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'all 1s ease-out';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // ============================================
    // CARD HOVER EFFECTS
    // ============================================
    
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ============================================
    // GRADIENT TEXT ANIMATION
    // ============================================
    
    const gradientTexts = document.querySelectorAll('.gradient-text');
    
    gradientTexts.forEach(text => {
        // Add shimmer effect on hover
        text.addEventListener('mouseenter', function() {
            this.style.backgroundSize = '200% auto';
            this.style.transition = 'background-position 0.5s ease';
            this.style.backgroundPosition = 'right center';
        });
        
        text.addEventListener('mouseleave', function() {
            this.style.backgroundPosition = 'left center';
        });
    });
    
    // ============================================
    // PERFORMANCE OPTIMIZATION
    // ============================================
    
    // Debounce function for scroll events
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Apply debounce to scroll-heavy functions
    window.addEventListener('scroll', debounce(highlightNavigation, 10));
    
    // ============================================
    // LOADING ANIMATION
    // ============================================
    
    // Fade in body content
    document.body.style.opacity = '0';
    
    window.addEventListener('load', function() {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
    
    // ============================================
    // ACCESSIBILITY ENHANCEMENTS
    // ============================================
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Focus management for mobile menu
    navToggle.addEventListener('click', function() {
        if (navMenu.classList.contains('active')) {
            // Focus first menu item when menu opens
            const firstLink = navMenu.querySelector('.nav-link');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        }
    });
    
    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    
    console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #00d4ff;');
    console.log('%cInterested in the code? Check out the source!', 'font-size: 14px; color: #a0a0a0;');
    console.log('%cBuilt with ❤️ by Jaliya Nimantha', 'font-size: 12px; color: #707070;');
    
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get scroll percentage
function getScrollPercentage() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (scrollTop / scrollHeight) * 100;
}
