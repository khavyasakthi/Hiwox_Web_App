module.exports = {
  preset: 'jest-expo',
  // This ensures your setup file runs before tests
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  // This prevents Jest from trying to "run" your setup file as a test
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/setup.ts'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.styles.ts',
    '!**/node_modules/**',
  ],
};