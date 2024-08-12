const { When } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/06_massOperations/01_massTransfer/screenshots/';
const pageNavigationObj = require('../../../01_moduleAccessibility/common/actions');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');

//---------Case 3: As a user, I should be able to Transfer Companies in bulk from the mass Transfer Companies page--------

When('user is able to Transfer Companies in bulk from {string} to {string} and verify {string}',async function(fromUser,toUser,expectedNotification) {
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massTransferButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Mass Transfer Companies');
        await massTransferButton.click();
        await driver.sleep(3000);
        await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'fromUser', fromUser, 'yes');
        await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'toUser', toUser, 'no');
        const searchButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Search ');
        await searchButton.click();
        await driver.sleep(3000);
        const companyCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
        await companyCheckbox.click();
        const transferButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Transfer');
        await transferButton.click();
        await driver.sleep(1000);
        const confirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await confirmationButton.click();
        await driver.sleep(1000);
        const actualNotificationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualNotificationElement));
        const actualNotification = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualNotification, expectedNotification);
        await driver.sleep(4000);
        await pageNavigationObj.comeBackToCompanyListingPage(driver, screenshotPath);
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit:2000});
        //get updated 'Owner Field'
        const updatedOwner = await driver.findElement(By.xpath('(//span[@class="text-ellipsis"])[1]')).getText();
        if (updatedOwner === toUser) {
            console.log("As company updated with to user owner,so test case has been passed");
        } else {
            await assert.fail("As company is not updated with expected to user owner,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ownerTransfer_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 5: As a User, Verify upon clicking on cancel button it should terminate transfer process--------------

When('user upon clicking on a cancel button it should terminate transfer process under {string}',async function(massTransferButton) {
    try {
        await driver.sleep(1000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massTransferButtonElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',`${massTransferButton}`);
        await massTransferButtonElement.click();
        await driver.sleep(2000);
        const transferCancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await transferCancelButton.click();
        await driver.sleep(3000);
        const currentPageUrl = await driver.getCurrentUrl();
        if(currentPageUrl.endsWith('app/companies/list')) {
            console.log("As mass transfer termination redirected to expected contact url page,so test case has been passed");
        } else {
            await assert.fail("As mass transfer termination is not redirected to expected contact url page,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'transferTermination_CaseFailed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});