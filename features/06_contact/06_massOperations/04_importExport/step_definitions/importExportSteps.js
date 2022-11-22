const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/06_massOperations/04_importExport/screenshots/';
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

//-------Case 1: Verify, 'Import from Excel or CSV file' and 'Import Google Contacts' options should not be displayed when the user doesn't have import rights--------

Then('{string} link is not visible under "Actions" and log in through {string}',async function(importLink,adminUser) {
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        const importFileLink = await driver.findElements(By.xpath(`//a[text()="${importLink}"]`));
        const importFileLinkLength = await importFileLink.length;
        if (importFileLinkLength === 0) {
            console.log("As "+importLink+" link length is " + importFileLinkLength + " so it is not displayed under 'Actions' after disabling import data right,so test case has been passed");
        } else {
            await assert.fail("As "+importLink+" link length is " + importFileLinkLength + " so it is displayed under 'Actions' even after disabling import data right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'importFileLink_Visibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//-----------Case 2: Verify, 'Import from Excel or CSV file' and 'Import Google Contacts' options should be display when the user have import rights------------

Then('{string} link is visible under "Actions" and log in through {string}',async function(importLink,adminUser){
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        const importFileLink = await driver.findElements(By.xpath(`//a[text()="${importLink}"]`));
        const importFileLinkLength = await importFileLink.length;
        if (importFileLinkLength > 0) {
            console.log("As "+importLink+" link length is " + importFileLinkLength + " so it is displayed under 'Actions' after enabling import data right,so test case has been passed");
        } else {
            await assert.fail("As "+importLink+" link length is " + importFileLinkLength + " so it is not displayed under 'Actions' even after enabling import data right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'importFileLink_InVisibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//------Case 3: Verify, on click of the 'Import from Excel or CSV file' and 'Import Google Contacts' options, the system should redirect to the respective import page--------

When('on click of {string} option,the system should redirect to respective import page',async function(importFileLink){
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const importFileLinkElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',`${importFileLink}`);
        await importFileLinkElement.click();
        await driver.sleep(3000);
        const currentUrl = await driver.getCurrentUrl();
        if(await currentUrl.endsWith('app/setup/migrate-data/from-sheet')) {
            console.log("As Import from Excel or CSV File page redirected to expected url page,so test case has been passed");
        } else {
            await assert.fail("As Import from Excel or CSV File page is not redirected to expected url page,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'importFileURL_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

When('on click of {string} option,the system should redirect to respective import page of {string}',async function(importGoogleLink,moduleName){
    try {
        const actionsButtonElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButtonElement.click();
        await driver.sleep(1000);
        const importGoogleLinkElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',`${importGoogleLink}`);
        await importGoogleLinkElement.click();
        await driver.sleep(3000);
        const currentPageUrl = await driver.getCurrentUrl();
        if(await currentPageUrl.includes('app/setup/import/data')) {
            console.log("As Import Google Contacts redirected to expected contact url page,so test case has been passed");
        } else {
            await assert.fail("As Import Google Contacts is not redirected to expected contact url page,so test case has been aborted");
        }
        const moduleElement = await moduleElementsObj.findModuleIcon(driver,`${moduleName}`);
        await moduleElement.click();
        await driver.sleep(2000);
    }catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------Case 4: Verify, 'Export Contact' option should not be displayed when the user doesn't have export rights-------

Then('{string} link is not visible under "Actions" and logged in through {string}',async function(exportContact,adminUser){
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        const exportContactLink = await driver.findElements(By.xpath(`//a[text()="${exportContact}"]`));
        const exportContactLinkLength = await exportContactLink.length;
        if (exportContactLinkLength === 0) {
            console.log("As "+exportContact+" link length is " + exportContactLinkLength + " so it is not displayed under 'Actions' after disabling export contact/company right,so test case has been passed");
        } else {
            await assert.fail("As "+exportContact+" link length is " + exportContactLinkLength + " so it is displayed under 'Actions' even after disabling export contact/company right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'exportContactLink_Visibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//------------Case 5: Verify, 'Export Contact' option should be displayed when the user have export rights--------------

Then('{string} link is visible under "Actions" and logged in through {string}',async function(exportContact,adminUser){
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        const exportContactLink = await driver.findElements(By.xpath(`//a[text()="${exportContact}"]`));
        const exportContactLinkLength = await exportContactLink.length;
        if (exportContactLinkLength > 0) {
            console.log("As "+exportContact+" link length is " + exportContactLinkLength + " so it is displayed under 'Actions' after enabling export contact/company right,so test case has been passed");
        } else {
            await assert.fail("As "+exportContact+" link length is " + exportContactLinkLength + " so it is not displayed under 'Actions' even after enabling export contact/company right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'exportContactLink_InVisibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//--------Case 6: Verify, on click of the 'Export Contact' option, the system should redirect to the export page--------

When('on click of the {string} option, the system should redirect to the export page',async function(exportOption){
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const exportLink = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',`${exportOption}`);
        await exportLink.click();
        await driver.sleep(3500);
        const currentUrl = await driver.getCurrentUrl();
        if(currentUrl.includes('app/setup/export/detail')) {
            console.log("As Export page redirected to expected url page,so test case has been passed");
        } else {
            await assert.fail("As Export page is not redirected to expected url page,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'exportURL_NotFound.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});