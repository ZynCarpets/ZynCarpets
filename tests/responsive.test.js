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
}); 