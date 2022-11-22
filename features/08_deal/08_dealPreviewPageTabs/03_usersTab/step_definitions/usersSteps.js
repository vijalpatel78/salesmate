const { When } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/08_deal/07_dealDetails/13_teammatesWidget/screenshots/';
const formElementsObj = require('../../../../00_common/webElements/formElements');

//----------------------------Case 1: As a User, Verify the UI of Deal Preview Actions----------------------------------

When('user is on {string} Tab',async function(tabName){
   try {
      const usersTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',`${tabName}`);
      await usersTab.click();
      await driver.sleep(2500);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

When('verify the UI of "Users Tab"',async function(){
    try {
        const teammatesSearchBox = !!await driver.findElement(By.xpath('(//div[@id="users"]//ro-tag/div[@class="ro-tag-autocomplete"]/input[@type="text"])[1]')).isDisplayed();
        strictEqual(teammatesSearchBox,true);
        const participantsSearchBox = !!await driver.findElement(By.xpath('(//div[@id="users"]//ro-tag/div[@class="ro-tag-autocomplete"]/input[@type="text"])[2]')).isDisplayed();
        strictEqual(participantsSearchBox,true);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'usersTab_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});