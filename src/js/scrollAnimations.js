/**
 * Initializes scroll-based animations for elements like the logo,
 * header styling, and smooth scrolling for anchor links.
 * Uses IntersectionObserver for logo visibility and scroll events for others.
 */
function initializeScrollAnimations() {
    // Animation for logo visibility based on welcome section intersection
    const logoContainer = document.querySelector('.logo-container');
    const welcomeSection = document.querySelector('#welcome');
    
    if (logoContainer && welcomeSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    logoContainer.classList.add('visible');
                } else {
                    logoContainer.classList.remove('visible');
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(welcomeSection);
    } else {
        if (!logoContainer) console.warn('Scroll Animation: Logo container (.logo-container) not found.');
        if (!welcomeSection) console.warn('Scroll Animation: Welcome section (#welcome) not found.');
    }

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function setActiveLink() {
        const scrollPosition = window.scrollY + 100; // Offset for better detection

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Initial check
    setActiveLink();

    // Update on scroll
    window.addEventListener('scroll', setActiveLink);
    
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
            }
        });
    });
} 