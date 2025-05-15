// Import the mobile menu functionality
const { initializeMobileMenu } = require('../js/mobile-menu');

// Mobile Menu Tests
describe('Mobile Menu', () => {
    let mobileMenuBtn;
    let navLinks;

    beforeEach(() => {
        document.body.innerHTML = `
            <button class="mobile-menu-btn">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav class="nav-links">
                <a href="#home">Home</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </nav>
        `;
        
        initializeMobileMenu();
        mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        navLinks = document.querySelector('.nav-links');
    });

    test('mobile menu button toggles menu visibility', () => {
        expect(mobileMenuBtn).toBeTruthy();
        expect(navLinks).toBeTruthy();
        
        // Initial state
        expect(navLinks.classList.contains('active')).toBe(false);
        
        // Click to open
        mobileMenuBtn.click();
        expect(navLinks.classList.contains('active')).toBe(true);
        
        // Click to close
        mobileMenuBtn.click();
        expect(navLinks.classList.contains('active')).toBe(false);
    });
    
    test('clicking a nav link closes the menu', () => {
        // Open the menu
        mobileMenuBtn.click();
        expect(navLinks.classList.contains('active')).toBe(true);
        
        // Click a nav link
        const firstLink = navLinks.querySelector('a');
        firstLink.click();
        
        // Check if menu is closed
        expect(navLinks.classList.contains('active')).toBe(false);
    });
}); 