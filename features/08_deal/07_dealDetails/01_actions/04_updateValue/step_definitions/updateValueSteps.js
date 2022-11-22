const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const openSalesmatePageObj = require('../../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../../00_common/actions/performSalesmateLogin');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = '../features/08_deal/07_dealDetails/01_actions/04_updateValue/screenshots/';
const clearFieldDataObj = require('../../../../../00_common/actions/fieldActions/clearFieldData');
const formElementsObj = require('../../../../../00_common/webElements/formElements');
const selectDropdownValueObj = require('../../../../../00_common/actions/fieldActions/selectDropdownValue');

//----------Case 1: Verify, the user is not able to update deal value when he doesn't have update deal rights-----------

When('user is able to update deal {string} and verify {string}',async function(dealValue,expectedNotification){
   try {
       const valueLink = await driver.findElement(By.xpath('//a[contains(text(),"INR")]'));
       await valueLink.click();
       await driver.sleep(1500);
       const valueField = await formElementsObj.findElementById(driver,screenshotPath,'dealValue','valueField');
       await clearFieldDataObj.clearFieldData(valueField);
       await valueField.sendKeys(dealValue);
       await driver.sleep(500);
       const updateButton = await driver.findElement(By.xpath('(//span[.=" Update "])[1]'));
       await updateButton.click();
       await driver.sleep(1000);
       const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
       await driver.wait(until.elementIsVisible(actualNotificationElement));
       const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
       strictEqual(actualNotification, expectedNotification);
       await driver.sleep(4000);
   } catch (err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//----------Case 2: Verify, the user is not able to update deal value when he doesn't have update deal rights-----------

When('user is not able to update deal value from details screen and log in through {string}',async function(adminUser){
    try {
        await driver.sleep(1000);
        //check 'Value' dropdown is hidden
        const valueDropdownInvisibility = !!await driver.findElement(By.xpath('//a[@class="no-padder primary-text-dark"]')).getAttribute('hide');
        console.log("Is Value Dropdown Hidden: "+valueDropdownInvisibility);
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'value_visibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//----------Case 3: Verify, the user is not able to update deal value when he doesn't have update deal rights-----------

When('associated products popup should get opened when any product is associated with deal',async function(){
    try {
        const valueLink = await driver.findElement(By.xpath('//a[contains(text(),"INR,0 ")]'));
        await valueLink.click();
        await driver.sleep(2000);
        //check 'Value Popup'
        const valuePopup = await driver.findElements(By.id('dealValue'));
        const valuePopupLength = await valuePopup.length;
        const currencyValue = await driver.findElements(By.name('currency'));
        const currencyLength = await currencyValue.length;
        if ((valuePopupLength && currencyLength) > 0) {
            console.log("As value popup and currency value are displayed after clicking on value,so test case has been passed");
        } else {
            await assert.fail("As value popup and currency value are not displayed even after clicking on value,so test case has been aborted");
        }
    } catch (err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});