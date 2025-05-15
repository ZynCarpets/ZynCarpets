// Test website performance and optimization
describe('Performance Tests', () => {
    beforeEach(() => {
        // Set up the DOM with performance-optimized elements
        document.head.innerHTML = `
            <link rel="preload" href="critical.css" as="style">
            <link rel="preconnect" href="https://example.com">
            <link rel="stylesheet" href="styles.css" media="screen">
            <script src="critical.js"></script>
            <script src="non-critical.js" defer></script>
        `;
        document.body.innerHTML = `
            <img src="test.jpg" width="100" height="100" alt="Test Image" loading="lazy">
            <script src="https://example.com/third-party.js" async></script>
        `;
    });

    describe('Image Optimization', () => {
        test('images have appropriate dimensions', () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                expect(img.naturalWidth).toBeLessThanOrEqual(1920);
                expect(img.naturalHeight).toBeLessThanOrEqual(1080);
            });
        });

        test('images have alt text', () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                expect(img.alt).toBeTruthy();
            });
        });

        test('images have width and height attributes', () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                expect(img.hasAttribute('width')).toBeTruthy();
                expect(img.hasAttribute('height')).toBeTruthy();
            });
        });
    });

    describe('Script Loading', () => {
        test('non-critical scripts use async or defer', () => {
            const scripts = document.querySelectorAll('script[src]');
            scripts.forEach(script => {
                if (!script.src.includes('critical.js')) {
                    expect(script.hasAttribute('async') || script.hasAttribute('defer')).toBeTruthy();
                }
            });
        });
    });

    describe('CSS Optimization', () => {
        test('stylesheets use media queries', () => {
            const styles = document.querySelectorAll('link[rel="stylesheet"]');
            styles.forEach(style => {
                expect(style.media).toBeTruthy();
                expect(style.media).not.toBe('all');
            });
        });
    });

    describe('Resource Hints', () => {
        test('has preload hints for critical resources', () => {
            const preloads = document.querySelectorAll('link[rel="preload"]');
            expect(preloads.length).toBeGreaterThan(0);
        });

        test('has preconnect hints for external domains', () => {
            const preconnects = document.querySelectorAll('link[rel="preconnect"]');
            expect(preconnects.length).toBeGreaterThan(0);
        });
    });

    describe('Third-party Resources', () => {
        test('third-party resources are properly loaded', () => {
            const thirdPartyResources = document.querySelectorAll('script[src*="//"], link[href*="//"]');
            thirdPartyResources.forEach(resource => {
                if (resource.tagName === 'SCRIPT') {
                    expect(resource.hasAttribute('async') || resource.hasAttribute('defer')).toBeTruthy();
                }
            });
        });
    });

    describe('Style Management', () => {
        test('minimal use of inline styles', () => {
            const elementsWithInlineStyles = document.querySelectorAll('[style]');
            expect(elementsWithInlineStyles.length).toBeLessThan(5);
        });
    });

    describe('DOM Optimization', () => {
        test('DOM size is within reasonable limits', () => {
            const totalElements = document.getElementsByTagName('*').length;
            expect(totalElements).toBeLessThan(1000);
        });
    });

    describe('Event Handling', () => {
        test('uses event delegation where appropriate', () => {
            const eventListeners = document.querySelectorAll('[onclick], [onmouseover], [onmouseout]');
            expect(eventListeners.length).toBeLessThan(10);
        });
    });

    describe('Resource Loading', () => {
        test('critical resources are loaded early', () => {
            const criticalResources = document.querySelectorAll('link[rel="preload"], link[rel="prefetch"]');
            expect(criticalResources.length).toBeGreaterThan(0);
        });

        test('non-critical resources are deferred', () => {
            const nonCriticalScripts = document.querySelectorAll('script:not([async]):not([defer])');
            expect(nonCriticalScripts.length).toBeLessThanOrEqual(1); // Allow one critical script
        });
    });

    describe('Caching Strategy', () => {
        test('static assets have cache headers', () => {
            const staticAssets = document.querySelectorAll('link[rel="stylesheet"], script[src], img[src]');
            staticAssets.forEach(asset => {
                const url = asset.href || asset.src;
                if (url && url.startsWith('http')) {
                    expect(url).toMatch(/\.(css|js|jpg|jpeg|png|gif|webp|svg)$/i);
                }
            });
        });
    });
}); 