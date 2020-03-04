
module.exports = {
  testEnvironment: 'node',
  setupFiles: [],
  transform: {'^.+\\.js$': 'babel-jest'},
  transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],

  snapshotResolver: '<rootDir>/src/testing/resolver',

  modulePathIgnorePatterns: ['<rootDir>/build/'],

  testMatch: ['<rootDir>/**/*.test.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
  watchPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],

  timers: 'fake',

  clearMocks: true,
  resetMocks: false,

  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/testing/resolver.js'
  ],
  coverageDirectory: './build/cov',
  coverageReporters: ['lcov'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
