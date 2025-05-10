// Mobile Menu Implementation
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!mobileMenuBtn || !navLinks) {
        console.error('Mobile menu elements not found:', { mobileMenuBtn, navLinks });
        return;
    }

    console.log('Mobile menu initialized with elements:', { mobileMenuBtn, navLinks });

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
        console.log('Menu visibility:', {
            display: window.getComputedStyle(navLinks).display,
            visibility: window.getComputedStyle(navLinks).visibility,
            opacity: window.getComputedStyle(navLinks).opacity,
            right: window.getComputedStyle(navLinks).right
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
}

// Export the function for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializeMobileMenu };
} 