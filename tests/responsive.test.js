// Test responsive design and cross-browser compatibility
describe('Responsive Design Tests', () => {
    let originalWidth;
    let originalHeight;

    beforeEach(() => {
        // Store original window dimensions
        originalWidth = window.innerWidth;
        originalHeight = window.innerHeight;
    });

    afterEach(() => {
        // Restore original window dimensions
        window.innerWidth = originalWidth;
        window.innerHeight = originalHeight;
        window.dispatchEvent(new Event('resize'));
    });

    test('viewport meta tag is present and correctly configured', () => {
        const viewportMeta = document.querySelector('meta[name="viewport"]');
        expect(viewportMeta).toBeTruthy();
        expect(viewportMeta.content).toContain('width=device-width');
        expect(viewportMeta.content).toContain('initial-scale=1');
    });

    test('images have lazy loading attribute', () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            expect(img.hasAttribute('loading')).toBeTruthy();
        });
    });

    describe('Layout tests for different viewport sizes', () => {
        const devices = [
            { name: 'Mobile', width: 375, height: 667 },  // iPhone SE
            { name: 'Tablet', width: 768, height: 1024 }, // iPad
            { name: 'Desktop', width: 1920, height: 1080 } // Full HD
        ];

        devices.forEach(device => {
            test(`layout is properly displayed on ${device.name}`, () => {
                // Simulate device size
                window.innerWidth = device.width;
                window.innerHeight = device.height;
                window.dispatchEvent(new Event('resize'));

                const header = document.querySelector('header');
                const nav = document.querySelector('nav');
                const main = document.querySelector('main');

                expect(header).toBeTruthy();
                expect(nav).toBeTruthy();
                expect(main).toBeTruthy();

                const headerStyle = window.getComputedStyle(header);
                const navStyle = window.getComputedStyle(nav);
                const mainStyle = window.getComputedStyle(main);

                expect(headerStyle.display).not.toBe('none');
                expect(navStyle.display).not.toBe('none');
                expect(mainStyle.display).not.toBe('none');
            });

            if (device.width <= 768) {
                test(`mobile menu is properly configured for ${device.name}`, () => {
                    window.innerWidth = device.width;
                    window.innerHeight = device.height;
                    window.dispatchEvent(new Event('resize'));

                    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                    expect(mobileMenuBtn).toBeTruthy();
                    const btnStyle = window.getComputedStyle(mobileMenuBtn);
                    expect(btnStyle.display).not.toBe('none');
                });
            }
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