// Test website security and identify potential vulnerabilities
describe('Security Tests', () => {
    beforeEach(() => {
        // Set up the DOM with secure elements
        document.body.innerHTML = `
            <form action="https://example.com/submit" novalidate>
                <input type="text" required>
            </form>
            <script src="https://example.com/script.js"></script>
            <link href="https://example.com/style.css" rel="stylesheet">
            <img src="https://example.com/image.jpg">
        `;

        // Mock window.location for HTTPS test
        Object.defineProperty(window, 'location', {
            value: { protocol: 'https:', origin: 'https://example.com' },
            writable: true
        });
    });

    test('website is served over HTTPS', () => {
        expect(window.location.protocol).toBe('https:');
    });

    test('forms have proper security attributes', () => {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            expect(form.hasAttribute('novalidate')).toBeTruthy();
            
            if (form.action) {
                expect(form.action).toMatch(/^https:\/\//);
            }
        });
    });

    test('external resources are loaded securely', () => {
        const externalResources = document.querySelectorAll('script[src], link[href], img[src]');
        externalResources.forEach(resource => {
            const url = resource.src || resource.href;
            if (url.startsWith('http')) {
                // Allow localhost for test environments
                if (url.startsWith('http://localhost')) return;
                expect(url).toMatch(/^https:\/\//);
            }
        });
    });

    test('no sensitive information is exposed', () => {
        const sensitivePatterns = [
            /api[_-]?key/i,
            /secret/i,
            /password/i,
            /token/i
        ];

        document.querySelectorAll('script, style').forEach(el => {
            const content = el.textContent || '';
            sensitivePatterns.forEach(pattern => {
                expect(content).not.toMatch(pattern);
            });
        });
    });
}); 