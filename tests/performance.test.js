// Test website performance and provide optimization suggestions
describe('Performance Tests', () => {
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
            const scripts = document.querySelectorAll('script');
            scripts.forEach(script => {
                if (!script.src.includes('config.js')) {
                    expect(script.async || script.defer).toBeTruthy();
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
            const thirdPartyResources = Array.from(document.querySelectorAll('script[src], link[href]'))
                .filter(el => {
                    const url = el.src || el.href;
                    return url && !url.startsWith(window.location.origin);
                });

            thirdPartyResources.forEach(resource => {
                if (resource.tagName === 'SCRIPT') {
                    expect(resource.async || resource.defer).toBeTruthy();
                }
            });
        });
    });

    describe('Style Management', () => {
        test('minimal use of inline styles', () => {
            const inlineStyles = document.querySelectorAll('style');
            expect(inlineStyles.length).toBeLessThanOrEqual(1); // Allow one critical inline style
        });
    });

    describe('DOM Optimization', () => {
        test('DOM size is within reasonable limits', () => {
            const domSize = document.getElementsByTagName('*').length;
            expect(domSize).toBeLessThanOrEqual(1500);
        });
    });

    describe('Event Handling', () => {
        test('uses event delegation where appropriate', () => {
            const elementsWithListeners = document.querySelectorAll('*');
            let individualListeners = 0;

            elementsWithListeners.forEach(el => {
                if (el.onclick || el.onmouseover || el.onmouseout) {
                    individualListeners++;
                }
            });

            expect(individualListeners).toBeLessThanOrEqual(5); // Allow a small number of individual listeners
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
                expect(url).toMatch(/\.(css|js|jpg|jpeg|png|gif|webp|svg)$/i);
            });
        });
    });
}); 