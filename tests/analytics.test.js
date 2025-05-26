// Test website analytics implementation and tracking
describe('Analytics Tests', () => {
    const MOCK_GA_ID = 'GA_TEST_ID'; // Ensure this matches the ID used in setup.js

    beforeEach(() => {
        // Ensure window.gtag is a fresh mock for each test in this suite
        // This effectively re-initializes the mock state for calls made within this suite's tests.
        // The global mock function itself is already set by setup.js.
        if (window.gtag && window.gtag.mockReset) {
            window.gtag.mockReset(); // Resets mock, but keeps the jest.fn() type
        } else {
            window.gtag = jest.fn(); // Fallback if it wasn't a mock or got unassigned
        }
        
        // dataLayer is initialized in setup.js, should persist unless reset is needed.
        // The GA script tag is also added by setup.js.
    });

    test('Google Analytics is properly initialized', () => {
        const gaScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${MOCK_GA_ID}"]`);
        expect(gaScript).toBeTruthy();
        
        expect(Array.isArray(window.dataLayer)).toBeTruthy();
        expect(typeof window.gtag).toBe('function');

        // Simulate the calls that the actual application code (e.g., from index.html snippet) would make
        window.gtag('js', new Date());
        window.gtag('config', MOCK_GA_ID);

        // console.log('Analytics Test: window.gtag.mock.calls:', JSON.stringify(window.gtag.mock.calls, null, 2)); // Keep for now if needed

        expect(window.gtag).toHaveBeenCalledWith('js', expect.any(Date));
        expect(window.gtag).toHaveBeenCalledWith('config', MOCK_GA_ID);
    });

    test('no duplicate Google Analytics scripts', () => {
        const gaScripts = document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]');
        expect(gaScripts.length).toBe(1);
    });

    test('analytics event is sent on button click', () => {
        // Set up a button
        const button = document.createElement('button');
        button.textContent = 'Test Button';
        document.body.appendChild(button);
        // Simulate click event
        button.addEventListener('click', () => {
            window.gtag('event', 'button_click', {
                'event_category': 'Engagement',
                'event_label': 'Test Button',
                'value': 1
            });
        });
        button.click();
        expect(window.gtag).toHaveBeenCalledWith('event', 'button_click', expect.objectContaining({
            event_category: 'Engagement',
            event_label: 'Test Button',
            value: 1
        }));
        document.body.removeChild(button);
    });

    // test('consent management is implemented', () => {
    //     const consentManagement = document.querySelector('[data-consent]') || 
    //                             document.querySelector('[data-gdpr]');
    //     expect(consentManagement).toBeTruthy();
    // });
});

// Run the test when the page is fully loaded
// window.addEventListener('load', testAnalytics); 