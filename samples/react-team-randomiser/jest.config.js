module.exports = {
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: { jsx: 'react', types: ['jest'], lib: ['es2019', 'dom'] }
    }]
  },
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
