const { When } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/09_activity/06_massOperations/02_massDelete/screenshots/';
const massUpdateProductElementsObj = require('../../../../05_product/07_massOperations/01_massUpdate/common/massUpdateElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

When('user is on activity preview page',async function(){
    try {
        const activityName = await driver.findElement(By.xpath('//a[@class="text-ellipsis"]'));
        await activityName.click();
        await driver.sleep(2500);
        const actionsButton = await driver.findElement(By.xpath('//a[@class="btn dropdown-toggle"]/span'));
        await actionsButton.click();
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------Case 3: As a user, I should be able to delete Activities in bulk from the Mass Delete Activities page------------

When('user is able to delete Activities in bulk from the mass delete Activities page and verify {string}',async function(expectedNotification) {
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massDeleteCompany = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Mass Delete Activities');
        await massDeleteCompany.click();
        await driver.sleep(2000);
        const addConditionButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add Condition')
        await addConditionButton.click();
        await driver.sleep(1000);
        const selectFieldDropdown = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span','Select field')
        await selectFieldDropdown.click();
        await driver.sleep(1000);
        //select 'Name' Field to be updated
        const listField = await massUpdateProductElementsObj.findListField(driver, 1);
        await listField.click();
        await driver.sleep(1000);
        const selectCondition = await massUpdateProductElementsObj.findSelectConditionDropdown(driver);
        await selectCondition.click();
        await driver.sleep(1000);
        //select 'not empty' condition
        const listCondition = await massUpdateProductElementsObj.findListCondition(driver, 9);
        await listCondition.click();
        await driver.sleep(1000);
        //click on 'Search' button
        const searchButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Search ')
        await searchButton.click();
        await driver.sleep(2500);
        const activityCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await activityCheckbox.click();
        await driver.sleep(1500);
        const massDeleteButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Delete');
        await massDeleteButton.click();
        await driver.sleep(1000);
        const massDeleteConfirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await massDeleteConfirmationButton.click();
        await driver.sleep(1000);
        const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationMsgElement));
        const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(notificationMsg, expectedNotification);
        await driver.sleep(4000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'massDelete_CaseFailed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});