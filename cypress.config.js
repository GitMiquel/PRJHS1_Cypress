const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome" && !browser.isHeadless) {
          //Neither this or a custom command to handle and close alerts worked to prevent the password breach pop-up
          //It would seem it is not a regular js alert bur rather a native Chrome notification
          //This alert can be avoided by running headless mode, or incognito mode. Although incognito mode prevents the service worker fix mentioned in the README.
          launchOptions.args.push("--disable-password-breach-detection");
          launchOptions.args.push("--disable-features=PasswordManager");
          launchOptions.preferences = {
            "credentials_enable_service": false,
            "profile.password_manager_enabled": false
          };
        }
        return launchOptions;
      });
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

