// Test website analytics implementation and tracking
describe('Analytics Tests', () => {
    beforeEach(() => {
        // Mock window.dataLayer
        window.dataLayer = window.dataLayer || [];
        // Mock gtag function
        window.gtag = jest.fn();
    });

    describe('Google Analytics Implementation', () => {
        test('Google Analytics script is present and properly initialized', () => {
            const gaScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
            expect(gaScript).toBeTruthy();
            expect(typeof window.gtag).toBe('function');
            expect(Array.isArray(window.dataLayer)).toBeTruthy();
        });
    });

    describe('Event Tracking', () => {
        const trackedEvents = {
            'form_submission': document.querySelector('form')?.addEventListener('submit', () => {}),
            'coverage_check': document.querySelector('#check-coverage')?.addEventListener('click', () => {}),
            'navigation_click': document.querySelectorAll('.nav-links a').length > 0,
            'cta_click': document.querySelectorAll('.cta-button').length > 0,
            'scroll_depth': window.addEventListener('scroll', () => {})
        };

        Object.entries(trackedEvents).forEach(([event, handler]) => {
            test(`${event} tracking is implemented`, () => {
                expect(handler).toBeTruthy();
            });
        });
    });

    describe('Custom Dimensions', () => {
        const customDimensions = [
            'user_type',
            'subscription_status',
            'service_area'
        ];

        customDimensions.forEach(dimension => {
            test(`custom dimension "${dimension}" is implemented`, () => {
                expect(window.dataLayer.some(item => item[dimension])).toBeTruthy();
            });
        });
    });

    describe('E-commerce Tracking', () => {
        const ecommerceEvents = [
            'view_item',
            'add_to_cart',
            'begin_checkout',
            'purchase'
        ];

        ecommerceEvents.forEach(event => {
            test(`e-commerce event "${event}" is implemented`, () => {
                expect(window.dataLayer.some(item => item.event === event)).toBeTruthy();
            });
        });
    });

    describe('Enhanced Measurement', () => {
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
            test(`enhanced measurement "${measurement}" is implemented`, () => {
                expect(window.dataLayer.some(item => item.event === measurement)).toBeTruthy();
            });
        });
    });

    describe('Consent Management', () => {
        test('consent management is implemented', () => {
            const consentManagement = document.querySelector('[data-consent]') || 
                                    document.querySelector('[data-gdpr]') ||
                                    document.querySelector('[data-cookie]');
            expect(consentManagement).toBeTruthy();
        });
    });

    describe('Cross-domain Tracking', () => {
        test('cross-domain links are properly tracked', () => {
            const crossDomainLinks = Array.from(document.querySelectorAll('a[href]'))
                .filter(link => {
                    const href = link.getAttribute('href');
                    return href && href.startsWith('http') && !href.includes(window.location.hostname);
                });

            if (crossDomainLinks.length > 0) {
                crossDomainLinks.forEach(link => {
                    expect(link.hasAttribute('data-ga-tracking')).toBeTruthy();
                });
            }
        });
    });
});

// Run the test when the page is fully loaded
window.addEventListener('load', testAnalytics); 