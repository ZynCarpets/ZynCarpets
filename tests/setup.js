// tests/setup.js

const fs = require('fs');
const path = require('path');

// Mock Google Analytics
window.gtag = jest.fn();
global.dataLayer = [];

// You might also need to simulate the GA script tag if tests look for it
const MOCK_GA_ID = 'GA_TEST_ID'; // This ID should match what tests expect
if (typeof document !== 'undefined') {
    const gaScript = document.createElement('script');
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${MOCK_GA_ID}`;
    document.head.appendChild(gaScript);

    // Set a default lang attribute for accessibility tests if not set by individual tests
    if (!document.documentElement.hasAttribute('lang')) {
        document.documentElement.setAttribute('lang', 'en');
    }
}

// Simulate initial GA calls
if (window.gtag) {
    window.gtag('js', new Date());
    window.gtag('config', MOCK_GA_ID);
}

// Mock window.matchMedia (often needed for testing responsive components)
global.matchMedia = global.matchMedia || function() {
    return {
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
    };
};

// Function to load HTML into jsdom and ensure SITE_DATA is available
global.loadHtml = (filePath = 'dist/index.html') => {
    const htmlPath = path.resolve(__dirname, '..', filePath);
    try {
        const html = fs.readFileSync(htmlPath, 'utf-8');
        document.documentElement.innerHTML = html;

        // Extract SITE_DATA if build script injected it. Build script puts it in <head>
        // This is a re-parse, but ensures it's on global window for scripts that need it immediately.
        const siteDataScriptContent = /<script>window\.SITE_DATA = (.*?);<\/script>/.exec(html);
        if (siteDataScriptContent && siteDataScriptContent[1]) {
            try {
                window.SITE_DATA = JSON.parse(siteDataScriptContent[1]);
            } catch (e) {
                console.error('Failed to parse SITE_DATA from HTML in test setup', e);
                window.SITE_DATA = {}; // Fallback
            }
        } else {
            // Fallback if build didn't run or SITE_DATA script isn't there
            // This helps tests not fail if build didn't run, though they might not be accurate.
            if (!window.SITE_DATA) window.SITE_DATA = { companyInfo: {}, sliderImages: [], services: [], features: [], socialMediaLinks: {}, pricingTiers: [], testimonials: [], blogPosts: [], specialOffers: [] }; // Provide a default structure
            console.warn('SITE_DATA script not found in loaded HTML or was empty. Using default empty structure for tests.');
        }

    } catch (error) {
        console.error(`Failed to load HTML from ${htmlPath} for tests:`, error);
        document.body.innerHTML = ''; // Minimal body
        // Provide default SITE_DATA structure if HTML load fails
        if (!window.SITE_DATA) window.SITE_DATA = { companyInfo: {}, sliderImages: [], services: [], features: [], socialMediaLinks: {}, pricingTiers: [], testimonials: [], blogPosts: [], specialOffers: [] };
    }
};

// Initial load of HTML for all tests, can be overridden in suites/tests
// To ensure build runs first, this is tricky here. Better to call in beforeEach.
// global.loadHtml();

// You can add other global mocks or setup needed by your tests here.
// For example, setting up a basic HTML structure if your tests need it:
// if (typeof document !== 'undefined') {
//    document.body.innerHTML = '<div id="app"></div>';
// } 