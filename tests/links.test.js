describe('Link Tests', () => {
    beforeEach(() => {
        loadHtml();
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('all <a> tags have a non-empty href', () => {
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            expect(link.hasAttribute('href')).toBe(true);
            expect(link.getAttribute('href').trim()).not.toBe('');
        });
    });

    test('external links (if any) have proper attributes', () => {
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        if (externalLinks.length === 0) {
            console.warn('No external links found.');
            return;
        }
        externalLinks.forEach(link => {
            expect(link.getAttribute('target')).toBe('_blank');
            expect(link.getAttribute('rel')).toContain('noopener');
        });
    });

    test('internal links (if any) do not have external attributes', () => {
        const internalLinks = document.querySelectorAll('a[href^="#"], a[href^="/"]');
        if (internalLinks.length === 0) {
            console.warn('No internal links found.');
            return;
        }
        internalLinks.forEach(link => {
            expect(link.getAttribute('target')).not.toBe('_blank');
            const rel = link.getAttribute('rel') || '';
            expect(rel).not.toContain('noopener');
        });
    });

    test('navigation links (if any) point to valid sections', () => {
        const navLinks = document.querySelectorAll('header nav a, footer nav a, a.cta-button[href^="#"]');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                expect(targetElement).toBeTruthy();
            }
        });
    });
});

describe('Static Pages', () => {
    const fs = require('fs');
    const path = require('path');

    test('Privacy Policy page exists and contains expected content', () => {
        const privacyPath = path.join(__dirname, '../src/privacy.html');
        expect(fs.existsSync(privacyPath)).toBe(true);
        const content = fs.readFileSync(privacyPath, 'utf8');
        expect(content).toMatch(/Privacy Policy/i);
        expect(content).toMatch(/Effective Date:/i);
        expect(content).toMatch(/zyncarpetcare@gmail.com/);
    });

    test('404 page exists and contains expected content', () => {
        const notFoundPath = path.join(__dirname, '../404.html');
        expect(fs.existsSync(notFoundPath)).toBe(true);
        const content = fs.readFileSync(notFoundPath, 'utf8');
        expect(content).toMatch(/404/i);
        expect(content).toMatch(/not found/i);
    });
}); 