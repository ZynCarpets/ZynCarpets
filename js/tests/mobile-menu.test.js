// Import the mobile menu functionality
const { initializeMobileMenu } = require('../mobile-menu');

// Mobile Menu Tests
describe('Mobile Menu', () => {
    let mobileMenuBtn;
    let navLinks;
    let outsideElement;

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
            <div class="outside">Click Outside</div>
        `;
        
        // Use fake timers to control setTimeout
        jest.useFakeTimers();
        
        initializeMobileMenu();
        mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        navLinks = document.querySelector('.nav-links');
        outsideElement = document.querySelector('.outside'); // Element to simulate click outside
    });

    afterEach(() => {
        // Clear all timers
        jest.clearAllTimers();
        // Restore real timers
        jest.useRealTimers();
    });

    test('mobile menu button toggles menu visibility and classes', () => {
        expect(mobileMenuBtn).toBeTruthy();
        expect(navLinks).toBeTruthy();
        
        // Initial state
        expect(navLinks.classList.contains('active')).toBe(false);
        expect(mobileMenuBtn.classList.contains('active')).toBe(false);
        expect(document.body.classList.contains('menu-open')).toBe(false);
        
        // Click to open
        mobileMenuBtn.click();
        // Run pending timers
        jest.runAllTimers();
        expect(navLinks.classList.contains('active')).toBe(true);
        expect(mobileMenuBtn.classList.contains('active')).toBe(true);
        expect(document.body.classList.contains('menu-open')).toBe(true);
        
        // Click to close
        mobileMenuBtn.click();
        // Run pending timers
        jest.runAllTimers();
        expect(navLinks.classList.contains('active')).toBe(false);
        expect(mobileMenuBtn.classList.contains('active')).toBe(false);
        expect(document.body.classList.contains('menu-open')).toBe(false);
    });
    
    test('clicking a nav link closes the menu and updates classes', () => {
        // Open the menu
        mobileMenuBtn.click();
        jest.runAllTimers(); // Ensure menu is open after timeout
        expect(navLinks.classList.contains('active')).toBe(true);
        expect(mobileMenuBtn.classList.contains('active')).toBe(true);
        expect(document.body.classList.contains('menu-open')).toBe(true);
        
        // Click a nav link
        const firstLink = navLinks.querySelector('a');
        firstLink.click();
        // No timer needed here as link click handler is synchronous for class removal
        
        // Check if menu is closed
        expect(navLinks.classList.contains('active')).toBe(false);
        expect(mobileMenuBtn.classList.contains('active')).toBe(false);
        expect(document.body.classList.contains('menu-open')).toBe(false);
    });

    test('clicking outside the menu closes it if open', () => {
        // Open the menu first
        mobileMenuBtn.click();
        jest.runAllTimers();
        expect(navLinks.classList.contains('active')).toBe(true);
        expect(mobileMenuBtn.classList.contains('active')).toBe(true);
        expect(document.body.classList.contains('menu-open')).toBe(true);

        // Simulate a click outside
        outsideElement.click();
        jest.runAllTimers(); // Though not strictly necessary for this specific handler, good practice

        expect(navLinks.classList.contains('active')).toBe(false);
        expect(mobileMenuBtn.classList.contains('active')).toBe(false);
        expect(document.body.classList.contains('menu-open')).toBe(false);
    });

    test('clicking inside the menu does not close it', () => {
        // Open the menu first
        mobileMenuBtn.click();
        jest.runAllTimers();
        expect(navLinks.classList.contains('active')).toBe(true);

        // Simulate a click inside the navLinks (e.g., on the nav element itself, not a link)
        navLinks.click();
        jest.runAllTimers();

        // Menu should remain open
        expect(navLinks.classList.contains('active')).toBe(true);
        expect(mobileMenuBtn.classList.contains('active')).toBe(true);
        expect(document.body.classList.contains('menu-open')).toBe(true);
    });
}); 