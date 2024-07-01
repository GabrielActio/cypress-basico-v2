const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    viewportHeight: 880,
    viewportWidth: 1280,
    
    setupNodeEvents(on, config) {
      // implement e2e node event listeners here
    },
  },
  component: {
    setupNodeEvents(on, config) {
      // implement component node event listeners here
    },
  },
});
