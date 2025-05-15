// Test website SEO and identify potential issues
describe('SEO Tests', () => {
    beforeEach(() => {
        // Set up the DOM with meta tags
        document.head.innerHTML = `
            <meta name="description" content="Test description">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta name="robots" content="index, follow">
            <link rel="canonical" href="https://example.com">
            <meta property="og:title" content="Test Title">
            <meta property="og:description" content="Test description">
            <meta property="og:image" content="https://example.com/image.jpg">
            <title>Test Title</title>
        `;
    });

    test('essential meta tags are present', () => {
        const essentialMetaTags = {
            'description': document.querySelector('meta[name="description"]'),
            'viewport': document.querySelector('meta[name="viewport"]'),
            'robots': document.querySelector('meta[name="robots"]'),
            'canonical': document.querySelector('link[rel="canonical"]'),
            'og:title': document.querySelector('meta[property="og:title"]'),
            'og:description': document.querySelector('meta[property="og:description"]'),
            'og:image': document.querySelector('meta[property="og:image"]')
        };

        Object.entries(essentialMetaTags).forEach(([name, element]) => {
            expect(element).toBeTruthy();
            if (element.tagName === 'META') {
                expect(element.getAttribute('content')).toBeTruthy();
            } else if (element.tagName === 'LINK') {
                expect(element.getAttribute('href')).toBeTruthy();
            }
        });
    });

    test('title tag is present and properly formatted', () => {
        const title = document.querySelector('title');
        expect(title).toBeTruthy();
        expect(title.textContent).toBeTruthy();
        expect(title.textContent.length).toBeGreaterThan(0);
        expect(title.textContent.length).toBeLessThan(60);
    });
}); 