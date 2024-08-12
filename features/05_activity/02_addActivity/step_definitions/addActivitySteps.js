const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/09_activity/02_addActivity/screenshots/';
const clearFieldDataObj = require('../../../00_common/actions/fieldActions/clearFieldData');
const selectDropdownValueObj = require('../../../00_common/actions/fieldActions/selectDropdownValue');
const formElementsObj = require('../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../00_common/webElements/moduleElements');

let websiteFieldData = 'no', companyNameFieldData = 'no', associateContactFieldData = 'no', customFieldData = 'no',
companiesCount = 'no', associateContact02FieldData = 'no', ownerFieldDropdownData = 'no';

When('user is on add activity page',async function(){
   try {
       const addActivityButton = await driver.findElements(By.xpath('//button[text()="Activity "]'));
       await addActivityButton.click();
       await driver.sleep(1500);
   } catch(err) {
       await driver.navigate().refresh();
       await driver.sleep(5000);
       await assert.fail(err);
   }
});

//-----Case 1: As a User, Verify when user don't have rights to create company then '+ Activity' button should not be shown-------

Then('add activity button is not visible and log in through {string}',async function(adminUser) {
    try {
        await driver.manage().setTimeouts({implicit: 2000});
        const addActivityButton = await driver.findElements(By.xpath('//button[text()="Activity "]'));
        const addActivityButtonCount = await addActivityButton.length;
        if (addActivityButtonCount === 0) {
            console.log("As add activity button length is " + addActivityButtonCount + " so it is not displayed after disabling activity module create right,so test case has been passed");
        } else {
            await assert.fail("As add activity button length is " + addActivityButtonCount + " so it is displayed after disabling activity module create right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on activity listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on activity listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on activity listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on activity listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//------------Case 2: As a User, Verify that 'Create Activity' button should be shown in 'Activity Grid' view-------------

Then('add activity button is visible and log in through {string}',async function(adminUser) {
    try {
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_activity');
        await moduleIcon.click();
        await driver.manage().setTimeouts({implicit: 2000});
        const addActivityButton = await driver.findElements(By.xpath('//button[text()="Activity "]'));
        const addActivityButtonLength = await addActivityButton.length;
        if (addActivityButtonLength > 0) {
            console.log("As add activity button length is " + addActivityButtonLength + " so it is displayed after enabling add activity create right,so test case has been passed");
        } else {
            await assert.fail("As add activity button length is " + addActivityButtonLength + " so it is not displayed after enabling add activity create right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on activity listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on activity listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on activity listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on activity listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});