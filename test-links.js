// Test all links on the website
function testLinks() {
    const results = {
        passed: [],
        failed: [],
        skipped: []
    };

    // Test navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                results.passed.push(`Navigation link to ${href} is valid`);
            } else {
                results.failed.push(`Navigation link to ${href} points to non-existent element`);
            }
        }
    });

    // Test resource links
    const resources = [
        { type: 'stylesheet', href: 'styles.css' },
        { type: 'script', src: 'script.js' },
        { type: 'script', src: 'config.js' },
        { type: 'image', src: 'logo.png' }
    ];

    resources.forEach(resource => {
        const element = document.createElement(resource.type === 'image' ? 'img' : resource.type);
        element.onload = () => results.passed.push(`${resource.type} ${resource.href || resource.src} loaded successfully`);
        element.onerror = () => results.failed.push(`Failed to load ${resource.type} ${resource.href || resource.src}`);
        if (resource.type === 'image') {
            element.src = resource.src;
        } else {
            element.href = resource.href;
        }
    });

    // Test external links
    const externalLinks = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
        'https://www.googletagmanager.com/gtag/js'
    ];

    externalLinks.forEach(url => {
        results.skipped.push(`External link ${url} needs manual verification`);
    });

    // Log results
    console.log('=== Link Test Results ===');
    console.log('\nPassed:');
    results.passed.forEach(result => console.log('✅ ' + result));
    console.log('\nFailed:');
    results.failed.forEach(result => console.log('❌ ' + result));
    console.log('\nSkipped (needs manual verification):');
    results.skipped.forEach(result => console.log('⚠️ ' + result));
}

// Run the test when the page is fully loaded
window.addEventListener('load', testLinks); 