/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {}], // <- escapado com duas barras
  },
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"], // <- detecta .test.ts, .spec.ts, etc
};
