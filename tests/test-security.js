// Test website security and identify potential vulnerabilities
function testSecurity() {
    const results = {
        passed: [],
        failed: [],
        warnings: []
    };

    // Test Content Security Policy
    const metaCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!metaCSP) {
        results.failed.push('Content Security Policy (CSP) is not implemented');
    } else {
        const cspContent = metaCSP.getAttribute('content');
        if (!cspContent.includes('upgrade-insecure-requests')) {
            results.warnings.push('CSP should include upgrade-insecure-requests directive');
        }
        if (!cspContent.includes('formspree.io/f/')) {
            results.warnings.push('CSP should specifically allow formspree.io/f/ endpoint');
        }
        results.passed.push('Content Security Policy is present');
    }

    // Test Permissions Policy
    const metaPermissions = document.querySelector('meta[http-equiv="Permissions-Policy"]');
    if (!metaPermissions) {
        results.warnings.push('Permissions-Policy header is not implemented');
    } else {
        results.passed.push('Permissions-Policy is present');
    }

    // Test HTTPS
    if (window.location.protocol !== 'https:') {
        results.failed.push('Website is not served over HTTPS');
    } else {
        results.passed.push('Website is served over HTTPS');
    }

    // Test form security
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Check for novalidate attribute
        if (!form.hasAttribute('novalidate')) {
            results.warnings.push(`Form ${form.id || 'unnamed'} should have novalidate attribute to prevent browser validation`);
        }

        // Check for CSRF protection
        const csrfInput = form.querySelector('input[name="_csrf"]');
        if (!csrfInput) {
            results.failed.push(`Form ${form.id || 'unnamed'} is missing CSRF token input`);
        } else if (!csrfInput.value) {
            results.failed.push(`Form ${form.id || 'unnamed'} has empty CSRF token`);
        } else {
            results.passed.push(`Form ${form.id || 'unnamed'} has CSRF protection`);
        }

        // Check for secure form submission
        if (form.action && !form.action.startsWith('https://')) {
            results.failed.push(`Form ${form.id || 'unnamed'} is not submitting to HTTPS endpoint`);
        }

        // Check for proper input validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.required && !input.pattern && !input.type.match(/^(email|tel|number|url)$/)) {
                results.warnings.push(`Input ${input.id || 'unnamed'} in form ${form.id || 'unnamed'} lacks proper validation`);
            }
        });
    });

    // Test external resources
    const externalResources = Array.from(document.querySelectorAll('script[src], link[href], img[src], iframe[src]'))
        .filter(el => {
            const url = el.src || el.href;
            return url && !url.startsWith(window.location.origin);
        });

    externalResources.forEach(resource => {
        const url = resource.src || resource.href;
        if (!url.startsWith('https://')) {
            results.warnings.push(`External resource ${url} is not loaded over HTTPS`);
        }
        // Check for integrity attribute
        if (resource.tagName === 'LINK' || resource.tagName === 'SCRIPT') {
            if (!resource.hasAttribute('integrity')) {
                results.warnings.push(`External resource ${url} is missing integrity check`);
            }
            if (!resource.hasAttribute('crossorigin')) {
                results.warnings.push(`External resource ${url} is missing crossorigin attribute`);
            }
        }
    });

    // Test CSRF token generation and validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const csrfToken = contactForm.querySelector('input[name="_csrf"]').value;
        if (typeof window.generateCSRFToken === 'function' && typeof window.validateCSRFToken === 'function') {
            const newToken = window.generateCSRFToken();
            if (window.validateCSRFToken(csrfToken)) {
                results.passed.push('CSRF token generation and validation is working');
            } else {
                results.failed.push('CSRF token validation is not working correctly');
            }
        } else {
            results.failed.push('CSRF token generation or validation functions are missing');
        }
    }

    // Test form submission security
    if (contactForm) {
        const submitHandler = contactForm.onsubmit;
        if (submitHandler) {
            const formData = new FormData(contactForm);
            if (!formData.get('_csrf')) {
                results.failed.push('Form submission is not including CSRF token');
            }
        }
    }

    // Test cookies
    if (document.cookie) {
        const cookies = document.cookie.split(';');
        cookies.forEach(cookie => {
            if (!cookie.includes('Secure') && !cookie.includes('HttpOnly')) {
                results.warnings.push('Cookies should use Secure and HttpOnly flags');
            }
        });
    }

    // Test XSS protection headers
    const headers = {
        'X-XSS-Protection': 'XSS protection header is missing',
        'X-Content-Type-Options': 'Content-Type-Options header is missing',
        'X-Frame-Options': 'Frame-Options header is missing',
        'Referrer-Policy': 'Referrer-Policy header is missing'
    };

    // Test for sensitive information exposure
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
            if (pattern.test(content)) {
                results.failed.push('Potential sensitive information exposure detected in ' + (el.id || 'unnamed element'));
            }
        });
    });

    // Log results
    console.log('=== Security Test Results ===');
    console.log('\nPassed:');
    results.passed.forEach(result => console.log('✅ ' + result));
    console.log('\nFailed:');
    results.failed.forEach(result => console.log('❌ ' + result));
    console.log('\nWarnings:');
    results.warnings.forEach(warning => console.log('⚠️ ' + warning));

    // Additional security recommendations
    console.log('\n=== Additional Security Recommendations ===');
    console.log('1. Implement rate limiting for form submissions');
    console.log('2. Set up proper CORS policies');
    console.log('3. Use Subresource Integrity (SRI) for all external resources');
    console.log('4. Implement proper session management');
    console.log('5. Set up security monitoring and logging');
    console.log('6. Regular security audits and penetration testing');
    console.log('7. Keep all dependencies updated');
    console.log('8. Implement proper error handling without exposing sensitive information');
    console.log('9. Consider implementing a honeypot field for bot detection');
    console.log('10. Add input sanitization for all form fields');

    return results;
}

// Run the test when the page is fully loaded
window.addEventListener('load', testSecurity); 