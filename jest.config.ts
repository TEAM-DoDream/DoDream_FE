export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',

  moduleNameMapper: {
    // 1) 가장 먼저 ?react 전용 매핑
    '\\.svg\\?react$': '<rootDir>/__mocks__/svgMock.tsx',
    '^@assets/(.*)\\?react$': '<rootDir>/__mocks__/svgMock.tsx',

    // 2) 그 다음에 일반 @assets alias
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',

    // 3) 나머지 alias
    '^@hook/(.*)$': '<rootDir>/src/hook/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/(.*)$': '<rootDir>/src/$1',

    // 4) CSS / static files
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.svg$': '<rootDir>/__mocks__/fileMock.js',
  },

  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['**/__tests__/**/*.(spec|test).(ts|tsx)'],
};
