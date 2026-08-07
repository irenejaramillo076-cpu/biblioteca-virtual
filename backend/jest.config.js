module.exports = {
  rootDir: '..',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', '<rootDir>/backend/node_modules'],
  testMatch: ['<rootDir>/tests/unit/**/*.test.js'],
  collectCoverageFrom: [
    '<rootDir>/backend/routes/libros.js',
    '<rootDir>/backend/routes/auth.js',
    '<rootDir>/backend/services/auth-service.js',
  ],
  coverageDirectory: '<rootDir>/backend/coverage',
  coverageReporters: ['text', 'html', 'lcov', 'json-summary'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
