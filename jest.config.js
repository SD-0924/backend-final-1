/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ['./jest.setup.ts'],
  roots: ["<rootDir>/src/"],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  testTimeout: 10000,
};
