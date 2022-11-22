const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const assert = require('assert');
const { strictEqual } = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/05_bulkOperations/03_bulkDelete/screenshots/';
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const pageNavigationObj = require('../../../01_moduleAccessibility/common/actions');

//-----Case 1: As a user, Verify that the Delete button should not be displayed on the bulk operation when the user doesn't have a right to Mass Delete Contact----------

Then('{string} button is not displayed and logged in through {string}',async function(deleteButton,adminUser) {
    try {
        const allContactsCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await allContactsCheckbox.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        const deleteContactButton = await driver.findElements(By.xpath(`//button[text()=" ${deleteButton} "]`));
        const deleteContactButtonLength = await deleteContactButton.length;
        if (deleteContactButtonLength === 0) {
            console.log("As delete contact button length is " + deleteContactButtonLength + " so it is not displayed after disabling mass delete contact right,so test case has been passed");
        } else {
            await assert.fail("As delete contact button length is " + deleteContactButtonLength + " so it is displayed after disabling mass delete contact right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on product listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on product listing page');
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deleteButton_Visibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on product listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on product listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//-----Case 2: As a user, I should able to see the 'Delete' option while clicking to the checkbox available on grid header-----

Then('{string} button is displayed and logged in through {string}',async function(deleteButton,adminUser) {
    try {
        const allContactsCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await allContactsCheckbox.click();
        await driver.sleep(1500);
        await screenshotObj.takeScreenshot(driver, screenshotPath + 'deleteButtonVisibility.png');
        await driver.manage().setTimeouts({implicit: 2000});
        const deleteProductButton = await driver.findElements(By.xpath(`//button[text()=" ${deleteButton} "]`));
        const deleteProductButtonLength = await deleteProductButton.length;
        if (deleteProductButtonLength > 0) {
            console.log("As delete product button length is " + deleteProductButtonLength + " so it is displayed after enabling mass delete product right,so test case has been passed");
        } else {
            await assert.fail("As delete product button length is " + deleteProductButtonLength + " so it is not displayed even after enabling mass delete product right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on product listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on product listing page');
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deleteButton_InVisibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on product listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on product listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//------------Case 3: As a user, I should be able to bulk delete contacts from the contacts listing screen--------------

When('user should be able to bulk delete contacts from contact listing screen and verify {string}',async function(expectedNotification) {
    try {
        //get contact lists count before deleting contact details
        const contactLists = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const contactsCountBeforeDeletingContact = await contactLists.length;
        await driver.sleep(1000);
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver, 1);
        await contactCheckbox.click();
        await driver.sleep(1000);
        //click on bulk 'Delete' button
        const deleteButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Delete ');
        await deleteButton.click();
        await driver.sleep(1000);
        //click on 'No' button
        const deleteConfirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','No');
        await deleteConfirmationButton.click();
        await driver.sleep(1000);
        //click on bulk 'Delete' button
        const deleteButtonElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Delete ');
        await deleteButtonElement.click();
        await driver.sleep(1000);
        //click on 'Yes' button
        const deleteConfirmationElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await deleteConfirmationElement.click();
        await driver.sleep(2000);
        const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationMsgElement));
        const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(notificationMsg, expectedNotification);
        await driver.sleep(6000);
        //page navigation and come back to contact listing page
        await pageNavigationObj.comeBackToContactListingPage(driver, screenshotPath);
        await driver.sleep(1000);
        //get contact lists count after deleting contact details
        const contactsElements = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const contactsCountAfterDeletingContact = await contactsElements.length;
        if((contactsCountBeforeDeletingContact)-1 === contactsCountAfterDeletingContact) {
            console.log("As contacts list is decreased by (X-1) and contact got deleted,so test case has been passed");
        } else {
            await assert.fail("As contacts list is not decreased by (X-1) and contact not deleted,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'contact_NotDeleted.png');
        await driver.navigate().refresh();
        await driver.sleep(3000);
        await assert.fail(err);
    }
});