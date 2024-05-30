/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";

import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.test.ts?(x)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "@/auth": "<rootDir>/__tests__/mocks/auth.ts",
    "next-auth/providers/credentials":
      "<rootDir>/__tests__/mocks/next-auth-providers-credentials.ts",
    "next-auth": "<rootDir>/__tests__/mocks/next-auth.ts",
    "next/router": "next-router-mock",
  },
};

export default createJestConfig(config);
