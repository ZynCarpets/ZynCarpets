// Test setup file
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { JSDOM } = require('jsdom');

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

// Mock CONFIG object
global.CONFIG = {
    company: {
        name: 'Test Company',
        tagline: 'Test Tagline',
        description: 'Test Description',
        phone: '123-456-7890',
        email: 'test@example.com'
    },
    serviceAreasInfo: {
        title: 'Test Areas',
        areas: ['Area 1', 'Area 2'],
        states: ['State 1', 'State 2']
    },
    serviceAreas: {
        '12345': true,
        '67890': true
    },
    sliderImages: [
        { url: 'test1.jpg', alt: 'Test 1' },
        { url: 'test2.jpg', alt: 'Test 2' }
    ],
    formspree: {
        endpoint: 'https://formspree.io/f/test',
        formId: 'test-form'
    }
};

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

// Clean up after each test
afterEach(() => {
    document.body.innerHTML = '';
}); 