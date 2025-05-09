// Mobile Menu Tests
describe('Mobile Menu', () => {
    let mobileMenuBtn;
    let navLinks;
    let body;

    beforeEach(() => {
        // Set up the DOM elements needed for testing
        document.body.innerHTML = `
            <header>
                <button class="mobile-menu-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <nav>
                    <ul class="nav-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </header>
        `;

        // Get references to elements
        mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        navLinks = document.querySelector('.nav-links');
        body = document.body;

        // Initialize mobile menu
        initializeMobileMenu();
    });

    afterEach(() => {
        // Clean up
        document.body.innerHTML = '';
    });

    test('mobile menu button should be visible on mobile devices', () => {
        // Mock window.innerWidth to simulate mobile device
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 768
        });

        // Trigger resize event
        window.dispatchEvent(new Event('resize'));

        const computedStyle = window.getComputedStyle(mobileMenuBtn);
        expect(computedStyle.display).not.toBe('none');
    });

    test('clicking mobile menu button should toggle menu visibility', () => {
        // Initial state
        expect(navLinks.classList.contains('active')).toBe(false);
        expect(mobileMenuBtn.classList.contains('active')).toBe(false);

        // Click menu button
        mobileMenuBtn.click();

        // Menu should be open
        expect(navLinks.classList.contains('active')).toBe(true);
        expect(mobileMenuBtn.classList.contains('active')).toBe(true);
        expect(body.style.overflow).toBe('hidden');

        // Click menu button again
        mobileMenuBtn.click();

        // Menu should be closed
        expect(navLinks.classList.contains('active')).toBe(false);
        expect(mobileMenuBtn.classList.contains('active')).toBe(false);
        expect(body.style.overflow).toBe('');
    });

    test('clicking a nav link should close the menu', () => {
        // Open menu first
        mobileMenuBtn.click();
        expect(navLinks.classList.contains('active')).toBe(true);

        // Click a nav link
        const firstLink = navLinks.querySelector('a');
        firstLink.click();

        // Menu should be closed
        expect(navLinks.classList.contains('active')).toBe(false);
        expect(mobileMenuBtn.classList.contains('active')).toBe(false);
        expect(body.style.overflow).toBe('');
    });

    test('clicking outside menu should close it', () => {
        // Open menu first
        mobileMenuBtn.click();
        expect(navLinks.classList.contains('active')).toBe(true);

        // Click outside menu
        document.body.click();

        // Menu should be closed
        expect(navLinks.classList.contains('active')).toBe(false);
        expect(mobileMenuBtn.classList.contains('active')).toBe(false);
        expect(body.style.overflow).toBe('');
    });

    test('menu should not close when clicking inside it', () => {
        // Open menu first
        mobileMenuBtn.click();
        expect(navLinks.classList.contains('active')).toBe(true);

        // Click inside menu
        navLinks.click();

        // Menu should stay open
        expect(navLinks.classList.contains('active')).toBe(true);
        expect(mobileMenuBtn.classList.contains('active')).toBe(true);
        expect(body.style.overflow).toBe('hidden');
    });
}); 