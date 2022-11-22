const { When } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/07_company/08_companyPreviewPageTabs/02_relatedTab/01_relatedTab/screenshots/';
const moduleElementsObj = require('../../../../../00_common/webElements/moduleElements');
const formElementsObj = require('../../../../../00_common/webElements/formElements');

When('user is on preview page > related tab',async function(){
   try {
       const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
       await contactCheckbox.click();
       await driver.sleep(1000);
       const previewButton = await moduleElementsObj.findPreViewButton(driver,1);
       await previewButton.click();
       await driver.sleep(2000);
       const relatedTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Related');
       await relatedTab.click();
       await driver.sleep(2000);
   } catch(err) {
       await screenshotObj.takeScreenshot(driver, screenshotPath + 'relatedTabPage_NotFound.png');
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

When('user is on preview page > contact tab',async function(){
    try {
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(1000);
        const previewButton = await moduleElementsObj.findPreViewButton(driver,1);
        await previewButton.click();
        await driver.sleep(2000);
        const contactTab = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Contact');
        await contactTab.click();
        await driver.sleep(2000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'contactTabPage_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//------------------------Case 1: As a User, Verify the UI of Company Preview > Related tab-----------------------------

When('As a User, Verify the UI of Company Preview Page > Related tab',async function(){
    try {
        //check 'UI' of 'Related Tab'
        const relatedTabDeals = await driver.findElement(By.xpath('//section-title/h4[text()=" Deals "]')).isDisplayed();
        const relatedTabActivities = await driver.findElement(By.xpath('//section-title/h4[text()=" Activities "]')).isDisplayed();
        const relatedTabFiles = await driver.findElement(By.xpath('//section-title/h4[text()="Files "]')).isDisplayed();
        try {
            strictEqual(relatedTabDeals,true);
            strictEqual(relatedTabActivities,true);
            strictEqual(relatedTabFiles,true);
        } catch(err) {
            const closeIconElement = await moduleElementsObj.findPreviewPageCloseIcon(driver);
            await closeIconElement.click();
            await driver.sleep(2000);
            await assert.fail(err);
        }
        const closeIconElement = await moduleElementsObj.findPreviewPageCloseIcon(driver);
        await closeIconElement.click();
        await driver.sleep(2000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'relatedTab_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});