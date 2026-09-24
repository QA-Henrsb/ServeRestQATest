const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    specPattern: ['cypress/api/**/*.cy.js', 'cypress/e2e/**/*.cy.js'],
    supportFile: 'cypress/support/e2e.js',
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    retries: {
      runMode: 1,
      openMode: 0,
    },
    env: {
      apiUrl: 'https://serverest.dev',
    },
  },
});
