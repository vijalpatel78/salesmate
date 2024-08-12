const { When } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/09_contactDetails/02_actions/03_deleteContact/screenshots/';
const formElementsObj = require('../../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../../00_common/webElements/moduleElements');

//----------------------------Case 1: Verify, the user is able to delete email tracking---------------------------------

When('the user is able to delete email tracking and verify {string}',async function(expectedNotification){
    try {
        const contact = await moduleElementsObj.clickOnContactName(driver, 1);
        await contact.click();
        await driver.sleep(2000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const deleteTrackingLink = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Delete Tracking Logs');
        await deleteTrackingLink.click();
        await driver.sleep(1000);
        const confirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Confirm');
        await confirmationButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification,expectedNotification);
        await driver.sleep(3000);
        console.log("As email tracking logs are deleted and notification is displayed,so test case has been passed");
    } catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'emailTrackLogs_NotDeleted.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});