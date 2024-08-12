const { When, Then } = require('@cucumber/cucumber');
const { By, until } = require('selenium-webdriver');
const { strictEqual } = require('assert');
const assert = require('assert');
const openSalesmatePageObj = require('../../../../00_common/actions/openSalesmatePage');
const performSalesmateLoginObj = require('../../../../00_common/actions/performSalesmateLogin');
const screenshotObj = require('../../../../00_common/actions/browserActions/takeScreenshot');
const driver = require('../../../../../cucumber_config/cucumber_config').driver;
const screenshotPath = './features/06_contact/06_massOperations/03_massDelete/screenshots/';
const massUpdateProductElementsObj = require('../../../../05_product/07_massOperations/01_massUpdate/common/massUpdateElements');
const pageNavigationObj = require('../../../01_moduleAccessibility/common/actions');
const formElementsObj = require('../../../../00_common/webElements/formElements');
const moduleElementsObj = require('../../../../00_common/webElements/moduleElements');

//------Case 1: As a user, Verify that the Delete button should not be displayed on the bulk operation when the user doesn't have a right to Mass Delete Contactss-------

Then('{string} link is not visible and logged in through {string}',async function(massDeleteContact,adminUser) {
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        const massDeleteContactLink = await driver.findElements(By.xpath(`//a[text()="${massDeleteContact}"]`));
        const massDeleteContactLength = await massDeleteContactLink.length;
        if (massDeleteContactLength === 0) {
            console.log("As Mass Delete Contacts link length is " + massDeleteContactLength + " so it is not displayed under 'Actions' after disabling Mass Delete Contacts right,so test case has been passed");
        } else {
            await assert.fail("As Mass Delete Contacts link length is " + massDeleteContactLength + " so it is displayed under 'Actions' even after disabling Mass Delete Contacts right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'massDelete_Visibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//-------Case 2: As a user, I should able to see the 'Mass Delete' option when user has 'Mass Delete Contactss' right----

Then('{string} link is visible and logged in through {string}',async function(massDeleteContact,adminUser) {
    try {
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1500);
        await driver.manage().setTimeouts({implicit: 2000});
        const massDeleteContactLink = await driver.findElements(By.xpath(`//a[text()="${massDeleteContact}"]`));
        const massDeleteContactLength = await massDeleteContactLink.length;
        if (massDeleteContactLength > 0) {
            console.log("As Mass Delete Contacts link length is " + massDeleteContactLength + " so it is displayed under 'Actions' after enabling Mass Delete Contacts right,so test case has been passed");
        } else {
            await assert.fail("As Mass Delete Contacts link length is " + massDeleteContactLength + " so it is not displayed under 'Actions' even after enabling Mass Delete Contacts right,so test case has been aborted");
        }
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'massDelete_InVisibility.png');
        await openSalesmatePageObj.openSalesmateLoginPage(driver,screenshotPath,'the {string} is on contact listing page');
        await performSalesmateLoginObj.performSalesmateLogin(driver, screenshotPath, adminUser, 'the {string} is on contact listing page');
        await driver.sleep(3000);
        await assert.fail(err);
    }
});

//---------Case 3: As a user, I should be able to delete Contacts in bulk from the Mass Delete Contacts page------------

When('user is able to delete Contacts in bulk from the mass delete Contacts page and verify {string}',async function(expectedNotification) {
    try {
        //get contact lists count before deleting contact
        const contactLists = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const contactsCountBeforeDeletingContact = await contactLists.length;
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massDeleteContact = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a','Mass Delete Contacts');
        await massDeleteContact.click();
        await driver.sleep(2000);
        const addConditionButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add Condition')
        await addConditionButton.click();
        await driver.sleep(1000);
        const selectFieldDropdown = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span','Select field')
        await selectFieldDropdown.click();
        await driver.sleep(1000);
        //select 'Name' Field to be updated
        const listField = await massUpdateProductElementsObj.findListField(driver, 1);
        await listField.click();
        await driver.sleep(1000);
        const selectCondition = await massUpdateProductElementsObj.findSelectConditionDropdown(driver);
        await selectCondition.click();
        await driver.sleep(1000);
        //select 'not empty' condition
        const listCondition = await massUpdateProductElementsObj.findListCondition(driver, 9);
        await listCondition.click();
        await driver.sleep(1000);
        //click on 'Search' button
        const searchButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Search ')
        await searchButton.click();
        await driver.sleep(1000);
        const contactCheckbox = await moduleElementsObj.findContactCheckbox(driver,1);
        await contactCheckbox.click();
        await driver.sleep(1000);
        const massDeleteButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Delete');
        await massDeleteButton.click();
        await driver.sleep(1000);
        const massDeleteConfirmationButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','No');
        await massDeleteConfirmationButton.click();
        await driver.sleep(1000);
        const massDeleteButtonElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Delete');
        await massDeleteButtonElement.click();
        await driver.sleep(1000);
        const massDeleteConfirmationButtonElement = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Yes');
        await massDeleteConfirmationButtonElement.click();
        await driver.sleep(1000);
        const notificationMsgElement = await driver.findElement(By.xpath('//span[@class="noty_text"]'));
        await driver.wait(until.elementIsVisible(notificationMsgElement));
        const notificationMsg = await driver.findElement(By.xpath('//span[@class="noty_text"]')).getText();
        strictEqual(notificationMsg, expectedNotification);
        await driver.sleep(5000);
        //page navigation and come back to contact page
        await pageNavigationObj.comeBackToContactListingPage(driver);
        await driver.sleep(1000);
        //get contact lists count before adding contact details
        const contactsCount = await driver.findElements(By.xpath('//a[@class="entity-show-link text-ellipsis"]'));
        const contactsCountAfterDeletingContact = await contactsCount.length;
        if((contactsCountBeforeDeletingContact)-1 === contactsCountAfterDeletingContact) {
            console.log("As contacts length is decreased by (X-1) after performing mass delete operation,so test case has been passed");
        } else {
            await assert.fail("As contacts length is not decreased by (X-1) even after performing mass delete operation,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'massDelete_CaseFailed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//--------Case 4: As a User, Verify I should be able to display delete button disable if I haven't checked any checkbox------

When('user is able to display {string} button as disabled if I have not checked any checkbox under {string} of {string} module',async function(deleteButton,massDeleteButton,moduleElement) {
    try {
        await driver.sleep(1000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massDeleteContact = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',`${massDeleteButton}`);
        await massDeleteContact.click();
        await driver.sleep(1000);
        const addConditionButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',' Add Condition')
        await addConditionButton.click();
        await driver.sleep(1000);
        const selectFieldDropdown = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span','Select field')
        await selectFieldDropdown.click();
        await driver.sleep(1000);
        //select 'Name' Field to be updated
        const listField = await massUpdateProductElementsObj.findListField(driver, 1);
        await listField.click();
        await driver.sleep(1000);
        const selectCondition = await massUpdateProductElementsObj.findSelectConditionDropdown(driver);
        await selectCondition.click();
        await driver.sleep(1000);
        //select 'not empty' condition
        const listCondition = await massUpdateProductElementsObj.findListCondition(driver, 9);
        await listCondition.click();
        await driver.sleep(1000);
        //click on 'Search' button
        const searchButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Search ')
        await searchButton.click();
        await driver.sleep(2000);
        await driver.manage().setTimeouts({implicit:2000});
        //check disability of 'Delete' button
        const deleteButtonDisability = !!await driver.findElement(By.xpath(`//button[text()="${deleteButton}"]`)).getAttribute('disabled');
        if(deleteButtonDisability === true) {
            console.log("As delete button is disabled when no contact is checked,so test case has been passed");
        } else {
            await assert.fail("As delete button is not disabled even when no contact is checked,so test case has been aborted");
        }
        const moduleIcon = await moduleElementsObj.findModuleIcon(driver,`${moduleElement}`);
        await driver.executeScript("arguments[0].click();",moduleIcon);
        await driver.sleep(2000);
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deleteButton_NotDisabled.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//-------------Case 5: As a User, Verify upon clicking on cancel button it should terminate delete process--------------

When('user upon clicking on cancel button it should terminate delete process under {string}',async function(massDeleteButton) {
    try {
        await driver.sleep(1000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massDeleteContact = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',`${massDeleteButton}`);
        await massDeleteContact.click();
        await driver.sleep(2000);
        const massUpdateCancelButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button','Cancel')
        await massUpdateCancelButton.click();
        await driver.sleep(3000);
        const currentPageUrl = await driver.getCurrentUrl();
        if(currentPageUrl.endsWith('/list')) {
            console.log("As mass update termination redirected to expected contact url page,so test case has been passed");
        } else {
            await assert.fail("As mass update termination is not redirected to expected contact url page,so test case has been aborted");
        }
    }catch(err) {
        await screenshotObj.takeScreenshot(driver,screenshotPath+'deleteTermination_CaseFailed.png');
        await driver.navigate().refresh();
        await driver.sleep(5000);
        await assert.fail(err);
    }
});

//----------Case 6: As a User, the system should give me a validation message when any criteria are not selected--------

When('system should give validation {string} when any criteria is not selected under {string}',async function(expectedNotification,massDeleteButton) {
    try {
        await driver.sleep(1000);
        const actionsButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'button',' Actions ');
        await actionsButton.click();
        await driver.sleep(1000);
        const massDeleteContact = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'a',`${massDeleteButton}`);
        await massDeleteContact.click();
        await driver.sleep(1000);
        const searchButton = await formElementsObj.findElementByVisibleText(driver,screenshotPath,'span',' Search ')
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