export default {
  roots: ["<rootDir>/src"],
  preset: "ts-jest/presets/js-with-ts-esm",
  transform: {
    "^.+\\.tsx?$": [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.json'
      }
    ]
  },
  transformIgnorePatterns: [
    '<rootDir>/parser/(?!parser)'
  ],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  coverageDirectory: "./coverage/",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/node_modules/**"
  ],
  coverageReporters: [
    "lcov"
  ],
};
