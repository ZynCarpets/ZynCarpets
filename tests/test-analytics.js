// Test website analytics implementation and tracking
function testAnalytics() {
    const results = {
        passed: [],
        failed: [],
        warnings: []
    };

    // Test Google Analytics implementation
    const gaScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
    if (gaScript) {
        results.passed.push('Google Analytics script is present');
        
        // Check for proper GA initialization
        if (typeof gtag === 'function') {
            results.passed.push('Google Analytics is properly initialized');
        } else {
            results.failed.push('Google Analytics is not properly initialized');
        }

        // Check for GA configuration
        if (window.dataLayer && Array.isArray(window.dataLayer)) {
            results.passed.push('DataLayer is properly initialized');
        } else {
            results.failed.push('DataLayer is not properly initialized');
        }
    } else {
        results.failed.push('Google Analytics script is missing');
    }

    // Test event tracking
    const trackedEvents = {
        'form_submission': document.querySelector('form')?.addEventListener('submit', () => {}),
        'coverage_check': document.querySelector('#check-coverage')?.addEventListener('click', () => {}),
        'navigation_click': document.querySelectorAll('.nav-links a').length > 0,
        'cta_click': document.querySelectorAll('.cta-button').length > 0,
        'scroll_depth': window.addEventListener('scroll', () => {})
    };

    Object.entries(trackedEvents).forEach(([event, handler]) => {
        if (handler) {
            results.passed.push(`${event} tracking is implemented`);
        } else {
            results.warnings.push(`${event} tracking is not implemented`);
        }
    });

    // Test custom dimensions/metrics
    const customDimensions = [
        'user_type',
        'subscription_status',
        'service_area'
    ];

    customDimensions.forEach(dimension => {
        if (window.dataLayer?.some(item => item[dimension])) {
            results.passed.push(`Custom dimension "${dimension}" is implemented`);
        } else {
            results.warnings.push(`Custom dimension "${dimension}" is not implemented`);
        }
    });

    // Test e-commerce tracking
    const ecommerceEvents = [
        'view_item',
        'add_to_cart',
        'begin_checkout',
        'purchase'
    ];

    ecommerceEvents.forEach(event => {
        if (window.dataLayer?.some(item => item.event === event)) {
            results.passed.push(`E-commerce event "${event}" is implemented`);
        } else {
            results.warnings.push(`E-commerce event "${event}" is not implemented`);
        }
    });

    // Test enhanced measurement
    const enhancedMeasurement = [
        'page_view',
        'scroll',
        'click',
        'file_download',
        'form_start',
        'form_submit',
        'video_start',
        'video_progress',
        'video_complete'
    ];

    enhancedMeasurement.forEach(measurement => {
        if (window.dataLayer?.some(item => item.event === measurement)) {
            results.passed.push(`Enhanced measurement "${measurement}" is implemented`);
        } else {
            results.warnings.push(`Enhanced measurement "${measurement}" is not implemented`);
        }
    });

    // Test consent management
    const consentManagement = document.querySelector('[data-consent]') || 
                            document.querySelector('[data-gdpr]') ||
                            document.querySelector('[data-cookie]');
    
    if (consentManagement) {
        results.passed.push('Consent management is implemented');
    } else {
        results.warnings.push('Consent management is not implemented');
    }

    // Test cross-domain tracking
    const crossDomainLinks = Array.from(document.querySelectorAll('a[href]'))
        .filter(link => {
            const href = link.getAttribute('href');
            return href && href.startsWith('http') && !href.includes(window.location.hostname);
        });

    if (crossDomainLinks.length > 0) {
        results.warnings.push(`${crossDomainLinks.length} cross-domain links found - ensure proper tracking`);
    }

    // Log results
    console.log('=== Analytics Test Results ===');
    console.log('\nPassed:');
    results.passed.forEach(result => console.log('✅ ' + result));
    console.log('\nFailed:');
    results.failed.forEach(result => console.log('❌ ' + result));
    console.log('\nWarnings:');
    results.warnings.forEach(warning => console.log('⚠️ ' + warning));

    // Additional analytics recommendations
    console.log('\n=== Additional Analytics Recommendations ===');
    console.log('1. Set up conversion tracking for key business goals');
    console.log('2. Implement custom event tracking for important user interactions');
    console.log('3. Set up e-commerce tracking if applicable');
    console.log('4. Configure enhanced measurement for better insights');
    console.log('5. Implement proper consent management for GDPR compliance');
    console.log('6. Set up cross-domain tracking if needed');
    console.log('7. Create custom reports and dashboards');
    console.log('8. Set up automated alerts for important metrics');
    console.log('9. Implement proper UTM parameter tracking');
    console.log('10. Set up regular data quality audits');

    return results;
}

// Run the test when the page is fully loaded
window.addEventListener('load', testAnalytics); 