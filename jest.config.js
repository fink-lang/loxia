
module.exports = {
  testEnvironment: 'node',
  setupFiles: [],
  moduleFileExtensions: ['js', 'fnk'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.fnk$': ['@fink/jest']
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],

  snapshotResolver: '<rootDir>/build/test-helpers/resolver',

  modulePathIgnorePatterns: ['<rootDir>/build/'],

  testMatch: [
    '<rootDir>/**/*.test.js',
    '<rootDir>/**/*.test.fnk'
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
  watchPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],

  timers: 'fake',

  clearMocks: true,
  resetMocks: false,

  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '<rootDir>/src/**/*.fnk'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/testing/resolver.fnk'
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
