/**
 * Initializes scroll-based animations for elements like the logo,
 * header styling, and smooth scrolling for anchor links.
 * Uses IntersectionObserver for logo visibility and scroll events for others.
 */
function initializeScrollAnimations() {
    // Animation for logo visibility based on welcome section intersection
    const logoImg = document.querySelector('.logo-img');
    const welcomeSection = document.querySelector('.logo-showcase'); // Assuming this is the trigger element

    if (logoImg && welcomeSection) {
        const logoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // When welcomeSection is NOT intersecting (e.g., scrolled past its top half), make logo visible
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) { 
                    logoImg.classList.add('visible');
                } else {
                    logoImg.classList.remove('visible');
                }
            });
        }, {
            threshold: 0.5 // Adjust threshold as needed: 0.5 means when 50% of welcomeSection is visible/hidden
        });
        
        logoObserver.observe(welcomeSection);
    } else {
        if (!logoImg) console.warn('Scroll Animation: Logo image (.logo-img) not found.');
        if (!welcomeSection) console.warn('Scroll Animation: Welcome section (.logo-showcase) not found.');
    }

    // Add other scroll-triggered animations here, e.g., for header styling
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) { // Threshold for scrolled state
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    } else {
        console.warn('Scroll Animation: Header element (header) not found for scroll styling.');
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                console.warn(`Smooth scroll: Target element '${targetId}' not found.`);
            }
        });
    });
} 