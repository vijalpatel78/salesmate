const { Given, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const openContactListingPageObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/01_moduleAccessibility/screenshots/';
const moduleElementsObj = require('../../../00_common/webElements/moduleElements');

Given('{string} is on the contact listing page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.endsWith('app/contacts/list')){
        console.log('The contact listing page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open contact listing page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on contact listing page');
        //will open the contact listing page
        await openContactListingPageObj.openContactListingPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open contact listing page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on contact listing page');
        //will open the contact listing page
        await openContactListingPageObj.openContactListingPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the contact listing page
        await openContactListingPageObj.openContactListingPage(driver,screenshotPath);
    }
});

//--------------Case 1: Verify, As a standard profile User I shouldn't be able to see contact module if i don't have contact module view rights----------

Then('contact module is not visible and log in through {string}',async function(adminUser) {
    try {
        await driver.manage().setTimeouts({implicit: 2000});
        const contactModuleIcon = await driver.findElements(By.xpath('//span[@class="icon-ic_contacts"]'));
        const contactModuleIconLength = await contactModuleIcon.length;
        if (contactModuleIconLength === 0) {
            console.log("As contact module icon length is " + contactModuleIconLength + " so it is not displayed after disabling contact module view right,so test case has been passed");
        } else {
            await assert.fail("As contact module icon length is " + contactModuleIconLength + " so it is displayed after disabling contact module view right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//--------------Case 2: Verify, As a standard profile User I should be able to see contact module if i have contact module view rights----------

Then('contact module is visible and log in through {string}',async function(adminUser) {
    try {
        await driver.manage().setTimeouts({implicit: 2000});
        const contactModuleIcon = await driver.findElements(By.xpath('//span[@class="icon-ic_contacts"]'));
        const contactModuleIconLength = await contactModuleIcon.length;
        if (contactModuleIconLength > 0) {
            console.log("As contact module icon length is " + contactModuleIconLength + " so it is displayed after enabling contact module view right,so test case has been passed");
        } else {
            await assert.fail("As contact module icon length is " + contactModuleIconLength + " so it is displayed after enabling contact module view right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//-----------Case 3: Verify, As a User i should be able to see contact module with updated contact module name given in setup------

Then('verification of updated dynamic contact module name {string}',async function(expectedModuleName) {
    try {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'updatedContactModuleName.png');
        const contactModuleSingularName = await driver.findElement(By.id('pluralName')).getAttribute('value');
        console.log("Contact Module Plural Name: " + contactModuleSingularName);
        const contactModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_contacts');
        await contactModule.click();
        await driver.sleep(2000);
        //check module name
        const listingPageModuleName = await driver.findElement(By.xpath('//h2[@class="page-title"]')).getText();
        console.log("Listing Page Module Name: " + listingPageModuleName);
        const contactName = await moduleElementsObj.clickOnContactName(driver, 1);
        await contactName.click();
        await driver.sleep(2000);
        //check contact detail page module header
        const detailPageModuleName = await driver.findElement(By.xpath('//h2[@class="page-title"]')).getText();
        console.log("Details Page Module Name: " + detailPageModuleName);
        if (listingPageModuleName === expectedModuleName && detailPageModuleName === expectedModuleName) {
            console.log("As dynamic module name and after updation,updated contact plural name are displayed,so test case has been passed");
        } else {
            await assert.fail("As dynamic module name and after updation,updated contact plural name are not displayed,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});