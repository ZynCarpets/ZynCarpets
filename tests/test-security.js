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
        results.passed.push('Content Security Policy is present');
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
        // Check for CSRF protection
        if (!form.querySelector('input[name="_csrf"]') && !form.querySelector('input[name="csrf_token"]')) {
            results.warnings.push(`Form ${form.id || 'unnamed'} might be vulnerable to CSRF attacks`);
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
    });

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
        /auth/i
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
    console.log('3. Use Subresource Integrity (SRI) for external resources');
    console.log('4. Implement proper session management');
    console.log('5. Set up security monitoring and logging');
    console.log('6. Regular security audits and penetration testing');
    console.log('7. Keep all dependencies updated');
    console.log('8. Implement proper error handling without exposing sensitive information');

    return results;
}

// Run the test when the page is fully loaded
window.addEventListener('load', testSecurity); 