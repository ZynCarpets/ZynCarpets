// Import the mobile menu functionality
const { initializeMobileMenu } = require('../src/js/mobile-menu');

// Mobile Menu Tests
describe('Mobile Menu', () => {
    beforeEach(() => {
        loadHtml(); // Load HTML from dist/index.html
        
        // It's crucial that initializeMobileMenu is called *after* the DOM is loaded
        // and any necessary elements from SITE_DATA are populated if it depends on them.
        // Assuming initializeMobileMenu itself finds its elements.
        initializeMobileMenu(); 
        
        // Re-query elements after DOM is loaded and menu initialized
        // mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        // navLinks = document.querySelector('.nav-links');
        // outsideElement = document.querySelector('.outside'); // Make sure .outside exists in your actual HTML or add it for test

        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
        document.body.innerHTML = ''; // Clean up body
        if (window.SITE_DATA) delete window.SITE_DATA; // Clean up site data
    });

    test('mobile menu button toggles menu visibility and classes', () => {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        expect(mobileMenuBtn).toBeTruthy();
        expect(navLinks).toBeTruthy();
        
        // Initial state (assuming 'open' is not present initially)
        expect(navLinks.classList.contains('open')).toBe(false);
        expect(mobileMenuBtn.classList.contains('open')).toBe(false);
        expect(document.body.classList.contains('menu-open')).toBe(false);
        
        // Click to open
        mobileMenuBtn.click();
        jest.runAllTimers(); // Assuming initializeMobileMenu might have timeouts/transitions
        expect(navLinks.classList.contains('open')).toBe(true);
        expect(mobileMenuBtn.classList.contains('open')).toBe(true);
        expect(document.body.classList.contains('menu-open')).toBe(true);
        
        // Click to close
        mobileMenuBtn.click();
        jest.runAllTimers();
        expect(navLinks.classList.contains('open')).toBe(false);
        expect(mobileMenuBtn.classList.contains('open')).toBe(false);
        expect(document.body.classList.contains('menu-open')).toBe(false);
    });
    
    test('clicking a nav link closes the menu and updates classes', () => {
        let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        let navLinks = document.querySelector('.nav-links');
        // Open the menu
        mobileMenuBtn.click();
        jest.runAllTimers(); 
        expect(navLinks.classList.contains('open')).toBe(true);
        expect(mobileMenuBtn.classList.contains('open')).toBe(true);
        expect(document.body.classList.contains('menu-open')).toBe(true);
        
        const firstLink = navLinks.querySelector('a');
        firstLink.click();
        
        expect(navLinks.classList.contains('open')).toBe(false);
        expect(mobileMenuBtn.classList.contains('open')).toBe(false);
        expect(document.body.classList.contains('menu-open')).toBe(false);
    });

    test('clicking outside the menu closes it if open', () => {
        let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        let navLinks = document.querySelector('.nav-links');
        const outsideElement = document.querySelector('body > main') || document.body;
        mobileMenuBtn.click();
        jest.runAllTimers();
        expect(navLinks.classList.contains('open')).toBe(true);
        expect(mobileMenuBtn.classList.contains('open')).toBe(true);
        expect(document.body.classList.contains('menu-open')).toBe(true);

        // Simulate a click outside
        // Note: The actual mobile-menu.js doesn't have click-outside logic, so this test will likely fail
        // unless that logic is added to mobile-menu.js or this test is adapted.
        // For now, assuming the test is testing an ideal state or future feature.
        // If current mobile-menu.js is the source of truth, this test needs rethinking.
        // Let's assume for now the test is correct and the click outside functionality should exist.
        if (outsideElement) outsideElement.click(); 
        jest.runAllTimers(); 

        // Based on the provided mobile-menu.js, these will actually remain true 
        // as there's no click-outside handler. Test needs to align with implementation.
        // For now, I'll keep the test's original expectation of closing.
        expect(navLinks.classList.contains('open')).toBe(false); 
        expect(mobileMenuBtn.classList.contains('open')).toBe(false);
        expect(document.body.classList.contains('menu-open')).toBe(false);
    });

    test('clicking inside the menu does not close it', () => {
        let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        let navLinks = document.querySelector('.nav-links');
        mobileMenuBtn.click();
        jest.runAllTimers();
        expect(navLinks.classList.contains('open')).toBe(true);

        navLinks.click();
        jest.runAllTimers();

        expect(navLinks.classList.contains('open')).toBe(true);
        expect(mobileMenuBtn.classList.contains('open')).toBe(true);
        expect(document.body.classList.contains('menu-open')).toBe(true);
    });
}); 