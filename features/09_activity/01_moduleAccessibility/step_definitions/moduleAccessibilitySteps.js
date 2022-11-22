const { Given, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const openActivityListingPageObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/09_activity/01_moduleAccessibility/screenshots/';
const moduleElementsObj = require('../../../00_common/webElements/moduleElements');

Given('{string} is on the activity listing page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.endsWith('app/tasks/list')){
        console.log('The activity listing page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open activity listing page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on activity listing page');
        //will open the activity listing page
        await openActivityListingPageObj.openActivityListingPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open activity listing page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on activity listing page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on activity listing page');
        //will open the activity listing page
        await openActivityListingPageObj.openActivityListingPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the activity listing page
        await openActivityListingPageObj.openActivityListingPage(driver,screenshotPath);
    }
});

//---------Case 1: As a Admin User, I shouldn't be able to see activity module if I don't have activity module view rights----------

Then('activity module is not visible and log in through {string}',async function(adminUser) {
    try {
        await driver.manage().setTimeouts({implicit: 2000});
        const activityModuleIcon = await driver.findElements(By.xpath('//span[@class="icon-ic_activity"]'));
        if (activityModuleIcon.length === 0) {
            console.log("As activity module icon is not displayed after disabling activity module view right,so test case has been passed");
        } else {
            await assert.fail("As activity module icon is displayed even after disabling activity module view right,so test case has been aborted");
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

//----------Case 2: As a Admin User, I should be able to see activity module if I have activity module view rights----------

Then('activity module is visible and log in through {string}',async function(adminUser) {
    try {
        await driver.manage().setTimeouts({implicit: 2000});
        const activityModuleIcon = await driver.findElements(By.xpath('//span[@class="icon-ic_company"]'));
        if (activityModuleIcon.length > 0) {
            console.log("As activity module icon is displayed after disabling activity module view right,so test case has been passed");
        } else {
            await assert.fail("As activity module icon is not displayed even after disabling activity module view right,so test case has been aborted");
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

//--------Case 3: As a User, I should be able to see Activity module with updated activity module name given in setup------

Then('verification of updated dynamic activity module name {string}',async function(expectedModuleName) {
    try {
        await driver.sleep(3000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'updatedActivityModuleName.png');
        const activityModuleSingularName = await driver.findElement(By.id('pluralName')).getAttribute('value');
        console.log("Activity Module Plural Name: " + activityModuleSingularName);
        const activityModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_activity');
        await activityModule.click();
        await driver.sleep(4000);
        //check module name
        const listingPageModuleName = await driver.findElement(By.xpath('//h2[@class="page-title"]')).getText();
        console.log("Listing Page Module Name: " + listingPageModuleName);
        //check activity module view text
        const activityModuleViewText = await driver.findElement(By.xpath('//span[@class="text-ellipsis selected-text "] | //span[@class="text-ellipsis selected-text"]')).getText();
        console.log("Activity Module View Text: " + activityModuleViewText);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});