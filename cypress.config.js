const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    baseUrl : 'https://www.saucedemo.com',
    env: {
      VALID_USERNAME: 'standard_user',
      LOCKED_USERNAME: 'locked_out_user',
      VALID_PASSWORD: 'secret_sauce',
      VALID_FIRSTNAME: 'Miquel',
      VALID_LASTNAME: 'Juan',
      VALID_POSTALCODE: 'M60 7RA',
    },
    viewportHeight : 550,
    viewportWidth : 660,
  },
});


require('@applitools/eyes-cypress')(module);
