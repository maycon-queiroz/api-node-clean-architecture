/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  preset: '@shelf/jest-mongodb',
  // collectCoverage: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/src/**/*.js'],
  coverageProvider: 'v8',
  verbose: false
  // skipFiles: [
  //             '<node_internals>/**',
  //             '${workspaceFolder}/node_modules/**/*.js',
  //           ],
}
