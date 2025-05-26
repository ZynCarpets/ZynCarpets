// Mobile Menu Implementation
function initializeMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (!menuBtn || !navLinks) {
        console.warn('Mobile menu elements not found');
        return;
    }

    // Toggle menu function
    function toggleMenu() {
        menuBtn.classList.toggle('open');
        navLinks.classList.toggle('open');
        body.classList.toggle('menu-open');
    }

    // Remove previous event listeners if any (for test re-runs)
    menuBtn.onclick = null;
    navLinks.onclick = null;
    document.onclick = null;
    document.onkeydown = null;
    window.onresize = null;

    // Event Listeners
    menuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            toggleMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInside = navLinks.contains(e.target) || menuBtn.contains(e.target);
        if (!isClickInside && navLinks.classList.contains('open')) {
            toggleMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('open')) {
            toggleMenu();
        }
    });

    // Close menu on window resize (if screen becomes larger than mobile breakpoint)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && navLinks.classList.contains('open')) {
            toggleMenu();
        }
    });
}

// For browser usage, auto-initialize on DOMContentLoaded
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeMobileMenu);
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializeMobileMenu };
} 