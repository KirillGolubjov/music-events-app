import type { Config } from "jest";

const config: Config = {
  verbose: true,
  preset: "ts-jest",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: "node_modules/ts-jest-mock-import-meta",
              options: {
                metaObjectReplacement: {
                  url: "https://www.url.com",
                  env: { PROD: false, DEV: true },
                },
              },
            },
          ],
        },
      },
    ],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jsdom",
};

export default config;
