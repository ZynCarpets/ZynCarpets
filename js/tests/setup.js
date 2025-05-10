// Test setup file
const { JSDOM } = require('jsdom');
const { TextEncoder, TextDecoder } = require('util');

// Create a new JSDOM instance
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost/',
    pretendToBeVisual: true,
    runScripts: 'dangerously'
});

// Set up global variables
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;
global.Event = dom.window.Event;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

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

// Clean up after each test
afterEach(() => {
    document.body.innerHTML = '';
}); 