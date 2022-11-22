const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/06_massOperations/01_massTransfer/screenshots/';
const pageNavigationObj = require('../../../01_moduleAccessibility/common/actions');
const selectDropdownValueObj = require('../../../../00_common/actions/fieldActions/selectDropdownValue');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const commonElementsObj = require('../../../../00_common/webElements/formElements');

//----Case 1: As a User, Verify that User can't able to see the Transfer options on the bulk operation when the user doesn't have a right to Mass Transfer Contact--------

Then('{string} option is not visible and logged in through {string}',async function(massTransferContact,adminUser) {
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const massTransferContactLink = await driver.findElements(By.xpath(`//a[text()="${massTransferContact}"]`));
        const massTransferContactLength = await massTransferContactLink.length;
        if (massTransferContactLength === 0) {
            console.log("As mass transfer contact link length is " + massTransferContactLength + " so it is not displayed under 'Actions' after disabling mass transfer contact right,so test case has been passed");
        } else {
            await assert.fail("As mass transfer contact link length is " + massTransferContactLength + " so it is displayed under 'Actions' even after disabling mass transfer contact right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'massTransfer_Visibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//-------Case 2: As a user, I should able to see the 'Mass Transfer Contact' option when user has 'Mass Transfer Contact' right--------

Then('{string} option is visible and logged in through {string}',async function(massTransferContact,adminUser) {
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit: 2000});
        const massTransferContactLink = await driver.findElements(By.xpath(`//a[text()="${massTransferContact}"]`));
        const massTransferContactLength = await massTransferContactLink.length;
        if (massTransferContactLength > 0) {
            console.log("As mass transfer contact link length is " + massTransferContactLength + " so it is displayed under 'Actions' after enabling mass transfer contact right,so test case has been passed");
        } else {
            await assert.fail("As mass transfer contact link length is " + massTransferContactLength + " so it is not displayed under 'Actions' even after enabling mass transfer contact right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'massTransfer_InVisibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//---------Case 3: As a user, I should be able to Transfer Contacts in bulk from the mass Transfer Contacts page--------

When('user is able to Transfer Contacts in bulk from {string} to {string} and verify {string}',async function(fromUser,toUser,expectedNotification) {
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massTransferButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Mass Transfer Contacts');
        await massTransferButton.click();
        await driver.sleep(3000);
        await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'fromUser', fromUser, 'yes');
        await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'toUser', toUser, 'no');
        const searchButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Search ');
        await searchButton.click();
        await driver.sleep(3000);
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
        await contactCheckbox.click();
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
        await pageNavigationObj.comeBackToContactListingPage(driver, screenshotPath);
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit:2000});
        //get updated 'Owner Field'
        const updatedOwner = await driver.findElement(By.xpath('(//span[@class="text-ellipsis"])[1]')).getText();
        if (updatedOwner === toUser) {
            console.log("As contact updated with to user owner,so test case has been passed");
        } else {
            await assert.fail("As contact is not updated with expected to user owner,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'ownerTransfer_Failed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----Case 4: As a User, Verify I should be able to display transfer button disable if I haven't checked any checkbox--------

When('user is be able to display {string} button disable if I have not checked any checkbox under {string} of {string} module',async function(transferButton,massTransferButton,moduleElement) {
    try {
        await driver.sleep(1000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massTransferButtonElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',`${massTransferButton}`);
        await massTransferButtonElement.click();
        await driver.sleep(2000);
        await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'fromUser', 'Vijal Patel', 'yes');
        await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'toUser', 'Priyanka Vlr', 'no');
        const searchButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Search ');
        await searchButton.click();
        await driver.sleep(3500);
        await driver.manage().setTimeouts({implicit:2000});
        //check disability of 'Transfer' button
        const transferButtonElement = await driver.findElement(By.xpath(`//button[text()="${transferButton}"]`));
        await driver.executeScript("arguments[0].scrollIntoView();",transferButtonElement);
        await driver.sleep(2000);
        const transferButtonDisability = !!await driver.findElement(By.xpath(`//button[text()="${transferButton}"]`)).getAttribute('disabled');
        if(transferButtonDisability === true) {
            console.log("As transfer button is disabled when no checkbox is checked,so test case has been passed");
        } else {
            await assert.fail("As transfer button is not disabled even when no checkbox is checked,so test case has been aborted");
        }
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,`${moduleElement}`);
        await moduleIcon.click();
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'transferButton_NotDisabled.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-----------Case 5: As a User, Verify upon clicking on cancel button it should terminate transfer process--------------

When('user upon clicking on cancel button it should terminate transfer process under {string}',async function(massTransferButton) {
    try {
        await driver.sleep(1000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massTransferButtonElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',`${massTransferButton}`);
        await massTransferButtonElement.click();
        await driver.sleep(2000);
        const currentUrl = await driver.getCurrentUrl();
        if(currentUrl.endsWith('app/massoperation/transferContact')) {
            console.log("As mass transfer page redirected to expected url page,so test case has been passed");
        } else {
            await assert.fail("As mass transfer page is not redirected to expected url page,so test case has been aborted");
        }
        const transferCancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel');
        await transferCancelButton.click();
        await driver.sleep(3000);
        const currentPageUrl = await driver.getCurrentUrl();
        if(currentPageUrl.endsWith('app/contacts/list')) {
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

//-------Case 6: As a User, the system should give me a validation message when transfer from and to users are same-----

When('system should give validation {string} when transfer from {string} and to users are same under {string}',async function(expectedNotification,owner,massTransferButton) {
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massTransferButtonElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',`${massTransferButton}`);
        await massTransferButtonElement.click();
        await driver.sleep(2000);
        await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'fromUser', owner, 'yes');
        await selectDropdownValueObj.selectDropdownValue(driver, screenshotPath, 'toUser', owner, 'no');
        const searchButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Search ');
        await searchButton.click();
        await driver.sleep(1000);
        const actualValidationElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(actualValidationElement));
        const actualValidation = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(actualValidation, expectedNotification);
        await driver.sleep(4000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'validation_CaseFailed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});