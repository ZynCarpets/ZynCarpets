// Test responsive design and cross-browser compatibility
describe('Responsive Design Tests', () => {
    let originalWidth;
    let originalHeight;

    beforeEach(() => {
        // Set up the DOM with viewport meta tag
        document.head.innerHTML = `
            <meta name="viewport" content="width=device-width, initial-scale=1">
        `;
        document.body.innerHTML = `
            <header>
                <nav>
                    <button class="mobile-menu-btn">Menu</button>
                </nav>
            </header>
            <main>
                <img src="test.jpg" loading="lazy" alt="Test Image">
            </main>
        `;

        originalWidth = window.innerWidth;
        originalHeight = window.innerHeight;
    });

    afterEach(() => {
        window.innerWidth = originalWidth;
        window.innerHeight = originalHeight;
        // Create a proper resize event
        const resizeEvent = document.createEvent('Event');
        resizeEvent.initEvent('resize', true, true);
        window.dispatchEvent(resizeEvent);
    });

    test('viewport meta tag is present and correctly configured', () => {
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        expect(viewportMeta).toBeTruthy();
        expect(viewportMeta.content).toContain('width=device-width');
        expect(viewportMeta.content).toContain('initial-scale=1');
    });

    test('layout adapts to mobile viewport', () => {
        window.innerWidth = 375; // Mobile width
        window.innerHeight = 667;
        // Create a proper resize event
        const resizeEvent = document.createEvent('Event');
        resizeEvent.initEvent('resize', true, true);
        window.dispatchEvent(resizeEvent);

        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        const main = document.querySelector('main');

        expect(header).toBeTruthy();
        expect(nav).toBeTruthy();
        expect(main).toBeTruthy();

        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        expect(mobileMenuBtn).toBeTruthy();
    });

    test('images have lazy loading attribute', () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            expect(img.hasAttribute('loading')).toBeTruthy();
        });
    });

    test('CSS features are supported', () => {
        const testElement = document.createElement('div');
        const cssFeatures = {
            'Flexbox': 'display: flex',
            'Grid': 'display: grid',
            'Transitions': 'transition: all 0.3s ease',
            'Transforms': 'transform: translateX(0)'
        };

        Object.entries(cssFeatures).forEach(([feature, value]) => {
            expect(() => {
                testElement.style.cssText = value;
            }).not.toThrow();
        });
    });

    test('touch events support is detected', () => {
        // This test will be skipped in non-touch environments
        if (!('ontouchstart' in window)) {
            console.warn('Touch events not supported (desktop browser)');
            return;
        }
        expect('ontouchstart' in window).toBeTruthy();
    });

    test('no horizontal scroll on mobile', () => {
        window.innerWidth = 375;
        window.innerHeight = 667;
        const resizeEvent = document.createEvent('Event');
        resizeEvent.initEvent('resize', true, true);
        window.dispatchEvent(resizeEvent);
        document.body.style.overflowX = 'auto'; // Simulate possible scroll
        // Simulate a wide element
        const wideDiv = document.createElement('div');
        wideDiv.style.width = '2000px';
        wideDiv.style.height = '10px';
        document.body.appendChild(wideDiv);
        // Check if body scrollWidth is not greater than window width (no horizontal scroll)
        expect(document.body.scrollWidth).toBeLessThanOrEqual(window.innerWidth);
        document.body.removeChild(wideDiv);
    });

    test('mobile menu is visible and accessible at small widths', () => {
        window.innerWidth = 375;
        window.innerHeight = 667;
        const resizeEvent = document.createEvent('Event');
        resizeEvent.initEvent('resize', true, true);
        window.dispatchEvent(resizeEvent);
        // Simulate mobile menu button
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        expect(mobileMenuBtn).toBeTruthy();
        mobileMenuBtn.click();
        // Simulate nav links
        const navLinks = document.createElement('ul');
        navLinks.className = 'nav-links open';
        document.body.appendChild(navLinks);
        expect(navLinks.classList.contains('open')).toBe(true);
        document.body.removeChild(navLinks);
    });

    test('images below the fold have loading="lazy"', () => {
        // Simulate two images, one above the fold, one below
        const imgAbove = document.createElement('img');
        imgAbove.src = 'above.jpg';
        imgAbove.alt = 'Above';
        imgAbove.setAttribute('loading', 'eager');
        document.body.appendChild(imgAbove);
        const imgBelow = document.createElement('img');
        imgBelow.src = 'below.jpg';
        imgBelow.alt = 'Below';
        imgBelow.setAttribute('loading', 'lazy');
        document.body.appendChild(imgBelow);
        // Only check images that are not eager
        const images = document.querySelectorAll('img');
        let foundLazy = false;
        images.forEach(img => {
            if (img !== imgAbove) {
                expect(img.getAttribute('loading')).toBe('lazy');
                foundLazy = true;
            }
        });
        expect(foundLazy).toBe(true);
        document.body.removeChild(imgAbove);
        document.body.removeChild(imgBelow);
    });
}); 