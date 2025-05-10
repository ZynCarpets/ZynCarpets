// Test website security and identify potential vulnerabilities
describe('Security Tests', () => {
    beforeEach(() => {
        // Mock window.location for HTTPS test
        Object.defineProperty(window, 'location', {
            value: { protocol: 'https:' },
            writable: true
        });
    });

    describe('Content Security Policy', () => {
        test('CSP meta tag is present and properly configured', () => {
            const metaCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
            expect(metaCSP).toBeTruthy();
            
            const cspContent = metaCSP.getAttribute('content');
            expect(cspContent).toContain('upgrade-insecure-requests');
            expect(cspContent).toContain('formspree.io/f/');
        });

        test('Permissions-Policy header is present', () => {
            const metaPermissions = document.querySelector('meta[http-equiv="Permissions-Policy"]');
            expect(metaPermissions).toBeTruthy();
        });
    });

    test('website is served over HTTPS', () => {
        expect(window.location.protocol).toBe('https:');
    });

    describe('Form Security', () => {
        test('forms have proper security attributes', () => {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                expect(form.hasAttribute('novalidate')).toBeTruthy();
                
                const csrfInput = form.querySelector('input[name="_csrf"]');
                expect(csrfInput).toBeTruthy();
                expect(csrfInput.value).toBeTruthy();

                if (form.action) {
                    expect(form.action).toMatch(/^https:\/\//);
                }
            });
        });

        test('form inputs have proper validation', () => {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                const inputs = form.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    if (input.required) {
                        expect(
                            input.pattern || 
                            input.type.match(/^(email|tel|number|url)$/)
                        ).toBeTruthy();
                    }
                });
            });
        });
    });

    describe('External Resources', () => {
        test('external resources are loaded securely', () => {
            const externalResources = Array.from(document.querySelectorAll('script[src], link[href], img[src], iframe[src]'))
                .filter(el => {
                    const url = el.src || el.href;
                    return url && !url.startsWith(window.location.origin);
                });

            externalResources.forEach(resource => {
                const url = resource.src || resource.href;
                expect(url).toMatch(/^https:\/\//);

                if (resource.tagName === 'LINK' || resource.tagName === 'SCRIPT') {
                    expect(resource.hasAttribute('integrity')).toBeTruthy();
                    expect(resource.hasAttribute('crossorigin')).toBeTruthy();
                }
            });
        });
    });

    describe('CSRF Protection', () => {
        test('CSRF token generation and validation works', () => {
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                const csrfToken = contactForm.querySelector('input[name="_csrf"]').value;
                expect(typeof window.generateCSRFToken).toBe('function');
                expect(typeof window.validateCSRFToken).toBe('function');
                expect(window.validateCSRFToken(csrfToken)).toBeTruthy();
            }
        });

        test('form submission includes CSRF token', () => {
            const contactForm = document.getElementById('contact-form');
            if (contactForm && contactForm.onsubmit) {
                const formData = new FormData(contactForm);
                expect(formData.get('_csrf')).toBeTruthy();
            }
        });
    });

    describe('Cookie Security', () => {
        test('cookies use secure flags', () => {
            if (document.cookie) {
                const cookies = document.cookie.split(';');
                cookies.forEach(cookie => {
                    expect(cookie).toMatch(/Secure|HttpOnly/);
                });
            }
        });
    });

    describe('Security Headers', () => {
        const requiredHeaders = [
            'X-XSS-Protection',
            'X-Content-Type-Options',
            'X-Frame-Options',
            'Referrer-Policy'
        ];

        test('security headers are present', () => {
            requiredHeaders.forEach(header => {
                expect(document.querySelector(`meta[http-equiv="${header}"]`)).toBeTruthy();
            });
        });
    });

    describe('Sensitive Information', () => {
        test('no sensitive information is exposed', () => {
            const sensitivePatterns = [
                /api[_-]?key/i,
                /secret/i,
                /password/i,
                /token/i,
                /auth/i,
                /formspree[_-]?id/i,
                /formspree[_-]?endpoint/i
            ];

            document.querySelectorAll('script, style, [type="text/javascript"]').forEach(el => {
                const content = el.textContent || '';
                sensitivePatterns.forEach(pattern => {
                    expect(content).not.toMatch(pattern);
                });
            });
        });
    });
}); 