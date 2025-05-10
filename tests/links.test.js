// Test all links on the website
describe('Link Tests', () => {
    let navLinks;
    let resources;
    let externalLinks;

    beforeEach(() => {
        // Mock DOM elements
        document.body.innerHTML = `
            <nav class="nav-links">
                <a href="#section1">Section 1</a>
                <a href="#section2">Section 2</a>
                <a href="#invalid">Invalid Section</a>
            </nav>
            <div id="section1">Section 1 Content</div>
            <div id="section2">Section 2 Content</div>
        `;

        navLinks = document.querySelectorAll('.nav-links a');
        resources = [
            { type: 'stylesheet', href: 'styles.css' },
            { type: 'script', src: 'script.js' },
            { type: 'script', src: 'config.js' },
            { type: 'image', src: 'logo.png' }
        ];
        externalLinks = [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
            'https://www.googletagmanager.com/gtag/js'
        ];
    });

    describe('Navigation Links', () => {
        test('should have valid internal navigation links', () => {
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    expect(targetElement).toBeTruthy();
                }
            });
        });

        test('should have proper href attributes', () => {
            navLinks.forEach(link => {
                expect(link.hasAttribute('href')).toBeTruthy();
            });
        });
    });

    describe('Resource Links', () => {
        test('should have required resource files', () => {
            resources.forEach(resource => {
                const element = document.createElement(resource.type === 'image' ? 'img' : resource.type);
                if (resource.type === 'image') {
                    element.src = resource.src;
                } else {
                    element.href = resource.href;
                }
                expect(element).toBeTruthy();
            });
        });

        test('should have valid resource paths', () => {
            resources.forEach(resource => {
                const path = resource.href || resource.src;
                expect(path).toMatch(/^[a-zA-Z0-9_.-]+$/);
            });
        });
    });

    describe('External Links', () => {
        test('should have valid external URLs', () => {
            externalLinks.forEach(url => {
                expect(url).toMatch(/^https?:\/\//);
            });
        });

        test('should have required external resources', () => {
            const requiredCDNs = [
                'cdnjs.cloudflare.com',
                'googletagmanager.com'
            ];
            requiredCDNs.forEach(cdn => {
                const hasCDN = externalLinks.some(url => url.includes(cdn));
                expect(hasCDN).toBeTruthy();
            });
        });
    });

    describe('Link Attributes', () => {
        test('external links should have proper attributes', () => {
            const externalLinkElements = document.querySelectorAll('a[href^="http"]');
            externalLinkElements.forEach(link => {
                expect(link.getAttribute('rel')).toContain('noopener');
                expect(link.getAttribute('target')).toBe('_blank');
            });
        });

        test('internal links should not have external attributes', () => {
            const internalLinks = document.querySelectorAll('a[href^="#"]');
            internalLinks.forEach(link => {
                expect(link.getAttribute('target')).not.toBe('_blank');
                expect(link.getAttribute('rel')).not.toContain('noopener');
            });
        });
    });
}); 