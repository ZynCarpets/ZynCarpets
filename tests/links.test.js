// Test all links on the website
describe('Link Tests', () => {
    beforeEach(() => {
        loadHtml(); // Load dist/index.html
        // Any specific setup for link tests, if needed, after HTML is loaded.
    });

    afterEach(() => {
        document.body.innerHTML = ''; 
        if (window.SITE_DATA) delete window.SITE_DATA;
    });

    describe('Navigation Links', () => {
        test('all internal navigation links (e.g., in header) should point to valid sections', () => {
            // Adjust selector as needed for your actual navigation structure
            const navLinks = document.querySelectorAll('header nav a, footer nav a, a.cta-button[href^="#"]');
            let foundNavLinks = false;
            navLinks.forEach(link => {
                foundNavLinks = true;
                const href = link.getAttribute('href');
                if (href && href.startsWith('#') && href.length > 1) { // Ensure href is not just "#"
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (!targetElement) {
                        console.error(`Navigation link error: Target element with ID '${targetId}' not found for link ${link.outerHTML}`);
                    }
                    expect(targetElement).toBeTruthy();
                }
            });
            if (!foundNavLinks) {
                console.warn('No navigation links found with the specified selectors. Check selectors or if nav links exist.');
            }
        });

        test('all navigation links (e.g., in header) should have href attributes', () => {
            const navLinks = document.querySelectorAll('header nav a, footer nav a, a.cta-button[href^="#"]');
            let foundNavLinks = false;
            navLinks.forEach(link => {
                foundNavLinks = true;
                expect(link.hasAttribute('href')).toBeTruthy();
                const hrefValue = link.getAttribute('href');
                expect(hrefValue).not.toBeNull();
                expect(hrefValue.trim()).not.toBe('');
            });
            if (!foundNavLinks) {
                console.warn('No navigation links found with the specified selectors. Check selectors or if nav links exist.');
            }
        });
    });

    describe('Resource Links', () => {
        // test('should have required resource files', () => {
        //     const resources = [
        //         { type: 'stylesheet', href: 'styles.css' },
        //         { type: 'script', src: 'script.js' },
        //         { type: 'image', src: 'logo.png' }
        //     ];
        //
        //     resources.forEach(resource => {
        //         const element = document.createElement(resource.type === 'image' ? 'img' : resource.type);
        //         if (resource.type === 'image') {
        //             element.src = resource.src;
        //         } else {
        //             element.href = resource.href;
        //         }
        //         expect(element).toBeTruthy();
        //     });
        // });

        test('stylesheet links should have non-empty href attributes', () => {
            const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
            expect(stylesheets.length).toBeGreaterThan(0); // Expect at least one stylesheet
            stylesheets.forEach(link => {
                expect(link.hasAttribute('href')).toBeTruthy();
                const href = link.getAttribute('href');
                expect(href).not.toBeNull();
                expect(href.trim()).not.toBe('');
                // Optionally, check if it's a relative or absolute path as expected
                // console.log('Stylesheet href:', href);
            });
        });

        test('script tags should have non-empty src attributes (if not inline)', () => {
            const scripts = document.querySelectorAll('script');
            scripts.forEach(script => {
                if (!script.textContent) { // Only check scripts with src, not inline scripts with content
                    expect(script.hasAttribute('src')).toBeTruthy();
                    const src = script.getAttribute('src');
                    expect(src).not.toBeNull();
                    expect(src.trim()).not.toBe('');
                    // console.log('Script src:', src);
                }
            });
        });

        test('image tags should have non-empty src or data-src attributes', () => {
            const images = document.querySelectorAll('img');
            // It's possible some pages have no images, or images are added dynamically.
            // If images are expected, (images.length).toBeGreaterThan(0) could be added.
            images.forEach(img => {
                const hasSrc = img.hasAttribute('src') && img.getAttribute('src').trim() !== '';
                const hasDataSrc = img.hasAttribute('data-src') && img.getAttribute('data-src').trim() !== '';
                if (!hasSrc && !hasDataSrc && !img.getAttribute('alt')?.includes('Decorative')) { // Allow missing src for truly decorative images if they are marked so
                     console.warn(`Image missing src and data-src: ${img.outerHTML.substring(0,100)}...`);
                }
                expect(hasSrc || hasDataSrc).toBeTruthy();
                // console.log('Image src/data-src:', img.getAttribute('src'), img.getAttribute('data-src'));
            });
        });
    });

    describe('External Links', () => {
        test('should have valid external URLs', () => {
            const externalLinks = document.querySelectorAll('a[href^="http"]');
            externalLinks.forEach(link => {
                expect(link.href).toMatch(/^https?:\/\//);
            });
        });

        test('should have required external resources', () => {
            const externalLink = document.querySelector('a[href^="http"]');
            expect(externalLink).toBeTruthy();
        });
    });

    describe('Link Attributes', () => {
        test('external links should have proper attributes', () => {
            const externalLinks = document.querySelectorAll('a[href^="http"]');
            externalLinks.forEach(link => {
                expect(link.getAttribute('rel')).toContain('noopener');
                expect(link.getAttribute('target')).toBe('_blank');
            });
        });

        test('internal links should not have external attributes', () => {
            const internalLinks = document.querySelectorAll('a[href^="#"], a[href^="/"]');
            internalLinks.forEach(link => {
                expect(link.getAttribute('target')).not.toBe('_blank');
                const rel = link.getAttribute('rel') || '';
                expect(rel).not.toContain('noopener');
            });
        });
    });
}); 