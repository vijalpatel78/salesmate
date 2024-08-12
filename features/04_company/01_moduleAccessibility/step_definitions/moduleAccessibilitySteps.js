const { Given, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const openCompanyListingPageObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/07_company/01_moduleAccessibility/screenshots/';
const moduleElementsObj = require('../../../00_common/webElements/moduleElements');

Given('{string} is on the company listing page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.endsWith('app/companies/list')){
        console.log('The company listing page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open company listing page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on company listing page');
        //will open the company listing page
        await openCompanyListingPageObj.openCompanyListingPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open company listing page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on company listing page');
        //will open the company listing page
        await openCompanyListingPageObj.openCompanyListingPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the company listing page
        await openCompanyListingPageObj.openCompanyListingPage(driver,screenshotPath);
    }
});

//---------Case 1: As a Admin User, I shouldn't be able to see company module if I don't have company module view rights----------

Then('company module is not visible and log in through {string}',async function(adminUser) {
    try {
        await driver.manage().setTimeouts({implicit: 2000});
        const companyModuleIcon = await driver.findElements(By.xpath('//span[@class="icon-ic_company"]'));
        if (companyModuleIcon.length === 0) {
            console.log("As company module icon is not displayed after disabling company module view right,so test case has been passed");
        } else {
            await assert.fail("As company module icon is displayed even after disabling company module view right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on company listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on company listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//----------Case 2: As a Admin User, I should be able to see company module if I have company module view rights----------

Then('company module is visible and log in through {string}',async function(adminUser) {
    try {
        await driver.manage().setTimeouts({implicit: 2000});
        const companyModuleIcon = await driver.findElements(By.xpath('//span[@class="icon-ic_company"]'));
        if (companyModuleIcon.length > 0) {
            console.log("As company module icon is displayed after disabling company module view right,so test case has been passed");
        } else {
            await assert.fail("As company module icon is not displayed even after disabling company module view right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on company listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on company listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on company listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//--------Case 3: As a User, I should be able to see Company module with updated Company module name given in setup------

Then('verification of updated dynamic company module name {string}',async function(expectedModuleName) {
    try {
        await driver.sleep(3000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'updatedCompanyModuleName.png');
        const contactModuleSingularName = await driver.findElement(By.id('pluralName')).getAttribute('value');
        console.log("Company Module Plural Name: " + contactModuleSingularName);
        const companyModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_company');
        await companyModule.click();
        await driver.sleep(4000);
        //check module name
        const listingPageModuleName = await driver.findElement(By.xpath('//h2[@class="page-title"]')).getText();
        console.log("Listing Page Module Name: " + listingPageModuleName);
        //check company module view text
        const companyModuleViewText = await driver.findElement(By.xpath('//span[@class="text-ellipsis selected-text "] | //span[@class="text-ellipsis selected-text"]')).getText();
        console.log("Company Module View Text: " + companyModuleViewText);
        const companyName = await moduleElementsObj.clickOnModuleName(driver, 1);
        await companyName.click();
        await driver.sleep(2000);
        //check company detail page module header
        const detailPageModuleName = await driver.findElement(By.xpath('//h2[@class="page-title"]')).getText();
        console.log("Details Page Module Name: " + detailPageModuleName);
        if (listingPageModuleName === expectedModuleName && detailPageModuleName === expectedModuleName) {
            console.log("As dynamic module name and after updation,updated company plural name are displayed,so test case has been passed");
        } else {
            await assert.fail("As dynamic module name and after updation,updated company plural name are not displayed,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});