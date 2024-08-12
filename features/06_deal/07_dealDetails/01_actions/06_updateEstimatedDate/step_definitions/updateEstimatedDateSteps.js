const { Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const { strictEqual } = require('assert');
const clearFieldDataObj = require('../../../../../00_common/actions/fieldActions/clearFieldData');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const openSalesmatePageObj = require('../../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../../00_common/actions/performSalesmateLogin');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = '../features/08_deal/07_dealDetails/01_actions/04_updateValue/screenshots/';

//-----------------Case 1: Verify, the user is able to update estimated date when user has update deal rights-----------------

Then('user is able to update estimated date and log in through {string} and check {string}',async function(adminUser,expectedNotification){
    try {
        const estimatedDateDropdown = await driver.findElement(By.id('estimatedCloseDate'));
        await estimatedDateDropdown.click();
        await clearFieldDataObj.clearFieldData(estimatedDateDropdown);
        await estimatedDateDropdown.sendKeys("Feb 07, 2022");
        await driver.sleep(500);
        await driver.findElement(By.xpath('//label[text()=" Estimated Close Date "]')).click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(4000);
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//------------------Case 2: Verify, the user is unable to update estimated date when user has no update deal rights---------------------

Then('user is unable to update estimated date from details screen and log in through {string}',async function(adminUser){
    try {
        await driver.sleep(1000);
        //check 'Pipeline' dropdown is hidden
        const pipelineDropdownInvisibility = !!await driver.findElement(By.xpath('//div[@class="wrapper-xs m-l-n-xs cursor-pointer m-w-sm text-ellipsis hide"]')).getAttribute('hide');
        console.log("Is Pipeline Dropdown Hidden: "+pipelineDropdownInvisibility);
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(2000);
    } catch(err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'pipeline_visibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on deal listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});