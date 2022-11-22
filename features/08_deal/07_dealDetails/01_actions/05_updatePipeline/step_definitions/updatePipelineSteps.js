const { Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const { strictEqual } = require('assert');
const screenshotObj = require('../../../../../00_common/actions/browserActions/takeScreenshot');
const openSalesmatePageObj = require('../../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../../00_common/actions/performSalesmateLogin');
const driver = require('../../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = '../features/08_deal/07_dealDetails/01_actions/04_updateValue/screenshots/';

//-----------------Case 1: Verify, the user is able to update deal pipeline and stage when user has update deal rights-----------------

Then('user is able to update pipeline and log in through {string} and check {string}',async function(adminUser,expectedNotification){
   try {
       const pipelineDropdown = await driver.findElement(By.xpath('//div[@class="wrapper-xs m-l-n-xs cursor-pointer m-w-sm text-ellipsis"]'));
       await pipelineDropdown.click();
       await driver.sleep(1500);
       const dropdownElement = await driver.findElement(By.xpath('//div[@class="col-md-12 selectBoxContainer"]/sm-select-box//span[@role="presentation"]'));
       await dropdownElement.click();
       await driver.sleep(500);
       const dropdownValue = await driver.findElement(By.xpath('//ul[@role="tree"]/li[1]'));
       await dropdownValue.click();
       await driver.sleep(500);
       const updateButton = await driver.findElement(By.xpath('//sm-pipeline-stage-update//span[.=" Update "]'));
       await updateButton.click();
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

//-------------Case 2: Verify, the user is unable to update deal pipeline and stage when user has no update deal rights-----------------

Then('user is unable to update pipeline value from details screen and log in through {string}',async function(adminUser){
    try {
        await driver.sleep(1000);
        //check 'Pipeline' dropdown is hidden
        const pipelineDropdownInvisibility = !!await driver.findElement(By.xpath('//div[@class="wrapper-xs m-l-n-xs"]')).getAttribute('hide');
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

//-------------Case 3: Verify, the user is unable to update deal pipeline and stage when user has no update deal rights-----------------

Then('user is able to update stage and check {string} message',async function(expectedNotification){
    try {
        const pipelineDropdown = await driver.findElement(By.xpath('//div[@class="wrapper-xs m-l-n-xs cursor-pointer m-w-sm text-ellipsis"]'));
        await pipelineDropdown.click();
        await driver.sleep(1500);
        const dropdownElement = await driver.findElement(By.xpath('//sm-pipeline-stage-update//div[@class="m-b-none"]//span[@role="presentation"]'));
        await dropdownElement.click();
        await driver.sleep(500);
        const dropdownValue = await driver.findElement(By.xpath('//ul[@role="tree"]/li[3]'));
        await dropdownValue.click();
        await driver.sleep(500);
        const updateButton = await driver.findElement(By.xpath('//sm-pipeline-stage-update//span[.=" Update "]'));
        await updateButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(4000);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});