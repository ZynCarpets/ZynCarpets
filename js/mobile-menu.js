// Mobile Menu Implementation
function initializeMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('open');
        menuBtn.classList.toggle('open');
        document.body.classList.toggle('menu-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('open');
            menuBtn.classList.remove('open');
            document.body.classList.remove('menu-open');
        });
    });
}

// Export the function for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializeMobileMenu };
} 