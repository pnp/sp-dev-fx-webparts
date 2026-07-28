module.exports = {
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: { jsx: 'react', types: ['jest'], lib: ['es2019', 'dom'] }
    }]
  },
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // SPFx resolves the localised strings at build time. Point Jest at the
  // English file so tests can import them like the components do.
  moduleNameMapper: {
    '^CarbonFootprintCalculatorWebPartStrings$': '<rootDir>/jest.strings.js'
  },
};
