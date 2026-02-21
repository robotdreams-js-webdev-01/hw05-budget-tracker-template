module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.spec.[jt]s',
    '**/.hidden-tests/hw05/**/*.spec.[jt]s',
  ],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: { strict: false, esModuleInterop: true } }],
  },
};
