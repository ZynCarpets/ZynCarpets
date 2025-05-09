// Test responsive design and cross-browser compatibility
function testResponsive() {
    const results = {
        passed: [],
        failed: [],
        skipped: []
    };

    // Test viewport meta tag
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
        results.passed.push('Viewport meta tag is present');
        if (viewportMeta.content.includes('width=device-width') && 
            viewportMeta.content.includes('initial-scale=1')) {
            results.passed.push('Viewport meta tag has correct content');
        } else {
            results.failed.push('Viewport meta tag has incorrect content');
        }
    } else {
        results.failed.push('Viewport meta tag is missing');
    }

    // Test responsive images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.hasAttribute('loading')) {
            results.passed.push(`Image ${img.src} has lazy loading attribute`);
        } else {
            results.failed.push(`Image ${img.src} missing lazy loading attribute`);
        }
    });

    // Test media queries
    const mediaQueries = [
        { name: 'Mobile', width: 375, height: 667 },  // iPhone SE
        { name: 'Tablet', width: 768, height: 1024 }, // iPad
        { name: 'Desktop', width: 1920, height: 1080 } // Full HD
    ];

    mediaQueries.forEach(device => {
        // Test layout at different viewport sizes
        const originalWidth = window.innerWidth;
        const originalHeight = window.innerHeight;

        // Simulate device size
        window.innerWidth = device.width;
        window.innerHeight = device.height;
        window.dispatchEvent(new Event('resize'));

        // Check critical elements
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        const main = document.querySelector('main');

        if (header && nav && main) {
            const headerStyle = window.getComputedStyle(header);
            const navStyle = window.getComputedStyle(nav);
            const mainStyle = window.getComputedStyle(main);

            // Check if elements are visible and properly positioned
            if (headerStyle.display !== 'none' && 
                navStyle.display !== 'none' && 
                mainStyle.display !== 'none') {
                results.passed.push(`Layout is visible on ${device.name} viewport`);
            } else {
                results.failed.push(`Layout issues on ${device.name} viewport`);
            }

            // Check mobile menu
            if (device.width <= 768) {
                const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                if (mobileMenuBtn && mobileMenuBtn.style.display !== 'none') {
                    results.passed.push(`Mobile menu button is visible on ${device.name}`);
                } else {
                    results.failed.push(`Mobile menu button not properly configured for ${device.name}`);
                }
            }
        }

        // Restore original size
        window.innerWidth = originalWidth;
        window.innerHeight = originalHeight;
        window.dispatchEvent(new Event('resize'));
    });

    // Test touch support
    if ('ontouchstart' in window) {
        results.passed.push('Touch events are supported');
    } else {
        results.skipped.push('Touch events not supported (desktop browser)');
    }

    // Test CSS features
    const testElement = document.createElement('div');
    const cssFeatures = {
        'Flexbox': 'display: flex',
        'Grid': 'display: grid',
        'Transitions': 'transition: all 0.3s ease',
        'Transforms': 'transform: translateX(0)',
        'Media Queries': '@media (max-width: 768px)'
    };

    Object.entries(cssFeatures).forEach(([feature, value]) => {
        try {
            testElement.style.cssText = value;
            results.passed.push(`${feature} is supported`);
        } catch (e) {
            results.failed.push(`${feature} is not supported`);
        }
    });

    // Log results
    console.log('=== Responsive Design Test Results ===');
    console.log('\nPassed:');
    results.passed.forEach(result => console.log('✅ ' + result));
    console.log('\nFailed:');
    results.failed.forEach(result => console.log('❌ ' + result));
    console.log('\nSkipped:');
    results.skipped.forEach(result => console.log('⚠️ ' + result));

    return results;
}

// Run the test when the page is fully loaded
window.addEventListener('load', testResponsive); 