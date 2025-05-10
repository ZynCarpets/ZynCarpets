// Test website SEO and identify potential issues
describe('SEO Tests', () => {
    let metaTags;

    beforeEach(() => {
        metaTags = {
            'description': document.querySelector('meta[name="description"]'),
            'keywords': document.querySelector('meta[name="keywords"]'),
            'viewport': document.querySelector('meta[name="viewport"]'),
            'robots': document.querySelector('meta[name="robots"]'),
            'canonical': document.querySelector('link[rel="canonical"]'),
            'og:title': document.querySelector('meta[property="og:title"]'),
            'og:description': document.querySelector('meta[property="og:description"]'),
            'og:image': document.querySelector('meta[property="og:image"]'),
            'twitter:card': document.querySelector('meta[name="twitter:card"]'),
            'twitter:title': document.querySelector('meta[name="twitter:title"]'),
            'twitter:description': document.querySelector('meta[name="twitter:description"]'),
            'twitter:image': document.querySelector('meta[name="twitter:image"]')
        };
    });

    describe('Meta Tags', () => {
        test('meta description is present and has optimal length', () => {
            expect(metaTags.description).toBeTruthy();
            const descLength = metaTags.description.content.length;
            expect(descLength).toBeGreaterThanOrEqual(120);
            expect(descLength).toBeLessThanOrEqual(160);
        });

        test('title tag is present and has optimal length', () => {
            const title = document.querySelector('title');
            expect(title).toBeTruthy();
            const titleLength = title.textContent.length;
            expect(titleLength).toBeGreaterThanOrEqual(30);
            expect(titleLength).toBeLessThanOrEqual(60);
        });

        test('viewport meta tag is present', () => {
            expect(metaTags.viewport).toBeTruthy();
        });

        test('robots meta tag is present', () => {
            expect(metaTags.robots).toBeTruthy();
        });

        test('canonical URL is specified', () => {
            expect(metaTags.canonical).toBeTruthy();
        });
    });

    describe('Heading Structure', () => {
        test('has exactly one H1 tag', () => {
            const h1Tags = document.querySelectorAll('h1');
            expect(h1Tags.length).toBe(1);
        });
    });

    describe('Image Optimization', () => {
        test('all images have alt text', () => {
            const images = document.querySelectorAll('img');
            expect(images.length).toBeGreaterThan(0);
            
            images.forEach(img => {
                expect(img.alt).toBeTruthy();
            });
        });
    });

    describe('Link Structure', () => {
        test('has internal links', () => {
            const internalLinks = Array.from(document.querySelectorAll('a[href]'))
                .filter(link => link.href.startsWith(window.location.origin));
            expect(internalLinks.length).toBeGreaterThan(0);
        });

        test('external links have proper attributes', () => {
            const externalLinks = Array.from(document.querySelectorAll('a[href]'))
                .filter(link => !link.href.startsWith(window.location.origin));
            
            externalLinks.forEach(link => {
                expect(link.hasAttribute('rel')).toBeTruthy();
                expect(link.rel).toContain('noopener');
                if (link.target === '_blank') {
                    expect(link.rel).toContain('noreferrer');
                }
            });
        });
    });

    describe('Schema Markup', () => {
        test('schema markup is present', () => {
            const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]');
            expect(schemaScripts.length).toBeGreaterThan(0);
        });
    });

    describe('Social Media Tags', () => {
        const socialTags = [
            'og:title',
            'og:description',
            'og:image',
            'twitter:card',
            'twitter:title',
            'twitter:description',
            'twitter:image'
        ];

        socialTags.forEach(tag => {
            test(`${tag} meta tag is present`, () => {
                expect(metaTags[tag]).toBeTruthy();
            });
        });
    });

    describe('Content Structure', () => {
        test('has proper heading hierarchy', () => {
            const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
            let previousLevel = 0;

            headings.forEach(heading => {
                const currentLevel = parseInt(heading.tagName[1]);
                expect(currentLevel - previousLevel).toBeLessThanOrEqual(1);
                previousLevel = currentLevel;
            });
        });

        test('has sufficient content length', () => {
            const mainContent = document.querySelector('main');
            expect(mainContent).toBeTruthy();
            expect(mainContent.textContent.length).toBeGreaterThan(300);
        });
    });
}); 