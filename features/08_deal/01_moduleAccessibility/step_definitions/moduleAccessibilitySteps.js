const { Given, When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const openDealListingPageObj = require('../common/actions');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/08_deal/01_moduleAccessibility/screenshots/';
const moduleElementsObj = require('../../../00_common/webElements/moduleElements');

Given('{string} is on the deal listing page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.endsWith('app/deals/list')){
        console.log('The deal listing page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open deal listing page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on deal listing page');
        //will open the deal listing page
        await openDealListingPageObj.openDealListingPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open deal listing page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on deal listing page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on deal listing page');
        //will open the deal listing page
        await openDealListingPageObj.openDealListingPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the deal listing page
        await openDealListingPageObj.openDealListingPage(driver,screenshotPath);
    }
});

When('user is on deal module',async function(){
    try {
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await driver.executeScript("arguments[0].click();",moduleIcon);
        await driver.sleep(1500);
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------Case 1: As a Admin User, I shouldn't be able to see deal module if I don't have deal module view rights----------

Then('deal module is not visible and log in through {string}',async function(adminUser) {
    try {
        await driver.manage().setTimeouts({implicit: 2000});
        const dealModuleIcon = await driver.findElements(By.xpath('//span[@class="icon-ic_deal"]'));
        if (dealModuleIcon.length === 0) {
            console.log("As deal module icon is not displayed after disabling deal module view right,so test case has been passed");
        } else {
            await assert.fail("As deal module icon is displayed even after disabling deal module view right,so test case has been aborted");
        }
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

//----------Case 2: As a Admin User, I should be able to see deal module if I have deal module view rights----------

Then('deal module is visible and log in through {string}',async function(adminUser) {
    try {
        await driver.manage().setTimeouts({implicit: 2000});
        const dealModuleIcon = await driver.findElements(By.xpath('//span[@class="icon-ic_deal"]'));
        if (dealModuleIcon.length > 0) {
            console.log("As deal module icon is displayed after disabling deal module view right,so test case has been passed");
        } else {
            await assert.fail("As deal module icon is not displayed even after disabling deal module view right,so test case has been aborted");
        }
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

//--------Case 3: As a User, I should be able to see deal module with updated deal module name given in setup------

Then('verification of updated dynamic deal module name {string}',async function(expectedModuleName) {
    try {
        await driver.sleep(3000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'updatedDealModuleName.png');
        const dealModuleSingularName = await driver.findElement(By.id('pluralName')).getAttribute('value');
        console.log("Deal Module Plural Name: " + dealModuleSingularName);
        const dealModule = await moduleElementsObj.findModuleIcon(driver,'icon-ic_deal');
        await driver.executeScript("arguments[0].click();",dealModule);
        await driver.sleep(3000);
        //check module name
        const listingPageModuleName = await driver.findElement(By.xpath('//h2[@class="page-title"]')).getText();
        console.log("Listing Page Module Name: " + listingPageModuleName);
        //check deal module view text
        const dealModuleViewText = await driver.findElement(By.xpath('//span[@class="text-ellipsis selected-text"]')).getText();
        console.log("Deal Module View Text: " + dealModuleViewText);
        const dealName = await moduleElementsObj.clickOnModuleName(driver, 1);
        await dealName.click();
        await driver.sleep(2000);
        //check deal detail page module header
        const detailPageModuleName = await driver.findElement(By.xpath('//h2[@class="page-title"]')).getText();
        console.log("Details Page Module Name: " + detailPageModuleName);
        // //check detail screen edit dialog module header name
        // const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Actions ');
        // await actionsButton.click();
        // await driver.sleep(1000);
        // const detailsPageEditLink = await driver.findElement(By.xpath('//a[text()=" Edit Deal"]'));
        // await detailsPageEditLink.click();
        // await driver.sleep(2500);
        //const editDialogModuleName = await driver.findElement(By.xpath('//h4[@class="modal-title pull-left"]')).getText();
        if (listingPageModuleName === expectedModuleName && detailPageModuleName === expectedModuleName) {
            console.log("As dynamic module name and after updation,updated deal plural name are displayed,so test case has been passed");
        } else {
            await assert.fail("As dynamic module name and after updation,updated deal plural name are not displayed,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});