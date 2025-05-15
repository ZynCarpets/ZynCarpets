// Test setup file
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Load the actual site content
const siteContent = require('./site-content.js');

// Read the HTML file from src/index.html
let html = fs.readFileSync(path.resolve(__dirname, '../../src/index.html'), 'utf8');

// Simulate build script replacement of GOOGLE_ANALYTICS_ID for testing
const MOCK_GA_ID = 'GA_TEST_ID';
html = html.replace(/{{GOOGLE_ANALYTICS_ID}}/g, MOCK_GA_ID);

// Create a new JSDOM instance.
// We need to inject SITE_DATA before any scripts in index.html run.
// One way is to add a script tag to the HTML string before JSDOM parses it.
const siteDataScript = `<script>window.siteData = ${JSON.stringify(siteContent)};</script>`;
const modifiedHtml = html.replace("</head>", `${siteDataScript}</head>`);

// ---- TEMPORARY DEBUGGING ----
const sliderPath = path.resolve(__dirname, '../../js/slider.js'); // Path relative to setup.js to root js/
const scriptPath = path.resolve(__dirname, '../../js/script.js'); // Path relative to setup.js to root js/

try {
    const sliderContent = fs.readFileSync(sliderPath, 'utf8');
    console.log('DEBUG: Start of js/slider.js as seen by setup.js:\n', sliderContent.substring(0, 100));

    const scriptContent = fs.readFileSync(scriptPath, 'utf8');
    console.log('DEBUG: Start of js/script.js as seen by setup.js:\n', scriptContent.substring(0, 100));
} catch (e) {
    console.error('DEBUG: Error reading script files directly in setup.js:', e);
}
// ---- END TEMPORARY DEBUGGING ----

const dom = new JSDOM(modifiedHtml, {
    url: 'http://localhost/',
    pretendToBeVisual: true,
    runScripts: "dangerously", // Important to execute scripts in the HTML, including the one we injected
    resources: "usable" // To allow script loading if index.html loads external scripts (like js/script.js)
});

// Set up global variables
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;
global.Event = dom.window.Event;

// Ensure <html> has lang attribute for accessibility tests
if (!global.document.documentElement.hasAttribute('lang')) {
    global.document.documentElement.setAttribute('lang', 'en');
}

// Mock gtag function
global.gtag = jest.fn();

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    constructor(callback) {
        this.callback = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
};

// Mock fetch
global.fetch = jest.fn(() => 
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
    })
);

// Mock crypto
global.crypto = {
    getRandomValues: (array) => {
        for (let i = 0; i < array.length; i++) {
            array[i] = Math.floor(Math.random() * 256);
        }
        return array;
    }
};

// Mock window.getComputedStyle
window.getComputedStyle = (element) => {
    return {
        getPropertyValue: (prop) => {
            return element.style[prop] || '';
        }
    };
};

// Mock window.matchMedia
window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
});

// Mock Event constructor
global.Event = class Event {
    constructor(type) {
        this.type = type;
    }
};

// Clean up after each test
afterEach(() => {
    // Reset the entire document to its original state
    document.documentElement.innerHTML = dom.window.document.documentElement.innerHTML;
}); 