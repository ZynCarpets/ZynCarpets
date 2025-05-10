// Mobile Menu Implementation
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!mobileMenuBtn || !navLinks) {
        console.error('Mobile menu elements not found');
        return;
    }

    // Remove any existing event listeners by cloning and replacing elements
    const newMobileMenuBtn = mobileMenuBtn.cloneNode(true);
    mobileMenuBtn.parentNode.replaceChild(newMobileMenuBtn, mobileMenuBtn);
    
    const newNavLinks = navLinks.cloneNode(true);
    navLinks.parentNode.replaceChild(newNavLinks, navLinks);

    // Toggle menu when clicking the button
    newMobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Mobile menu button clicked');
        
        // Add active class to button first
        newMobileMenuBtn.classList.toggle('active');
        
        // Add active class to nav links with a slight delay for animation
        setTimeout(() => {
            newNavLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        }, 50);
    });

    // Close menu when clicking a nav link
    newNavLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            console.log('Nav link clicked, closing menu');
            newMobileMenuBtn.classList.remove('active');
            newNavLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (newNavLinks.classList.contains('active') && 
            !newNavLinks.contains(e.target) && 
            !newMobileMenuBtn.contains(e.target)) {
            console.log('Clicked outside menu, closing');
            newMobileMenuBtn.classList.remove('active');
            newNavLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Prevent clicks inside menu from closing it
    newNavLinks.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 900) {
                newMobileMenuBtn.classList.remove('active');
                newNavLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }, 250);
    });
}

// Export the function for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializeMobileMenu };
} 