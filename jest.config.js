module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/js/tests/setup.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/js/tests/__mocks__/fileMock.js'
    },
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    testMatch: ['**/tests/**/*.test.js'],
    verbose: true,
    globals: {
        TextEncoder: require('util').TextEncoder,
        TextDecoder: require('util').TextDecoder
    }
}; 