const { createDefaultPreset } = require("ts-jest");
// 1. Importar o dotenv
const dotenv = require("dotenv");

// 2. Carregar o arquivo .env.test antes de tudo
dotenv.config({ path: ".env.test" });

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(uuid)/)",
  ],
  
};

// export default {
//   preset: 'ts-jest/presets/default-esm',
//   testEnvironment: 'node',
//   extensionsToTreatAsEsm: ['.ts'],
//   moduleNameMapper: {
//     '^(\\.{1,2}/.*)\\.js$': '$1',
//   },
//   transform: {
//     '^.+\\.tsx?$': [
//       'ts-jest',
//       {
//         useESM: true,
//         tsconfig: {
//           module: 'ESNext',
//           moduleResolution: 'bundler',
//         },
//       },
//     ],
//   },
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
// };