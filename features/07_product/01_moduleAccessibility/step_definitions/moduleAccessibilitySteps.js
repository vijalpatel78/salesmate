const { Given,When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const openSalesmatePageObj = require('../../../00_common/actions/openSalesmatePage');
const openAppsPageObj = require('../../../03_setup/apps_voice/apps/common/actions');
const performSalesmateLoginObj = require('../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/05_product/01_moduleAccessibility/screenshots/';
const appPageElementsObj = require('../../../03_setup/apps_voice/apps/common/appsPageElements');
const appsPageCommonActionsObj = require('../../../03_setup/apps_voice/apps/common/actions');
const formElementsObj = require('../../../00_common/webElements/formElements');

Given('the {string} is on app page',async function(user) {
    const currentPageTitle = await driver.getTitle();
    const currentPageURL = await driver.getCurrentUrl();

    //will check that the user is on which page
    if(await currentPageURL.endsWith('app/setup/apps')){
        console.log('The apps page has been opened successfully...');
    }
    else if(currentPageTitle == 'Login -- Salesmate'){
        /*  As the user is on the Salesmate login page,
         *  then the process to open apps page will be started from by performing the Salesmate login
        */

        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on apps page');
        //will open the apps page
        await openAppsPageObj.openAppsPage(driver,screenshotPath);
    }
    else if(currentPageTitle == 'Forgot Password -- Salesmate' || currentPageTitle == ''){
        /*  As the user is not logged in and also not on the Salesmate login page,
         *  then the process to open apps page will be started from by opening the Salesmate login page
        */

        //will open the Salesmate login page
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on apps page');
        //will do Salesmate login with the specified user's credentials
        await performSalesmateLoginObj.performSalesmateLogin(driver,screenshotPath,user,'the {string} is on apps page');
        //will open the apps page
        await openAppsPageObj.openAppsPage(driver,screenshotPath);
    }
    else {
        //as the user is logged in, it will open the apps page
        await openAppsPageObj.openAppsPage(driver,screenshotPath);
    }
});

//--------------Case 1: Verify, the product module should not be displayed when the app is not installed----------------

When('product module should not be displayed when the app is not installed',async function() {
    try {
        await driver.manage().setTimeouts({implicit: 2000});
        const configurationLink = await appPageElementsObj.findAppConfigurationLink(driver, 'Products');
        const configurationLinkLength = await configurationLink.length;
        if (configurationLinkLength === 0) {
            await appsPageCommonActionsObj.installApp(driver, 'Products');
            await driver.sleep(3000);
            const removeButton = await formElementsObj.findElementById(driver, screenshotPath, 'btnRemove', 'Remove Button');
            await removeButton.click();
        } else {
            await appsPageCommonActionsObj.clickConfigureBtn(driver, 'Products');
            const removeButton = await formElementsObj.findElementById(driver, screenshotPath, 'btnRemove', 'Remove Button');
            await removeButton.click();
        }
        await driver.sleep(5000);
        await driver.manage().setTimeouts({implicit: 2000});
        const productModuleElement = await driver.findElements(By.xpath('//span[@class="icon-ic_product"]'));
        const productModuleLengthAfterUninstallation = await productModuleElement.length;
        if (productModuleLengthAfterUninstallation === 0) {
            console.log("As product module is not displayed after product app uninstallation,so test case has been passed");
        } else {
            await assert.fail("As product module is not displayed after product app uninstallation,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//---------------Case 2: Verify, the product module should be displayed only when the app is installed------------------

When('product module should be displayed only when the app is installed',async function() {
    try {
        await appsPageCommonActionsObj.installApp(driver, 'Products');
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'productModuleIconVisibility.png');
        const productModuleElement = await driver.findElements(By.xpath('//span[@class="icon-ic_product"]'));
        if (productModuleElement.length > 0) {
            console.log("As product module is displayed after product app installation,so test case has been passed");
        } else {
            await assert.fail("As product module is not displayed even after product app installation,so test case has been aborted");
        }
        const productIcon = await formElementsObj.findElementByXpath(driver, screenshotPath, 'span', 'class', 'icon-ic_product', 'Product Icon');
        await productIcon.click();
        await driver.sleep(3000);
        const currentURL = await driver.getCurrentUrl();
        console.log("Current Url: " + currentURL);
        if (await currentURL.endsWith('app/products/list')) {
            console.log("As current page URL and expected URL are equal,so test case has been passed");
        } else {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'SupportPage_NotFound.png');
            await assert.fail("As current page URL and expected URL are not equal,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 3: product module should not be displayed when the product view rights are not given----------------

Then('product module is not visible and log in into admin user {string}',async function(adminUser) {
    try {
        await driver.manage().setTimeouts({implicit: 2000});
        const productModule = await driver.findElements(By.xpath('//span[@class="icon-ic_product"]'));
        const productModuleLength = await productModule.length;
        console.log(productModuleLength);
        if (productModuleLength === 0) {
            console.log("As product module is not displayed after disabling product module,so test case has been passed");
        } else {
            await assert.fail("As product module is displayed even after disabling product module,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} is on apps page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on apps page');
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} is on apps page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on apps page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//---------Case 4: Verify, the product module should be displayed only when the product view rights are given-----------

When('product module is visible and log in into admin user {string}',async function(adminUser) {
    try {
        await driver.manage().setTimeouts({implicit: 2000});
        const productModuleElement = await driver.findElements(By.xpath('//span[@class="icon-ic_product"]'));
        if (productModuleElement.length > 0) {
            console.log("As product module is displayed after enabling product module,so test case has been passed");
        } else {
            await assert.fail("As product module is not displayed even after enabling product module,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} is on apps page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on apps page');
    } catch(err) {
        await openSalesmatePageObj.openSalesmateLoginPage(driver, screenshotPath, 'the {string} is on apps page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on apps page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//-------------------------Case 5: Verify, the dynamic module name should be displayed----------------------------------

When('verification of updated dynamic module name {string}',async function(expectedPluralName) {
    try {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'updatedProductModuleName.png');
        const productModulePluralName = await driver.findElement(By.id('pluralName')).getAttribute('value');
        console.log("Product Module Plural Name: " + productModulePluralName);
        const productIcon = await formElementsObj.findElementByXpath(driver,screenshotPath,'span','class','icon-ic_product','Product Icon');
        await productIcon.click();
        await driver.sleep(2000);
        const productModuleName = await driver.findElement(By.xpath('//h2[@class="page-title"]')).getText();
        console.log("Product Module Name: " + productModuleName);
        if (productModulePluralName === expectedPluralName && productModuleName === expectedPluralName) {
            console.log("As dynamic module name and after updation,updated product plural name are displayed,so test case has been passed");
        } else {
            await assert.fail("As dynamic module name and after updation,updated product plural name are not displayed,so test case has been aborted");
        }
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});