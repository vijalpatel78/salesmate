const { When, Then } = require('@cucumber/cucumber');
const { By } = require('selenium-webdriver');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const fs = require('fs');
const screenshotPath = './features/06_contact/05_bulkOperations/02_bulkExport/screenshots/';
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

//--------------Case 1: Export button should not be displayed for 'User2' on bulk operation when 'User1' doesn't have a right to Export Contact/Company--------

Then('{string} button should not be displayed and logged in through {string}',async function(exportButton,adminUser) {
    try {
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
        await contactCheckbox.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        //check visibility of 'Export' button
        const exportButtonElement = await driver.findElements(By.xpath(`//button[text()=" ${exportButton} "]`));
        const exportButtonLength = await exportButtonElement.length;
        if (exportButtonLength === 0) {
            console.log("As "+exportButton+" button length is " +exportButtonLength + " after disabling export contact/company right,so test case has been passed");
        } else {
            await assert.fail("As "+exportButton+" button length is " +exportButtonLength+ " even after disabling export contact/company right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'editIcon_visibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//---------------Case 2: Export button should be displayed for 'User2' on bulk operation when 'User1' have a right to Export Contact----------

Then('{string} button should be displayed and logged in through {string}',async function(exportButton,adminUser) {
    try {
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
        await contactCheckbox.click();
        await driver.sleep(2000);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'exportButtonVisibility.png');
        await driver.manage().setTimeouts({implicit: 2000});
        //check visibility of 'Export' button
        const exportButtonElement = await driver.findElements(By.xpath(`//button[text()=" ${exportButton} "]`));
        const exportButtonLength = await exportButtonElement.length;
        if (exportButtonLength > 0) {
            console.log("As "+exportButton+" button length is " +exportButtonLength + " after enabling export contact/company right,so test case has been passed");
        } else {
            await assert.fail("As "+exportButton+" button length is " +exportButtonLength+ " even after enabling export contact/company right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    } catch (err) {
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'exportButton_InVisibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//----------Case 3: Verify that it should allow me to export selected contacts from the contacts listing page-----------

When('Verify that it should allow me to export selected contacts from the contacts listing page',async function() {
    try {
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
        await contactCheckbox.click();
        await driver.sleep(2000);
        //click on 'Export' button
        const exportButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Export ');
        await exportButton.click();
        await driver.sleep(2000);
        //will check the file is get downloaded or not
        const file = './downloadedFile/Contact-export-data.csv';
        try {
            assert(fs.statSync(file).isFile());
            const fileExtension = await file.split('.').pop();
            console.log("File Extension: " + fileExtension);
            if (fileExtension === 'csv') {
                console.log("As downloaded file's extension is " + fileExtension + ",so test case has been passed");
            } else {
                await assert.fail("As downloaded file's extension is not expected " + fileExtension + ",so test case has been aborted");
            }
        } catch (err) {
            await screenshotObj.takeScreenshot(driver, screenshotPath + 'contactFile_NotDownloaded.png');
            await assert.fail(err);
        }
        console.log('As "Contact-export-data.csv" file is downloaded successfully in the "./downloadedFile" folder,so test case has been passed');
    } catch(err) {
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});