node.js is required to run this Test Suite.
node.js can be downloaded from here https://nodejs.org/en

After Downloading the Test Suite and opening its containing folder in the IDE of your choice (VSC is recommended). Dependencies need to be installed
Open a new Terminal a type: npm install

After that has finished. We can open CYPRESS
In the Terminal, type: npx cypress open

Click on E2E Testing, select Chrome and select Start E2E Testing in Chrome

The specs can now be ran

/**IMPORTANT**/
The configuration of the service worker in saucedemo.com can cause the page to not trigger a "load" event, which Cypress waits for to confirm that the page has downloaded all assets, to continue the execution of the spec. 

This may cause the following error to be thrown during runtime:
(fetch)POST 401 https://events.backtrace.io/api/summed-events/submit?universe=UNIVERSE&token=TOKEN

If this is the case then follow these steps:
In the Cypress App, select Developer Tools from the Header > View App data

Then navigate through the following folders: browsers > chrome-stable > interactive > Default > Service Worker

And delete the CacheStorage Folder

Re-run the spec
