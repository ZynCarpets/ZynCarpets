// Import the mobile menu functionality
const { initializeMobileMenu } = require('../mobile-menu');

// Mobile Menu Tests
describe('Mobile Menu', () => {
    let mobileMenuBtn;
    let navLinks;
    let body;

    beforeEach(() => {
        // Set up the DOM elements
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
        
        // Initialize the mobile menu
        initializeMobileMenu();
        
        // Get references to the elements
        mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        navLinks = document.querySelector('.nav-links');
        body = document.body;
    });

    afterEach(() => {
        // Clean up
        document.body.innerHTML = '';
    });

    test('mobile menu button exists', () => {
        expect(mobileMenuBtn).not.toBeNull();
    });
    
    test('nav links exist', () => {
        expect(navLinks).not.toBeNull();
    });
    
    test('clicking mobile menu button toggles active class', () => {
        // Initial state
        expect(mobileMenuBtn.classList.contains('active')).toBe(false);
        expect(navLinks.classList.contains('active')).toBe(false);
        
        // Click the button
        mobileMenuBtn.click();
        
        // Check if classes are toggled
        expect(mobileMenuBtn.classList.contains('active')).toBe(true);
        expect(navLinks.classList.contains('active')).toBe(true);
        
        // Click again
        mobileMenuBtn.click();
        
        // Check if classes are toggled back
        expect(mobileMenuBtn.classList.contains('active')).toBe(false);
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
        expect(mobileMenuBtn.classList.contains('active')).toBe(false);
    });
    
    test('clicking outside closes the menu', () => {
        // Open the menu
        mobileMenuBtn.click();
        expect(navLinks.classList.contains('active')).toBe(true);
        
        // Click outside
        document.body.click();
        
        // Check if menu is closed
        expect(navLinks.classList.contains('active')).toBe(false);
        expect(mobileMenuBtn.classList.contains('active')).toBe(false);
    });
    
    test('clicking inside menu does not close it', () => {
        // Open the menu
        mobileMenuBtn.click();
        expect(navLinks.classList.contains('active')).toBe(true);
        
        // Click inside the menu
        navLinks.click();
        
        // Check if menu stays open
        expect(navLinks.classList.contains('active')).toBe(true);
        expect(mobileMenuBtn.classList.contains('active')).toBe(true);
    });
}); 