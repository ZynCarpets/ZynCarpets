// Test website analytics implementation and tracking
describe('Analytics Tests', () => {
    beforeEach(() => {
        // Clear mock calls from setup.js for gtag before each test in this suite
        if (typeof window.gtag === 'function' && window.gtag.mockClear) {
            window.gtag.mockClear();
        }
        // The DOM and other mocks are handled by js/tests/setup.js
    });

    test('Google Analytics is properly initialized', () => {
        const MOCK_GA_ID = 'GA_TEST_ID'; // Must match the ID used in setup.js
        const gaScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${MOCK_GA_ID}"]`);
        expect(gaScript).toBeTruthy();
        
        expect(Array.isArray(window.dataLayer)).toBeTruthy();
        expect(typeof window.gtag).toBe('function');

        // Check that gtag was called for initialization and configuration
        // The setup.js mock for gtag is jest.fn()
        expect(window.gtag).toHaveBeenCalledWith('js', expect.any(Date));
        expect(window.gtag).toHaveBeenCalledWith('config', MOCK_GA_ID);
    });

    // test('consent management is implemented', () => {
    //     const consentManagement = document.querySelector('[data-consent]') || 
    //                             document.querySelector('[data-gdpr]');
    //     expect(consentManagement).toBeTruthy();
    // });
});

// Run the test when the page is fully loaded
// window.addEventListener('load', testAnalytics); 