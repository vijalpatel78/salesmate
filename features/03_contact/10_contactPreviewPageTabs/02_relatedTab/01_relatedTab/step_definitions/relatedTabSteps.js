const { When } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/10_contactPreviewPageTabs/02_relatedTab/01_relatedTab/screenshots/';
const formElementsObj = require('../../../../../00_common/webElements/formElements');

//------------------------Case 1: As a User, Verify the UI of Contact Preview > Related tab-----------------------------

When('As a User, Verify the UI of Preview Page > Related tab',async function(){
   try {
       const relatedTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Related');
       await relatedTab.click();
       await driver.sleep(2000);
       //check 'UI' of 'Related Tab'
       const relatedTabDeals = await driver.findElement(By.xpath('//h4[text()=" Activities "]')).isDisplayed();
       const relatedTabEmails = await driver.findElement(By.xpath('//h4[text()=" Emails "]')).isDisplayed();
       const relatedTabFiles = await driver.findElement(By.xpath('//h4[text()="Files "]')).isDisplayed();
       const relatedTabSequences = await driver.findElement(By.xpath('//h4[text()=" Sequences "]')).isDisplayed();
       const relatedTabLists = await driver.findElement(By.xpath('//h4[text()=" Lists "]')).isDisplayed();
       const relatedTabLookupField = await driver.findElement(By.xpath('//h4/span[text()="Custom Related Lookup Field 01"]')).isDisplayed();
       try {
           strictEqual(relatedTabDeals,true);
           strictEqual(relatedTabEmails,true);
           strictEqual(relatedTabFiles,true);
           strictEqual(relatedTabSequences,true);
           strictEqual(relatedTabLists,true);
           strictEqual(relatedTabLookupField,true);
       } catch(err) {
           await assert.fail(err);
       }
   } catch(err) {
       await screenshotObj.takeScreenshot(driver, screenshotPath + 'relatedTab_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(3000);
       await assert.fail(err);
   }
});