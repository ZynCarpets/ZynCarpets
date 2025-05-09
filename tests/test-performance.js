// Test website performance and provide optimization suggestions
function testPerformance() {
    const results = {
        passed: [],
        failed: [],
        suggestions: []
    };

    // Test image optimization
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Check image dimensions
        if (img.naturalWidth > 1920 || img.naturalHeight > 1080) {
            results.suggestions.push(`Consider resizing ${img.src} to a smaller dimension`);
        }

        // Check if image has alt text
        if (!img.alt) {
            results.failed.push(`Image ${img.src} missing alt text`);
        } else {
            results.passed.push(`Image ${img.src} has alt text`);
        }

        // Check if image has width and height attributes
        if (!img.hasAttribute('width') || !img.hasAttribute('height')) {
            results.suggestions.push(`Add width and height attributes to ${img.src} to prevent layout shifts`);
        }
    });

    // Test script loading
    const scripts = document.querySelectorAll('script');
    scripts.forEach(script => {
        if (!script.async && !script.defer && !script.src.includes('config.js')) {
            results.suggestions.push(`Consider adding async or defer to ${script.src || 'inline script'}`);
        }
    });

    // Test CSS optimization
    const styles = document.querySelectorAll('link[rel="stylesheet"]');
    styles.forEach(style => {
        if (!style.media || style.media === 'all') {
            results.suggestions.push(`Consider adding media queries to ${style.href}`);
        }
    });

    // Test resource hints
    const preloads = document.querySelectorAll('link[rel="preload"]');
    const preconnects = document.querySelectorAll('link[rel="preconnect"]');
    
    if (preloads.length === 0) {
        results.suggestions.push('Consider adding preload hints for critical resources');
    }
    if (preconnects.length === 0) {
        results.suggestions.push('Consider adding preconnect hints for external domains');
    }

    // Test third-party resources
    const thirdPartyResources = Array.from(document.querySelectorAll('script[src], link[href]'))
        .filter(el => {
            const url = el.src || el.href;
            return url && !url.startsWith(window.location.origin);
        });

    if (thirdPartyResources.length > 0) {
        results.suggestions.push('Consider lazy loading or deferring non-critical third-party resources');
    }

    // Test inline styles
    const inlineStyles = document.querySelectorAll('style');
    if (inlineStyles.length > 0) {
        results.suggestions.push('Consider moving inline styles to external stylesheet');
    }

    // Test DOM size
    const domSize = document.getElementsByTagName('*').length;
    if (domSize > 1500) {
        results.suggestions.push('Consider reducing DOM size for better performance');
    }

    // Test event listeners
    const elementsWithListeners = document.querySelectorAll('*');
    elementsWithListeners.forEach(el => {
        if (el.onclick || el.onmouseover || el.onmouseout) {
            results.suggestions.push('Consider using event delegation instead of individual event listeners');
        }
    });

    // Log results
    console.log('=== Performance Test Results ===');
    console.log('\nPassed:');
    results.passed.forEach(result => console.log('✅ ' + result));
    console.log('\nFailed:');
    results.failed.forEach(result => console.log('❌ ' + result));
    console.log('\nOptimization Suggestions:');
    results.suggestions.forEach(suggestion => console.log('💡 ' + suggestion));

    // Additional recommendations
    console.log('\n=== Additional Performance Recommendations ===');
    console.log('1. Run Google PageSpeed Insights for detailed analysis');
    console.log('2. Consider implementing a service worker for offline support');
    console.log('3. Use a CDN for static assets');
    console.log('4. Implement browser caching');
    console.log('5. Minify CSS, JavaScript, and HTML');
    console.log('6. Enable GZIP compression');
    console.log('7. Optimize database queries if applicable');
    console.log('8. Consider using HTTP/2');

    return results;
}

// Run the test when the page is fully loaded
window.addEventListener('load', testPerformance); 