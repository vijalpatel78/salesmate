const { Builder } = require('selenium-webdriver');
const assert = require('assert');
const firefox_headless = require('selenium-webdriver/firefox');
const chrome_headless = require('selenium-webdriver/chrome');
const elementSearchTimeout = require('../../../../config/test_config').elementSearchTimeout;
const testingEnvironment = process.argv[process.argv.length - 1].toLowerCase();

//will open the opposite browser of current browser 
async function openAnotherBrowser(driver) {
  const currentBrowserCapabilities = await driver.getCapabilities();
  const currentBrowserName = await currentBrowserCapabilities.getBrowserName();
  let newBrowserName, newDriver;

  if (testingEnvironment.includes('local')) {
    newBrowserName = currentBrowserName == 'chrome' ? 'firefox' : 'chrome';
    const options = newBrowserName == 'chrome' ? new chrome_headless.Options() : new firefox_headless.Options();
    options.addArguments("--disable-notifications");
    newDriver = newBrowserName == 'chrome' ? new Builder().forBrowser(newBrowserName).setChromeOptions(options).build() : new Builder().forBrowser(newBrowserName).setFirefoxOptions(options).build();
    await newDriver.manage().window().maximize();
  } else if (testingEnvironment.includes('headless')) {
    newBrowserName = currentBrowserName == 'chrome' ? 'firefox' : 'chrome';
    const options = newBrowserName == 'chrome' ? new chrome_headless.Options().headless() : new firefox_headless.Options().headless();
    options.addArguments('--window-size=1440x900');
    newDriver = newBrowserName == 'chrome' ? new Builder().forBrowser(newBrowserName).setChromeOptions(options).build() : new Builder().forBrowser(newBrowserName).setFirefoxOptions(options).build();
  } else {
    assert.fail('This test case is not possible to execute because the current test execution is not going on a local or headless browser.')
  }

  console.log('Another \'' + newBrowserName + '\' browser has been opened successfully...');
  await newDriver.manage().setTimeouts({ implicit: elementSearchTimeout, pageLoadStrategy: 'eager' });
  return newDriver;
} exports.openAnotherBrowser = openAnotherBrowser;
