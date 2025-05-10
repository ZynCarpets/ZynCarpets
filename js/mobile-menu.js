// Mobile Menu Implementation
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!mobileMenuBtn || !navLinks) return;

    // Toggle menu when clicking the button
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a nav link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
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