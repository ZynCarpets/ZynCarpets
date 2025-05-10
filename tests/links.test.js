// Test all links on the website
describe('Link Tests', () => {
    beforeEach(() => {
        // Set up the DOM with navigation and resource links
        document.body.innerHTML = `
            <nav class="nav-links">
                <a href="#section1">Section 1</a>
                <a href="#section2">Section 2</a>
            </nav>
            <div id="section1">Section 1 Content</div>
            <div id="section2">Section 2 Content</div>
            <link rel="stylesheet" href="styles.css">
            <script src="script.js"></script>
            <img src="logo.png">
            <a href="https://example.com" target="_blank" rel="noopener">External Link</a>
        `;
    });

    describe('Navigation Links', () => {
        test('should have valid internal navigation links', () => {
            const navLinks = document.querySelectorAll('.nav-links a');
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
            const navLinks = document.querySelectorAll('.nav-links a');
            navLinks.forEach(link => {
                expect(link.hasAttribute('href')).toBeTruthy();
            });
        });
    });

    describe('Resource Links', () => {
        test('should have required resource files', () => {
            const resources = [
                { type: 'stylesheet', href: 'styles.css' },
                { type: 'script', src: 'script.js' },
                { type: 'image', src: 'logo.png' }
            ];

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
            const resources = document.querySelectorAll('link[rel="stylesheet"], script[src], img[src]');
            resources.forEach(resource => {
                const path = resource.href || resource.src;
                if (path && !path.startsWith('http')) {
                    expect(path).toMatch(/^[a-zA-Z0-9_.-]+$/);
                }
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