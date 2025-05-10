module.exports = {
    testEnvironment: 'jsdom',
    setupFiles: ['./js/tests/setup.js'],
    transform: {},
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    testMatch: ['**/tests/**/*.test.js'],
    globals: {
        TextEncoder: require('util').TextEncoder,
        TextDecoder: require('util').TextDecoder
    }
}; 