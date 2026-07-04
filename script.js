
(function() {
    'use strict';

    // ==================== CONFIGURATION ====================
    const CONFIG = {
        aosDuration: 800,
        aosOnce: true,
        aosOffset: 100,
        aosDisableMobile: true,
        brandColor: '#FF6B35',        // Your brand orange
        scrollThreshold: 50,          // Navbar change point
    };

    // ==================== INITIALIZE AOS ====================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: CONFIG.aosDuration,
            once: CONFIG.aosOnce,
            offset: CONFIG.aosOffset,
            disable: CONFIG.aosDisableMobile && window.innerWidth < 768,
        });
    } else {
        console.warn('AOS library not loaded – animations disabled.');
    }

    // ==================== NAVBAR SCROLL EFFECT ====================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            const isScrolled = window.scrollY > CONFIG.scrollThreshold;
            navbar.classList.toggle('scrolled', isScrolled);
        }, { passive: true });
    }

    // ==================== ACTIVE NAV LINK ====================
    (function highlightActiveLink() {
        // Get current page name (ignore query params and trailing slash)
        let currentPath = window.location.pathname;
        // Remove trailing slash if present
        currentPath = currentPath.replace(/\/$/, '');
        // Get just the filename (e.g., 'index.html')
        const currentPage = currentPath.split('/').pop() || 'index.html';

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    })();

    // ==================== SMOOTH SCROLL (Anchor Links) ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        });
    });

    // ==================== NEWSLETTER FORM ====================
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input[type="email"]');
            const email = input ? input.value.trim() : '';

            if (!email) {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Email Required',
                        text: 'Please enter a valid email address.',
                        confirmButtonColor: CONFIG.brandColor,
                    });
                } else {
                    alert('Please enter a valid email address.');
                }
                return;
            }

            // Simulate submission (replace with actual fetch/AJAX if needed)
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'success',
                    title: 'Subscribed!',
                    text: `Thank you for subscribing with ${email}`,
                    confirmButtonColor: CONFIG.brandColor,
                });
            } else {
                alert(`Thank you for subscribing with ${email}`);
            }
            this.reset();
        });
    }

    // ==================== CONTACT FORM (if present) ====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Optional: gather form data here
            // const formData = new FormData(this);

            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent!',
                    text: 'We will get back to you shortly.',
                    confirmButtonColor: CONFIG.brandColor,
                });
            } else {
                alert('Message sent! We will get back to you shortly.');
            }
            this.reset();
        });
    }

})();