// Mobile Menu Implementation
function initializeMobileMenu() {
    console.log('=== Mobile Menu Initialization Start ===');
    
    // Check if we're in a mobile viewport
    const isMobileViewport = window.innerWidth <= 900;
    console.log('Viewport width:', window.innerWidth, 'Is mobile viewport:', isMobileViewport);

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    console.log('Found elements:', {
        mobileMenuBtn: mobileMenuBtn ? 'Found' : 'Not found',
        navLinks: navLinks ? 'Found' : 'Not found'
    });

    if (!mobileMenuBtn || !navLinks) {
        console.error('Mobile menu elements not found:', { 
            mobileMenuBtn: mobileMenuBtn ? 'Found' : 'Not found',
            navLinks: navLinks ? 'Found' : 'Not found'
        });
        return;
    }

    // Log initial state
    console.log('Initial element states:', {
        buttonClasses: mobileMenuBtn.classList.toString(),
        navClasses: navLinks.classList.toString(),
        buttonDisplay: window.getComputedStyle(mobileMenuBtn).display,
        navDisplay: window.getComputedStyle(navLinks).display,
        navPosition: window.getComputedStyle(navLinks).position,
        navRight: window.getComputedStyle(navLinks).right,
        navVisibility: window.getComputedStyle(navLinks).visibility,
        navOpacity: window.getComputedStyle(navLinks).opacity
    });

    // Toggle menu when clicking the button
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Mobile menu button clicked');
        console.log('Before toggle - Classes:', {
            button: mobileMenuBtn.classList.toString(),
            nav: navLinks.classList.toString()
        });
        
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        console.log('After toggle - Classes:', {
            button: mobileMenuBtn.classList.toString(),
            nav: navLinks.classList.toString()
        });

        // Log computed styles after toggle
        console.log('Computed styles after toggle:', {
            buttonDisplay: window.getComputedStyle(mobileMenuBtn).display,
            navDisplay: window.getComputedStyle(navLinks).display,
            navPosition: window.getComputedStyle(navLinks).position,
            navRight: window.getComputedStyle(navLinks).right,
            navVisibility: window.getComputedStyle(navLinks).visibility,
            navOpacity: window.getComputedStyle(navLinks).opacity,
            navTransform: window.getComputedStyle(navLinks).transform,
            navZIndex: window.getComputedStyle(navLinks).zIndex
        });
    });

    // Close menu when clicking a nav link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            console.log('Nav link clicked, closing menu');
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            console.log('Clicked outside menu, closing');
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Prevent clicks inside menu from closing it
    navLinks.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Add resize handler
    window.addEventListener('resize', () => {
        console.log('Window resized:', {
            width: window.innerWidth,
            isMobileViewport: window.innerWidth <= 900,
            buttonDisplay: window.getComputedStyle(mobileMenuBtn).display,
            navDisplay: window.getComputedStyle(navLinks).display
        });
    });

    console.log('=== Mobile Menu Initialization Complete ===');
}

// Export the function for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializeMobileMenu };
} 