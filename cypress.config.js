const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'ServeRest QA - Cypress',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: 'cypress/reports/html',
  },
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
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});
